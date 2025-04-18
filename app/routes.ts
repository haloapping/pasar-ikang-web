import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  layout("layouts/layout.tsx", [
    index("routes/home.tsx"),
    route("products/search", "routes/search.tsx"),
    route("products/:slug", "routes/product.tsx"),
    route("carts", "routes/cart.tsx"),
  ]),
  route("register", "routes/auth/register.tsx"),
  route("login", "routes/auth/login.tsx"),
] satisfies RouteConfig;
