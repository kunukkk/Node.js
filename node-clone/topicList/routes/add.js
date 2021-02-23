const mysql = require("mysql");

const mySqlClient = mysql.createConnection(require("../config/db_config"));

const add = (req, res) => {
  res.render("add.html", {});
};

const add_complete = (req, res) => {
  const addQuery =
    "INSERT INTO topics(name, description, author) select ?, ?, authors.id FROM authors WHERE NAME=?;";
  mySqlClient.query(
    addQuery,
    [req.body.name, req.body.description, req.body.author],
    (err, row) => {
      console.log(row);
      res.redirect("/");
    }
  );
};

module.exports = { add, add_complete };
