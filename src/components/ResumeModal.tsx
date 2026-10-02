import React, { useEffect } from 'react';
import {
  X,
  Download,
  Printer,
  CheckCircle,
  GraduationCap,
  Award,
  Code2,
  Briefcase,
  Mail,
  MapPin,
  Phone,
  Github,
  Linkedin,
  ExternalLink,
  Layers,
  Sparkles,
} from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { useProfilePhoto } from '../context/ProfilePhotoContext';
import { generateResumePDF } from '../utils/generateResumePDF';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const { photoUrl } = useProfilePhoto();
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleDownload = () => {
    generateResumePDF();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[94vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/80">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold">
              KB
            </div>
            <div>
              <h3 className="text-sm font-bold text-white leading-none">Curriculum Vitae • Kabil B</h3>
              <span className="text-[11px] font-mono text-cyan-400">AI/ML Engineer (Latest Official Resume)</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors flex items-center gap-1.5 border border-slate-700"
              title="Print resume"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Print</span>
            </button>
            <button
              onClick={handleDownload}
              className="px-3.5 py-1.5 text-xs font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 to-blue-400 hover:from-cyan-300 hover:to-blue-300 rounded-lg transition-all flex items-center gap-1.5 shadow active:scale-95 cursor-pointer"
              title="Download official resume as PDF format"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF (.pdf)</span>
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors ml-1"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Paper-styled CV Viewer (Exact layout from the uploaded resume) */}
        <div className="p-6 sm:p-10 overflow-y-auto space-y-6 bg-slate-950 text-slate-200 font-sans print:bg-white print:text-black">
          {/* Header */}
          <div className="text-center border-b border-slate-800 pb-5 space-y-2">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full mx-auto overflow-hidden p-0.5 bg-gradient-to-tr from-cyan-400 to-blue-600 shadow-md mb-2">
              <img
                src={photoUrl}
                alt="Kabil B Candidate Portrait"
                className="w-full h-full object-cover object-top rounded-full"
                referrerPolicy="no-referrer"
              />
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white uppercase">
              KABIL B
            </h1>
            <p className="text-base sm:text-lg font-semibold text-cyan-400 font-mono">
              AI/ML Engineer
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-xs text-slate-300 font-mono pt-1">
              <span className="flex items-center gap-1">
                <Mail className="w-3 h-3 text-cyan-400" />
                <a href="mailto:kabil19112004c@gmail.com" className="hover:underline">
                  kabil19112004c@gmail.com
                </a>
              </span>
              <span>|</span>
              <span className="flex items-center gap-1">
                <Phone className="w-3 h-3 text-emerald-400" />
                <a href="tel:+918807710529" className="hover:underline">
                  +91 8807710529
                </a>
              </span>
              <span>|</span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3 text-rose-400" />
                Tiruchirappalli, India
              </span>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-xs text-slate-400 font-mono">
              <span>
                LinkedIn:{' '}
                <a
                  href="https://linkedin.com/in/kabil-b-b0452a2a5"
                  target="_blank"
                  rel="noreferrer"
                  className="text-cyan-400 hover:underline"
                >
                  linkedin.com/in/kabil-b-b0452a2a5
                </a>
              </span>
              <span>|</span>
              <span>
                GitHub:{' '}
                <a
                  href="https://github.com/kabil19112004"
                  target="_blank"
                  rel="noreferrer"
                  className="text-cyan-400 hover:underline"
                >
                  github.com/kabil19112004
                </a>
              </span>
              <span>|</span>
              <span>
                Portfolio:{' '}
                <a
                  href="https://portfolio-4zup.vercel.app"
                  target="_blank"
                  rel="noreferrer"
                  className="text-cyan-400 hover:underline"
                >
                  portfolio-4zup.vercel.app
                </a>
              </span>
            </div>
          </div>

          {/* SUMMARY */}
          <div className="space-y-1.5">
            <h2 className="text-xs font-bold font-mono uppercase tracking-widest text-cyan-400 border-b border-slate-800 pb-1">
              SUMMARY
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed text-justify">
              Aspiring AI/ML Engineer pursuing an M.Sc. in Data Science, with hands-on experience building machine learning models and AI-powered applications using Python, SQL, Pandas, NumPy, and Scikit-learn. Skilled in data preprocessing, feature engineering, model evaluation, and NLP-based chatbot development. Practical exposure through an AI/ML internship and academic projects spanning prediction, classification, and generative AI. Strong analytical mindset and quick learner focused on applying AI and automation to solve real-world problems.
            </p>
          </div>

          {/* SKILLS */}
          <div className="space-y-2">
            <h2 className="text-xs font-bold font-mono uppercase tracking-widest text-cyan-400 border-b border-slate-800 pb-1">
              SKILLS
            </h2>
            <div className="space-y-1.5 text-xs text-slate-300">
              <p>
                <strong className="text-white">Programming & Query Languages:</strong> Python, R, SQL
              </p>
              <p>
                <strong className="text-white">ML & Data Libraries:</strong> Pandas, NumPy, Matplotlib, Scikit-learn
              </p>
              <p>
                <strong className="text-white">Machine Learning & Deep Learning:</strong> Model Training, Feature Engineering, Data Preprocessing, Model Evaluation, Classification, Prediction, TensorFlow, PyTorch, Neural Networks
              </p>
              <p>
                <strong className="text-white">Generative AI & NLP:</strong> Large Language Models (LLMs), Retrieval-Augmented Generation (RAG), AI Chatbots, NLP
              </p>
              <p>
                <strong className="text-white">Data Analysis & Visualization:</strong> Data Analysis, Data Visualization, Statistics, Power BI
              </p>
              <p>
                <strong className="text-white">Web, Backend & Databases:</strong> Flask, HTML, CSS, MySQL, MongoDB (MongoDB Atlas)
              </p>
              <p>
                <strong className="text-white">Tools & Platforms:</strong> VS Code, Git/GitHub, Jupyter Notebook, Figma
              </p>
            </div>
          </div>

          {/* EXPERIENCE */}
          <div className="space-y-2">
            <h2 className="text-xs font-bold font-mono uppercase tracking-widest text-cyan-400 border-b border-slate-800 pb-1">
              EXPERIENCE
            </h2>
            <div className="space-y-1">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs sm:text-sm font-bold text-white">
                <span>AI & ML Intern — FrontierWox Tech Private Limited</span>
                <span className="font-mono text-cyan-400 font-normal text-xs">July 2026 – September 2026</span>
              </div>
              <ul className="list-disc list-outside pl-4 space-y-1 text-xs text-slate-300 pt-1 leading-relaxed">
                <li>
                  Built and improved a Student Assistant Chatbot using Python, NLP, and LLM-based techniques to help students revise and understand study materials.
                </li>
                <li>
                  Implemented PDF-based content extraction and summarization to generate simplified explanations and study-focused summaries from learning materials.
                </li>
                <li>
                  Applied Generative AI and Retrieval-Augmented Generation (RAG) concepts to deliver personalized, context-aware responses to student queries.
                </li>
                <li>
                  Tested chatbot functionality end-to-end, fixing bugs and improving response accuracy, gaining practical experience in AI/ML model integration and backend development.
                </li>
              </ul>
            </div>
          </div>

          {/* PROJECTS */}
          <div className="space-y-3">
            <h2 className="text-xs font-bold font-mono uppercase tracking-widest text-cyan-400 border-b border-slate-800 pb-1">
              PROJECTS
            </h2>

            {/* Project 1 */}
            <div className="space-y-1">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs sm:text-sm">
                <div>
                  <strong className="text-white font-bold">Intern Performance Prediction System</strong>{' '}
                  <span className="text-slate-400 text-xs font-mono">| Python, Flask, Machine Learning, MongoDB Atlas</span>
                </div>
                <span className="font-mono text-cyan-400 text-xs">May 2026 – June 2026</span>
              </div>
              <ul className="list-disc list-outside pl-4 space-y-1 text-xs text-slate-300 pt-0.5 leading-relaxed">
                <li>
                  Developed a machine learning–based web application to automate intern performance evaluation, replacing a manual, mentor-driven scoring process.
                </li>
                <li>
                  Engineered features from attendance, project work, and task-completion data, then trained a classification model to predict overall performance scores.
                </li>
                <li>
                  Designed and built a responsive frontend with HTML, CSS, JavaScript, and Bootstrap, backed by a Flask API and MongoDB Atlas cloud database.
                </li>
                <li>
                  Delivered a tool that enables organizations to monitor intern productivity and flag support needs earlier and more consistently.
                </li>
              </ul>
            </div>

            {/* Project 2 */}
            <div className="space-y-1 pt-1">
              <div className="text-xs sm:text-sm">
                <strong className="text-white font-bold">Student Assistant Chatbot</strong>{' '}
                <span className="text-slate-400 text-xs font-mono">| Python, NLP, LLMs, RAG</span>
              </div>
              <ul className="list-disc list-outside pl-4 space-y-1 text-xs text-slate-300 pt-0.5 leading-relaxed">
                <li>
                  Built an AI chatbot using Generative AI and Large Language Models to answer academic questions and explain concepts in simplified language.
                </li>
                <li>
                  Enabled students to extract key points and summaries from study materials through PDF content processing.
                </li>
                <li>
                  Supported assignment help, doubt clarification, and interactive study conversations to improve learning efficiency.
                </li>
              </ul>
            </div>

            {/* Project 3 */}
            <div className="space-y-1 pt-1">
              <div className="text-xs sm:text-sm">
                <strong className="text-white font-bold">E-Commerce Sales & Customer Analytics Dashboard</strong>{' '}
                <span className="text-slate-400 text-xs font-mono">| Python, SQL, Excel, Power BI, Pandas, DAX</span>
              </div>
              <ul className="list-disc list-outside pl-4 space-y-1 text-xs text-slate-300 pt-0.5 leading-relaxed">
                <li>
                  Analyzed e-commerce sales and customer data to identify sales trends, top products, customer behavior, and profitability.
                </li>
                <li>
                  Created an interactive Power BI dashboard to present key business insights with dynamic slicing by region, category, and date.
                </li>
                <li>
                  Engineered custom DAX measures and SQL analytical queries for revenue and retention evaluation.
                </li>
              </ul>
            </div>
          </div>

          {/* EDUCATION */}
          <div className="space-y-2">
            <h2 className="text-xs font-bold font-mono uppercase tracking-widest text-cyan-400 border-b border-slate-800 pb-1">
              EDUCATION
            </h2>
            <div className="space-y-2.5">
              <div>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs sm:text-sm font-bold text-white">
                  <span>Master of Science, Data Science | Bishop Heber College, Tiruchirappalli</span>
                </div>
                <p className="text-xs font-mono text-cyan-400">
                  June 2025 – Present | CGPA: 8.28 (Pursuing) — Top 10 in class
                </p>
              </div>

              <div>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs sm:text-sm font-bold text-white">
                  <span>Bachelor of Computer Applications (Web Development) | Srimad Andavan Arts & Science College, Tiruchirappalli</span>
                </div>
                <p className="text-xs font-mono text-slate-400">
                  June 2022 – May 2025 | CGPA: 7.76
                </p>
              </div>
            </div>
          </div>

          {/* CERTIFICATIONS */}
          <div className="space-y-2">
            <h2 className="text-xs font-bold font-mono uppercase tracking-widest text-cyan-400 border-b border-slate-800 pb-1">
              CERTIFICATIONS
            </h2>
            <ul className="list-disc list-outside pl-4 space-y-1 text-xs text-slate-300">
              <li>
                <strong className="text-white">Python Programming</strong> — G-TEC Computer Education
              </li>
              <li>
                <strong className="text-white">Machine Learning</strong> — LinkedIn Learning
              </li>
              <li>
                <strong className="text-white">SQL & Database</strong> — LinkedIn Learning
              </li>
              <li>
                <strong className="text-white">Data Science</strong> — LinkedIn Learning
              </li>
              <li>
                <strong className="text-white">Tableau & Data Analysis</strong> — LinkedIn Learning
              </li>
              <li>
                <strong className="text-white">AI Developer</strong> — LinkedIn Learning
              </li>
            </ul>
          </div>
        </div>

        {/* Modal Bottom Actions */}
        <div className="px-6 py-4 border-t border-slate-800 bg-slate-950/80 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            <span>Format: Official PDF Document (.pdf)</span>
          </div>
          <button
            onClick={handleDownload}
            className="px-4 py-2 text-xs font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 to-blue-400 hover:from-cyan-300 hover:to-blue-300 rounded-lg transition-all flex items-center gap-2 shadow active:scale-95 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Resume (.pdf)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
