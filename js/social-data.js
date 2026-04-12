/**
 * The Meridian Society — Social Events Data
 *
 * Each object:
 * {
 *   id:       string   — unique slug
 *   title:    string   — event name
 *   desc:     string   — short description (HTML allowed)
 *   date:     string   — "YYYY-MM-DD" (determines upcoming vs. past)
 *   time:     string   — optional display time, e.g. "9:00 PM"
 *   where:    string   — venue / location (HTML allowed)
 *   type:     string   — "public" | "members"
 *   tags:     string[] — e.g. ["Bar Night", "Ottawa"]
 *   cost:     string   — optional, e.g. "Free" or "$5 cover"
 *   capacity: string   — optional, e.g. "Limited"
 *   ctaText:  string   — optional CTA label (upcoming cards only)
 *   ctaHref:  string   — optional CTA link (upcoming cards only)
 * }
 *
 * Upcoming = date >= today. Past = date < today.
 * Past section auto-hides if no past events exist.
 * After editing, run: npm run build
 */
var SOCIAL_EVENTS = [];
