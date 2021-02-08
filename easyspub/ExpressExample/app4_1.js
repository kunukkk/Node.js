const express = require('express');
const http = require('http');

const app = express();

app.set('port', process.env.PORT || 3000);

app.use(function (req, res, next) {
  console.log('첫 번째 미들웨어에서 요청을 처리함');

  res.send({ name: '소녀시대', age: 20 });
});

http.createServer(app).listen(app.get('port'), function () {
  console.log('Express로 웹 서버를 실행함 : ' + app.get('port'));
});
