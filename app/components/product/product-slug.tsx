// route("products/:slug", "./product-slug.tsx");
import { MinusIcon, PlusIcon } from "lucide-react";
import { useState } from "react";
import type { Product } from "~/types/product";
import { Button } from "../ui/button";
interface ProductSlugProps {
  product: Product;
}

async function addToCart(userId: string, productId: string, quantity: number) {
  const baseUrl = process.env.BACKEND_API_URL || "";

  try {
    const response = await fetch(`${baseUrl}/carts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: userId,
        productId: productId,
        quantity: quantity,
      }),
    });

    const products = await response.json();

    return products.data;
  } catch (error) {
    return error;
  }
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

        <Button
          onClick={() =>
            addToCart("01JRTMQHV4S5J5Q0AF5X6J1KTM", product.id, quantity)
          }
        >
          Add To Cart
        </Button>
      </div>
    </div>
  );
}
