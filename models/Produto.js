const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const Produto = sequelize.define("Produto", {
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    quantidade: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 0
        }
    },
    preco: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
            min: 0.01
        }
    }
});

module.exports = Produto;