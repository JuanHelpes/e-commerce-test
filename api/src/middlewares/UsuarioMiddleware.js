const { validate: isUuid } = require("uuid");
const Usuario = require("../models/Usuario");

module.exports = {
  async validateId(request, response, next) {
    const { id } = request.params;

    if (!isUuid(id)) {
      return response.status(400).json({ error: "ID inválido!" });
    }

    try {
      const usuario = await Usuario.findById(id);
      response.usuario = usuario;
      if (!usuario) {
        return response.status(404).json({ error: "Usuário não encontrado!" });
      }
    } catch (error) {
      return response.status(500).json({ error: "Erro ao validar ID!" });
    }

    next();
  },
};
