/**
 * SOCIAL EVENTS — source of truth for all social/community event data.
 * Consumed by: social.html
 *
 * Field reference:
 *   id        {string}  Unique slug. Lowercase, hyphens, no spaces.
 *   title     {string}  Card headline. Plain text only.
 *   desc      {string}  Short description shown on the card. HTML allowed.
 *   date      {string}  ISO date (YYYY-MM-DD). Drives upcoming vs. past split — no manual toggle needed.
 *   time      {string}  Time range shown on the card. e.g. "7:00 PM – 10:00 PM". Optional — omit or null to hide.
 *   where     {string}  Location. HTML allowed (<br />).
 *   type      {string}  "public" | "members" — shown as a badge on the card.
 *   cost      {string}  Admission cost. e.g. "Free", "$10", "Members Free / $15 Public". null to hide.
 *   capacity  {string}  Capacity info. e.g. "Limited — 30 spots", "Open". null to hide.
 *   tags      {Array}   Label pills shown at the bottom of the card. Plain strings only.
 *   ctaText   {string}  Button label. e.g. "RSVP", "Get Tickets". null to hide button.
 *   ctaHref   {string}  Button link. null to hide button.
 *
 * Upcoming vs. past is determined automatically by comparing `date` to today.
 * Upcoming events are sorted soonest-first; past events are sorted most-recent-first.
 */
const SOCIAL_EVENTS = [
  // Add events here when ready. See field reference above.
  // Example:
  // {
  //   id: "barnight-sept-2026",
  //   title: "Fall Bar Night",
  //   desc: "Join us for drinks and good conversation.",
  //   date: "2026-09-20",
  //   time: "7:00 PM – 10:00 PM",
  //   where: "Ottawa,<br />Canada",
  //   type: "public",       // "public" | "members"
  //   cost: "Free",         // or null to hide
  //   capacity: null,       // or "Limited — 30 spots" etc.
  //   tags: ["Social", "Bar Night", "Ottawa"],
  //   ctaText: "RSVP",
  //   ctaHref: "https://..."
  // }
];
