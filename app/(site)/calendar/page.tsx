import { Metadata } from 'next';
import Link from 'next/link';
import { cookies } from 'next/headers';
import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { createClient } from '@/utils/supabase/server';
import PageStyles from '@/components/PageStyles';
import { calendarCss } from './pageCss';
import Marquee from '@/components/Marquee';
import { getMetadata } from '@/utils/metadata-shared';
import { generateBreadcrumbSchema, generateEventSchema } from '@/utils/jsonld';
import type { Event } from './CalendarClient';

// Defer interactive client logic for extreme performance
const CalendarClient = dynamic(() => import('./CalendarClient'), {
  ssr: true,
});

export const metadata: Metadata = getMetadata({
  title: "Event Calendar",
  description: "Get tickets to upcoming forums, and events.",
  urlPath: "/calendar",
  keywords: ['Meridian Calendar', 'Student Events Ottawa', 'Speaker Forum Schedule', 'Society Gatherings']
});

// Revalidate every 60 seconds (ISR)
export const revalidate = 60;

export default function CalendarPage() {
  return (
    <>
      <PageStyles css={calendarCss} />
      
      {/* JSON-LD Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateBreadcrumbSchema([
            { name: "Home", item: "/" },
            { name: "Events", item: "/events" },
            { name: "Calendar", item: "/calendar" },
          ])),
        }}
      />

      <main id="main-content" className="calendar-sec">
        {/* ═══════════ HERO ═══════════ */}
        <section className="module-page-hero" aria-label="Calendar hero">
          <div className="module-page-hero-content">
            <div className="hero-eyebrow rv">
              <span className="hero-eyebrow-rule"></span>
              <span className="hero-eyebrow-text">The Meridian Society</span>
              <span className="hero-eyebrow-rule"></span>
            </div>
            <p className="hero-pre rv">Society</p>
            <h1 className="hero-title rv rv-stagger">
              <span className="rv-stagger-item">Event <em>Calendar.</em></span>
            </h1>
            <div className="hero-hr rv" aria-hidden="true" data-d="1"></div>
            <p className="hero-sub rv" data-d="2">
              Get tickets to upcoming forums, and events.
            </p>
            
            <div className="mt-12 rv" data-d="3">
              <a href="#events" className="btn-ghost-link">
                See Events <span>↓</span>
              </a>
            </div>
          </div>
        </section>

        <Marquee />

        <div className="wrap" id="events">
          <Suspense fallback={<TicketSkeleton />}>
            <TicketPortal />
          </Suspense>
        </div>
      </main>
    </>
  );
}

/**
 * RegistryRegistry — Server component that handles the live data fetch
 * and renders the interactive client registry.
 */
async function TicketPortal() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  
  const [upcomingRes, pastRes] = await Promise.all([
    supabase
      .from('events')
      .select('id, name, date, location, capacity, rsvp_count, description, is_members_only')
      .eq('status', 'active')
      .gte('date', new Date().toISOString())
      .order('date', { ascending: true }),
    supabase
      .from('events')
      .select('id, name, date, location, capacity, rsvp_count, description, is_members_only')
      .eq('status', 'active')
      .lt('date', new Date().toISOString())
      .order('date', { ascending: false })
      .limit(3)
  ]);

  if (upcomingRes.error) console.error('[CALENDAR_FETCH_UPCOMING_ERROR]', upcomingRes.error);
  if (pastRes.error) console.error('[CALENDAR_FETCH_PAST_ERROR]', pastRes.error);

  const activeEvents = (upcomingRes.data || []) as Event[];
  const pastEvents = (pastRes.data || []) as Event[];

  return (
    <>
      {/* JSON-LD Event Schemas */}
      {activeEvents.map((event) => (
        <script
          key={`schema-${event.id}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateEventSchema({
              name: event.name,
              startDate: event.date,
              description: event.description || '',
              locationName: event.location,
            })),
          }}
        />
      ))}
      <CalendarClient initialEvents={activeEvents} archivalEvents={pastEvents} />
    </>
  );
}

/**
 * RegistrySkeleton — High-fidelity skeleton for the live registry grid
 */
function TicketSkeleton() {
  return (
    <div className="calendar-grid animate-pulse">
      {[1, 2, 3].map((i) => (
        <div key={i} className="event-card opacity-40">
          <div className="event-date-col bg-ink/20 h-[180px]" />
          <div className="event-info-col py-10 space-y-4">
             <div className="h-4 bg-ink/10 w-24 rounded-full" />
             <div className="h-10 bg-ink/10 w-3/4" />
             <div className="h-6 bg-ink/10 w-1/2" />
          </div>
          <div className="event-action-col bg-ink/05" />
        </div>
      ))}
    </div>
  );
}

