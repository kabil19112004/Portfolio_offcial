import React from 'react';
import { Award, BrainCircuit, CheckCircle2, FolderGit2, GraduationCap, TrendingUp } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export const Stats: React.FC = () => {
  const statIcons = [
    <FolderGit2 className="w-5 h-5 text-cyan-400" />,
    <Award className="w-5 h-5 text-indigo-400" />,
    <BrainCircuit className="w-5 h-5 text-emerald-400" />,
    <GraduationCap className="w-5 h-5 text-amber-400" />,
  ];

  return (
    <section className="py-14 relative border-y border-slate-800/80 bg-slate-950/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {portfolioData.stats.map((stat, index) => (
            <div
              key={index}
              className="p-5 sm:p-6 rounded-2xl glass-panel border border-slate-800 hover:border-slate-700 transition-all duration-200 flex flex-col justify-between group shadow"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center group-hover:scale-105 transition-transform">
                  {statIcons[index] || <TrendingUp className="w-5 h-5 text-cyan-400" />}
                </div>
                <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  <CheckCircle2 className="w-2.5 h-2.5" /> Verified
                </span>
              </div>

              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-white font-mono tracking-tight group-hover:text-cyan-400 transition-colors">
                  {stat.value}
                </p>
                <p className="text-xs sm:text-sm font-semibold text-slate-200 mt-1">
                  {stat.label}
                </p>
                <p className="text-[11px] text-slate-400 font-mono mt-0.5">
                  {stat.subtext}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
