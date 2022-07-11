import express, { json } from "express";
import "express-async-errors";
import cors from "cors";
import chalk from "chalk";
import dotenv from "dotenv";
import router from "./routers/index.js";
import handleError from "./middlewares/errorHandlerMiddleware.js";
dotenv.config();
var app = express();
app.use(cors());
app.use(json());
app.use(router);
app.use(handleError);
var port = +process.env.PORT || 4000;
app.listen(port, function () {
    console.log(chalk.bold.blue("listening on port " + port));
});
