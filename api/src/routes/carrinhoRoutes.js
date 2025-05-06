const express = require("express");
const routes = express.Router();

const CarrinhoController = require("../controllers/CarrinhoController");
const authController = require("../controllers/authController");

routes.get("/:id", authController.verifyToken, CarrinhoController.indexById);
routes.post(
  "/store/:usuarioId/:produtoId",
  authController.verifyToken,
  //   authController.verifyToken,
  CarrinhoController.store
);
routes.delete(
  "/delete/:id",
  authController.verifyToken,
  CarrinhoController.delete
);

module.exports = routes;
