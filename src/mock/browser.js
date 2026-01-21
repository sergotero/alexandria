import { setupWorker } from "msw/browser";
import { bookHandlers } from "./books-handler.js";
import { authHandlers } from "./auth-handlers.js";
import { reviewHandlers } from "./review-handlers.js";

const worker = setupWorker(...bookHandlers, ...authHandlers, ...reviewHandlers);

export default worker;