import { Router } from "express";

import "express-async-errors";
import { ContributorController } from "../controllers";
import { ContributorService } from "../services";
import { prisma } from "../lib/prisma";

const contributorService = new ContributorService(prisma);
const contributorController = new ContributorController(contributorService);

export const contributorRouter = Router();

contributorRouter.get("/", (req, res) =>
  contributorController.findAll(req, res)
);

contributorRouter.get("/:id", (req, res) =>
  contributorController.findById(req, res)
);

contributorRouter.post("/", (req, res) =>
  contributorController.create(req, res)
);

contributorRouter.put("/:id", (req, res) =>
  contributorController.update(req, res)
);
