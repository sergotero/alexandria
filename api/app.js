import express from "express";
import morgan from "morgan";
import dotenv from "dotenv/config";
import {default as apiRouter} from "./routes/api/api.routes.js";
// import {default as webRouter} from "./routes/web/web.routes.js";
//Load database connection

const app = express();
const env = dotenv.config({path: "./.env"})

//Middlewares
app.use(express.json());
app.use(morgan("dev"));

//Routes
app.use("/api", apiRouter);
// app.use(webRouter);

//Ports
const port = process.env.SERVER_PORT || 3000;

app.listen(port, "0.0.0.0", () => {
  console.log(`Server listening on port ${port}`);
})