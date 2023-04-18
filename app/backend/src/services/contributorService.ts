import { Contributor, PrismaClient } from "@prisma/client";
import HttpError from "../utils/HttpError";

export class ContributorService {
  constructor(private readonly model: PrismaClient) {}

  async create(data: Contributor): Promise<Contributor> {
    const contributor = await this.model.contributor.create({
      data,
    });

    return contributor;
  }

  async findAll(): Promise<Contributor[]> {
    const contributors = await this.model.contributor.findMany();

    return contributors;
  }

  async findById(id: string): Promise<Contributor | null> {
    const contributor = await this.model.contributor.findUnique({
      where: { id },
      include: {
        service: {
          include: {
            client: {
              include: {
                car: true,
              },
            },
            PartsOnService: {
              include: {
                part: true,
              }
            }
          },
        },
      },
    });
    if (!contributor) throw new HttpError("Contributor not found", 404);

    return contributor;
  }

  async update(id: string, data: Contributor): Promise<Contributor | null> {
    const contributor = await this.model.contributor.findUnique({
      where: { id },
    });

    if (!contributor) throw new HttpError("Contributor not found", 404);

    const updateContributor = await this.model.contributor.update({
      where: { id },
      data,
    });

    return updateContributor;
  }
  async delete(id: string): Promise<Contributor | null> {
    const contributor = await this.model.contributor.findUnique({
      where: { id },
    });

    if (!contributor) throw new HttpError("Contributor not found", 404);

    const updateContributor = await this.model.contributor.delete({
      where: { id },
    });

    return updateContributor;
  }
}
