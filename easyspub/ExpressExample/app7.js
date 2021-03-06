// Express 기본 모듈 불러오기
const express = require('express'),
  http = require('http'),
  path = require('path');

// Express의 미들웨어 불러오기
const bodyParser = require('body-parser');
const static = require('serve-static');

// Express 객체 생성
const app = express();

// 기본 속성 설정
app.set('port', process.env.PORT || 3000);

// body-parser를 사용해 application/x-www-form-urlencoded 파싱
app.use(bodyParser.urlencoded({ extended: false }));
// body-parser를 사용해 application/json 파싱
app.use(bodyParser.json());

// 접근 패스 설정
app.use('/public', static(path.join(__dirname, 'public')));

// 미들웨어에서 파라미터 확인
app.use(function (req, res, next) {
  console.log('첫 번째 미들웨어에서 요청을 처리함');

  let paramID = req.body.id || req.query.id;
  let paramPassword = req.body.password || req.query.password;

  res.writeHead('200', { 'Content-Type': 'text/html; charset=utf8' });
  res.write('<h1>Express 서버에서 응답한 결과입니다.</h1>');
  res.write('<div><p>Param id : ' + paramID + '</p></div>');
  res.write('<div><p>Param password : ' + paramPassword + '</p></div>');
  res.end();
});

http.createServer(app).listen(app.get('port'), function () {
  console.log('Express로 웹 서버를 실행함 : ' + app.get('port'));
});
