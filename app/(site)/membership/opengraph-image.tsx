import { ImageResponse } from 'next/og';
import { getFonts, getOGLayout } from '@/utils/og-helper';

export const alt = 'Membership | The Meridian Society';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  const fonts = await getFonts();

  return new ImageResponse(
    getOGLayout({
      eyebrow: 'JOIN THE SOCIETY',
      title: 'Become a Member',
      subtitle: 'Free to join. Built for students. Priority access to all forums and socials.',
      label: 'Membership'
    }),
    {
      ...size,
      fonts: fonts,
    }
  );
}
