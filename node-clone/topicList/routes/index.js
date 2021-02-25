const mysql = require("mysql");

const mySqlClient = mysql.createConnection(require("../config/db_config"));

const index = (req, res) => {
  if (req.session.user) {
    const listQuery =
      "SELECT t.id, t.name as t_name, t.description, a.name as a_name FROM topics t, authors a WHERE t.author = a.id;";
    mySqlClient.query(listQuery, (err, row) => {
      if (err) console.log("database error");
      res.render("index.html", { name: req.session.user.name, row: row });
    });
  } else {
    res.redirect("/");
  }
};

module.exports = index;
