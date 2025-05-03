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

        if (produtos.length === 0) {
            return res.status(200).json({ message: "Nenhum produto encontrado.", data: [] });
        }

        res.status(200).json(produtos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao buscar produtos." });
    }
});

app.get("/produtos/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ error: "ID inválido. Use um número." });
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
    if (typeof nome !== "string" || nome.trim() === "") {
        return res.status(400).json({ error: "Nome é obrigatório e deve ser uma string." });
    }

    if (!Number.isInteger(quantidade) || quantidade < 0) {
        return res.status(400).json({ error: "Quantidade deve ser um número inteiro positivo." });
    }

    if (typeof preco !== "number" || preco < 0) {
        return res.status(400).json({ error: "Preço deve ser um número positivo." });
    }
    try {
        const novoProduto = await Produto.create(req.body);
        res.status(201).json(novoProduto);
    } catch (error) {
        res.status(500).json({ error: "Erro ao criar produto." });
    }
});

app.put("/produtos/:id", async (req, res) => {
    const { nome, quantidade, preco } = req.body;

    if (typeof nome !== "string" || nome.trim() === "") {
        return res.status(400).json({ error: "Nome é obrigatório e deve ser uma string." });
    }

    if (!Number.isInteger(quantidade) || quantidade < 0) {
        return res.status(400).json({ error: "Quantidade deve ser um número inteiro positivo." });
    }

    if (typeof preco !== "number" || preco < 0) {
        return res.status(400).json({ error: "Preço deve ser um número positivo." });
    }

    try {
        const id = Number(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ error: "ID inválido. Use um número." });
        }

        const produto = await Produto.findByPk(id);
        if (!produto) {
            return res.status(404).json({ error: "Produto não encontrado." });
        }

        await produto.update({ nome, quantidade, preco });
        res.status(200).json(produto);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao atualizar produto." });
    }
});

app.delete("/produtos/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({ error: "ID inválido. Use um número." });
        }

        const produto = await Produto.findByPk(id);

        if (!produto) {
            return res.status(404).json({ error: "Produto não encontrado." });
        }

        await produto.destroy();
        res.status(200).json({ message: "Produto removido com sucesso!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao remover produto." });
    }
});

app.listen(port, function(){
    console.log(`Servidor Rodando em: http://localhost:${port}`);
})
