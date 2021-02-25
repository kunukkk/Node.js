const mysql = require("mysql");

const mySqlClient = mysql.createConnection(require("../config/db_config"));

const login = (req, res) => {
  res.render("login.html", {});
};

const login_check = (req, res) => {
  const loginQuery = "select id, name from users where id=? and password=?";
  mySqlClient.query(
    loginQuery,
    [req.body.id, req.body.password],
    (err, row) => {
      if (err) console.log(err);
      else {
        if (row[0]) {
          req.session.user = {
            id: row[0].name,
            name: row[0].name,
          };
          res.redirect("/home");
        } else {
          res.send(
            '<script type="text/javascript">alert("아이디 또는 비밀번호가 일치하지 않습니다."); window.location="/";</script>'
          );
        }
      }
    }
  );
};

module.exports = { login, login_check };