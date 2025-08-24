import { BaseServiceError } from "./base-service-error";

export class ClientNotFoundError extends BaseServiceError {
  constructor(id: number) {
    super(ClientNotFoundError.name, `Client not found for the given ID`, "CLIENT_NOT_FOUND", { id });
  }
}
