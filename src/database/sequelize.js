const { Sequelize } = require("sequelize");

module.exports = new Sequelize("node_express", "root", "1234", {
  host: "localhost",
  dialect: "mariadb",
  port: 3307,
});

// async function init() {
//   const sequelize = new Sequelize("node_express", "root", "1234", {
//     host: "localhost",
//     dialect: "mariadb",
//     port: 3307,
//   });
//
//   try {
//     await sequelize.authenticate();
//     console.log("Connection has been established successfully.");
//   } catch (error) {
//     console.error("Unable to connect to the database:", error);
//   }
// }
// init();
