const mysql = require("mysql");

const mySqlClient = mysql.createConnection(require("../config/db_config"));

const deleteTopic = (req, res) => {
  const listQuery = "select name from topics";
  mySqlClient.query(listQuery, (err, row) => {
    if (err) console.log("database error");
    res.render("delete.html", { row: row });
  });
};

const delete_complete = (req, res) => {
  const deleteQuery = "delete from topics where name = ?";
  mySqlClient.query(deleteQuery, req.body.select, (err, row) => {
    console.log(row);
    res.redirect("/");
  });
};

module.exports = { deleteTopic, delete_complete };
