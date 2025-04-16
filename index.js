const express = require("express");
const sequelize = require("./database");
const Produto = require("./models/Produto");

const cors = require('cors');//habilita o Node a receber conexões
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(cors());


const port = process.env.PORT || 3000;

sequelize.sync().then(() => {
    console.log("Banco de dados conectado!");
});

app.get("/", (req,res)=>{
    res.send("Rota Principal");
});

app.get("/produtos", async (req, res) => {
    try {
        const produtos = await Produto.findAll();
        res.status(200).json(produtos);
    } catch (error) {
        res.status(500).json({ error: "Erro ao buscar produtos." });
    }
});

app.get("/produtos/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ mensagem: "ID inválido. Use um número." });
        }
        const produto = await Produto.findByPk(id);
        if (!produto) 
            return res.status(404).json({ error: "Produto não encontrado" });
        res.status(200).json(produto);
    } catch (error) {
        res.status(500).json({ error: "Erro ao buscar o produto." });
    }
});


app.post("/produtos", async (req, res) => {
    try {
        const novoProduto = await Produto.create(req.body);
        res.status(201).json(novoProduto);
    } catch (error) {
        res.status(500).json({ error: "Erro ao criar produto." });
    }
});

app.put("/produtos/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ mensagem: "ID inválido. Use um número." });
        }

        const produto = await Produto.findByPk(id);
        if (!produto) 
            return res.status(204).json({ error: "Produto não encontrado" });

        await produto.update(req.body);
        res.status(200).json(produto);
    } catch (error) {
        res.status(500).json({ error: "Erro ao atualizar produto." });
    }
});

app.delete("/produtos/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ mensagem: "ID inválido. Use um número." });
        }
        const produto = await Produto.findByPk(id);
        if (!produto) 
            return res.status(204).json({ error: "Produto não encontrado" });
        
        await produto.destroy();
        res.status(200).json({ message: "Produto removido!" });
    } catch (error) {
        res.status(500).json({ error: "Erro ao remover produto." });
    }
});

app.listen(port, function(){
    console.log(`Servidor Rodando em: http://localhost:${port}`);
})
