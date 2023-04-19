import { TClient, TContributor, TPart } from "@/types";
import React from "react";
import { Button } from "primereact/button";
import { useFormService } from "./useFormService";
import { DropdownController } from "../FormController";
import { InputNumberController } from "../FormController";

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
  const {
    addPart,
    control,
    errors,
    fields,
    handleSubmit,
    onSubmit,
    selectContributors,
    selectParts,
  } = useFormService({
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
        <DropdownController
          control={control}
          options={selectContributors}
          nameControl="contributor"
        />
        {!!errors?.contributor && <span>{errors.contributor.message}</span>}

        <label
          htmlFor="parts"
          className="flex items-center justify-between gap-4"
        >
          Peças
          <Button type="button" onClick={addPart} size="small">
            Adicionar
          </Button>
        </label>
        <div>
          {fields.map((field, index) => {
            return (
              <div key={field.id}>
                <DropdownController
                  control={control}
                  nameControl={`parts.${index}.partId`}
                  filter
                  options={selectParts}
                  optionLabel="label"
                  optionValue="value"
                />
                <InputNumberController
                  showButtons
                  control={control}
                  nameControl={`parts.${index}.quantity`}
                />
              </div>
            );
          })}
        </div>

        <Button type="submit">Iniciar Serviço</Button>
      </form>
    </div>
  );
};

export default FormService;
