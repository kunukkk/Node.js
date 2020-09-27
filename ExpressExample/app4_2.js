let express = require("express");
let http = require("http");

let app = express();

app.set("port", process.env.PORT || 3000);

app.use(function (req, res, next) {
  console.log("첫 번째 미들웨어에서 요청을 처리함");

  res.send({ name: "소녀시대", age: 20 });
});

app.use("/", function (req, res, next) {
  console.log("두 번째 미들웨어 호출됨");

  res.writeHead("200", { "Content-Type": "text/html; charset=utf8" });
  res.end("<h1>Express 서버에서 응답한 결과입니다 : " + req.user + "</h1>");
});

http.createServer(app).listen(app.get("port"), function () {
  console.log("Express로 웹 서버를 실행함 : " + app.get("port"));
});
