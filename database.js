const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  "credit_management_system",
  "root",
  "hero1911",
  {
    host: "localhost",
    dialect: "mysql",
  }
);

module.exports = sequelize;
