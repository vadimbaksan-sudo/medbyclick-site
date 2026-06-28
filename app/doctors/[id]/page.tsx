import { notFound } from "next/navigation";
import Link from "next/link";
import { doctors } from "@/lib/doctors";

export function generateStaticParams() {
  return doctors.map((d) => ({ id: d.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const doctor = doctors.find((d) => d.id === id);
  if (!doctor) return {};
  return {
    title: `${doctor.name} — MedByClick`,
    description: doctor.bio,
  };
}

export default async function DoctorProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const doctor = doctors.find((d) => d.id === id);
  if (!doctor) notFound();

  const others = doctors.filter((d) => d.id !== doctor.id).slice(0, 2);

  return (
    <div className="bg-white">
      {/* Breadcrumb */}
      <div className="bg-slate-50 border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-2 text-sm text-slate-400">
          <Link href="/doctors" className="hover:text-slate-700 transition-colors">
            Specialists
          </Link>
          <span>/</span>
          <span className="text-slate-700">{doctor.name}</span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main content */}
          <div className="lg:col-span-2">
            {/* Header */}
            <div className="flex items-start gap-6 mb-8">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center text-slate-600 font-bold text-3xl flex-shrink-0">
                {doctor.name.split(" ").slice(-1)[0][0]}
              </div>
              <div>
                <span className="inline-block text-xs font-medium text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full mb-2">
                  {doctor.specialty}
                </span>
                <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
                  {doctor.name}
                </h1>
                <p className="text-slate-500 mt-1">{doctor.credentials}</p>
              </div>
            </div>

            {/* Languages & response */}
            <div className="flex flex-wrap gap-3 mb-8">
              {doctor.languages.map((lang) => (
                <span
                  key={lang}
                  className="flex items-center gap-1.5 text-sm text-slate-700 bg-slate-100 px-3 py-1.5 rounded-full"
                >
                  <span className="text-base">🌐</span>
                  {lang}
                </span>
              ))}
              <span className="flex items-center gap-1.5 text-sm text-slate-700 bg-green-50 border border-green-200 px-3 py-1.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block"></span>
                {doctor.responseTime}
              </span>
            </div>

            {/* Founder's endorsement */}
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 mb-8">
              <p className="text-xs font-semibold uppercase tracking-widest text-amber-700 mb-4">
                Founder&apos;s personal endorsement
              </p>
              <blockquote className="text-slate-700 leading-relaxed italic text-base">
                &ldquo;{doctor.endorsement}&rdquo;
              </blockquote>
              <p className="text-slate-500 text-sm mt-4 not-italic">
                — Professor of Oncology, MedByClick Founder
              </p>
            </div>

            {/* Bio */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-slate-900 mb-3">
                About {doctor.name.split(" ")[0]}
              </h2>
              <p className="text-slate-600 leading-relaxed">{doctor.bio}</p>
            </div>

            {/* Specializes in */}
            <div>
              <h2 className="text-lg font-semibold text-slate-900 mb-3">
                Specializes in
              </h2>
              <ul className="space-y-2">
                {doctor.subspecialties.map((sub) => (
                  <li key={sub} className="flex items-center gap-2 text-slate-600 text-sm">
                    <span className="w-4 h-4 rounded-full bg-amber-100 text-amber-700 text-xs flex items-center justify-center font-bold">
                      ✓
                    </span>
                    {sub}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              {/* Booking card */}
              <div className="border border-slate-200 rounded-2xl p-6 mb-6">
                <p className="font-semibold text-slate-900 mb-1">
                  Book with {doctor.name.split(" ")[0]}
                </p>
                <p className="text-sm text-slate-500 mb-5 leading-relaxed">
                  Tell us about your case and we&apos;ll confirm your appointment within{" "}
                  {doctor.responseTime.toLowerCase()}.
                </p>
                <Link
                  href={`/book?doctor=${doctor.id}`}
                  className="block w-full text-center px-5 py-3 bg-slate-900 hover:bg-slate-700 text-white font-medium rounded-lg text-sm transition-colors mb-3"
                >
                  Request Consultation
                </Link>
                <Link
                  href="/book"
                  className="block w-full text-center px-5 py-2.5 border border-slate-200 hover:border-slate-400 text-slate-600 rounded-lg text-sm transition-colors"
                >
                  Not sure? Let us match you
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-3">
                <div className="border border-slate-100 rounded-xl p-4 text-center">
                  <p className="text-2xl font-bold text-slate-900">
                    {doctor.casesHandled}
                  </p>
                  <p className="text-xs text-slate-400 mt-1">Cases via MedByClick</p>
                </div>
                <div className="border border-slate-100 rounded-xl p-4 text-center">
                  <p className="text-2xl font-bold text-amber-600">✓</p>
                  <p className="text-xs text-slate-400 mt-1">Founder-verified</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Other specialists */}
        {others.length > 0 && (
          <div className="mt-16 pt-12 border-t border-slate-100">
            <h2 className="text-xl font-bold text-slate-900 mb-6">
              Other specialists in the network
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {others.map((other) => (
                <Link
                  key={other.id}
                  href={`/doctors/${other.id}`}
                  className="flex items-center gap-4 p-4 border border-slate-100 rounded-xl hover:border-slate-300 transition-all group"
                >
                  <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-semibold text-base flex-shrink-0">
                    {other.name.split(" ").slice(-1)[0][0]}
                  </div>
                  <div>
                    <p className="font-medium text-slate-900 group-hover:text-amber-700 transition-colors text-sm">
                      {other.name}
                    </p>
                    <p className="text-xs text-slate-400">
                      {other.specialty} · {other.title}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
