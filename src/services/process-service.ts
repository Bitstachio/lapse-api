import { ProcessRepository } from "../repositories/process-repository";
import { IProcess, IProcessCreateDto, IProcessGetDto } from "../types/process";
import { ClientService } from "./client-service";
import { IntervalService } from "./interval-service";
import { toProcessGetDto } from "../mappers/process";
import { ProcessNotFoundError } from "../errors/process/process-not-found-error";
import { ProcessAlreadyExistsError } from "../errors/process/process-already-exists-error";

export class ProcessService {
  constructor(
    private repository: ProcessRepository,
    private intervalService: IntervalService,
    private clientService: ClientService,
  ) {}

  findByClientName = (clientName: string): IProcessGetDto | null => {
    const client = this.clientService.getByName(clientName);
    const process = this.repository.findByClientId(client.id);

    if (process) {
      const interval = this.intervalService.getById(process.intervalId);
      return toProcessGetDto(process, interval);
    }
    return null;
  }

  getByClientName = (clientName: string): IProcessGetDto => {
    const process = this.findByClientName(clientName);
    if (!process) throw new ProcessNotFoundError("name", clientName);
    return process;
  };

  create(clientName: string, process: IProcessCreateDto): IProcessGetDto {
    const existingProcess = this.findByClientName(clientName);
    if (existingProcess) throw new ProcessAlreadyExistsError(clientName, existingProcess);

    const client = this.clientService.getByName(clientName);
    // TODO: Set target duration dynamically
    const createdInterval = this.intervalService.create({ targetDuration: 10_000 });
    const createdProcess = this.repository.create(process, createdInterval.id, client.id);

    return toProcessGetDto(createdProcess, createdInterval);
  }

  update = (clientName: string, changes: Partial<IProcess>): IProcessGetDto => {
    const client = this.clientService.getByName(clientName);
    const process = this.repository.findByClientId(client.id);
    if (!process) throw new ProcessNotFoundError("name", clientName);
    const updated = this.repository.update(process.id, changes);
    if (!updated) throw new Error(); // TODO: Replace with appropriate error
    const interval = this.intervalService.getById(process.intervalId);
    return toProcessGetDto(process, interval);
  };

  pause = (clientName: string) => {
    this.update(clientName, { state: "paused" });
  };
}
