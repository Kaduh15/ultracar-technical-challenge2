import { Request, Response } from "express";
import { ContributorService } from "../services";

import "express-async-errors";

export class ContributorController {
  constructor(private readonly service: ContributorService) {}

  async create(req: Request, res: Response): Promise<void> {
    const { body } = req;

    const contributors = await this.service.create(body);

    res.status(201).json(contributors);
  }

  async findAll(_: Request, res: Response): Promise<void> {
    const contributors = await this.service.findAll();

    res.status(200).json(contributors);
  }

  async findById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    const contributors = await this.service.findById(id);

    res.status(200).json(contributors);
  }

  async update(req: Request, res: Response): Promise<void> {
    const {
      body,
      params: { id },
    } = req;

    const contributorUpdate = await this.service.update(id, body);

    res.status(201).json(contributorUpdate);
  }

  async delete(req: Request, res: Response): Promise<void> {
    const {
      params: { id },
    } = req;

    const contributorUpdate = await this.service.delete(id);

    res.status(204).json(contributorUpdate);
  }
}
