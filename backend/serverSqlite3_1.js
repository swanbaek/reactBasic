const sqlite3 = require('sqlite3').verbose();

// 데이터베이스 연결 생성
let db = new sqlite3.Database(':memory:', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the in-memory SQLite database.');
});

// 테이블 생성 및 데이터 삽입 및 조회
db.serialize(() => {
    // 테이블 생성
    db.run(
        `CREATE TABLE users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        email TEXT UNIQUE
    )`,
        (err) => {
            if (err) {
                console.error(err.message);
            }
            console.log('Table created.');
        }
    );

    // 데이터 삽입
    let insert = 'INSERT INTO users (name, email) VALUES (?, ?)';
    db.run(insert, ['John Doe', 'john@example.com'], function (err) {
        if (err) {
            console.error(err.message);
        }
        console.log(`A row has been inserted with rowid ${this.lastID}`);
    });

    // 데이터 조회
    db.all('SELECT * FROM users', [], (err, rows) => {
        if (err) {
            throw err;
        }
        rows.forEach((row) => {
            console.log(row);
        });
    });
});

// 데이터베이스 연결 종료
db.close((err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Close the database connection.');
});
