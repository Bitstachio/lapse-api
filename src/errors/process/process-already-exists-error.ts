import { BaseServiceError } from "./base-service-error";
import { IProcessGetDto } from "../../types/process";

export class ProcessAlreadyExistsError extends BaseServiceError {
  constructor(clientName: string, process: IProcessGetDto) {
    super(ProcessAlreadyExistsError.name, "Client already has an associated process", "PROCESS_ALREADY_EXISTS", {
      clientName,
      process,
    });
  }
}
