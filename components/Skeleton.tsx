// Shared skeleton-block primitive for loading states (DESIGN.md "Motion" —
// minimal-functional). Uses Tailwind's built-in `animate-pulse` (opacity
// 0.5→1, 2s, ease-in-out) rather than a hand-rolled keyframe — close enough
// to the 0.55–0.85/1400ms spec to not be worth a custom animation, and it
// already respects the sitewide `prefers-reduced-motion` override in
// app/globals.css (that rule targets `*` and collapses any
// `animation-duration`, this one included, to ~0).
//
// Usage: compose blocks with the exact width/height/radius of the real
// content they stand in for — never a single generic box. `tone="light"`
// (bg-stone-100) is for skeletons sitting on an already bg-stone-50 surface
// so the block still reads against its background; the default `bg-stone-200`
// is for skeletons on white/bg-stone-100 surfaces.
export function Skeleton({
  className = "",
  tone = "base",
}: {
  className?: string;
  tone?: "base" | "light";
}) {
  return (
    <div
      role="presentation"
      aria-hidden="true"
      className={`animate-pulse ${tone === "light" ? "bg-stone-100" : "bg-stone-200"} ${className}`}
    />
  );
}
