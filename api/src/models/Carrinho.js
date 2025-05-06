const mongoose = require("mongoose");

const carrinhoSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  usuarioId: {
    type: String,
    required: true,
  },
  produtoId: {
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

module.exports = mongoose.model("Carrinho", carrinhoSchema);
