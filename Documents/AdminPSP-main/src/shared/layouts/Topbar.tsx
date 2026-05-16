import { Menu, X } from "lucide-react";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { ROUTE_PATHS } from "@/config/routePaths";
import { BotonTema } from "../../features/theme";
import { SelectorIdioma } from "../../features/i18n/components/SelectorIdioma";
import { useAuth } from "../../features/auth";
import { claseBotonIcono } from "../ui/estilosDashboard";

type BarraSuperiorProps = {
  isSidebarOpen: boolean;
  onMenuClick: () => void;
};

export const BarraSuperior = ({ isSidebarOpen, onMenuClick }: BarraSuperiorProps) => {
  const { t } = useTranslation();
  const location = useLocation();
  const { user } = useAuth();
  const pageTitle = useMemo(() => {
    if (location.pathname.startsWith(ROUTE_PATHS.settlements)) {
      return t("topbar.pages.settlements");
    }

    if (location.pathname.startsWith(ROUTE_PATHS.consolidations)) {
      return t("topbar.pages.consolidations");
    }

    return t("topbar.pages.dashboard");
  }, [location.pathname, t]);
  const userName = user?.correo?.split("@")[0] ?? t("topbar.userFallback");

  return (
    <header className="m-3 flex flex-wrap items-center gap-4 rounded-lg border border-border/60 bg-card px-4 py-4 shadow-[0_14px_34px_hsl(var(--foreground)/0.05)] lg:m-4 lg:px-6">
      <button
        type="button"
        onClick={onMenuClick}
        aria-controls="dashboard-sidebar-mobile"
        aria-expanded={isSidebarOpen}
        aria-label={isSidebarOpen ? t("topbar.actions.closeSidebar") : t("topbar.actions.openSidebar")}
        className={claseBotonIcono("h-10 w-10 bg-muted lg:hidden")}
      >
        {isSidebarOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
      </button>

      <div className="min-w-0 flex-1">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          {t("topbar.eyebrow")}
        </p>
        <h1 className="truncate text-lg font-bold text-foreground">{pageTitle}</h1>
      </div>

      <SelectorIdioma className="hidden sm:inline-flex" />
      <BotonTema />

      <div className="flex items-center gap-3 border-l border-border/70 pl-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-sm font-bold text-primary-foreground">
          {userName.charAt(0).toUpperCase()}
        </div>
        <div className="text-right">
          <p className="text-sm font-medium text-foreground">{userName}</p>
          <p className="text-[11px] text-muted-foreground">{t("topbar.admin.role")}</p>
        </div>
      </div>
    </header>
  );
};
