# Meridian Website — AI Agent Guide

This document is the "Quick Start" and "Entry Point" for any AI coding assistant. It defines the mission-critical context, invariants, and guardrails for the project.

---

## 🏛️ Project Identity
**The Meridian Society**: A student-led speaker forum in Ottawa.
**Aesthetic**: "Deep Ink" premium professional (Cream background, Ink text, Gold accents).
**Architecture**: Mobile-first, single-view responsive pattern (CSS media queries, not component splits).

---

## ⚡ Tech Stack & Invariants
- **Framework**: Next.js 16.2 (App Router, Static by default)
- **UI Architecture**: React 19.2 (Server Components primary, Client components only for interactivity/state)
- **Styling**: Tailwind CSS v4 + Global `globals.css` + Per-page `pageCss.ts` injection
- **Database**: Supabase (PostgreSQL) — Trigger-based live member counter
- **Deployment**: Vercel (Auto-deploys on push to `main`)

---

## 🛡️ Critical Guardrails (Anti-Patterns)
1. **Never use `overflow: visible`** on elements with `.rv-stagger`. It breaks the clipping mask.
2. **Never use pure white (#FFF) or pure black (#000)**. Use `--cream` (#F4EDE3) and `--ink` (#18150F).
3. **Escaped Characters**: Always use `&apos;` for apostrophes in TSX files to prevent lint errors.
4. **Member Privacy**: All database insertions in server actions *must* use `utils/supabase/service.ts` to bypass RLS for validation while maintaining strict backend isolation.
5. **Static-First**: The `/events` and `/social` pages are static informational program descriptions. Live announcements happen strictly on Instagram.

---

## 📋 Common Workflow Commands
- `npm run dev`: Start local development server
- `npm run build`: Production build and data verification
- `npm run lint`: System-wide audit for security and syntax errors

---

## 🗺️ Source of Truth Links
- **Administrative Manual**: [README.md](README.md)
- **System Encyclopedia**: [TECHNICAL.md](TECHNICAL.md)
- **Database Schema**: [supabase/migrations/](supabase/migrations/)

---
*Maintained to ensure 100% Agent Performance.*
