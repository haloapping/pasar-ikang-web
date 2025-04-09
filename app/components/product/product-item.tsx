import { NavLink } from "react-router";
import type { Product } from "~/types/product";

interface ProductItemProps {
  product: Product;
}

export function ProductItem({ product }: ProductItemProps) {
  return (
    <NavLink to={`/products/${product.slug}`}>
      <div>
        <img
          className="rounded-sm"
          src={product.imageUrl}
          alt={product.name}
          width={"500"}
        />
        <h2 className="pb-2">{product.name}</h2>
        <h3>Rp{product.price.toLocaleString("id-ID")}</h3>
      </div>
    </NavLink>
  );
}
