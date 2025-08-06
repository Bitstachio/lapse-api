import app from "./app";
import { createServer } from "http";
import { initSocket } from "./socket";
import { TIMEOUT_CHECK_INTERVAL } from "./constants/process";
import { checkTimeout } from "./jobs/timeout";

const PORT = process.env.PORT || 3000;
const server = createServer(app);

initSocket(server);

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);

  // Schedule job(s)
  setInterval(checkTimeout, TIMEOUT_CHECK_INTERVAL);
});
