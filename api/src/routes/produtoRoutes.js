const express = require("express");
const routes = express.Router();

const ProdutoController = require("../controllers/ProdutoController");
const authController = require("../controllers/authController");

routes.get("/", ProdutoController.index);
routes.get("/productById/:id", ProdutoController.indexById);
routes.post(
  "/store",
  //   authController.verifyToken,
  ProdutoController.store
);

module.exports = routes;
