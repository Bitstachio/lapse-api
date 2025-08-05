import { OVERTIME_TARGET_DURATION, TARGET_DURATION, TIMEOUT_TARGET_DURATION } from "./constants/process";
import { IProcess, IProcessCreateDto } from "./types/process";

class ProcessManager {
  private static instance: ProcessManager;
  private process: IProcess | null = null;

  private constructor() {}

  public static getInstance(): ProcessManager {
    if (!ProcessManager.instance) {
      ProcessManager.instance = new ProcessManager();
    }
    return ProcessManager.instance;
  }

  // ===== Utilities =====

  public create(process: IProcessCreateDto) {
    const now = new Date();
    this.process = {
      component: process.component,
      quantity: process.quantity,
      state: "running",
      isRunning: true,
      pendingAction: false,
      createdAt: now,
      interval: {
        startTime: now,
        prevSessionsDuration: 0,
        targetDuration: TARGET_DURATION, // TODO: Value should be calculated based on component built time estimation
      },
    };

    return this.process;
  }

  public reset() {
    this.process = null;
  }

  // TODO: Determine whether I should have all these null checks?
  public pause() {
    if (this.process) {
      this.process.interval.prevSessionsDuration += Date.now() - this.process.interval.startTime.getTime();
      this.process.isRunning = false;
    }
  }

  public resume() {
    if (this.process) {
      this.process.interval.startTime = new Date();
      this.process.isRunning = true;
    }
  }

  public timeout() {
    if (this.process && this.process.interval) {
      this.process.interval.targetDuration = TIMEOUT_TARGET_DURATION;
      this.process.pendingAction = true;

      this.process.interval.prevSessionsDuration = 0;
      this.process.interval.startTime = new Date();
    }
  }

  public overtime() {
    if (this.process) {
      this.process.interval.targetDuration = OVERTIME_TARGET_DURATION;
      this.process.pendingAction = false;

      this.process.interval.prevSessionsDuration = 0;
      this.process.interval.startTime = new Date();
    }
  }

  // ===== Getters =====

  public getProcess() {
    return this.process;
  }
}

export default ProcessManager;
