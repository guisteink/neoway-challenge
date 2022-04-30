const express = require('express');
const cors = require('cors');

const database = require('./modules/db-adapters/mongo-db');
const routes = require('./app/api/CNPJ-CPF/docRoutes');

const server = express();
server.use(cors());
database.connect();

const port = process.env.PORT || 8000;
server.use(express.json());

server.use("/api", routes)

server.get("/health-check", (req, res, next) =>
{
    return res.send("Server is now running! 🔥");
})

server.listen(port, () =>
{
    console.log(`Server is now running in ${port}! 🔥🔥🔥`);
})

module.exports = server;