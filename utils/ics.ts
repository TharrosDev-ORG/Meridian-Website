import type { Event } from '@/app/(site)/calendar/CalendarClient';

export function generateICS(event: Event): string {
  const d = new Date(event.date);
  
  // Format date to ICS standard: YYYYMMDDTHHMMSSZ
  const formatDate = (date: Date) => {
    return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  };
  
  // Assume events last 2 hours by default since we only have a start time
  const endDate = new Date(d.getTime() + 2 * 60 * 60 * 1000);
  
  const icsString = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//The Meridian Society//Event Calendar//EN',
    'BEGIN:VEVENT',
    `UID:${event.id}@meridiansociety.org`,
    `DTSTAMP:${formatDate(new Date())}`,
    `DTSTART:${formatDate(d)}`,
    `DTEND:${formatDate(endDate)}`,
    `SUMMARY:${event.name}`,
    `LOCATION:${event.location}`,
    `DESCRIPTION:${(event.description || '').replace(/\n/g, '\\n')}`,
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');

  return icsString;
}

export function downloadICS(event: Event) {
  const icsData = generateICS(event);
  const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `${event.name.replace(/\s+/g, '_')}.ics`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
