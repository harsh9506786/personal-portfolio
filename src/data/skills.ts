import { Brain, Cloud, Database, Layout, Server, Smartphone } from "lucide-react";
import type { SkillGroup } from "@/types";

export const skillGroups: SkillGroup[] = [
  {
    id: "frontend",
    title: "Frontend",
    icon: Layout,
    items: [
      { name: "React.js", short: "Re" },
      { name: "Next.js", short: "Nx" },
      { name: "JavaScript", short: "JS" },
      { name: "TypeScript", short: "TS" },
      { name: "HTML", short: "Ht" },
      { name: "CSS", short: "Cs" },
      { name: "Tailwind CSS", short: "Tw" },
    ],
  },
  {
    id: "mobile",
    title: "Mobile Development",
    icon: Smartphone,
    items: [
      { name: "React Native", short: "RN" },
      { name: "Flutter", short: "Fl" },
      { name: "Dart", short: "Da" },
    ],
  },
  {
    id: "backend",
    title: "Backend",
    icon: Server,
    items: [
      { name: "Node.js", short: "No" },
      { name: "Express.js", short: "Ex" },
      { name: "REST APIs", short: "Rs" },
      { name: "GraphQL", short: "Gq" },
    ],
  },
  {
    id: "database",
    title: "Database",
    icon: Database,
    items: [
      { name: "MongoDB", short: "Mo" },
      { name: "MySQL", short: "My" },
      { name: "PostgreSQL", short: "Pg" },
      { name: "Firebase", short: "Fb" },
    ],
  },
  {
    id: "cloud",
    title: "Cloud & DevOps",
    icon: Cloud,
    items: [
      { name: "AWS", short: "Aw" },
      { name: "Docker", short: "Dk" },
      { name: "Git", short: "Gi" },
      { name: "GitHub Actions", short: "GA" },
    ],
  },
  {
    id: "ai",
    title: "AI & Automation",
    icon: Brain,
    items: [
      { name: "AI API Integrations", short: "Ai" },
      { name: "LLM Integrations", short: "Ll" },
      { name: "Workflow Automation", short: "Wf" },
      { name: "AI-powered Applications", short: "Ap" },
    ],
  },
];
