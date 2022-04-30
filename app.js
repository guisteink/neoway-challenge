const express = require('express');
const cors = require('cors');

const database = require('./modules/db-adapters/mongo-db');
const routes = require('./app/api/CNPJ-CPF/docRoutes');

const server = express();
server.use(cors());
database.connect();

const port = process.env.PORT || 8000;
server.use(express.json());

// server.use(function (req, res, next)
// {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With, x-access-token, X-Total-Count, x-event-id');
//     res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS');
//     res.header('Access-Control-Expose-Headers', 'X-Total-Count');
//     res.header('X-Total-Count', '10');
// });

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