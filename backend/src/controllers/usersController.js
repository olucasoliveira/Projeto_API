const usersModel = require("../models/usersModels.js");
const userToken = require("./securityController.js");
const bcrypt = require("bcrypt");

const createUser = async (request, response) => {
  //Validando se o usuario já esta cadastrado.
  const userExist = await usersModel.userExist(request.body);
  if (userExist == true) {
    return response
      .status(409)
      .json({ message: "Esse email já esta cadastrado" });
  }

  //Criptografando a senha
  const senha = request.body.senha;
  const salt = await bcrypt.genSalt(12);
  request.body.senha = await bcrypt.hash(senha, salt);

  const createdUser = await usersModel.createUser(request.body);
  return response.status(201).json(createdUser);
};

const loginUser = async (request, response) => {
  //Validando se o usuario existe.
  const checkSenha = await usersModel.checkLogin(request.body);

  if (checkSenha == 0 || checkSenha == "0") {
    //Se não existir, retorna mensagem
    return response.status(404).json({ message: "Usuario Invalido" });
  } else {
    //Se exitir, comparação com o DB
    const resultSenha = await bcrypt.compare(request.body.senha, checkSenha[1]);

    if (resultSenha == false) {
      return response.status(422).json({ message: "Senha incorreta" });
    } else {
      const gerarToken = await userToken.gerarToken(checkSenha[0]);
      return response.status(200).json({
        message: "Autenticação realizada com sucesso",
        token: gerarToken,
      });
    }
  }
  return 0;
};

const deleteUser = async (request, response) => {
  const { id } = request.params;
  await usersModel.deleteUser(id);
  return response.status(204).json();
};

const updateUser = async (request, response) => {
  const { id } = request.params;

  //Validando se o emil já esta sendo utilizado por outro usuario
  const checkEmail = await usersModel.checkData(request.body);
  console.log(checkEmail);

  if (checkEmail != 0 || checkEmail != "0") {
    if (checkEmail[0] != id) {
      return response
        .status(400)
        .json({ message: "Esse email já esta em uso, escolha outro" });
    }
  }

  //Criptografando a senha
  const senha = request.body.senha;
  const salt = await bcrypt.genSalt(12);
  request.body.senha = await bcrypt.hash(senha, salt);

  const updateUser = await usersModel.updateUser(id, request.body);

  if (updateUser == true) {
    return response
      .status(200)
      .json({ message: "Usuario editado com sucesso" });
  } else {
    return response.status(404).json({ message: "Usuario não existe" });
  }
};

module.exports = {
  createUser,
  loginUser,
  deleteUser,
  updateUser,
};
