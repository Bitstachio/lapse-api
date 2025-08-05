import express from "express";
import processRoutes from "./routes/processRoutes";
import cors from "cors";

const baseUrl = "/api/v1";

const app = express();

app.use(cors()); // TODO: Configure appropriate CORS

app.use(express.json());
app.use(baseUrl + "/process", processRoutes);

export default app;
