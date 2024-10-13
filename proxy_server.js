const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const proxyServer = express();

const apiKey = process.env.API_NASA_TOKEN || 'DEMO_KEY'
const serverPort = process.env.SERVER_PORT || 3001

proxyServer.listen(serverPort, () => {
    console.log(`Server is up and listening on port ${serverPort}`);
});