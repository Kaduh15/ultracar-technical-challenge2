import { Router } from "express";

import "express-async-errors";
import { ClientController } from "../controllers";
import { ClientService } from "../services";
import { prisma } from "../lib/prisma";

const clientService = new ClientService(prisma);
const clientController = new ClientController(clientService);

export const clientRouter = Router();

clientRouter.get("/", (req, res) => clientController.findAll(req, res));

clientRouter.get("/:id", (req, res) => clientController.findById(req, res));

clientRouter.post("/", (req, res) => clientController.create(req, res));

clientRouter.put("/:id", (req, res) => clientController.update(req, res));
