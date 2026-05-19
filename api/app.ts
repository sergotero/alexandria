import dotenv from "./src/config/dotenv.config.js";
import express from "express";
import morgan from "morgan";
import router from "./src/routes/api/api.routes.js";
import pool from "./src/config/db.config.js";

const app = express();

//Middlewares
app.use(express.json());
app.use(morgan("dev"));

//Routes
app.use("/api", router);
// app.use(webRouter);

//Ports
const port = Number(process.env.SERVER_PORT) || 3000;


//Server
const server = app.listen(port, "0.0.0.0", () => {
  console.log(`Server listening on port ${port}`);
});

//Closure
const shutdown = async () => {
  console.log("Closing server...");
  await pool.end();
  server.close(() => {
    console.log("Server closed");
    process.exit(0);
  });
};

//Listeners
process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);