// route("products/:slug", "routes/product.tsx");
import ProductSlug from "~/components/product/product-slug";
import type { Route } from "./+types/home";

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

    return product.data;
  } catch (error) {
    return error;
  }
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const product = loaderData;

  return (
    <div className="mt-8">
      <ProductSlug product={product} />
    </div>
  );
}
