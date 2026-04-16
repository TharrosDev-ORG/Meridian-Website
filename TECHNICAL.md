# The Meridian Society — Ultra-Detailed Technical Specification

This document is the definitive, high-fidelity system of record for The Meridian Society website. It serves as an "Agent-Ready" encyclopedia of the site's architecture, security, data logic, and performance systems.

---

## 🏗️ 1. Architecture: Responsive Single-View Pattern

The site implements a unified, mobile-first component tree. We avoid separate mobile/desktop routes, instead relying on CSS media queries and the `PageStyles` pattern to adapt the UI.

### 1.1 Source-to-Route Mapping
| Public URL | Route Directory | Primary Logic | CSS Logic |
| :--- | :--- | :--- | :--- |
| `/` | `app/(site)/` | `page.tsx` | `pageCss.ts` |
| `/events` | `app/(site)/events/` | `page.tsx` | `pageCss.ts` |
| `/membership`| `app/(site)/membership/` | `page.tsx` | `pageCss.ts` |
| `/social` | `app/(site)/social/` | `page.tsx` | `pageCss.ts` |
| `/speak` | `app/(site)/speak/` | `page.tsx` | `pageCss.ts` |
| `/team` | `app/(site)/team/` | `page.tsx` | `pageCss.ts` |
| `/register` | `app/register/` | `page.tsx` | (Shared `globals.css`) |

### 1.2 Layout Composition
- **Root Layout**: `app/layout.tsx` (Global Metadata, Google Search Verification, Analytics, JSON-LD Organization Schema).
- **Site Shell**: `app/(site)/layout.tsx` (NavBar, TransitionWrapper, Footer, MobileMenu, ScrollProgress).

---

## 🎨 2. Systemic Design Tokens & CSS Logic

All styling is grounded in a centralized token system defined in `globals.css` `:root`.

### 2.1 Design Tokens (CSS Variables)
```css
--cream:       #F4EDE3;   /* Page Background */
--cream-mid:   #EBE2D4;   /* Secondary Surfaces */
--ink:         #18150F;   /* Primary Text (Never use pure #000) */
--gold:        #B8932A;   /* Brand Primary Accent */
--gold-lt:     #D4AF50;   /* Secondary/Hover Accent */
--grain: url("data:image/svg+xml,..."); /* Inline SVG Noise Overlay */
```

### 2.2 Z-Index Layering Chart
| Layer | Z-Index | Component |
| :--- | :--- | :--- |
| **Highest** | 9999 | `SkipLink`, `ProgressBar` |
| **Navigation** | 200 | `NavBar` (fixed) |
| **Overlays** | 191 | `MobileMenu` (Drawer) |
| **Backdrop** | 190 | `MobileMenu` (Backdrop Filter) |
| **Interactive** | 98 | `BackToTop` (Arc Button) |
| **Base UI** | 1–10 | Hero Ghost, Interactive Layers |
| **Floor** | 0 | Section Backgrounds |

---

## ✨ 3. Animation Engine & Reveal Lifecycle

The site utilizes a strict "Observer-Reveal" pattern managed through `Providers.tsx`.

### 3.1 Intersection Observer (`.rv`)
Elements with the `.rv` class are initialized as invisible (`opacity: 0, translateY(20px)`).
- **Configuration**: `threshold: 0.01`, `rootMargin: "0px 0px 100px 0px"`.
- **Global Hook**: `window.__observeReveal()` allows for re-invoking the observer when new content is added (e.g., during page navigation in `PageStyles.tsx`).

### 3.2 Timings & Easing
- **Default Reveal**: `0.65s` using `cubic-bezier(0.16, 1, 0.3, 1)`.
- **Staggers**: Attributes `data-d="1"` through `data-d="5"` add `80ms` increments to the `transition-delay`.
- **Page Transitions**: `pageSweep` keyframe (0.65s duration, opacity + blur + translate).

---

## 🗄️ 4. Backend Architecture: Supabase & Real-time

The backend is entirely serverless, utilizing Supabase for data persistence and real-time event broadcasting.

### 4.1 Live Member Counter (PostgreSQL)
The live counter in the footer is maintained via a PostgreSQL Trigger. It is **automated** and requires no manual updates to the `site_stats` table.

```sql
-- The Trigger Function
CREATE OR REPLACE FUNCTION public.handle_member_count_change()
RETURNS TRIGGER AS $$
BEGIN
    IF (TG_OP = 'INSERT') THEN
        UPDATE public.site_stats
        SET member_count = member_count + 1,
            last_updated = now()
        WHERE id = 'meridial_global_stats';
    ELSIF (TG_OP = 'DELETE') THEN
        UPDATE public.site_stats
        SET member_count = member_count - 1,
            last_updated = now()
        WHERE id = 'meridial_global_stats';
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- The Trigger Definition
CREATE TRIGGER on_member_change
AFTER INSERT OR DELETE ON public.members
FOR EACH ROW EXECUTE FUNCTION public.handle_member_count_change();
```

### 4.2 Security Clients
| Client Type | Location | Permission Level |
| :--- | :--- | :--- |
| **Browser Client** | `utils/supabase/client.ts`| Restricted by RLS Policies (Anon Key) |
| **Server Client** | `utils/supabase/server.ts`| Restricted by RLS Policies |
| **Service Client**| `utils/supabase/service.ts`| **Bypasses RLS** (Service Role Key - Server Only) |

---

## 🛡️ 5. Infrastructure & Security

### 5.1 Content Security Policy (CSP)
The site enforces a strict CSP via `next.config.ts` to prevent XSS and data injection.

```ts
const cspHeader = `
    default-src 'self';
    script-src 'self' 'unsafe-inline' 'unsafe-eval' va.vercel-scripts.com;
    style-src 'self' 'unsafe-inline';
    img-src 'self' blob: data:;
    font-src 'self';
    form-action 'self' docs.google.com;
    connect-src 'self' va.vercel-scripts.com dsyiuztquzkcikehkigv.supabase.co wss://dsyiuztquzkcikehkigv.supabase.co;
`;
```

### 5.2 Redirect Strategy (Legacy Support)
We maintain permanent (301) redirects for legacy `.html` endpoints to ensure no broken links for existing users.
- `/events.html` → `/events`
- `/team.html` → `/team`
- `/index.html` → `/`

---

## 📈 6. SEO & Structured Data (JSON-LD)

The Society uses dynamic JSON-LD generation found in `utils/jsonld.ts`.

| Schema Type | Usage | Key Fields |
| :--- | :--- | :--- |
| `Organization` | Root Layout | Name, URL, Logo, SameAs (Instagram) |
| `Person` | Team Page | Name, JobTitle, Image, sameAs (LinkedIn/Instagram) |
| `BreadcrumbList`| Sub-Pages | Navigational hierarchy mapping |
| `FAQPage` | Membership | Question/Answer Entity mapping |

---

## ♿ 7. Accessibility Standards (A11y)

- **Focus Management**: The `MobileMenu` implements a focus trap and `aria-hidden` management to ensure screen readers remain within the drawer when open.
- **Skip Links**: A `Skip to Content` link is the first tab-able element on every page.
- **Color Contrast**: All primary text (`--ink`) against background (`--cream`) maintains a contrast ratio > 10:1.
- **Reduced Motion**: Adaptive `prefers-reduced-motion` queries zero-out all transitions and animations for sensitive users.

---
*End of Technical Specification. This document is maintained by the Meridian Society technical team.*
