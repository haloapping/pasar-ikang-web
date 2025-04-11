import type { Product } from "~/types/product";
import { ProductItem } from "./product-item";

interface ProductListProps {
  products: Product[];
}

export function ProductList({ products }: ProductListProps) {
  if (products.length === 0) {
    return <p className="text-center text-2xl">Produt is not found...</p>;
  }

  return (
    <div className="flex flex-wrap justify-center gap-3">
      {products.map((product) => {
        return <ProductItem product={product} key={product.id} />;
      })}
    </div>
  );
}
