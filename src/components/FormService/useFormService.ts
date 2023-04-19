import { TClient, TContributor, TPart } from "@/types";
import { useFieldArray, useForm } from "react-hook-form";
import { FormProps, schemaFormService } from "./schemaFormService";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { selectOptions } from "@/utils/selectOptions";
import { api } from "@/service/api";

type useFormServiceProps = {
  client: TClient;
  parts: TPart[];
  contributors: TContributor[];
};

export const useFormService = ({
  client,
  parts,
  contributors,
}: useFormServiceProps) => {
  const router = useRouter();
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
    watch,
  } = useForm<FormProps>({
    resolver: zodResolver(schemaFormService),
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "parts",
  });

  const addPart = () => {
    append({
      partId: "",
      quantity: 1,
    });
  };

  const contributorId = watch("contributor");

  const onSubmit = async (data: FormProps) => {
    const bodyData = {
      contributorId: data.contributor,
      parts: data.parts,
      clientId: client.id,
    };

    const { status } = await api.post("/service/start", bodyData);
    if (status === 201) {
      router.push(`/service/contributor/${contributorId}`);
    }
  };

  const selectContributors = selectOptions(contributors, ["id", "name"]);
  const selectParts = selectOptions(parts, ["id", "name"]);

  return {
    addPart,
    control,
    errors,
    fields,
    handleSubmit,
    onSubmit,
    register,
    remove,
    selectContributors,
    selectParts,
  };
};
