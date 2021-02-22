const mysql = require("mysql");

const mySqlClient = mysql.createConnection(require("../config/db_config"));

const index = (req, res) => {
  const listQuery =
    "SELECT t.id, t.name as t_name, t.description, a.name as a_name FROM topics t, authors a WHERE t.author = a.id;";
  mySqlClient.query(listQuery, (err, row) => {
    if (err) console.log("database error");
    console.log(row);
    res.render("index.html", { row: row });
  });
};

module.exports = index;
