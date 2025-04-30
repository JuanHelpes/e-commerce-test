const express = require("express");
const routes = express.Router();

const UsuarioController = require("../controllers/UsuarioController");
const UsuarioMiddleware = require("../middlewares/UsuarioMiddleware");
const authController = require("../controllers/authController");

routes.post("/login", authController.login);
routes.post("/register", authController.register);
routes.put("/update/:id", authController.verifyToken, UsuarioController.update);
routes.delete(
  "/delete/:id",
  authController.verifyToken,
  UsuarioController.delete
);

module.exports = routes;
