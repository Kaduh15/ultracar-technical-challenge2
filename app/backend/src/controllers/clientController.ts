import { Request, Response } from "express";
import { ClientService } from "../services";

import "express-async-errors";

export class ClientController {
  constructor(private readonly service: ClientService) {}

  async create(req: Request, res: Response): Promise<void> {
    const { body } = req;

    const clients = await this.service.create(body);

    res.status(200).json(clients);
  }

  async findAll(_: Request, res: Response): Promise<void> {
    const clients = await this.service.findAll();

    res.status(200).json(clients);
  }

  async findById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    const clients = await this.service.findById(id);

    res.status(200).json(clients);
  }

  async update(req: Request, res: Response): Promise<void> {
    const {
      body,
      params: { id },
    } = req;

    const clientUpdate = await this.service.update(id, body);

    res.status(201).json(clientUpdate);
  }

  async remove(req: Request, res: Response): Promise<void> {
    const {
      params: { id },
    } = req;

    const clientUpdate = await this.service.delete(id);

    res.status(201).json(clientUpdate);
  }
}
