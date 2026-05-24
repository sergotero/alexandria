import cors from 'cors';
import dotenv from "./src/config/dotenv.config.js";
import express from "express";
import morgan from "morgan";
import router from "./src/routes/api/api.routes.js";
import pool from "./src/config/db.config.js";
import errorHandler from "./src/middlewares/error.middleware.js";
import webRouter from "./src/routes/web/web.router.js";

const app = express();

//Middlewares
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

//Routes
app.use("/api", router);
app.use("/", webRouter);

//ErrorHandler
app.use(errorHandler);

//Ports
const port = Number(process.env.SERVER_PORT) || 3000;

//Server
const server = app.listen(port, "0.0.0.0", () => {
  console.log(`Server listening on port ${port}`);
});

//Closure
const shutdown = async () => {
  console.log("Closing server...");
  try {
    await pool.end();
    server.close(() => {
      console.log("Server closed");
      process.exit(0);
    });
  } catch (error) {
    console.error("Shutdown error:", error);
    process.exit(1);
  }
}

//Listeners
process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);