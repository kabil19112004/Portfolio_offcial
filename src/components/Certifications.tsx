import React from 'react';
import { Award, CheckCircle, ExternalLink, Calendar, Sparkles, ShieldCheck } from 'lucide-react';
import { portfolioData, CertificateItem } from '../data/portfolioData';
import { CertificateGraphic } from './VisualAsset';

interface CertificationsProps {
  onSelectCertificate: (cert: CertificateItem) => void;
}

export const Certifications: React.FC<CertificationsProps> = ({ onSelectCertificate }) => {
  return (
    <section id="certifications" className="py-20 sm:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-mono text-xs uppercase tracking-wider">
            <Award className="w-3.5 h-3.5" />
            <span>Credentials & Proof of Mastery</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Certifications
          </h2>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
            Verified course certifications across Machine Learning, Python, Database Engineering, Tableau and AI development.
          </p>
        </div>

        {/* Certificates Grid (6 items) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {portfolioData.certifications.map((cert) => (
            <div
              key={cert.id}
              onClick={() => onSelectCertificate(cert)}
              className="rounded-2xl glass-panel border border-slate-800 hover:border-cyan-500/50 transition-all duration-300 shadow-xl overflow-hidden flex flex-col justify-between cursor-pointer group hover:-translate-y-1"
            >
              {/* Certificate Preview Card */}
              <div className="p-4 bg-slate-950/60">
                <CertificateGraphic
                  title={cert.title}
                  issuer={cert.issuer}
                  skills={cert.skills}
                  accentColor={cert.accentColor}
                />
              </div>

              {/* Bottom Card Summary */}
              <div className="p-5 border-t border-slate-800/80 bg-slate-900/50 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-white block group-hover:text-cyan-400 transition-colors">
                    {cert.title}
                  </span>
                  <span className="text-[11px] text-slate-400 block">{cert.issuer}</span>
                </div>

                <span className="text-xs font-mono text-cyan-400 flex items-center gap-1 group-hover:underline">
                  <span>View</span>
                  <ExternalLink className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Verification Note */}
        <div className="mt-12 p-4 rounded-xl glass-panel border border-slate-800/80 text-center max-w-xl mx-auto flex items-center justify-center gap-2 text-xs text-slate-400 font-mono">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Click any certificate card above to inspect full credential details.</span>
        </div>
      </div>
    </section>
  );
};
