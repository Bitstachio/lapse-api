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

      if (process.state === "timeout") {
        getIO().emit("process-timeout", { status: "updated" });
        console.log("EXPIRE");
        processManager.reset();
      } else {
        console.log("DISPLAY POPUP");
        processService.timeout();
      }
    }
  }
};
