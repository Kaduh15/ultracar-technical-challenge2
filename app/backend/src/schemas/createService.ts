import { z } from "zod";

export const ServiceCreateSchema = z.object({
  clientId: z.string(),
  contributorId: z.string(),
  parts: z
    .array(
      z.object({
        partId: z.string().uuid(),
        quantity: z.number().min(1),
      })
    )
    .transform((part) => {
      const partsItems: { partId: string }[] = [];
      part.forEach(({ partId, quantity }) => {
        for (let i = 0; i < quantity; i++) {
          partsItems.push({ partId });
        }
      });
      return partsItems;
    }),
});

export type ServiceCreateProps = z.infer<typeof ServiceCreateSchema>;
