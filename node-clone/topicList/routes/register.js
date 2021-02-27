const crypto = require("crypto");
const models = require("../models");

// const mysql = require("mysql");
// const mySqlClient = mysql.createConnection(require("../config/db_config"));

const register = (req, res) => {
  if (!req.session.user) {
    res.render("register.html", {});
  } else {
    res.redirect("/home");
  }
};

const register_complete = (req, res) => {
  // const id = req.body.id;
  // const password = crypto
  //   .createHash("sha512")
  //   .update(req.body.password)
  //   .digest("base64");
  // const name = req.body.name;
  // const registerQuery =
  //   "insert into users (id, password, name) values (?, ?, ?)";
  // mySqlClient.query(registerQuery, [id, password, name], (err, row) => {
  //   if (err) {
  //     res.send(
  //       `<script type="text/javascript">alert("${id} is already exist"); window.location="/register";</script>`
  //     );
  //   } else {
  //     res.redirect("/");
  //   }
  // });
  models.User.create({
    id: req.body.id,
    password: crypto
      .createHash("sha512")
      .update(req.body.password)
      .digest("base64"),
    name: req.body.name,
  })
    .then((row) => {
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
      res.send(
        `<script type="text/javascript">alert("${req.body.id} is already exist"); window.location="/register";</script>`
      );
    });
};

module.exports = { register, register_complete };
