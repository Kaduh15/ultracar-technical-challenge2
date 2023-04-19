import { TClient } from "@/types";
import { api } from "./api";

export const getClients = async () => {
  try {
    const { data } = await api.get<TClient[]>(`/client`);
    return data;
  } catch (error) {
    console.log(error);
  }
  return null;
};

export const getClientById = async (id: number | string) => {
  try {
    const { data } = await api.get<TClient>(`/client/${id}`);
    return data;
  } catch (error) {
    console.log(error);
  }
  return null;
};

export const createClient = async (body: TClient) => {
  try {
    const { data } = await api.post<TClient>(`/client`, body);
    return data;
  } catch (error) {
    console.log(error);
  }
  return null;
};
