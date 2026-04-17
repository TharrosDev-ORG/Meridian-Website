# Meridian Website — AI Agent Guide

This document is the "Quick Start" and "Entry Point" for any AI coding assistant. It defines the mission-critical context, invariants, and guardrails for the project.

---

## 🏛️ Project Identity
**The Meridian Society**: A student-led speaker forum in Ottawa.
**Aesthetic**: "Deep Ink" premium professional.
- **Background**: `--cream` (#F4EDE3)
- **Primary Text**: `--ink` (#18150F)
- **Accents**: `--gold` (#B8932A)
- **Typography**: Serif for titles (Cormorant Garamond), Sans for metadata (Barlow Condensed).

---

## ⚡ Tech Stack & Invariants
- **Framework**: Next.js 16.2 (App Router, Static by default)
- **UI Architecture**: React 19.2 (Server Components primary)
- **Styling**: Tailwind CSS v4 (@theme integration) + Global `globals.css`
- **Database**: Supabase (PostgreSQL) — Trigger-based live member counter
- **Telemetry**: High-performance Edge API (`/api/stats/count`) with SWR caching
- **Deployment**: Vercel (Auto-deploys on push to `main`)

---

## 🛡️ Critical Guardrails (Anti-Patterns)
1. **Never use `overflow: visible`** on elements with `.rv-stagger`. It breaks the clipping mask.
2. **Never use pure white (#FFF) or pure black (#000)**. Use `--cream` (#F4EDE3) and `--ink` (#18150F).
3. **Escaped Characters**: Always use `&apos;` for apostrophes in TSX files to prevent lint errors.
4. **Security Hardening**: Anonymous Database inserts via RLS are strictly disabled. All membership enrollment must be forced through the `registerMember` Server Action (which utilizes the Service Role).
5. **Static-First Policy**: The `/events` and `/social` pages are permanent informational program guides. Dynamic announcements happen exclusively on Instagram. No upcoming dates should be added to the codebase.

---

## ✨ Premium UI Patterns
- **Reveals**: Use the `.rv` class for scroll-triggered entry. Stagger with `data-d="1"` (80ms) up to `data-d="5"`.
- **Magnetic Buttons**: Wrap buttons in `<Magnetic strength={0.2}>` for the premium "pull" effect.
- **Page Transitions**: All page content must be wrapped in `TransitionWrapper` (uses `.page-sweep` blur/entry).

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
