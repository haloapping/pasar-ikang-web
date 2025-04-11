import type { Product } from "~/types/product";
import { Button } from "../ui/button";
import { MinusIcon, PlusIcon } from "lucide-react";

interface ProductSlugProps {
  product: Product;
}
export default function ProductSlug({ product }: ProductSlugProps) {
  return (
    <div className="flex flex-row gap-10">
      <img
        src={product.imageUrl}
        alt={product.name}
        width={500}
        className="rounded-md"
      />
      <div>
        <h1 className="mt-3 mb-3 text-3xl">{product.name}</h1>
        <h2 className="mb-3 font-medium">
          Rp{product.price.toLocaleString("id-ID")}
        </h2>
        <p className="mb-3">Stock: {product.stock}</p>
        <p className="mb-3">{product.description}</p>
        <p>Quantity</p>
        <div className="mb-3 flex items-center gap-2">
          <Button variant="outline">
            <MinusIcon />
          </Button>
          <span>1</span>
          <Button variant="outline">
            <PlusIcon />
          </Button>
        </div>

        <Button>Add To Cart</Button>
      </div>
    </div>
  );
}
