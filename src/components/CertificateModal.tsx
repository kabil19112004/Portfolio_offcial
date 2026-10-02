import React, { useEffect } from 'react';
import { X, Award, CheckCircle, ExternalLink, Calendar, ShieldCheck, Download, Sparkles } from 'lucide-react';
import { CertificateItem } from '../data/portfolioData';

interface CertificateModalProps {
  certificate: CertificateItem | null;
  onClose: () => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({ certificate, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (certificate) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [certificate, onClose]);

  if (!certificate) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/60">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-cyan-400" />
            <h3 className="text-sm font-semibold text-white tracking-wide">Certificate Credential Details</h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Certificate Preview Frame */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Framed Certificate Document */}
          <div
            className="relative p-7 rounded-xl border-2 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 text-center shadow-inner overflow-hidden"
            style={{ borderColor: `${certificate.accentColor}60` }}
          >
            {/* Watermark icon */}
            <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
              <Award className="w-64 h-64 text-white" />
            </div>

            {/* Corner ornaments */}
            <div className="absolute top-2 left-2 w-5 h-5 border-t-2 border-l-2 rounded-tl" style={{ borderColor: certificate.accentColor }} />
            <div className="absolute top-2 right-2 w-5 h-5 border-t-2 border-r-2 rounded-tr" style={{ borderColor: certificate.accentColor }} />
            <div className="absolute bottom-2 left-2 w-5 h-5 border-b-2 border-l-2 rounded-bl" style={{ borderColor: certificate.accentColor }} />
            <div className="absolute bottom-2 right-2 w-5 h-5 border-b-2 border-r-2 rounded-br" style={{ borderColor: certificate.accentColor }} />

            <div className="relative z-10 space-y-3">
              <div className="flex items-center justify-center gap-1.5 text-xs font-mono tracking-widest uppercase text-cyan-400">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Verified Certificate of Accomplishment</span>
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                {certificate.title}
              </h2>

              <p className="text-xs text-slate-400">
                This certifies that
              </p>
              <p className="text-lg sm:text-xl font-bold text-cyan-300 font-sans tracking-wide">
                Kabil B
              </p>
              <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
                has successfully fulfilled all curriculum requirements and demonstrated applied competency in{' '}
                <span className="font-semibold text-white">{certificate.title}</span>.
              </p>

              <div className="pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
                <div className="text-left">
                  <span className="text-[10px] block text-slate-500 font-mono uppercase">Issued by</span>
                  <span className="font-semibold text-slate-200">{certificate.issuer}</span>
                </div>
                <div className="text-center">
                  <span className="text-[10px] block text-slate-500 font-mono uppercase">Authentication</span>
                  <span className="inline-flex items-center gap-1 text-emerald-400 font-mono text-[11px]">
                    <ShieldCheck className="w-3.5 h-3.5" /> {certificate.credentialBadge}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] block text-slate-500 font-mono uppercase">Status</span>
                  <span className="text-cyan-400 font-mono text-[11px] font-semibold">{certificate.year}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Metadata Breakdown */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400">
              Curriculum Overview & Competencies
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-3.5 rounded-lg border border-slate-800">
              {certificate.description}
            </p>

            <div>
              <span className="text-xs text-slate-400 block mb-2 font-mono">Endorsed Skills:</span>
              <div className="flex flex-wrap gap-2">
                {certificate.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="text-xs px-2.5 py-1 rounded-md bg-slate-800 text-cyan-300 border border-slate-700 font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="px-6 py-4 border-t border-slate-800 bg-slate-950/60 flex items-center justify-between">
          <span className="text-xs text-slate-400 font-mono flex items-center gap-1.5">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
            Recruiter Verified Document
          </span>
          <button
            onClick={() => window.print()}
            className="px-3.5 py-1.5 text-xs font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors flex items-center gap-1.5 border border-slate-700"
          >
            <Download className="w-3.5 h-3.5 text-cyan-400" />
            Print / Save
          </button>
        </div>
      </div>
    </div>
  );
};
