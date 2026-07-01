# Playbook: Product Release

Process owner (RACI Accountable): **CPWO (Vadim)**, executed by CTO/Product + Developer

## When to Use

Any time code changes are ready to ship to the Vercel deployment — a new
feature, a bug fix batch, or a content placement change.

## Steps

1. **Scope** — CTO/Product defines what's in the release, referencing the
   roadmap item or bug list.
2. **Implement** — Developer builds against the spec. Content placements go
   through Medical Content's verified copy; clinical-claim features get a
   pre-build check with Medical Advisory if not already reviewed.
3. **Test** — QA/GStack runs the release candidate: `snapshot -D` diffs against
   the previous baseline, responsive checks, console/network checks, and a
   pass over every affected route. QA withholds sign-off if anything fails.
4. **Consult** — Independent Auditor is looped in for releases touching
   payments, tokenomics-adjacent code (`medtoken`, `checkout/*`), or anything
   flagged as high-risk.
5. **Sign-off** — CTO/Product gives final Accountable sign-off once QA has
   cleared the candidate.
6. **Ship** — Developer deploys. Deployment health confirmed (Vercel build
   status, smoke test on the live URL).
7. **Inform** — CEO and Growth/Marketing are informed post-release (I in RACI),
   not blocked on it.

## Rollback

If a release breaks something in production: Developer and CTO/Product decide
to revert immediately (CPWO-lane, technical, no need to wait for Joint sign-off
since this is operational, not one of the Decision Matrix's Joint items). QA
verifies the rollback restored the previous good state. Log the incident if it
affected patient-facing clinical content (escalate to Medical Advisory) or
exposed data (trigger `docs/playbooks/Security Incident.md`).

## Where This Lands

Release notes and sign-off records go in `docs/reports/product/`.
