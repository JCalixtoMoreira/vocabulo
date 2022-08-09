require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const palavraRouter = require("./routes/palavraRoutes.js");

const app = express();
const port = 3001

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
