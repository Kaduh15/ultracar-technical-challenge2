import { Request, Response } from "express";
import { CarService } from "../services";

import "express-async-errors";

export class CarController {
  constructor(private readonly service: CarService) {}

  async create(req: Request, res: Response): Promise<void> {
    const { body } = req;

    const cars = await this.service.create(body);

    res.status(200).json(cars);
  }

  async findAll(_: Request, res: Response): Promise<void> {
    const cars = await this.service.findAll();

    res.status(200).json(cars);
  }

  async findById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    const cars = await this.service.findById(id);

    res.status(200).json(cars);
  }

  async update(req: Request, res: Response): Promise<void> {
    const {
      body,
      params: { id },
    } = req;

    const carUpdate = await this.service.update(id, body);

    res.status(201).json(carUpdate);
  }

  async delete(req: Request, res: Response): Promise<void> {
    const {
      params: { id },
    } = req;

    const carUpdate = await this.service.delete(id);

    res.status(201).json(carUpdate);
  }
}
