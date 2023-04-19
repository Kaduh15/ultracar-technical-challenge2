import { TPart } from "@/types";
import { api } from "./api";

export const getParts = async () => {
  try {
    const { data } = await api.get<TPart[]>(`/parts`);
    return data;
  } catch (error) {
    console.log(error);
  }
  return null;
};

export const getPartById = async (id: number | string) => {
  try {
    const { data } = await api.get<TPart>(`/parts/${id}`);
    return data;
  } catch (error) {
    console.log(error);
  }
  return null;
};

export const createPart = async (body: TPart) => {
  try {
    const { data } = await api.post<TPart>(`/parts`, body);
    return data;
  } catch (error) {
    console.log(error);
  }
  return null;
};
