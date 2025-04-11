import { Link } from "react-router";
import type { Product } from "~/types/product";

interface ProductItemProps {
  product: Product;
}

export function ProductItem({ product }: ProductItemProps) {
  return (
    <Link to={`/products/${product.slug}`}>
      <div className="max-w-[250px]">
        <img
          className="rounded-sm pb-2"
          src={product.imageUrl}
          alt={product.name}
          width={"250"}
        />
        <h2 className="pb-2 text-lg font-medium break-words">{product.name}</h2>
        <h3>Rp{product.price.toLocaleString("id-ID")}</h3>
      </div>
    </Link>
  );
}
