import { InvalidProcessActionError } from "../errors/process/invalid-action-error";
import { NoProcessError } from "../errors/process/no-process-error";
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
  getStatus: (id: number) => {
    const process = manager().getProcess();
    if (!process) return process;
    return {
      ...process,
      interval: {
        ...process.interval,
        remainingDuration:
          process.interval.targetDuration - calculateElapsedDuration(process.state, process.interval.startTime, process.interval.prevSessionsDuration),
      }
    };
  },

  create: (newProcess: IProcessCreateDto) => {
    const process = manager().getProcess();

    if (process) throw new InvalidProcessActionError(process.state, "start", "Process already exists");

    return manager().create(newProcess);
  },

  pause: (id: number) => {
    const process = manager().getProcess();

    if (!process) throw new NoProcessError();
    if (process.state !== "running") throw new InvalidProcessActionError(process.state, "pause");

    manager().pause();
  },

  resume: (id: number) => {
    const process = manager().getProcess();

    if (!process) throw new NoProcessError();
    if (process.state !== "paused") throw new InvalidProcessActionError(process.state, "resume");

    manager().resume();
  },

  timeout: (id: number) => {
    const process = manager().getProcess();

    if (!process) throw new NoProcessError();
    if (process.state !== "running") throw new InvalidProcessActionError(process.state, "timeout");

    manager().timeout();
  },

  extend: (id: number) => {
    const process = manager().getProcess();

    if (!process) throw new NoProcessError();
    if (process.state !== "timeout") throw new InvalidProcessActionError(process.state, "extend");

    manager().extend();
  },

  finish: (id: number) => {
    const process = manager().getProcess();

    if (!process) throw new NoProcessError();
    if (process.state !== "running") throw new InvalidProcessActionError(process.state, "finish");

    // TODO: Implement appropriate finish logic
    manager().reset();
  },
};
