import { Car, PrismaClient } from "@prisma/client";
import HttpError from "../utils/HttpError";

export class CarService {
  constructor(private readonly model: PrismaClient) {}

  async create(data: Car): Promise<Car> {
    const car = await this.model.car.create({
      data
    });

    return car;
  }

  async findAll(): Promise<Car[]> {
    const cars = await this.model.car.findMany();

    return cars;
  }

  async findById(id: string): Promise<Car | null> {
    const car = await this.model.car.findUnique({ where: { id } });
    if (!car) throw new HttpError("Car not found", 404);

    return car;
  }

  async update(id: string, data: Car): Promise<Car | null> {
    const car = await this.model.car.findUnique({ where: { id } });

    if (!car) throw new HttpError("Car not found", 404);

    const updateCar = await this.model.car.update({
      where: { id },
      data
    })

    return updateCar;
  }
  async delete(id: string): Promise<Car | null> {
    const car = await this.model.car.findUnique({ where: { id } });

    if (!car) throw new HttpError("Car not found", 404);

    const updateCar = await this.model.car.delete({
      where: { id },
    })

    return updateCar;
  }
}
