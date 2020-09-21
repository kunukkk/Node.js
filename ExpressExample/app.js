let express = require("express");
let http = require("http");

let app = express();

app.set("port", process.env.PORT || 3000);

http.createServer(app).listen(app.get("port"), function () {
  console.log("Express로 웹 서버를 실행함 : " + app.get("port"));
});
