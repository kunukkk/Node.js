// Express 기본 모듈 불러오기
const express = require("express"),
  http = require("http"),
  path = require("path");

// Express의 미들웨어 불러오기
const bodyParser = require("body-parser"),
  cookieParser = require("cookie-parser"),
  static = require("serve-static");

// 에러 핸들러 모듈 사용
const expressErrorHandler = require("express-error-handler");

// Session 미들웨어 불러오기
// express-session : 세션도 상태 정보를 저장하는 역할을 하지만 쿠키와 달리 서버 쪽에 저장된다.
//                   대표적인 예로는 로그인을 했을 때 저장되는 세션
/* 사용자가 로그인하면 세션이 만들어지고 로그아웃하면 세션이 삭제되는 기능을 만들면
   사용자가 로그인하기 전에는 접근이 제한된 페이지를 보지 못하도록 설정할 수 있음 */
const expressSession = require("express-session");

// 익스프레스 객체 생성
const app = express();

// 기본 속성 설정
app.set("port", process.env.PORT || 3000);

// body-parser를 이용해 application/x-www-form-urlencoded 파싱
app.use(bodyParser.urlencoded({ extended: false }));

// body-parser를 이용해 application/json 파싱
app.use(bodyParser.json());

app.use("/public", static(path.join(__dirname, "public")));

// cookie-parser 설정
// 세션을 사용할때는 쿠키도 같이 사용함
app.use(cookieParser());

// 세션 설정
app.use(
  expressSession({
    secret: "my key",
    // 쿠키를 임의로 변조하는것을 방지하기 위한 값
    // 이 값을 통하여 세션을 암호화 하여 저장
    resave: true,
    // 세션을 언제나 저장할 지 (변경되지 않아도) 정하는 값
    // express-session documentation에서는 이 값을 false 로 하는것을 권장
    saveUninitialized: true,
    // 세션이 저장되기 전에 uninitialized 상태로 미리 만들어서 저장
  })
);

// 라우터 사용하여 라우팅 함수 등록
const router = express.Router();

// 로그인 라우팅 함수 - 로그인 후 세션 저장함
router.route("/process/login").post(function (req, res) {
  console.log("/process/login 호출됨.");

  let paramId = req.body.id || req.query.id;
  let paramPassword = req.body.password || req.query.password;

  if (req.session.user) {
    // 이미 로그인된 상태
    console.log("이미 로그인되어 상품 페이지로 이동합니다.");

    res.redirect("/public/product.html");
  }
  else {
    // 세션 저장
    req.session.user = {
      id: paramId,
      name: "소녀시대",
      authorized: true,
    };

    res.writeHead("200", { "Content-Type": "text/html;charset=utf8" });
    res.write("<h1>로그인 성공</h1>");
    res.write("<div><p>Param name : " + req.session.user.name + "</p></div>");
    res.write("<div><p>Param id : " + paramId + "</p></div>");
    res.write("<div><p>Param password : " + paramPassword + "</p></div>");
    res.write("<br><br><a href='/process/product'>상품 페이지로 이동하기</a>");
    res.end();
  }
});

// 로그아웃 라우팅 함수 - 로그아웃 후 세션 삭제함
router.route("/process/logout").get(function (req, res) {
  console.log("/process/logout 호출됨.");

  if (req.session.user) {
    // 로그인된 상태
    console.log("로그아웃합니다.");

    req.session.destroy(function (err) {
      if (err) {
        throw err;
      }

      console.log("세션을 삭제하고 로그아웃되었습니다.");
      res.redirect("/public/login2.html");
    });
  } else {
    // 로그인 안된 상태
    console.log("아직 로그인되어있지 않습니다.");

    res.redirect("/public/login2.html");
  }
});

// 상품정보 라우팅 함수
router.route("/process/product").get(function (req, res) {
  console.log("/process/product 호출됨.");

  if (req.session.user) {
    res.redirect("/public/product.html");
  } else {
    res.redirect("/public/login2.html");
  }
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
