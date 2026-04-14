import { z } from 'zod';

export const MovieFilterSchema = z.object({
  id: z.number().int().optional(),
  cast: z.array(z.string()).optional(),
  sessionBefore: z.coerce.date().optional(),
  sessionAfter: z.coerce.date().optional(),
});

export type MovieFilterDTO = z.infer<typeof MovieFilterSchema>;