import { ErrorCode } from "../../types/api";

export class BaseServiceError<T = unknown> extends Error {
  code: ErrorCode;
  details?: T;

  constructor(name: string, message: string, code: ErrorCode, details?: T) {
    super(message);
    this.name = name;
    this.code = code;
    this.details = details;

    // Ensure the prototype chain is correctly set when extending built-in classes like Error
    // Without this, `instanceof AppError` may fail in some runtimes or transpiled code
    Object.setPrototypeOf(this, new.target.prototype);
  }

  serialize() {
    return { code: this.code, ...(this.details && { details: this.details }) };
  }
}
