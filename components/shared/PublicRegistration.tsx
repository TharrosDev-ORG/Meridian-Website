/**
 * The Meridian Society — Public Registration Widget
 * 
 * A hardened registration gate that verifies persistent member identities (M26-XXXX)
 * and performs atomic admission checks via the Sovereign RPC layer.
 */

import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { PublicRegisterResultSchema, parseOrFail } from '@/utils/rpcSchemas';

// Raw SVGs for Icons
const CheckCircleIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

const XCircleIcon = ({ size = 14, className = "" }: { size?: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="10" />
    <line x1="15" y1="9" x2="9" y2="15" />
    <line x1="9" y1="9" x2="15" y2="15" />
  </svg>
);

const LoaderIcon = ({ size = 24, className = "" }: { size?: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="12" y1="2" x2="12" y2="6" />
    <line x1="12" y1="18" x2="12" y2="22" />
    <line x1="4.93" y1="4.93" x2="7.76" y2="7.76" />
    <line x1="16.24" y1="16.24" x2="19.07" y2="19.07" />
    <line x1="2" y1="12" x2="6" y2="12" />
    <line x1="18" y1="12" x2="22" y2="12" />
    <line x1="4.93" y1="19.07" x2="7.76" y2="16.24" />
    <line x1="16.24" y1="7.76" x2="19.07" y2="4.93" />
  </svg>
);

const ArrowRightIcon = ({ size = 14, className = "" }: { size?: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

const TicketIcon = ({ size = 24, className = "" }: { size?: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
    <path d="M13 5v2" />
    <path d="M13 17v2" />
    <path d="M13 11v2" />
  </svg>
);

const SocietySeal = ({ className = "" }: { className?: string }) => (
  <svg width="200" height="200" viewBox="0 0 200 200" className={className} fill="none" stroke="currentColor">
    <circle cx="100" cy="100" r="80" strokeWidth="1" strokeDasharray="4 4" />
    <circle cx="100" cy="100" r="72" strokeWidth="0.5" />
    <path d="M60 100 L140 100" strokeWidth="0.5" opacity="0.3" />
    <path d="M100 60 L100 140" strokeWidth="0.5" opacity="0.3" />
  </svg>
);

interface PublicRegistrationProps {
  eventId: string;
  eventName?: string;
  onSuccess?: (data: { id: string; token: string; member_name: string }) => void;
  onClose?: () => void;
}

export default function PublicRegistration({ eventId, eventName, onSuccess, onClose }: PublicRegistrationProps) {
  const [mounted, setMounted] = useState(false);
  const [memberNumber, setMemberNumber] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [regData, setRegData] = useState<{ id: string; token: string; member_name: string } | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanNumber = memberNumber.trim();
    if (!cleanNumber || status === 'submitting') return;

    setStatus('submitting');
    setMessage('');

    const supabase = createClient();

    try {
      const { data, error } = await supabase.rpc('public_register_member_for_event', {
        p_event_id: eventId,
        p_member_number: cleanNumber
      });

      if (error) {
        setStatus('error');
        setMessage(error.message || 'Verification system connection error.');
        return;
      }

      const result = parseOrFail(PublicRegisterResultSchema, data);
      
      if (result.success && result.data) {
        const payload = result.data;
        setRegData(payload);
        setStatus('success');
        setMessage(result.message);
        if (onSuccess) onSuccess(payload);
      } else {
        setStatus('error');
        setMessage(result.message);
      }
    } catch (err) {
      console.error('[REGISTRATION_ERROR]', err);
      setStatus('error');
      setMessage('An unexpected error occurred. Please try again.');
    }
  };

  if (!mounted) return null;

  return (
    <div 
      className="registration-panel-inner"
      role="dialog"
      aria-modal="true"
      aria-labelledby="admission-title"
    >
      <div className="registry-box-outer">
        
        {/* Close button inside the frame */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-[var(--ink-30)] hover:text-[var(--gold)] transition-colors p-2 z-[100]"
          aria-label="Close portal"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* ── SUCCESS STATE (Minimal Archival) ── */}
        <div className={`transition-all duration-700 ease-elegant ${status === 'success' ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none absolute inset-0'}`}>
          {status === 'success' && (
            <div className="success-minimal">
              <div className="flex justify-center mb-10">
                <div className="w-20 h-20 border border-[var(--gold)]/20 rounded-full flex items-center justify-center text-[var(--gold)]">
                  <CheckCircleIcon />
                </div>
              </div>

              <h3 className="text-[32px] serif italic text-[var(--ink)] mb-4">Ticket Secured.</h3>
              
              <div className="w-10 h-px bg-[var(--gold)]/30 mx-auto mb-8" />
              
              <div className="space-y-4 mb-10">
                <p className="text-xl serif text-[var(--ink-80)]">
                  Thank you, {regData?.member_name.split(' ')[0]}.
                </p>
                <p className="text-[15px] serif italic text-[var(--ink)]/50 leading-relaxed px-4">
                  Your Society Member Card is now active for this gathering. 
                  Present your digital QR code at the entrance for seamless admission to the registry.
                </p>
              </div>

              <div className="pt-8 border-t border-[var(--ink)]/05">
                <button 
                  onClick={() => { setStatus('idle'); setMemberNumber(''); }}
                  className="text-[10px] sans font-bold tracking-[0.3em] text-[var(--gold)] uppercase hover:text-[var(--gold-lt)] transition-all flex items-center gap-2 mx-auto group"
                >
                  <span className="w-4 h-px bg-[var(--gold)]/30 transition-all group-hover:w-8" />
                  Register Another
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ── IDLE / FORM STATE (Archival Entrance) ── */}
        <div className={`transition-all duration-700 ease-elegant ${status !== 'success' ? 'opacity-100 scale-100' : 'opacity-0 scale-105 pointer-events-none absolute inset-0'}`}>
          {status !== 'success' && (
            <div className="flex flex-col relative z-10">
              <div className="admission-header">
                <span className="admission-eyebrow">Member Entrance</span>
                <h3 id="admission-title" className="admission-title">Secure <em>Admission.</em></h3>
                <div className="w-12 h-px bg-[var(--gold)]/40 mx-auto mt-6" />
              </div>

              <p className="text-[14px] serif italic text-[var(--ink)]/40 text-center leading-relaxed mb-10 px-6">
                Authentication required. Enter your persistent member number to secure your place in the registry.
              </p>

              <form onSubmit={handleRegister} className="space-y-8">
                <div className="relative">
                  <label className="text-[9px] sans font-bold tracking-[0.3em] text-[var(--ink)]/40 uppercase block mb-3 text-center">
                    Registry Identifier
                  </label>
                  
                  <div className="registry-input-wrap">
                    <input
                      type="text"
                      className="registry-input"
                      value={memberNumber}
                      onChange={(e) => setMemberNumber(e.target.value.toUpperCase())}
                      placeholder="M26-XXXX"
                      disabled={status === 'submitting'}
                      spellCheck={false}
                      autoComplete="off"
                    />
                  </div>
                </div>

                {status === 'error' && (
                  <div className="flex items-start gap-4 text-red-900/70 bg-red-50/50 p-4 border border-red-500/20 animate-in fade-in slide-in-from-top-1 duration-500">
                    <XCircleIcon className="mt-1 shrink-0" />
                    <span className="text-[13px] serif italic leading-snug">{message}</span>
                  </div>
                )}

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={!memberNumber.trim() || status === 'submitting'}
                    className="btn-primary w-full py-5 relative overflow-hidden group/btn disabled:opacity-20"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-4">
                      {status === 'submitting' ? (
                        <>
                          <LoaderIcon className="animate-spin" size={14} />
                          <span className="text-[10px] sans font-bold tracking-[0.3em] uppercase">Authenticating...</span>
                        </>
                      ) : (
                        <>
                          <span className="text-[10px] sans font-bold tracking-[0.3em] uppercase">Secure Admission</span>
                          <ArrowRightIcon className="transition-transform group-hover/btn:translate-x-2" />
                        </>
                      )}
                    </span>
                  </button>
                </div>
                
                <div className="pt-6">
                  <p className="text-center text-[9px] sans font-bold tracking-[0.2em] text-[var(--ink)]/25 uppercase leading-relaxed">
                    Authentication required.
                  </p>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
