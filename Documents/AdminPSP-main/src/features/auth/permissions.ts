import { ROLES, type RolUsuario } from "./roles";

export type Permiso =
  | "ver_dashboard_admin"
  | "ver_operaciones_pago"
  | "ver_liquidaciones"
  | "ver_consolidaciones"
  | "exportar_datos";

export const PERMISOS_POR_ROL: Record<RolUsuario, Permiso[]> = {
  [ROLES.ADMIN]: [
    "ver_dashboard_admin",
    "ver_operaciones_pago",
    "ver_liquidaciones",
    "ver_consolidaciones",
    "exportar_datos",
  ],
};

export const tienePermiso = (rol: RolUsuario, permiso: Permiso): boolean =>
  PERMISOS_POR_ROL[rol]?.includes(permiso) ?? false;

export const tienePermisos = (rol: RolUsuario, permisos: Permiso[]): boolean =>
  permisos.every((permiso) => tienePermiso(rol, permiso));
