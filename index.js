require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const axios = require("axios");
const palavraRouter = require("./routes/palavraRoutes.js");

const app = express();
const port = 3001;
const url = 'https://vocabulosoapi.herokuapp.com/';
/* const url = 'http://localhost:3001/' */

app.use(express.json());

mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'vocabulo',
});

app.use(palavraRouter);

app.listen(process.env.PORT || port, () => {
    console.log("Server is running...");
});

//ping para que o server nao entre em idling
setInterval(async () => {
    await axios.get(url);
    console.log("pingado");
}, 600000);
