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
router.get("/status/:clientId", getProcess);
router.post("/start/:clientId", createProcess);
router.patch("/pause/:clientId", pauseProcess);
router.patch("/resume/:clientId", resumeProcess);
router.patch("/extend/:clientId", extendProcess);
router.patch("/finish/:clientId", finishProcess)

export default router;
