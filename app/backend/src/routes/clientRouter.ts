import { Router } from "express";

import "express-async-errors";
import { ClientController } from "../controllers";
import { ClientService } from "../services";
import { prisma } from "../lib/prisma";
import bodyMiddleware from "../middlewares/body.middleware";
import { ClientCreateOneSchema, ClientUpsertSchema } from "../../prisma/generated/schemas";


const clientService = new ClientService(prisma);
const clientController = new ClientController(clientService);

export const clientRouter = Router();

clientRouter.get("/", (req, res) => clientController.findAll(req, res));

clientRouter.get("/:id", (req, res) => clientController.findById(req, res));

clientRouter.post("/", (req, res) =>
  clientController.create(req, res)
);

clientRouter.put("/:id", bodyMiddleware(ClientUpsertSchema), (req, res) =>
  clientController.update(req, res)
);
