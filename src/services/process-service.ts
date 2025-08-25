import { ProcessRepository } from "../repositories/process-repository";
import { IProcessCreateDto, IProcessGetDto } from "../types/process";
import { ClientService } from "./client-service";
import { IntervalService } from "./interval-service";
import { toProcessGetDto } from "../mappers/process";

export class ProcessService {
  constructor(
    private repository: ProcessRepository,
    private intervalService: IntervalService,
    private clientService: ClientService,
  ) {}

  create(clientName: string, process: IProcessCreateDto): IProcessGetDto {
    const client = this.clientService.findByName(clientName);
    // TODO: Set target duration dynamically
    const createdInterval = this.intervalService.create({ targetDuration: 10_000 });
    const createdProcess = this.repository.create(process, createdInterval.id, client.id);
    return toProcessGetDto(createdProcess, createdInterval);
  }
}
