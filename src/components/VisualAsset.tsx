import React from 'react';
import {
  Brain,
  Database,
  BarChart3,
  Bot,
  Globe,
  UtensilsCrossed,
  Award,
  CheckCircle2,
  Code2,
  Cpu,
  Layers,
  Sparkles,
} from 'lucide-react';

interface ProjectGraphicProps {
  projectId: string;
  title: string;
  className?: string;
}

export const ProjectGraphic: React.FC<ProjectGraphicProps> = ({ projectId, title, className = '' }) => {
  if (projectId === 'intern-performance-prediction') {
    return (
      <div className={`relative w-full h-full min-h-[220px] bg-gradient-to-br from-slate-900 via-indigo-950/70 to-slate-950 p-5 flex flex-col justify-between overflow-hidden border border-indigo-500/20 rounded-xl group ${className}`}>
        {/* Glow ambient background */}
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-cyan-500/15 rounded-full blur-3xl group-hover:bg-cyan-500/25 transition-all duration-500 pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-indigo-500/15 rounded-full blur-2xl group-hover:bg-indigo-500/25 transition-all duration-500 pointer-events-none" />

        {/* Top Header Mockup Bar */}
        <div className="flex items-center justify-between z-10">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
            <span className="text-[11px] font-mono text-slate-400 ml-2">model_pipeline.py</span>
          </div>
          <span className="px-2 py-0.5 text-[10px] font-medium tracking-wide uppercase rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 flex items-center gap-1">
            <Brain className="w-3 h-3" /> Scikit-Learn
          </span>
        </div>

        {/* Center UI Analytics Card */}
        <div className="my-3 z-10 bg-slate-900/85 backdrop-blur-md rounded-lg p-3.5 border border-slate-700/60 shadow-lg shadow-black/40">
          <div className="flex justify-between items-center mb-2.5">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-xs">
                IP
              </div>
              <div>
                <p className="text-xs font-semibold text-white">Intern Score Evaluation</p>
                <p className="text-[10px] text-slate-400">Class: High Potential (92%)</p>
              </div>
            </div>
            <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
              Verified
            </span>
          </div>

          {/* Mini Bar charts */}
          <div className="space-y-1.5 pt-1">
            <div>
              <div className="flex justify-between text-[10px] text-slate-300 mb-0.5">
                <span>Task Accuracy</span>
                <span className="font-mono text-cyan-400">94.8%</span>
              </div>
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full" style={{ width: '94.8%' }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-[10px] text-slate-300 mb-0.5">
                <span>Domain Readiness</span>
                <span className="font-mono text-cyan-400">89.2%</span>
              </div>
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full" style={{ width: '89.2%' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom tags */}
        <div className="flex items-center justify-between text-[11px] text-slate-400 z-10 pt-1 border-t border-slate-800/80">
          <div className="flex items-center gap-1.5 text-cyan-400 font-mono text-[10px]">
            <Database className="w-3 h-3 text-emerald-400" />
            <span>MongoDB Atlas Connected</span>
          </div>
          <span className="text-slate-400 text-[10px]">Flask REST Service</span>
        </div>
      </div>
    );
  }

  if (projectId === 'student-assistant-chatbot') {
    return (
      <div className={`relative w-full h-full min-h-[220px] bg-gradient-to-br from-slate-900 via-emerald-950/50 to-slate-950 p-5 flex flex-col justify-between overflow-hidden border border-emerald-500/20 rounded-xl group ${className}`}>
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-emerald-500/15 rounded-full blur-3xl group-hover:bg-emerald-500/25 transition-all duration-500 pointer-events-none" />

        <div className="flex items-center justify-between z-10">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
            <span className="text-[11px] font-mono text-slate-400 ml-2">campus_assistant.py</span>
          </div>
          <span className="px-2 py-0.5 text-[10px] font-medium tracking-wide uppercase rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
            <Bot className="w-3 h-3" /> Python, LLM & RAG
          </span>
        </div>

        {/* Chat Interface Preview */}
        <div className="my-2 z-10 space-y-2">
          <div className="bg-slate-800/80 text-slate-200 text-[11px] p-2 rounded-lg rounded-tl-none border border-slate-700/60 max-w-[85%] self-start shadow">
            <span className="text-[9px] block text-cyan-400 font-mono mb-0.5">Student Inquiry</span>
            "What is the schedule for Semester 2 Data Science practicals?"
          </div>
          <div className="bg-emerald-950/80 text-emerald-200 text-[11px] p-2.5 rounded-lg rounded-tr-none border border-emerald-500/30 max-w-[90%] ml-auto shadow">
            <span className="text-[9px] block text-emerald-400 font-mono mb-0.5 flex items-center gap-1">
              <Sparkles className="w-2.5 h-2.5" /> Campus Assistant AI
            </span>
            "Practicals commence on Monday at Lab 3. Syllabus: ML Pipelines with Python & Scikit-Learn."
          </div>
        </div>

        <div className="flex items-center justify-between text-[11px] text-slate-400 z-10 pt-1 border-t border-slate-800/80">
          <span className="text-emerald-400 text-[10px] font-mono flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Interactive Agent Active
          </span>
          <span className="text-slate-400 text-[10px]">Contextual Memory</span>
        </div>
      </div>
    );
  }

  if (projectId === 'portfolio-website') {
    return (
      <div className={`relative w-full h-full min-h-[220px] bg-gradient-to-br from-slate-900 via-sky-950/60 to-slate-950 p-5 flex flex-col justify-between overflow-hidden border border-sky-500/20 rounded-xl group ${className}`}>
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-sky-500/15 rounded-full blur-3xl group-hover:bg-sky-500/25 transition-all duration-500 pointer-events-none" />

        <div className="flex items-center justify-between z-10">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
            <span className="text-[11px] font-mono text-slate-400 ml-2">App.tsx • React 19</span>
          </div>
          <span className="px-2 py-0.5 text-[10px] font-medium tracking-wide uppercase rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/30 flex items-center gap-1">
            <Globe className="w-3 h-3" /> Modern Web
          </span>
        </div>

        {/* Portfolio Mock Preview */}
        <div className="my-2 z-10 bg-slate-900/90 rounded-lg p-3 border border-slate-800 shadow-lg">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center font-bold text-white shadow-md shadow-cyan-500/20">
              KB
            </div>
            <div>
              <p className="text-xs font-bold text-white">Kabil B Portfolio</p>
              <p className="text-[10px] text-cyan-400 font-mono">M.Sc. Data Science • Bishop Heber</p>
            </div>
          </div>
          <div className="mt-2.5 grid grid-cols-3 gap-1.5 text-center">
            <div className="bg-slate-800/80 p-1.5 rounded border border-slate-700/50">
              <span className="text-[9px] text-slate-400 block">Dark/Light</span>
              <span className="text-[11px] font-semibold text-emerald-400">Synced</span>
            </div>
            <div className="bg-slate-800/80 p-1.5 rounded border border-slate-700/50">
              <span className="text-[9px] text-slate-400 block">Responsive</span>
              <span className="text-[11px] font-semibold text-cyan-400">100%</span>
            </div>
            <div className="bg-slate-800/80 p-1.5 rounded border border-slate-700/50">
              <span className="text-[9px] text-slate-400 block">Audience</span>
              <span className="text-[11px] font-semibold text-indigo-400">Recruiter</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between text-[11px] text-slate-400 z-10 pt-1 border-t border-slate-800/80">
          <span className="text-sky-400 text-[10px] font-mono flex items-center gap-1">
            <Code2 className="w-3 h-3" /> React.js + Tailwind CSS
          </span>
          <span className="text-slate-400 text-[10px]">Zero Pill Discipline</span>
        </div>
      </div>
    );
  }

  // ecommerce-sales-analytics & fallback
  return (
    <div className={`relative w-full h-full min-h-[220px] bg-gradient-to-br from-slate-900 via-cyan-950/40 to-slate-950 p-5 flex flex-col justify-between overflow-hidden border border-cyan-500/20 rounded-xl group ${className}`}>
      <div className="absolute -top-12 -right-12 w-48 h-48 bg-cyan-500/15 rounded-full blur-3xl group-hover:bg-cyan-500/25 transition-all duration-500 pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-500/15 rounded-full blur-2xl pointer-events-none" />

      <div className="flex items-center justify-between z-10">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
          <span className="text-[11px] font-mono text-slate-400 ml-2">sales_analytics.pbix</span>
        </div>
        <span className="px-2 py-0.5 text-[10px] font-medium tracking-wide uppercase rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 flex items-center gap-1">
          <BarChart3 className="w-3 h-3" /> Power BI & DAX
        </span>
      </div>

      {/* Analytics Dashboard Mockup Card */}
      <div className="my-2 z-10 bg-slate-900/90 rounded-lg p-3 border border-slate-800 shadow-lg space-y-2.5">
        <div className="grid grid-cols-3 gap-2 text-center pb-2 border-b border-slate-800">
          <div className="bg-slate-800/80 p-1.5 rounded border border-slate-700/60">
            <span className="text-[9px] text-slate-400 block font-mono">Gross Sales</span>
            <span className="text-xs font-bold text-cyan-400 font-mono">$248.6K</span>
            <span className="text-[8px] text-emerald-400 block">+16.2% YoY</span>
          </div>
          <div className="bg-slate-800/80 p-1.5 rounded border border-slate-700/60">
            <span className="text-[9px] text-slate-400 block font-mono">Profit Margin</span>
            <span className="text-xs font-bold text-emerald-400 font-mono">28.4%</span>
            <span className="text-[8px] text-slate-400 block">DAX Calculated</span>
          </div>
          <div className="bg-slate-800/80 p-1.5 rounded border border-slate-700/60">
            <span className="text-[9px] text-slate-400 block font-mono">Active Users</span>
            <span className="text-xs font-bold text-white font-mono">14,290</span>
            <span className="text-[8px] text-cyan-400 block">RFM Scored</span>
          </div>
        </div>

        {/* Visual Mini Bars */}
        <div className="space-y-1 pt-0.5">
          <div className="flex justify-between text-[10px] text-slate-300">
            <span>Sales Trends & Top Category Velocity</span>
            <span className="font-mono text-cyan-400">92% Target</span>
          </div>
          <div className="flex items-end gap-1 h-6 w-full pt-1">
            <div className="flex-1 bg-cyan-500/40 rounded-t h-[40%]" />
            <div className="flex-1 bg-cyan-500/60 rounded-t h-[65%]" />
            <div className="flex-1 bg-cyan-500/50 rounded-t h-[55%]" />
            <div className="flex-1 bg-cyan-400 rounded-t h-[85%]" />
            <div className="flex-1 bg-blue-500/70 rounded-t h-[70%]" />
            <div className="flex-1 bg-blue-500 rounded-t h-[95%]" />
            <div className="flex-1 bg-indigo-500 rounded-t h-[80%]" />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between text-[11px] text-slate-400 z-10 pt-1 border-t border-slate-800/80">
        <span className="text-cyan-400 text-[10px] font-mono flex items-center gap-1">
          <Layers className="w-3 h-3" /> Python + SQL + Pandas + DAX
        </span>
        <span className="text-slate-400 text-[10px]">Customer Insights</span>
      </div>
    </div>
  );
};

interface CertificateGraphicProps {
  title: string;
  issuer: string;
  skills: string[];
  accentColor?: string;
  className?: string;
}

export const CertificateGraphic: React.FC<CertificateGraphicProps> = ({
  title,
  issuer,
  skills,
  accentColor = '#06b6d4',
  className = '',
}) => {
  return (
    <div
      className={`relative w-full h-full min-h-[220px] bg-gradient-to-br from-slate-900 via-slate-900/95 to-slate-950 p-6 flex flex-col justify-between rounded-xl border border-slate-800 shadow-md group hover:border-cyan-500/40 transition-all duration-300 ${className}`}
    >
      {/* Decorative certificate corner borders */}
      <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-slate-600/40 rounded-tl pointer-events-none" />
      <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-slate-600/40 rounded-tr pointer-events-none" />
      <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-slate-600/40 rounded-bl pointer-events-none" />
      <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-slate-600/40 rounded-br pointer-events-none" />

      {/* Top Header Badge */}
      <div className="flex justify-between items-start z-10">
        <div className="flex items-center gap-2">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center text-white shadow"
            style={{ backgroundColor: `${accentColor}25`, color: accentColor }}
          >
            <Award className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] font-mono tracking-wider uppercase text-slate-400 block">
              Certificate of Completion
            </span>
            <span className="text-xs font-semibold text-slate-200">{issuer}</span>
          </div>
        </div>
        <span
          className="text-[10px] px-2 py-0.5 rounded-full font-mono font-medium border"
          style={{
            borderColor: `${accentColor}40`,
            backgroundColor: `${accentColor}15`,
            color: accentColor,
          }}
        >
          Verified
        </span>
      </div>

      {/* Certificate Main Title */}
      <div className="my-3 z-10">
        <h4 className="text-base font-bold text-white group-hover:text-cyan-400 transition-colors">
          {title}
        </h4>
        <p className="text-[11px] text-slate-400 mt-1">
          Awarded to <span className="text-slate-200 font-semibold">Kabil B</span> for demonstrable proficiency.
        </p>

        {/* Skill Badges */}
        <div className="flex flex-wrap gap-1.5 mt-3">
          {skills.slice(0, 3).map((skill, idx) => (
            <span
              key={idx}
              className="text-[10px] px-2 py-0.5 rounded bg-slate-800/90 text-slate-300 border border-slate-700/60"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Footer Credentials */}
      <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between z-10 text-[10px] text-slate-400">
        <span className="flex items-center gap-1 text-emerald-400 font-medium">
          <CheckCircle2 className="w-3 h-3" /> Credential Authenticated
        </span>
        <span className="font-mono text-slate-400">Click to View Full Certificate</span>
      </div>
    </div>
  );
};
