import { useMemo } from "react";
import { obtenerConfigDashboard } from "../config/dashboardConfig";

export const useDashboard = () => {
  return useMemo(() => obtenerConfigDashboard(), []);
};
