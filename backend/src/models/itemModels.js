const conn = require("./connection");

const createItem = async (item) => {
    try {
      const { titulo, id_categoria, preco, descricao, periodicidade, id_vendedor } = item;
      
      // Obtenha a data atual no formato MySQL (YYYY-MM-DD HH:mm:ss)
      const dt_edicao = new Date().toISOString().slice(0, 19).replace('T', ' ');
  
      // Defina o status como 1 (ativo)
      const ativo = 1;
  
      const query =
        "INSERT INTO ITENS (TITULO, ID_CATEGORIA, PRECO, DESCRICAO, PERIODICIDADE, ID_VENDEDOR, ATIVO, DT_EDICAO) VALUES(?, ?, ?, ?, ?, ?, ?, ?)";
      const [createdItem] = await conn.execute(query, [titulo, id_categoria, preco, descricao, periodicidade, id_vendedor, ativo, dt_edicao]);
      return { ItemID: createdItem.insertId };
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const getAll = async () => {
    // Consulta SQL para listar todos os itens
    const query =
      "SELECT id, titulo FROM ITENS WHERE ATIVO = 1";
    const [itens] = await conn.execute(query);
    return itens;
  };

  const getItem = async (id) => {
    try {
      // Consulta SQL para listar o item detalhado
      const query =
        "SELECT * FROM ITENS WHERE ATIVO = 1 AND id = ?";
      const [item] = await conn.execute(query, [id]);
  
      if (item.length === 0) {
        return { error: "Item não encontrado" };
      } else {
        return item[0];
      }
    } catch (error) {
      console.error(error);
      return { error: "Erro ao obter o item" };
    }
  };

  const deleteItem = async (id) => {
    const query = "UPDATE ITENS SET ATIVO = 0 WHERE ID = ?";
    const deleteItem = await conn.execute(query, [id]);
    return deleteItem;
};

// Função para editar um item
const editItem = async (itemId, newItemData) => {
    try {
      const { titulo, id_categoria, preco, descricao, periodicidade, id_vendedor } = newItemData;

      // Query para atualizar o item
      const query = `
        UPDATE ITENS
        SET titulo = ?, id_categoria = ?, preco = ?, descricao = ?, periodicidade = ?, id_vendedor = ?
        WHERE id = ?`;
  
      // Executar a query
      const [result] = await conn.execute(query, [titulo, id_categoria, preco, descricao, periodicidade, id_vendedor, itemId]);
  
      return result;
    } catch (error) {
      console.error(error);
      throw error; // Propaga o erro para o controlador
    }
  };

  const itemExiste = async (item) => {
    try {
      const { id_item } = item;
  
      const query = "SELECT ativo FROM ITENS WHERE ID = ?";
      const [userExistRows] = await conn.execute(query, [id_cliente]);
  
      if (
        userExistRows.length === 0 ||
        userExistRows[0].ativo === 0
      ){
        return false; //Item não existe ou está inativo
      } else {
        return true; // Item existe, está ativo
      }
    } catch (error) {
      console.error(error);
      return false; // Em caso de erro, também tratamos como item inexistente
    }
  };
  


  

module.exports = {
    createItem,
    getAll,
    getItem,
    deleteItem,
    editItem,
    itemExiste
  };