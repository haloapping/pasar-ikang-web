import { MinusIcon, PlusIcon } from "lucide-react";
import { useState } from "react";
import { Form } from "react-router";
import type { Product } from "~/types/product";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
interface ProductSlugProps {
  product: Product;
}

export default function ProductSlug({ product }: ProductSlugProps) {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="flex flex-row gap-10">
      <img
        src={product?.imageUrl}
        alt={product?.name}
        width={500}
        className="rounded-md"
      />
      <div>
        <h1 className="mt-3 mb-3 text-3xl">{product?.name}</h1>
        <h2 className="mb-3 font-medium">
          Rp{product?.price.toLocaleString("id-ID")}
        </h2>
        <p className="mb-3">Stock: {product?.stock}</p>
        <p className="mb-3">{product?.description}</p>
        <p>Quantity</p>
        <div className="mb-3 flex items-center gap-2">
          <Button
            variant="outline"
            onClick={() => {
              setQuantity(quantity > 1 ? quantity - 1 : 1);
            }}
          >
            <MinusIcon />
          </Button>
          <span>{quantity}</span>
          <Button
            variant="outline"
            onClick={() => {
              setQuantity(
                quantity < product?.stock ? quantity + 1 : product?.stock,
              );
            }}
          >
            <PlusIcon />
          </Button>
        </div>

        <div>
          <Form method="post" className="flex gap-4">
            <input type="hidden" name="productId" defaultValue={product?.id} />
            <Input
              type="number"
              name="quantity"
              className="max-w-20"
              min={1}
              max={100}
              defaultValue={1}
            />
            <Button type="submit">Add to Cart</Button>
          </Form>
        </div>
      </div>
    </div>
  );
}
