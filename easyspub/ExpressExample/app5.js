const express = require("express");
const http = require("http");

const app = express();

app.set("port", process.env.PORT || 3000);

app.use(function (req, res, next) {
  console.log("첫 번째 미들웨어에서 요청을 처리함");

  // redirect() : 웹 페이지 경로를 강제로 이동시킵니다.
  res.redirect("http://google.co.kr");
});

http.createServer(app).listen(app.get("port"), function () {
  console.log("Express로 웹 서버를 실행함 : " + app.get("port"));
});
