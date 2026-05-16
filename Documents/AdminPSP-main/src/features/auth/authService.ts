import { APP_CONFIG } from "@/shared/config/appConfig";
import i18n from "@/i18n";
import type { RolUsuario } from "./roles";

export interface CredencialesAutenticacion {
  email: string;
  password: string;
}

export interface UsuarioAutenticado {
  correo: string;
  role: RolUsuario;
}

export interface SesionAutenticacion {
  correo: string;
  emitidaEn: number;
  expiraEn: number;
  token: string;
  proveedor: "mock";
  usuario: UsuarioAutenticado;
}

interface AdaptadorAutenticacion {
  iniciarSesion(
    credenciales: CredencialesAutenticacion,
    t?: TranslationFunction,
  ): Promise<SesionAutenticacion>;

  cerrarSesion(): Promise<void>;

  obtenerSesion(): Promise<SesionAutenticacion | null>;
}

type LoginErrorKey =
  | "login.errors.unauthorized"
  | "login.errors.generic";

type TranslationFunction = (key: LoginErrorKey) => string;

const MOCK_SESSION_STORAGE_KEY = "magicpay.admin.mockSession";
const LEGACY_MAGITRONIC_MOCK_SESSION_STORAGE_KEY = "magitronic.admin.mockSession";
const LEGACY_MOCK_SESSION_STORAGE_KEY = "twengly.admin.mockSession";
const MOCK_SESSION_DURATION_MS = 8 * 60 * 60 * 1000;
let sesionMockActual: SesionAutenticacion | null = null;

export const CREDENCIALES_ADMIN_MOCK = {
  email: "admin@magicpay.com",
  password: "Admin123!",
} as const;

const construirSesionMock = (correo: string): SesionAutenticacion => {
  const emitidaEn = Date.now();

  return {
    correo,
    emitidaEn,
    expiraEn: emitidaEn + MOCK_SESSION_DURATION_MS,
    token: `mock-admin-${emitidaEn}`,
    proveedor: "mock",
    usuario: {
      correo,
      role: "admin",
    },
  };
};

const leerSesionPersistida = (): SesionAutenticacion | null => {
  try {
    window.localStorage.removeItem(MOCK_SESSION_STORAGE_KEY);
    window.localStorage.removeItem(LEGACY_MAGITRONIC_MOCK_SESSION_STORAGE_KEY);
    window.localStorage.removeItem(LEGACY_MOCK_SESSION_STORAGE_KEY);
  } catch {
    // Se ignora para que el arranque siempre pueda continuar.
  }

  if (!sesionMockActual) {
    return null;
  }

  if (sesionMockActual.expiraEn <= Date.now() || sesionMockActual.usuario.role !== "admin") {
    sesionMockActual = null;
    return null;
  }

  return sesionMockActual;
};

const guardarSesion = (sesion: SesionAutenticacion): void => {
  sesionMockActual = sesion;
};

const obtenerMensaje = (
  t: TranslationFunction | undefined,
  key: LoginErrorKey,
  fallback: string,
): string => {
  const translated = t?.(key);

  return translated && translated !== key ? translated : fallback;
};

const limpiarPreferenciasSesion = async (): Promise<void> => {
  sesionMockActual = null;

  try {
    window.localStorage.removeItem(MOCK_SESSION_STORAGE_KEY);
    window.localStorage.removeItem(LEGACY_MAGITRONIC_MOCK_SESSION_STORAGE_KEY);
    window.localStorage.removeItem(LEGACY_MOCK_SESSION_STORAGE_KEY);
    window.localStorage.removeItem(APP_CONFIG.LANGUAGE_STORAGE_KEY);
    window.localStorage.removeItem(APP_CONFIG.LEGACY_LANGUAGE_STORAGE_KEY);
  } catch {
    // El cierre local no depende del storage.
  }

  try {
    await i18n.changeLanguage(APP_CONFIG.DEFAULT_LANGUAGE);
  } catch {
    // La sesion ya fue limpiada aunque i18n no pueda cambiar idioma.
  }
};

const adaptadorAutenticacionMock: AdaptadorAutenticacion = {
  async iniciarSesion(credenciales, t) {
    const email = credenciales.email.trim().toLowerCase();
    const password = credenciales.password;
    const credencialesValidas =
      email === CREDENCIALES_ADMIN_MOCK.email &&
      password === CREDENCIALES_ADMIN_MOCK.password;

    if (!credencialesValidas) {
      throw new Error(
        obtenerMensaje(
          t,
          "login.errors.unauthorized",
          "Correo o contrasena mock incorrectos.",
        ),
      );
    }

    const sesion = construirSesionMock(CREDENCIALES_ADMIN_MOCK.email);
    guardarSesion(sesion);

    return sesion;
  },

  async cerrarSesion() {
    await limpiarPreferenciasSesion();
  },

  async obtenerSesion() {
    return leerSesionPersistida();
  },
};

export const servicioAutenticacion = {
  iniciarSesion(
    credenciales: CredencialesAutenticacion,
    t?: TranslationFunction,
  ) {
    return adaptadorAutenticacionMock.iniciarSesion(credenciales, t);
  },

  async refrescarToken() {
    const sesion = await adaptadorAutenticacionMock.obtenerSesion();

    if (!sesion) {
      throw new Error("No hay sesion mock activa");
    }

    return sesion;
  },

  cerrarSesion() {
    return adaptadorAutenticacionMock.cerrarSesion();
  },

  obtenerSesion() {
    return adaptadorAutenticacionMock.obtenerSesion();
  },

  async estaAutenticado() {
    const sesion = await adaptadorAutenticacionMock.obtenerSesion();

    return sesion !== null;
  },
};
