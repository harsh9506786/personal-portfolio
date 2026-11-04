import { Accent, SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceList } from "@/components/sections/ServiceList";
import { servicesIntro } from "@/data/services";

export function Services() {
  return (
    <section
      id="services"
      aria-labelledby="services-title"
      className="px-5 py-14 sm:px-8 sm:py-20"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          id="services-title"
          eyebrow="My Services"
          title={
            <>
              How I Bring <Accent>Ideas</Accent> to Life.
            </>
          }
          description={servicesIntro}
          className="mb-8 sm:mb-10"
        />
        <ServiceList />
      </div>
    </section>
  );
}
