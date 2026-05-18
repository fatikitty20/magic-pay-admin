import { lazy, Suspense, type ReactNode } from "react";
import { DashboardLayout } from "../shared/layouts/DashboardLayout";
import { RouteFallback } from "../shared/ui/RouteFallback";
import Index from "../pages/Index";
import { PROTECTED_ROUTE_PATHS, ROUTE_PATHS } from "./routePaths";

const Dashboard = lazy(() => import("../pages/Dashboard"));
const Login = lazy(() => import("../features/auth/views/LoginView"));
const NotFound = lazy(() => import("../pages/NotFound"));
const PaymentIntentsView = lazy(() => import("../features/admin/views/PaymentIntentsView"));
const RejectedTransactionsView = lazy(() => import("../features/admin/views/RejectedTransactionsView"));
const SuccessfulPaymentsView = lazy(() => import("../features/admin/views/SuccessfulPaymentsView"));
const RefundsView = lazy(() => import("../features/admin/views/RefundsView"));
const LiquidacionesView = lazy(() => import("../features/admin/views/LiquidacionesView"));
const ConsolidacionesView = lazy(() => import("../features/admin/views/ConsolidacionesView"));
const TransactionsView = lazy(() => import("../features/admin/views/TransactionsView"));

export interface RouteConfig {
  path: string;
  element: ReactNode;
  children?: RouteConfig[];
  requiresAuth?: boolean;
}

const withRouteSuspense = (element: ReactNode) => (
  <Suspense fallback={<RouteFallback />}>{element}</Suspense>
);

export const publicRoutes: RouteConfig[] = [
  {
    path: ROUTE_PATHS.root,
    element: <Index />,
  },
  {
    path: ROUTE_PATHS.login,
    element: withRouteSuspense(<Login />),
  },
];

export const protectedRoutes: RouteConfig[] = [
  {
    path: PROTECTED_ROUTE_PATHS.dashboard,
    element: withRouteSuspense(<Dashboard />),
    requiresAuth: true,
  },
  {
    path: PROTECTED_ROUTE_PATHS.paymentIntents,
    element: withRouteSuspense(<PaymentIntentsView />),
    requiresAuth: true,
  },
  {
    path: PROTECTED_ROUTE_PATHS.rejectedTransactions,
    element: withRouteSuspense(<RejectedTransactionsView />),
    requiresAuth: true,
  },
  {
    path: PROTECTED_ROUTE_PATHS.successfulPayments,
    element: withRouteSuspense(<SuccessfulPaymentsView />),
    requiresAuth: true,
  },
  {
    path: PROTECTED_ROUTE_PATHS.refunds,
    element: withRouteSuspense(<RefundsView />),
    requiresAuth: true,
  },
  {
    path: PROTECTED_ROUTE_PATHS.settlements,
    element: withRouteSuspense(<LiquidacionesView />),
    requiresAuth: true,
  },
  {
    path: PROTECTED_ROUTE_PATHS.consolidations,
    element: withRouteSuspense(<ConsolidacionesView />),
    requiresAuth: true,
  },
  {
    path: PROTECTED_ROUTE_PATHS.transactions,
    element: withRouteSuspense(<TransactionsView />),
    requiresAuth: true,
  },
];

export const errorRoutes: RouteConfig[] = [
  {
    path: "*",
    element: withRouteSuspense(<NotFound />),
  },
];

export const appRoutes: RouteConfig[] = [
  ...publicRoutes,
  {
    path: ROUTE_PATHS.root,
    element: <DashboardLayout />,
    requiresAuth: true,
    children: protectedRoutes,
  },
  ...errorRoutes,
];
