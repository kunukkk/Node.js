const mysql = require("mysql");

const mySqlClient = mysql.createConnection(require("../config/db_config"));

const update = (req, res) => {
  const showQuery =
    "SELECT t.id, t.name as t_name, t.description, a.name as a_name FROM topics t, authors a WHERE t.author = a.id and t.id=?;";
  mySqlClient.query(showQuery, req.params.id, (err, row) => {
    if (err) console.log(err);
    res.render("update.html", {
      id: row[0].id,
      t_name: row[0].t_name,
      description: row[0].description,
      a_name: row[0].a_name,
    });
  });
};

const update_complete = (req, res) => {
  const updateQuery =
    "UPDATE topics SET NAME=?, description=?, author=(SELECT id FROM authors WHERE NAME=?) WHERE id=?;";
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