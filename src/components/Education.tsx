import React from 'react';
import { GraduationCap, Calendar, MapPin, Award, CheckCircle2, BookOpen, Sparkles } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export const Education: React.FC = () => {
  return (
    <section id="education" className="py-20 sm:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-mono text-xs uppercase tracking-wider">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Academic Milestones</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Education
          </h2>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
            Card-based & vertical timeline illustrating academic qualifications, core disciplines and performance metrics.
          </p>
        </div>

        {/* Timeline Container: Desktop vertical timeline with center/left line, mobile stacked cards */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Timeline Guide Line */}
          <div className="hidden md:block absolute left-8 top-6 bottom-6 w-0.5 bg-gradient-to-b from-cyan-400 via-blue-500 to-indigo-500/30" />

          <div className="space-y-10 sm:space-y-12">
            {portfolioData.education.map((item, index) => {
              const isCurrent = item.status === 'In Progress';
              return (
                <div key={item.id} className="relative md:pl-20 group">
                  {/* Timeline Node Marker on desktop */}
                  <div
                    className={`hidden md:flex absolute left-4.5 top-6 -translate-x-1/2 w-8 h-8 rounded-full items-center justify-center border-2 transition-transform duration-300 group-hover:scale-110 shadow-lg ${
                      isCurrent
                        ? 'bg-slate-900 border-cyan-400 text-cyan-400 shadow-cyan-500/30'
                        : 'bg-slate-900 border-blue-500 text-blue-400 shadow-blue-500/20'
                    }`}
                  >
                    <GraduationCap className="w-4 h-4" />
                  </div>

                  {/* Education Card */}
                  <div
                    className={`rounded-2xl glass-panel p-6 sm:p-7 border transition-all duration-300 shadow-xl ${
                      isCurrent
                        ? 'border-cyan-500/40 hover:border-cyan-500/60'
                        : 'border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    {/* Top Row: Degree & Metadata */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2.5 pb-4 border-b border-slate-800/80">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                            {item.degree}
                          </h3>
                          {item.honors && (
                            <span className="px-2 py-0.5 text-[10px] font-mono font-medium rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                              {item.honors}
                            </span>
                          )}
                          {isCurrent && (
                            <span className="px-2 py-0.5 text-[10px] font-mono font-medium rounded-full bg-cyan-500/15 text-cyan-400 border border-cyan-500/30 animate-pulse">
                              Current
                            </span>
                          )}
                        </div>
                        <p className="text-sm font-semibold text-slate-200">{item.institution}</p>
                      </div>

                      <div className="flex flex-wrap sm:flex-col sm:items-end gap-2 text-xs">
                        <span className="px-3 py-1 rounded-lg font-mono font-bold text-cyan-300 bg-cyan-500/10 border border-cyan-500/20">
                          CGPA: {item.cgpa}
                        </span>
                        <div className="flex items-center gap-1.5 text-slate-400 font-mono text-[11px]">
                          <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                          <span>{item.period}</span>
                        </div>
                      </div>
                    </div>

                    {/* Description Paragraph */}
                    <div className="py-4">
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic bg-slate-900/50 p-3.5 rounded-xl border border-slate-800">
                        "{item.description}"
                      </p>
                    </div>

                    {/* Location & Key Coursework */}
                    <div className="pt-2 space-y-3">
                      <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
                        <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                        <span>{item.location}</span>
                      </div>

                      <div>
                        <span className="text-[11px] font-mono uppercase text-slate-400 block mb-2 tracking-wider">
                          Key Academic Curriculum & Knowledge Acquired:
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {item.coursework.map((course, idx) => (
                            <span
                              key={idx}
                              className="text-xs px-2.5 py-1 rounded-md bg-slate-900/90 text-slate-300 border border-slate-800 font-medium"
                            >
                              {course}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
