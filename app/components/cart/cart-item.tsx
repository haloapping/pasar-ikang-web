import type { CartItemType } from "~/types/cart";

interface CartItemProps {
  cartItem: CartItemType;
}

export default function CartItem({ cartItem }: CartItemProps) {
  return (
    <div className="mb-3.5 flex flex-row gap-10">
      <img
        src={cartItem.product.imageUrl}
        alt={cartItem.product.name}
        width={200}
      />
      <div>
        <p>{cartItem.product.name}</p>
        <p>{cartItem.product.price.toLocaleString("id-ID")}</p>
        <div>
          <p>Quantity: {cartItem.quantity}</p>
          <p>
            Subtotal: Rp
            {(cartItem.product.price * cartItem.quantity).toLocaleString(
              "id-ID",
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
