const express = require("express");
const http = require("http");

const app = express();

app.set("port", process.env.PORT || 3000);

// use()를 사용하여 미들웨어 등록
app.use(function (req, res, next) {
  console.log("첫번째 미들웨어 호출됨");

  // 응답 전송
  res.writeHead(200, { "Content-Type": "text/html; charset=utf8" });
  res.end("<h1>Express 서버에서 응답한 결과입니다</h1>");
});

http.createServer(app).listen(app.get("port"), function () {
  console.log("Express로 웹 서버를 실행함 : " + app.get("port"));
});
