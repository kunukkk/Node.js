let express = require("express");
let http = require("http");

let app = express();

app.set("port", process.env.PORT || 3000);

app.use(function (req, res, next) {
  console.log("첫번째 미들웨어 호출됨");

  req.user = "mike";

  next();
});

app.use("/", function (req, res, next) {
  console.log("두번째 미들웨어 호출됨");

  // res.writeHead(200, { "Content-Type": "text/html; charset=utf8" });
  // res.send("<h1>Express 서버에서 응답한 결과입니다 : " + req.user + "</h1>");
  let person = { name: "소녀시대", age: 20 };
  // res.send(person);

  let personStr = JSON.stringify(person);
  // res.send(personStr);

  res.writeHead(200, { "Content-Type": "application/json; charset=utf8" });
  res.write(personStr);
  res.end();
});

http.createServer(app).listen(app.get("port"), function () {
  console.log("Express로 웹 서버를 실행함 : " + app.get("port"));
});
