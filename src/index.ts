import app from "./app";
import { TIMEOUT_CHECK_INTERVAL } from "./constants/process";
import { checkTimeout } from "./jobs/timeout";

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);

  // Schedule job(s)
  setInterval(checkTimeout, TIMEOUT_CHECK_INTERVAL);
});
