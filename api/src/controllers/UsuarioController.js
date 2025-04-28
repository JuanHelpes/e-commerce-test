const { response } = require("express");
const { v4: uuid } = require("uuid");
const Usuario = require("../models/Usuario");

module.exports = {
  async index(request, response) {
    try {
      const usuarios = await Usuario.find();
      return response.status(200).json(usuarios);
    } catch (error) {
      return response.status(500).json({ error: error.message });
    }
  },

  async store(request, response) {
    const { nome, email, senha } = request.body;

    if (!nome || !email || !senha) {
      return response.status(400).json({ error: "Preencha todos os campos" });
    }

    const usuario = new Usuario({
      _id: uuid(),
      nome,
      email,
      senha,
    });

    try {
      await usuario.save();
      return response
        .status(201)
        .json({ message: "Usuário criado com sucesso!" });
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  },

  async update(request, response) {
    const { nome, email, senha } = request.body;

    if (!nome && !email && !senha) {
      return response.status(400).json({ error: "Preencha todos os campos!" });
    }

    if (nome) {
      response.usuario.nome = nome;
    }
    if (email) {
      response.usuario.email = email;
    }
    if (senha) {
      response.usuario.senha = senha;
    }

    try {
      await response.usuario.save();
      return response
        .status(200)
        .json({ message: "Usuário atualizado com sucesso!" });
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  },

  async delete(request, response) {
    try {
      await response.usuario.remove();
      return response
        .status(200)
        .json({ message: "Usuário deletado com sucesso!" });
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  },
};
