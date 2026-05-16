export const ROUTE_PATHS = {
  root: "/",
  login: "/login",
  dashboard: "/dashboard",
  settlements: "/dashboard/liquidaciones",
  consolidations: "/dashboard/consolidaciones",
} as const;

export const PROTECTED_ROUTE_PATHS = {
  dashboard: "dashboard",
  settlements: "dashboard/liquidaciones",
  consolidations: "dashboard/consolidaciones",
} as const;
