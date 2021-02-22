const mysql = require("mysql");

const mySqlClient = mysql.createConnection(require("../config/db_config"));

const update = (req, res) => {
  const showQuery =
    "select id, name, description, author from topics where id=?;";
  mySqlClient.query(showQuery, req.params.id, (err, row) => {
    if (err) console.log(err);
    res.render("update.html", {
      id: row[0].id,
      name: row[0].name,
      description: row[0].description,
      author: row[0].author,
    });
  });
};

const update_complete = (req, res) => {
  const updateQuery =
    "update topics set name=?, description=?, author=? where id=?";
  mySqlClient.query(
    updateQuery,
    [req.body.name, req.body.description, req.body.author, req.body.id],
    (err, row) => {
      if (err) console.log(err);
      res.redirect("/");
    }
  );
};

module.exports = { update, update_complete };
