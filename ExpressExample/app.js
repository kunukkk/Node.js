// Express 기본 모듈 불러오기
let express = require("express");
let http = require("http");

// Express 객체 생성
let app = express();

// 기본 포트를 app 객체에 속성으로 설정
app.set("port", process.env.PORT || 3000);

// Express 서버 시작
http.createServer(app).listen(app.get("port"), function () {
  console.log("Express로 웹 서버를 실행함 : " + app.get("port"));
});
