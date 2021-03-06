const express = require("express");
const palavraModel = require("../models/palavra");
const app = express();

app.get("/palavras/:tamanho/:quantidade", async (request, response) => {
    try {
        const maxTamanho = 20;
        const palavras = await palavraModel.aggregate([
            { $match: { tamanho: { $eq: Number(request.params.tamanho > maxTamanho ? maxTamanho : request.params.tamanho) } } },
            { $sample: { size: Number(request.params.quantidade) } }
        ]);
        response.send(palavras);
    } catch (error) {
        response.status(500).send(error);
    }
});

app.get("/palavras/:conteudo", async (request, response) => {
    try {
        const palavra = await palavraModel.findOne({ conteudo: request.params.conteudo });
        response.send(!!palavra);
    } catch (error) {
        response.status(500).send(error);
    }
});

module.exports = app;
