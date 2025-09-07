import { Request, Response } from "express";
import { IApiResponse } from "../types/api";
import { IProcessCreateDto, IProcessGetDto, IProcessIdentifier } from "../types/process";
import { ProcessService } from "../services/process-service";
import { IClientIdentifier } from "../types/client";

export class ProcessController {
  constructor(private readonly processService: ProcessService) {}

  get = (
    req: Request<IClientIdentifier, {}, IProcessIdentifier>,
    res: Response<IApiResponse<IProcessGetDto | null>>,
  ) => {
    const process = this.processService.findByClientName(req.params.clientName);
    return res.status(200).json({ success: true, data: process });
  };

  create(req: Request<IClientIdentifier, {}, IProcessCreateDto>, res: Response<IApiResponse<IProcessGetDto>>) {
    const result = this.processService.create(req.params.clientName, req.body);
    res.status(201).json({ success: true, message: "Process created", data: result });
  }
}
