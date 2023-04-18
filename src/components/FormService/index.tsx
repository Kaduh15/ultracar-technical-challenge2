import { TClient, TContributor, TPart } from "@/types";
import React from "react";
import { MultiSelect } from "primereact/multiselect";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { Controller, useForm } from "react-hook-form";
import { useFormService } from "./useFormService";

type FormServiceProps = {
  client: TClient;
  contributors: TContributor[];
  parts: TPart[];
};

const FormService: React.FC<FormServiceProps> = ({
  client,
  contributors = [],
  parts = [],
}) => {
  const { control, errors, handleSubmit, onSubmit, selectContributors, selectParts } = useFormService({
    client,
    parts,
    contributors,
  });

  const { car } = client;

  return (
    <div className="flex flex-col items-center gap-8">
      <div className="flex flex-col">
        <h2>Serviço</h2>
        <span>Cliente: {client.name}</span>
        <span>
          Carro: {car.brand} - {car.model}
        </span>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <Controller
          name="contributor"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <Dropdown
              {...field}
              options={selectContributors}
              optionLabel="label"
              placeholder="Select contributor"
              className="w-full md:w-20rem"
            />
          )}
        />
        {!!errors?.contributor && <span>{errors.contributor.message}</span>}
        <Controller
          name="parts"
          control={control}
          render={({ field }) => (
            <MultiSelect
              id={field.name}
              {...field}
              options={selectParts}
              optionLabel="label"
              placeholder="Select Parts"
            />
          )}
        />

        <Button type="submit">Iniciar Serviço</Button>
      </form>
    </div>
  );
};

export default FormService;
