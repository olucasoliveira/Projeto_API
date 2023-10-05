const conn = require("./connection");

const checkAdminLogin = async (body) => {
  try {
    const { email } = body;
    const query =
      "SELECT id, senha, email FROM USUARIO WHERE EMAIL = ? AND ATIVO = 1 AND TIPO_USER = 3";
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

const getAll = async () => {
  // Consulta SQL para listar usuários do tipo 1 e 2
  const query =
    "SELECT id, nome, email, tipo_user FROM usuario WHERE tipo_user IN (1, 2)";
  const [usuarios] = await conn.execute(query);
  return usuarios;
};

module.exports = {
  checkAdminLogin,
  getAll,
};
