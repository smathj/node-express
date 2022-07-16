const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../database/sequelize");

const Board = sequelize.define(
  "Board",
  {
    seq: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    timestamps: true,
  }
);

(async () => {
  await sequelize.sync({ force: false });
})();

module.exports = Board;
