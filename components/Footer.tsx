import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <p className="text-white font-semibold mb-2">MedByClick</p>
            <p className="text-sm leading-relaxed">
              A curated network of vetted specialists. Not a directory — a quality mark.
            </p>
          </div>
          <div>
            <p className="text-white text-sm font-medium mb-3">Navigation</p>
            <div className="flex flex-col gap-2 text-sm">
              <Link href="/doctors" className="hover:text-white transition-colors">Our Specialists</Link>
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
