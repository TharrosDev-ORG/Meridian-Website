/**
 * EVENTS — source of truth for all event data.
 * Consumed by: events.html (card renderer) and index.html (teaser card).
 *
 * Field reference:
 *   id        {string}  Unique slug. Used as a key — no spaces, lowercase, hyphens.
 *   status    {string}  Badge text on the card. e.g. "Registration Open", "Coming Soon", "Past Event"
 *   title     {string}  Card headline. HTML allowed (<em>, <br />).
 *   desc      {string}  Short description shown on the card. HTML allowed.
 *   tags      {Array}   Label pills shown at the bottom of the card. Plain strings only.
 *   ctaText   {string}  Button label. Plain text only.
 *   ctaHref   {string}  Button href. Overridden sitewide by REGISTER_URL via [data-register] in site.js.
 *   when      {string}  Date/season shown in the info panel. Plain text.
 *   where     {string}  Location shown in the info panel. HTML allowed (<br />).
 *   format    {string}  Event format shown in the info panel. HTML and entities allowed.
 *   speaker   {string}  Speaker name shown in the info panel. Plain text.
 *   entry     {string}  Entry requirements shown in the info panel. HTML allowed (<br />).
 *   isCurrent {boolean} Only ONE event should have isCurrent: true at a time.
 *                       The events.html renderer uses EVENTS.find(e => e.isCurrent) — first match wins.
 *                       Set isCurrent: false to stage a future event without displaying it yet.
 */
const EVENTS = [
  {
    id: "fall-2026-inaugural",
    status: "Registration Open",
    title: "Our <em>First Event</em><br />is Coming.",
    desc: "The Meridian Society's inaugural event — Connecting students, alumni, and professionals in Ottawa.",
    tags: ["Speaker Event", "Open Conversation", "Ottawa"],
    ctaText: "Register for Updates",
    ctaHref: "https://docs.google.com/forms/d/1qThcXHxzfuW4uNVkZbHGhHwlDsy8x-YGtpHpOLnqTl4/viewform",
    when: "Fall 2026",
    where: "Ottawa,<br />Canada",
    format: "Speaker &amp;<br />Open Conversation",
    speaker: "To Be Announced",
    entry: "Must Be A<br />Registered Member",
    isCurrent: true
  }
];
