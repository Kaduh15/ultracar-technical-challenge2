import { TPart } from "@/types";
import { api } from "./api";

export const getParts = async () => {
  try {
    const { data } = await api.get<TPart[]>(`/part`);
    return data;
  } catch (error) {
    console.log(error);
  }
  return null;
};

export const getPartById = async (id: number | string) => {
  try {
    const { data } = await api.get<TPart>(`/part/${id}`);
    return data;
  } catch (error) {
    console.log(error);
  }
  return null;
};

export const createPart = async (body: TPart) => {
  try {
    const { data } = await api.post<TPart>(`/part`, body);
    return data;
  } catch (error) {
    console.log(error);
  }
  return null;
};
