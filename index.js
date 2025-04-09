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
    const produtos = await Produto.findAll();
    res.json(produtos);
});

app.get("/produtos/:id", async (req, res) => {
    const produto = await Produto.findByPk(req.params.id);
    console.log(req.params.id)
    if (!produto) return res.status(404).json({ error: "Produto não encontrado" });
    res.json(produto);
});


app.post("/produtos", async (req, res) => {
    const novoProduto = await Produto.create(req.body);
    res.status(201).json(novoProduto);
});

app.put("/produtos/:id", async (req, res) => {
    const produto = await Produto.findByPk(req.params.id);
    if (!produto) return res.status(404).json({ error: "Produto não encontrado" });
    await produto.update(req.body);
    res.json(produto);
});

app.delete("/produtos/:id", async (req, res) => {
    const produto = await Produto.findByPk(req.params.id);
    if (!produto) return res.status(404).json({ error: "Produto não encontrado" });
    await produto.destroy();
    res.json({ message: "Produto removido!" });
});

app.listen(port, function(){
    console.log(`Servidor Rodando em: http://localhost:${port}`);
})
