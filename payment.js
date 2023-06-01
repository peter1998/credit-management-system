const { DataTypes } = require("sequelize");
const sequelize = require("./database");

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
      model: "loans",
      key: "id",
    },
    onDelete: "CASCADE",
  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

module.exports = Payment;
