const jwt = require("jsonwebtoken");

const validarNome = (request, response, next) => {
  const { body } = request;

  if (body.nome == undefined || body.nome == "") {
    return response.status(400).json({ message: "O nome esta vazio ou nulo" });
  }

  next();
};

const validarEdicaoNome = (request, response, next) => {
  const { body } = request;

  if (body.nome == "") {
    return response
      .status(400)
      .json({ message: "O nome não pode ser removido" });
  }

  next();
};

const validarSenha = (request, response, next) => {
  const { body } = request;

  if (body.senha == undefined || body.senha == "") {
    return response.status(400).json({ message: "A senha esta vazia ou nula" });
  }

  next();
};

const validarEdicaoSenha = (request, response, next) => {
  const { body } = request;

  if (body.senha == "") {
    return response.status(400).json({ message: "A senha não pode ser vazia" });
  }

  if (body.senha != body.confirmarSenha) {
    return response.status(400).json({ message: "As senhas estão diferentes" });
  }

  if (body.confirmarSenha == undefined) {
    return response.status(400).json({ message: "Confirme a senha" });
  }

  next();
};

const confirmarSenha = (request, response, next) => {
  const { body } = request;

  if (body.confirmarSenha == undefined) {
    return response.status(400).json({ message: "Confirme a senha" });
  }

  if (body.senha != body.confirmarSenha) {
    return response.status(400).json({ message: "As senhas estão diferentes" });
  }

  next();
};

// Esse algoritmo de validação do email possui trechos do StackOverFlow: https://stackoverflow.com/questions/52456065/how-to-format-and-validate-email-node-js

const validarEmail = (request, response, next) => {
  const { body } = request;
  const email = body.email;

  if (!email || email === "") {
    return response.status(400).json({ message: "O Email está vazio ou nulo" });
  }

  if (email.length > 254) {
    return response.status(400).json({ message: "O Email é muito longo" });
  }

  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  var valid = emailRegex.test(email);

  if (!valid) {
    return response.status(400).json({ message: "O Email não é válido" });
  }

  var parts = email.split("@");
  if (parts[0].length > 64) {
    return response
      .status(400)
      .json({ message: "A parte local do Email é muito longa" });
  }

  var domainParts = parts[1].split(".");
  if (
    domainParts.some(function (part) {
      return part.length > 63;
    })
  ) {
    return response
      .status(400)
      .json({ message: "Uma parte do domínio do Email é muito longa" });
  }

  next();
};

const validarEdicaoEmail = (request, response, next) => {
  const { body } = request;
  const email = body.email;

  if (email === "") {
    return response
      .status(400)
      .json({ message: "O Email não pode ser removido" });
  }

  if (email.length > 254) {
    return response.status(400).json({ message: "O Email é muito longo" });
  }

  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  var valid = emailRegex.test(email);

  if (!valid) {
    return response.status(400).json({ message: "O Email não é válido" });
  }

  var parts = email.split("@");
  if (parts[0].length > 64) {
    return response
      .status(400)
      .json({ message: "A parte local do Email é muito longa" });
  }

  var domainParts = parts[1].split(".");
  if (
    domainParts.some(function (part) {
      return part.length > 63;
    })
  ) {
    return response
      .status(400)
      .json({ message: "Uma parte do domínio do Email é muito longa" });
  }

  next();
};

// ATENÇÂO: Esse algoritmo de checkToken foi copiado: https://github.com/matheusbattisti/curso_node/blob/main/18_AUTH_NODE_JWT/app.js

function checkToken(request, response, next) {
  const authHeader = request.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token)
    return response.status(401).json({ mensage: "Acesso negado, faça login" });

  try {
    const secret = process.env.SECRET;

    const validacao = jwt.verify(token, secret);

    next();
  } catch (erro) {
    response.status(400).json({ mensage: "O Token é inválido!" });
  }
}

module.exports = {
  validarNome,
  validarEdicaoNome,
  validarEmail,
  validarEdicaoEmail,
  validarSenha,
  validarEdicaoSenha,
  confirmarSenha,
  checkToken,
};
