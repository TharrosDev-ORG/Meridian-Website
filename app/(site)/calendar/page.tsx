import { Metadata } from 'next';
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
  title: "Live Event Registry & Calendar",
  description: "The live registry for all Meridian Society programming. Secure your tickets, view venue details, and track upcoming speaker forums in Ottawa.",
  urlPath: "/calendar",
  keywords: ['Student Event Calendar Ottawa', 'Meridian Registry', 'Speaker Series Schedule']
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
            <p className="hero-pre rv">Upcoming</p>
            <h1 className="hero-title rv rv-stagger">
              <span className="rv-stagger-item"><em>EVENTS.</em></span>
            </h1>
            <div className="hero-hr rv" aria-hidden="true" data-d="1"></div>
            <p className="hero-sub rv" data-d="2">
              Secure your tickets for our upcoming speaker forums and exclusive society gatherings.
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
      {/* 1. Expanded Lead Skeleton (Matches initialEvents[0] auto-expansion) */}
      <div className="event-card is-expanded opacity-40">
        <div className="event-date-col bg-ink/20 h-full min-h-[180px]" />
        <div className="event-info-col py-10 space-y-4">
           <div className="h-3 bg-ink/10 w-24 rounded-full" />
           <div className="h-10 bg-ink/10 w-3/4" />
           <div className="h-6 bg-ink/10 w-1/2" />
        </div>
        <div className="event-action-col bg-ink/05 p-10 space-y-6">
           {/* The "3 Empty Icons" placeholders */}
           {[1, 2, 3].map(i => (
             <div key={i} className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-sm bg-ink/10" />
                <div className="space-y-2">
                  <div className="h-2 bg-ink/05 w-12" />
                  <div className="h-3 bg-ink/10 w-24" />
                </div>
             </div>
           ))}
           <div className="mt-4 h-12 bg-ink/10 w-full" />
        </div>
      </div>
      
      {/* 2. Compressed Tiles Skeletons (Matching displayEvents logic) */}
      {[1, 2].map((i) => (
        <div key={i} className="event-card is-compressed opacity-40">
          <div className="event-date-col bg-ink/20 h-full min-h-[240px]" />
        </div>
      ))}
    </div>
  );
}

