// package.json에  script부분에 "dev": "nodemon index.js" 를 추가. 터미널에서 npm run dev 하면 nodemon으로 서버가 실행된다.

//설치 라이브러리 
const  express = require('express')
const  bodyParser  = require('body-parser')
const  mysql = require('mysql')
const  cors = require('cors')


//express서버를 사용하기 위한 app생성
const app = express()

//server 포트설정
const PORT = process.env.PORT || 5000
app.use(cors())
app.use(bodyParser.json())


//db접속
const db = mysql.createConnection({
    host: 'localhost' ,
    user: 'root' ,
    password : '1234' ,
    port : '3306' ,
    database: 'mydb'
})



//express접속
app.listen(PORT, ()=>{
   console.log(`server on : http://localhost:${PORT}`);   
})


//db접속
db.connect((err)=>{
    if (!err){
        console.log('db접속 성공 5-26-일요일 test');
    }else{
        console.log('db접속 실패 5-26-일요일 test');
    }
})

app.post('/boardWrite',(req,res)=>{
    const {title,name,content}=req.body;

    const boardData={title,name,content};

    console.log(title, name, content)
    if (!title || !name || !content) {
        return res.status(400).send('제목,이름,내용 모두 입력헤야 해요');
    }
    const sql='INSERT INTO react_board SET ?';
    db.query(sql,boardData,(err, result)=>{
        if(err){
            return res.status(500).send(err) //에러 발생시 서버에러 500 상태코드 설정
        }
        res.json({'result':'ok'})// 등록 성공시 ok문자열을 보낸다.
    })
})

//게시글 목록 가져오기  get방식 게시글 가져오기
app.get('/boardList', (req, res)=>{
    console.log('/boardList');

    const  sql = `select id,title,name,content, date_format(wdate,'%Y-%m-%d') wdate from  react_board order by id desc ` ;
    db.query(sql, (err,data)=>{
        if(!err){
            res.send(data);
        }else{
            console.log(err);
            return res.status(500).send(err) //에러 발생시 서버에러 500 상태코드 설정
        }
    });
})



//게시글 상세보기 또는 수정글 가져오기
app.get('/boardView/:id', (req, res)=>{
    console.log('/boardView');
    const id = req.params.id;
    console.log(`/boardView/${id}`);

    const  sql = `select id,title,name,content, date_format(wdate,'%Y-%m-%d') wdate  from  react_board  where id = ${id}` ;
    db.query(sql, (err,data)=>{
        if(!err){
            res.send(data);
        }else{
            console.log(err);
            return res.status(500).send(err) //에러 발생시 서버에러 500 상태코드 설정
        }
    });
})
//게시글 수정하기
app.post('/boardModify/:id',(req,res)=>{
    console.log('여기 안들어옴???')
    const id=req.params.id;
    const {title, name, content } = req.body;
    if (!id||!title || !name || !content) {
        return res.status(400).send('제목,이름,내용 모두 입력헤야 해요');
    }

    const sql = 'UPDATE react_board SET title = ?, name = ?, content = ? WHERE id = ?';
    db.query(sql, [title, name, content, id], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        if (result.affectedRows === 0) {
            return res.status(404).send('Post not found');
        }
        res.send({'result':'ok'});//성공적으로 수정됐을 경우
    });

})

//게시글 삭제
app.get('/boardDel/:id',(req,res)=>{
    const id=req.params.id;
    console.log('delete id: ',id);
    if(!id){
        return res.status(400).send('게시글 글번호가 필요해요')
    }
    const sql=`delete from react_board where id=?`;
    db.query(sql,[id],(err, result)=>{
        if(err){
            return res.status(500).send(err);
        }
        if(result.affectedRows===0){
            return res.status(404).send('삭제할 게시글이 존재하지 않아요')
        }
        res.send({'result':'ok'});//성공적으로 삭제시
    })
})

//======================================
//댓글 출력
app.get('/boards/:board_id/replies', (req, res) => {
    const { board_id } = req.params;
    const query = 'SELECT * FROM react_boardReply WHERE board_id = ?';
    db.query(query, [board_id], (error, results) => {
        if (error) {
            return res.status(500).send(error);
        }
        res.json(results);
    });
});


//댓글 등록 
app.post('/boards/:board_id/replies', (req, res) => {
    const { board_id } = req.params;
    const { writer, memo } = req.body;
    const query = 'INSERT INTO react_boardReply (writer, memo, board_id) VALUES (?, ?, ?)';
    db.query(query, [writer, memo, board_id], (error, results) => {
        if (error) {
            return res.status(500).send(error);
        }
        res.json({ message: 'Reply added successfully', num: results.insertId });
    });
});




/*
create table react_board(
	id int auto_increment primary key,
	title varchar(100),
	content varchar(500),
	name varchar(30),
	wdate timestamp DEFAULT now()
);


insert into board(title, content, name) values('한 번 배워서 어디서나 사용하기','기술 스택의 나머지 부분에는 관여하지 않기 때문에, 기존 코드를 다시 작성하지 않고도 React의 새로운 기능을 이용해 개발할 수 있습니다.','red');
insert into board(title, content, name) values('상태를 가지는 컴포넌트','컴포넌트는 this.props를 이용해 입력 데이터를 다루는 것 외에도 내부적인 상태 데이터를 가질 수 있습니다. 이는 this.state로 접근할 수 있습니다.','orange');
insert into board(title, content, name) values('애플리케이션','props와 state를 사용해서 간단한 Todo 애플리케이션을 만들 수 있습니다.','yellow');
insert into board(title, content, name) values('외부 플러그인을 사용하는 컴포넌트','React는 유연하며 다른 라이브러리나 프레임워크를 함께 활용할 수 있습니다. 이 예제에서는 외부 마크다운 라이브러리인 remarkable을 사용해 <textarea>의 값을 실시간으로 변환합니다.','green');
insert into board(title, content, name) values('자습서를 시작하기 전에','우리는 이 자습서에서 작은 게임을 만들겁니다. 게임을 만들고 싶지 않아서 자습서를 건너뛰고 싶을 수 있습니다. 그래도 한번 해보세요!','blue');
insert into board(title, content, name) values('브라우저에 코드 작성하기','먼저 새 탭에서 초기 코드를 열어주세요. 새 탭은 비어있는 틱택토 게임판과 React 코드를 보여줄 것입니다. 우리는 자습서에서 React 코드를 편집할 것입니다.','navy');
insert into board(title, content, name) values('React란 무엇인가요?','React는 몇 가지 종류의 컴포넌트를 가지지만 우리는 React.Component의 하위 클래스를 사용해보겠습니다.','purple');
commit;

select * from board;

CREATE TABLE react_boardReply (
   num INT AUTO_INCREMENT PRIMARY KEY,
   writer VARCHAR(30) NOT NULL,
   memo VARCHAR(200) NOT NULL, 
   board_id INT,
   reg_date TIMESTAMP DEFAULT NOW(),
   FOREIGN KEY (board_id) REFERENCES react_board(id) 
   ON DELETE CASCADE
);

*/










