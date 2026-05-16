# Documentacion Tecnica - Magic Pay Mock

## Objetivo

La aplicacion quedo como prototipo administrativo sin integraciones HTTP. El objetivo actual es presentar la experiencia visual de administracion para dashboard, liquidaciones y consolidaciones.

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
- `/dashboard/liquidaciones`
- `/dashboard/consolidaciones`

## Mocks administrativos

Archivo principal:

```text
src/features/admin/mockData.ts
```

Contiene:

- KPIs del dashboard.
- Series para graficas.
- Registros de liquidaciones.
- Registros de consolidaciones.

## Integracion futura

Cuando exista backend, se recomienda crear servicios por dominio y sustituir el origen de datos de `mockData.ts`.

No se debe reconstruir el menu: el alcance de navegacion actual ya esta limitado a las tres vistas administrativas.
