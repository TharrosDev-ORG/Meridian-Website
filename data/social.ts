export interface SocialEvent {
  id: string;
  type: 'members' | 'public';
  date: string;
  time?: string;
  title: string;
  where: string;
  desc: string;
  tags?: string[];
  cost?: string;
  capacity?: string;
  ctaText?: string;
  ctaHref?: string;
}

export const SOCIAL_EVENTS: SocialEvent[] = [];
