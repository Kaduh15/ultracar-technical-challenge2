import {
  DropdownController,
  InputNumberController,
} from "@/components/FormController";
import { useFieldArray, useForm } from "react-hook-form";
import { TClient, TContributor, TPart } from "@/types";
import { GetServerSideProps } from "next";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { getClientById } from "@/service/client";
import { addService, getContributors } from "@/service/contributor";
import { getParts } from "@/service/part";
import { selectOptions } from "@/utils/selectOptions";
import { Button } from "primereact/button";

interface HomeProps {
  client: TClient;
  contributors: TContributor[];
  parts: TPart[];
}

const FormPropsSchema = z.object({
  contributors: z.string().nonempty("Selecione um colaborador"),
  parts: z.array(
    z.object({
      partId: z.string().nonempty("Selecione uma peça"),
      quantity: z.number().min(1, "Quantidade deve ser maior que 0"),
    })
  ),
});

type FormProps = z.infer<typeof FormPropsSchema>;

export default function Home({ client, contributors, parts }: HomeProps) {
  const {
    control,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm<FormProps>({
    mode: "onChange",
    resolver: zodResolver(FormPropsSchema),
  });

  const priceTotal = watch("parts")?.reduce(
    (acc, part: { partId?: any; quantity?: any }) => {
      const { quantity } = part;
      const partPrice =
        parts.find((p) => Number(p.id) === part.partId)?.price ?? 0;
      return acc + quantity * partPrice;
    },
    0
  );

  const onSubmit = async (data: FormProps) => {
    const body = {
      client,
      parts: data.parts.map((part) => {
        const findPart = parts.find((p) => p.id === part.partId);
        return {
          partId: findPart?.id,
          quantity: part.quantity,
          name: findPart?.name,
        };
      }),
    };

    await addService(data.contributors, body);
  };

  const { fields, append } = useFieldArray({
    control,
    name: "parts",
  });

  const addPart = () => {
    append({
      partId: "",
      quantity: 0,
    });
  };

  const optionsContributors = selectOptions(contributors, ["id", "name"]);
  const optionsParts = selectOptions(parts, ["id", "name"]);

  return (
    <main className="flex h-screen flex-col items-center justify-evenly">
      <div className="flex flex-col items-center justify-center bg-blue-950 text-white w-56 h-36 rounded text-2xl">
        <h2>Client: {client.name}</h2>
        <p>
          Carro: {client.car.brand} {client.car.brand}
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-center items-center bg-blue-950 p-4 rounded-lg gap-4 w-4/5"
      >
        <DropdownController
          control={control}
          options={optionsContributors}
          nameControl={"contributors"}
          optionLabel="label"
          optionValue="value"
          className="w-4/6"
          placeholder="Selecione um colaborador"
        />
        <div className="flex flex-col gap-2 w-11/12">
          <Button
            className="flex justify-center"
            type="button"
            onClick={addPart}
            size="small"
            label="Adicionar Peças"
            severity="info"
          />

          {fields.map((field, index) => {
            return (
              <div key={field.id} className="flex">
                <DropdownController
                  control={control}
                  nameControl={`parts.${index}.partId`}
                  filter
                  options={optionsParts}
                  optionLabel="label"
                  optionValue="value"
                  placeholder="Selecione uma peça"
                  className="flex-1"
                />
                <InputNumberController
                  showButtons
                  control={control}
                  nameControl={`parts.${index}.quantity`}
                  className="flex"
                  color="green-900"
                />
              </div>
            );
          })}
          <p className="font-bold text-white">
            Price: <span>R${priceTotal}</span>
          </p>
        </div>
        <Button type="submit" size="small" disabled={!errors} severity="info">
          Iniciar Reparo
        </Button>
      </form>
    </main>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { clientId } = query;
  const client = await getClientById(clientId as string);
  const contributors = await getContributors();
  const parts = await getParts();

  return {
    props: {
      client,
      contributors,
      parts,
    },
  };
};
