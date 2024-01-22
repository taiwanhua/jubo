import { z } from "zod";

export const createOrderDto = z.object({
  message: z.string(),
});

export type CreateOrderDto = z.infer<typeof createOrderDto>;

export const updateOrderDto = z.object({
  message: z.string(),
});

export type UpdateOrderDto = z.infer<typeof updateOrderDto>;

export const createPatientOrderDto = z.object({
  patientId: z.string(),
  message: z.string(),
});

export type CreatePatientOrderDto = z.infer<typeof createPatientOrderDto>;

export const findManyOrderArgsDto = z.object({
  ids: z.array(z.string()),
});

export type FindManyOrderArgsDto = z.infer<typeof findManyOrderArgsDto>;
