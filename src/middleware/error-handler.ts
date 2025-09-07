import { ErrorRequestHandler } from "express";
import { BaseServiceError } from "../errors/process/base-service-error";
import { errorStatusCodes } from "../constants/api";

export const errorHandler: ErrorRequestHandler = (error, req, res, _) => {
  console.error(error);
  if (error instanceof BaseServiceError) return res.status(errorStatusCodes[error.code]).json(error.serialize());
  return res.status(500).json({ code: "INTERNAL_SERVER_ERROR" });
};
