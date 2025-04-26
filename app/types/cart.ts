import { z } from "zod";
import { ProductSchema } from "./product";

export const CartItemSchema = z.object({
  id: z.string().ulid(),
  productId: z.string().ulid(),
  cartId: z.string().ulid(),
  quantity: z.number().min(1),
  createdAt: z.date(),
  updatedAt: z.date(),
  product: ProductSchema,
});

export const CartSchema = z.object({
  id: z.string().ulid(),
  userId: z.string().ulid(),
  createdAt: z.date(),
  updatedAt: z.date(),
  items: z.array(CartItemSchema),
});

export const AddToCartItemSchema = z.object({
  productId: z.string().ulid(),
  quantity: z.number().min(1),
});

export type CartItemType = z.infer<typeof CartItemSchema>;
export type CartType = z.infer<typeof CartSchema>;
export type AddToCartType = z.infer<typeof AddToCartItemSchema>;
