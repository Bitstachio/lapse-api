import { BaseServiceError } from "./base-service-error";
import { IClient } from "../../types/client";

export class ClientNotFoundError<K extends keyof IClient> extends BaseServiceError {
  constructor(field: K, value: IClient[K]) {
    super(ClientNotFoundError.name, `Client not found by ${String(field)}=${String(value)}`, "CLIENT_NOT_FOUND", {
      field,
      value,
    });
  }
}
