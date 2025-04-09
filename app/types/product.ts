import { z } from "zod";

export const ProductSchema = z
  .object({
    id: z.string().ulid(),
    slug: z.string().min(1).nullable(),
    name: z.string().min(1),
    imageUrl: z.string().url(),
    price: z.number().min(0),
    unit: z.string(),
    description: z.string().min(1).nullable(),
    stock: z.number().min(0),
    sold: z.number().min(0),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
  })
  .strict();

export type Product = z.infer<typeof ProductSchema>;
