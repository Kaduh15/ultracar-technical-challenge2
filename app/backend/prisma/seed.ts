import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.client.createMany({
    data: [
      {
        id: "1",
        name: "John Doe",
      },
      {
        name: "João da Silva",
      },
      {
        name: "Pedro Alves",
      },
    ],
  });

  await prisma.car.createMany({
    data: [
      {
        brand: "Fiat",
        model: "Uno",
      },
      {
        brand: "Ford",
        model: "Fiesta",
      },
      {
        brand: "Volkswagen",
        model: "Gol",
      },
    ],
  });

  await prisma.contributor.createMany({
    data: [
      {
        name: "Matheus",
      },
      {
        name: "Thiago",
      },
      {
        name: "Marcus",
      },
    ],
  });

  await prisma.part.createMany({
    data: [
      {
        name: "Pneu",
        price: 100,
      },
      {
        name: "Parafuso de Roda",
        price: 10,
      },
      {
        name: "Óleo",
        price: 50,
      },
      {
        name: "Filtro de Óleo",
        price: 20,
      },
    ],
  });

  const getClients = await prisma.client.findMany();
  const getCars = await prisma.car.findMany();

  for (let i = 0; i < getClients.length; i++) {
    await prisma.client.update({
      where: { id: getClients[i].id },
      data: {
        carId: getCars[i].id,
      },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
