// Express 기본 모듈 불러오기
const express = require("express"),
  http = require("http"),
  path = require("path");

// 오류 핸들러 모듈 사용
const expressErrorHandler = require("express-error-handler");

// Express의 미들웨어 불러오기
const bodyParser = require("body-parser"),
  static = require("serve-static");

// Express 객체 생성
const app = express();

// 기본 속성 설정
app.set("port", process.env.PORT || 3000);

// body-parser를 사요해 application/x-www-form-urlencoded 파싱
app.use(bodyParser.urlencoded({ extended: false }));

// body-parser를 사용해 application/json 파싱
app.use(bodyParser.json());

app.use("/public", static(path.join(__dirname, "public")));

// Router 객체 참조
const router = express.Router();

// 라우팅 함수 등록
router.route("/process/users/:id").get(function (req, res) {
  console.log("/process/users/:id 처리함");

  // URL 파라미터 확인
  let paramID = req.params.id;

  console.log("/process/users와 토큰 %s를 이용해 처리함.", paramID);

  res.writeHead("200", { "Content-Type": "text/html; charset=utf8" });
  res.write("<h1>Express 서버에서 응답한 결과입니다.</h1>");
  res.write("<div><p>Param id : " + paramID + "</p></div>");
  res.end();
});

// 라우터 객체를 app 객체에 등록
app.use("/", router);

// 미들웨어에서 파라미터 확인
app.use(function (req, res, next) {
  console.log("첫 번째 미들웨어에서 요청을 처리함");

  let paramID = req.body.id || req.query.id;
  let paramPassword = req.body.password || req.query.password;

  res.writeHead("200", { "Content-Type": "text/html; charset=utf8" });
  res.write("<h1>Express 서버에서 응답한 결과입니다.</h1>");
  res.write("<div><p>Param id : " + paramID + "</p></div>");
  res.write("<div><p>Param password : " + paramPassword + "</p></div>");
  res.end();
});

http.createServer(app).listen(app.get("port"), function () {
  console.log("Express로 웹 서버를 실행함 : " + app.get("port"));
});
