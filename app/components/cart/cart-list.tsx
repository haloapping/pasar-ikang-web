import type { CartItemType } from "~/types/cart";
import { Button } from "../ui/button";
import CartItem from "./cart-item";

interface CardListProps {
  products: CartItemType[];
}

export default function CartList({ products }: CardListProps) {
  return (
    <>
      <h1 className="mb-5 text-4xl">Shopping Cart</h1>

      <div className="flex">
        <div className="mb-5">
          {products.map((product) => {
            return <CartItem product={product} key={product.id} />;
          })}
        </div>

        <div>
          <div>
            <h2>Order Summary | 2 Item(s)</h2>
            <h3>Item(s) subtotal Rp...</h3>
            <h4>Order Total</h4>
          </div>

          <Button>Checkout</Button>
          <Button>Continue Shopping</Button>
        </div>
      </div>
    </>
  );
}
