// const mysql = require("mysql");

// const mySqlClient = mysql.createConnection(require("../config/db_config"));
const models = require("../models");

const index = (req, res, next) => {
  // if (req.session.user) {
  //   const listQuery =
  //     "SELECT t.id, t.name as t_name, t.description, a.name as a_name FROM topics t, authors a WHERE t.author = a.id;";
  //   mySqlClient.query(listQuery, (err, row) => {
  //     if (err) console.log("database error");
  //     res.render("index.html", { name: req.ses sion.user.name, row: row });
  //   });
  // } else {
  //   res.redirect("/");
  // }
  if (req.session.user) {
    models.Topic.findAll({
      include: [
        {
          model: models.Author,
          attributes: ["name"],
        },
      ],
      attributes: ["id", "name", "description"],
      raw: true,
    })
      .then((row) => {
        console.log(row);
        res.render("index.html", { username: req.session.user.name, row: row });
      })
      .catch((err) => {
        console.log(err);
        next(err);
      });
  } else {
    res.redirect("/");
  }
};

module.exports = index;
