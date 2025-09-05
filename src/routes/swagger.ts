import { Request, Response, Router } from "express";
import { swaggerSpec } from "../configs/swagger";

export const swaggerRouter = Router();

swaggerRouter.get("/swagger.json", (_: Request, res: Response) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerSpec);
});
