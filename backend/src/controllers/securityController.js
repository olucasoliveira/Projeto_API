const jwt = require('jsonwebtoken')

//Metodo para gerar o token
const gerarToken = async (request, response) => {

    const SECRET = process.env.SECRET
    const token = jwt.sign (
        {
            id: request.id,
        },
        SECRET,
    )
    return token;
}

const gerarAdminToken = async (request, response) => {

    const SECRET = process.env.SECRET_ADM
    const token = jwt.sign (
        {
            id: request.id,
        },
        SECRET,
    )
    return token;
}


module.exports = {
    gerarToken,
    gerarAdminToken
}