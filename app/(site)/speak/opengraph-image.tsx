import { ImageResponse } from 'next/og';
import { getFonts, getOGLayout } from '@/utils/og-helper';

export const alt = 'Speak at The Meridian | The Meridian Society';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  const fonts = await getFonts();

  return new ImageResponse(
    getOGLayout({
      eyebrow: 'GET INVOLVED',
      title: 'Partner With Us',
      subtitle: 'Have a story worth sharing? We’d love to hear from you.',
      label: 'Speakers',
      variant: 'speak',
    }),
    {
      ...size,
      fonts: fonts,
    }
  );
}
