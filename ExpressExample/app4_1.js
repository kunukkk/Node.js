const express = require("express");
const http = require("http");

const app = express();

app.set("port", process.env.PORT || 3000);

app.use(function (req, res, next) {
  console.log("첫 번째 미들웨어에서 요청을 처리함");

  // send() : 클라이언트에 응답 데이터를 보냅니다.
  // 전달할 수 있는 데이터는 HTMl 문자열, Buffer 객체, JSON 객체, JSON 배열입니다.
  res.send({ name: "소녀시대", age: 20 });
});

http.createServer(app).listen(app.get("port"), function () {
  console.log("Express로 웹 서버를 실행함 : " + app.get("port"));
});
