const path = require("path");
const Sequelize = require("sequelize");

const config = require("../config/db_config");
const db = {};

const sequelize = new Sequelize(
  config.database,
  config.user,
  config.password,
  config
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = require("./user")(sequelize, Sequelize);
db.Topic = require("./topic")(sequelize, Sequelize);
db.Author = require("./author")(sequelize, Sequelize);

db.Author.hasMany(db.Topic, { foreignKey: "authorNum", sourceKey: "id" });
db.Topic.belongsTo(db.Author, { foreignKey: "authorNum", targetKey: "id" });

module.exports = db;
