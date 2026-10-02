import React from 'react';
import {
  GraduationCap,
  MapPin,
  Target,
  Code2,
  Database,
  Brain,
  Compass,
  CheckCircle2,
  BookOpen,
  Sparkles,
  ArrowRight,
  Briefcase,
} from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { useProfilePhoto } from '../context/ProfilePhotoContext';

interface AboutProps {
  onOpenResume: () => void;
}

export const About: React.FC<AboutProps> = ({ onOpenResume }) => {
  const { photoUrl } = useProfilePhoto();
  const iconMap: Record<string, React.ReactNode> = {
    Education: <GraduationCap className="w-5 h-5 text-cyan-400" />,
    Location: <MapPin className="w-5 h-5 text-emerald-400" />,
    Internship: <Briefcase className="w-5 h-5 text-purple-400" />,
    "Core Focus": <Target className="w-5 h-5 text-blue-400" />,
    Programming: <Code2 className="w-5 h-5 text-amber-400" />,
    Databases: <Database className="w-5 h-5 text-indigo-400" />,
  };

  return (
    <section id="about" className="py-20 sm:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-mono text-xs uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Professional Background</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            About Me
          </h2>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
            Aspiring AI/ML Engineer with hands-on experience in machine learning pipelines, LLM-based RAG architectures, and industry internship delivery.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Main Narrative Card */}
          <div className="lg:col-span-7 space-y-6">
            <div className="rounded-2xl glass-panel p-6 sm:p-8 border border-slate-700/80 shadow-xl space-y-5">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                Problem Solver Through Data & Software
              </h3>

              {/* Exact bio paragraph requested by the user */}
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                {portfolioData.personal.aboutDescription}
              </p>

              <div className="pt-4 border-t border-slate-800/80 space-y-3">
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400">
                  Key Professional Values
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300">
                  <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-white block">Analytical Rigor</span>
                      <span className="text-[11px] text-slate-400">Understanding data distribution and feature importance before model selection.</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-white block">Practical Application</span>
                      <span className="text-[11px] text-slate-400">Transforming machine learning research into functional web tools.</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                    <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-white block">Database Reliability</span>
                      <span className="text-[11px] text-slate-400">Ensuring clean relational schemas (MySQL) and flexible stores (MongoDB).</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-white block">Continuous Learning</span>
                      <span className="text-[11px] text-slate-400">Expanding expertise in modern Python libraries and emerging AI paradigms.</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex items-center gap-4">
                <button
                  onClick={onOpenResume}
                  className="inline-flex items-center gap-2 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors group"
                >
                  <span>Review full CV breakdown</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>

          {/* Quick Info Cards Column */}
          <div className="lg:col-span-5 space-y-3.5">
            {/* Candidate Identity Card */}
            <div className="rounded-2xl glass-panel p-4 sm:p-5 border border-slate-700/80 shadow-lg flex items-center gap-4 bg-slate-900/60">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden p-0.5 bg-gradient-to-tr from-cyan-400 to-blue-600 shrink-0 shadow-md">
                <img
                  src={photoUrl}
                  alt={portfolioData.personal.name}
                  className="w-full h-full object-cover object-top rounded-[10px]"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="space-y-1 min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider">Candidate Profile</span>
                </div>
                <h4 className="text-base font-bold text-white truncate">{portfolioData.personal.name}</h4>
                <p className="text-xs text-cyan-400 font-mono truncate">{portfolioData.personal.title}</p>
                <p className="text-[11px] text-slate-400 truncate">Bishop Heber College • CGPA 8.28</p>
              </div>
            </div>

            <h3 className="text-xs font-mono uppercase tracking-widest text-slate-400 px-1 pt-1">
              Quick Information Cards
            </h3>

            <div className="space-y-3">
              {portfolioData.personal.quickInfo.map((item, index) => (
                <div
                  key={index}
                  className="rounded-xl glass-panel p-4 border border-slate-800 hover:border-slate-700 transition-all duration-200 flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center group-hover:scale-105 transition-transform">
                      {iconMap[item.label] || <Brain className="w-5 h-5 text-cyan-400" />}
                    </div>
                    <div>
                      <span className="text-[10px] font-mono uppercase text-slate-400 block tracking-wider">
                        {item.label}
                      </span>
                      <span className="text-sm font-bold text-white group-hover:text-cyan-400 transition-colors">
                        {item.value}
                      </span>
                    </div>
                  </div>
                  <span className="text-[11px] font-mono text-slate-400 hidden sm:block text-right">
                    {item.detail}
                  </span>
                </div>
              ))}
            </div>

            {/* Academic Commitment & Internship Badge */}
            <div className="rounded-xl bg-gradient-to-r from-cyan-950/40 via-blue-950/40 to-slate-900 p-4 border border-cyan-500/20 text-xs text-slate-300 flex items-start gap-3 mt-4">
              <BookOpen className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-white">Academic Excellence & Industry Training</p>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Pursuing M.Sc. Data Science at Bishop Heber College (CGPA: 8.28, Top 10 in class) and completed an AI & ML Internship at FrontierWox Tech Private Limited developing RAG-powered chatbot systems.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
