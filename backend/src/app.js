//Framework para a API 
const express = require('express');

// Receber as rotas e endepoint
const router = require('./router');

// Para criptografar a senha
const bcrypt = require('bcrypt');

// Para gerar o Token
const jwt = require('jsonwebtoken')

const app = express();
app.use(express.json())
app.use(router);


// Exportar para ser utilizado no server e route.

module.exports = app;