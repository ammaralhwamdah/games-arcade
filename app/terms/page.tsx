import type { Metadata } from "next";
import Link from "next/link";
import { SITE_NAME, CONTACT_EMAIL, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `Terms of Service for ${SITE_NAME}. The rules and guidelines for using our free online games website.`,
  alternates: { canonical: "/terms" },
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-white/5 bg-slate-900/50 p-6">
      <h2 className="text-lg font-bold text-white">{title}</h2>
      <div className="mt-3 space-y-3 text-sm leading-7 text-slate-400">{children}</div>
    </section>
  );
}

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
      <h1 className="text-3xl font-black text-white">Terms of Service</h1>
      <p className="mt-2 text-sm text-slate-500">Last updated: January 1, 2026</p>
      <p className="mt-4 text-sm leading-7 text-slate-400">
        Welcome to {SITE_NAME}. These Terms of Service ("Terms") govern your access to and use of the
        website at{" "}
        <a className="text-violet-400 hover:text-violet-300" href={SITE_URL}>
          {SITE_URL.replace("https://", "")}
        </a>{" "}
        and any content, features, or games available through it. By accessing or using our website,
        you agree to be bound by these Terms.
      </p>

      <div className="mt-8 space-y-6">
        <Section title="1. Acceptance of Terms">
          <p>
            By using our website you confirm that you are at least 13 years old (or the minimum legal
            age in your country) and that you accept these Terms. If you do not agree, please do not
            use the website.
          </p>
        </Section>

        <Section title="2. License to Use">
          <p>
            We grant you a limited, non-exclusive, non-transferable, revocable license to access and
            play the games available on our website for your personal, non-commercial entertainment.
            You may not copy, modify, distribute, sell, or exploit any part of the website or its
            content for commercial purposes without our prior written consent.
          </p>
        </Section>

        <Section title="3. Games Provided by Third Parties">
          <p>
            Many games on our website are embedded from third-party sources and remain the property
            of their respective owners. These games are provided "as is" and we do not claim
            ownership of them. We are not responsible for the availability, accuracy, or performance
            of third-party game content. If you believe a game infringes your rights, please see our{" "}
            <Link className="text-violet-400 hover:text-violet-300" href="/dmca">
              DMCA page
            </Link>
            .
          </p>
        </Section>

        <Section title="4. Prohibited Conduct">
          <p>
            You agree not to: (a) use the website for any unlawful purpose; (b) attempt to gain
            unauthorized access to any part of the website, servers, or systems; (c) interfere with
            the proper working of the website; (d) reverse engineer or tamper with any software
            powering the website; (e) upload or distribute any malicious code; or (f) use the website
            in a way that harasses, abuses, or harms others.
          </p>
        </Section>

        <Section title="5. Intellectual Property">
          <p>
            The {SITE_NAME} name, logo, design, layout, and original content (excluding third-party
            games) are protected by applicable intellectual property laws and belong to us or our
            licensors.
          </p>
        </Section>

        <Section title="6. Disclaimer of Warranties">
          <p>
            Our website is provided on an "as is" and "as available" basis without warranties of any
            kind, whether express or implied, including but not limited to implied warranties of
            merchantability, fitness for a particular purpose, or non-infringement. We do not warrant
            that the website will be uninterrupted, error-free, or free of harmful components.
          </p>
        </Section>

        <Section title="7. Limitation of Liability">
          <p>
            To the fullest extent permitted by law, {SITE_NAME} and its owners, employees, and agents
            shall not be liable for any indirect, incidental, special, consequential, or punitive
            damages, or any loss of profits or revenues, whether incurred directly or indirectly, in
            connection with your use of the website.
          </p>
        </Section>

        <Section title="8. Advertisements">
          <p>
            Our website displays advertisements to support its operation. Advertisements are served by
            third-party ad networks and are not part of our editorial content. We are not responsible
            for the content of advertisements or the websites they link to.
          </p>
        </Section>

        <Section title="9. External Links">
          <p>
            Our website may contain links to third-party websites. We have no control over the content,
            privacy practices, or policies of these external sites and accept no responsibility for
            them. Visiting external sites is at your own risk.
          </p>
        </Section>

        <Section title="10. Modifications to the Service">
          <p>
            We may modify, suspend, or discontinue any part of the website, including games,
            features, or these Terms, at any time without prior notice.
          </p>
        </Section>

        <Section title="11. Governing Law">
          <p>
            These Terms shall be governed by and construed in accordance with the laws applicable to
            the operator of {SITE_NAME}, without regard to conflict-of-law principles.
          </p>
        </Section>

        <Section title="12. Contact">
          <p>
            If you have any questions about these Terms, contact us at{" "}
            <a className="text-violet-400 hover:text-violet-300" href={`mailto:${CONTACT_EMAIL}`}>
              {CONTACT_EMAIL}
            </a>
            .
          </p>
        </Section>
      </div>
    </div>
  );
}
