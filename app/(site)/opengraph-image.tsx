import { ImageResponse } from 'next/og';

export const alt = 'The Meridian Society — Ottawa Student Speaker Forum';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#F4EDE3',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '80px',
          border: '12px solid #18150F',
          position: 'relative',
        }}
      >
        {/* Grain Overlay Simulation */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            opacity: 0.03,
            backgroundImage: 'radial-gradient(#18150F 1px, transparent 1px)',
            backgroundSize: '20px 20px',
          }}
        />

        {/* Wordmark */}
        <div
          style={{
            fontSize: '18px',
            fontWeight: 700,
            letterSpacing: '0.4em',
            color: '#B8932A',
            marginBottom: '40px',
            textTransform: 'uppercase',
            fontFamily: 'sans-serif',
          }}
        >
          The Meridian Society
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: '100px',
            color: '#18150F',
            textAlign: 'center',
            lineHeight: 1,
            marginBottom: '40px',
            fontFamily: 'serif',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <span>A Room For</span>
          <span style={{ fontStyle: 'italic', letterSpacing: '0.05em' }}>Discourse.</span>
        </div>

        {/* Meridian Line */}
        <div
          style={{
            width: '100px',
            height: '1px',
            background: '#B8932A',
            marginBottom: '40px',
          }}
        />

        {/* Location / Status */}
        <div
          style={{
            fontSize: '14px',
            fontWeight: 600,
            letterSpacing: '0.24em',
            color: '#18150F',
            textTransform: 'uppercase',
            fontFamily: 'sans-serif',
            opacity: 0.7,
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <span>Ottawa</span>
          <svg width="12" height="12" viewBox="0 0 10 10" style={{ margin: '0 8px' }}>
            <path d="M5 0L10 5L5 10L0 5Z" fill="#B8932A" />
          </svg>
          <span>Independent</span>
          <svg width="12" height="12" viewBox="0 0 10 10" style={{ margin: '0 8px' }}>
            <path d="M5 0L10 5L5 10L0 5Z" fill="#B8932A" />
          </svg>
          <span>Est. 2025</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
