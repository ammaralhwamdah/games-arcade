import type { Metadata } from "next";
import { SITE_NAME, CONTACT_EMAIL } from "@/lib/site";

export const metadata: Metadata = {
  title: "DMCA Policy",
  description: `DMCA policy for ${SITE_NAME}. How to submit a copyright removal request for games hosted on our website.`,
  alternates: { canonical: "/dmca" },
};

export default function DmcaPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
      <h1 className="text-3xl font-black text-white">DMCA Policy</h1>
      <p className="mt-2 text-sm text-slate-500">Last updated: January 1, 2026</p>
      <p className="mt-4 text-sm leading-7 text-slate-400">
        {SITE_NAME} respects the intellectual property rights of others and expects its users to do
        the same. In accordance with the Digital Millennium Copyright Act (DMCA), we will respond
        expeditiously to valid notices of alleged copyright infringement submitted to our designated
        agent.
      </p>

      <div className="mt-8 space-y-6">
        <section className="rounded-2xl border border-white/5 bg-slate-900/50 p-6">
          <h2 className="text-lg font-bold text-white">Filing a DMCA Notice</h2>
          <div className="mt-3 space-y-3 text-sm leading-7 text-slate-400">
            <p>
              If you believe that a game or any content on our website infringes your copyright, please
              send us a written notification that includes the following information:
            </p>
            <ol className="list-decimal space-y-2 pl-5">
              <li>
                A physical or electronic signature of the copyright owner or a person authorized to act
                on their behalf.
              </li>
              <li>Identification of the copyrighted work claimed to have been infringed.</li>
              <li>
                Identification of the material that is claimed to be infringing and where it is located
                (such as the game URL on our website), so we can locate it.
              </li>
              <li>Your name, address, telephone number, and email address.</li>
              <li>
                A statement that you have a good-faith belief that the disputed use is not authorized
                by the copyright owner, its agent, or the law.
              </li>
              <li>
                A statement, made under penalty of perjury, that the information in your notice is
                accurate and that you are the copyright owner or authorized to act on their behalf.
              </li>
            </ol>
            <p>
              Send your notice to our designated agent at{" "}
              <a className="text-violet-400 hover:text-violet-300" href={`mailto:${CONTACT_EMAIL}`}>
                {CONTACT_EMAIL}
              </a>
              . Please include "DMCA Notice" in the subject line.
            </p>
          </div>
        </section>

        <section className="rounded-2xl border border-white/5 bg-slate-900/50 p-6">
          <h2 className="text-lg font-bold text-white">What Happens Next</h2>
          <div className="mt-3 space-y-3 text-sm leading-7 text-slate-400">
            <p>
              Upon receipt of a valid notice, we will promptly review it and remove or disable access
              to the allegedly infringing content. We may also notify the user who posted the content
              so they can submit a counter-notification.
            </p>
            <p>
              If we receive a valid counter-notification stating that the material was removed by
              mistake or misidentification, we may restore the content after a reasonable time, in
              accordance with the DMCA.
            </p>
          </div>
        </section>

        <section className="rounded-2xl border border-white/5 bg-slate-900/50 p-6">
          <h2 className="text-lg font-bold text-white">Good-Faith Notice</h2>
          <div className="mt-3 space-y-3 text-sm leading-7 text-slate-400">
            <p>
              Please note that knowingly submitting a false or misleading DMCA notice may result in
              liability for damages, including costs and attorney&apos;s fees, under Section 512(f) of
              the DMCA. Please make sure you own the rights or are authorized to act on the owner&apos;s
              behalf before submitting a notice.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
