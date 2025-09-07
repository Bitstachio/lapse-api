import { ErrorRequestHandler } from "express";
import { BaseServiceError } from "../errors/process/base-service-error";

export const errorHandler: ErrorRequestHandler = (error, req, res, _) => {
  if (error instanceof BaseServiceError) {
    let status = 500;

    if (error.code === "CLIENT_NOT_FOUND") status = 404;
    if (error.code === "INVALID_ARGUMENT") status = 400;
    if (error.code === "NO_PROCESS") status = 400;

    return res.status(status).json(error.serialize());
  }

  console.error(error);
  return res.status(500).json({ code: "INTERNAL_SERVER_ERROR" });
};
