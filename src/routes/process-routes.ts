import { Router } from "express";
import { ProcessController } from "../controllers/process-controller";
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

const processController = new ProcessController(processService);

router.get("/status/:clientName", processController.get);
router.post("/start/:clientName", processController.create);
// router.patch("/pause/:clientId", processController.pause);
// router.patch("/resume/:clientId", processController.resume);
// router.patch("/extend/:clientId", processController.extend);
// router.patch("/finish/:clientId", processController.finish);

export default router;
