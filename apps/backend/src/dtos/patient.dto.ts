import { z } from "zod";

export const createPatientDto = z.object({
  name: z.string(),
});

export type CreatePatientDto = z.infer<typeof createPatientDto>;

export const updatePatientDto = z.object({
  name: z.string(),
});

export type UpdatePatientDto = z.infer<typeof updatePatientDto>;
