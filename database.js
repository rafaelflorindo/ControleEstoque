/*const { Sequelize } = require("sequelize");
const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "./database.sqlite",
});

module.exports = sequelize;*/

const { Sequelize } = require("sequelize");

const sequelize = new Sequelize('nodeSequileze', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
});

module.exports = sequelize;
//npm install mysql2