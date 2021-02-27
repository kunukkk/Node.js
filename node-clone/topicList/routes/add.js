const mysql = require("mysql");

const mySqlClient = mysql.createConnection(require("../config/db_config"));

// const models = require("../models");

const add = (req, res) => {
  if (req.session.user) {
    res.render("add.html", {});
  } else {
    res.redirect("/");
  }
};

const add_complete = (req, res, next) => {
  const addQuery =
    "INSERT INTO topics(name, description, authorNum) select ?, ?, authors.id FROM authors WHERE NAME=?;";
  mySqlClient.query(
    addQuery,
    [req.body.name, req.body.description, req.body.author],
    (err, row) => {
      if (err) console.log(err);
      res.redirect("/home");
    }
  );
  // models.Topic.create({
  //   name: req.body.name,
  //   description: req.body.description,
  //   authorNum: models.Author.findOne({
  //     attributes: ["id"],
  //     where: { name: req.body.author },
  //   }).then((row) => {
  //     console.log(row);
  //     return row;
  //   }),
  // })
  //   .then((row) => {
  //     console.log(row);
  //     redirect("/home");
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //     next(err);
  //   });
};

module.exports = { add, add_complete };
