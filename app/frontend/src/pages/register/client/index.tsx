/* eslint-disable react-hooks/rules-of-hooks */
import {
  InputTextController,
  ListBoxController,
} from "@/components/FormController";
import { api } from "@/service/api";
import { TCar } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { GetServerSideProps } from "next";
import { Button } from "primereact/button";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const FormClientRegisterSchema = z.object({
  name: z.string().min(5, "O nome precisa ter no mínimo 5 caracteres"),
  carId: z.string(),
});

type ClientProps = {
  cars: TCar[];
};

export type FormClientProps = z.infer<typeof FormClientRegisterSchema>;

const client: React.FC<ClientProps> = ({ cars }) => {
  const { control, watch } = useForm<FormClientProps>({
    resolver: zodResolver(FormClientRegisterSchema),
  });

  const lisBoxOptionsCar = cars.map((car) => {
    return {
      value: car.id,
      label: `${car.brand} ${car.model}`,
    };
  });

  return (
    <main className="h-screen flex flex-col justify-center items-center">
      <form className="flex flex-col items-center justify-center">
        <label htmlFor="">Cadastro de Clientes</label>
        <InputTextController
          control={control}
          nameControl="name"
          labelText="Nome do Cliente"
          placeholder="José da Silva"
        />
        <Button type="button">Adicionar Carro</Button>
        <ListBoxController
          control={control}
          options={lisBoxOptionsCar}
          nameControl={"cars"}
          filter
        />
      </form>
    </main>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const { data: cars } = await api.get("/car");

  return {
    props: {
      cars,
    },
  };
};

export default client;
