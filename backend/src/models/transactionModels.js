const conn = require('../models/connection');

// Função para registrar uma nova transação
const registrarTransacao = async (transacao) => {
  try {
    const { id_comprador, id_vendedor, id_item, valor } = transacao;
    // Obtenha a data atual no formato MySQL (YYYY-MM-DD HH:mm:ss)
    const dt_transacao = new Date().toISOString().slice(0, 19).replace('T', ' ');
  
    const query = "INSERT INTO TRANSACOES (ID_COMPRADOR, ID_VENDEDOR, ID_ITEM, DT_TRANSACAO, VALOR) VALUES (?, ?, ?, ?, ?)";
    const [createdTransaction] = await conn.execute(query, [id_comprador, id_vendedor, id_item, dt_transacao, valor]);
    
    return { TransactionID: createdTransaction.insertId };
  } catch (error) {
    console.error(error);
    return false;
  }
};

// Função para visualizar transações de um usuário específico
const visualizarTransacoes = async (userId) => {
  try {
    const query = "SELECT * FROM TRANSACOES WHERE ID_COMPRADOR = ? OR ID_VENDEDOR = ?";
    const [transactions] = await conn.execute(query, [userId, userId]);
    
    return transactions;
  } catch (error) {
    console.error(error);
    return false;
  }
};

module.exports = {
  registrarTransacao,
  visualizarTransacoes,
};
