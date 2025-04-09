const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const Produto = sequelize.define("Produto", {
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    quantidade:{
        type: DataTypes.INTEGER,        
        allowNull: false
    },
    preco: {
        type: DataTypes.FLOAT,        
        allowNull: false,    
    },
});

module.exports = Produto;