//npm i --s request
//npm i --s express

var express = require('express');
var app = express();
var client_id = '클라이언트 아이디';
var client_secret = '클라이언트 시크릿';
app.get('/api/books', function (req, res) {
    var api_url =
        'https://openapi.naver.com/v1/search/book.json?query=' +
        encodeURI(req.query.query) +
        '&display=12&start=' +
        req.query.start; // JSON 결과
    //   var api_url = 'https://openapi.naver.com/v1/search/blog.xml?query=' + encodeURI(req.query.query); // XML 결과
    console.log(api_url);
    var request = require('request');
    var options = {
        url: api_url,
        headers: { 'X-Naver-Client-Id': client_id, 'X-Naver-Client-Secret': client_secret },
    };
    request.get(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            res.writeHead(200, { 'Content-Type': 'text/json;charset=utf-8' });
            res.end(body);
        } else {
            res.status(response.statusCode).end();
            console.log('error = ' + response.statusCode);
        }
    });
});
app.listen(5000, function () {
    console.log('http://127.0.0.1:5000/api/books?query=검색어 app listening on port 5000!');
});
