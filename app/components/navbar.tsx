import { Form, NavLink } from "react-router";

export function Navbar() {
  return (
    <nav className="mt-8 mb-5 flex items-center justify-between">
      <NavLink
        to={"/"}
        className="alig flex items-center justify-between gap-4"
      >
        <img src="pasar-ikang-logo.svg" alt="Pasar Ikang Logo" />
        <span>Pasar Ikang</span>
      </NavLink>

      <div className="flex items-center justify-between gap-4">
        <Form
          className="rounded-md border-2"
          action="/products/search"
          method="get"
        >
          <input
            className="px-1.5 py-1"
            id="keyword"
            name="keyword"
            type="text"
            placeholder="ikan tongkol segar"
          />
        </Form>
        <NavLink to={"/account"}>
          <img src="user.svg" alt="User Icon" />
        </NavLink>
        <NavLink to={"/carts"}>
          <img src="cart.svg" alt="Shopping Cart Icon" />
        </NavLink>
      </div>
    </nav>
  );
}
