import type { Testimonial } from "@/types";

/**
 * ADD A REVIEW: append a real, client-approved testimonial.
 * Leave this array empty until you have genuine reviews. The section then
 * shows an honest "reviews coming soon" state, never fake quotes.
 *
 * Shape:
 * {
 *   id: "unique-id",
 *   name: "Client Name",
 *   context: "Website for <business>",
 *   quote: "Their exact words.",
 *   imageSrc: "/testimonials/client.jpg", // optional
 * }
 */
export const testimonials: Testimonial[] = [];
