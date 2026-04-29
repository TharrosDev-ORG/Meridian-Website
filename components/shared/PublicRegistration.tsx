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
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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

const TicketIcon = ({ size = 20, className = "" }: { size?: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
    <path d="M13 5v2" />
    <path d="M13 17v2" />
    <path d="M13 11v2" />
  </svg>
);

interface PublicRegistrationProps {
  eventId: string;
  eventName?: string;
  onSuccess?: (data: { id: string; token: string; member_name: string }) => void;
}

export default function PublicRegistration({ eventId, eventName, onSuccess }: PublicRegistrationProps) {
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

  if (!mounted) return (
    <div className="w-full max-w-md mx-auto aspect-square flex items-center justify-center bg-[var(--cream-mid)] border border-[var(--ink)]/05">
      <LoaderIcon className="animate-spin text-[var(--gold)]/30" />
    </div>
  );

  return (
    <div className="w-full max-w-md mx-auto bg-[var(--cream-mid)] border border-[var(--ink)]/10 p-8 md:p-10 shadow-[0_30px_60px_-15px_rgba(24,21,15,0.1)] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--gold)]/05 -mr-16 -mt-16 rounded-full blur-2xl pointer-events-none" />
      
      <div className={`transition-all duration-500 ${status === 'success' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none hidden'}`}>
        {status === 'success' && (
          <div className="flex flex-col items-center text-center py-4">
            <div className="w-16 h-16 bg-[var(--gold)]/10 rounded-full flex items-center justify-center mb-6">
              <CheckCircleIcon />
            </div>
            
            <h3 className="text-2xl md:text-3xl serif mb-3 text-[var(--ink)]">Admission Secured</h3>
            <p className="text-[13px] serif italic text-[var(--ink)]/60 mb-10 leading-relaxed max-w-[280px]">
              {message}<br />
              <span className="text-[var(--gold)] font-medium mt-1 inline-block">Member: {regData?.member_name}</span>
            </p>

            <div className="w-full border-t border-[var(--ink)]/10 pt-8 mt-2 space-y-6">
               <div className="bg-white/40 border border-[var(--ink)]/05 p-5 flex items-center justify-between rounded-sm">
                  <div className="text-left">
                    <span className="text-[9px] sans font-bold tracking-[0.24em] text-[var(--ink)]/40 block mb-1 uppercase">Archival Handle</span>
                    <span className="text-[11px] font-mono tracking-tight text-[var(--ink)]/60">{regData?.id}</span>
                  </div>
                  <TicketIcon className="text-[var(--gold)]/30" />
               </div>
               
               <p className="text-[10px] sans font-medium tracking-[0.15em] text-[var(--ink)]/30 uppercase max-w-[240px] mx-auto">
                 Your digital pass has been linked to your persistent identity.
               </p>

               <button 
                 onClick={() => { setStatus('idle'); setMemberNumber(''); }}
                 className="text-[10px] sans font-bold tracking-[0.24em] text-[var(--gold)] uppercase hover:text-[var(--gold-lt)] transition-colors mt-4"
               >
                 Register Another
               </button>
            </div>
          </div>
        )}
      </div>

      <div className={`transition-all duration-500 ${status !== 'success' ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none hidden'}`}>
        {status !== 'success' && (
          <div className="flex flex-col relative z-10">
            <div className="mb-10">
              <span className="text-[9px] sans font-bold tracking-[0.3em] text-[var(--gold)] uppercase mb-4 block">
                Archival Event Entrance
              </span>
              <h3 className="text-2xl md:text-4xl serif mb-4 leading-tight text-[var(--ink)]">
                {eventName || 'Secure Registration'}
              </h3>
              <p className="text-[14px] serif italic text-[var(--ink)]/50 leading-relaxed">
                Please authenticate using your Meridian Member Number to secure your place in the archives.
              </p>
            </div>

            <form onSubmit={handleRegister} className="space-y-8">
              <div className="relative group">
                <label className="text-[9px] sans font-bold tracking-[0.24em] text-[var(--ink)]/40 uppercase block mb-3">
                  Member Number
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={memberNumber}
                    onChange={(e) => setMemberNumber(e.target.value.toUpperCase())}
                    placeholder="M26-XXXX"
                    disabled={status === 'submitting'}
                    spellCheck={false}
                    autoComplete="off"
                    className="w-full bg-transparent border-b border-[var(--ink)]/15 py-4 text-xl md:text-2xl serif focus:outline-none focus:border-[var(--gold)] transition-all placeholder:text-[var(--ink)]/10 uppercase tracking-[0.1em] text-[var(--ink)]"
                  />
                  <div className="absolute bottom-0 left-0 h-[2px] bg-[var(--gold)] w-0 group-focus-within:w-full transition-all duration-700 ease-elegant" />
                </div>
              </div>

              {status === 'error' && (
                <div className="flex items-start gap-3 text-red-700/80 bg-red-50/50 p-4 border-l-2 border-red-500/50 animate-in fade-in slide-in-from-top-1 duration-300">
                  <XCircleIcon className="mt-0.5 shrink-0" />
                  <span className="text-[12px] serif italic leading-snug">{message}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={!memberNumber.trim() || status === 'submitting'}
                className="btn-primary w-full py-5 relative overflow-hidden group/btn disabled:opacity-30"
              >
                <span className="relative z-10 flex items-center justify-center gap-3">
                  {status === 'submitting' ? (
                    <>
                      <LoaderIcon className="animate-spin" size={16} />
                      <span className="text-[11px] sans font-bold tracking-[0.24em] uppercase">Verifying Identity...</span>
                    </>
                  ) : (
                    <>
                      <span className="text-[11px] sans font-bold tracking-[0.24em] uppercase">Secure Access</span>
                      <ArrowRightIcon className="transition-transform group-hover/btn:translate-x-1.5" />
                    </>
                  )}
                </span>
              </button>
              
              <p className="text-center text-[9px] sans font-bold tracking-[0.2em] text-[var(--ink)]/25 uppercase pt-4">
                Strictly for verified Society members only.
              </p>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
