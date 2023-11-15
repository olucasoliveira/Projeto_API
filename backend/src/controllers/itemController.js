const itensModel = require("../models/itemModels.js");
const usersModel = require("../models/usersModels.js");

const createItem = async (request, response) => {

    //Validando se o id do vendedor é valido.
    const userExist = await usersModel.vendExist(request.body);
    if (userExist == false) {
      return response
        .status(409)
        .json({ message: "Esse vendedor não existe" });
    }
  
    const createdItem = await itensModel.createItem(request.body);
    return response.status(201).json(createdItem);
};

const getAll = async (_request, response) => {
    const itens = await itensModel.getAll();
    return response.status(200).json(itens);
};

const getItem = async (request, response) => {
    const { id } = request.params;
    const item = await itensModel.getItem(id);
    return response.status(200).json(item);
};

const deleteItem = async (request, response) => {
    const { id } = request.params;
    await itensModel.deleteItem(id);
    return response.status(204).json();
};

// Controlador para editar um item
const editItem = async (request, response) => {
    try {
      const itemId = request.params.id;
      const newItemData = request.body;
  
      // Chama a função do modelo para editar o item
      const result = await itensModel.editItem(itemId, newItemData);
  
      // Verificar se houve erro na execução da query
      if (result && result.affectedRows > 0) {
        return response.status(200).json({ message: "Item atualizado com sucesso." });
      } else {
        return response.status(404).json({ error: "Item não encontrado." });
      }
    } catch (error) {
      console.error(error);
      return response.status(500).json({ error: "Erro ao editar o item." });
    }
  };


module.exports = {
    createItem,
    getAll,
    getItem,
    deleteItem,
    editItem
  };