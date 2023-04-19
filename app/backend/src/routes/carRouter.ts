import { Router } from "express";

import "express-async-errors";
import { CarController } from "../controllers";
import { CarService } from "../services";
import { prisma } from "../lib/prisma";
import bodyMiddleware from "../middlewares/body.middleware";
import { CarCreateOneSchema, CarUpsertSchema } from "../../prisma/generated/schemas";

const carService = new CarService(prisma);
const carController = new CarController(carService);

export const carRouter = Router();

carRouter.get("/", (req, res) => carController.findAll(req, res));

carRouter.get("/:id", (req, res) => carController.findById(req, res));

carRouter.post("/", (req, res) =>
  carController.create(req, res)
);

carRouter.put("/:id", bodyMiddleware(CarUpsertSchema), (req, res) =>
  carController.update(req, res)
);
