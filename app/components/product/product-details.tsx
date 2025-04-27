import { Form } from "react-router";
import type { Product } from "~/types/product";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export default function ProductDetails({ product }: { product: Product }) {
  return (
    <div className="flex flex-row gap-10">
      <img
        src={product.imageUrl}
        alt={product.name}
        width={500}
        className="rounded-md"
      />
      <div>
        <h1 className="mt-3 mb-3 text-3xl">{product.name}</h1>
        <h2 className="mb-3 font-medium">
          Rp{product.price.toLocaleString("id-ID")}
        </h2>
        <p className="mb-3">Stock: {product.stock}</p>
        <p className="mb-3">{product.description}</p>
        <p>Quantity</p>

        <div>
          <Form method="post" className="flex gap-4">
            <input type="hidden" name="productId" defaultValue={product.id} />
            <Input
              type="number"
              name="quantity"
              className="max-w-20"
              min={1}
              max={product.stock}
              defaultValue={1}
            />
            <Button type="submit">Add to Cart</Button>
          </Form>
        </div>
      </div>
    </div>
  );
}
