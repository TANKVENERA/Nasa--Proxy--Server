const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const serverPort = process.env.SERVER_PORT || 3001

const indexRoute = require('./app/routes/index.js');
const usersRoutes = require('./app/routes/meteors.js');

app.use('/proxy', indexRoute)
app.use('/proxy', usersRoutes)

app.listen(serverPort, () => {
    console.log(`Server is up and listening on port ${serverPort}`);
});