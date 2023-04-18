import { api } from "@/service/api";
import { TContributor } from "@/types";
import { GetServerSideProps } from "next";
import { ListBox } from "primereact/listbox";
import React from "react";

type ContributorProps = {
  contributorData: TContributor;
};

const contributor: React.FC<ContributorProps> = ({ contributorData }) => {
  const formatOptionService = contributorData?.service
    ?.map(({ id, client }) => {
      return {
        id,
        name: client.name,
      };
    }) ?? []

  return (
    <>
      <ListBox
        options={formatOptionService}
        optionLabel="name"
        optionValue="id"
        filter
      />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { data } = await api.get(`/contributor/${query?.contributorId}`);

  return {
    props: {
      contributorData: data,
    },
  };
};

export default contributor;
