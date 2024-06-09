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
    database: 'mydb'
});

// Express 서버 시작
app.listen(PORT, () => { 
    console.log(`Server2 on: http://localhost:${PORT}`);
});

// 게시글 작성
app.post('/boardWrite', (req, res) => {
    const { title, name, content } = req.body;
    if (!title || !name || !content) {
        return res.status(400).send('제목, 이름, 내용 모두 입력해야 해요');
    }
    const sql = 'INSERT INTO react_board SET ?';
    const boardData = { title, name, content };
    
    pool.getConnection((err, connection) => {
        if (err) return res.status(500).send(err);
        connection.query(sql, boardData, (err, result) => {
            connection.release();
            if (err) return res.status(500).send(err);
            res.json({ 'result': 'ok' });
        });
    });
});

// 게시글 목록 가져오기
app.get('/boardList', (req, res) => {
    // const sql = `SELECT id, title, name, content, DATE_FORMAT(wdate,'%Y-%m-%d') wdate FROM react_board ORDER BY id DESC`;
    const sql=`SELECT id, title, name, content,   DATE_FORMAT(wdate,'%Y-%m-%d') wdate,
                (select count(num) from  react_boardReply where board_id = a.id )  replyCount 
                FROM react_board a  ORDER BY id DESC`
    
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
            res.send({ 'result': 'ok' });
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
            res.send({ 'result': 'ok' });
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

// 에러 핸들링 미들웨어
app.use((err, req, res, next) => {
    console.error('Error occurred:', err);
    res.status(500).send('Something broke!');
});

// 데이터베이스 테이블 생성 예제 (주석 처리)
const initDB = () => {
    const createBoardTable = `
        CREATE TABLE IF NOT EXISTS react_board (
            id INT AUTO_INCREMENT PRIMARY KEY,
            title VARCHAR(100),
            content VARCHAR(500),
            name VARCHAR(30),
            wdate TIMESTAMP DEFAULT now()
        );
    `;
    const createReplyTable = `
        CREATE TABLE IF NOT EXISTS react_boardReply (
            num INT AUTO_INCREMENT PRIMARY KEY,
            writer VARCHAR(30) NOT NULL,
            memo VARCHAR(200) NOT NULL,
            board_id INT,
            reg_date TIMESTAMP DEFAULT NOW(),
            FOREIGN KEY (board_id) REFERENCES react_board(id)
            ON DELETE CASCADE
        );
    `;
    pool.getConnection((err, connection) => {
        if (err) throw err;
        connection.query(createBoardTable, (err, results) => {
            if (err) throw err;
            console.log('Board table created or already exists');
        });
        connection.query(createReplyTable, (err, results) => {
            connection.release();
            if (err) throw err;
            console.log('Reply table created or already exists');
        });
    });
};

// 초기 데이터베이스 테이블 생성
// initDB();