/**
 * Deterministic avatar gradient per doctor, so the network reads as a set of
 * distinct known people rather than identical placeholder circles. Same
 * doctor always gets the same color (hashed from id/name), no randomness.
 */
const AVATAR_GRADIENTS = [
  "from-amber-600 to-orange-800",
  "from-teal-600 to-slate-900",
  "from-rose-600 to-slate-900",
  "from-indigo-600 to-slate-900",
  "from-emerald-600 to-slate-900",
  "from-sky-600 to-slate-900",
  "from-fuchsia-600 to-slate-900",
  "from-lime-700 to-slate-900",
] as const;

export function avatarGradientClass(seed: string): string {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash * 31 + seed.charCodeAt(i)) | 0;
  }
  const index = Math.abs(hash) % AVATAR_GRADIENTS.length;
  return AVATAR_GRADIENTS[index];
}
