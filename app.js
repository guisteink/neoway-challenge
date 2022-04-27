const express = require('express');

const database = require('./modules/db-adapters/mongo-db');
const routes = require('./app/api/CNPJ-CPF/docRoutes');

const server = express();
database.connect();

server.use(express.json());
server.use("/", routes)

server.get("/health-check", (req, res) =>
{
    res.json("Server is now running! 🔥");
})

server.listen(3000, () =>
{
    console.log("Server is now running! 🔥");
})

module.exports = server;