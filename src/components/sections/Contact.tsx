import dynamic from "next/dynamic";
import { ArrowUpRight, Mail } from "lucide-react";
import { Accent, SectionHeading } from "@/components/ui/SectionHeading";
import { WhatsAppIcon } from "@/components/ui/WhatsAppButton";
import { getWhatsAppUrl, siteConfig } from "@/lib/config";

const ContactForm = dynamic(() =>
  import("@/components/sections/ContactForm").then((m) => m.ContactForm),
);

const methodClass =
  "group flex min-h-16 items-center gap-4 rounded-2xl border border-cream/20 p-4 transition-colors duration-300 hover:border-amber hover:bg-cream/5";

export function Contact() {
  const { email } = siteConfig.contact;

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="relative bg-ink px-5 py-14 text-cream sm:px-8 sm:py-20"
    >
      <div className="mx-auto grid grid-cols-1 max-w-6xl gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12">
        <div>
          <SectionHeading
            id="contact-title"
            tone="dark"
            eyebrow="Get In Touch"
            title={
              <>
                Let&apos;s Build Something <Accent tone="dark">Great</Accent> Together.
              </>
            }
            description="Have a project in mind? Tell me what you're planning, and let's explore how we can bring it to life."
          />

          <ul className="mt-10 space-y-3" data-stagger>
            <li>
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className={methodClass}
              >
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-wa text-white">
                  <WhatsAppIcon className="h-6 w-6" />
                </span>
                <span className="flex-1">
                  <span className="block font-display font-bold">WhatsApp</span>
                  <span className="block text-sm text-cream/65">Usually the fastest way to reach me</span>
                </span>
                <ArrowUpRight
                  className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </a>
            </li>
            {email && (
              <li>
                <a href={`mailto:${email}`} className={methodClass}>
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-amber text-ink">
                    <Mail className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-display font-bold">Email</span>
                    <span className="block truncate text-sm text-cream/65">{email}</span>
                  </span>
                  <ArrowUpRight
                    className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden="true"
                  />
                </a>
              </li>
            )}
          </ul>

          <ul className="mt-8 flex flex-wrap gap-2" aria-label="Social profiles">
            {siteConfig.socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer me"
                  className="inline-flex min-h-11 items-center gap-1.5 rounded-full border border-cream/25 px-4 text-sm font-semibold transition-colors duration-300 hover:border-amber hover:bg-amber hover:text-ink"
                >
                  {s.label}
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div data-reveal data-reveal-delay="0.1" className="text-ink">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
