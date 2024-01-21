import { z } from "zod";

export const createOrderDto = z.object({
  message: z.string(),
});

export type CreateOrderDto = z.infer<typeof createOrderDto>;

export const updateOrderDto = z.object({
  message: z.string(),
});

export type UpdateOrderDto = z.infer<typeof updateOrderDto>;
