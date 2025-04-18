import type { CartItemType } from "~/types/cart";

interface CartItemProps {
  product: CartItemType;
}

export default function CartItem({ product }: CartItemProps) {
  return (
    <div className="flex flex-row gap-5">
      <img src={product.imageUrl} alt={product.name} width={200} />
      <div>
        <p>{product.name}</p>
        <p>{product.price.toLocaleString("id-ID")}</p>
        <div>
          <p>Quantity: {product.quantity}</p>
          <p>
            Subtotal: Rp
            {(product.price * product.quantity).toLocaleString("id-ID")}
          </p>
        </div>
      </div>
    </div>
  );
}
