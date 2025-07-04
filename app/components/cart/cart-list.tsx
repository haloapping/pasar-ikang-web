import type { CartType } from "~/types/cart";
import { Button } from "../ui/button";
import CartItem from "./cart-item";

interface CardListProps {
  cart: CartType;
}

export default function CartList({ cart }: CardListProps) {
  return (
    <>
      <h1 className="mb-5 text-4xl">Shopping Cart</h1>

      <div className="flex">
        <div className="mb-5">
          {cart.items.map((item) => {
            return <CartItem cartItem={item} key={item.id} />;
          })}
        </div>

        <div className="ml-[200px]">
          <div>
            <h2>Order Summary | 2 Item(s)</h2>
            <h3>Item(s) subtotal Rp...</h3>
            <h4>Order Total</h4>
          </div>

          <div className="flex gap-3">
            <Button>Checkout</Button>
            <Button>Continue Shopping</Button>
          </div>
        </div>
      </div>
    </>
  );
}
