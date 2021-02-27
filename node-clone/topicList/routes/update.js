const mysql = require("mysql");

const mySqlClient = mysql.createConnection(require("../config/db_config"));

const models = require("../models");
const Sequelize = require("sequelize");

const update = (req, res, next) => {
  // if (req.session.user) {
  //   const showQuery =
  //     "SELECT t.id, t.name as t_name, t.description, a.name as a_name FROM topics t, authors a WHERE t.authorNum = a.id and t.id=?;";
  //   mySqlClient.query(showQuery, req.params.id, (err, row) => {
  //     if (err) console.log(err);
  //     res.render("update.html", {
  //       id: row[0].id,
  //       t_name: row[0].t_name,
  //       description: row[0].description,
  //       a_name: row[0].a_name,
  //     });
  //   });
  // } else {
  //   res.redirect("/");
  // }
  models.Topic.findOne({
    include: [
      {
        model: models.Author,
        attributes: ["name"],
      },
    ],
    attributes: ["id", "name", "description"],
    where: { id: req.params.id },
    raw: true,
  })
    .then((row) => {
      console.log(row);
      res.render("update.html", {
        id: row.id,
        t_name: row.name,
        description: row.description,
        a_name: row["author.name"],
      });
    })
    .catch((err) => {
      console.log(err);
      next("err");
    });
};

const update_complete = (req, res, next) => {
  const updateQuery =
    "UPDATE topics SET NAME=?, description=?, authorNum=(SELECT id FROM authors WHERE NAME=?) WHERE id=?;";
  mySqlClient.query(
    updateQuery,
    [req.body.name, req.body.description, req.body.author, req.body.id],
    (err, row) => {
      if (err) console.log(err);
      res.redirect("/home");
    }
  );
  // models.Topic.update(
  //   {
  //     name: req.body.name,
  //     description: req.body.description,
  //     authorNum: Sequelize.literal(
  //       `SELECT id FROM authors WHERE NAME=${req.body.author}`
  //     ),
  //   },
  //   {
  //     where: { id: req.body.id },
  //   }
  // )
  //   .then((row) => {
  //     console.log(row);
  //     res.redirect("/home");
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //     next(err);
  //   });
};

module.exports = { update, update_complete };
