import { Router } from "express";

import "express-async-errors";
import { PartController } from "../controllers";
import { PartService } from "../services";
import { prisma } from "../lib/prisma";
import bodyMiddleware from "../middlewares/body.middleware";
import { PartCreateOneSchema, PartUpsertSchema } from "../../prisma/generated/schemas";

const partService = new PartService(prisma);
const partController = new PartController(partService);

export const partRouter = Router();

partRouter.get("/", (req, res) => partController.findAll(req, res));

partRouter.get("/:id", (req, res) => partController.findById(req, res));

partRouter.post("/", (req, res) =>
  partController.create(req, res)
);

partRouter.put("/:id", (req, res) =>
  partController.update(req, res)
);
