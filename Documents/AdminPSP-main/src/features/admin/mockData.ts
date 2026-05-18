import type {
  DashboardHourlyPerformance,
  DashboardPulsePoint,
  DashboardStatusDistributionPoint,
} from "@/features/dashboard/types/dashboardCharts";
import type { DashboardKpis } from "@/features/dashboard/types/dashboardKpis";

export type AdminMetric = {
  id: string;
  title: string;
  value: string;
  helper: string;
  variant: "invertida" | "suave";
  detailPath?: string;
};

export type SettlementStatus = "Programada" | "En revision" | "Lista" | "Retenida";

export type SettlementRecord = {
  id: string;
  channel: string;
  period: string;
  amount: number;
  fees: number;
  netAmount: number;
  status: SettlementStatus;
  scheduledAt: string;
};

export type ConsolidationStatus = "Conciliada" | "Con diferencia" | "Pendiente";

export type ConsolidationRecord = {
  id: string;
  source: string;
  processed: number;
  settled: number;
  difference: number;
  records: number;
  status: ConsolidationStatus;
  updatedAt: string;
};

export type PaymentOperationStatus =
  | "LINK_CREATED"
  | "SUCCEEDED"
  | "REJECTED"
  | "REFUNDED"
  | "PENDING";

export type PaymentOperationRecord = {
  id: string;
  orderId: string;
  channel: string;
  description: string;
  method: string;
  status: PaymentOperationStatus;
  createdAt: string;
  amountMinorUnits: number;
  currency: "USD";
};

export const mockDashboardKpis: DashboardKpis = {
  fecha: "2026-05-15T15:00:00Z",
  totalIntentos: 18342,
  ventasExitosas: 17108,
  conversionRate: 93.27,
  gmvTotal: 128640000,
  ticketPromedio: 7520,
  currency: "USD",
};

export const mockStatusDistribution: DashboardStatusDistributionPoint[] = [
  { status: "SUCCEEDED", count: 17108 },
  { status: "LINK_CREATED", count: 1234 },
];

export const mockHourlyPerformance: DashboardHourlyPerformance[] = [
  { hour: 8, attempts: 860, successes: 796, salesVolume: 41680 },
  { hour: 10, attempts: 1420, successes: 1328, salesVolume: 69720 },
  { hour: 12, attempts: 2315, successes: 2189, salesVolume: 118900 },
  { hour: 14, attempts: 2680, successes: 2528, salesVolume: 136800 },
  { hour: 16, attempts: 2140, successes: 1996, salesVolume: 104780 },
  { hour: 18, attempts: 1760, successes: 1648, salesVolume: 87620 },
];

export const mockPulse: DashboardPulsePoint[] = [
  { hour: 8, transactionCount: 796, moneyVolume: 41680 },
  { hour: 10, transactionCount: 1328, moneyVolume: 69720 },
  { hour: 12, transactionCount: 2189, moneyVolume: 118900 },
  { hour: 14, transactionCount: 2528, moneyVolume: 136800 },
  { hour: 16, transactionCount: 1996, moneyVolume: 104780 },
  { hour: 18, transactionCount: 1648, moneyVolume: 87620 },
];

export const paymentIntentRecords: PaymentOperationRecord[] = [
  {
    id: "INT-2026-0515-001",
    orderId: "ORD-74510",
    channel: "Checkout web",
    description: "Link generado para cobro administrativo",
    method: "Link",
    status: "LINK_CREATED",
    createdAt: "2026-05-15 08:42",
    amountMinorUnits: 128500,
    currency: "USD",
  },
  {
    id: "INT-2026-0515-002",
    orderId: "ORD-74511",
    channel: "POS virtual",
    description: "Intento aprobado desde consola",
    method: "Card",
    status: "SUCCEEDED",
    createdAt: "2026-05-15 09:18",
    amountMinorUnits: 84200,
    currency: "USD",
  },
  {
    id: "INT-2026-0515-003",
    orderId: "ORD-74512",
    channel: "Link de pago",
    description: "Pendiente de confirmacion",
    method: "Link",
    status: "PENDING",
    createdAt: "2026-05-15 10:06",
    amountMinorUnits: 64000,
    currency: "USD",
  },
];

export const rejectedTransactionRecords: PaymentOperationRecord[] = [
  {
    id: "REJ-2026-0515-001",
    orderId: "ORD-74302",
    channel: "Checkout web",
    description: "Banco emisor rechazo la autorizacion",
    method: "Card",
    status: "REJECTED",
    createdAt: "2026-05-15 11:22",
    amountMinorUnits: 21500,
    currency: "USD",
  },
  {
    id: "REJ-2026-0515-002",
    orderId: "ORD-74344",
    channel: "POS virtual",
    description: "Validacion antifraude no aprobada",
    method: "Card",
    status: "REJECTED",
    createdAt: "2026-05-15 12:09",
    amountMinorUnits: 57900,
    currency: "USD",
  },
  {
    id: "REJ-2026-0515-003",
    orderId: "ORD-74388",
    channel: "Link de pago",
    description: "Tiempo de autenticacion agotado",
    method: "3DS",
    status: "REJECTED",
    createdAt: "2026-05-15 13:31",
    amountMinorUnits: 34000,
    currency: "USD",
  },
];

export const successfulPaymentRecords: PaymentOperationRecord[] = [
  {
    id: "PAY-2026-0515-001",
    orderId: "ORD-74210",
    channel: "Checkout web",
    description: "Pago procesado correctamente",
    method: "Card",
    status: "SUCCEEDED",
    createdAt: "2026-05-15 08:15",
    amountMinorUnits: 132000,
    currency: "USD",
  },
  {
    id: "PAY-2026-0515-002",
    orderId: "ORD-74248",
    channel: "POS virtual",
    description: "Pago aprobado en lote matutino",
    method: "Card",
    status: "SUCCEEDED",
    createdAt: "2026-05-15 09:47",
    amountMinorUnits: 284900,
    currency: "USD",
  },
  {
    id: "PAY-2026-0515-003",
    orderId: "ORD-74301",
    channel: "Link de pago",
    description: "Cobro completado desde link",
    method: "Link",
    status: "SUCCEEDED",
    createdAt: "2026-05-15 14:05",
    amountMinorUnits: 96500,
    currency: "USD",
  },
];

export const refundRecords: PaymentOperationRecord[] = [
  {
    id: "REF-2026-0515-001",
    orderId: "ORD-74112",
    channel: "Checkout web",
    description: "Devolucion total aprobada",
    method: "Refund",
    status: "REFUNDED",
    createdAt: "2026-05-15 10:40",
    amountMinorUnits: 48500,
    currency: "USD",
  },
  {
    id: "REF-2026-0515-002",
    orderId: "ORD-74176",
    channel: "POS virtual",
    description: "Devolucion parcial conciliada",
    method: "Refund",
    status: "REFUNDED",
    createdAt: "2026-05-15 12:55",
    amountMinorUnits: 26000,
    currency: "USD",
  },
];

export const transactionRecords: PaymentOperationRecord[] = [
  ...successfulPaymentRecords,
  ...paymentIntentRecords,
  ...rejectedTransactionRecords,
  ...refundRecords,
];

export const settlementRecords: SettlementRecord[] = [
  {
    id: "LIQ-2026-0515-01",
    channel: "Canal retail",
    period: "15 May 2026",
    amount: 428500,
    fees: 12426,
    netAmount: 416074,
    status: "Lista",
    scheduledAt: "2026-05-15 17:00",
  },
  {
    id: "LIQ-2026-0515-02",
    channel: "Canal food service",
    period: "15 May 2026",
    amount: 284900,
    fees: 8262,
    netAmount: 276638,
    status: "Programada",
    scheduledAt: "2026-05-15 18:30",
  },
  {
    id: "LIQ-2026-0515-03",
    channel: "Canal travel",
    period: "14 May 2026",
    amount: 198700,
    fees: 5762,
    netAmount: 192938,
    status: "En revision",
    scheduledAt: "2026-05-16 09:00",
  },
  {
    id: "LIQ-2026-0515-04",
    channel: "Canal digital",
    period: "14 May 2026",
    amount: 96500,
    fees: 2799,
    netAmount: 93701,
    status: "Retenida",
    scheduledAt: "Pendiente",
  },
];

export const consolidationRecords: ConsolidationRecord[] = [
  {
    id: "CON-ADQ-001",
    source: "Adquirente principal",
    processed: 842600,
    settled: 842600,
    difference: 0,
    records: 7920,
    status: "Conciliada",
    updatedAt: "2026-05-15 14:50",
  },
  {
    id: "CON-BNK-002",
    source: "Banco liquidador",
    processed: 386200,
    settled: 385940,
    difference: 260,
    records: 3184,
    status: "Con diferencia",
    updatedAt: "2026-05-15 14:35",
  },
  {
    id: "CON-WLT-003",
    source: "Wallets y links",
    processed: 176340,
    settled: 176340,
    difference: 0,
    records: 1242,
    status: "Conciliada",
    updatedAt: "2026-05-15 14:20",
  },
  {
    id: "CON-FLE-004",
    source: "Archivo cierre vespertino",
    processed: 91840,
    settled: 0,
    difference: 91840,
    records: 614,
    status: "Pendiente",
    updatedAt: "2026-05-15 13:10",
  },
];
