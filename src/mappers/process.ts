import { IProcess, IProcessGetDto } from "../types/process";
import { IInterval } from "../types/interval";

export const toProcessGetDto = (process: IProcess, interval: IInterval): IProcessGetDto => ({
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
