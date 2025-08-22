import { BaseServiceError } from "./base-service-error";

export class InvalidArgumentError extends BaseServiceError {
  constructor(message: string) {
    super(InvalidArgumentError.name, message, "INVALID_ARGUMENT");
  }
}
