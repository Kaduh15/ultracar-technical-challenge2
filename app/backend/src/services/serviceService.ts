import { Service, PrismaClient } from "@prisma/client";
import HttpError from "../utils/HttpError";
import { ServiceCreateProps } from "../schemas/createService";

export class ServiceService {
  constructor(private readonly model: PrismaClient) {}

  async create(data: ServiceCreateProps): Promise<Service> {
    const service = await this.model.service.create({
      data: {
        clientId: data.clientId,
        contributorId: data.contributorId,
        PartsOnService: {
          createMany: {
            data: data.parts,
          },
        },
      },
    });

    return service;
  }

  async findAll(): Promise<Service[]> {
    const services = await this.model.service.findMany({
      include: {
        client: true,
        contributor: true,
        PartsOnService: true,
      },
    });

    return services;
  }

  async findById(id: string): Promise<Service | null> {
    const service = await this.model.service.findUnique({ where: { id } });
    if (!service) throw new HttpError("Service not found", 404);

    return service;
  }

  async update(id: string, data: Service): Promise<Service | null> {
    const service = await this.model.service.findUnique({ where: { id } });

    if (!service) throw new HttpError("Service not found", 404);

    const updateService = await this.model.service.update({
      where: { id },
      data,
    });

    return updateService;
  }
  async delete(id: string): Promise<Service | null> {
    const service = await this.model.service.findUnique({ where: { id } });

    if (!service) throw new HttpError("Service not found", 404);

    const updateService = await this.model.service.delete({
      where: { id },
    });

    return updateService;
  }
}
