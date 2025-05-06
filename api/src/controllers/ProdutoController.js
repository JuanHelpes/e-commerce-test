const { response } = require("express");
const { v4: uuid } = require("uuid");
const Produto = require("../models/Produto");

module.exports = {
  async index(request, response) {
    try {
      const produtos = await Produto.find();
      return response.status(200).json(produtos);
    } catch (error) {
      return response.status(500).json({ error: error.message });
    }
  },

  async indexById(request, response) {
    try {
      const { id } = request.params;
      const produto = await Produto.findById(id);
      return response.status(200).json(produto);
    } catch (error) {
      return response.status(500).json({ error: error.message });
    }
  },

  async store(request, response) {
    const {
      nome,
      descricao,
      valor,
      categoria,
      imagemUrl_1,
      imagemUrl_2,
      imagemUrl_3,
      estoque,
    } = request.body;

    if (
      !nome ||
      !descricao ||
      !valor ||
      !categoria ||
      !imagemUrl_1 ||
      !estoque
    ) {
      return response.status(400).json({ error: "Preencha todos os campos" });
    }

    const produto = new Produto({
      _id: uuid(),
      nome,
      descricao,
      valor,
      categoria,
      imagemUrl_1,
      imagemUrl_2,
      imagemUrl_3,
      estoque,
    });

    try {
      await produto.save();
      return response
        .status(201)
        .json({ message: "Produto criado com sucesso!" });
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  },
};
