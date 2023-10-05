const jwt = require('jsonwebtoken');

// Método para gerar o token com expiração em 15 minutos
const gerarToken = async (request, response) => {
    const SECRET = process.env.SECRET;
    const expiresIn = '15m'; // 15 minutos
    const token = jwt.sign (
        {
            id: request.id,
        },
        SECRET,
        { expiresIn }
    );
    return token;
}

// Método para gerar o token de administrador com expiração em 15 minutos
const gerarAdminToken = async (request, response) => {
    const SECRET = process.env.SECRET_ADM;
    const expiresIn = '15m'; // 15 minutos
    const token = jwt.sign (
        {
            id: request.id,
        },
        SECRET,
        { expiresIn }
    );
    return token;
}

module.exports = {
    gerarToken,
    gerarAdminToken
}
