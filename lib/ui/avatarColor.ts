/**
 * Deterministic avatar gradient per doctor, so the network reads as a set of
 * distinct known people rather than identical placeholder circles. Same
 * doctor always gets the same color (hashed from id/name), no randomness.
 *
 * Per DESIGN.md's Color section, doctor avatars render on medical-trust
 * pages (homepage, /specialists, /doctors, doctor detail) — those pages get
 * exactly one accent (amber) plus the slate neutral scale; teal is reserved
 * exclusively for token/education/foundation pages. This palette stays
 * entirely within slate (varying lightness/darkness) and amber-on-slate, so
 * doctors are still visually distinguishable without introducing off-system
 * hues (no more teal/rose/indigo/emerald/sky/fuchsia/lime rainbow).
 */
const AVATAR_GRADIENTS = [
  "from-slate-500 to-slate-900",
  "from-slate-600 to-slate-900",
  "from-slate-700 to-slate-900",
  "from-amber-500 to-slate-900",
  "from-amber-600 to-slate-900",
  "from-slate-400 to-slate-700",
] as const;

export function avatarGradientClass(seed: string): string {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash * 31 + seed.charCodeAt(i)) | 0;
  }
  const index = Math.abs(hash) % AVATAR_GRADIENTS.length;
  return AVATAR_GRADIENTS[index];
}
