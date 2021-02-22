const mysql = require("mysql");

const mySqlClient = mysql.createConnection(require("../config/db_config"));

const index = (req, res) => {
  const listQuery = "select id, name, description from topics;";
  mySqlClient.query(listQuery, (err, row) => {
    if (err) console.log("database error");
    res.render("index.html", { row: row });
  });
};

module.exports = index;
