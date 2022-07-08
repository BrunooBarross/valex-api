import express, { json } from "express";
import "express-async-errors";
import cors from "cors";
import chalk from "chalk"; 
import dotenv from "dotenv";
import router from "./routers/index.js";
import handleError from "./middlewares/errorHandlerMiddlware.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(json());
app.use(router);
app.use(handleError)

const port = +process.env.PORT || 4000;

app.listen(port, () => {
    console.log(chalk.bold.blue("listening on port " + port));
})