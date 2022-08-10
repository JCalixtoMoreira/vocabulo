const express = require("express");
const palavraModel = require("../models/palavra");
const app = express();

app.get("/", async (request, response) => {
    try {
        response.send("ping");
    } catch (error) {
        response.status(500).send(error);
    }
});

app.get("/palavras/:tamanho/:quantidade", async (request, response) => {
    try {
        const maxTamanho = 20;
        const maxQuantidade = 20;
        const palavras = await palavraModel.aggregate([
            { $match: { tamanho: { $eq: Number(request.params.tamanho > maxTamanho ? maxTamanho : request.params.tamanho) } } },
            { $sample: { size: Number(request.params.quantidade > maxQuantidade ? maxQuantidade : request.params.quantidade) } }
        ]);
        response.send(palavras);
    } catch (error) {
        response.status(500).send(error);
    }
});

app.get("/palavras/:conteudo", async (request, response) => {
    try {
        const palavra = await palavraModel.findOne({ conteudo: new RegExp('^' +request.params.conteudo + '$', 'i') });
        response.send(!!palavra);
    } catch (error) {
        response.status(500).send(error);
    }
});

module.exports = app;
