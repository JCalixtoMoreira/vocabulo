const mongoose = require("mongoose");

const palavraSchema = new mongoose.Schema({
  conteudo: {
      required: true,
      type: String
  },
  tamanho: {
      required: true,
      type: Number
  }
})

const Palavra = mongoose.model("Palavra", palavraSchema);

module.exports = Palavra;
