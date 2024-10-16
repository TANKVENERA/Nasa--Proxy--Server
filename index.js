const config = require('./app/config/config')
const express = require('express');
const app = express();
const errorHandler = require('./app/middleware/errorHandler/errorHandler')
const nunjucks = require('nunjucks')

nunjucks.configure('./app/views', {
    autoescape: true,
    express: app
})

app.set('view engine', 'html')

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const serverPort = config.port

const indexRoute = require('./app/routes/index');
const meteorRoutes = require('./app/routes/meteorsRoute');
const pageNotFoundRoute = require('./app/routes/pageNotFoundRoute')

app.use('/proxy', meteorRoutes)
app.use('/proxy', indexRoute)
app.use(errorHandler)
app.use(pageNotFoundRoute)

app.listen(serverPort, () => {
    console.log(`Server is up and listening on port ${serverPort}`);
});