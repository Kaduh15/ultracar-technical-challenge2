import { Request, Response } from "express";
import { PartService } from "../services";

import "express-async-errors";

export class PartController {
  constructor(private readonly service: PartService) {}

  async create(req: Request, res: Response): Promise<void> {
    const { body } = req;

    const parts = await this.service.create(body);

    res.status(200).json(parts);
  }

  async findAll(_: Request, res: Response): Promise<void> {
    const parts = await this.service.findAll();

    res.status(200).json(parts);
  }

  async findById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    const parts = await this.service.findById(id);

    res.status(200).json(parts);
  }

  async update(req: Request, res: Response): Promise<void> {
    const {
      body,
      params: { id },
    } = req;

    const partUpdate = await this.service.update(id, body);

    res.status(201).json(partUpdate);
  }

  async delete(req: Request, res: Response): Promise<void> {
    const {
      params: { id },
    } = req;

    const partUpdate = await this.service.delete(id);

    res.status(201).json(partUpdate);
  }
}
