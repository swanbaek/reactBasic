const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
const port = 5000;

// CORS 설정
app.use(cors());
app.use(express.json());

// SQLite 인메모리 데이터베이스 생성
let db = new sqlite3.Database(':memory:', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the in-memory SQLite database.');
});

// 테이블 생성 및 초기 데이터 삽입
db.serialize(() => {
    db.run(`CREATE TABLE users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        email TEXT UNIQUE
    )`);

    let insert = 'INSERT INTO users (name, email) VALUES (?, ?)';
    db.run(insert, ['John Doe', 'john@example.com']);
    db.run(insert, ['Jane Doe', 'jane@example.com']);
});

// API 엔드포인트 설정
app.get('/users', (req, res) => {
    db.all('SELECT * FROM users', [], (err, rows) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: rows,
        });
    });
});

app.post('/users', (req, res) => {
    const { name, email } = req.body;
    let insert = 'INSERT INTO users (name, email) VALUES (?, ?)';
    db.run(insert, [name, email], function (err) {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: { id: this.lastID, name, email },
        });
    });
});

// 서버 시작
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
