const transactionModels = require('../models/transactionModels.js');
const usersModel = require("../models/usersModels.js");
const itemModel = require("../models/itemModels.js");


// Controlador para registrar uma nova transação
const registrarTransacao = async (request, response) => {
  try {

    //Validando se o id do vendedor é valido.
    const vendExist = await usersModel.vendExist(request.body);
    if (vendExist == false) {
        return response
        .status(409)
        .json({ message: "Esse vendedor não existe" });
    }

    //Validando se o id do cliente é valido.
    const clientExist = await usersModel.clienteExiste(request.body);
    if (clientExist == false) {
      return response
        .status(409)
        .json({ message: "Esse cliente não existe" });
    }

    //Validando se o id do item é valido.
    const itemExist = await itemModelModel.itemExiste(request.body);
    if (itemExist == false) {
      return response
        .status(409)
        .json({ message: "Esse item não existe" });
    }

    const { body } = req;
    const novaTransacao = await transactionModels.registrarTransacao(body);
    
    return res.status(201).json(novaTransacao);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao registrar a transação." });
  }
};

// Controlador para visualizar transações de um usuário específico
const visualizarTransacoes = async (request, response) => {
  try {
    const { params } = request;
    const transactions = await transactionModels.visualizarTransacoes(params.userId);
    
    return response.status(200).json(transactions);
  } catch (error) {
    console.error(error);
    return response.status(500).json({ error: "Erro ao visualizar as transações." });
  }
};

module.exports = {
  registrarTransacao,
  visualizarTransacoes,
};
