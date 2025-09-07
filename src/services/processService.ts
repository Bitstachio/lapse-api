import { InvalidProcessActionError } from "../errors/process/invalid-action-error";
import { ProcessNotFoundError } from "../errors/process/process-not-found-error";
import ProcessManager from "../ProcessManager";
import { IProcessCreateDto, TProcessState } from "../types/process";

const manager = () => ProcessManager.getInstance();

const calculateElapsedDuration = (state: TProcessState, startTime: Date, prevSessionsDuration: number) => {
  const now = Date.now();
  switch (state) {
    case "paused":
      return prevSessionsDuration;
    case "running":
      return now - startTime.getTime() + prevSessionsDuration;
    // TODO: Throw error in case of unhandled state
    default: // state === "timeout"
      return now - startTime.getTime();
  }
};

export const processService = {
  getStatus: (clientId: string) => {
    const process = manager().getProcess();
    if (!process) return process;
    return {
      ...process,
      interval: {
        ...process.interval,
        remainingDuration:
          process.interval.targetDuration -
          calculateElapsedDuration(process.state, process.interval.startTime, process.interval.prevSessionsDuration),
      },
    };
  },

  create: (clientId: string, newProcess: IProcessCreateDto) => {
    const process = manager().getProcess();

    if (process) throw new InvalidProcessActionError(process.state, "start", "Process already exists");

    return manager().create(newProcess);
  },

  pause: (clientId: string) => {
    const process = manager().getProcess();

    if (!process) throw new ProcessNotFoundError();
    if (process.state !== "running") throw new InvalidProcessActionError(process.state, "pause");

    manager().pause();
  },

  resume: (clientId: string) => {
    const process = manager().getProcess();

    if (!process) throw new ProcessNotFoundError();
    if (process.state !== "paused") throw new InvalidProcessActionError(process.state, "resume");

    manager().resume();
  },

  timeout: (clientId: string) => {
    const process = manager().getProcess();

    if (!process) throw new ProcessNotFoundError();
    if (process.state !== "running") throw new InvalidProcessActionError(process.state, "timeout");

    manager().timeout();
  },

  extend: (clientId: string) => {
    const process = manager().getProcess();

    if (!process) throw new ProcessNotFoundError();
    if (process.state !== "timeout") throw new InvalidProcessActionError(process.state, "extend");

    manager().extend();
  },

  finish: (clientId: string) => {
    const process = manager().getProcess();

    if (!process) throw new ProcessNotFoundError();
    if (process.state !== "running" && process.state !== "timeout")
      throw new InvalidProcessActionError(process.state, "finish");

    // TODO: Implement appropriate finish logic
    manager().reset();
  },
};
