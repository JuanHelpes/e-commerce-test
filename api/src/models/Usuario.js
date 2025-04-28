const mongoose = require("mongoose");

const usuarioSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  nome: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  senha: {
    type: String,
    required: true,
  },
  dataCriacao: {
    type: Date,
    default: Date.now,
  },
  dataAtualizacao: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Usuario", usuarioSchema);
