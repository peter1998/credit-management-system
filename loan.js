const { DataTypes } = require("sequelize");
const sequelize = require("./database"); // make sure the path to your database file is correct

const Loan = sequelize.define("Loan", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  borrowerName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  term: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Loan;
