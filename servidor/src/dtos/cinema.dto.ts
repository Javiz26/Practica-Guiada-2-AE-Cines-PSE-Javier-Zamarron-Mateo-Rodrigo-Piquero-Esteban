import { z } from 'zod';

export const CinemaFilterSchema = z.object({
  id: z.number().int().optional(),
  withCatalog: z.boolean().optional(),
  withMovie: z.number().int().optional(),
  byMovies: z.array(z.number().int()).optional(),
  sessionBefore: z.coerce.date().optional(),
  sessionAfter: z.coerce.date().optional(),
});

export type CinemaFilterDTO = z.infer<typeof CinemaFilterSchema>;