//Express 기본 모듈 불러오기
const express = require("express"),
  http = require("http"),
  path = require("path");

// Express의 미들웨어 불러오기
const bodyParser = require("body-parser"),
  cookieParser = require("cookie-parser"),
  static = require("serve-static"),
  errorHandler = require("errorhandler");

// 오류 핸들러 모듈 사용
const expressErrorHandler = require("express-error-handler");

// Session 미들웨어 불러오기
const expressSession = require("express-session");

// Express 객체 생성
const app = express();

// 기본 속성 설정
app.set("port", process.env.PORT || 3000);

// body-parser를 사용해 application/x-www-form-urlencoded 파싱
app.use(bodyParser.urlencoded({ extended: false }));

// body-parser를 사용해 application/json 파싱
app.use(bodyParser.json());

// public 폴더를 static으로 오픈
app.use("/public", static(path.join(__dirname, "public")));

// cookie-parser 설정
app.use(cookieParser());

// 세선 설정
app.use(
  expressSession({
    secret: "my key",
    resave: true,
    saveUninitialized: true,
  })
);

// 몽고디비 모듈 사용
const MongoClient = require('mongodb').MongoClient;

// 데이버베이스 객체를 위한 변수 선언
const database;

// 데이터베이스에 연결
function connectDB(){
    // 데이터베이스 연결 정보
    const databaseUrl = 'mongodb://localhost:27017/local';

    // 데이터베이스 연결
    MongoClient.connect(databaseUrl, function(err, db){
        if(err) throw err;

        console.log('데이터베이스에 연결되었습니다. : ' + databaseUrl);

        // database 변수에 할당
        database = db;
    })
}

// 사용자를 인증하는 함수
const authUser = function(database, id, password, callback){
    console.log('authUser 호출됨');

    // users 컬렉션 참조
    const users = database.collection('users');

    // 아이디와 비밀번호를 사용해 검색
    users.find({'id':id, 'password':password}).toArray(function(err, docs){
        if(err){
            callback(err, null);
            return;
        }
        
        if(docs.length > 0){
            console.log('아이디 [%s], 비밀번호 [%s]가 일치하는 사용자 찾음', id, password);
            callback(null, docs);
        }
        else{
            console.log('일치하는 사용자를 찾지 못함');
            callback(null, null);
        }
    })
}

// 라우터 객체 참조
const router = express.Router();

// 로그인 라우팅 함수 - 데이터베이스의 정보와 비교
router.route("/process/login").post(function (req, res) {
  console.log("/process/login 호출됨");
});

// 라우터 객체 등록
app.use("/", router);

//===== 404 오류 페이지 처리 =====//
const eh = expressErrorHandler({
  static: {
    404: "./public/404.html",
  },
});

app.use(expressErrorHandler.httpError(404));
app.use(eh);

//===== 서버 시작 =====//
http.createServer(app).listen(app.get("port"), function () {
  console.log("서버가 시작되었습니다. 포트: " + app.get("port"));

  // 데이터베이스 연결
  connectDB();
});
