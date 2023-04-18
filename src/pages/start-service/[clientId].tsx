import FormService from "@/components/FormService";
import { api } from "@/service/api";
import { TClient, TContributor, TPart } from "@/types";
import { GetServerSideProps } from "next";

interface HomeProps {
  client: TClient;
  contributors: TContributor[];
  parts: TPart[];
}

export default function Home({ client, contributors, parts }: HomeProps) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <FormService
        client={client}
        contributors={contributors}
        parts={parts}
      />
    </main>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { data: client } = await api.get(`/clients/${query.clientId}`);
  const { data: contributors } = await api.get(`/contributors`);
  const { data: parts } = await api.get(`/parts`);

  return {
    props: {
      client,
      contributors,
      parts,
    },
  };
};
