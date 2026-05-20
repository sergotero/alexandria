import { isHttpError } from "http-errors";
import type { Request, Response, NextFunction } from "express";

const errorHandler = async (err: unknown, req: Request, res: Response, next: NextFunction) => {

  console.error(err);
  
  if (isHttpError(err)) {
    return res.status(err.status).json({
      success: false,
      error: {
        message: err.message,
        statusCode: err.status
      }
    });
  }

  return res.status(500).json({
    success: false,
    error: {
      message: "Internal Server Error",
      statusCode: 500
    }
  });
}

export default errorHandler;