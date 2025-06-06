const express = require("express");
const sequelize = require("./database");


const Produto = require("./models/Produto");
const Usuario = require("./models/Usuario");
const Estoque = require("./models/Estoque");

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
/********************************************************* */
/*PRODUTO*/
/********************************************************* */
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
        if (produto.length === 0) {
            return res.status(200).json({ message: "Nenhum produto encontrado.", data: [] });
        }
        res.status(200).json(produto);
    } catch (error) {
        res.status(500).json({ error: "Erro ao buscar o produto." });
    }
});

app.post("/produtos", async (req, res) => {

    const { nome, descricao, quantidadeMinima } = req.body;

    if (typeof nome !== "string" || nome.trim() === "") {
        return res.status(400).json({ error: "Nome é obrigatório e deve ser uma string." });
    }
    
    if (typeof descricao !== "string" || descricao.trim() === "") {
        return res.status(400).json({ error: "Descrição é obrigatório e deve ser uma string." });
    }
    
    if (!Number.isInteger(quantidadeMinima) || quantidadeMinima < 0) {
        return res.status(400).json({ error: "Quantidade Minima deve ser um número inteiro positivo." });
    }
    
    try {
        const novoProduto = await Produto.create(req.body);
        res.status(201).json(novoProduto);
    } catch (error) {
        res.status(500).json({ error: "Erro ao criar produto." });
    }
});

app.put("/produtos/:id", async (req, res) => {
    const { nome, descricao, quantidadeMinima } = req.body;

    if (typeof nome !== "string" || nome.trim() === "") {
        return res.status(400).json({ error: "Nome é obrigatório e deve ser uma string." });
    }
    
    if (typeof descricao !== "string" || descricao.trim() === "") {
        return res.status(400).json({ error: "Descrição é obrigatório e deve ser uma string." });
    }
    
    if (!Number.isInteger(quantidadeMinima) || quantidadeMinima < 0) {
        return res.status(400).json({ error: "Quantidade Minima deve ser um número inteiro positivo." });
    }

   /* if (typeof preco !== "number" || preco < 0) {
        return res.status(400).json({ error: "Preço deve ser um número positivo." });
    }
*/
    try {
        const id = Number(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ error: "ID inválido. Use um número." });
        }

        const produto = await Produto.findByPk(id);
        if (produto.length === 0) {
            return res.status(404).json({ error: "Produto não encontrado." });
        }

        await produto.update(req.body);
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
        if (produto.length === 0) {
            return res.status(404).json({ error: "Produto não encontrado." });
        }
        await produto.destroy();
        res.status(200).json({ message: "Produto removido com sucesso!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao remover produto." });
    }
});

//************************************************ */
app.get("/usuarios", async (req, res) => {
    try {
        const usuarios = await Usuario.findAll();
        if (usuarios.length === 0) {
            return res.status(200).json({ message: "Nenhum usuário encontrado.", data: [] });
        }
        res.status(200).json(usuarios);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao buscar usuarios." });
    }
});

app.get("/usuarios/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ error: "ID inválido. Use um número." });
        }
        const usuario = await Usuario.findByPk(id);
        if (usuario.length === 0) {
            return res.status(200).json({ message: "Nenhum usuário encontrado.", data: [] });
        }
        res.status(200).json(usuario);
    } catch (error) {
        res.status(500).json({ error: "Erro ao buscar o usuário." });
    }
});

app.post("/usuarios", async (req, res) => {
    const {nome, email, telefone, senha, permissao} = req.body;
    if (typeof nome !== "string" || nome.trim() === "") {
        return res.status(400).json({ error: "Nome é obrigatório e deve ser uma string." });
    }
    if (typeof email !== "string" || email.trim() === "") {
        return res.status(400).json({ error: "E-mail é obrigatório e deve ser uma string." });
    }
    if (typeof telefone !== "string" || telefone.trim() === "") {
        return res.status(400).json({ error: "Telefone é obrigatório e deve ser uma string." });
    }
    if (typeof senha !== "string" || senha.trim() === "") {
        return res.status(400).json({ error: "Senha é obrigatório e deve ser uma string." });
    }
    
    if (typeof permissao !== "string" || permissao.trim() === "") {
        return res.status(400).json({ error: "Permissão é obrigatório e deve ser uma string." });
    }

    try {
        const novoUsuario = await Usuario.create(req.body);
        res.status(201).json(novoUsuario);
    } catch (error) {
        res.status(500).json({ error: "Erro ao criar usuário." });
    }
});

app.put("/usuarios/:id", async (req, res) => {
    const {nome, telefone, permissao} = req.body;
    
    if (typeof nome !== "string" || nome.trim() === "") {
        return res.status(400).json({ error: "Nome é obrigatório e deve ser uma string." });
    }
    if (typeof telefone !== "string" || telefone.trim() === "") {
        return res.status(400).json({ error: "Telefone é obrigatório e deve ser uma string." });
    } 

    if (typeof permissao !== "string" || permissao.trim() === "") {
        return res.status(400).json({ error: "Permissão é obrigatório e deve ser uma string." });
    }

    try {
        const id = Number(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ error: "ID inválido. Use um número." });
        }

        const usuario = await Usuario.findByPk(id);
        if (usuario.length === 0) {
            return res.status(404).json({ error: "Usuario não encontrado." });
        }

        await usuario.update(req.body);
        res.status(200).json(usuario);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao atualizar usuário." });
    }
});

app.delete("/usuarios/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ error: "ID inválido. Use um número." });
        }
        const usuario = await Usuario.findByPk(id);
        if (usuario.length === 0) {
            return res.status(404).json({ error: "Usuario não encontrado." });
        }
        await usuario.destroy();
        res.status(200).json({ message: "Usuario removido com sucesso!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao remover usuario." });
    }
});
/******************************************************* */
app.post("/auth/login", async(req, res)=>{
    const {email, senha} = req.body;
    //console.log(email, senha)
    if (typeof email !== "string" || email.trim() === "") {
        return res.status(400).json({ error: "E-mail é obrigatório e deve ser uma string." });
    }
    if (typeof senha !== "string" || senha.trim() === "") {
        return res.status(400).json({ error: "Senha é obrigatório e deve ser uma string." });
    }
    
    const usuario = await Usuario.findOne({where : {email}})
    //console.log(usuario);
    
    if(!usuario)
        return res.status(500).json({erro: "Usuário não encontrado"})
   
    if (senha === usuario.senha){
        return res.status(200).json({
            token: "123",
            message:"Usuário Autenticado com Sucesso",
            data: {
                nome: usuario.nome, 
                email: usuario.email,
                permissao: usuario.permissao
            }, 
        })
    }else{
        return res.status(500).json({message:"Senha invalida"})
    }
})
/*******************************************************************/
//ROTAS DE ESTOQUE
/*******************************************************************/
app.post("/estoque", async (req, res) => {

    const { ProdutoId } = req.body;
    try {
        const novoEstoque = await Estoque.create(req.body,
            {
                ProdutoId: ProdutoId
            }
            );
        res.status(201).json(novoEstoque);
    } catch (error) {
        res.status(500).json({ error: "Erro ao criar estoque." });
    }
});

app.get("/estoques", async (req, res) => {
    try {
        const estoques = await Estoque.findAll(
            {
                include: Produto
            });

            if (estoques.length === 0) {
            return res.status(200).json(
                { message: "Nenhum estoque encontrado.", 
                    data: [] 
                }
                );
        }

        res.status(200).json(estoques);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao buscar estoques." });
    }
});
/* 
getOne
put 
del
*/


app.listen(port, function(){
    console.log(`Servidor Rodando em: http://localhost:${port}`);
})
