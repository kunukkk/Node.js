// const mysql = require("mysql");

// const mySqlClient = mysql.createConnection(require("../config/db_config"));

const models = require("../models");

const deleteTopic = (req, res, next) => {
  if (req.session.user) {
    // const listQuery = "select name from topics";
    // mySqlClient.query(listQuery, (err, row) => {
    //   if (err) console.log("database error");
    //   res.render("delete.html", { row: row });
    // });
    models.Topic.findAll({
      attributes: ["name"],
    })
      .then((row) => {
        res.render("delete.html", { row: row });
      })
      .catch((err) => {
        console.log(err);
        next(err);
      });
  } else {
    res.redirect("/");
  }
};

const delete_complete = (req, res, next) => {
  // const deleteQuery = "delete from topics where name = ?";
  // mySqlClient.query(deleteQuery, req.body.select, (err, row) => {
  //   if (err) console.log(err);
  //   console.log(row);
  //   res.redirect("/home");
  // });
  models.Topic.destroy({
    where: { name: req.body.select },
  })
    .then((row) => {
      console.log(row);
      res.redirect("/home");
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
};

module.exports = { deleteTopic, delete_complete };
