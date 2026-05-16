import { BadgeCheck, CircleAlert, FileSpreadsheet, Layers3 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { consolidationRecords, type ConsolidationStatus } from "../mockData";
import { claseTarjeta } from "@/shared/ui/estilosDashboard";

const statusClassName: Record<ConsolidationStatus, string> = {
  Conciliada: "bg-success/10 text-success",
  "Con diferencia": "bg-destructive/10 text-destructive",
  Pendiente: "bg-info/10 text-info",
};

const formatMoney = (amount: number, locale: string): string =>
  new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(amount / 100);

const ConsolidacionesView = () => {
  const { t, i18n } = useTranslation();
  const locale = i18n.resolvedLanguage === "es" ? "es-MX" : "en-US";
  const processedTotal = consolidationRecords.reduce((sum, record) => sum + record.processed, 0);
  const settledTotal = consolidationRecords.reduce((sum, record) => sum + record.settled, 0);
  const differenceTotal = consolidationRecords.reduce((sum, record) => sum + record.difference, 0);
  const readyCount = consolidationRecords.filter((record) => record.status === "Conciliada").length;

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-3xl font-bold text-foreground">{t("consolidations.title")}</h1>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
          {t("consolidations.description")}
        </p>
      </div>

      <section className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        <Metric icon={Layers3} label={t("consolidations.cards.processed")} value={formatMoney(processedTotal, locale)} tone="info" />
        <Metric icon={BadgeCheck} label={t("consolidations.cards.settled")} value={formatMoney(settledTotal, locale)} tone="success" />
        <Metric icon={CircleAlert} label={t("consolidations.cards.difference")} value={formatMoney(differenceTotal, locale)} tone="destructive" />
        <Metric icon={FileSpreadsheet} label={t("consolidations.cards.ready")} value={String(readyCount)} tone="muted" />
      </section>

      <section className={claseTarjeta("base", "overflow-hidden")}>
        <div className="border-b border-border/70 px-4 py-4 sm:px-5">
          <h2 className="text-base font-semibold text-foreground">{t("consolidations.table.title")}</h2>
          <p className="mt-1 text-sm text-muted-foreground">{t("consolidations.table.description")}</p>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-muted/40 text-xs uppercase text-muted-foreground">
              <tr>
                <th className="px-4 py-3 text-left font-semibold">{t("consolidations.table.headers.id")}</th>
                <th className="px-4 py-3 text-left font-semibold">{t("consolidations.table.headers.source")}</th>
                <th className="px-4 py-3 text-right font-semibold">{t("consolidations.table.headers.processed")}</th>
                <th className="px-4 py-3 text-right font-semibold">{t("consolidations.table.headers.settled")}</th>
                <th className="px-4 py-3 text-right font-semibold">{t("consolidations.table.headers.difference")}</th>
                <th className="px-4 py-3 text-right font-semibold">{t("consolidations.table.headers.records")}</th>
                <th className="px-4 py-3 text-left font-semibold">{t("consolidations.table.headers.status")}</th>
                <th className="px-4 py-3 text-left font-semibold">{t("consolidations.table.headers.updatedAt")}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/70">
              {consolidationRecords.map((record) => (
                <tr key={record.id} className="bg-card transition hover:bg-muted/20">
                  <td className="whitespace-nowrap px-4 py-3 font-mono text-xs text-foreground">{record.id}</td>
                  <td className="whitespace-nowrap px-4 py-3 font-semibold text-foreground">{record.source}</td>
                  <td className="whitespace-nowrap px-4 py-3 text-right text-muted-foreground">{formatMoney(record.processed, locale)}</td>
                  <td className="whitespace-nowrap px-4 py-3 text-right text-muted-foreground">{formatMoney(record.settled, locale)}</td>
                  <td className="whitespace-nowrap px-4 py-3 text-right font-semibold text-foreground">{formatMoney(record.difference, locale)}</td>
                  <td className="whitespace-nowrap px-4 py-3 text-right text-muted-foreground">{record.records.toLocaleString(locale)}</td>
                  <td className="whitespace-nowrap px-4 py-3">
                    <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${statusClassName[record.status]}`}>
                      {record.status}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-muted-foreground">{record.updatedAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

type MetricProps = {
  icon: typeof BadgeCheck;
  label: string;
  value: string;
  tone: "success" | "info" | "muted" | "destructive";
};

const metricToneClassName: Record<MetricProps["tone"], string> = {
  success: "bg-success/10 text-success",
  info: "bg-info/10 text-info",
  muted: "bg-secondary text-muted-foreground",
  destructive: "bg-destructive/10 text-destructive",
};

const Metric = ({ icon: Icon, label, value, tone }: MetricProps) => (
  <div className={claseTarjeta("base", "p-4 sm:p-5")}>
    <div className={`mb-4 flex h-10 w-10 items-center justify-center rounded-lg ${metricToneClassName[tone]}`}>
      <Icon className="h-5 w-5" />
    </div>
    <p className="text-xs font-semibold uppercase text-muted-foreground">{label}</p>
    <p className="mt-2 text-2xl font-bold text-foreground">{value}</p>
  </div>
);

export default ConsolidacionesView;
