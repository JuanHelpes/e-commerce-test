const express = require("express");
const routes = express.Router();

const UsuarioController = require("../controllers/UsuarioController");
const UsuarioMiddleware = require("../middlewares/UsuarioMiddleware");
const authController = require("../controllers/authController");

routes.post("/login", authController.login);
// routes.post("/register", authController.register);

routes.get("/usuarios", UsuarioController.index);
routes.post("/usuarios", UsuarioController.store);

routes.put(
  "/usuarios/:id",
  UsuarioMiddleware.validateId,
  UsuarioController.update
);

routes.delete(
  "/usuarios/:id",
  UsuarioMiddleware.validateId,
  UsuarioController.delete
);

module.exports = routes;
