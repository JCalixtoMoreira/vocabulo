const express = require("express");
const palavraModel = require("../models/palavra");
const app = express();

app.get("/palavras/:tamanho/:quantidade", async (request, response) => {
    try {
        const palavras = await palavraModel.aggregate([
            { $match: { tamanho: { $eq: Number(request.params.tamanho) } } },
            { $sample: { size: Number(request.params.quantidade) } }
        ]);
        response.send(palavras);
    } catch (error) {
        response.status(500).send(error);
    }
});

module.exports = app;
