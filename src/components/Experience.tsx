import React from 'react';
import { Briefcase, Code, Brain, Globe, CheckCircle2, Sparkles, FolderGit2, Cpu } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export const Experience: React.FC = () => {
  const iconMap: Record<string, React.ReactNode> = {
    'ai-ml-intern': <Brain className="w-5 h-5 text-cyan-400" />,
    'ml-research': <Cpu className="w-5 h-5 text-indigo-400" />,
    'full-stack-dev': <Globe className="w-5 h-5 text-emerald-400" />,
  };

  return (
    <section id="experience" className="py-20 sm:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-mono text-xs uppercase tracking-wider">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Applied Technical Track</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Experience & Practical Work
          </h2>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
            Industry AI/ML internship delivery, machine learning prediction pipelines, and full-stack application development.
          </p>
        </div>

        {/* Experience Cards */}
        <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
          {portfolioData.experience.map((item) => (
            <div
              key={item.id}
              className={`rounded-2xl glass-panel p-6 sm:p-8 border transition-all duration-300 shadow-xl space-y-4 group ${
                item.isInternship
                  ? 'border-cyan-500/40 hover:border-cyan-400'
                  : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              {/* Header with Title and Type */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 border-b border-slate-800/80">
                <div className="flex items-start sm:items-center gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    {iconMap[item.id] || <FolderGit2 className="w-5 h-5 text-cyan-400" />}
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                        {item.role}
                      </h3>
                      {item.company && (
                        <span className="text-sm font-semibold text-slate-300">
                          — {item.company}
                        </span>
                      )}
                      <span
                        className={`text-[11px] font-mono px-2.5 py-0.5 rounded-full font-medium ${
                          item.isInternship
                            ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30'
                            : 'bg-slate-800 text-slate-300 border border-slate-700'
                        }`}
                      >
                        {item.badge}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 font-medium mt-0.5">
                      {item.organizationType}
                    </p>
                  </div>
                </div>

                <div className="text-xs font-mono text-slate-400 sm:text-right">
                  <span className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 inline-block font-semibold">
                    {item.period}
                  </span>
                </div>
              </div>

              {/* Exact user description quote */}
              <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80">
                <p className="text-xs sm:text-sm text-slate-300 italic">
                  "{item.description}"
                </p>
              </div>

              {/* Key Practical Deliverables */}
              <div>
                <span className="text-[11px] font-mono uppercase text-slate-400 block mb-2 tracking-wider">
                  Key Responsibilities & Deliverables:
                </span>
                <ul className="space-y-1.5">
                  {item.responsibilities.map((resp, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Applied Skills Badges */}
              <div className="pt-2 flex flex-wrap items-center gap-1.5 border-t border-slate-800/60">
                <span className="text-[11px] font-mono text-slate-400 mr-1.5">Applied:</span>
                {item.skillsUsed.map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    className="text-[10px] px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-800 font-mono"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Clear Notice / Recruiter Transparency */}
        <div className="mt-12 text-center max-w-2xl mx-auto">
          <p className="text-[11px] font-mono text-slate-400 bg-slate-900/40 p-3 rounded-xl border border-slate-800">
            Note: All experiences above accurately reflect self-directed technical development, academic research, and freelance project implementations without inventing corporate employment.
          </p>
        </div>
      </div>
    </section>
  );
};
