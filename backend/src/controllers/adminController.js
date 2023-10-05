const adminModel = require("../models/adminModels");
const userToken = require("./securityController.js");
const bcrypt = require("bcrypt");

const loginAdminUser = async (request, response) => {
  // Validando se o usuário admin existe.
  const checkSenha = await adminModel.checkAdminLogin(request.body);

  if (checkSenha == 0 || checkSenha == "0") {
    // Se não existir, retorna mensagem
    return response
      .status(404)
      .json({ message: "Usuário não existe como Administrador" });
  } else {
    // Se existir, comparação com o DB
    const resultSenha = await bcrypt.compare(request.body.senha, checkSenha[1]);

    if (resultSenha == false) {
      return response.status(422).json({ message: "Senha Incorreta" });
    } else {
      const gerarToken = await userToken.gerarAdminToken(checkSenha[0]);
      return response.status(200).json({
        message: "Autenticação de Administrador Realizada com Sucesso",
        token: gerarToken,
      });
    }
  }
  return 0;
};

const getAll = async (_request, response) => {
  const users = await adminModel.getAll();
  return response.status(200).json(users);
};

module.exports = {
  loginAdminUser,
  getAll,
};
