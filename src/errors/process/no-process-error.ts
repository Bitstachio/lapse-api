import { BaseServiceError } from "./base-service-error";

export class NoProcessError extends BaseServiceError {
  constructor(message: string = "Process does not exist") {
    super(NoProcessError.name, message, "NO_PROCESS");
  }
}
