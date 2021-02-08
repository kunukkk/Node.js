// Express 기본 모듈 불러오기
const express = require('express'),
  http = require('http'),
  path = require('path');

// 오류 핸들러 모듈 사용
const expressErrorHandler = require('express-error-handler');

// Express의 미들웨어 불러오기
const bodyParser = require('body-parser'),
  static = require('serve-static');

// Express 객체 생성
const app = express();

// 기본 속성 설정
app.set('port', process.env.PORT || 3000);

// body-parser를 사용해 application/x-www-form-urlencoded 파싱
app.use(bodyParser.urlencoded({ extended: false }));

// body-parser를 사용해 application/json 파싱
app.use(bodyParser.json());

app.use('/public', static(path.join(__dirname, 'public')));

// Router 객체 참조
const router = express.Router();

// 라우팅 함수 등록
router.route('/process/login').post(function (req, res) {
  console.log('/process/login 처리함');

  let paramID = req.body.id || req.query.id;
  let paramPassword = req.body.password || req.query.password;

  res.writeHead('200', { 'Content-Type': 'text/html; charset=utf8' });
  res.write('<h1>Express 서버에서 응답한 결과입니다.</h1>');
  res.write('<div><p>Param id : ' + paramID + '</p></div>');
  res.write('<div><p>Param password : ' + paramPassword + '</p></div>');
  res.write("<br><br><a href='/public/login2.html'>로그인 페이지로 돌아가기</a>");
  res.end();
});

// 라우터 객체를 app 객체에 등록
app.use('/', router);

// 모든 router 처리 끝난 후 404 오류 페이지 처리
const errorHandler = expressErrorHandler({
  static: {
    404: './public/404.html',
  },
});

app.use(expressErrorHandler.httpError(404));
app.use(errorHandler);

http.createServer(app).listen(app.get('port'), function () {
  console.log('Express로 웹 서버를 실행함 : ' + app.get('port'));
});
