const express = require("express");

// Importando os controllers e Middlewares.
const usersController = require("./controllers/usersController.js");
const usersMiddlewares = require("./middlewares/usersMiddlewarer.js");
const adminController = require("./controllers/adminController.js");
const adminMiddlewares = require("./middlewares/adminMiddlewares.js");
const itemController = require("./controllers/itemController.js");
const itemMiddlewares = require("./middlewares/itemMiddlewares.js");
const categoriaController = require("./controllers/categoriaController.js");
const categoriaMiddlewares = require("./middlewares/categoriaMiddlewares.js");
const transactionController = require("./controllers/transactionController.js");
const transactionMiddleware = require("./middlewares/transactionMiddleware.js");


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

// Rota para adicionar item
router.post(
  "/itens",
  usersMiddlewares.checkToken,
  itemController.createItem
);


//Rota para listar todos os itens
router.get(
  "/itens",
  usersMiddlewares.checkToken,
  itemController.getAll
);


//Rota para obter detalhes de um item especifico
router.get(
  "/itens/:id",
  usersMiddlewares.checkToken,
  itemController.getItem
);


//Rota para editar um item
router.put(
  "/itens/:id",
  usersMiddlewares.checkToken,
  itemController.editItem

);


//Desativar um item
router.delete(
  "/itens/:id",
  usersMiddlewares.checkToken,
  itemController.deleteItem

);

/*
//Buscar itens por critérios
router.get(
  "/items/search",

);
*/

// Rota para listar todas as categorias
router.get(
  "/categories", 
  usersMiddlewares.checkToken,
  categoriaController.getAll

);

// Rota para adicionar uma nova categoria
router.post(
  "/categories", 
  usersMiddlewares.checkToken,
  categoriaMiddlewares.validarNomeCategoria, 
  categoriaController.addCategoria

);

// Rota para editar uma categoria existente
router.put(
  "/categories/:id",
  usersMiddlewares.checkToken, 
  categoriaMiddlewares.validarNomeCategoria,
  categoriaController.editCategoria
);

// Rota para excluir uma categoria
router.delete(
  "/categories/:id",
  usersMiddlewares.checkToken,
  categoriaController.deleteCategoria

  );

  router.post(
    "/transactions",
    transactionMiddleware.validarCamposTransacao,
    transactionController.registrarTransacao
  );
  
  router.get(
    "/transactions/:userId",
    transactionController.visualizarTransacoes
  );


//Exportando as rotas para serem utilizadas no app.js
module.exports = router;
