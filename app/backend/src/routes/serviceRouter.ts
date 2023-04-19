import { Router } from "express";

import "express-async-errors";
import { ServiceController } from "../controllers";
import { ServiceService } from "../services";
import { prisma } from "../lib/prisma";
import { bodyMiddleware } from "../middlewares";
import { ServiceCreateSchema } from "../schemas/createService";

const serviceService = new ServiceService(prisma);
const serviceController = new ServiceController(serviceService);

export const serviceRouter = Router();

serviceRouter.get("/", (req, res) => serviceController.findAll(req, res));

serviceRouter.get("/:id", (req, res) => serviceController.findById(req, res));

serviceRouter.post("/start", bodyMiddleware(ServiceCreateSchema), (req, res) =>
  serviceController.create(req, res)
);

serviceRouter.put("/:id", (req, res) => serviceController.update(req, res));
