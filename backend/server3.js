const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');

// Express 서버를 사용하기 위한 앱 생성
const app = express();

// 서버 포트 설정
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(bodyParser.json());

// 데이터베이스 연결 풀 설정
const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '1234',
    port: '3306',
    database: 'mydb',
});

// Express 서버 시작
app.listen(PORT, () => {
    console.log(`Server2 on: http://localhost:${PORT}`);
});

// 회원 가입인 경우
app.post('/api/user', (req, res) => {
    const { name, nickname, pwd } = req.body;
    if (!name || !nickname || !pwd) {
        return res.status(400).send('이름, 닉네임, 비밀번호 모두 입력해야 해요');
    }
    const sql = 'INSERT INTO react_member SET ?';
    const userData = { name, nickname, pwd };

    pool.getConnection((err, connection) => {
        if (err) return res.status(500).json(err);
        connection.query(sql, userData, (err, result) => {
            connection.release();
            if (err) return res.status(500).json(err);
            res.json({ result: 'ok', data: { name: name } });
        });
    });
});

// 닉네임 중복체크
app.post('/api/nickCheck/:nickname', (req, res) => {
    const nickname = req.params.nickname;

    const sql = `SELECT id
                FROM react_member WHERE nickname = ?`;

    pool.getConnection((err, connection) => {
        if (err) {
            console.error('Error connecting to database:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }

        connection.query(sql, [nickname], (err, data) => {
            connection.release();
            if (err) {
                console.error('Error executing query:', err);
                return res.status(500).json({ error: 'Internal server error' });
            }
            console.log(data);

            if (data.length > 0) {
                // 닉네임이 이미 존재하는 경우
                res.json({ result: 'exists', data: { nickname: nickname } });
            } else {
                // 닉네임이 존재하지 않는 경우
                res.json({ result: 'not_exists', data: { nickname: nickname } });
            }
        });
    });
});

//로그인 요청 테스트 처리
app.post('/api/login_test', (req, res) => {
    let { nickname, pwd } = req.body;
    console.log(`nickname ${nickname}, pwd ${pwd}`);
    // res.json({ result: 'success', data: { nickname, name: '홍길동' } });
    res.json({ result: 'fail', data: { nickname, name: '' } });
});
//실제 로그인 요청 처리
app.post('/api/login', (req, res) => {
    const { nickname, pwd } = req.body;
    console.log(`nickname ${nickname}, pwd ${pwd}`);

    const sql = `SELECT id, name, nickname FROM react_member WHERE nickname=? AND pwd=?`;

    pool.getConnection((err, connection) => {
        if (err) {
            console.error('Error getting connection:', err);
            return res.status(500).send({ result: 'error', message: 'Internal Server Error' });
        }

        connection.query(sql, [nickname, pwd], (err, results) => {
            connection.release();
            if (err) {
                console.error('Error executing query:', err);
                return res.status(500).send({ result: 'error', message: 'Database Query Error' });
            }

            if (results.length > 0) {
                const user = results[0];
                res.json({ result: 'success', data: { nickname: user.nickname, name: user.name, pwd: null } });
            } else {
                res.status(401).send({ result: 'failure', message: 'Invalid nickname or password' });
            }
        });
    });
});

// 게시글 목록 가져오기
app.get('/boardList', (req, res) => {
    // const sql = `SELECT id, title, name, content, DATE_FORMAT(wdate,'%Y-%m-%d') wdate FROM react_board ORDER BY id DESC`;
    const sql = `SELECT id, title, name, content,   DATE_FORMAT(wdate,'%Y-%m-%d') wdate,
                (select count(num) from  react_boardReply where board_id = a.id )  replyCount 
                FROM react_board a  ORDER BY id DESC`;

    pool.getConnection((err, connection) => {
        if (err) return res.status(500).send(err);
        connection.query(sql, (err, data) => {
            connection.release();
            if (err) return res.status(500).send(err);
            res.send(data);
        });
    });
});

// 게시글 상세보기
app.get('/boardView/:id', (req, res) => {
    const id = req.params.id;
    const sql = `SELECT id, title, name, content, DATE_FORMAT(wdate,'%Y-%m-%d') wdate FROM react_board WHERE id = ?`;

    pool.getConnection((err, connection) => {
        if (err) return res.status(500).send(err);
        connection.query(sql, [id], (err, data) => {
            connection.release();
            if (err) return res.status(500).send(err);
            res.send(data);
        });
    });
});

// 게시글 수정하기
app.post('/boardModify/:id', (req, res) => {
    const id = req.params.id;
    const { title, name, content } = req.body;
    if (!title || !name || !content) {
        return res.status(400).send('제목, 이름, 내용 모두 입력해야 해요');
    }

    const sql = 'UPDATE react_board SET title = ?, name = ?, content = ? WHERE id = ?';

    pool.getConnection((err, connection) => {
        if (err) return res.status(500).send(err);
        connection.query(sql, [title, name, content, id], (err, result) => {
            connection.release();
            if (err) return res.status(500).send(err);
            if (result.affectedRows === 0) {
                return res.status(404).send('Post not found');
            }
            res.send({ result: 'ok' });
        });
    });
});

// 게시글 삭제
app.get('/boardDel/:id', (req, res) => {
    const id = req.params.id;
    if (!id) {
        return res.status(400).send('게시글 글번호가 필요해요');
    }

    const sql = 'DELETE FROM react_board WHERE id = ?';

    pool.getConnection((err, connection) => {
        if (err) return res.status(500).send(err);
        connection.query(sql, [id], (err, result) => {
            connection.release();
            if (err) return res.status(500).send(err);
            if (result.affectedRows === 0) {
                return res.status(404).send('삭제할 게시글이 존재하지 않아요');
            }
            res.send({ result: 'ok' });
        });
    });
});

// 댓글 출력
app.get('/boards/:board_id/replies', (req, res) => {
    const { board_id } = req.params;
    const sql = 'SELECT * FROM react_boardReply WHERE board_id = ?';

    pool.getConnection((err, connection) => {
        if (err) return res.status(500).send(err);
        connection.query(sql, [board_id], (error, results) => {
            connection.release();
            if (error) return res.status(500).send(error);
            res.json(results);
        });
    });
});

// 댓글 등록
app.post('/boards/:board_id/replies', (req, res) => {
    const { board_id } = req.params;
    const { writer, memo } = req.body;
    const sql = 'INSERT INTO react_boardReply (writer, memo, board_id) VALUES (?, ?, ?)';

    pool.getConnection((err, connection) => {
        if (err) return res.status(500).send(err);
        connection.query(sql, [writer, memo, board_id], (error, results) => {
            connection.release();
            if (error) return res.status(500).send(error);
            res.json({ message: 'Reply added successfully', num: results.insertId });
        });
    });
});

//댓글수정 Update
app.put('/replies/:num', (req, res) => {
    const { num } = req.params;
    const { writer, memo } = req.body;
    const query = 'UPDATE react_boardReply SET writer = ?, memo = ?, reg_date = now() WHERE num = ?';
    pool.getConnection((err, connection) => {
        if (err) return res.status(500).send(err);
        connection.query(query, [writer, memo, num], (error, results) => {
            connection.release();
            if (error) {
                return res.status(500).send(error);
            }
            res.json({ message: '댓글 수정  successfully' });
        });
    });
});

//댓글 Delete a reply
app.delete('/replies/:num', (req, res) => {
    const { num } = req.params;
    const query = 'DELETE FROM react_boardReply WHERE num = ?';
    pool.getConnection((err, connection) => {
        if (err) return res.status(500).send(err);
        connection.query(query, [num], (error, results) => {
            connection.release();
            if (error) {
                return res.status(500).send(error);
            }
            res.json({ message: '댓글 삭제  successfully' });
        });
    });
});

// 에러 핸들링 미들웨어
app.use((err, req, res, next) => {
    console.error('Error occurred:', err);
    res.status(500).send('Something broke!');
});

// 데이터베이스 테이블 생성 예제 (주석 처리)
const initDB = () => {
    const createMemberTable = `
    create table if not exists react_member(
        id int primary key auto_increment,
        name varchar(30) not null,
        nickname varchar(20) not null unique,
        pwd varchar(20) not null,
        indate date default (current_date())
        );
    `;

    pool.getConnection((err, connection) => {
        if (err) throw err;
        connection.query(createMemberTable, (err, results) => {
            if (err) throw err;
            console.log('Board table created or already exists');
        });
    });
};

// 초기 데이터베이스 테이블 생성
// initDB();
/*

create table if not exists member(
id int primary key auto_increment,
name varchar(30) not null,
nickname varchar(20) not null unique,
pwd varchar(20) not null,
indate date default (current_date())
);
desc member;
*/
