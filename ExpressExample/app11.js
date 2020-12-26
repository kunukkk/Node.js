// Express 기본 모듈 불러오기
const express = require("express"),
  http = require("http"),
  path = require("path");

// Express의 미들웨어 불러오기
const bodyParser = require("body-parser"),
  // cookie-parser() : 쿠키는 클라이언트 웹 브라우저에 저장되는 정보로서
  //                   일정기간 동안 저장하고 싶을 때 사용한다.
  cookieParser = require("cookie-parser"),
  static = require("serve-static");

// 에러 핸들러 모듈 사용
const expressErrorHandler = require("express-error-handler");

// 익스프레스 객체 생성
const app = express();

// 기본 속성 설정
app.set("port", process.env.PORT || 3000);

// body-parser를 이용해 application/x-www-form-urlencoded 파싱
app.use(bodyParser.urlencoded({ extended: false }));

// body-parser를 이용해 application/json 파싱
app.use(bodyParser.json());

app.use("/public", static(path.join(__dirname, "public")));

// cookie-parser설정: 클라이언트 웹 브라우저에 저장되는 정보로서 일정 기간 동안 저장하고 싶을 때 사용
app.use(cookieParser());

// 라우터 사용하여 라우팅 함수 등록
const router = express.Router();

router.route("/process/showCookie").get(function (req, res) {
  console.log("/process/showCookie 호출됨.");

  res.send(req.cookies);
});

router.route("/process/setUserCookie").get(function (req, res) {
  console.log("/process/setUserCookie 호출됨.");

  // 쿠키 설정
  res.cookie("user", {
    id: "mike",
    name: "소녀시대",
    authorized: true,
  });

  // redirect로 응답 >> setUserCookie -> showCookie
  res.redirect("/process/showCookie");
});

app.use("/", router);

// 404 에러 페이지 처리
const errorHandler = expressErrorHandler({
  static: {
    404: "./public/404.html",
  },
});

app.use(expressErrorHandler.httpError(404));
app.use(errorHandler);

// Express 서버 시작
http.createServer(app).listen(app.get("port"), function () {
  console.log("Express server listening on port " + app.get("port"));
});
