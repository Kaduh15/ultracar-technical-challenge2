import { Request, Response } from "express";
import { ServiceService } from "../services";

import "express-async-errors";

export class ServiceController {
  constructor(private readonly service: ServiceService) {}

  async create(req: Request, res: Response): Promise<void> {
    const { body } = req;

    const services = await this.service.create(body);

    res.status(201).json(services);
  }

  async findAll(_: Request, res: Response): Promise<void> {
    const services = await this.service.findAll();

    res.status(200).json(services);
  }

  async findById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    const services = await this.service.findById(id);

    res.status(200).json(services);
  }

  async update(req: Request, res: Response): Promise<void> {
    const {
      body,
      params: { id },
    } = req;

    const serviceUpdate = await this.service.update(id, body);

    res.status(201).json(serviceUpdate);
  }

  async delete(req: Request, res: Response): Promise<void> {
    const {
      params: { id },
    } = req;

    const serviceUpdate = await this.service.delete(id);

    res.status(204).json(serviceUpdate);
  }
}
