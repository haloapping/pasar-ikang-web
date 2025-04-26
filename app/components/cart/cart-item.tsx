import type { CartItemType } from "~/types/cart";

interface CartItemProps {
  product: CartItemType;
}

export default function CartItem({ product }: CartItemProps) {
  return (
    <div className="flex flex-row gap-5">
      <img
        src={product.product.imageUrl}
        alt={product.product.name}
        width={200}
      />
      <div>
        <p>{product.product.name}</p>
        <p>{product.product.price.toLocaleString("id-ID")}</p>
        <div>
          <p>Quantity: {product.quantity}</p>
          <p>
            Subtotal: Rp
            {(product.product.price * product.quantity).toLocaleString("id-ID")}
          </p>
        </div>
      </div>
    </div>
  );
}
