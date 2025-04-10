
# 🌐 API Controle de Estoque - Rafael Florindo

[![Node.js](https://img.shields.io/badge/Node.js-20.11.1-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express.js-4.x-000000?logo=express&logoColor=white)](https://expressjs.com/)
[![CORS](https://img.shields.io/badge/CORS-ativado-blue)](https://developer.mozilla.org/pt-BR/docs/Web/HTTP/CORS)
[![dotenv](https://img.shields.io/badge/.env-gerenciado-8A2BE2)](https://www.npmjs.com/package/dotenv)
[![Sequelize](https://img.shields.io/badge/ORM-Sequelize-3f62af?logo=sequelize)](https://sequelize.org/)
![SQLite](https://img.shields.io/badge/Database-SQLite-blue)
[![RESTful](https://img.shields.io/badge/API-RESTful-brightgreen)]()
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?logo=javascript&logoColor=000)](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)
[![Status](https://img.shields.io/badge/status-em%20desenvolvimento-yellow)]()

Esta é uma API de Controle de Estoque simples, desenvolvida com alunos do curso de Análise e Desenvolvimento de Sistemas da Faculdade SENAC, utilizando Node.js.
O projeto tem como objetivo funcionar como uma API RESTful, permitindo a realização de operações CRUD (Create, Read, Update, Delete) com produtos, utilizando o ORM Sequelize e banco de dados SQLite..

---

## ✨ Funcionalidades

- 🧩 **Estrutura modular com Express**: A API foi construída com o framework Express, utilizando separação de responsabilidades para rotas, modelos e configuração de banco.
- 💾 **Persistência de dados com SQLite**: Utiliza o ORM Sequelize para conexão com banco de dados SQLite, armazenando informações de produtos.
- 🔄 **CRUD completo de produtos**: A API oferece endpoints RESTful para criar, listar, atualizar e excluir produtos.
- 🌐 **CORS habilitado**: Permite o consumo da API por aplicações frontend em diferentes origens.
- 🔒 **Variáveis de ambiente com dotenv**: Utilização de `.env` para configuração da porta e outras variáveis sensíveis.


---

## 🚀 Como rodar o projeto

1. Clone o repositório:
   ```bash
   git clone https://github.com/rafaelflorindo/ControleEstoque.git
2. Acesse a pasta:
    ```bash
    cd MeuFinaceiro
3. Instale as dependências:
    ```bash
    npm install
4. Inicie o projeto:
    ```bash
    npm start
 A aplicação estará disponível em http://localhost:<porta separada pelo ReactNative, ou emulada pelo Android Stude>

📌 Autor
Desenvolvido por Rafael Florindo — 2025

---
## 🛠️ Tecnologias Utilizadas
- ⚙️ Node.js
- 🚀 Express.js
- 🔐 CORS
- 🌱 dotenv (.env)
- 🧬 Sequelize (ORM)
- 🗄️ Banco de dados relacional (ex: SQLite, PostgreSQL etc.)
- 💡 JavaScript (ES6+)


## 📌 Rotas da API

**Base URL:** `http://localhost:3000`

---

### 🔍 GET /**  
- **Descrição:** Rota principal da API.  
- **Resposta:** Texto simples: `"Rota Principal"`

---

### 📦 GET /produtos  
- **Descrição:** Lista todos os produtos cadastrados.  
- **Resposta:** JSON com todos os produtos.

---

### 📦 GET /produtos/:id  
- **Descrição:** Retorna um produto específico pelo ID.  
- **Parâmetros:**  
  - `id` (number): ID do produto.  
- **Resposta:** JSON com os dados do produto.

---

### ➕ POST /produtos  
- **Descrição:** Cadastra um novo produto.  
- **Body (JSON):**
```json
{
  "nome": "Nome do Produto",
  "preco": 10.99,
  "descricao": "Descrição do produto"
}
```

---
### ✏️ PUT /produtos/:id  
- **Descrição:** Atualiza um produto existente pelo ID.  
- **Parâmetros:**  
  - `id` (number): ID do produto.  
- **Body (JSON):**
```json
{
  "nome": "Produto Atualizado",
  "preco": 12.99,
  "descricao": "Nova descrição"
}
```

---
### ❌ DEL /produtos/:id  
- **Descrição:** Excluir um produto existente pelo ID.  
- **Parâmetros:**  
  - `id` (number): ID do produto.  
- **Body (JSON):**
```json
{
  "message": "Produto Excluido com sucesso",
}
