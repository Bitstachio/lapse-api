// Consider incorporating Pick<> and convert everything to types

import { IInterval, IIntervalGetDto, IIntervalStatusDto } from "./interval";

// ===== Models =====

export type TProcessState = "running" | "paused" | "timeout";

export type TProcessAction = "start" | "finish" | "pause" | "resume" | "timeout" | "extend";

export interface IProcess {
  id: number,
  component: string;
  quantity: number;
  state: TProcessState;
  createdAt: Date;
  intervalId: number;
  clientId: number;
}

export interface IProcessRow {
  id: number,
  component: string;
  quantity: number;
  state: TProcessState;
  createdAt: string;
  intervalId: number;
  clientId: number;
}

export interface IInvalidProcessActionDetails {
  state: TProcessState;
  action: TProcessAction;
}

// ===== DTOs =====

export interface IProcessGetDto {
  component: string;
  quantity: number;
  state: TProcessState;
  createdAt: Date;
  interval: IIntervalGetDto;
}

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
