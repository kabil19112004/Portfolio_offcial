import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowRight,
  Download,
  Mail,
  Github,
  Linkedin,
  Terminal,
  Brain,
  Database,
  BarChart,
  Code2,
  Sparkles,
  MapPin,
  CheckCircle2,
  Cpu,
  Camera,
  Upload,
  FileText,
} from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { useProfilePhoto } from '../context/ProfilePhotoContext';
import { generateResumePDF } from '../utils/generateResumePDF';

interface HeroProps {
  onOpenResume: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenResume }) => {
  const { photoUrl, setPhotoFile, hasCustomPhoto, removeCustomPhoto } = useProfilePhoto();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const roles = portfolioData.personal.roles;
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPhotoFile(e.target.files[0]);
    }
  };

  // Subtle professional typing effect
  useEffect(() => {
    const fullText = roles[currentRoleIndex];
    const typingSpeed = isDeleting ? 38 : 75;
    const pauseTime = isDeleting ? 400 : 2200;

    let timer: NodeJS.Timeout;

    if (!isDeleting && currentText === fullText) {
      timer = setTimeout(() => setIsDeleting(true), pauseTime);
    } else if (isDeleting && currentText === '') {
      setIsDeleting(false);
      setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
    } else {
      timer = setTimeout(() => {
        const nextText = isDeleting
          ? fullText.substring(0, currentText.length - 1)
          : fullText.substring(0, currentText.length + 1);
        setCurrentText(nextText);
      }, typingSpeed);
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentRoleIndex, roles]);

  return (
    <section id="home" className="relative min-h-[92vh] pt-28 pb-16 sm:pt-36 sm:pb-24 flex items-center justify-center overflow-hidden">
      {/* Subtle radial ambient gradients (not overpowering) */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-gradient-to-tr from-cyan-500/10 via-blue-500/10 to-indigo-500/5 rounded-full blur-[130px] pointer-events-none -z-10" />
      <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-blue-600/10 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Text & Call to Actions */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Status chip */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-panel border border-slate-700/60 shadow-sm text-xs text-slate-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
              <span className="font-mono text-cyan-400 font-medium">Available for AI/ML Engineer & Data Science Roles</span>
              <span className="text-slate-600">•</span>
              <span className="text-slate-400 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-cyan-400" /> Tiruchirappalli, India
              </span>
            </div>

            {/* Intro and Name */}
            <div className="space-y-2">
              <p className="text-base sm:text-lg font-medium text-slate-400 tracking-wide">
                Hello, I'm
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
                {portfolioData.personal.name}
              </h1>
            </div>

            {/* Main title & Typing animation */}
            <div className="space-y-2">
              <h2 className="text-lg sm:text-xl font-semibold text-slate-200">
                {portfolioData.personal.title}
              </h2>

              {/* Typing line */}
              <div className="flex items-center justify-center lg:justify-start gap-2 h-8 text-base sm:text-lg font-mono">
                <span className="text-slate-400">&gt;</span>
                <span className="text-cyan-400 font-semibold">{currentText}</span>
                <span className="inline-block w-2 h-5 bg-cyan-400 animate-blink -ml-1" />
              </div>
            </div>

            {/* Short professional description */}
            <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              {portfolioData.personal.heroDescription}
            </p>

            {/* Action Buttons: 1. View Projects 2. Download Resume 3. Contact Me */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-2">
              <a
                href="#projects"
                className="px-5 py-3 text-xs sm:text-sm font-semibold rounded-xl text-slate-950 bg-gradient-to-r from-cyan-400 to-blue-400 hover:from-cyan-300 hover:to-blue-300 transition-all duration-200 shadow-lg shadow-cyan-500/20 flex items-center gap-2 active:scale-95 group"
              >
                <span>View Projects</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </a>

              {/* Download PDF Resume Button & Preview Modal trigger */}
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => generateResumePDF()}
                  className="px-4 py-3 text-xs sm:text-sm font-semibold rounded-xl text-slate-950 bg-gradient-to-r from-cyan-400 to-blue-400 hover:from-cyan-300 hover:to-blue-300 transition-all duration-200 shadow-md shadow-cyan-500/20 flex items-center gap-2 active:scale-95 cursor-pointer"
                  title="Download Kabil B Resume in official PDF format"
                >
                  <Download className="w-4 h-4" />
                  <span>Download PDF</span>
                </button>
                <button
                  onClick={onOpenResume}
                  className="px-3.5 py-3 text-xs sm:text-sm font-semibold rounded-xl text-slate-200 hover:text-white glass-panel hover:bg-slate-800/80 transition-all duration-200 border border-slate-700/80 hover:border-cyan-500/40 flex items-center gap-1.5 active:scale-95 shadow cursor-pointer"
                  title="Preview resume online"
                >
                  <FileText className="w-4 h-4 text-cyan-400" />
                  <span className="hidden sm:inline">Preview</span>
                </button>
              </div>

              <a
                href="#contact"
                className="px-5 py-3 text-xs sm:text-sm font-semibold rounded-xl text-slate-300 hover:text-cyan-400 glass-panel hover:bg-slate-800/50 transition-all duration-200 border border-slate-800 hover:border-slate-700 flex items-center gap-2"
              >
                <Mail className="w-4 h-4" />
                <span>Contact Me</span>
              </a>
            </div>

            {/* Social Links & Highlights */}
            <div className="pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-center lg:justify-start gap-5 text-xs text-slate-400">
              <div className="flex items-center gap-3">
                <a
                  href={portfolioData.personal.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white flex items-center justify-center transition-colors border border-slate-800 hover:border-slate-700 shadow"
                  aria-label="GitHub Profile"
                  title="GitHub Profile"
                >
                  <Github className="w-4 h-4" />
                </a>

                <a
                  href={portfolioData.personal.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white flex items-center justify-center transition-colors border border-slate-800 hover:border-slate-700 shadow"
                  aria-label="LinkedIn Profile"
                  title="LinkedIn Profile"
                >
                  <Linkedin className="w-4 h-4 text-cyan-400" />
                </a>

                <a
                  href={`mailto:${portfolioData.personal.email}`}
                  className="w-9 h-9 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white flex items-center justify-center transition-colors border border-slate-800 hover:border-slate-700 shadow"
                  aria-label="Direct Email"
                  title="Direct Email"
                >
                  <Mail className="w-4 h-4 text-blue-400" />
                </a>
              </div>

              <span className="text-slate-600 hidden sm:inline">•</span>

              <div className="flex items-center gap-3 font-mono text-[11px] text-slate-300">
                <span className="flex items-center gap-1 text-slate-400">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  M.Sc. Data Science @ Bishop Heber
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: High-tech Profile Card / Visual Identity */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-sm sm:max-w-md">
              {/* Outer decorative glow frame */}
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-indigo-500/20 blur-xl opacity-75" />

              {/* Main Profile Showcase Card */}
              <div className="relative rounded-2xl glass-panel p-6 sm:p-7 border border-slate-700/80 shadow-2xl space-y-5">
                {/* Header tag */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                    <span className="text-xs font-mono font-medium text-slate-300 uppercase tracking-wider">
                      Candidate Profile
                    </span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                    CGPA 8.28
                  </span>
                </div>

                {/* Profile Portrait Presentation */}
                <div className="relative mx-auto w-36 h-36 sm:w-44 sm:h-44 rounded-2xl p-1 bg-gradient-to-tr from-cyan-400 via-blue-500 to-indigo-600 shadow-xl group">
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full h-full rounded-[14px] bg-slate-900 overflow-hidden relative flex items-center justify-center cursor-pointer"
                    title="Click to upload your original photo (1000148432.png)"
                  >
                    <img
                      src={photoUrl}
                      alt={`${portfolioData.personal.name} - Candidate Profile`}
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />

                    {/* Subtle bottom gradient vignette */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none" />

                    {/* Hover Upload Overlay */}
                    <div className="absolute inset-0 bg-slate-950/70 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1.5 p-2 text-center">
                      <Camera className="w-5 h-5 text-cyan-400" />
                      <span className="text-[10px] font-semibold text-white">Upload Original Photo</span>
                      <span className="text-[9px] text-cyan-300 font-mono">1000148432.png</span>
                    </div>
                  </div>

                  {/* Corner status chip */}
                  <div className="absolute -bottom-2 -right-2 px-2.5 py-0.5 rounded-full bg-slate-900 border border-cyan-500/40 text-[10px] font-mono text-cyan-400 flex items-center gap-1 shadow-md">
                    <Sparkles className="w-3 h-3 text-cyan-300" />
                    <span>2025–27</span>
                  </div>
                </div>

                {/* Direct Upload Action Button */}
                <div className="flex flex-col items-center gap-1.5 pt-0.5">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/*"
                    className="hidden"
                  />
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    type="button"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 text-xs font-semibold transition-all hover:scale-105 active:scale-95 shadow-sm cursor-pointer"
                  >
                    <Camera className="w-3.5 h-3.5" />
                    <span>{hasCustomPhoto ? 'Change Original Photo' : 'Upload Original Photo (1000148432.png)'}</span>
                  </button>
                  {hasCustomPhoto ? (
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Original Photo Active
                      </span>
                      <button
                        onClick={removeCustomPhoto}
                        type="button"
                        className="text-[10px] font-mono text-slate-400 hover:text-rose-400 underline transition-colors cursor-pointer"
                      >
                        Reset
                      </button>
                    </div>
                  ) : (
                    <span className="text-[10px] font-mono text-slate-400">
                      Upload original photo directly without changes
                    </span>
                  )}
                </div>

                {/* Information snippets */}
                <div className="space-y-1.5 pt-1 text-center">
                  <h3 className="text-base font-bold text-white">KABIL B</h3>
                  <p className="text-xs text-cyan-400 font-mono font-medium">AI/ML Engineer • FrontierWox Tech Intern</p>
                  <p className="text-[11px] text-slate-400 font-mono">Bishop Heber College (Top 10 in class)</p>
                </div>

                {/* Key Skills Mini Matrix */}
                <div className="grid grid-cols-2 gap-2 pt-1 text-xs">
                  <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center shrink-0">
                      <Brain className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 font-mono">Specialization</p>
                      <p className="text-xs font-semibold text-white">AI / ML & GenAI</p>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center shrink-0">
                      <Code2 className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 font-mono">Programming</p>
                      <p className="text-xs font-semibold text-white">Python, R, SQL</p>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center shrink-0">
                      <Database className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 font-mono">Databases</p>
                      <p className="text-xs font-semibold text-white">MongoDB & MySQL</p>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
                      <Cpu className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 font-mono">Architectures</p>
                      <p className="text-xs font-semibold text-white">RAG & LLM Bots</p>
                    </div>
                  </div>
                </div>

                {/* Bottom verification footnote */}
                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                  <span className="flex items-center gap-1 text-emerald-400 font-mono text-[10px]">
                    <CheckCircle2 className="w-3 h-3" /> Factual & ATS Friendly
                  </span>
                  <a
                    href="#about"
                    className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors text-[11px]"
                  >
                    Read Bio &rarr;
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
