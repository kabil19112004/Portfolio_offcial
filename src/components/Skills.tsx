import React from 'react';
import {
  Code,
  BrainCircuit,
  Globe,
  Database,
  CheckCircle,
  Sparkles,
  Layers,
  Cpu,
  BarChart3,
  Wrench,
} from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export const Skills: React.FC = () => {
  const categoryIconMap: Record<string, React.ReactNode> = {
    "Programming & Query Languages": <Code className="w-5 h-5 text-cyan-400" />,
    "ML & Data Libraries": <Layers className="w-5 h-5 text-blue-400" />,
    "Machine Learning & Deep Learning": <BrainCircuit className="w-5 h-5 text-indigo-400" />,
    "Generative AI & NLP": <Sparkles className="w-5 h-5 text-amber-400" />,
    "Data Analysis & Visualization": <BarChart3 className="w-5 h-5 text-emerald-400" />,
    "Web, Backend & Databases": <Database className="w-5 h-5 text-sky-400" />,
    "Tools & Platforms": <Wrench className="w-5 h-5 text-purple-400" />,
  };

  const levelColorMap: Record<string, { bg: string; text: string; border: string }> = {
    Intermediate: {
      bg: 'bg-cyan-500/10',
      text: 'text-cyan-300',
      border: 'border-cyan-500/30',
    },
    'Working Knowledge': {
      bg: 'bg-emerald-500/10',
      text: 'text-emerald-300',
      border: 'border-emerald-500/30',
    },
    Familiar: {
      bg: 'bg-blue-500/10',
      text: 'text-blue-300',
      border: 'border-blue-500/30',
    },
  };

  return (
    <section id="skills" className="py-20 sm:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-mono text-xs uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Technical Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Technical Skills
          </h2>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
            Honest and categorized competencies backed by academic curriculum and hands-on project work.
          </p>
        </div>

        {/* Categories Grid (4 distinct groups) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {portfolioData.skillCategories.map((cat, idx) => (
            <div
              key={idx}
              className="rounded-2xl glass-panel p-6 sm:p-7 border border-slate-800 hover:border-slate-700/80 transition-all duration-300 shadow-xl flex flex-col justify-between group"
            >
              <div>
                {/* Category Header */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-800/80 mb-5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center group-hover:scale-105 transition-transform">
                      {categoryIconMap[cat.title] || <Layers className="w-5 h-5 text-cyan-400" />}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">
                        {cat.title}
                      </h3>
                      <p className="text-xs text-slate-400">{cat.description}</p>
                    </div>
                  </div>
                  <span className="text-[11px] font-mono text-slate-500">
                    {cat.skills.length} skills
                  </span>
                </div>

                {/* Skills Cards / Badges */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {cat.skills.map((skill, sIdx) => {
                    const levelColors = levelColorMap[skill.level] || levelColorMap.Intermediate;
                    return (
                      <div
                        key={sIdx}
                        className="p-3 rounded-xl bg-slate-900/70 border border-slate-800/80 hover:border-slate-700 transition-all duration-200 flex flex-col justify-between"
                      >
                        <div className="flex items-center justify-between gap-1 mb-2">
                          <span className="text-sm font-semibold text-white">{skill.name}</span>
                          <CheckCircle className="w-3.5 h-3.5 text-slate-500" />
                        </div>
                        <span
                          className={`text-[10px] font-mono font-medium px-2 py-0.5 rounded w-fit border ${levelColors.bg} ${levelColors.text} ${levelColors.border}`}
                        >
                          {skill.level}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Bottom tag */}
              <div className="mt-5 pt-3 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-500 font-mono">
                <span>Verified through coursework & projects</span>
                <span className="text-cyan-400/80">Active Stack</span>
              </div>
            </div>
          ))}
        </div>

        {/* Legend Footnote */}
        <div className="mt-12 p-4 rounded-xl glass-panel border border-slate-800/80 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400 font-mono">
          <span className="text-slate-500">Proficiency Standards:</span>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
            <span className="text-slate-300">Intermediate</span>
            <span className="text-slate-500 text-[10px]">(Hands-on problem solving)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
            <span className="text-slate-300">Working Knowledge</span>
            <span className="text-slate-500 text-[10px]">(Practical project application)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-400" />
            <span className="text-slate-300">Familiar</span>
            <span className="text-slate-500 text-[10px]">(Theoretical & academic foundation)</span>
          </div>
        </div>
      </div>
    </section>
  );
};
