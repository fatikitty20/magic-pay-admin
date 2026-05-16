import i18n from "@/i18n";
import { beforeEach, describe, expect, it } from "vitest";
import {
  CREDENCIALES_ADMIN_MOCK,
  servicioAutenticacion,
} from "./authService";

describe("servicioAutenticacion", () => {
  beforeEach(async () => {
    await servicioAutenticacion.cerrarSesion();
    window.localStorage.removeItem("magictronic.i18nextLng");
    window.localStorage.removeItem("i18nextLng");
  });

  it("inicia sesion con credenciales mock de administrador", async () => {
    const sesion = await servicioAutenticacion.iniciarSesion({
      email: ` ${CREDENCIALES_ADMIN_MOCK.email.toUpperCase()} `,
      password: CREDENCIALES_ADMIN_MOCK.password,
    });

    expect(sesion.correo).toBe(CREDENCIALES_ADMIN_MOCK.email);
    expect(sesion.proveedor).toBe("mock");
    expect(sesion.usuario.role).toBe("admin");
    await expect(servicioAutenticacion.estaAutenticado()).resolves.toBe(true);
  });

  it("rechaza credenciales distintas al mock permitido", async () => {
    await expect(
      servicioAutenticacion.iniciarSesion({
        email: "otro@magicpay.com",
        password: "bad-password",
      }),
    ).rejects.toThrow("incorrect");
  });

  it("restaura idioma ingles al cerrar sesion", async () => {
    window.localStorage.setItem("magictronic.i18nextLng", "es");
    window.localStorage.setItem("i18nextLng", "es");
    await i18n.changeLanguage("es");

    await servicioAutenticacion.iniciarSesion(CREDENCIALES_ADMIN_MOCK);
    await expect(servicioAutenticacion.cerrarSesion()).resolves.toBeUndefined();

    expect(window.localStorage.getItem("magictronic.i18nextLng")).toBe("en");
    expect(window.localStorage.getItem("i18nextLng")).not.toBe("es");
    expect(i18n.language.startsWith("en")).toBe(true);
    await expect(servicioAutenticacion.estaAutenticado()).resolves.toBe(false);
  });
});
