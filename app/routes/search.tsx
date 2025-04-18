import { ProductList } from "~/components/product/product-list";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Search | Pasar Ikang" },
    { name: "description", content: "Fresh seafood anytime, anywhere." },
  ];
}

export async function loader({ request }: Route.LoaderArgs) {
  const baseUrl = process.env.BACKEND_API_URL || "";
  const url = new URL(request.url);
  const keyword = url.searchParams.get("keyword") || "";

  try {
    const response = await fetch(
      `${baseUrl}/products/search?keyword=${keyword}`,
    );
    const products = await response.json();

    return products.data;
  } catch (error) {
    return error;
  }
}

export default function Search({ loaderData }: Route.ComponentProps) {
  const products = loaderData;

  return (
    <div className="mt-8">
      <div className="mb-5 text-left text-2xl">
        {products.length} products is found
      </div>
      <ProductList products={products} />
    </div>
  );
}
