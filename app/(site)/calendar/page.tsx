'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import PageStyles from '@/components/PageStyles';
import { calendarCss } from './pageCss';
import PublicRegistration from '@/components/shared/PublicRegistration';
import Magnetic from '@/components/Magnetic';

// Raw SVGs for Icons
const MapPinIcon = ({ size = 14, className = "" }: { size?: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const UsersIcon = ({ size = 14, className = "" }: { size?: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const XIcon = ({ size = 32, className = "" }: { size?: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const LoaderIcon = ({ size = 32, className = "" }: { size?: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="12" y1="2" x2="12" y2="6" />
    <line x1="12" y1="18" x2="12" y2="22" />
    <line x1="4.93" y1="4.93" x2="7.76" y2="7.76" />
    <line x1="16.24" y1="16.24" x2="19.07" y2="19.07" />
    <line x1="2" y1="12" x2="6" y2="12" />
    <line x1="18" y1="12" x2="22" y2="12" />
    <line x1="4.93" y1="19.07" x2="7.76" y2="16.24" />
    <line x1="16.24" y1="7.76" x2="19.07" y2="4.93" />
  </svg>
);

interface Event {
  id: string;
  name: string;
  date: string;
  location: string;
  capacity: number;
  rsvp_count: number;
  description: string;
  is_members_only: boolean;
}

export default function CalendarPage() {
  const [mounted, setMounted] = useState(false);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  useEffect(() => {
    setMounted(true);
    fetchEvents();
  }, []);

  // Trigger reveal observer when events change
  useEffect(() => {
    if (!loading && typeof window !== "undefined") {
      const win = window as any;
      if (win.__observeReveal) {
        setTimeout(() => win.__observeReveal(), 100);
      }
    }
  }, [loading, events]);

  async function fetchEvents() {
    const supabase = createClient();
    try {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('status', 'active')
        .gte('date', new Date().toISOString())
        .order('date', { ascending: true });

      if (error) throw error;
      setEvents(data || []);
    } catch (err) {
      console.error('[CALENDAR_FETCH_ERROR]', err);
    } finally {
      setLoading(false);
    }
  }

  if (!mounted) return null;

  return (
    <>
      <PageStyles css={calendarCss} />
      
      <main id="main-content" className="calendar-sec">
        <div className="wrap">
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
            </div>
          </section>

          {/* ═══════════ EVENT LIST ═══════════ */}
          {loading ? (
            <div className="flex flex-col items-center justify-center py-40">
              <LoaderIcon className="animate-spin text-[var(--gold)]/40 mb-4" />
              <span className="text-[10px] sans font-bold tracking-[0.3em] text-[var(--ink)]/30 uppercase">Consulting Archives...</span>
            </div>
          ) : events.length > 0 ? (
            <div className="calendar-grid rv-stagger">
              {events.map((event) => (
                <article
                  key={event.id}
                  className="event-card rv-stagger-item"
                >
                  {/* Date Badge */}
                  <div className="event-date-col">
                    <span className="date-day">{new Date(event.date).toLocaleDateString('en-US', { day: '2-digit' })}</span>
                    <span className="date-month">{new Date(event.date).toLocaleDateString('en-US', { month: 'short' })}</span>
                    <span className="date-year">{new Date(event.date).getFullYear()}</span>
                  </div>

                  {/* Event Info */}
                  <div className="event-info-col">
                    <span className="event-tag">
                      {event.is_members_only ? 'Member Exclusive' : 'Public Access'}
                    </span>
                    <h2 className="event-title">{event.name}</h2>
                    <p className="event-desc">{event.description || 'No description available in archives.'}</p>
                  </div>

                  {/* Meta & Action */}
                  <div className="event-action-col">
                    <div className="space-y-4">
                      <div className="event-meta-item">
                        <MapPinIcon className="text-[var(--gold)]/60" />
                        <div>
                          <p className="meta-lbl">Location</p>
                          <p className="meta-val">{event.location}</p>
                        </div>
                      </div>
                      <div className="event-meta-item">
                        <UsersIcon className="text-[var(--gold)]/60" />
                        <div>
                          <p className="meta-lbl">Availability</p>
                          <p className="meta-val">
                            {event.capacity - event.rsvp_count > 0 
                              ? `${event.capacity - event.rsvp_count} Seats Remaining`
                              : 'Full Capacity'}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="btn-register">
                      <Magnetic strength={0.2}>
                        <button 
                          onClick={() => setSelectedEvent(event)}
                          disabled={event.rsvp_count >= event.capacity}
                          className="btn-primary w-full"
                        >
                          <span>{event.rsvp_count >= event.capacity ? 'Registration Closed' : 'Secure Admission'}</span>
                        </button>
                      </Magnetic>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="calendar-empty rv" data-d="2">
              <h3 className="empty-h">The archives are currently quiet.</h3>
              <p className="empty-p">No upcoming events found. Please check back soon.</p>
            </div>
          )}
        </div>

        {/* ═══════════ REGISTRATION OVERLAY ═══════════ */}
        {selectedEvent && (
          <div 
            className="reg-overlay"
            onClick={() => setSelectedEvent(null)}
          >
            <button className="reg-panel-close">
              <XIcon />
            </button>
            
            <div 
              className="w-full max-w-md registration-panel-inner"
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
            >
              <PublicRegistration 
                eventId={selectedEvent.id} 
                eventName={selectedEvent.name}
                onSuccess={() => {
                  fetchEvents();
                }}
              />
            </div>
          </div>
        )}
      </main>
    </>
  );
}
