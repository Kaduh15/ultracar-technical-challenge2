import { TClient, TContributor, TPart } from "@/types";
import { useFieldArray, useForm } from "react-hook-form";
import { FormProps, schemaFormService } from "./schemaFormService";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { api } from "@/service/api";

type useFormServiceProps = {
  client: TClient;
  parts: TPart[];
  contributors: TContributor[];
};

const selectOption = (list: { id: number; name: string }[]) => {
  return list.map(({ id, name }) => {
    return { value: id, label: name };
  });
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
    console.log("🚀 ~ file: useFormService.ts:57 ~ onSubmit ~ status:", status);
    if (status === 201) {
      router.push(`/service/contributor/${contributorId}`);
    }
  };

  const selectContributors = selectOption(contributors);
  const selectParts = selectOption(parts);

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
