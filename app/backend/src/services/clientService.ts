import { Client, PrismaClient } from "@prisma/client";
import HttpError from "../utils/HttpError";

export class ClientService {
  constructor(private readonly model: PrismaClient) {}

  async create(data: Client): Promise<Client> {
    const client = await this.model.client.create({
      data
    });

    return client;
  }

  async findAll(): Promise<Client[]> {
    const clients = await this.model.client.findMany();

    return clients;
  }

  async findById(id: string): Promise<Client | null> {
    const client = await this.model.client.findUnique({ where: { id }, include: {
      car: true
    } });
    if (!client) throw new HttpError("Client not found", 404);

    return client;
  }

  async update(id: string, data: Client): Promise<Client | null> {
    const client = await this.model.client.findUnique({ where: { id } });

    if (!client) throw new HttpError("Client not found", 404);

    const updateClient = await this.model.client.update({
      where: { id },
      data
    })

    return updateClient;
  }
  async delete(id: string): Promise<Client | null> {
    const client = await this.model.client.findUnique({ where: { id } });

    if (!client) throw new HttpError("Client not found", 404);

    const updateClient = await this.model.client.delete({
      where: { id },
    })

    return updateClient;
  }
}
