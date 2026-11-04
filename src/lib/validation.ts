/** Shared by the contact form (client) and the API route (server). */

export const PROJECT_TYPES = [
  "Website",
  "Mobile App",
  "AI Solution / Automation",
  "Something else",
] as const;

export const BUDGETS = [
  "Not sure yet",
  "Under $500",
  "$500 – $2,000",
  "$2,000 – $5,000",
  "$5,000+",
] as const;

export interface ContactValues {
  name: string;
  email: string;
  projectType: string;
  budget: string;
  details: string;
}

export type ContactErrors = Partial<Record<keyof ContactValues, string>>;

export const LIMITS = { name: 80, email: 120, details: 3000, detailsMin: 20 } as const;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateContact(values: ContactValues): ContactErrors {
  const errors: ContactErrors = {};
  const name = values.name.trim();
  const email = values.email.trim();
  const details = values.details.trim();

  if (name.length < 2) errors.name = "Please enter your name.";
  else if (name.length > LIMITS.name) errors.name = `Keep your name under ${LIMITS.name} characters.`;

  if (!email) errors.email = "Please enter your email address.";
  else if (!EMAIL_RE.test(email) || email.length > LIMITS.email)
    errors.email = "That email address doesn't look right.";

  if (!(PROJECT_TYPES as readonly string[]).includes(values.projectType))
    errors.projectType = "Please choose a project type.";

  if (values.budget && !(BUDGETS as readonly string[]).includes(values.budget))
    errors.budget = "Please choose one of the listed budgets.";

  if (details.length < LIMITS.detailsMin)
    errors.details = `Tell me a little more (at least ${LIMITS.detailsMin} characters).`;
  else if (details.length > LIMITS.details)
    errors.details = `Please keep this under ${LIMITS.details} characters.`;

  return errors;
}
