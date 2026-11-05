/** Shared by the contact form (client) and the API route (server). */

export const PROJECT_TYPES = [
  "Website",
  "Mobile App",
  "AI Solution / Automation",
  "Something else",
] as const;

export interface ContactValues {
  name: string;
  email: string;
  phone: string;
  projectType: string;
  details: string;
}

export type ContactErrors = Partial<Record<keyof ContactValues, string>>;

export const LIMITS = { name: 80, email: 120, phone: 20, details: 3000 } as const;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
// Optional leading +, then digits, spaces, hyphens and brackets, e.g. +91 98765 43210
const PHONE_RE = /^\+?[\d\s()-]+$/;

export function validateContact(values: ContactValues): ContactErrors {
  const errors: ContactErrors = {};
  const name = values.name.trim();
  const email = values.email.trim();
  const phone = values.phone.trim();
  const details = values.details.trim();

  if (name.length < 2) errors.name = "Please enter your name.";
  else if (name.length > LIMITS.name) errors.name = `Keep your name under ${LIMITS.name} characters.`;

  if (!email) errors.email = "Please enter your email address.";
  else if (!EMAIL_RE.test(email) || email.length > LIMITS.email)
    errors.email = "That email address doesn't look right.";

  // Contact number is required and must look like a real number.
  const digits = phone.replace(/\D/g, "");
  if (!phone) errors.phone = "Please enter your contact number.";
  else if (!PHONE_RE.test(phone) || phone.length > LIMITS.phone || digits.length < 7 || digits.length > 15)
    errors.phone = "That contact number doesn't look right.";

  if (!(PROJECT_TYPES as readonly string[]).includes(values.projectType))
    errors.projectType = "Please choose a project type.";

  // Project details are optional; only the maximum length is enforced.
  if (details.length > LIMITS.details) errors.details = `Please keep this under ${LIMITS.details} characters.`;

  return errors;
}