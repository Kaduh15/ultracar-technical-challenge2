import { z } from "zod";

export const schemaFormService = z.object({
  parts: z.union([
    z.array(
      z.number()
    ),
    z.undefined(),
  ]).transform((data) => data ? data : []),
  contributor: z.number(),
});

export type FormProps = z.infer<typeof schemaFormService>;
