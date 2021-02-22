const express = require("express"),
  app = express(),
  http = require("http").createServer(app),
  bodyParser = require("body-parser"),
  router = express.Router(),
  fs = require("fs"),
  ejs = require("ejs");

app.set("port", process.env.PORT || 3000);
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("public", express.static(__dirname + "/public"));

app.set("views", __dirname + "/public");
app.engine("html", require("ejs").renderFile);
app.set("view engine", "ejs");

const index = require("./routes/index.js");
router.route("/").get(index);

const addTopic = require("./routes/add.js");
router.route("/add").get(addTopic.add);
router.route("/add/complete").post(addTopic.add_complete);

const deleteTopic = require("./routes/delete.js");
router.route("/delete").get(deleteTopic.deleteTopic);
router.route("/delete/complete").post(deleteTopic.delete_complete);

const updateTopic = require("./routes/update.js");
router.route("/update/:id").get(updateTopic.update);
router.route("/update/complete").post(updateTopic.update_complete);

app.use("/", router);

http.listen(app.get("port"), () => {
  console.log("server start at ", app.get("port"));
});
