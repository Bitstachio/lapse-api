import { IProcess, IProcessGetDto } from "../types/process";
import { IIntervalGetDto } from "../types/interval";

export const toProcessGetDto = (process: IProcess, interval: IIntervalGetDto): IProcessGetDto => ({
  component: process.component,
  quantity: process.quantity,
  state: process.state,
  createdAt: process.createdAt,
  interval: {
    startTime: interval.startTime,
    targetDuration: interval.targetDuration,
    prevSessionsDuration: interval.prevSessionsDuration,
  },
});
