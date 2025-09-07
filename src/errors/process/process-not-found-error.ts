import { IClient } from "../../types/client";
import { BaseServiceError } from "./base-service-error";

export class ProcessNotFoundError<K extends keyof IClient> extends BaseServiceError {
  constructor(field: K, value: IClient[K]) {
    super(
      ProcessNotFoundError.name,
      `Process not found by client ${String(field)}=${String(value)}`,
      "PROCESS_NOT_FOUND",
      {
        field,
        value,
      },
    );
  }
}
