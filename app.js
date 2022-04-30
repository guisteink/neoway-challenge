const express = require('express');
const cors = require('cors');

const database = require('./modules/db-adapters/mongo-db');
const routes = require('./app/api/CNPJ-CPF/docRoutes');

const server = express();
database.connect();

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200
}

server.use(express.json());
server.use("/api/", routes)
server.use(cors(corsOptions));

server.use(function (req, res, next)
{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With, x-access-token, X-Total-Count, x-event-id');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS');
    res.setHeader('Access-Control-Expose-Headers', 'X-Total-Count');
    res.setHeader('X-Total-Count', '10');
});

server.get("/health-check", (req, res, next) =>
{
    res.json("Server is now running! 🔥");
})

server.listen(3030 || process.env.PORT, () =>
{
    console.log("Server is now running! 🔥");
})

module.exports = server;