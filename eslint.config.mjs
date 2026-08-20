import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    // Defense-in-depth for the Legal & Compliance content gate on
    // case_documents/second_opinion_reports/consilium_opinions (Phases
    // C/E/G, docs/decision-log/0009). These three tables must only ever be
    // queried through lib/db/queries/case-content.ts, which hard-codes
    // `isSynthetic = true` into every read — importing the raw table
    // anywhere else bypasses that filter entirely. Flagged by the
    // 2026-08-20 /autoplan retrospective review as enforced only by a code
    // comment; this makes it a build-breaking lint error instead
    // (`next build` runs ESLint and fails on errors, so this also blocks
    // the Vercel deploy that would otherwise ship the bypass).
    files: ["**/*.ts", "**/*.tsx"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          paths: [
            {
              name: "@/lib/db/schema",
              importNames: ["caseDocuments", "secondOpinionReports", "consiliumOpinions"],
              message:
                "Query these only through lib/db/queries/case-content.ts, which enforces isSynthetic = true on every read. Add a getter there instead of importing the table directly.",
            },
          ],
        },
      ],
      // "server-only" split convention (docs/conventions/server-only-split.md):
      // this exact mistake — a "server-only"-importing module ending up in
      // a plain .ts file that bun test then can't resolve — broke the test
      // suite 3 separate times before it was documented (doctors,
      // medglobaldb, sla). New server-only modules must use the .server.ts
      // suffix so this is visible in the filename, not just in a comment.
      // The 13 files predating this rule are grandfathered below.
      "no-restricted-syntax": [
        "error",
        {
          selector: "ImportDeclaration[source.value='server-only']",
          message:
            "New server-only modules must live in a *.server.ts file (see docs/conventions/server-only-split.md), with any pure/test-safe logic split into a plain .ts sibling.",
        },
      ],
    },
  },
  {
    files: ["lib/db/queries/case-content.ts"],
    rules: {
      "no-restricted-imports": "off",
    },
  },
  {
    // Grandfathered "server-only" imports that predate the .server.ts
    // convention above — see docs/conventions/server-only-split.md. Do not
    // add new files to this list; give new server-only modules a
    // *.server.ts filename instead, which is exempted by the next block.
    files: [
      "lib/bookings/sla.ts",
      "lib/payments/stripe.ts",
      "lib/auth/dal.ts",
      "lib/db/queries/case-content.ts",
      "lib/db/client.ts",
      "lib/db/queries/payments.ts",
      "lib/supabase/server.ts",
      "lib/db/queries/course-enrollments.ts",
      "lib/db/queries/medical-history.ts",
      "lib/db/queries/doctors.ts",
      "lib/db/queries/bookings.ts",
      "modules/medglobaldb/getDoctors.ts",
      "modules/medconnect/getDoctors.ts",
    ],
    rules: {
      "no-restricted-syntax": "off",
    },
  },
  {
    files: ["**/*.server.ts"],
    rules: {
      "no-restricted-syntax": "off",
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
