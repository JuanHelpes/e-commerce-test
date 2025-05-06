const { response } = require("express");
const { v4: uuid } = require("uuid");
const Carrinho = require("../models/Carrinho");

module.exports = {
  async index(request, response) {
    try {
      const carrinhos = await Carrinho.find();
      return response.status(200).json(carrinhos);
    } catch (error) {
      return response.status(500).json({ error: error.message });
    }
  },

  async indexById(request, response) {
    try {
      const { id } = request.params;
      const carrinho = await Carrinho.find({ usuarioId: id });
      return response.status(200).json(carrinho);
    } catch (error) {
      return response.status(500).json({ error: error.message });
    }
  },

  async store(request, response) {
    const { usuarioId, produtoId } = request.params;
    if (!usuarioId || !produtoId) {
      return response.status(400).json({ error: "Preencha todos os campos" });
    }

    const carrinho = new Carrinho({
      _id: uuid(),
      usuarioId,
      produtoId,
    });

    try {
      await carrinho.save();
      return response
        .status(201)
        .json({ message: "Produto adicionado no carrinho!" });
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  },

  async delete(request, response) {
    try {
      const { id } = request.params;
      Carrinho.remove({ _id: id });
      //   await response.carrinho.remove();
      return response
        .status(200)
        .json({ message: "Produto deletado do carrinho!" });
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  },
};
