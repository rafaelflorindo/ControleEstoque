const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const Produto = sequelize.define("Produto", {
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    descricao: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    quantidadeMinima:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 10
        }
    }
});

module.exports = Produto;