import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import { CONTACT_EMAIL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with GameVerse. Report a broken game, ask a question, or reach out about advertising and partnerships. We reply within 24-48 hours.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
      <div className="mb-10 text-center">
        <span className="text-5xl" aria-hidden>✉️</span>
        <h1 className="mt-4 text-3xl font-black text-white sm:text-4xl">Contact Us</h1>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-slate-400 sm:text-base">
          Have a question, found a broken game, or want to work with us? We&apos;d love to hear from
          you. Our team typically replies within 24–48 hours.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
        <div className="rounded-2xl border border-white/5 bg-slate-900/50 p-6 sm:p-8">
          <ContactForm />
        </div>

        <aside className="space-y-4">
          <div className="rounded-2xl border border-white/5 bg-slate-900/50 p-6">
            <h2 className="text-sm font-bold text-white">Direct Email</h2>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="mt-2 block text-sm font-semibold text-violet-400 hover:text-violet-300"
            >
              {CONTACT_EMAIL}
            </a>
          </div>
          <div className="rounded-2xl border border-white/5 bg-slate-900/50 p-6">
            <h2 className="text-sm font-bold text-white">Common Requests</h2>
            <ul className="mt-3 space-y-2 text-xs leading-6 text-slate-400">
              <li>• Report a game that isn&apos;t working</li>
              <li>• Request a game to be added</li>
              <li>• Advertising and sponsorship</li>
              <li>• Copyright or DMCA notices</li>
              <li>• Partnership opportunities</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-white/5 bg-slate-900/50 p-6">
            <h2 className="text-sm font-bold text-white">Response Times</h2>
            <p className="mt-2 text-xs leading-6 text-slate-400">
              General inquiries: within 24 hours.
              <br />
              DMCA requests: within 48 hours.
              <br />
              We read everything, no matter how small.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
