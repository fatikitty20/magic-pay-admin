import {
  FileCheck2,
  LayoutDashboard,
  Layers3,
  LogOut,
  Store,
  type LucideIcon,
  X,
} from "lucide-react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/features/auth";
import { ROUTE_PATHS } from "@/config/routePaths";
import { useDashboard } from "../../features/dashboard/hooks/useDashboard";
import type { DashboardMenuItem } from "../../features/dashboard/config/dashboardConfig";

type MenuItem = DashboardMenuItem & {
  icon?: LucideIcon;
};

type BarraLateralProps = {
  mode: "desktop" | "mobile";
  isOpen?: boolean;
  onClose?: () => void;
  onNavigate?: () => void;
  menuItems?: MenuItem[];
};

const iconByKey: Record<string, LucideIcon> = {
  dashboard: LayoutDashboard,
  settlements: FileCheck2,
  consolidations: Layers3,
};

export const BarraLateral = ({
  mode,
  isOpen = false,
  onClose,
  onNavigate,
  menuItems,
}: BarraLateralProps) => {
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const dashboardConfig = useDashboard();
  const elementosMenu: MenuItem[] = menuItems ?? dashboardConfig.menuItems;

  useEffect(() => {
    if (mode !== "mobile" || !isOpen) {
      return;
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose?.();
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen, mode, onClose]);

  const manejarCierreSesion = async () => {
    await signOut();
    navigate(ROUTE_PATHS.login, { replace: true });
    onClose?.();
  };

  const manejarNavegacion = (path?: string) => {
    if (!path) {
      return;
    }

    navigate(path);
    onNavigate?.();
  };

  const esRutaActiva = (path?: string) => {
    if (!path) {
      return false;
    }

    return path === ROUTE_PATHS.dashboard ? location.pathname === path : location.pathname.startsWith(path);
  };

  const contenidoSidebar = (
    <>
      <div className="mb-8 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary shadow-sm shadow-primary/25">
            <Store className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="min-w-0 max-w-40 text-sm font-semibold leading-tight text-foreground">
            {t("brand.dashboard")}
          </span>
        </div>
        {mode === "mobile" && (
          <button
            type="button"
            onClick={onClose}
            aria-label={t("sidebar.actions.close")}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition hover:bg-muted hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      <p className="mb-3 px-2 text-[10px] uppercase tracking-wider text-muted-foreground">
        {t("sidebar.menuLabel")}
      </p>

      <nav className="space-y-1">
        {elementosMenu.map((elemento) => {
          const Icon = elemento.icon ?? iconByKey[elemento.key] ?? LayoutDashboard;

          return (
            <button
              key={elemento.key}
              type="button"
              onClick={() => manejarNavegacion(elemento.path)}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition ${
                esRutaActiva(elemento.path)
                  ? "bg-primary font-semibold text-primary-foreground shadow-sm shadow-primary/20"
                  : "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              }`}
            >
              <Icon className="h-4 w-4" />
              <span className="flex-1 text-left">{t(elemento.label)}</span>
            </button>
          );
        })}
      </nav>

      <div className="mt-auto pt-6">
        <div className="mb-4 rounded-lg border border-border/70 bg-card/80 p-4">
          <p className="text-sm font-semibold text-foreground">{t("sidebar.adminCard.title")}</p>
          <p className="mt-1 text-xs leading-5 text-muted-foreground">
            {t("sidebar.adminCard.description")}
          </p>
        </div>
        <button
          type="button"
          onClick={manejarCierreSesion}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-muted-foreground transition hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
        >
          <LogOut className="h-4 w-4" />
          <span>{t("sidebar.logout")}</span>
        </button>
      </div>
    </>
  );

  if (mode === "desktop") {
    return (
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-sidebar-border/70 bg-sidebar p-5 lg:flex">
        {contenidoSidebar}
      </aside>
    );
  }

  return (
    <div className={`fixed inset-0 z-50 lg:hidden ${isOpen ? "pointer-events-auto" : "pointer-events-none"}`}>
      <button
        type="button"
        onClick={onClose}
        className={`absolute inset-0 bg-black/50 transition-opacity ${isOpen ? "opacity-100" : "opacity-0"}`}
      />

      <aside
        className={`relative flex h-full w-72 flex-col bg-sidebar p-5 transition-transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {contenidoSidebar}
      </aside>
    </div>
  );
};
