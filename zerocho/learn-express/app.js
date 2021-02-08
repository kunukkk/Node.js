var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const session = require("express-session");
const flash = require("connect-flash");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
// ex GET / 200 51.267 ms - 1539 : (HTTP요청(GET)) (주소(/)) (HTTP상태코드(200)) (응답속도(51.267ms)) - (응답바이트(1539))
app.use(express.static(path.join(__dirname, "putlic")));
app.use(express.json());
app.use(express.urlencoded({ extended: false })); // body-parser가 express에 내장되어 따로 호출할 필요가 없다.
app.use(cookieParser("secret code"));
app.use(
  session({
    resave: false, // 요청이 왔을 때 세션에 수정 사항이 생기지 않더라도 세련을 다시 저장할지에 대한 설정
    saveUninitialized: false, // 세션에 저장할 내역이 없더라도 세션을 저장할지에 대한 설정
    secret: "secret code", // 필수 항목으로 cookie-parser의 비밀키와 같은 역할
    // express-session은 세션 관리 시 클라이언트에 쿠키를 보낸다. 이를 세션 쿠키라고 한다.
    // 안전하게 쿠키를 전송하려면 쿠키에 서명을 추가해야 하고, 쿠키를 서명하는 데 secret의 값이 필요하다.
    // cookie-parser의 secret과 같게 설정해야 한다.
    cookie: {
      httpOnly: true, // 클라이언트에서 쿠키를 확인 여부 설정
      secure: false, // https가 아닌 환경에서도 사용 가능 여부 설정
      // 배포 시에는 https를 적용하고 true로 설정하도록 권장
    },
  })
);
app.use(flash());
app.use("/", indexRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
