# Magic Pay

Prototipo administrativo en React + Vite para visualizar como quedara el panel antes de conectar servicios reales.

La aplicacion quedo en modo mock: no realiza llamadas HTTP, no usa JWT y no depende de configuracion de backend.

## Acceso mock

Correo permitido:

```text
admin@magicpay.com
```

Password permitido:

```text
Admin123!
```

## Vistas activas

- `/dashboard`
- `/dashboard/liquidaciones`
- `/dashboard/consolidaciones`

El menu lateral solo muestra esas tres opciones y el cierre de sesion.

## Scripts

```bash
npm install
npm run dev
npm run lint
npm run typecheck
npm run test
npm run build
```

## Estructura principal

```text
src/
  config/
    routePaths.ts
    routes.tsx
  features/
    admin/
      mockData.ts
      views/
        LiquidacionesView.tsx
        ConsolidacionesView.tsx
    auth/
      authService.ts
      roles.ts
      views/LoginView.tsx
    dashboard/
      views/DashboardView.tsx
      components/DashboardCharts.tsx
  shared/
    layouts/
      Sidebar.tsx
      Topbar.tsx
```

## Datos mock

Los datos mock administrativos viven en:

```text
src/features/admin/mockData.ts
```

Desde ahi se alimentan:

- KPIs y graficas del dashboard.
- Lotes de liquidacion.
- Fuentes de consolidacion.

Cuando se integre backend, ese archivo es el punto natural para sustituir mocks por servicios de datos.

## Alcance actual

- Solo existe rol `admin`.
- El login valida un correo y password mock.
- Las vistas son puramente visuales y operativas.
- No hay proxy ni configuracion HTTP en Vite.
- La documentacion antigua de integraciones fue reemplazada por esta guia admin.
