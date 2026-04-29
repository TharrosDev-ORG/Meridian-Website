'use client';

/**
 * The Meridian Society — Calendar Client
 * 
 * Handles interactive event ticket logic, including real-time refresh,
 * accordion expansion, and registration gate orchestration.
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
import { createClient } from '@/utils/supabase/client';
import PublicRegistration from '@/components/shared/PublicRegistration';
import { downloadICS } from '@/utils/ics';

// ── Active SVG Icons ──

const MapPinIcon = ({ size = 14, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const UsersIcon = ({ size = 14, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const CalendarIcon = ({ size = 14, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

export interface Event {
  id: string;
  name: string;
  date: string;
  location: string;
  capacity: number;
  rsvp_count: number;
  description: string;
  is_members_only: boolean;
}

interface CalendarClientProps {
  initialEvents: Event[];
  archivalEvents?: Event[];
}

export default function CalendarClient({ initialEvents, archivalEvents = [] }: CalendarClientProps) {
  const [events, setEvents] = useState<Event[]>(initialEvents);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(initialEvents[0]?.id ?? null);
  const [mounted, setMounted] = useState(false);
  const observerTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Mounted Guard with cleanup for the reveal observer timer
  useEffect(() => {
    setMounted(true);

    const globalObserve = (window as unknown as { __observeReveal?: () => void }).__observeReveal;
    if (globalObserve) {
      observerTimerRef.current = setTimeout(() => globalObserve(), 100);
    }

    return () => {
      if (observerTimerRef.current) {
        clearTimeout(observerTimerRef.current);
      }
    };
  }, []);

  // Handle Real-Time Seat Availability
  useEffect(() => {
    const supabase = createClient();
    const channel = supabase.channel('calendar-live-seats')
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'events' },
        (payload) => {
          if (payload.new && payload.new.id) {
            setEvents((prev) => 
              prev.map(e => e.id === payload.new.id ? { ...e, rsvp_count: payload.new.rsvp_count } : e)
            );
          }
        }
      )
      .subscribe();

    return () => { void supabase.removeChannel(channel); };
  }, []);

  // Memoized refresh to avoid re-creating the function on every render
  const refreshEvents = useCallback(async () => {
    const supabase = createClient();
    try {
      const { data, error } = await supabase
        .from('events')
        .select('id, name, date, location, capacity, rsvp_count, description, is_members_only')
        .eq('status', 'active')
        .gte('date', new Date().toISOString())
        .order('date', { ascending: true });

      if (error) throw error;
      setEvents(data ?? []);
    } catch (err) {
      console.error('[CALENDAR_REFRESH_ERROR]', err);
    }
  }, []);

  // Handle smooth auto-scroll when an event expands, ensuring it stays in view
  useEffect(() => {
    if (expandedId) {
      // 50ms delay allows the browser to recalculate the flex wrap layout shift
      const timer = setTimeout(() => {
        const el = document.getElementById(`event-card-${expandedId}`);
        if (el) {
          const yOffset = -120; // Accounts for the fixed navbar
          const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [expandedId]);

  // Dynamically promote the expanded event to the top of the grid
  const displayEvents = [...events].sort((a, b) => {
    if (a.id === expandedId) return -1;
    if (b.id === expandedId) return 1;
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });

  return (
    <>
      {events.length > 0 ? (
        <div className="calendar-grid rv rv-stagger">
            {displayEvents.map((event) => {
              const isExpanded = expandedId === event.id;
              
              return (
                <article
                  key={event.id}
                  id={`event-card-${event.id}`}
                  title={!isExpanded ? `Expand: ${event.name}` : undefined}
                  className={`event-card rv-stagger-item ${isExpanded ? 'is-expanded' : 'is-compressed'}`}
                  onClick={() => setExpandedId(isExpanded ? null : event.id)}
                >
                  {/* Date Badge */}
                  <div className="event-date-col">
                    <span className="date-day">{new Date(event.date).toLocaleDateString('en-US', { day: '2-digit' })}</span>
                    <span className="date-month">{new Date(event.date).toLocaleDateString('en-US', { month: 'short' })}</span>
                    <span className="date-year">{new Date(event.date).getFullYear()}</span>
                  </div>

                  {/* Event Info */}
                  <div className="event-info-col">
                    <div className="flex items-center justify-between">
                      <span className="event-tag">
                        {event.is_members_only ? 'Member Exclusive' : 'Public Access'}
                      </span>
                      <div className="expand-indicator">
                        {isExpanded ? '−' : '+'}
                      </div>
                    </div>
                    <h2 className="event-title">{event.name}</h2>
                    <div className="event-details-reveal">
                      <p className="event-desc">{event.description || 'No description available in archives.'}</p>
                    </div>
                  </div>

                  {/* Meta & Action */}
                  <div className="event-action-col">
                    <div className="space-y-4">
                      <div className="event-meta-item">
                        <MapPinIcon className="text-gold/60" />
                        <div>
                          <p className="meta-lbl">Location</p>
                          <p className="meta-val">{event.location}</p>
                        </div>
                      </div>
                      <div className="event-meta-item">
                        <UsersIcon className="text-gold/60" />
                        <div>
                          <p className="meta-lbl">Availability</p>
                          <p className="meta-val">
                            {event.capacity - event.rsvp_count > 0 
                              ? `${event.capacity - event.rsvp_count} Seats Remaining`
                              : 'Full Capacity'}
                          </p>
                        </div>
                      </div>
                      
                      {/* ICS Download Link */}
                      <div className="event-meta-item">
                        <CalendarIcon className="text-gold/60" />
                        <div>
                          <p className="meta-lbl">Schedule</p>
                          <button onClick={(e) => { e.stopPropagation(); downloadICS(event); }} className="meta-val appearance-none bg-transparent border-none p-0 cursor-pointer hover:text-gold transition-colors text-left">
                            Add to Calendar
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="btn-register">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedEvent(event);
                        }}
                        disabled={event.rsvp_count >= event.capacity}
                        className="btn-primary w-full"
                      >
                        <span>{event.rsvp_count >= event.capacity ? 'Registration Closed' : 'Secure Ticket'}</span>
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
        </div>
      ) : (
        <div className="calendar-empty rv" data-d="2">
          <h3 className="empty-h">The calendar is currently quiet.</h3>
          <p className="empty-p">No upcoming events found. Please check back soon.</p>
        </div>
      )}

      {/* ═══════════ ARCHIVAL EVENTS ═══════════ */}
      {archivalEvents.length > 0 && (
        <div className="mt-32 border-t border-ink/10 pt-16 rv">
          <h3 className="hero-eyebrow-text mb-8">Society Archives</h3>
          <div className="calendar-grid">
              {archivalEvents.map((event) => (
                <article
                  key={event.id}
                  className={`event-card is-compressed opacity-60 grayscale-[50%]`}
                >
                  <div className="event-date-col">
                    <span className="date-day">{new Date(event.date).toLocaleDateString('en-US', { day: '2-digit' })}</span>
                    <span className="date-month">{new Date(event.date).toLocaleDateString('en-US', { month: 'short' })}</span>
                    <span className="date-year">{new Date(event.date).getFullYear()}</span>
                  </div>
                  <div className="event-info-col p-8 flex flex-col justify-center">
                    <h2 className="text-xl font-serif text-ink">{event.name}</h2>
                    <p className="text-sm font-sans text-ink/60 uppercase tracking-widest mt-2">Archived Event</p>
                  </div>
                </article>
              ))}
          </div>
        </div>
      )}

      {/* ═══════════ REGISTRATION OVERLAY (PORTAL) ═══════════ */}
      {selectedEvent && mounted && createPortal(
        <div 
          className="reg-overlay"
          onClick={() => setSelectedEvent(null)}
        >
          <div 
            className="registration-panel-inner"
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
          >
            <PublicRegistration 
              eventId={selectedEvent.id} 
              eventName={selectedEvent.name}
              onClose={() => setSelectedEvent(null)}
              onSuccess={() => {
                refreshEvents();
              }}
            />
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
