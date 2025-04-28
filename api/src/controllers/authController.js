const usuarioSchema = require("../models/Usuario.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.SECRET;

const login = async (req, res) => {
  try {
    usuarioSchema.findOne({ email: req.body.email }, (err, user) => {
      if (!user) {
        return res.status(401).json({ error: "Usuário não encontrado!" });
      }

      const isPasswordValid = bcrypt.compareSync(req.body.senha, user.senha);

      if (!isPasswordValid) {
        return res.status(401).json({ error: "Senha inválida!" });
      }
      const token = jwt.sign({ id: user._id }, SECRET_KEY, {
        expiresIn: 86400,
      }); // 24 horas
      return res.status(200).json({ auth: true, token: token });
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const verifyToken = (req, res, next) => {
  const tokenHeader = req.headers["authorization"];
  const token = tokenHeader && tokenHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Token não fornecido!" });
  }

  try {
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: "Token inválido!" });
      }
      req.userId = decoded.id;
      next();
    });
  } catch (error) {
    return res.status(500).json({ error: "Erro ao verificar o token!" });
  }
};

module.exports = {
  login,
  verifyToken,
};
