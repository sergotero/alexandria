import { setupWorker } from "msw/browser";
import { handleBooks } from "./books-handler.js";

const worker = setupWorker(...handleBooks);

export default worker;