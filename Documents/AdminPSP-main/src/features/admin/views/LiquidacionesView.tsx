import { CalendarClock, CheckCircle2, FileDown, ShieldAlert } from "lucide-react";
import { useTranslation } from "react-i18next";
import { settlementRecords, type SettlementStatus } from "../mockData";
import { claseTarjeta } from "@/shared/ui/estilosDashboard";

const statusClassName: Record<SettlementStatus, string> = {
  Lista: "bg-success/10 text-success",
  Programada: "bg-info/10 text-info",
  "En revision": "bg-secondary text-muted-foreground",
  Retenida: "bg-destructive/10 text-destructive",
};

const formatMoney = (amount: number, locale: string): string =>
  new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(amount / 100);

const LiquidacionesView = () => {
  const { t, i18n } = useTranslation();
  const locale = i18n.resolvedLanguage === "es" ? "es-MX" : "en-US";
  const readyAmount = settlementRecords
    .filter((record) => record.status === "Lista")
    .reduce((sum, record) => sum + record.netAmount, 0);
  const scheduledCount = settlementRecords.filter((record) => record.status === "Programada").length;
  const reviewCount = settlementRecords.filter((record) => record.status === "En revision").length;
  const retainedAmount = settlementRecords
    .filter((record) => record.status === "Retenida")
    .reduce((sum, record) => sum + record.netAmount, 0);

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-3xl font-bold text-foreground">{t("settlements.title")}</h1>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
          {t("settlements.description")}
        </p>
      </div>

      <section className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        <Metric icon={CheckCircle2} label={t("settlements.cards.ready")} value={formatMoney(readyAmount, locale)} tone="success" />
        <Metric icon={CalendarClock} label={t("settlements.cards.scheduled")} value={String(scheduledCount)} tone="info" />
        <Metric icon={ShieldAlert} label={t("settlements.cards.review")} value={String(reviewCount)} tone="muted" />
        <Metric icon={FileDown} label={t("settlements.cards.retained")} value={formatMoney(retainedAmount, locale)} tone="destructive" />
      </section>

      <section className={claseTarjeta("base", "overflow-hidden")}>
        <div className="border-b border-border/70 px-4 py-4 sm:px-5">
          <h2 className="text-base font-semibold text-foreground">{t("settlements.table.title")}</h2>
          <p className="mt-1 text-sm text-muted-foreground">{t("settlements.table.description")}</p>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-muted/40 text-xs uppercase text-muted-foreground">
              <tr>
                <th className="px-4 py-3 text-left font-semibold">{t("settlements.table.headers.id")}</th>
                <th className="px-4 py-3 text-left font-semibold">{t("settlements.table.headers.merchant")}</th>
                <th className="px-4 py-3 text-left font-semibold">{t("settlements.table.headers.period")}</th>
                <th className="px-4 py-3 text-right font-semibold">{t("settlements.table.headers.amount")}</th>
                <th className="px-4 py-3 text-right font-semibold">{t("settlements.table.headers.fees")}</th>
                <th className="px-4 py-3 text-right font-semibold">{t("settlements.table.headers.net")}</th>
                <th className="px-4 py-3 text-left font-semibold">{t("settlements.table.headers.status")}</th>
                <th className="px-4 py-3 text-left font-semibold">{t("settlements.table.headers.scheduledAt")}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/70">
              {settlementRecords.map((record) => (
                <tr key={record.id} className="bg-card transition hover:bg-muted/20">
                  <td className="whitespace-nowrap px-4 py-3 font-mono text-xs text-foreground">{record.id}</td>
                  <td className="whitespace-nowrap px-4 py-3 font-semibold text-foreground">{record.merchant}</td>
                  <td className="whitespace-nowrap px-4 py-3 text-muted-foreground">{record.period}</td>
                  <td className="whitespace-nowrap px-4 py-3 text-right text-muted-foreground">{formatMoney(record.amount, locale)}</td>
                  <td className="whitespace-nowrap px-4 py-3 text-right text-muted-foreground">{formatMoney(record.fees, locale)}</td>
                  <td className="whitespace-nowrap px-4 py-3 text-right font-semibold text-foreground">{formatMoney(record.netAmount, locale)}</td>
                  <td className="whitespace-nowrap px-4 py-3">
                    <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${statusClassName[record.status]}`}>
                      {record.status}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-muted-foreground">{record.scheduledAt}</td>
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
  icon: typeof CheckCircle2;
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

export default LiquidacionesView;
