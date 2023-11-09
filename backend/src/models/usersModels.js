const conn = require("./connection");

const getAll = async () => {
  const [tasks] = await conn.execute("SELECT * FROM tasks");
  return tasks;
};

const createUser = async (user) => {
  try {
    //var dateUTC = new Date(Date.now()).toUTCString();

    const { nome, email, senha, tipo } = user;
    const query =
      "INSERT INTO USUARIO (NOME, EMAIL, SENHA, TIPO_USER) VALUES(?, ?, ?, ?)";
    const [createdUser] = await conn.execute(query, [nome, email, senha, tipo]);
    return { insertId: createdUser.insertId };
  } catch (error) {
    console.error(error);
    return false; 
  }
};


const userExist = async (user) => {
  try {
    const { email } = user;

    const query = "SELECT id FROM USUARIO WHERE EMAIL = ?";
    const [userExistRows] = await conn.execute(query, [email]);

    if (userExistRows.length === 0) {
      return false; // Usuário não existe
    } else {
      return true; // Usuário existe
    }
  } catch (error) {
    console.error(error);
    return false; // Em caso de erro, também tratamos como usuário inexistente
  }
};


const checkData = async (body) => {
  try {
    const { email } = body;
    const query = "SELECT id, senha, email FROM USUARIO WHERE EMAIL = ?";
    const [userExistRows] = await conn.execute(query, [email]);
    if (userExistRows.length === 0) {
      return 0; // Usuário não existe
    } else {
      const userId = userExistRows[0].id;
      const dbSenha = userExistRows[0].senha;
      const dbEmail = userExistRows[0].email;
      return [userId, dbSenha, dbEmail]; // Retorna o ID, senha e Email se o usuário existe
    }
  } catch (error) {
    return response.status(500).json({ ERROR: error });
  }
};

const checkLogin = async (body) => {
  try {
    const { email } = body;
    const query =
      "SELECT id, senha, email FROM USUARIO WHERE EMAIL = ? AND ATIVO = 1 AND TIPO_USER != 3";
    const [userExistRows] = await conn.execute(query, [email]);
    if (userExistRows.length === 0) {
      return 0; // Usuário não existe
    } else {
      const userId = userExistRows[0].id;
      const dbSenha = userExistRows[0].senha;
      const dbEmail = userExistRows[0].email;
      return [userId, dbSenha, dbEmail]; // Retorna o ID, senha e Email se o usuário existe
    }
  } catch (error) {
    return response.status(500).json({ ERROR: error });
  }
};

const deleteUser = async (id) => {
  const query = "UPDATE USUARIO SET ATIVO = 0 WHERE ID = ?";
  const deleteUser = await conn.execute(query, [id]);
  return deleteUser;
};

const updateUser = async (id, user) => {
  const { nome, email, senha } = user;
  const query =
    "UPDATE USUARIO SET NOME = ?, EMAIL = ?, SENHA = ?  WHERE ID = ? AND ATIVO = 1";
  const [updatedUser] = await conn.execute(query, [nome, email, senha, id]);

  if (updatedUser.affectedRows === 0) {
    return false; // Usuário não existe ou está inativo
  } else {
    return true; // Usuário atualizado com sucesso
  }
};

module.exports = {
  //getAll,
  createUser,
  userExist,
  checkData,
  checkLogin,
  deleteUser,
  updateUser,
  //updateUser
};
