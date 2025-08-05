import express from "express";
import processRoutes from "./routes/processRoutes";

const baseUrl = "/api/v1";

const app = express();

app.use(express.json());
app.use(baseUrl + "/process", processRoutes);

export default app;
