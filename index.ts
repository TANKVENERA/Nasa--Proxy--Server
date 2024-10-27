import express from "express";
import { config } from "./app/config/config.js";
import { router as indexRoute } from "./app/routes/index.js";
import { router as meteorRoutes } from "./app/routes/meteorsRoute.js";
import { router as photoRoutes } from "./app/routes/photoRoute.js";
import { router as pageNotFoundRoute } from "./app/routes/pageNotFoundRoute.js";
import { errorHandler } from "./app/middleware/errorHandler/errorHandler.js";
import nunjucks from "nunjucks";
import bodyParser from "body-parser";

const app = express();
const serverPort = config.port;

nunjucks.configure("./app/views", {
  autoescape: true,
  express: app,
});

app.set("view engine", "html");

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

app.use(bodyParser.urlencoded({ extended: true }));
app.use("/proxy", meteorRoutes);
app.use("/proxy", photoRoutes);
app.use("/proxy", indexRoute);
app.use(errorHandler);
app.use(pageNotFoundRoute);

app.listen(serverPort, () => {
  console.log(`Server is up and listening on port ${serverPort.toString()}`);
});
