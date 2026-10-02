import React, { useState, useEffect } from 'react';
import { ProfilePhotoProvider } from './context/ProfilePhotoContext';
import { ScrollProgressBar } from './components/ScrollProgressBar';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Education } from './components/Education';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Experience } from './components/Experience';
import { Certifications } from './components/Certifications';
import { Stats } from './components/Stats';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { CertificateModal } from './components/CertificateModal';
import { ProjectModal } from './components/ProjectModal';
import { ResumeModal } from './components/ResumeModal';
import { Project, CertificateItem } from './data/portfolioData';

export default function App() {
  // Theme state with localStorage persistence
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('kb_portfolio_theme');
      if (savedTheme === 'light' || savedTheme === 'dark') {
        return savedTheme;
      }
    }
    return 'dark';
  });

  // Modals state
  const [selectedCertificate, setSelectedCertificate] = useState<CertificateItem | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);

  // Apply theme to document attribute
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    if (theme === 'light') {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('bg-slate-950', 'text-slate-100');
      document.body.classList.add('bg-slate-50', 'text-slate-900');
    } else {
      document.documentElement.classList.add('dark');
      document.body.classList.remove('bg-slate-50', 'text-slate-900');
      document.body.classList.add('bg-slate-950', 'text-slate-100');
    }
    localStorage.setItem('kb_portfolio_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleContactNavigate = () => {
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <ProfilePhotoProvider>
      <div className="min-h-screen flex flex-col font-sans transition-colors duration-300">
        {/* Top Window Scroll Progress Bar */}
        <ScrollProgressBar />

        {/* Sticky Navigation */}
        <Navbar
          currentTheme={theme}
          onToggleTheme={toggleTheme}
          onOpenResume={() => setIsResumeModalOpen(true)}
        />

        {/* Main Portfolio Sections */}
        <main className="flex-1">
          {/* 1. Hero Section */}
          <Hero onOpenResume={() => setIsResumeModalOpen(true)} />

          {/* 2. Stats Section */}
          <Stats />

          {/* 3. About Me Section */}
          <About onOpenResume={() => setIsResumeModalOpen(true)} />

          {/* 4. Education Section */}
          <Education />

          {/* 5. Technical Skills Section */}
          <Skills />

          {/* 6. Projects Showcase Section */}
          <Projects onSelectProject={(project) => setSelectedProject(project)} />

          {/* 7. Experience & Practical Work Section */}
          <Experience />

          {/* 8. Certifications Section */}
          <Certifications onSelectCertificate={(cert) => setSelectedCertificate(cert)} />

          {/* 9. Contact Section */}
          <Contact />
        </main>

        {/* Footer */}
        <Footer onOpenResume={() => setIsResumeModalOpen(true)} />

        {/* Modals & Lightboxes */}
        <CertificateModal
          certificate={selectedCertificate}
          onClose={() => setSelectedCertificate(null)}
        />

        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          onContactClick={handleContactNavigate}
        />

        <ResumeModal
          isOpen={isResumeModalOpen}
          onClose={() => setIsResumeModalOpen(false)}
        />
      </div>
    </ProfilePhotoProvider>
  );
}
