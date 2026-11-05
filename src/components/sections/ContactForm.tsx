"use client";

import { useEffect, useId, useRef, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { AlertCircle, LoaderCircle, Send } from "lucide-react";
import { Select } from "@/components/ui/Select";
import { WhatsAppIcon } from "@/components/ui/WhatsAppButton";
import { getWhatsAppUrl } from "@/lib/config";
import {
  LIMITS,
  PROJECT_TYPES,
  validateContact,
  type ContactErrors,
  type ContactValues,
} from "@/lib/validation";

type Status =
  | { state: "idle" }
  | { state: "submitting" }
  | { state: "success" }
  | { state: "error"; message: string; offerFallback: boolean };

const empty: ContactValues = {
  name: "",
  email: "",
  phone: "",
  projectType: "",
  details: "",
};

const fieldBase =
  "w-full rounded-2xl border-2 bg-paper px-4 py-3.5 text-base text-ink placeholder:text-mute-light transition-[border-color,box-shadow] duration-200 focus:border-ink focus:shadow-[3px_3px_0_0_var(--color-amber)] focus:outline-none aria-[invalid=true]:border-red-600";

export function ContactForm() {
  const uid = useId();
  const reduceMotion = useReducedMotion();
  const [values, setValues] = useState<ContactValues>(empty);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState<Status>({ state: "idle" });
  const startedAt = useRef(0);
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  useEffect(() => {
    if (status.state === "success") successRef.current?.focus();
  }, [status.state]);

  const id = (k: string) => `${uid}-${k}`;

  function update<K extends keyof ContactValues>(
    key: K,
    value: ContactValues[K],
  ) {
    setValues((v) => ({ ...v, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  }

  function validateField(key: keyof ContactValues) {
    const found = validateContact(values)[key];
    setErrors((e) => ({ ...e, [key]: found }));
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status.state === "submitting") return;

    const found = validateContact(values);
    setErrors(found);
    const firstInvalid = (Object.keys(found) as (keyof ContactValues)[])[0];
    if (firstInvalid) {
      formRef.current
        ?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)
        ?.focus();
      return;
    }

    setStatus({ state: "submitting" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          company: honeypot,
          elapsedMs: Date.now() - startedAt.current,
        }),
      });
      const body = (await res.json().catch(() => ({}))) as {
        code?: string;
        errors?: ContactErrors;
        message?: string;
      };

      if (res.ok && body.code === "ok") {
        setStatus({ state: "success" });
        setValues(empty);
        return;
      }
      if (res.status === 422 && body.errors) {
        setErrors(body.errors);
        setStatus({ state: "idle" });
        return;
      }
      if (body.code === "too_fast") {
        setStatus({
          state: "error",
          message:
            "That was a little quick. Please give it a moment and press send again.",
          offerFallback: false,
        });
        return;
      }
      if (body.code === "not_configured") {
        setStatus({
          state: "error",
          message:
            "The contact form isn't connected yet, so your message was not sent. Please reach out on WhatsApp instead.",
          offerFallback: true,
        });
        return;
      }
      if (res.status === 429) {
        setStatus({
          state: "error",
          message: body.message ?? "Too many messages. Please try again later.",
          offerFallback: true,
        });
        return;
      }
      setStatus({
        state: "error",
        message:
          "Something went wrong and your message was not sent. Please try again, or message me on WhatsApp.",
        offerFallback: true,
      });
    } catch {
      setStatus({
        state: "error",
        message:
          "Couldn't reach the server. Check your connection and try again.",
        offerFallback: true,
      });
    }
  }

  if (status.state === "success") {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        role="status"
        className="flex flex-col items-center overflow-hidden rounded-[2rem] border-2 border-ink bg-cream px-6 pt-6 pb-8 text-center outline-none sm:px-10"
      >
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 140 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 70, damping: 15 }}
          className="w-56 sm:w-60"
        >
          <Image
            src="/avatar/thumbsup-cutout.webp"
            alt="Harshvardhan giving two thumbs up"
            width={745}
            height={1150}
            sizes="240px"
            priority
            className="h-auto w-full"
          />
        </motion.div>
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="-mt-3 flex flex-col items-center gap-3"
        >
          <h3 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
            Message sent!
          </h3>
          <p className="max-w-md text-base text-mute">
            Your message was sent successfully. I&apos;ll reach out to you very
            soon.
          </p>
          <button
            type="button"
            onClick={() => {
              setStatus({ state: "idle" });
              startedAt.current = Date.now();
            }}
            className="mt-2 min-h-11 rounded-full border-2 border-ink px-5 font-display font-bold transition-colors hover:bg-ink hover:text-cream"
          >
            Send another message
          </button>
        </motion.div>
      </div>
    );
  }

  const submitting = status.state === "submitting";
  const describedBy = (k: keyof ContactValues) =>
    errors[k] ? `${id(k)}-error` : undefined;

  const error = (k: keyof ContactValues) =>
    errors[k] ? (
      <p
        id={`${id(k)}-error`}
        className="mt-1.5 flex items-center gap-1.5 text-sm font-medium text-red-700"
      >
        <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
        {errors[k]}
      </p>
    ) : null;

  const label = "mb-2 block font-display text-sm font-bold tracking-tight";

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      noValidate
      className="space-y-5 rounded-[2rem] border-2 border-ink bg-cream p-6 shadow-[8px_8px_0_0_var(--color-amber)] sm:p-9"
    >
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={id("name")} className={label}>
            Your Name
          </label>
          <input
            id={id("name")}
            name="name"
            type="text"
            autoComplete="name"
            required
            maxLength={LIMITS.name}
            value={values.name}
            onChange={(e) => update("name", e.target.value)}
            onBlur={() => validateField("name")}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={describedBy("name")}
            placeholder="Rahul Sharma"
            className={fieldBase}
          />
          {error("name")}
        </div>
        <div>
          <label htmlFor={id("email")} className={label}>
            Email Address
          </label>
          <input
            id={id("email")}
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            required
            maxLength={LIMITS.email}
            value={values.email}
            onChange={(e) => update("email", e.target.value)}
            onBlur={() => validateField("email")}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={describedBy("email")}
            placeholder="rahul.sharma@gmail.com"
            className={fieldBase}
          />
          {error("email")}
        </div>
      </div>

      <div>
        <label htmlFor={id("phone")} className={label}>
          Contact Number
        </label>
        <input
          id={id("phone")}
          name="phone"
          type="tel"
          autoComplete="tel"
          inputMode="tel"
          required
          maxLength={LIMITS.phone}
          value={values.phone}
          onChange={(e) => update("phone", e.target.value)}
          onBlur={() => validateField("phone")}
          aria-invalid={Boolean(errors.phone)}
          aria-describedby={describedBy("phone")}
          placeholder="+91 98765 43210"
          className={fieldBase}
        />
        {error("phone")}
      </div>

      <div>
        <label htmlFor={id("projectType")} className={label}>
          Project Type
        </label>
        <Select
          id={id("projectType")}
          name="projectType"
          value={values.projectType}
          options={PROJECT_TYPES}
          placeholder="Select a type…"
          onChange={(v) => update("projectType", v)}
          onBlur={() => validateField("projectType")}
          invalid={Boolean(errors.projectType)}
          describedBy={describedBy("projectType")}
          className={fieldBase}
        />
        {error("projectType")}
      </div>

      <div>
        <label htmlFor={id("details")} className={label}>
          Project Details{" "}
          <span className="font-normal text-mute">(optional)</span>
        </label>
        <textarea
          id={id("details")}
          name="details"
          rows={5}
          maxLength={LIMITS.details}
          value={values.details}
          onChange={(e) => update("details", e.target.value)}
          onBlur={() => validateField("details")}
          aria-invalid={Boolean(errors.details)}
          aria-describedby={describedBy("details")}
          placeholder="What are you building, who is it for, and when would you like it done?"
          className={`${fieldBase} resize-y`}
        />
        <div className="mt-1.5 flex justify-between gap-4">
          <div>{error("details")}</div>
          <p className="ml-auto text-xs text-mute" aria-hidden="true">
            {values.details.length}/{LIMITS.details}
          </p>
        </div>
      </div>

      {/* Honeypot: invisible to people, tempting to bots */}
      <div
        className="absolute -left-[9999px] h-0 w-0 overflow-hidden"
        aria-hidden="true"
      >
        <label htmlFor={id("company")}>Company (leave empty)</label>
        <input
          id={id("company")}
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>

      {status.state === "error" && (
        <div
          role="alert"
          className="rounded-2xl border-2 border-red-700 bg-red-50 p-4 text-sm font-medium text-red-900"
        >
          <p className="flex items-start gap-2">
            <AlertCircle
              className="mt-0.5 h-4 w-4 shrink-0"
              aria-hidden="true"
            />
            {status.message}
          </p>
          {status.offerFallback && (
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex min-h-11 items-center rounded-full bg-ink px-5 font-display font-bold text-cream"
            >
              Message me on WhatsApp
            </a>
          )}
        </div>
      )}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={submitting}
          className="group inline-flex min-h-14 w-full items-center justify-center gap-3 rounded-full border-2 border-ink bg-amber px-7 font-display text-base font-bold shadow-[3px_3px_0_0_var(--color-ink)] transition-[transform,box-shadow] duration-300 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0_0_var(--color-ink)] active:translate-x-0 active:translate-y-0 active:shadow-[1px_1px_0_0_var(--color-ink)] disabled:pointer-events-none disabled:opacity-70 sm:w-auto"
        >
          {submitting ? (
            <>
              <LoaderCircle
                className="h-5 w-5 animate-spin"
                aria-hidden="true"
              />
              Sending…
            </>
          ) : (
            <>
              Send Message
              <Send
                className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </>
          )}
        </button>
        <a
          href={getWhatsAppUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex min-h-14 w-full items-center justify-center gap-2.5 rounded-full border-2 border-ink px-6 font-display text-base font-bold transition-colors duration-300 hover:bg-ink hover:text-cream sm:w-auto"
        >
          <WhatsAppIcon className="h-5 w-5 text-wa" />
          Chat on WhatsApp
        </a>
      </div>
    </form>
  );
}
