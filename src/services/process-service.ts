import { ProcessRepository } from "../repositories/process-repository";
import { IProcessCreateDto, IProcessGetDto } from "../types/process";
import { ClientService } from "./client-service";
import { IntervalService } from "./interval-service";
import { toProcessGetDto } from "../mappers/process";
import { NoProcessError } from "../errors/process/no-process-error";

export class ProcessService {
  constructor(
    private repository: ProcessRepository,
    private intervalService: IntervalService,
    private clientService: ClientService,
  ) {}

  getByClientName(clientName: string): IProcessGetDto {
    const client = this.clientService.findByName(clientName);
    const process = this.repository.findByClientId(client.id);
    if (!process) throw new NoProcessError(); // TODO: Make the error class more descriptive
    const interval = this.intervalService.getById(process.intervalId);
    return toProcessGetDto(process, interval);
  }

  create(clientName: string, process: IProcessCreateDto): IProcessGetDto {
    const client = this.clientService.findByName(clientName);
    // TODO: Set target duration dynamically
    const createdInterval = this.intervalService.create({ targetDuration: 10_000 });
    const createdProcess = this.repository.create(process, createdInterval.id, client.id);
    return toProcessGetDto(createdProcess, createdInterval);
  }
}
