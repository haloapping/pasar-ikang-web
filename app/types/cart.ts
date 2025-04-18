import { z } from "zod";
import { ProductSchema } from "./product";

export const CartItemSchema = ProductSchema.extend({
  quantity: z.number().min(1),
  isProcessed: z.boolean().optional(),
});

export type CartItemType = z.infer<typeof CartItemSchema>;
