import { prisma } from "@/lib/primas";
import { GetServerSideProps } from "next";
import { redirect } from "next/dist/server/api-utils";

export interface IClient {
  id: string
  name: string
  cars: ICar
}

export interface ICar {
  id: string
  brand: string
  model: string
  clientId: string
  contributorId: any
}

interface HomeProps {
  client: IClient
}

export default function Home({ client }: HomeProps) {

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      Hello World
      <p>{JSON.stringify(client, null, 2)}</p>
    </main>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query,  }) => {
  let client
  if (typeof query.id === "string") {

    const { id } = query;
    
    client = await prisma.client.findUnique({
      where: {
        id
      }, include: {
        car: true
      }
    })
  }

  if (!client) return {
    redirect: {
      destination: '/',
      permanent: false
    }
  }

  return {
    props: {
      client
    }
  }
};
