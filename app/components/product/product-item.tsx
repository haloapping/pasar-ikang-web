import { NavLink } from "react-router";
import type { Product } from "~/types/product";

interface ProductItemProps {
  product: Product;
}

export function ProductItem({ product }: ProductItemProps) {
  const baseImageKitUrl = process.env.BASE_IMAGEKIT_URL;
  return (
    <NavLink to={`/products/${product.slug}`}>
      <div>
        <img
          className="rounded-s-sm"
          src={`${baseImageKitUrl}/${product.imageUrl}`}
          alt={product.name}
          width={"300"}
        />
        <h2>{product.name}</h2>
        <h3>{product.price}</h3>
      </div>
    </NavLink>
  );
}
