import { ProductList } from "~/components/product/product-list";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Home | Pasar Ikang" },
    { name: "description", content: "Fresh seafood anytime, anywhere." },
  ];
}

export async function getAllProductsLoader({ params }: Route.LoaderArgs) {
  const baseUrl = process.env.BACKEND_API_URL || "";
  console.log(`${baseUrl}/products`);

  const response = await fetch(`${baseUrl}/products`);
  const products = await response.json();
  console.log(products);

  return products;
}

export function HydrateFallback() {
  return <div>Loading...</div>;
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const products = loaderData;

  return (
    <>
      <div>
        <h1 className="mb-2 text-center text-4xl">
          Fresh seafood anytime, anywhere
        </h1>
        <img className="rounded-md" src="banner.jpg" alt="Banner Image" />
      </div>
      <div className="mt-8">
        <div className="text-center text-2xl">All Seafoods</div>
        <ProductList products={products} />
      </div>
    </>
  );
}
