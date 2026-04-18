# Social Events Tab — Design Spec

**Date:** 2026-04-11
**Status:** Implemented

---

## Context

Meridian Society runs two distinct event types: formal speaker series (member-gated, single featured event) and casual social events (bar nights, fundraisers). These have different audiences, entry requirements, and CTAs. A separate Social nav tab gives social events their own space without coupling to the speaker series logic.

---

## Data Schema — `js/social-data.js`

```js
const SOCIAL_EVENTS = [
  {
    id: "barnight-may-2026",   // unique slug
    title: "Spring Bar Night", // plain text
    desc: "...",               // HTML allowed
    date: "2026-05-15",        // ISO — drives upcoming/past split automatically
    time: "7:00 PM – 10:00 PM", // null to hide
    where: "Grad Lounge, Carleton", // HTML allowed
    type: "public",            // "public" | "members"
    cost: "Free",              // null to hide
    capacity: "Limited — 30 spots", // null to hide
    tags: ["Social", "Bar Night"],
    ctaText: "RSVP",           // null to hide button
    ctaHref: "https://..."     // null to hide button
  }
];
```

Upcoming vs. past is automatic — no `isCurrent` toggle. Events sort by date.

---

## Page Structure — `social.html`

- **Hero** — "Social." title, "Community Events" pre, IG follow CTA
- **Upcoming Events section** — card grid, soonest-first
- **Past Events section** — dimmed cards, most-recent-first; hidden entirely if empty
- **Empty state** — shown in Upcoming if no upcoming events

---

## Card Design

Reuses `.event-card` / `.event-meta` / `.event-meta-row` from events.html.

Meta rows rendered:
- **When** — formatted date (Month D, YYYY) + time if provided
- **Where** — location
- **Admission** — only if `cost != null`
- **Capacity** — only if `capacity != null`

Type badge: gold dot + "Public Event" or "Members Only" in `.event-status`.

CTA button: inside `.event-main` below tags, hidden for past events.

Past cards: `.event-card--past` — 55% opacity, no hover lift, no dot pulse.

---

## Navigation

Order: About · Events · **Social** · Speak · Membership

Updated on: `index.html`, `events.html`, `speak.html`, `team.html`, `404.html`, `js/site.js` (mobile drawer).

---

## Files Created / Modified

| File | Change |
|------|--------|
| `js/social-data.js` | New — event data array |
| `social.html` | New — full page |
| `package.json` | Added social-data.js to build script |
| `index.html` | Nav + footer Social link |
| `events.html` | Nav + footer Social link |
| `speak.html` | Nav + footer Social link |
| `team.html` | Nav + footer Social link |
| `404.html` | Nav Social link |
| `js/site.js` | Mobile drawer Social link |
| `sitemap.xml` | Added /social.html entry |

---

## How to Add Events

Edit `js/social-data.js`, add a new object to `SOCIAL_EVENTS`, run `npm run build`.

- Set `date` to a future ISO date for upcoming, past date for archive
- Set `cost: null` and `capacity: null` to hide those rows
- Set `ctaText: null` / `ctaHref: null` to hide the CTA button
