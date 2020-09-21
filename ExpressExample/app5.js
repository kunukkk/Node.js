let express = require("express");
let http = require("http");

let app = express();

app.set("port", process.env.PORT || 3000);

app.use(function (req, res, next) {
  console.log("첫번째 미들웨어 호출됨");

  res.redirect("http://google.com");
});

http.createServer(app).listen(app.get("port"), function () {
  console.log("Express로 웹 서버를 실행함 : " + app.get("port"));
});
