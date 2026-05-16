/**
 * Rol unico del prototipo administrativo.
 */

export type RolUsuario = "admin";

export const ROLES = {
  ADMIN: "admin" as const,
} as const;

export const ROLE_LABELS: Record<RolUsuario, string> = {
  admin: "Administrador",
};

export const ROLE_DESCRIPTIONS: Record<RolUsuario, string> = {
  admin: "Acceso administrativo al panel Magic Pay",
};
