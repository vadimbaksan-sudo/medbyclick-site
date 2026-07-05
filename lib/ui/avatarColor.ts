/**
 * Deterministic avatar gradient per doctor, so the network reads as a set of
 * distinct known people rather than identical placeholder circles. Same
 * doctor always gets the same color (hashed from id/name), no randomness.
 *
 * Per DESIGN.md's Color section, doctor avatars render on medical-trust
 * pages (homepage, /specialists, /doctors, doctor detail) — those pages get
 * exactly one accent (amber) plus a neutral scale; teal is reserved
 * exclusively for token/education/foundation pages. Neutrals here use
 * `stone` rather than the sitewide `slate` (unchanged everywhere else, e.g.
 * text/borders/UI chrome) — `slate` has a cool blue cast that reads as
 * "steel/metal" once it's the fill of a dozen avatar circles on one page;
 * `stone` is a warmer light gray that avoids that. One muted `green` option
 * is included as a "trust/hope" tone associated with health — deliberately a
 * darker, desaturated shade (not `green-400`/`500`, which DESIGN.md reserves
 * for semantic success indicators) so a large avatar fill is never mistaken
 * for a status signal. No teal/rose/indigo/sky/fuchsia/lime — those stay out.
 */
const AVATAR_GRADIENTS = [
  "from-stone-400 to-stone-600",
  "from-stone-500 to-stone-700",
  "from-stone-600 to-stone-800",
  "from-amber-500 to-stone-800",
  "from-amber-600 to-stone-900",
  "from-green-700 to-stone-900",
] as const;

export function avatarGradientClass(seed: string): string {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash * 31 + seed.charCodeAt(i)) | 0;
  }
  const index = Math.abs(hash) % AVATAR_GRADIENTS.length;
  return AVATAR_GRADIENTS[index];
}
