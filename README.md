# 💳 Magic Pay Admin

Panel administrativo para una plataforma de pagos (PSP), construido con **React + TypeScript**. Permite visualizar y operar el ciclo de vida de los pagos: intenciones de pago, transacciones rechazadas, pagos exitosos, reembolsos, liquidaciones y consolidaciones.

> Prototipo funcional en **modo mock**: no hace llamadas HTTP ni requiere backend, así que se puede probar con solo instalar y ejecutar.

<!-- 🔗 Demo en vivo: https://TU-DEMO.netlify.app -->

![Dashboard](docs/screenshots/dashboard.png)
<!-- Agrega aquí 2 o 3 capturas: dashboard, tabla de pagos y modo oscuro -->

---

## ✨ Características

- **Dashboard** con KPIs y gráficas (GMV total, estado de pagos, tendencias).
- **Vistas operativas:** intenciones de pago, rechazos, pagos exitosos, reembolsos, liquidaciones, consolidaciones y transacciones.
- **Autenticación con rutas protegidas** y control de permisos por rol.
- **Tema claro y oscuro.**
- **Internacionalización** (español / inglés) con selector de idioma.
- **Arquitectura por features**, lista para reemplazar los datos mock por una API real.
- **Calidad de código:** ESLint, chequeo de tipos, pruebas automáticas y CI en GitHub Actions.

## 🛠️ Stack

| Área | Tecnologías |
|---|---|
| Frontend | React 18, TypeScript, Vite |
| Estilos | Tailwind CSS, shadcn/ui (Radix Tooltip) |
| Estado y datos | Zustand, TanStack Query |
| Rutas | React Router |
| i18n | i18next, react-i18next |
| Pruebas | Vitest, Testing Library |
| CI | GitHub Actions |

## 🚀 Cómo ejecutarlo

Requisitos: **Node.js 18 o superior**.

```bash
git clone https://github.com/fatikitty20/magic-pay-admin.git
cd magic-pay-admin
npm install
npm run dev
```

Abre la URL que muestra la terminal (normalmente `http://localhost:5173`).

### 🔑 Acceso de demostración

El login es simulado. Usa estas credenciales de ejemplo (no son datos reales):

| Campo | Valor |
|---|---|
| Correo | `admin@magicpay.com` |
| Contraseña | `Admin123!` |

## 📜 Scripts disponibles

| Comando | Descripción |
|---|---|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Build de producción |
| `npm run preview` | Previsualiza el build |
| `npm run lint` | Revisa el código con ESLint |
| `npm run typecheck` | Verifica tipos con TypeScript |
| `npm run test` | Ejecuta las pruebas |
| `npm run check` | Lint + tipos + pruebas + build |

## 📁 Estructura del proyecto

```text
src/
├── config/              # Rutas de la aplicación
├── features/
│   ├── admin/           # Vistas operativas y datos mock
│   ├── auth/            # Login, roles, permisos y rutas protegidas
│   ├── dashboard/       # KPIs y gráficas
│   ├── i18n/            # Selector de idioma
│   └── theme/           # Modo claro / oscuro
├── shared/              # Layouts (Sidebar, Topbar) y componentes comunes
├── locales/             # Traducciones es / en
└── pages/
```

## 🔌 Conectar un backend real

Los datos viven en `src/features/admin/mockData.ts`. Para integrar una API, basta con reemplazar ese archivo por servicios de datos (por ejemplo, con TanStack Query) y cambiar el adaptador de `authService.ts`.

## 🧭 Alcance actual y próximos pasos

- [x] Interfaz completa en modo mock
- [x] Pruebas y CI
- [ ] Integración con API real y autenticación JWT
- [ ] Roles adicionales además de `admin`
- [ ] Filtros avanzados y exportación de reportes

## 📄 Documentación adicional

En la carpeta `doc/` encontrarás la documentación técnica y el manual de usuario.

## 👩‍💻 Autora

**fatikitty20** · [GitHub](https://github.com/fatikitty20)
