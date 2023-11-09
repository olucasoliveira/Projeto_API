// Recebendo o app.
const app = require('./app');

// Para conseguri utilizar as variaveis de ambiente.
require('dotenv').config();

const PORT = process.env.PORT || 3333;


//Declarando a porta que será executada
app.listen(PORT, () => console.log('Essa porra ta rodando na porta ' + PORT));