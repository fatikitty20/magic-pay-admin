# Documentacion Tecnica - Magic Pay Mock

## Objetivo

La aplicacion quedo como prototipo administrativo sin integraciones HTTP. El objetivo actual es presentar la experiencia visual de administracion para dashboard, pagos, transacciones, liquidaciones y consolidaciones.

## Autenticacion mock

Archivo principal:

```text
src/features/auth/authService.ts
```

Credenciales permitidas:

```text
admin@magicpay.com
Admin123!
```

La sesion se guarda en `localStorage` bajo una clave mock y expira despues de ocho horas.

## Rutas

Archivo principal:

```text
src/config/routes.tsx
```

Rutas protegidas:

- `/dashboard`
- `/dashboard/payment-intents`
- `/dashboard/rejected-transactions`
- `/dashboard/successful-payments`
- `/dashboard/refunds`
- `/dashboard/liquidaciones`
- `/dashboard/consolidaciones`
- `/transactions`

## Mocks administrativos

Archivo principal:

```text
src/features/admin/mockData.ts
```

Contiene:

- KPIs del dashboard.
- Series para graficas.
- Registros mock de intenciones, rechazos, pagos exitosos, devoluciones y transacciones.
- Registros de liquidaciones.
- Registros de consolidaciones.

## Integracion futura

Cuando exista backend, se recomienda crear servicios por dominio y sustituir el origen de datos de `mockData.ts`.

No se copiaron endpoints del otro proyecto: las vistas operan con datos locales.
