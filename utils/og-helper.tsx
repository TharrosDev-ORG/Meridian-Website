// Font type matching next/og requirements
export interface OGFont {
  name: string;
  data: ArrayBuffer;
  style: 'normal' | 'italic';
  weight: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
}

// Font loading helper
export async function getFonts(): Promise<OGFont[]> {
  // URLs for Google Fonts (subsetted for latin only to keep size down)
  const serifRegUrl = 'https://fonts.gstatic.com/s/cormorantgaramond/v21/co3umX5slCNuHLi8bLeY9MK7whWMhyjypVO7abI26QOD_v86GnM.ttf';
  const serifItalicUrl = 'https://fonts.gstatic.com/s/cormorantgaramond/v21/co3smX5slCNuHLi8bLeY9MK7whWMhyjYrGFEsdtdc62E6zd58jDOjw.ttf';
  const sansBoldUrl = 'https://fonts.gstatic.com/s/barlowcondensed/v13/HTxwL3I-JCGChYJ8VI-L6OO_au7B46r2_3E.ttf';

  const [serifRegRes, serifItalicRes, sansBoldRes] = await Promise.all([
    fetch(serifRegUrl).then(res => res.arrayBuffer()),
    fetch(serifItalicUrl).then(res => res.arrayBuffer()),
    fetch(sansBoldUrl).then(res => res.arrayBuffer()),
  ]);

  return [
    {
      name: 'serif',
      data: serifRegRes,
      style: 'normal' as const,
      weight: 400 as const,
    },
    {
      name: 'serif',
      data: serifItalicRes,
      style: 'italic' as const,
      weight: 400 as const,
    },
    {
      name: 'sans',
      data: sansBoldRes,
      style: 'normal' as const,
      weight: 700 as const,
    },
  ];
}

interface OGLayoutProps {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  label?: string;
}

export function getOGLayout({ title, subtitle, eyebrow, label }: OGLayoutProps) {
  const COLORS = {
    cream: '#F4EDE3',
    creamMid: '#EBE3D5',
    gold: '#B8932A',
    goldLt: '#D4B86A',
    ink: '#18150F',
    ink75: 'rgba(24, 21, 15, 0.75)',
    ink15: 'rgba(24, 21, 15, 0.15)',
  };

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: COLORS.cream,
        position: 'relative',
        padding: '0 80px',
        overflow: 'hidden',
      }}
    >
      {/* Mesh Gradient Background */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          backgroundImage: `
            radial-gradient(circle at 0% 0%, ${COLORS.creamMid} 0%, transparent 50%),
            radial-gradient(circle at 100% 0%, rgba(184, 147, 42, 0.05) 0%, transparent 40%),
            radial-gradient(circle at 100% 100%, ${COLORS.creamMid} 0%, transparent 50%),
            radial-gradient(circle at 0% 100%, rgba(184, 147, 42, 0.05) 0%, transparent 40%)
          `,
        }}
      />

      {/* Surface Grain Texture Simulation */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.04,
          backgroundImage: 'radial-gradient(#18150F 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      {/* Structural Framing Lines */}
      <div style={{ position: 'absolute', top: '40px', left: '40px', right: '40px', bottom: '40px', border: `1px solid ${COLORS.ink15}`, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: '50px', left: '50px', right: '50px', bottom: '50px', border: `1px solid ${COLORS.ink15}`, opacity: 0.5, pointerEvents: 'none' }} />

      {/* Decorative Diamond Markers (Drawn with SVG Path) */}
      <svg width="40" height="40" viewBox="0 0 40 40" style={{ position: 'absolute', top: '25px', left: '25px', opacity: 0.8 }}>
        <path d="M20 0L40 20L20 40L0 20Z" fill={COLORS.gold} />
      </svg>
      <svg width="24" height="24" viewBox="0 0 40 40" style={{ position: 'absolute', top: '33px', right: '35px', opacity: 0.4 }}>
        <path d="M20 0L40 20L20 40L0 20Z" fill={COLORS.gold} />
      </svg>
      <svg width="24" height="24" viewBox="0 0 40 40" style={{ position: 'absolute', bottom: '33px', left: '35px', opacity: 0.4 }}>
        <path d="M20 0L40 20L20 40L0 20Z" fill={COLORS.gold} />
      </svg>

      {/* Content Container */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          zIndex: 10,
        }}
      >
        {/* Eyebrow */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '32px',
          }}
        >
          <div style={{ width: '20px', height: '1px', background: COLORS.ink15 }} />
          <span
            style={{
              fontFamily: 'sans',
              fontSize: '14px',
              fontWeight: 700,
              letterSpacing: '0.4em',
              textTransform: 'uppercase',
              color: COLORS.gold,
            }}
          >
            {eyebrow || 'THE MERIDIAN SOCIETY'}
          </span>
          <div style={{ width: '20px', height: '1px', background: COLORS.ink15 }} />
        </div>

        {/* Title Block */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <h1
            style={{
              fontFamily: 'serif',
              fontSize: '92px',
              fontWeight: 400,
              color: COLORS.ink,
              lineHeight: 1.1,
              margin: 0,
              padding: 0,
              maxWidth: '900px',
            }}
          >
            {title.includes(' ') ? (
              <>
                {title.split(' ').slice(0, -1).join(' ')}{' '}
                <span style={{ fontStyle: 'italic' }}>{title.split(' ').slice(-1)}</span>
              </>
            ) : (
              title
            )}
          </h1>
          
          {subtitle && (
            <p
              style={{
                fontFamily: 'serif',
                fontSize: '28px',
                fontStyle: 'italic',
                color: COLORS.ink75,
                marginTop: '16px',
                maxWidth: '600px',
              }}
            >
              {subtitle}
            </p>
          )}
        </div>

        {/* Footer info */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            marginTop: '52px',
            fontFamily: 'sans',
            fontSize: '13px',
            fontWeight: 700,
            letterSpacing: '0.24em',
            textTransform: 'uppercase',
            color: COLORS.ink,
            opacity: 0.6,
          }}
        >
          <span>Ottawa</span>
          <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: COLORS.gold }} />
          <span>Independent</span>
          <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: COLORS.gold }} />
          <span>{label || 'Est. 2025'}</span>
        </div>
      </div>
    </div>
  );
}
