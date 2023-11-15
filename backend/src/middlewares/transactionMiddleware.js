// Middleware para validar campos obrigatórios na transação
const validarCamposTransacao = (req, res, next) => {
    const { id_comprador, id_vendedor, id_item, valor } = req.body;
  
    if (!id_comprador || !id_vendedor || !id_item || !valor) {
      return res.status(400).json({ error: "Campos obrigatórios não foram fornecidos." });
    }
  
    next();
  };
  
  
  module.exports = {
    validarCamposTransacao
  };
  