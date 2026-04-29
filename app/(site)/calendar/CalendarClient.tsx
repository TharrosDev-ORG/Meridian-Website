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
}

export default function CalendarClient({ initialEvents }: CalendarClientProps) {
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

  return (
    <>
      {events.length > 0 ? (
        <div className="calendar-grid rv rv-stagger">
            {events.map((event) => {
              const isExpanded = expandedId === event.id;
              
              return (
                <article
                  key={event.id}
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
          <h3 className="empty-h">The archives are currently quiet.</h3>
          <p className="empty-p">No upcoming events found. Please check back soon.</p>
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
