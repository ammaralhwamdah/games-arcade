import type { Metadata } from "next";
import Link from "next/link";
import { SITE_NAME, CONTACT_EMAIL, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy Policy for ${SITE_NAME}. Learn how we collect, use and protect your information when you use our free online games website.`,
  alternates: { canonical: "/privacy" },
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-white/5 bg-slate-900/50 p-6">
      <h2 className="text-lg font-bold text-white">{title}</h2>
      <div className="mt-3 space-y-3 text-sm leading-7 text-slate-400">{children}</div>
    </section>
  );
}

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
      <h1 className="text-3xl font-black text-white">Privacy Policy</h1>
      <p className="mt-2 text-sm text-slate-500">
        Last updated: January 1, 2026
      </p>
      <p className="mt-4 text-sm leading-7 text-slate-400">
        This Privacy Policy explains how {SITE_NAME} ("we", "us", or "our") collects, uses, and
        protects information about you when you visit our website at{" "}
        <a className="text-violet-400 hover:text-violet-300" href={SITE_URL}>
          {SITE_URL.replace("https://", "")}
        </a>{" "}
        and play the free games we host. By using our website, you agree to the practices described
        in this policy.
      </p>

      <div className="mt-8 space-y-6">
        <Section title="1. Information We Collect">
          <p>
            <strong className="text-slate-200">Information you provide voluntarily:</strong> When
            you contact us through our contact form, we receive your name, email address, and the
            content of your message. We use this only to respond to your inquiry.
          </p>
          <p>
            <strong className="text-slate-200">Information collected automatically:</strong> When you
            visit our website, we may automatically collect technical information such as your IP
            address, browser type, device type, operating system, pages visited, time spent, and
            referring URLs. This helps us understand how the site is used and keep it secure.
          </p>
          <p>
            We do <strong className="text-slate-200">not</strong> require you to create an account and
            we do <strong className="text-slate-200">not</strong> collect personal information such as
            your name or email to play games. Playing games is anonymous.
          </p>
        </Section>

        <Section title="2. Cookies and Similar Technologies">
          <p>
            We use cookies and similar technologies (local storage, beacons) to improve your
            experience, remember preferences, and measure site performance. Cookies are small text
            files stored on your device.
          </p>
          <p>
            We may also use cookies for advertising purposes through third-party advertising
            partners, including Google AdSense. See our{" "}
            <Link className="text-violet-400 hover:text-violet-300" href="/cookies">
              Cookie Policy
            </Link>{" "}
            for full details and how to control cookies.
          </p>
        </Section>

        <Section title="3. Advertising and Third-Party Advertisers">
          <p>
            We display advertisements through third-party advertising networks, including Google
            AdSense. These networks may use cookies to serve ads based on your prior visits to this
            and other websites. Google&apos;s use of advertising cookies enables it and its partners to
            serve ads to you based on your visits to our site and/or other sites on the Internet.
          </p>
          <p>
            You can opt out of personalized advertising by visiting Google&apos;s Ads Settings at{" "}
            <a
              className="text-violet-400 hover:text-violet-300"
              href="https://www.google.com/settings/ads"
              rel="noopener noreferrer"
              target="_blank"
            >
              google.com/settings/ads
            </a>{" "}
            or by visiting the opt-out page of the Network Advertising Initiative at{" "}
            <a
              className="text-violet-400 hover:text-violet-300"
              href="https://www.networkadvertising.org/managing/opt_out.asp"
              rel="noopener noreferrer"
              target="_blank"
            >
              networkadvertising.org
            </a>
            .
          </p>
        </Section>

        <Section title="4. Third-Party Game Content">
          <p>
            The games on our website are embedded from third-party sources and may run inside an
            isolated iframe. These games are provided by third parties and we encourage you to review
            their own privacy practices. We do not share your personal information with these game
            providers.
          </p>
        </Section>

        <Section title="5. Analytics">
          <p>
            We may use web analytics services to collect anonymized, aggregate usage data to improve
            our website. These services may use cookies or similar technologies to collect
            non-identifying information.
          </p>
        </Section>

        <Section title="6. Children's Privacy">
          <p>
            Our website is a general audience site and is not directed at children under 13 years of
            age. We do not knowingly collect personal information from children under 13. If you are a
            parent or guardian and believe your child has provided us with personal information,
            please contact us and we will promptly delete it.
          </p>
        </Section>

        <Section title="7. How We Use Information">
          <p>
            We use the information we collect to operate and maintain the website, improve content
            and user experience, respond to user inquiries, ensure security, and comply with legal
            obligations. We do not sell your personal information to third parties.
          </p>
        </Section>

        <Section title="8. Data Retention and Security">
          <p>
            We retain information only as long as necessary for the purposes described in this policy
            or as required by law. We implement reasonable technical and organizational measures to
            protect your information. However, no method of transmission over the Internet is 100%
            secure.
          </p>
        </Section>

        <Section title="9. Your Rights (GDPR / CCPA)">
          <p>
            Depending on your location, you may have the right to access, correct, delete, or restrict
            the use of your personal information, and to object to its processing. To exercise these
            rights, contact us using the details below.
          </p>
        </Section>

        <Section title="10. Changes to This Policy">
          <p>
            We may update this Privacy Policy from time to time. The most current version will always
            be posted on this page with the "Last updated" date at the top. We encourage you to review
            this page periodically.
          </p>
        </Section>

        <Section title="11. Contact Us">
          <p>
            If you have any questions about this Privacy Policy, please contact us at{" "}
            <a className="text-violet-400 hover:text-violet-300" href={`mailto:${CONTACT_EMAIL}`}>
              {CONTACT_EMAIL}
            </a>{" "}
            or through our{" "}
            <Link className="text-violet-400 hover:text-violet-300" href="/contact">
              contact page
            </Link>
            .
          </p>
        </Section>
      </div>
    </div>
  );
}
