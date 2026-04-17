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

const COLORS = {
  cream: '#F4EDE3',
  creamMid: '#EBE3D5',
  gold: '#B8932A',
  goldLt: '#D4B86A',
  ink: '#18150F',
  ink75: 'rgba(24, 21, 15, 0.75)',
  ink30: 'rgba(24, 21, 15, 0.30)',
  ink15: 'rgba(24, 21, 15, 0.15)',
  cream75: 'rgba(244, 237, 227, 0.75)',
  cream15: 'rgba(244, 237, 227, 0.15)',
};

export type OGVariant =
  | 'home'
  | 'events'
  | 'membership'
  | 'speak'
  | 'social'
  | 'team';

interface OGLayoutProps {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  label?: string;
  variant?: OGVariant;
}

// ---------- Variant illustrations ----------

function Diamond({ size, fill, opacity = 1 }: { size: number; fill: string; opacity?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" style={{ opacity }}>
      <path d="M20 0L40 20L20 40L0 20Z" fill={fill} />
    </svg>
  );
}

function HomeMark({ stroke }: { stroke: string }) {
  // Meridian crest: large outlined diamond with a crossing horizontal rule + inner solid diamond
  return (
    <svg width="260" height="260" viewBox="0 0 260 260" style={{ display: 'flex' }}>
      <path d="M130 10 L250 130 L130 250 L10 130 Z" fill="none" stroke={stroke} strokeWidth="1.5" opacity="0.35" />
      <path d="M130 50 L210 130 L130 210 L50 130 Z" fill="none" stroke={stroke} strokeWidth="1.5" opacity="0.55" />
      <line x1="0" y1="130" x2="260" y2="130" stroke={stroke} strokeWidth="1" opacity="0.25" />
      <path d="M130 100 L160 130 L130 160 L100 130 Z" fill={stroke} />
    </svg>
  );
}

function EventsMark({ stroke }: { stroke: string }) {
  // Spotlight: concentric arcs emanating to the right, suggesting broadcast / stage light
  return (
    <svg width="260" height="260" viewBox="0 0 260 260" style={{ display: 'flex' }}>
      <circle cx="130" cy="130" r="14" fill={stroke} />
      <path d="M130 80 A50 50 0 0 1 130 180" fill="none" stroke={stroke} strokeWidth="1.5" opacity="0.7" />
      <path d="M130 55 A75 75 0 0 1 130 205" fill="none" stroke={stroke} strokeWidth="1.25" opacity="0.45" />
      <path d="M130 30 A100 100 0 0 1 130 230" fill="none" stroke={stroke} strokeWidth="1" opacity="0.25" />
      <path d="M130 5 A125 125 0 0 1 130 255" fill="none" stroke={stroke} strokeWidth="1" opacity="0.12" />
    </svg>
  );
}

function MembershipMark({ stroke }: { stroke: string }) {
  // Numbered seal: diamond frame with "№" mark
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '260px',
        height: '260px',
      }}
    >
      <svg width="260" height="260" viewBox="0 0 260 260" style={{ position: 'absolute' }}>
        <path d="M130 20 L240 130 L130 240 L20 130 Z" fill="none" stroke={stroke} strokeWidth="1.5" opacity="0.5" />
        <path d="M130 50 L210 130 L130 210 L50 130 Z" fill="none" stroke={stroke} strokeWidth="1" opacity="0.25" />
      </svg>
      <span
        style={{
          fontFamily: 'sans',
          fontSize: '22px',
          fontWeight: 700,
          letterSpacing: '0.3em',
          color: stroke,
          opacity: 0.75,
          marginBottom: '4px',
        }}
      >
        MEMBER
      </span>
      <span
        style={{
          fontFamily: 'serif',
          fontStyle: 'italic',
          fontSize: '96px',
          color: stroke,
          lineHeight: 1,
        }}
      >
        №
      </span>
      <span
        style={{
          fontFamily: 'sans',
          fontSize: '18px',
          fontWeight: 700,
          letterSpacing: '0.3em',
          color: stroke,
          opacity: 0.55,
          marginTop: '4px',
        }}
      >
        EST. 2025
      </span>
    </div>
  );
}

function SpeakMark({ stroke }: { stroke: string }) {
  // Paired italic quotation marks balanced across the diamond frame
  return (
    <div
      style={{
        display: 'flex',
        width: '260px',
        height: '260px',
        position: 'relative',
      }}
    >
      <svg width="260" height="260" viewBox="0 0 260 260" style={{ position: 'absolute' }}>
        <path d="M130 20 L240 130 L130 240 L20 130 Z" fill="none" stroke={stroke} strokeWidth="1" opacity="0.25" />
        <path d="M130 70 L190 130 L130 190 L70 130 Z" fill="none" stroke={stroke} strokeWidth="1" opacity="0.12" />
      </svg>
      <span
        style={{
          position: 'absolute',
          top: 10,
          left: 30,
          fontFamily: 'serif',
          fontStyle: 'italic',
          fontSize: '200px',
          color: stroke,
          lineHeight: 1,
          display: 'flex',
        }}
      >
        &ldquo;
      </span>
      <span
        style={{
          position: 'absolute',
          bottom: -40,
          right: 30,
          fontFamily: 'serif',
          fontStyle: 'italic',
          fontSize: '200px',
          color: stroke,
          opacity: 0.4,
          lineHeight: 1,
          display: 'flex',
        }}
      >
        &rdquo;
      </span>
    </div>
  );
}

function SocialMark({ stroke }: { stroke: string }) {
  // Three overlapping diamonds — gathering / nodes
  return (
    <svg width="260" height="260" viewBox="0 0 260 260" style={{ display: 'flex' }}>
      <path d="M80 70 L130 120 L80 170 L30 120 Z" fill="none" stroke={stroke} strokeWidth="1.5" opacity="0.55" />
      <path d="M180 70 L230 120 L180 170 L130 120 Z" fill="none" stroke={stroke} strokeWidth="1.5" opacity="0.55" />
      <path d="M130 140 L180 190 L130 240 L80 190 Z" fill={stroke} opacity="0.9" />
      <circle cx="80" cy="120" r="3" fill={stroke} />
      <circle cx="180" cy="120" r="3" fill={stroke} />
      <circle cx="130" cy="190" r="3" fill={COLORS.cream} />
    </svg>
  );
}

function TeamMark({ stroke }: { stroke: string }) {
  // 2x2 grid of abstract "name cards": diamond tag, title rule, two detail rules
  const card = (x: number, y: number, filled: boolean) => (
    <g opacity={filled ? 1 : 0.35}>
      <rect x={x} y={y} width="100" height="120" fill="none" stroke={stroke} strokeWidth="1.5" />
      {filled && (
        <g>
          <path d={`M${x + 18} ${y + 24} L${x + 26} ${y + 32} L${x + 18} ${y + 40} L${x + 10} ${y + 32} Z`} transform={`translate(${x + 2}, ${y - 6})`} fill={stroke} opacity="0.9" />
          <rect x={x + 36} y={y + 24} width="48" height="4" fill={stroke} opacity="0.85" />
          <rect x={x + 36} y={y + 34} width="32" height="2" fill={stroke} opacity="0.55" />
          <line x1={x + 16} y1={y + 64} x2={x + 84} y2={y + 64} stroke={stroke} strokeWidth="1" opacity="0.35" />
          <line x1={x + 16} y1={y + 80} x2={x + 76} y2={y + 80} stroke={stroke} strokeWidth="1" opacity="0.35" />
          <line x1={x + 16} y1={y + 96} x2={x + 68} y2={y + 96} stroke={stroke} strokeWidth="1" opacity="0.35" />
        </g>
      )}
    </g>
  );
  return (
    <svg width="260" height="260" viewBox="0 0 260 260" style={{ display: 'flex' }}>
      {card(15, 10, true)}
      {card(145, 10, false)}
      {card(15, 140, false)}
      {card(145, 140, true)}
    </svg>
  );
}

function renderVariant(variant: OGVariant, stroke: string) {
  switch (variant) {
    case 'events': return <EventsMark stroke={stroke} />;
    case 'membership': return <MembershipMark stroke={stroke} />;
    case 'speak': return <SpeakMark stroke={stroke} />;
    case 'social': return <SocialMark stroke={stroke} />;
    case 'team': return <TeamMark stroke={stroke} />;
    case 'home':
    default:
      return <HomeMark stroke={stroke} />;
  }
}

// ---------- Main layout ----------

export function getOGLayout({ title, subtitle, eyebrow, label, variant = 'home' }: OGLayoutProps) {
  const inverted = variant === 'membership';
  const bg = inverted ? COLORS.ink : COLORS.cream;
  const fg = inverted ? COLORS.cream : COLORS.ink;
  const fgMuted = inverted ? COLORS.cream75 : COLORS.ink75;
  const rule = inverted ? COLORS.cream15 : COLORS.ink15;
  const accent = COLORS.gold;
  const markStroke = inverted ? COLORS.goldLt : COLORS.gold;

  const titleWords = title.split(' ');
  const lastWord = titleWords.length > 1 ? titleWords.pop()! : '';
  const leadWords = titleWords.join(' ');

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        background: bg,
        position: 'relative',
        overflow: 'hidden',
        fontFamily: 'serif',
      }}
    >
      {/* Mesh gradient wash */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          backgroundImage: inverted
            ? `radial-gradient(circle at 85% 15%, rgba(184, 147, 42, 0.18) 0%, transparent 55%),
               radial-gradient(circle at 10% 90%, rgba(184, 147, 42, 0.08) 0%, transparent 50%)`
            : `radial-gradient(circle at 0% 0%, ${COLORS.creamMid} 0%, transparent 55%),
               radial-gradient(circle at 100% 100%, ${COLORS.creamMid} 0%, transparent 55%),
               radial-gradient(circle at 85% 15%, rgba(184, 147, 42, 0.08) 0%, transparent 45%)`,
        }}
      />

      {/* Grain */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: inverted ? 0.06 : 0.04,
          backgroundImage: `radial-gradient(${inverted ? COLORS.cream : COLORS.ink} 1px, transparent 1px)`,
          backgroundSize: '32px 32px',
        }}
      />

      {/* Corner ticks */}
      <svg width="28" height="28" style={{ position: 'absolute', top: 32, left: 32 }} viewBox="0 0 28 28">
        <path d="M0 0 L28 0 M0 0 L0 28" stroke={accent} strokeWidth="1.5" />
      </svg>
      <svg width="28" height="28" style={{ position: 'absolute', top: 32, right: 32 }} viewBox="0 0 28 28">
        <path d="M0 0 L28 0 M28 0 L28 28" stroke={accent} strokeWidth="1.5" opacity="0.5" />
      </svg>
      <svg width="28" height="28" style={{ position: 'absolute', bottom: 32, left: 32 }} viewBox="0 0 28 28">
        <path d="M0 0 L0 28 M0 28 L28 28" stroke={accent} strokeWidth="1.5" opacity="0.5" />
      </svg>
      <svg width="28" height="28" style={{ position: 'absolute', bottom: 32, right: 32 }} viewBox="0 0 28 28">
        <path d="M28 0 L28 28 M28 28 L0 28" stroke={accent} strokeWidth="1.5" />
      </svg>

      {/* Top masthead */}
      <div
        style={{
          position: 'absolute',
          top: 52,
          left: 80,
          right: 80,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontFamily: 'sans',
          fontSize: 14,
          fontWeight: 700,
          letterSpacing: '0.35em',
          textTransform: 'uppercase',
          color: fg,
          opacity: 0.7,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <Diamond size={10} fill={accent} />
          <span>The Meridian Society</span>
        </div>
        <span style={{ color: accent, opacity: inverted ? 0.85 : 1 }}>meridiansociety.ca</span>
      </div>

      {/* Content: editorial split */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          padding: '0 80px',
          marginTop: 40,
        }}
      >
        {/* Left: eyebrow + title + subtitle */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            paddingRight: 56,
            maxWidth: 720,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 28 }}>
            <div style={{ width: 28, height: 1, background: accent }} />
            <span
              style={{
                fontFamily: 'sans',
                fontSize: 15,
                fontWeight: 700,
                letterSpacing: '0.4em',
                textTransform: 'uppercase',
                color: accent,
              }}
            >
              {eyebrow || 'The Meridian Society'}
            </span>
          </div>

          <h1
            style={{
              fontFamily: 'serif',
              fontSize: 104,
              fontWeight: 400,
              color: fg,
              lineHeight: 1.02,
              letterSpacing: '-0.01em',
              margin: 0,
              padding: 0,
              display: 'flex',
              flexWrap: 'wrap',
            }}
          >
            {leadWords && <span style={{ marginRight: '0.25em' }}>{leadWords}</span>}
            <span style={{ fontStyle: 'italic', color: accent }}>{lastWord || title}</span>
          </h1>

          {subtitle && (
            <p
              style={{
                fontFamily: 'serif',
                fontSize: 26,
                fontStyle: 'italic',
                color: fgMuted,
                marginTop: 28,
                marginBottom: 0,
                lineHeight: 1.35,
                maxWidth: 600,
              }}
            >
              {subtitle}
            </p>
          )}
        </div>

        {/* Vertical rule */}
        <div
          style={{
            width: 1,
            alignSelf: 'stretch',
            background: rule,
            marginTop: 40,
            marginBottom: 40,
          }}
        />

        {/* Right: variant mark + metadata rail */}
        <div
          style={{
            width: 320,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            paddingLeft: 40,
          }}
        >
          {renderVariant(variant, markStroke)}
        </div>
      </div>

      {/* Bottom colophon */}
      <div
        style={{
          position: 'absolute',
          bottom: 52,
          left: 80,
          right: 80,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontFamily: 'sans',
          fontSize: 13,
          fontWeight: 700,
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          color: fg,
          opacity: 0.6,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span>{label || 'A Room For Discourse'}</span>
          <div style={{ width: 4, height: 4, borderRadius: 2, background: accent }} />
          <span>Ottawa</span>
        </div>
        <span>Est. 2025</span>
      </div>
    </div>
  );
}
