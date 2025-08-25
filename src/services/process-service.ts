import { ProcessRepository } from "../repositories/process-repository";
import { IProcessCreateDto } from "../types/process";
import { ClientService } from "./client-service";
import { IntervalService } from "./interval-service";

export class ProcessService {
  constructor(
    private repository: ProcessRepository,
    private intervalService: IntervalService,
    private clientService: ClientService,
  ) {}

  create(clientName: string, process: IProcessCreateDto) {
    const clientId = this.clientService.findByName(clientName).id;
    // TODO: Set target duration dynamically
    const intervalId = this.intervalService.create({ targetDuration: 10_000 }).id;
    return this.repository.create(process, intervalId, clientId);
  }
}
