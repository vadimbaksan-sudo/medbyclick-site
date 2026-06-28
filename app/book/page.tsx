import { Suspense } from "react";
import BookForm from "./BookForm";

export const metadata = {
  title: "Book a Consultation — MedByClick",
  description: "Request a consultation with one of our vetted specialists.",
};

export default function BookPage() {
  return (
    <div className="bg-white">
      {/* Header */}
      <div className="bg-slate-900 text-white py-14">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-amber-400 mb-4">
            Get started
          </p>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Book a consultation
          </h1>
          <p className="text-slate-300 leading-relaxed">
            Tell us about your situation. Our coordinator will review your case
            and confirm your appointment — usually within 24 hours.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        <Suspense fallback={<div className="animate-pulse h-96 bg-slate-100 rounded-xl" />}>
          <BookForm />
        </Suspense>
      </div>
    </div>
  );
}
