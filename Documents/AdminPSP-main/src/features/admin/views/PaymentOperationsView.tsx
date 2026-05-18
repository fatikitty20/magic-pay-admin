import { ArrowLeft, Download } from "lucide-react";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { ROUTE_PATHS } from "@/config/routePaths";
import { GmvTotalMetricCard } from "@/components/ui/GmvTotalMetricCard";
import { StatusPill } from "@/components/ui/StatusPill";
import type { LlaveTraduccion } from "@/features/dashboard/data";
import { claseTarjeta } from "@/shared/ui/estilosDashboard";
import { downloadCsv } from "@/shared/utils/csvDownload";
import {
  paymentIntentRecords,
  refundRecords,
  rejectedTransactionRecords,
  successfulPaymentRecords,
  transactionRecords,
  type PaymentOperationRecord,
  type PaymentOperationStatus,
} from "../mockData";

type OperationViewType =
  | "paymentIntents"
  | "rejectedTransactions"
  | "successfulPayments"
  | "refunds"
  | "transactions";

type OperationViewConfig = {
  titleKey: LlaveTraduccion;
  descriptionKey: LlaveTraduccion;
  records: PaymentOperationRecord[];
  filename: string;
  amountValueClassName?: string;
};

const viewConfig: Record<OperationViewType, OperationViewConfig> = {
  paymentIntents: {
    titleKey: "operationViews.paymentIntents.title",
    descriptionKey: "operationViews.paymentIntents.description",
    records: paymentIntentRecords,
    filename: "payment-intents-mock.csv",
  },
  rejectedTransactions: {
    titleKey: "operationViews.rejectedTransactions.title",
    descriptionKey: "operationViews.rejectedTransactions.description",
    records: rejectedTransactionRecords,
    filename: "rejected-transactions-mock.csv",
    amountValueClassName: "text-destructive",
  },
  successfulPayments: {
    titleKey: "operationViews.successfulPayments.title",
    descriptionKey: "operationViews.successfulPayments.description",
    records: successfulPaymentRecords,
    filename: "successful-payments-mock.csv",
  },
  refunds: {
    titleKey: "operationViews.refunds.title",
    descriptionKey: "operationViews.refunds.description",
    records: refundRecords,
    filename: "refunds-mock.csv",
  },
  transactions: {
    titleKey: "operationViews.transactions.title",
    descriptionKey: "operationViews.transactions.description",
    records: transactionRecords,
    filename: "transactions-mock.csv",
  },
};

const formatMoney = (amount: number, locale: string): string =>
  new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(amount / 100);

const formatNumber = (value: number, locale: string): string =>
  new Intl.NumberFormat(locale, { maximumFractionDigits: 0 }).format(value);

const statusTone: Record<PaymentOperationStatus, "info" | "success" | "destructive" | "muted" | "warning"> = {
  LINK_CREATED: "info",
  SUCCEEDED: "success",
  REJECTED: "destructive",
  REFUNDED: "success",
  PENDING: "warning",
};

type PaymentOperationsViewProps = {
  type: OperationViewType;
};

export const PaymentOperationsView = ({ type }: PaymentOperationsViewProps) => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const locale = i18n.resolvedLanguage === "es" ? "es-MX" : "en-US";
  const config = viewConfig[type];
  const totalAmount = useMemo(
    () => config.records.reduce((sum, record) => sum + record.amountMinorUnits, 0),
    [config.records],
  );

  const translateStatus = (status: PaymentOperationStatus): string =>
    t(`operationViews.status.${status}`);

  const handleDownloadCsv = () => {
    downloadCsv(
      [
        [
          "#",
          t("operationViews.table.id"),
          t("operationViews.table.orderId"),
          t("operationViews.table.channel"),
          t("operationViews.table.description"),
          t("operationViews.table.method"),
          t("operationViews.table.status"),
          t("operationViews.table.createdAt"),
          t("operationViews.table.amount"),
        ],
        ...config.records.map((record, index) => [
          index + 1,
          record.id,
          record.orderId,
          record.channel,
          record.description,
          record.method,
          translateStatus(record.status),
          record.createdAt,
          formatMoney(record.amountMinorUnits, locale),
        ]),
      ],
      config.filename,
    );
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <button
            type="button"
            onClick={() => navigate(ROUTE_PATHS.dashboard)}
            className="mb-3 inline-flex items-center gap-2 rounded-full text-sm font-medium text-muted-foreground transition hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            {t("operationViews.back")}
          </button>
          <h1 className="text-3xl font-bold text-foreground">{t(config.titleKey)}</h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
            {t(config.descriptionKey)}
          </p>
        </div>
      </div>

      <section className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <GmvTotalMetricCard
          id={`${type}-records`}
          etiqueta={t("operationViews.cards.records.title")}
          valor={formatNumber(config.records.length, locale)}
          ayuda={t("operationViews.cards.records.helper")}
          variante="invertida"
        />
        <GmvTotalMetricCard
          id={`${type}-amount`}
          etiqueta={t("operationViews.cards.amount.title")}
          valor={formatMoney(totalAmount, locale)}
          ayuda={t("operationViews.cards.amount.helper")}
          variante="suave"
          valueClassName={config.amountValueClassName}
        />
      </section>

      <section className={claseTarjeta("base", "overflow-hidden")}>
        <div className="border-b border-border/70 px-4 py-4 sm:px-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-base font-semibold text-foreground">{t("operationViews.table.title")}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{t("operationViews.table.description")}</p>
            </div>
            <button
              type="button"
              onClick={handleDownloadCsv}
              className="inline-flex h-9 items-center gap-2 rounded-md border border-border bg-background px-3 text-xs font-semibold text-foreground transition hover:bg-secondary"
            >
              <Download className="h-3.5 w-3.5" />
              {t("common.actions.downloadCsv")}
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-muted/40 text-xs uppercase text-muted-foreground">
              <tr>
                <th className="w-14 px-4 py-3 text-left font-semibold">#</th>
                <th className="px-4 py-3 text-left font-semibold">{t("operationViews.table.id")}</th>
                <th className="px-4 py-3 text-left font-semibold">{t("operationViews.table.orderId")}</th>
                <th className="px-4 py-3 text-left font-semibold">{t("operationViews.table.channel")}</th>
                <th className="px-4 py-3 text-left font-semibold">{t("operationViews.table.description")}</th>
                <th className="px-4 py-3 text-left font-semibold">{t("operationViews.table.method")}</th>
                <th className="px-4 py-3 text-left font-semibold">{t("operationViews.table.status")}</th>
                <th className="px-4 py-3 text-left font-semibold">{t("operationViews.table.createdAt")}</th>
                <th className="px-4 py-3 text-right font-semibold">{t("operationViews.table.amount")}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/70">
              {config.records.map((record, index) => (
                <tr key={record.id} className="bg-card transition hover:bg-muted/20">
                  <td className="px-4 py-3 font-medium tabular-nums text-muted-foreground">{index + 1}</td>
                  <td className="whitespace-nowrap px-4 py-3 font-mono text-xs text-foreground">{record.id}</td>
                  <td className="whitespace-nowrap px-4 py-3 text-muted-foreground">{record.orderId}</td>
                  <td className="whitespace-nowrap px-4 py-3 font-semibold text-foreground">{record.channel}</td>
                  <td className="min-w-56 px-4 py-3 text-muted-foreground">{record.description}</td>
                  <td className="whitespace-nowrap px-4 py-3 text-muted-foreground">{record.method}</td>
                  <td className="whitespace-nowrap px-4 py-3">
                    <StatusPill tone={statusTone[record.status]}>
                      {translateStatus(record.status)}
                    </StatusPill>
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-muted-foreground">{record.createdAt}</td>
                  <td className="whitespace-nowrap px-4 py-3 text-right font-semibold text-foreground">
                    {formatMoney(record.amountMinorUnits, locale)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};
