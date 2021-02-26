const express = require("express"),
  app = express(),
  http = require("http").createServer(app),
  bodyParser = require("body-parser"),
  router = express.Router();

const cookieParser = require("cookie-parser"),
  expressSession = require("express-session");

const expressErrorHandler = require("express-error-handler");

const cors = require("cors");

app.set("port", process.env.PORT || 3000);
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("public", express.static(__dirname + "/public"));

app.set("views", __dirname + "/public");
app.engine("html", require("ejs").renderFile);
app.set("view engine", "ejs");

app.use(cookieParser());
app.use(
  expressSession({
    secret: "my key",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(cors());

const register = require("./routes/register");
router.route("/register").get(register.register);
router.route("/register/complete").post(register.register_complete);

const login = require("./routes/login");
router.route("/").get(login.login);
router.route("/login").post(login.login_check);

const logout = require("./routes/logout");
router.route("/logout").get(logout);

const index = require("./routes/index");
router.route("/home").get(index);

const addTopic = require("./routes/add");
router.route("/add").get(addTopic.add);
router.route("/add/complete").post(addTopic.add_complete);

const deleteTopic = require("./routes/delete");
router.route("/delete").get(deleteTopic.deleteTopic);
router.route("/delete/complete").post(deleteTopic.delete_complete);

const updateTopic = require("./routes/update");
router.route("/update/:id").get(updateTopic.update);
router.route("/update/complete").post(updateTopic.update_complete);

app.use("/", router);

let errorHandler = require("errorhandler");
errorHandler = expressErrorHandler({
  static: {
    404: "./public/404.html",
  },
});

app.use(expressErrorHandler.httpError(404));
app.use(errorHandler);

http.listen(app.get("port"), () => {
  console.log("server start at", app.get("port"));
});
