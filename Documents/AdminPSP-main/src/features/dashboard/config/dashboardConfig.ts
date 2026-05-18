import { ROUTE_PATHS } from "@/config/routePaths";
import { ROLES, type RolUsuario } from "@/features/auth/roles";

export type DashboardWidget =
  | "metrics"
  | "analytics"
  | "settlements"
  | "consolidations";

export type DashboardMenuLabel =
  | "sidebar.menu.dashboard"
  | "sidebar.menu.paymentIntents"
  | "sidebar.menu.rejectedTransactions"
  | "sidebar.menu.successfulPayments"
  | "sidebar.menu.refunds"
  | "sidebar.menu.settlements"
  | "sidebar.menu.consolidations"
  | "sidebar.menu.transactions";

export interface DashboardMenuItem {
  key: string;
  label: DashboardMenuLabel;
  path: string;
}

export interface DashboardConfig {
  role: RolUsuario;
  widgets: DashboardWidget[];
  menuItems: DashboardMenuItem[];
}

const widgetsAdmin: DashboardWidget[] = [
  "metrics",
  "analytics",
  "settlements",
  "consolidations",
];

const menuAdmin: DashboardMenuItem[] = [
  { key: "dashboard", label: "sidebar.menu.dashboard", path: ROUTE_PATHS.dashboard },
  { key: "payment-intents", label: "sidebar.menu.paymentIntents", path: ROUTE_PATHS.paymentIntents },
  { key: "rejected-transactions", label: "sidebar.menu.rejectedTransactions", path: ROUTE_PATHS.rejectedTransactions },
  { key: "successful-payments", label: "sidebar.menu.successfulPayments", path: ROUTE_PATHS.successfulPayments },
  { key: "refunds", label: "sidebar.menu.refunds", path: ROUTE_PATHS.refunds },
  { key: "settlements", label: "sidebar.menu.settlements", path: ROUTE_PATHS.settlements },
  { key: "consolidations", label: "sidebar.menu.consolidations", path: ROUTE_PATHS.consolidations },
  { key: "transactions", label: "sidebar.menu.transactions", path: ROUTE_PATHS.transactions },
];

const dashboardAdmin: DashboardConfig = {
  role: ROLES.ADMIN,
  widgets: widgetsAdmin,
  menuItems: menuAdmin,
};

export const obtenerConfigDashboard = (): DashboardConfig => dashboardAdmin;
