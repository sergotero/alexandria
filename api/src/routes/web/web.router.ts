import type { Request, Response } from "express";
import express, { Router } from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.join(__filename);

const webRouter = Router();
const buildPath = path.join(__dirname, "build");

webRouter.use(express.static(buildPath));
webRouter.get("{*any}", (req: Request, res: Response) => {
  res.sendFile(path.join(buildPath, "index.html"));
})

export default webRouter;