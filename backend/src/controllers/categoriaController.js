const categoriaModel = require("../models/categoriaModel.js");

// Rota para listar todas as categorias
const getAll = async (request, response) => {
  try {
    const categorias = await categoriaModel.getAll();
    return response.status(200).json(categorias);
  } catch (error) {
    console.error(error);
    return response.status(500).json({ error: "Erro ao listar as categorias." });
  }
};

// Função para adicionar uma nova categoria
const addCategoria = async (request, response) => {
    const createdCategoria = await categoriaModel.addCategoria(request.body);
    return response.status(201).json(createdCategoria);
};

  
  

// Rota para editar uma categoria existente
const editCategoria = async (request, response) => {
  try {
    const categoriaId = request.params.id;
    const { nome, descricao } = request.body;
    const result = await categoriaModel.editCategoria(categoriaId, nome, descricao);

    if (result && result.affectedRows > 0) {
      return response.status(200).json({ message: "Categoria atualizada com sucesso." });
    } else {
      return response.status(404).json({ error: "Categoria não encontrada." });
    }
  } catch (error) {
    console.error(error);
    return response.status(500).json({ error: "Erro ao editar a categoria." });
  }
};

// Rota para excluir uma categoria
const deleteCategoria = async (request, response) => {
  try {
    const categoriaId = request.params.id;
    const result = await categoriaModel.deleteCategoria(categoriaId);

    if (result && result.affectedRows > 0) {
      return response.status(200).json({ message: "Categoria excluída com sucesso." });
    } else {
      return response.status(404).json({ error: "Categoria não encontrada." });
    }
  } catch (error) {
    console.error(error);
    return response.status(500).json({ error: "Erro ao excluir a categoria." });
  }
};

module.exports = {
  getAll,
  addCategoria,
  editCategoria,
  deleteCategoria,
};
