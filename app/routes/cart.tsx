import CartList from "~/components/cart/cart-list";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Cart | Pasar Ikang" },
    { name: "description", content: "Fresh seafood anytime, anywhere." },
  ];
}

export async function loader({}: Route.LoaderArgs) {
  const baseUrl = process.env.BACKEND_API_URL || "";

  try {
    const response = await fetch(
      `${baseUrl}/carts/${"01JRTMQHV4S5J5Q0AF5X6J1KTM"}`,
    );
    const cartProducts = await response.json();

    console.dir(cartProducts, { depth: null });
    return cartProducts.data;
  } catch (error) {
    return error;
  }
}

export default function Cart({ loaderData }: Route.ComponentProps) {
  const cartProducts = loaderData;

  return (
    <>
      <CartList products={cartProducts} />
    </>
  );
}
