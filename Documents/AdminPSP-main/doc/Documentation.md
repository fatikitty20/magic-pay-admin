# Technical Documentation - Magic Pay Mock

## Purpose

The application is now an admin-only mock prototype. It renders the future administration experience for dashboard, settlements, and consolidations without HTTP integrations.

## Mock authentication

Main file:

```text
src/features/auth/authService.ts
```

Allowed credentials:

```text
admin@magicpay.com
Admin123!
```

The session is stored locally with a mock key and expires after eight hours.

## Routes

Main file:

```text
src/config/routes.tsx
```

Protected routes:

- `/dashboard`
- `/dashboard/liquidaciones`
- `/dashboard/consolidaciones`

## Admin mocks

Main file:

```text
src/features/admin/mockData.ts
```

It contains:

- Dashboard KPIs.
- Chart series.
- Settlement records.
- Consolidation records.

## Future integration

When a backend exists, create domain services and replace the data source currently provided by `mockData.ts`.

The navigation scope should remain focused on the three admin views unless product requirements change.
