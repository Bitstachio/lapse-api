import { Request, Response } from "express";
import { InvalidProcessActionError } from "../errors/process/invalid-action-error";
import { NoProcessError } from "../errors/process/no-process-error";
import { processService } from "../services/processService";
import { IApiResponse } from "../types/api";
import { IProcess, IProcessCreateDto, IProcessStatusDto } from "../types/process";
import { internalServerError } from "../utils/api";

export const testProcess = (_: Request, res: Response) => {
  res.status(200).json({ message: "Process test endpoint is working" });
};

export const getProcess = (_: Request, res: Response<IApiResponse<IProcessStatusDto | null>>) => {
  try {
    const status = processService.getStatus();
    res.status(200).json({ success: true, ...(!status && { message: "No active process" }), data: status });
  } catch (error) {
    return internalServerError(res);
  }
};

export const createProcess = (req: Request<{}, {}, IProcessCreateDto>, res: Response<IApiResponse<IProcess>>) => {
  try {
    const process = processService.create(req.body);
    res.status(201).json({ success: true, message: "Process created", data: process });
  } catch (error) {
    if (error instanceof InvalidProcessActionError) {
      return res.status(400).json({ success: false, message: error.message, error: error.serialize() });
    }
    return internalServerError(res);
  }
};

export const pauseProcess = (_: Request, res: Response<IApiResponse>) => {
  try {
    processService.pause();
    return res.status(200).json({ success: true, message: "Process paused" });
  } catch (error) {
    if (error instanceof NoProcessError || error instanceof InvalidProcessActionError) {
      return res.status(400).json({ success: false, message: error.message, error: error.serialize() });
    }
    return internalServerError(res);
  }
};

export const resumeProcess = (_: Request, res: Response<IApiResponse>) => {
  try {
    processService.resume();
    return res.status(200).json({ success: true, message: "Process resumed" });
  } catch (error) {
    if (error instanceof NoProcessError || error instanceof InvalidProcessActionError) {
      return res.status(400).json({ success: false, message: error.message, error: error.serialize() });
    }
    return internalServerError(res);
  }
};

export const extendProcess = (_: Request, res: Response<IApiResponse>) => {
  try {
    processService.extend();
    return res.status(200).json({ success: true, message: "Process resumed in overtime" });
  } catch (error) {
    return internalServerError(res);
  }
};

// TODO: Implement appropriate finish logic
export const finishProcess = (_: Request, res: Response<IApiResponse>) => {
  try {
    processService.finish();
    return res.status(200).json({ success: true, message: "Process finished" });
  } catch (error) {
    if (error instanceof NoProcessError || error instanceof InvalidProcessActionError) {
      return res.status(400).json({ success: false, message: error.message, error: error.serialize() });
    }
  }
};
