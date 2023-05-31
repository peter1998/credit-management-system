const { DataTypes } = require("sequelize");
const sequelize = require("./database"); // make sure the path to your database file is correct

const Payment = sequelize.define("Payment", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  loanId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "loans", // 'loans' refers to the table name
      key: "id",
    },
    onDelete: "CASCADE", // delete payment when associated loan is deleted
  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

module.exports = Payment;
