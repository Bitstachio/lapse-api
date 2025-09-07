import express from "express";
import processRoutes from "./routes/process-routes";
import cors from "cors";
import { swaggerRouter } from "./routes/swagger";
import { errorHandler } from "./middleware/error-handler";

const baseUrl = "/api/v1";

const app = express();

app.use(cors()); // TODO: Configure appropriate CORS

app.use(express.json());
app.use(baseUrl + "/process", processRoutes);
app.use(baseUrl, swaggerRouter);

app.use(errorHandler);

export default app;
