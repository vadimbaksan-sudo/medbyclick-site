import Link from "next/link";
import { getNavModules } from "@/modules/registry";

export default function Footer() {
  const navModules = getNavModules();

  return (
    <footer className="bg-slate-900 text-slate-400">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <p className="text-white font-semibold mb-2">MedByClick</p>
            <p className="text-sm leading-relaxed">
              A modular medical platform. Personally vetted specialists, AI diagnostics, global care coordination.
            </p>
          </div>

          <div>
            <p className="text-white text-sm font-medium mb-3">Platform</p>
            <div className="flex flex-col gap-2 text-sm">
              {navModules.map((mod) => (
                <Link key={mod.id} href={mod.href!} className="hover:text-white transition-colors flex items-center gap-1.5">
                  <span className="text-xs">{mod.icon}</span>
                  {mod.navLabel}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <p className="text-white text-sm font-medium mb-3">Specialists</p>
            <div className="flex flex-col gap-2 text-sm">
              <Link href="/doctors" className="hover:text-white transition-colors">Browse Network</Link>
              <Link href="/#how-it-works" className="hover:text-white transition-colors">How It Works</Link>
              <Link href="/book" className="hover:text-white transition-colors">Book a Consultation</Link>
            </div>
          </div>

          <div>
            <p className="text-white text-sm font-medium mb-3">Contact</p>
            <div className="flex flex-col gap-2 text-sm">
              <a href="mailto:info@medbyclick.com" className="hover:text-white transition-colors">
                info@medbyclick.com
              </a>
              <p>Israel — Russia — International</p>
              <p className="text-xs mt-2 text-slate-500">
                Active modules: <span className="text-slate-400">{navModules.length}</span>
              </p>
            </div>
          </div>
        </div>
        <div className="mt-10 pt-8 border-t border-slate-800 text-xs text-slate-500">
          © {new Date().getFullYear()} MedByClick. All consultations are non-emergency advisory services.
        </div>
      </div>
    </footer>
  );
}
