import { ImageResponse } from 'next/og';
import { getFonts, getOGLayout } from '@/utils/og-helper';

export const alt = 'The Speaker Forum | The Meridian Society';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  const fonts = await getFonts();

  return new ImageResponse(
    getOGLayout({
      eyebrow: 'SIGNATURE PROGRAM',
      title: 'The Speaker Forum',
      subtitle: 'Where lived experience meets a motivated student audience.',
      label: 'Program',
      variant: 'events',
    }),
    {
      ...size,
      fonts: fonts,
    }
  );
}
