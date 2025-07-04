import { redirect } from "react-router";
import ProductDetails from "~/components/product/product-details";
import { destroySession, getSession } from "~/session.server";
import type { Product } from "~/types/product";
import type { Route } from "./+types/home";
import type { AddToCartType } from "~/types/cart";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Product | Pasar Ikang" },
    { name: "description", content: "Fresh seafood anytime, anywhere." },
  ];
}

export async function loader({ params }: Route.LoaderArgs) {
  const baseUrl = process.env.BACKEND_API_URL || "";
  const slug = params.slug;

  try {
    const response = await fetch(`${baseUrl}/products/${slug}`);
    const product = await response.json();

    return product.data as Product;
  } catch (error) {
    return error;
  }
}

export async function action({ request }: Route.ActionArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  if (!session.has("token")) return redirect("/login");
  const token = session.get("token");

  const formData = await request.formData();

  const addCartItemData: AddToCartType = {
    productId: String(formData.get("productId")),
    quantity: Number(formData.get("quantity")),
  };

  console.log({ token, addCartItemData });

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

export default function ProductRoute({ loaderData }: Route.ComponentProps) {
  const product = loaderData;

  return (
    <div className="mt-8">
      {product && <ProductDetails product={product} />}
      {/* <pre>{JSON.stringify(product, null, 2)}</pre> */}
    </div>
  );
}
