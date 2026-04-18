import { ImageResponse } from 'next/og';
import { getFonts, getOGLayout } from '@/utils/og-helper';

export const alt = 'Our Team | The Meridian Society';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  const fonts = await getFonts();

  return new ImageResponse(
    getOGLayout({
      eyebrow: 'THE SOCIETY',
      title: 'Our Team',
      subtitle: 'Built, owned, and run entirely by students.',
      label: 'Team',
      variant: 'team',
    }),
    {
      ...size,
      fonts: fonts,
    }
  );
}
