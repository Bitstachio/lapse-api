import { Router } from "express";
import {
  createProcess,
  getProcess,
  overtimeProcess,
  pauseProcess,
  resumeProcess,
  testProcess,
} from "../controllers/processController";

const router = Router();

router.get("/test", testProcess);
router.get("/status", getProcess);
router.post("/start", createProcess);
router.patch("/pause", pauseProcess);
router.patch("/resume", resumeProcess);
router.patch("/extend", overtimeProcess);

export default router;
