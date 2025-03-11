require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());



// Conexão com o MongoDB

const mongoose = require('mongoose');

const MONGO_URI = "mongodb+srv://Fabio:Fabio4040@users.hcegzhv.mongodb.net/?retryWrites=true&w=majority&appName=Users" 
    mongoose.connect(MONGO_URI, {

        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
        .then(() => console.log('✅ Conectado ao MongoDB!'))
        .catch(err => console.error('❌ Erro ao conectar:', err));




// Definição do modelo de usuário
const Usuario = mongoose.model("Usuario", new mongoose.Schema({
    nome: String,
    email: String,
    senha: String
}));

// Rota para cadastrar usuário
app.post('/cadastro', async (req, res) => {
    try {
        const { nome, email, senha } = req.body;
        if (!nome || !email || !senha) {
            return res.status(400).json({ error: "Preencha todos os campos!" });
        }

        const novoUsuario = new Usuario({ nome, email, senha });
        await novoUsuario.save();

        res.status(201).json({ message: "Usuário cadastrado com sucesso!" });
    } catch (error) {
        res.status(5001).json({ error: "Erro ao cadastrar usuário!" });
    }
});


const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(` Servidor rodando na porta ${PORT}`));
