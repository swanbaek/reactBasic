const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const path = require('path');

const app = express();
const port = 5000;

// CORS 설정
app.use(cors());
app.use(express.json());

// SQLite 파일 데이터베이스 생성 또는 연결
const dbPath = path.resolve(__dirname, 'test.db');
console.log(`SQLite database file path: ${dbPath}`);

let db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log('Connected to the SQLite database.');
    }
});

// 테이블 생성 및 초기 데이터 삽입
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        email TEXT UNIQUE
    )`);

    db.run(`INSERT OR IGNORE INTO users (name, email) VALUES (?, ?)`, ['John Doe', 'john@example.com']);
    db.run(`INSERT OR IGNORE INTO users (name, email) VALUES (?, ?)`, ['Jane Doe', 'jane@example.com']);
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

//sqlite3 D:/Univ/test_react/testServer/database.sqlite
//식으로 접속
//sqlite3.exe를 실행시켜 들어갈 때는
//.open "D:/Univ/test_react/testServer/database.sqlite"
