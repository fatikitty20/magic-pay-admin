# Technical Documentation - Magic Pay Mock

## Purpose

The application is now an admin-only mock prototype. It renders the future administration experience for dashboard, payments, transactions, settlements, and consolidations without HTTP integrations.

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
- `/dashboard/payment-intents`
- `/dashboard/rejected-transactions`
- `/dashboard/successful-payments`
- `/dashboard/refunds`
- `/dashboard/liquidaciones`
- `/dashboard/consolidaciones`
- `/transactions`

## Admin mocks

Main file:

```text
src/features/admin/mockData.ts
```

It contains:

- Dashboard KPIs.
- Chart series.
- Mock payment intents, rejected transactions, successful payments, refunds, and transactions.
- Settlement records.
- Consolidation records.

## Future integration

When a backend exists, create domain services and replace the data source currently provided by `mockData.ts`.

No endpoints were copied from the other project; these views run on local mock data.
