// Consider incorporating Pick<> and convert everything to types

import { IInterval, IIntervalStatusDto } from "./interval";

// ===== Models =====

export type TProcessState = "running" | "paused" | "timeout";

export type TProcessAction = "start" | "finish" | "pause" | "resume" | "timeout" | "extend";

export interface IProcess {
  component: string;
  quantity: number;
  state: TProcessState;
  createdAt: Date;
  interval: IInterval;
}

export interface IInvalidProcessActionDetails {
  state: TProcessState;
  action: TProcessAction;
}

// ===== DTOs =====

export interface IProcessCreateDto {
  component: string;
  quantity: number;
}

export interface IProcessStatusDto extends IProcess {
  interval: IIntervalStatusDto;
}

export interface IProcessIdentifier {
  id: number;
}
