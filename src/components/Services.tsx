import React from 'react';
import { BarChart3, Cpu, CodeXml, DatabaseZap, CheckCircle2, Sparkles, Wrench } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export const Services: React.FC = () => {
  const serviceIconMap: Record<string, React.ReactNode> = {
    'data-analysis': <BarChart3 className="w-6 h-6 text-cyan-400" />,
    'machine-learning': <Cpu className="w-6 h-6 text-indigo-400" />,
    'web-development': <CodeXml className="w-6 h-6 text-emerald-400" />,
    'database-development': <DatabaseZap className="w-6 h-6 text-amber-400" />,
  };

  return (
    <section id="services" className="py-20 sm:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-mono text-xs uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Technical Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            What I Can Do
          </h2>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
            Core technical domains where I build solutions, conduct analytical evaluations, and engineer reliable applications.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {portfolioData.services.map((service) => (
            <div
              key={service.id}
              className="rounded-2xl glass-panel p-6 sm:p-8 border border-slate-800 hover:border-slate-700 transition-all duration-300 shadow-xl flex flex-col justify-between group hover:-translate-y-1"
            >
              <div className="space-y-4">
                {/* Header with Icon */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform shadow-md">
                    {serviceIconMap[service.id]}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-xs text-slate-400 font-mono mt-0.5">{service.tagline}</p>
                  </div>
                </div>

                {/* Prompt-mandated description */}
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-slate-900/50 p-3.5 rounded-xl border border-slate-800">
                  {service.description}
                </p>

                {/* Scope & Deliverables */}
                <div>
                  <span className="text-[11px] font-mono uppercase text-slate-400 block mb-2 tracking-wider">
                    Core Competencies:
                  </span>
                  <ul className="space-y-1.5">
                    {service.deliverables.map((item, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Tools Stack */}
              <div className="mt-6 pt-3 border-t border-slate-800/80 flex flex-wrap items-center gap-1.5">
                <span className="text-[11px] font-mono text-slate-400 mr-1 flex items-center gap-1">
                  <Wrench className="w-3 h-3 text-cyan-400" /> Tools:
                </span>
                {service.tools.map((t, idx) => (
                  <span
                    key={idx}
                    className="text-[10px] px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-800 font-mono"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
