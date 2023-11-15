const conn = require("./connection.js");

// Função para listar todas as categorias
const getAll = async () => {
  const query = "SELECT id, nome, descricao FROM CATEGORIA WHERE ativo = 1";
  const [categorias] = await conn.execute(query);
  return categorias;
};

// Função para adicionar uma nova categoria
const addCategoria = async (categoria) => {
    try {
      const { nome, descricao } = categoria;
      const ativo = 1;
      const query = "INSERT INTO CATEGORIA (NOME, DESCRICAO, ATIVO) VALUES (?, ?, ?)";
      const [createdCategoria] = await conn.execute(query, [nome, descricao, ativo]);
      return { CategoriaID: createdCategoria.insertId };
    } catch (error) {
      console.error(error);
      return false;
    }
};

// Função para editar uma categoria existente
const editCategoria = async (categoriaId, nome, descricao) => {
    const query = "UPDATE CATEGORIA SET nome = ?, descricao = ? WHERE id = ? and ativo = 1";
    const [result] = await conn.execute(query, [nome, descricao, categoriaId]);
    return result;
  };
  

// Função para excluir uma categoria (soft delete)
const deleteCategoria = async (categoriaId) => {
    const query = "UPDATE CATEGORIA SET ativo = 0 WHERE id = ?";
    const [result] = await conn.execute(query, [categoriaId]);
    return result;
  };

module.exports = {
  getAll,
  addCategoria,
  editCategoria,
  deleteCategoria,
};
