const express = require("express");

// Importando os controllers e Middlewares.
const usersController = require("./controllers/usersController.js");
const usersMiddlewares = require("./middlewares/usersMiddlewarer.js");
const adminController = require("./controllers/adminController.js");
const adminMiddlewares = require("./middlewares/adminMiddlewares.js");

const router = express.Router();

//Rota publica para todos cadastrarem usuarios
router.post(
  "/users/signup",
  usersMiddlewares.validarEmail,
  usersMiddlewares.validarNome,
  usersMiddlewares.validarSenha,
  usersMiddlewares.confirmarSenha,
  usersController.createUser,
);

router.post(
  "/users/login",
  usersMiddlewares.validarEmail,
  usersMiddlewares.validarSenha,
  usersController.loginUser,
);

//Rota Privada
router.delete(
  "/users/:id",
  usersMiddlewares.checkToken,
  usersController.deleteUser,
);

//Rota Privada
router.put(
  "/users/:id",
  usersMiddlewares.checkToken,
  usersMiddlewares.validarEmail,
  usersMiddlewares.validarNome,
  usersMiddlewares.validarSenha,
  usersMiddlewares.confirmarSenha,
  usersController.updateUser,
);

router.post(
  "/admin/login",
  usersMiddlewares.validarEmail,
  usersMiddlewares.validarSenha,
  adminController.loginAdminUser,
);

router.get(
  "/admin/users",
  adminMiddlewares.checkAdminToken,
  adminController.getAll,
);

//Exportando as rotas para serem utilizadas no app.js
module.exports = router;
