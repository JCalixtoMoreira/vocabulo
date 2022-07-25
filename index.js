require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const palavraRouter = require("./routes/palavraRoutes.js");

const app = express();

app.use(express.json());

mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'vocabulo',
});

app.use(palavraRouter);

app.listen(3001, () => {
    console.log("Server is running...");
});
