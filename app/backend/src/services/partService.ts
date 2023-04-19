import { Part, PrismaClient } from "@prisma/client";
import HttpError from "../utils/HttpError";

export class PartService {
  constructor(private readonly model: PrismaClient) {}

  async create(data: Part): Promise<Part> {
    const part = await this.model.part.create({
      data
    });

    return part;
  }

  async findAll(): Promise<Part[]> {
    const parts = await this.model.part.findMany();

    return parts;
  }

  async findById(id: string): Promise<Part | null> {
    const part = await this.model.part.findUnique({ where: { id } });
    if (!part) throw new HttpError("Part not found", 404);

    return part;
  }

  async update(id: string, data: Part): Promise<Part | null> {
    const part = await this.model.part.findUnique({ where: { id } });

    if (!part) throw new HttpError("Part not found", 404);

    const updatePart = await this.model.part.update({
      where: { id },
      data
    })

    return updatePart;
  }
  async delete(id: string): Promise<Part | null> {
    const part = await this.model.part.findUnique({ where: { id } });

    if (!part) throw new HttpError("Part not found", 404);

    const updatePart = await this.model.part.delete({
      where: { id },
    })

    return updatePart;
  }
}
