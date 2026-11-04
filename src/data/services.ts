import { Bot, Globe, Smartphone } from "lucide-react";
import type { Service } from "@/types";

export const servicesIntro =
  "From the first idea to the final product, I help turn business requirements into powerful digital experiences.";

export const services: Service[] = [
  {
    id: "websites",
    index: "01",
    title: "Website Development",
    tagline: "Sites that load fast and sell.",
    description:
      "Responsive, search-friendly websites and web apps that make a strong first impression and turn visitors into customers.",
    capabilities: [
      "Business Websites",
      "Landing Pages",
      "E-commerce Websites",
      "Custom Web Applications",
      "Responsive Web Design",
    ],
    tone: "cream",
    icon: Globe,
  },
  {
    id: "mobile",
    index: "02",
    title: "Mobile App Development",
    tagline: "Apps people keep on their home screen.",
    description:
      "Smooth, native-feeling apps for Android and iOS, built once with modern cross-platform tooling.",
    capabilities: [
      "Android Applications",
      "iOS Applications",
      "Cross-platform Applications",
      "Custom App Development",
    ],
    tone: "dark",
    icon: Smartphone,
  },
  {
    id: "ai",
    index: "03",
    title: "AI Solutions & Automation",
    tagline: "Let software handle the repetitive work.",
    description:
      "Practical AI features and automations that save time, answer customers and connect the tools your business already uses.",
    capabilities: [
      "AI-powered Applications",
      "AI Chatbots",
      "Workflow Automation",
      "Intelligent Business Solutions",
      "API Integrations",
    ],
    tone: "orange",
    icon: Bot,
  },
];
