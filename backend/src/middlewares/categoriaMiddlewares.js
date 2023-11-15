// Middleware para validar o nome da categoria
const validarNomeCategoria = (request, response, next) => {
    const { nome } = request.body;
    if (!nome || nome.trim() === "") {
      return response.status(400).json({ error: "O nome da categoria é obrigatório." });
    }
    next();
  };
  
  module.exports = {
    validarNomeCategoria,
  };
  