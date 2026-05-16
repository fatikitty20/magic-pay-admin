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
  merchant: string;
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

export type PspClientStatus = "Activo" | "Revision" | "Onboarding";

export type PspClientAccount = {
  id: string;
  name: string;
  segment: string;
  monthlyVolume: number;
  transactions: number;
  approvalRate: number;
  riskScore: string;
  status: PspClientStatus;
  lastClose: string;
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

export const pspClientAccounts: PspClientAccount[] = [
  {
    id: "CLI-PSP-001",
    name: "Nova Retail Group",
    segment: "Retail",
    monthlyVolume: 48620000,
    transactions: 6420,
    approvalRate: 94.8,
    riskScore: "Bajo",
    status: "Activo",
    lastClose: "2026-05-15 14:00",
  },
  {
    id: "CLI-PSP-002",
    name: "Andes Travel Hub",
    segment: "Travel",
    monthlyVolume: 32870000,
    transactions: 2810,
    approvalRate: 91.4,
    riskScore: "Medio",
    status: "Revision",
    lastClose: "2026-05-15 13:30",
  },
  {
    id: "CLI-PSP-003",
    name: "Metro Food Services",
    segment: "Food service",
    monthlyVolume: 21450000,
    transactions: 5340,
    approvalRate: 96.1,
    riskScore: "Bajo",
    status: "Activo",
    lastClose: "2026-05-15 12:00",
  },
  {
    id: "CLI-PSP-004",
    name: "Atlas Digital Goods",
    segment: "Digital",
    monthlyVolume: 12840000,
    transactions: 1490,
    approvalRate: 88.9,
    riskScore: "Alto",
    status: "Onboarding",
    lastClose: "Pendiente",
  },
];

export const settlementRecords: SettlementRecord[] = [
  {
    id: "LIQ-2026-0515-01",
    merchant: "Nova Retail Group",
    period: "15 May 2026",
    amount: 428500,
    fees: 12426,
    netAmount: 416074,
    status: "Lista",
    scheduledAt: "2026-05-15 17:00",
  },
  {
    id: "LIQ-2026-0515-02",
    merchant: "Metro Food Services",
    period: "15 May 2026",
    amount: 284900,
    fees: 8262,
    netAmount: 276638,
    status: "Programada",
    scheduledAt: "2026-05-15 18:30",
  },
  {
    id: "LIQ-2026-0515-03",
    merchant: "Andes Travel Hub",
    period: "14 May 2026",
    amount: 198700,
    fees: 5762,
    netAmount: 192938,
    status: "En revision",
    scheduledAt: "2026-05-16 09:00",
  },
  {
    id: "LIQ-2026-0515-04",
    merchant: "Atlas Digital Goods",
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
