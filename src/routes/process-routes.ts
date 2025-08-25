import { Router } from "express";
import {
  extendProcess,
  finishProcess,
  getProcess,
  pauseProcess,
  ProcessController,
  resumeProcess,
  testProcess,
} from "../controllers/process-controller";
import { ProcessRepository } from "../repositories/process-repository";
import db from "../db/connection";
import { ClientRepository } from "../repositories/client-repository";
import { IntervalRepository } from "../repositories/interval-repository";
import { ClientService } from "../services/client-service";
import { IntervalService } from "../services/interval-service";
import { ProcessService } from "../services/process-service";

const router = Router();

const clientRepository = new ClientRepository(db);
const intervalRepository = new IntervalRepository(db);
const processRepository = new ProcessRepository(db);

const clientService = new ClientService(clientRepository);
const intervalService = new IntervalService(intervalRepository);
const processService = new ProcessService(processRepository, intervalService, clientService);

const processController = new ProcessController(processService, intervalService, clientService);

router.get("/test", testProcess);
router.get("/status/:clientName", processController.get);
router.post("/start/:clientName", processController.create);
router.patch("/pause/:clientId", pauseProcess);
router.patch("/resume/:clientId", resumeProcess);
router.patch("/extend/:clientId", extendProcess);
router.patch("/finish/:clientId", finishProcess);

export default router;
