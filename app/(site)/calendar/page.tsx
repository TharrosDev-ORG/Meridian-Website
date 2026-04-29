import { Metadata } from 'next';
import Link from 'next/link';
import { cookies } from 'next/headers';
import { createClient } from '@/utils/supabase/server';
import PageStyles from '@/components/PageStyles';
import { calendarCss } from './pageCss';
import CalendarClient, { Event } from './CalendarClient';
import { getMetadata } from '@/utils/metadata-shared';
import { generateBreadcrumbSchema, generateEventSchema } from '@/utils/jsonld';

export const metadata: Metadata = getMetadata({
  title: "Society Calendar",
  description: "Archival access to upcoming dialogues, forums, and scholarly gatherings. Admission is strictly prioritized for verified Society members.",
  urlPath: "/calendar",
  keywords: ['Meridian Calendar', 'Student Events Ottawa', 'Speaker Forum Schedule', 'Society Gatherings']
});

export default async function CalendarPage() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  
  const { data: events, error } = await supabase
    .from('events')
    .select('*')
    .eq('status', 'active')
    .gte('date', new Date().toISOString())
    .order('date', { ascending: true });

  if (error) {
    console.error('[CALENDAR_SERVER_FETCH_ERROR]', error);
  }

  const activeEvents = (events || []) as Event[];

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

      {/* JSON-LD Event Schemas */}
      {activeEvents.map((event) => (
        <script
          key={`schema-${event.id}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateEventSchema({
              name: event.name,
              startDate: event.date,
              description: event.description,
              locationName: event.location,
            })),
          }}
        />
      ))}

      <main id="main-content" className="calendar-sec">
        {/* ═══════════ HERO ═══════════ */}
        <section className="module-page-hero" aria-label="Calendar hero">
          <div className="module-page-hero-content">
            <div className="hero-eyebrow rv">
              <span className="hero-eyebrow-rule"></span>
              <span className="hero-eyebrow-text">The Meridian Society</span>
              <span className="hero-eyebrow-rule"></span>
            </div>
            <h1 className="hero-title rv rv-stagger">
              <span className="rv-stagger-item">Society <em>Calendar.</em></span>
            </h1>
            <p className="hero-sub rv" data-d="1">
              Archival access to upcoming dialogues, forums, and scholarly gatherings. 
              Admission is strictly prioritized for verified Society members.
            </p>
            
            <div className="mt-12 rv" data-d="2">
              <Link href="/events" className="btn-ghost-link">
                <span>←</span> Return to Events About
              </Link>
            </div>
          </div>
        </section>

        <div className="wrap">
          {/* ═══════════ CLIENT COMPONENT ═══════════ */}
          <CalendarClient initialEvents={activeEvents} />
        </div>
      </main>
    </>
  );
}
