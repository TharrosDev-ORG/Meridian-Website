'use client';

/**
 * The Meridian Society — Calendar Client
 * 
 * Handles interactive event registry logic, including real-time refresh 
 * and registration gate orchestration.
 */

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { createClient } from '@/utils/supabase/client';
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
  const [mounted, setMounted] = useState(false);

  // Trigger reveal observer when events change (initial mount)
  useEffect(() => {
    setMounted(true);
    const win = window as any;
    if (win.__observeReveal) {
      setTimeout(() => win.__observeReveal(), 100);
    }
  }, []);

  // Body Scroll Lock when portal is open
  useEffect(() => {
    if (selectedEvent) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedEvent]);

  async function refreshEvents() {
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
      console.error('[CALENDAR_REFRESH_ERROR]', err);
    }
  }

  return (
    <>
      {events.length > 0 ? (
        <div className="calendar-grid rv rv-stagger">
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
