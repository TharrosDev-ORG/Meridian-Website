import { ImageResponse } from 'next/og';
import { getFonts, getOGLayout } from '@/utils/og-helper';

export const alt = 'Social Gatherings | The Meridian Society';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  const fonts = await getFonts();

  return new ImageResponse(
    getOGLayout({
      eyebrow: 'COMMUNITY',
      title: 'Social Gatherings',
      subtitle: 'Authentic spaces for Ottawa students to meet like-minded peers.',
      label: 'Socials',
      variant: 'social',
    }),
    {
      ...size,
      fonts: fonts,
    }
  );
}
