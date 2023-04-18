import { TClient, TContributor, TPart } from "@/types";
import { useForm } from "react-hook-form";
import { FormProps, schemaFormService } from "./schemaFormService";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { api } from "@/service/api";

type useFormServiceProps = {
  client: TClient
  parts: TPart[]
  contributors: TContributor[]
}

const selectOption = (list: { id: number; name: string }[]) => {
  return list.map(({ id, name }) => {
    return { value: id, label: name };
  });
};

export const useFormService = ({client, parts, contributors}:useFormServiceProps) => {
  const router = useRouter();
  const {
    handleSubmit,
    formState: { errors },
    control,
    watch
  } = useForm<FormProps>({
    resolver: zodResolver(schemaFormService),
  });

  const contributorId = watch('contributor')

  const onSubmit = async (data: FormProps) => {
    const selectParts = parts.filter(({ id }) => data.parts.includes(id))

    const { status } = await api.post("/services", {
        contributorId: data.contributor,
        parts: selectParts,
        clientId: client.id
      }
    );
    if (status === 201) {
      router.push(`/service/contributor/${contributorId}`)
    }
  };

  const selectContributors = selectOption(contributors);
  const selectParts = selectOption(parts);

  return {
    onSubmit,
    handleSubmit,
    control,
    errors,
    selectContributors,
    selectParts
  }
}