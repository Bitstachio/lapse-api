import { Router } from "express";
import {
  createProcess,
  getProcess,
  extendProcess,
  pauseProcess,
  resumeProcess,
  testProcess,
  finishProcess,
} from "../controllers/processController";

const router = Router();

router.get("/test", testProcess);
router.get("/status", getProcess);
router.post("/start", createProcess);
router.patch("/pause", pauseProcess);
router.patch("/resume", resumeProcess);
router.patch("/extend", extendProcess);
router.patch("/finish", finishProcess)

export default router;
