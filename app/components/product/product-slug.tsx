import { MinusIcon, PlusIcon } from "lucide-react";
import { useState } from "react";
import { Form, redirect } from "react-router";
import { destroySession, getSession } from "~/session.server";
import type { AddToCartType } from "~/types/cart";
import type { Product } from "~/types/product";
import type { Route } from "../../routes/+types/product";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
interface ProductSlugProps {
  product: Product;
}

export async function loader({ params }: Route.LoaderArgs) {
  const response = await fetch(
    `${process.env.BACKEND_API_URL}/products/${params.slug}`,
  );
  const product: Product = await response.json();

  return product;
}

export async function action({ request }: Route.ActionArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  if (!session.has("token")) {
    return redirect("/login");
  }
  const token = session.get("token");

  const formData = await request.formData();

  const addCartItemData: AddToCartType = {
    productId: String(formData.get("productId")),
    quantity: Number(formData.get("quantity")),
  };

  const response = await fetch(`${process.env.BACKEND_API_URL}/cart/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(addCartItemData),
  });
  if (!response.ok) {
    session.flash("error", "Failed to add item to cart");
    return redirect("/login", {
      headers: { "Set-Cookie": await destroySession(session) },
    });
  }

  return redirect("/cart");
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
