import { Request, Response } from "express";
import { InvalidProcessActionError } from "../errors/process/invalid-action-error";
import { NoProcessError } from "../errors/process/no-process-error";
import { processService } from "../services/processService";
import { IApiResponse } from "../types/api";
import { IProcess, IProcessCreateDto, IProcessGetDto, IProcessIdentifier, IProcessStatusDto } from "../types/process";
import { internalServerError } from "../utils/api";
import { ProcessService } from "../services/process-service";
import { ProcessRepository } from "../repositories/process-repository";
import db from "../db/connection";
import { IntervalService } from "../services/interval-service";
import { IntervalRepository } from "../repositories/interval-repository";
import { ClientService } from "../services/client-service";
import { ClientRepository } from "../repositories/client-repository";

export class ProcessController {
  constructor(
    private readonly processService: ProcessService,
    private readonly intervalService: IntervalService,
    private readonly clientService: ClientService,
  ) {}

  create(
    req: Request<{ clientName: string }, {}, IProcessCreateDto>,
    res: Response<IApiResponse<IProcessGetDto>>,
  ) {
    try {
      const service = new ProcessService(
        new ProcessRepository(db),
        new IntervalService(new IntervalRepository(db)),
        new ClientService(new ClientRepository(db)),
      );
      const result = service.create(req.params.clientName, req.body);
      res.status(201).json({ success: true, message: "Process created", data: result });
    } catch (error) {
      if (error instanceof InvalidProcessActionError) {
        return res.status(400).json({ success: false, message: error.message, error: error.serialize() });
      }
      return internalServerError(res);
    }
  }
}

export const testProcess = (_: Request, res: Response) => {
  res.status(200).json({ message: "Process test endpoint is working" });
};

export const getProcess = (
  req: Request<{ clientId: string }, {}, IProcessIdentifier>,
  res: Response<IApiResponse<IProcessStatusDto | null>>,
) => {
  try {
    const status = processService.getStatus(req.params.clientId);
    res.status(200).json({ success: true, ...(!status && { message: "No active process" }), data: status });
  } catch (error) {
    return internalServerError(res);
  }
};

export const pauseProcess = (
  req: Request<{ clientId: string }, {}, IProcessIdentifier>,
  res: Response<IApiResponse>,
) => {
  try {
    processService.pause(req.params.clientId);
    return res.status(200).json({ success: true, message: "Process paused" });
  } catch (error) {
    if (error instanceof NoProcessError || error instanceof InvalidProcessActionError) {
      return res.status(400).json({ success: false, message: error.message, error: error.serialize() });
    }
    return internalServerError(res);
  }
};

export const resumeProcess = (
  req: Request<{ clientId: string }, {}, IProcessIdentifier>,
  res: Response<IApiResponse>,
) => {
  try {
    processService.resume(req.params.clientId);
    return res.status(200).json({ success: true, message: "Process resumed" });
  } catch (error) {
    if (error instanceof NoProcessError || error instanceof InvalidProcessActionError) {
      return res.status(400).json({ success: false, message: error.message, error: error.serialize() });
    }
    return internalServerError(res);
  }
};

export const extendProcess = (
  req: Request<{ clientId: string }, {}, IProcessIdentifier>,
  res: Response<IApiResponse>,
) => {
  try {
    processService.extend(req.params.clientId);
    return res.status(200).json({ success: true, message: "Process resumed in overtime" });
  } catch (error) {
    return internalServerError(res);
  }
};

// TODO: Implement appropriate finish logic
export const finishProcess = (
  req: Request<{ clientId: string }, {}, IProcessIdentifier>,
  res: Response<IApiResponse>,
) => {
  try {
    processService.finish(req.params.clientId);
    return res.status(200).json({ success: true, message: "Process finished" });
  } catch (error) {
    if (error instanceof NoProcessError || error instanceof InvalidProcessActionError) {
      return res.status(400).json({ success: false, message: error.message, error: error.serialize() });
    }
  }
};
