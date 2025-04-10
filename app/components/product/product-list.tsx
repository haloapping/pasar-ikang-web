import type { Product } from "~/types/product";
import { ProductItem } from "./product-item";

interface ProductListProps {
  products: Product[];
}

export function ProductList({ products }: ProductListProps) {
  return (
    <div className="flex gap-3">
      {products.map((product) => {
        return <ProductItem product={product} key={product.id} />;
      })}
    </div>
  );
}
