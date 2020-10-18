// Express 기본 모듈 불러오기
const express = require("express");
const http = require("http");
// express 모듈은 웹 서버를 위해 만들어진 것으로 http 모듈 위에서 동작함
// 따라서 express 모듈을 사용할 때는 항상 http 모듈도 함께 불러들여야 함

// Express 객체 생성
const app = express();

// 기본 포트를 app 객체에 속성으로 설정
app.set("port", process.env.PORT || 3000);

// Express 서버 시작
// set()으로 설정한 후 get으로 포트 사용
http.createServer(app).listen(app.get("port"), function () {
  console.log("Express로 웹 서버를 실행함 : " + app.get("port"));
});
