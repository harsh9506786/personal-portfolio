import { NextResponse } from "next/server";
import { siteConfig } from "@/lib/config";
import { validateContact, type ContactValues } from "@/lib/validation";

export const runtime = "nodejs";

/**
 * Contact form endpoint.
 *
 * Environment variables (see .env.example):
 *   RESEND_API_KEY      REQUIRED. API key from https://resend.com
 *   CONTACT_TO_EMAIL    Optional. Where enquiries are delivered (default: the contact email in lib/config.ts)
 *   CONTACT_FROM_EMAIL  Optional. Sender address (default: Resend's onboarding@resend.dev, which can
 *                       only deliver to the email you signed up to Resend with)
 *
 * Without RESEND_API_KEY the route answers 503 `not_configured`, and the form says so
 * honestly. It never pretends a message was sent.
 *
 * Spam protection: honeypot field, minimum-fill-time check, same-origin check, body-size
 * cap, strict validation and a per-IP rate limit. For stronger protection add a CAPTCHA
 * such as Cloudflare Turnstile and verify its token here.
 */

const MAX_BODY_BYTES = 12_000;
const MIN_FILL_MS = 2_500;
const RATE_LIMIT = 5; // requests
const RATE_WINDOW_MS = 60 * 60 * 1000; // per hour

// In-memory limiter: fine for a single instance. Use Redis/Upstash for multi-instance deploys.
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  if (recent.length >= RATE_LIMIT) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  // Opportunistic cleanup so the map can't grow without bound.
  if (hits.size > 5_000) {
    for (const [key, times] of hits) {
      if (times.every((t) => now - t >= RATE_WINDOW_MS)) hits.delete(key);
    }
  }
  return false;
}

const escapeHtml = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

function json(body: Record<string, unknown>, status: number) {
  return NextResponse.json(body, { status, headers: { "Cache-Control": "no-store" } });
}

export async function POST(request: Request) {
  // Same-origin only
  const origin = request.headers.get("origin");
  const host = request.headers.get("host");
  if (origin && host) {
    try {
      if (new URL(origin).host !== host) return json({ code: "forbidden" }, 403);
    } catch {
      return json({ code: "forbidden" }, 403);
    }
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (rateLimited(ip)) {
    return json({ code: "rate_limited", message: "Too many messages. Please try again later." }, 429);
  }

  const raw = await request.text();
  if (raw.length > MAX_BODY_BYTES) return json({ code: "too_large" }, 413);

  let data: Record<string, unknown>;
  try {
    data = JSON.parse(raw) as Record<string, unknown>;
  } catch {
    return json({ code: "bad_request" }, 400);
  }

  const str = (v: unknown) => (typeof v === "string" ? v : "");
  const values: ContactValues = {
    name: str(data.name),
    email: str(data.email),
    phone: str(data.phone),
    projectType: str(data.projectType),
    details: str(data.details),
  };

  // Honeypot: only bots fill this hidden field. Drop silently and send nothing.
  if (str(data.company) !== "") return json({ code: "ok" }, 200);

  // Submitted faster than a human could type: ask for a retry rather than pretend success.
  const elapsed = Number(data.elapsedMs);
  if (!Number.isFinite(elapsed) || elapsed < MIN_FILL_MS) {
    return json({ code: "too_fast" }, 422);
  }

  const errors = validateContact(values);
  if (Object.keys(errors).length > 0) return json({ code: "invalid", errors }, 422);

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL || siteConfig.contact.email;
  const from = process.env.CONTACT_FROM_EMAIL || "Portfolio Contact <onboarding@resend.dev>";
  if (!apiKey || !to) return json({ code: "not_configured" }, 503);

  const html = `
    <h2>New project enquiry</h2>
    <p><strong>Name:</strong> ${escapeHtml(values.name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(values.email)}</p>
    <p><strong>Contact number:</strong> ${escapeHtml(values.phone.trim() || "Not provided")}</p>
    <p><strong>Project type:</strong> ${escapeHtml(values.projectType)}</p>
    <p><strong>Details:</strong></p>
    <p style="white-space:pre-wrap">${escapeHtml(values.details.trim() || "No details provided")}</p>`;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: values.email.trim(),
        subject: `New ${values.projectType} enquiry from ${values.name.trim().slice(0, 60)}`,
        html,
      }),
    });
    if (!res.ok) {
      // Visible in the host's function logs (Netlify: Logs → Functions) to debug delivery problems.
      console.error("Resend rejected the email:", res.status, await res.text().catch(() => ""));
      return json({ code: "send_failed" }, 502);
    }
    return json({ code: "ok" }, 200);
  } catch (err) {
    console.error("Could not reach Resend:", err);
    return json({ code: "send_failed" }, 502);
  }
}