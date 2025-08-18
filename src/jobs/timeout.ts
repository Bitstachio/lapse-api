import ProcessManager from "../ProcessManager";
import { processService } from "../services/processService";
import { getIO } from "../socket";

export const checkTimeout = () => {
  const processManager = ProcessManager.getInstance();
  const process = processManager.getProcess();

  if (process) {
    const duration = Date.now() - process.interval.startTime.getTime() + process.interval.prevSessionsDuration;
    console.log(`Current process duration: ${duration} ms`);

    if ((process.state === "running" || process.state === "timeout") && duration > process.interval.targetDuration) {
      console.log("Process has timed out");

      const timestamp = new Date();
      if (process.state === "timeout") {
        console.log("* Extension Timeout");
        processManager.reset();
        getIO().emit("process-timeout", { type: "EXTENSION_TIMEOUT", timestamp });
      } else {
        console.log("* Process Timeout");
        processService.timeout(0); // TODO: Temporary solution
        getIO().emit("process-timeout", { type: "PROCESS_TIMEOUT", timestamp });
      }
    }
  }
};
