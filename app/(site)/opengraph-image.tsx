import { ImageResponse } from 'next/og';
import { getFonts, getOGLayout } from '@/utils/og-helper';

export const alt = 'The Meridian Society — Ottawa Student Speaker Forum';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  const fonts = await getFonts();

  return new ImageResponse(
    getOGLayout({
      title: 'A Room For Discourse',
      subtitle: 'Connecting motivated students with the professionals, alumni, and scholars who can expand their world.',
    }),
    {
      ...size,
      fonts: fonts,
    }
  );
}
