import { useMemo } from "react";
import { useTranslation } from "react-i18next";

import { TarjetaMetrica } from "@/features/dashboard/components/MetricCard";
import { GmvTotalMetricCard } from "@/components/ui/GmvTotalMetricCard";
import {
  mockDashboardKpis,
  pspClientAccounts,
  settlementRecords,
  consolidationRecords,
} from "@/features/admin/mockData";
import { ROUTE_PATHS } from "@/config/routePaths";
import type { Metrica } from "@/features/dashboard/data";

const formatMoney = (amount: number, locale: string): string =>
  new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(amount / 100);

const formatNumber = (value: number, locale: string): string =>
  new Intl.NumberFormat(locale, { maximumFractionDigits: 0 }).format(value);

const formatPercent = (value: number, locale: string): string =>
  new Intl.NumberFormat(locale, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(value);

const DashboardView = () => {
  const { t, i18n } = useTranslation();
  const locale = i18n.resolvedLanguage === "es" ? "es-MX" : "en-US";
  const totalPendingSettlements = settlementRecords.filter((record) => record.status !== "Lista").length;
  const totalReadyConsolidations = consolidationRecords.filter((record) => record.status === "Conciliada").length;
  const activeClients = pspClientAccounts.filter((client) => client.status === "Activo").length;
  const metrics = useMemo<Metrica[]>(
    () => [
      {
        id: "gmv-total",
        etiqueta: t("dashboard.admin.metrics.gmv.title"),
        valor: formatMoney(mockDashboardKpis.gmvTotal ?? 0, locale),
        ayuda: t("dashboard.admin.metrics.gmv.helper"),
        variante: "invertida",
      },
      {
        id: "active-clients",
        etiqueta: t("dashboard.admin.metrics.activeClients.title"),
        valor: formatNumber(activeClients, locale),
        ayuda: t("dashboard.admin.metrics.activeClients.helper"),
        variante: "suave",
      },
      {
        id: "settlements",
        etiqueta: t("dashboard.admin.metrics.settlements.title"),
        valor: formatNumber(totalPendingSettlements, locale),
        ayuda: t("dashboard.admin.metrics.settlements.helper"),
        variante: "suave",
        detallePath: ROUTE_PATHS.settlements,
      },
      {
        id: "consolidations",
        etiqueta: t("dashboard.admin.metrics.consolidations.title"),
        valor: formatNumber(totalReadyConsolidations, locale),
        ayuda: t("dashboard.admin.metrics.consolidations.helper"),
        variante: "suave",
        detallePath: ROUTE_PATHS.consolidations,
      },
      {
        id: "conversion-rate",
        etiqueta: t("dashboard.admin.metrics.conversion.title"),
        valor: `${formatPercent(mockDashboardKpis.conversionRate ?? 0, locale)}%`,
        ayuda: t("dashboard.admin.metrics.conversion.helper"),
        variante: "suave",
      },
    ],
    [activeClients, locale, t, totalPendingSettlements, totalReadyConsolidations],
  );

  return (
    <div className="space-y-5">
      <h1 className="text-3xl font-bold text-foreground">
        {t("dashboard.admin.title")}
      </h1>

      <section className="grid grid-cols-1 items-stretch gap-3 md:grid-cols-2 xl:grid-cols-6">
        {metrics.map((metric) => {
          const wideMetric = metric.id === "gmv-total";
          const MetricCard = metric.id === "total-operations" || metric.id === "conversion-rate"
            ? GmvTotalMetricCard
            : TarjetaMetrica;

          return (
            <div
              key={metric.id}
              className={`h-full min-w-0 ${wideMetric ? "xl:col-span-2" : "xl:col-span-1"}`}
            >
              <MetricCard {...metric} />
            </div>
          );
        })}
      </section>
    </div>
  );
};

export default DashboardView;
