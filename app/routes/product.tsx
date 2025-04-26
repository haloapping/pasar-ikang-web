import ProductSlug from "~/components/product/product-slug";
import type { Product } from "~/types/product";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Product | Pasar Ikang" },
    { name: "description", content: "Fresh seafood anytime, anywhere." },
  ];
}

export async function loader({ params }: Route.ActionArgs) {
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

export default function Product({ loaderData }: Route.ComponentProps) {
  const product = loaderData;

  return (
    <div className="mt-8">
      <ProductSlug product={product} />
    </div>
  );
}
