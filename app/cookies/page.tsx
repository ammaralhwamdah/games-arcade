import type { Metadata } from "next";
import { SITE_NAME, CONTACT_EMAIL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: `Cookie Policy for ${SITE_NAME}. Learn about the cookies we use, how to control them, and your privacy choices.`,
  alternates: { canonical: "/cookies" },
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-white/5 bg-slate-900/50 p-6">
      <h2 className="text-lg font-bold text-white">{title}</h2>
      <div className="mt-3 space-y-3 text-sm leading-7 text-slate-400">{children}</div>
    </section>
  );
}

export default function CookiesPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
      <h1 className="text-3xl font-black text-white">Cookie Policy</h1>
      <p className="mt-2 text-sm text-slate-500">Last updated: January 1, 2026</p>
      <p className="mt-4 text-sm leading-7 text-slate-400">
        This Cookie Policy explains what cookies are, how {SITE_NAME} uses them, and how you can
        control them. It works together with our{" "}
        <a className="text-violet-400 hover:text-violet-300" href="/privacy">
          Privacy Policy
        </a>
        .
      </p>

      <div className="mt-8 space-y-6">
        <Section title="1. What Are Cookies?">
          <p>
            Cookies are small text files stored on your device (computer, tablet, or phone) when you
            visit a website. They are widely used to make websites work more efficiently and to
            provide information to website owners.
          </p>
        </Section>

        <Section title="2. Cookies We Use">
          <p>
            <strong className="text-slate-200">Essential cookies:</strong> These are necessary for the
            website to function, such as remembering your preferences or settings. They cannot be
            switched off.
          </p>
          <p>
            <strong className="text-slate-200">Performance cookies:</strong> These help us understand
            how visitors use our website, which pages are popular, and how to improve the experience.
            Data collected is aggregated and anonymous.
          </p>
          <p>
            <strong className="text-slate-200">Advertising cookies:</strong> These are used by our
            advertising partners (including Google AdSense) to measure ad performance and to show you
            relevant ads. Some may be based on your browsing activity across sites.
          </p>
        </Section>

        <Section title="3. Third-Party Cookies">
          <p>
            When you play games or view ads, third-party providers may set their own cookies. We do
            not control these cookies. For example:
          </p>
          <p>
            • <strong className="text-slate-200">Google AdSense</strong> uses cookies to serve and
            manage advertising. Learn more at{" "}
            <a
              className="text-violet-400 hover:text-violet-300"
              href="https://policies.google.com/technologies/ads"
              rel="noopener noreferrer"
              target="_blank"
            >
              policies.google.com/technologies/ads
            </a>
            .
          </p>
          <p>
            • <strong className="text-slate-200">Game providers</strong> may set cookies inside the
            embedded game iframes. Please review their privacy policies for details.
          </p>
        </Section>

        <Section title="4. How to Control Cookies">
          <p>
            You can control and/or delete cookies as you wish. You can delete all cookies already on
            your device and you can set most browsers to prevent them from being placed. If you do
            this, some parts of the website may not function fully.
          </p>
          <p>
            To opt out of personalized advertising, visit Google&apos;s Ads Settings (
            <a
              className="text-violet-400 hover:text-violet-300"
              href="https://www.google.com/settings/ads"
              rel="noopener noreferrer"
              target="_blank"
            >
              google.com/settings/ads
            </a>
            ) or{" "}
            <a
              className="text-violet-400 hover:text-violet-300"
              href="https://www.aboutads.info/choices"
              rel="noopener noreferrer"
              target="_blank"
            >
              aboutads.info/choices
            </a>
            . You can also use your browser&apos;s private or incognito mode.
          </p>
        </Section>

        <Section title="5. Browser Settings">
          <p>
            Most browsers allow you to view, manage, and delete cookies through their settings. Check
            the "Help" or "Settings" section of your browser for instructions.
          </p>
        </Section>

        <Section title="6. Updates to This Policy">
          <p>
            We may update this Cookie Policy from time to time. Any changes will be posted on this
            page with an updated "Last updated" date.
          </p>
        </Section>

        <Section title="7. Contact">
          <p>
            If you have any questions about our use of cookies, contact us at{" "}
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
