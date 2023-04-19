import { TContributor, TService } from "@/types";
import { api } from "./api";

export const getContributors = async () => {
  try {
    const { data } = await api.get<TContributor[]>(`/contributor`);
    return data;
  } catch (error) {
    console.log(error);
  }
  return null;
};

export const getContributorById = async (id: number | string) => {
  try {
    const { data } = await api.get<TContributor>(`/contributor/${id}`);
    return data;
  } catch (error) {
    console.log(error);
  }
  return null;
};

export const createContributor = async (body: TContributor) => {
  try {
    const { data } = await api.post<TContributor>(`/contributor`, body);
    return data;
  } catch (error) {
    console.log(error);
  }
  return null;
};

export const addService = async (id: number | string, body: any) => {
  // try {
  //   const { data } = await api.patch(`/contributors/${id}`, {
  //     services: [body],
  //   });
  //   return data;
  // } catch (error) {
  //   console.log(error);
  // }
  return {
    id,
    body,
  };
};
