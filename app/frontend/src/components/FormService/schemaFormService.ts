import { z } from "zod";

export const schemaFormService = z.object({
  parts: z.array(
    z.object({
      partId: z.string(),
      quantity: z.number().min(1).default(1)
    })
  ),
  contributor: z.string().uuid(),
});

export type FormProps = z.infer<typeof schemaFormService>;
