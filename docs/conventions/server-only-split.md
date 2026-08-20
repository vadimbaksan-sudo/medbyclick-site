# Convention: splitting `"server-only"` modules from test-safe modules

## The problem

Next.js special-cases the `"server-only"` package at the bundler level: importing
it makes a module (and anything that imports that module) throw if it's ever
bundled into client code. It's not an installed npm package — `bun test` has no
bundler and no special-case for it, so any test file that transitively imports a
`"server-only"`-tagged module fails with `Cannot find package 'server-only'`.

This has broken the test suite three separate times in the same way:

1. `modules/medconnect/data.ts` / `modules/medglobaldb/data.ts` — a DB-aware
   fetcher importing `lib/db/queries/doctors.ts` (`"server-only"`) was added
   directly into the module both app pages AND `lib/db/seed/doctors.seed.test.ts`
   imported. Fixed by extracting the DB-aware part into
   `modules/medconnect/getDoctors.ts` / `modules/medglobaldb/getDoctors.ts`.
2. The same pattern, same fix, applied to `lib/bookings/sla.ts` →
   `lib/bookings/slaDeadline.ts` (the pure SLA-deadline math split out so it
   stays unit-testable).
3. Caught again, not yet fixed, by the 2026-08-20 `/autoplan` retrospective
   review: the fix pattern itself was never written down anywhere except a
   decision-log paragraph — nothing would have stopped a 4th recurrence.

## The rule

If a module needs both (a) logic that should be unit-testable with plain
`bun test`, and (b) something that pulls in `"server-only"` (directly, or via
an import chain — `getDb()`, `lib/auth/dal.ts`, etc.) — **split it into two
files**, not one:

- The pure/test-safe half keeps the plain name (e.g. `slaDeadline.ts`,
  `data.ts`).
- The `"server-only"` half gets a **`*.server.ts`** filename, so which half is
  which is visible from the file name, not just from reading imports.

Going forward, ESLint enforces this: `import "server-only"` in a file that
isn't named `*.server.ts` is a lint error (`eslint.config.mjs`, the
`no-restricted-syntax` rule scoped to `ImportDeclaration[source.value='server-only']`),
which also fails `next build` on Vercel. The 13 files that predate this rule
are grandfathered by an explicit file list in the same config — don't add new
files to that list; give new server-only modules a `.server.ts` name instead.

## Existing pairs (pre-date the `.server.ts` naming, grandfathered)

| Test-safe half | Server-only half |
|---|---|
| `modules/medconnect/data.ts` | `modules/medconnect/getDoctors.ts` |
| `modules/medglobaldb/data.ts` | `modules/medglobaldb/getDoctors.ts` |
| `lib/bookings/slaDeadline.ts` | `lib/bookings/sla.ts` |

These were named before this convention existed (naming is inconsistent
between pairs — `data.ts`/`getDoctors.ts` vs. the inverted
`slaDeadline.ts`/`sla.ts`) — not worth a rename-only PR, but any *new* split
should follow the `.server.ts` suffix rule above instead of inventing another
naming scheme.
