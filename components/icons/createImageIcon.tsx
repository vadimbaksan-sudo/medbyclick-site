/**
 * Wraps a static PNG (the custom "dossier" pictogram set, generated
 * 2026-08-22 per Vadim's request after both Lucide and hand-drawn SVG
 * were rejected — see DESIGN.md) so module definitions can keep the same
 * `<mod.icon className="..." />` call shape every render site already
 * uses, whether the icon is a lucide-react component or one of these.
 */
import type { ComponentType } from "react";

export function createImageIcon(src: string): ComponentType<{ className?: string }> {
  return function ModuleImageIcon({ className }: { className?: string }) {
    // eslint-disable-next-line @next/next/no-img-element -- fixed-size decorative icon, not a content image; next/image's overhead isn't worth it here
    return <img src={src} alt="" className={className} />;
  };
}
