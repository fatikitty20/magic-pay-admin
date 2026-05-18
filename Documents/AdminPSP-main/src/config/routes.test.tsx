import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes, useLocation } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { appRoutes } from "./routes";
import { PROTECTED_ROUTE_PATHS, ROUTE_PATHS } from "./routePaths";
import { RutaProtegida } from "../features/auth";

const mockUseAuth = vi.fn();

vi.mock("../features/auth/useAuth", () => ({
  useAuth: () => mockUseAuth(),
}));

const UbicacionActual = () => {
  const location = useLocation();

  return <span data-testid="ruta-actual">{location.pathname}</span>;
};

describe("appRoutes", () => {
  beforeEach(() => {
    mockUseAuth.mockReset();
  });

  const routerFutureFlags = {
    v7_relativeSplatPath: true,
    v7_startTransition: true,
  } as const;

  it("centraliza el layout protegido con vistas admin mock", () => {
    const raizProtegida = appRoutes.find((route) => route.path === ROUTE_PATHS.root && route.children);

    expect(raizProtegida?.requiresAuth).toBe(true);
    expect(raizProtegida?.children).toHaveLength(8);
    expect(raizProtegida?.children?.map((route) => route.path)).toEqual([
      PROTECTED_ROUTE_PATHS.dashboard,
      PROTECTED_ROUTE_PATHS.paymentIntents,
      PROTECTED_ROUTE_PATHS.rejectedTransactions,
      PROTECTED_ROUTE_PATHS.successfulPayments,
      PROTECTED_ROUTE_PATHS.refunds,
      PROTECTED_ROUTE_PATHS.settlements,
      PROTECTED_ROUTE_PATHS.consolidations,
      PROTECTED_ROUTE_PATHS.transactions,
    ]);
  });

  it("redirige a login cuando no hay sesion", async () => {
    mockUseAuth.mockReturnValue({
      isAuthenticated: false,
      user: null,
      isHydrated: true,
      isCheckingAuth: false,
    });

    render(
      <MemoryRouter initialEntries={[ROUTE_PATHS.dashboard]} future={routerFutureFlags}>
        <Routes>
          <Route path={ROUTE_PATHS.login} element={<UbicacionActual />} />
          <Route
            path={ROUTE_PATHS.dashboard}
            element={
              <RutaProtegida>
                <div>Dashboard</div>
              </RutaProtegida>
            }
          />
        </Routes>
      </MemoryRouter>,
    );

    expect(await screen.findByTestId("ruta-actual")).toHaveTextContent(ROUTE_PATHS.login);
  });

  it("permite entrar a liquidaciones con sesion admin", () => {
    mockUseAuth.mockReturnValue({
      isAuthenticated: true,
      user: { role: "admin" },
      isHydrated: true,
      isCheckingAuth: false,
    });

    render(
      <MemoryRouter initialEntries={[ROUTE_PATHS.settlements]} future={routerFutureFlags}>
        <Routes>
          <Route
            path={ROUTE_PATHS.settlements}
            element={
              <RutaProtegida>
                <div>Liquidaciones</div>
              </RutaProtegida>
            }
          />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByText("Liquidaciones")).toBeInTheDocument();
  });
});
