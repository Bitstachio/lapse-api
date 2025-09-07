import { ErrorRequestHandler, Response } from "express";
import { BaseServiceError } from "../errors/process/base-service-error";
import { errorStatusCodes } from "../constants/api";
import { IApiResponse } from "../types/api";

export const errorHandler: ErrorRequestHandler = (error, _req, res: Response<IApiResponse>, _next) => {
  console.error(error);
  if (error instanceof BaseServiceError) {
    return res.status(errorStatusCodes[error.code]).json({
      success: false,
      message: error.message,
      error: error.serialize(),
    });
  }
  return res.status(500).json({
    success: false,
    message: "Internal server error",
    error: { code: "INTERNAL_ERROR" },
  });
};
