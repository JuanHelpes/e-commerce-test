const mongoose = require("mongoose");

const produtoSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  nome: {
    type: String,
    required: true,
  },
  descricao: {
    type: String,
    required: true,
  },
  valor: {
    type: Number,
    required: true,
  },
  categoria: {
    type: String,
    required: true,
  },
  imagemUrl_1: {
    type: String,
    required: true,
  },
  imagemUrl_2: {
    type: String,
    required: false,
  },
  imagemUrl_3: {
    type: String,
    required: false,
  },
  estoque: {
    type: Number,
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

module.exports = mongoose.model("Produto", produtoSchema);
