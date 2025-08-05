import { InvalidProcessActionError } from "../errors/process/invalid-action-error";
import { NoProcessError } from "../errors/process/no-process-error";
import ProcessManager from "../ProcessManager";
import { IProcessCreateDto } from "../types/process";

const manager = () => ProcessManager.getInstance();

export const processService = {
  getStatus: () => {
    const process = manager().getProcess();
    if (!process) return process;
    return {
      ...process,
      interval: {
        ...process.interval,
        remainingDuration:
          process.interval.targetDuration -
          (process.isRunning
            ? Date.now() - process.interval.startTime.getTime()
            : process.interval.prevSessionsDuration),
      },
    };
  },

  create: (newProcess: IProcessCreateDto) => {
    const process = manager().getProcess();

    if (process) throw new InvalidProcessActionError(process.state, "start", "Process already exists");

    return manager().create(newProcess);
  },

  pause: () => {
    const process = manager().getProcess();

    if (!process) throw new NoProcessError();
    if (process.state !== "running") throw new InvalidProcessActionError(process.state, "pause");

    manager().pause();
  },

  resume: () => {
    const process = manager().getProcess();

    if (!process) throw new NoProcessError();
    if (process.state !== "paused") throw new InvalidProcessActionError(process.state, "resume");

    manager().resume();
  },

  timeout: () => {
    const process = manager().getProcess();

    if (!process) throw new NoProcessError();
    if (process.state !== "running") throw new InvalidProcessActionError(process.state, "timeout");

    manager().timeout();
  },

  extend: () => {
    const process = manager().getProcess();

    if (!process) throw new NoProcessError();
    if (process.state !== "timeout") throw new InvalidProcessActionError(process.state, "extend");

    manager().overtime();
  },
};
