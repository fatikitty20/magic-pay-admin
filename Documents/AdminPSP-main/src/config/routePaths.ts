export const ROUTE_PATHS = {
  root: "/",
  login: "/login",
  dashboard: "/dashboard",
  paymentIntents: "/dashboard/payment-intents",
  rejectedTransactions: "/dashboard/rejected-transactions",
  successfulPayments: "/dashboard/successful-payments",
  refunds: "/dashboard/refunds",
  settlements: "/dashboard/liquidaciones",
  consolidations: "/dashboard/consolidaciones",
  transactions: "/transactions",
} as const;

export const PROTECTED_ROUTE_PATHS = {
  dashboard: "dashboard",
  paymentIntents: "dashboard/payment-intents",
  rejectedTransactions: "dashboard/rejected-transactions",
  successfulPayments: "dashboard/successful-payments",
  refunds: "dashboard/refunds",
  settlements: "dashboard/liquidaciones",
  consolidations: "dashboard/consolidaciones",
  transactions: "transactions",
} as const;
