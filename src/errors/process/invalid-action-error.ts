import { TProcessAction, TProcessState } from "../../types/process";
import { BaseServiceError } from "./base-service-error";

export class InvalidProcessActionError extends BaseServiceError {
  constructor(state: TProcessState, action: TProcessAction, message = "Action is not allowed in current state") {
    super(InvalidProcessActionError.name, message, "INVALID_PROCESS_ACTION", { state, action });
  }
}
