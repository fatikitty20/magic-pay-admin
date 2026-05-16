import { ROUTE_PATHS } from "@/config/routePaths";
import { ROLES, type RolUsuario } from "@/features/auth/roles";

export type DashboardWidget =
  | "metrics"
  | "analytics"
  | "settlements"
  | "consolidations";

export type DashboardMenuLabel =
  | "sidebar.menu.dashboard"
  | "sidebar.menu.settlements"
  | "sidebar.menu.consolidations";

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
  { key: "settlements", label: "sidebar.menu.settlements", path: ROUTE_PATHS.settlements },
  { key: "consolidations", label: "sidebar.menu.consolidations", path: ROUTE_PATHS.consolidations },
];

const dashboardAdmin: DashboardConfig = {
  role: ROLES.ADMIN,
  widgets: widgetsAdmin,
  menuItems: menuAdmin,
};

export const obtenerConfigDashboard = (): DashboardConfig => dashboardAdmin;
