"use client";

import { useState } from "react";
import { services } from "@/data/services";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { AiArt, MobileArt, WebArt } from "@/components/ui/ServiceArt";

const art: Record<string, React.ReactNode> = {
  websites: <WebArt />,
  mobile: <MobileArt />,
  ai: <AiArt />,
};

/** One panel open at a time; the first is open by default so the section is never empty. */
export function ServiceList() {
  const [openId, setOpenId] = useState<string | null>(services[0]?.id ?? null);

  return (
    <div className="space-y-4 sm:space-y-5" data-stagger>
      {services.map((service) => (
        <ServiceCard
          key={service.id}
          service={service}
          open={openId === service.id}
          onToggle={() => setOpenId((cur) => (cur === service.id ? null : service.id))}
          art={art[service.id]}
        />
      ))}
    </div>
  );
}
