import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  layout("components/layout.tsx", [
    index("routes/home.tsx"),
    route("products/search", "routes/search.tsx"),
    route("products/:slug", "routes/product.tsx"),
  ]),
] satisfies RouteConfig;
