/**
 * The Meridian Society — Public Registration Widget
 * 
 * A hardened registration gate that verifies persistent member identities (M26-XXXX)
 * and performs atomic ticket checks via the Sovereign RPC layer.
 */

import { useState, useRef, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { PublicRegisterResultSchema, parseOrFail } from '@/utils/rpcSchemas';

// ── Active SVG Icons (used in render) ──

const CheckCircleIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

const XCircleIcon = ({ size = 14, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="10" />
    <line x1="15" y1="9" x2="9" y2="15" />
    <line x1="9" y1="9" x2="15" y2="15" />
  </svg>
);

const LoaderIcon = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
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

interface PublicRegistrationProps {
  eventId: string;
  eventName?: string;
  onSuccess?: (data: { id: string; token: string; member_name: string }) => void;
  onClose?: () => void;
}

export default function PublicRegistration({ eventId, onSuccess }: PublicRegistrationProps) {
  const mountedRef = useRef(false);
  const [memberNumber, setMemberNumber] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [regData, setRegData] = useState<{ id: string; token: string; member_name: string } | null>(null);

  // Mounted Guard
  useEffect(() => {
    mountedRef.current = true;
    return () => { mountedRef.current = false; };
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

  return (
    <div 
      className="registration-panel-inner"
      role="dialog"
      aria-modal="true"
      aria-labelledby="ticket-title"
    >
      <div className="ticket-box-outer">
        

        {/* ── SUCCESS STATE (Minimal Archival) ── */}
        <div className={`transition-all duration-700 ease-elegant ${status === 'success' ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none absolute inset-0'}`}>
          {status === 'success' && (
            <div className="success-minimal">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 border border-[var(--gold)]/20 rounded-full flex items-center justify-center text-[var(--gold)]">
                  <CheckCircleIcon />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="success-minimal-title">Ticket Secured.</h3>
                <div className="w-8 h-px bg-[var(--gold)]/30 mx-auto" />
                <p className="success-minimal-greeting">
                  Thank you, {regData?.member_name.split(' ')[0]}.
                </p>
                <p className="success-minimal-blurb">
                  Your Member Card is now active for this Event. 
                  Present your digital QR code at the entrance for entry.
                </p>
              </div>

              <div className="pt-8">
                <button 
                  onClick={() => { setStatus('idle'); setMemberNumber(''); }}
                  className="btn-secondary-ghost"
                >
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
              <div className="ticket-header">
                <span className="ticket-eyebrow">Ticket Entrance</span>
                <h3 id="ticket-title" className="ticket-title">Secure <em>Ticket.</em></h3>
                <div className="w-12 h-px bg-[var(--gold)]/40 mx-auto mt-6" />
              </div>

              <p className="text-[14px] serif italic text-[var(--ink)]/40 text-center leading-relaxed mb-10 px-6">
                Enter your member number below to secure your ticket. Ticket access is strictly reserved for verified Society members.
              </p>

              <form onSubmit={handleRegister} className="space-y-8">
                <div className="relative">
                  <label className="text-[9px] sans font-bold tracking-[0.3em] text-gold uppercase block mb-1 text-center">
                    Member ID
                  </label>
                  
                  <div className="ticket-input-wrap">
                    <input
                      type="text"
                      className="ticket-input"
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
                          <span className="text-[10px] sans font-bold tracking-[0.3em] uppercase">Secure Ticket</span>
                        </>
                      )}
                    </span>
                  </button>
                </div>
                
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
