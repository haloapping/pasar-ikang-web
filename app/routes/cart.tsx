import CartList from "~/components/cart/cart-list";
import type { Route } from "./+types/home";
import { destroySession, getSession } from "~/session.server";
import { redirect } from "react-router";
import type { CartType } from "~/types/cart";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Cart | Pasar Ikang" },
    { name: "description", content: "Fresh seafood anytime, anywhere." },
  ];
}

export async function loader({ request }: Route.LoaderArgs) {
  try {
    const baseUrl = process.env.BACKEND_API_URL || "";

    const session = await getSession(request.headers.get("Cookie"));
    if (!session.has("token")) {
      return redirect("/login");
    }

    const token = session.get("token");

    const response = await fetch(`${baseUrl}/cart`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      return redirect("/login", {
        headers: { "Set-Cookie": await destroySession(session) },
      });
    }

    const cart: CartType = await response.json();

    return cart;
  } catch (error) {
    return error;
  }
}

export default function Cart({ loaderData }: Route.ComponentProps) {
  const cart = loaderData;

  return (
    <>
      <CartList cart={cart} />
    </>
  );
}
