import { Accent, SectionHeading } from "@/components/ui/SectionHeading";
import { skillGroups } from "@/data/skills";

export function Skills() {
  return (
    <section
      id="skills"
      aria-labelledby="skills-title"
      className="relative overflow-hidden bg-ink px-5 py-14 text-cream sm:px-8 sm:py-20"
    >
      <div
        className="pointer-events-none absolute -top-40 -right-40 h-[32rem] w-[32rem] rounded-full border-[4rem] border-amber/10"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-6xl">
        <SectionHeading
          id="skills-title"
          tone="dark"
          eyebrow="Skills & Stack"
          title={
            <>
              The Technology Behind the <Accent tone="dark">Experience.</Accent>
            </>
          }
          className="mb-8 sm:mb-12"
        />

        <div className="divide-y divide-cream/15 border-y border-cream/15">
          {skillGroups.map(({ id, title, icon: Icon, items }) => (
            <div
              key={id}
              className="grid grid-cols-1 items-start gap-5 py-7 sm:py-9 md:grid-cols-[17rem_1fr] md:gap-10"
            >
              <h3
                data-reveal
                className="flex items-center gap-3 font-display text-lg font-bold tracking-tight sm:text-xl"
              >
                <span className="grid h-10 w-10 place-items-center rounded-full bg-amber text-ink">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                {title}
              </h3>
              <ul className="flex flex-wrap gap-2.5 sm:gap-3" data-stagger>
                {items.map((item) => (
                  <li
                    key={item.name}
                    className="group flex min-h-12 cursor-default items-center gap-3 rounded-2xl border border-cream/15 bg-cream/[0.03] py-2 pr-4 pl-2 transition-[background-color,color,transform,border-color] duration-300 hover:-translate-y-1 hover:border-amber hover:bg-amber hover:text-ink"
                  >
                    <span
                      className="grid h-8 w-8 place-items-center rounded-xl bg-cream/10 font-display text-xs font-extrabold text-amber transition-colors duration-300 group-hover:bg-ink"
                      aria-hidden="true"
                    >
                      {item.short}
                    </span>
                    <span className="text-sm font-semibold sm:text-[15px]">{item.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
