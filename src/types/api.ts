import { ERROR_CODES } from "../constants/api";

export type ErrorCode = keyof typeof ERROR_CODES;

export interface IApiResponse<TData = unknown, TError = unknown> {
  success: boolean;
  message?: string;
  data?: TData;
  error?: {
    code: ErrorCode;
    details?: TError;
  };
}
