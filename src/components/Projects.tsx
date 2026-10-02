import React, { useState, useMemo, useRef, useEffect } from 'react';
import {
  ArrowUpRight,
  Github,
  Sparkles,
  Eye,
  Filter,
  Code2,
  Layers,
  CheckCircle2,
  RotateCcw,
  ArrowUpDown,
  ArrowDownAZ,
  ArrowUpZA,
  Calendar,
  Clock,
  ChevronDown,
  Check,
} from 'lucide-react';
import { portfolioData, Project } from '../data/portfolioData';
import { ProjectGraphic } from './VisualAsset';

interface ProjectsProps {
  onSelectProject: (project: Project) => void;
}

type SortOption = 'newest' | 'alphabetical' | 'alphabetical-desc' | 'oldest';

export const Projects: React.FC<ProjectsProps> = ({ onSelectProject }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedTech, setSelectedTech] = useState<string>('All');
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState<boolean>(false);

  const sortDropdownRef = useRef<HTMLDivElement>(null);

  const categories = useMemo(() => {
    const cats = new Set<string>();
    portfolioData.projects.forEach((p) => cats.add(p.category));
    return ['All', ...Array.from(cats)];
  }, []);

  const sortOptions: { value: SortOption; label: string; icon: React.ReactNode; desc: string }[] = [
    {
      value: 'newest',
      label: 'Newest First',
      icon: <Clock className="w-3.5 h-3.5 text-cyan-400" />,
      desc: 'Most recent completions',
    },
    {
      value: 'alphabetical',
      label: 'Alphabetical (A - Z)',
      icon: <ArrowDownAZ className="w-3.5 h-3.5 text-blue-400" />,
      desc: 'Sorted alphabetically A to Z',
    },
    {
      value: 'alphabetical-desc',
      label: 'Alphabetical (Z - A)',
      icon: <ArrowUpZA className="w-3.5 h-3.5 text-indigo-400" />,
      desc: 'Sorted reverse Z to A',
    },
    {
      value: 'oldest',
      label: 'Oldest First',
      icon: <Calendar className="w-3.5 h-3.5 text-amber-400" />,
      desc: 'Earliest foundation projects',
    },
  ];

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sortDropdownRef.current &&
        !sortDropdownRef.current.contains(event.target as Node)
      ) {
        setIsSortDropdownOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsSortDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Extract all unique technology stacks across all projects
  const allTechStacks = useMemo(() => {
    const techSet = new Set<string>();
    portfolioData.projects.forEach((p) => {
      p.technologies.forEach((t) => techSet.add(t));
    });
    return ['All', ...Array.from(techSet).sort()];
  }, []);

  // Compute project counts per category
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: portfolioData.projects.length };
    categories.slice(1).forEach((cat) => {
      counts[cat] = portfolioData.projects.filter((p) => p.category === cat).length;
    });
    return counts;
  }, [categories]);

  // Filter & Sort projects
  const processedProjects = useMemo(() => {
    // 1. Filter
    const filtered = portfolioData.projects.filter((project) => {
      const matchesCategory =
        selectedCategory === 'All' || project.category === selectedCategory;
      const matchesTech =
        selectedTech === 'All' ||
        project.technologies.some(
          (t) => t.toLowerCase() === selectedTech.toLowerCase()
        );
      return matchesCategory && matchesTech;
    });

    // 2. Sort
    return [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'alphabetical':
          return a.title.localeCompare(b.title);
        case 'alphabetical-desc':
          return b.title.localeCompare(a.title);
        case 'oldest':
          return (a.order ?? 0) - (b.order ?? 0);
        case 'newest':
        default:
          return (b.order ?? 0) - (a.order ?? 0);
      }
    });
  }, [selectedCategory, selectedTech, sortBy]);

  const handleResetFilters = () => {
    setSelectedCategory('All');
    setSelectedTech('All');
    setSortBy('newest');
  };

  const currentSortObj =
    sortOptions.find((opt) => opt.value === sortBy) || sortOptions[0];

  return (
    <section id="projects" className="py-20 sm:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-mono text-xs uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Featured Case Studies</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Key Projects
          </h2>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
            Real technical applications developed in Python, Machine Learning, Large Language Models, and modern web architectures. Browse by category, technology stack, and custom sort order.
          </p>
        </div>

        {/* Filter Controls Panel */}
        <div className="mb-10 max-w-4xl mx-auto space-y-4">
          {/* Top Bar: Categories & Sorting Dropdown */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
              {categories.map((cat) => {
                const isSelected = selectedCategory === cat;
                const count = categoryCounts[cat] || 0;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl transition-all duration-200 flex items-center gap-2 cursor-pointer ${
                      isSelected
                        ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 shadow-md shadow-cyan-500/25 font-bold scale-[1.02]'
                        : 'glass-panel text-slate-300 hover:text-white hover:border-slate-600'
                    }`}
                  >
                    <span>{cat}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                        isSelected
                          ? 'bg-slate-950/20 text-slate-900 font-bold'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Sorting Dropdown Menu */}
            <div className="relative w-full sm:w-auto flex items-center justify-center md:justify-end shrink-0" ref={sortDropdownRef}>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <span className="text-xs font-mono text-slate-400 hidden sm:inline-flex items-center gap-1">
                  <ArrowUpDown className="w-3 h-3 text-cyan-400" />
                  <span>Sort:</span>
                </span>

                {/* Dropdown Trigger Button */}
                <button
                  type="button"
                  onClick={() => setIsSortDropdownOpen((prev) => !prev)}
                  className="w-full sm:w-auto min-w-[190px] px-3.5 py-2 text-xs font-semibold rounded-xl glass-panel border border-slate-700 hover:border-cyan-500/50 text-slate-200 hover:text-white flex items-center justify-between gap-2.5 transition-all shadow-md focus:outline-none focus:ring-2 focus:ring-cyan-500/40 cursor-pointer"
                  aria-haspopup="true"
                  aria-expanded={isSortDropdownOpen}
                >
                  <span className="flex items-center gap-2">
                    {currentSortObj.icon}
                    <span>{currentSortObj.label}</span>
                  </span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${
                      isSortDropdownOpen ? 'rotate-180 text-cyan-400' : ''
                    }`}
                  />
                </button>
              </div>

              {/* Dropdown Menu Popup */}
              {isSortDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-64 bg-slate-900/95 backdrop-blur-xl border border-slate-700/80 rounded-2xl shadow-2xl p-1.5 z-30 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-3 py-2 border-b border-slate-800/80 mb-1">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block font-semibold">
                      Sort Projects By
                    </span>
                  </div>
                  <div className="space-y-0.5">
                    {sortOptions.map((opt) => {
                      const isActive = sortBy === opt.value;
                      return (
                        <button
                          key={opt.value}
                          onClick={() => {
                            setSortBy(opt.value);
                            setIsSortDropdownOpen(false);
                          }}
                          className={`w-full px-3 py-2 text-left text-xs rounded-xl flex items-center justify-between transition-colors cursor-pointer ${
                            isActive
                              ? 'bg-cyan-500/15 text-cyan-300 font-semibold border border-cyan-500/20'
                              : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <span className="p-1 rounded bg-slate-800 border border-slate-700">
                              {opt.icon}
                            </span>
                            <div>
                              <span className="block font-medium">{opt.label}</span>
                              <span className="block text-[10px] text-slate-400 font-normal">
                                {opt.desc}
                              </span>
                            </div>
                          </div>
                          {isActive && <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Technology Stack Chips Filter Bar */}
          <div className="glass-panel p-4 rounded-2xl border border-slate-800 space-y-2.5">
            <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
              <span className="flex items-center gap-1.5 text-slate-300">
                <Code2 className="w-3.5 h-3.5 text-cyan-400" />
                <span>Filter by Technology Stack:</span>
              </span>
              {(selectedCategory !== 'All' || selectedTech !== 'All' || sortBy !== 'newest') && (
                <button
                  onClick={handleResetFilters}
                  className="flex items-center gap-1 text-cyan-400 hover:text-cyan-300 transition-colors text-[11px] underline cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset All</span>
                </button>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              {allTechStacks.map((tech) => {
                const isTechActive = selectedTech === tech;
                return (
                  <button
                    key={tech}
                    onClick={() => setSelectedTech(tech)}
                    className={`px-2.5 py-1 text-[11px] font-mono rounded-lg transition-all duration-150 cursor-pointer ${
                      isTechActive
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 font-semibold shadow-sm'
                        : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 border border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    {tech === 'All' ? '⚡ All Tech Stacks' : tech}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Filter & Sort Status Bar */}
          {(selectedCategory !== 'All' || selectedTech !== 'All' || sortBy !== 'newest') && (
            <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-2 rounded-xl bg-cyan-950/30 border border-cyan-500/20 text-xs text-slate-300 font-mono">
              <div className="flex flex-wrap items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                <span>
                  Showing {processedProjects.length} project
                  {processedProjects.length === 1 ? '' : 's'}
                  {selectedCategory !== 'All' && (
                    <>
                      {' '}in <strong className="text-cyan-300">"{selectedCategory}"</strong>
                    </>
                  )}
                  {selectedTech !== 'All' && (
                    <>
                      {' '}with <strong className="text-cyan-300">"{selectedTech}"</strong>
                    </>
                  )}
                  {' • '}Sorted by <strong className="text-cyan-300">"{currentSortObj.label}"</strong>
                </span>
              </div>
              <button
                onClick={handleResetFilters}
                className="text-slate-400 hover:text-white transition-colors text-[11px] underline cursor-pointer"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>

        {/* Projects Grid or Empty State */}
        {processedProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {processedProjects.map((project) => (
              <div
                key={project.id}
                className="rounded-2xl glass-panel border border-slate-800 hover:border-slate-700 transition-all duration-300 shadow-xl overflow-hidden flex flex-col justify-between group"
              >
                {/* Graphic / Visual Asset */}
                <div
                  className="cursor-pointer overflow-hidden p-2 bg-slate-950/60"
                  onClick={() => onSelectProject(project)}
                  title="Click to view project details"
                >
                  <div className="transform group-hover:scale-[1.01] transition-transform duration-300">
                    <ProjectGraphic projectId={project.id} title={project.title} />
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 sm:p-7 flex flex-col flex-1 justify-between space-y-5">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-wider font-semibold">
                        {project.category}
                      </span>
                      <div className="flex items-center gap-1.5">
                        {project.year && (
                          <span className="text-[10px] font-mono text-cyan-300 px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-500/30">
                            {project.year}
                          </span>
                        )}
                        <span className="text-[10px] font-mono text-slate-400 px-2 py-0.5 rounded bg-slate-900 border border-slate-800">
                          {project.subtitle}
                        </span>
                      </div>
                    </div>

                    <h3
                      onClick={() => onSelectProject(project)}
                      className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors cursor-pointer"
                    >
                      {project.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Technology Badges (Clicking a badge filters by that tech) */}
                  <div className="space-y-4 pt-2">
                    <div>
                      <span className="text-[10px] font-mono uppercase text-slate-400 block mb-1.5">
                        Tech Stack (Click to filter):
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {project.technologies.map((tech, i) => {
                          const isCurrentActive =
                            selectedTech.toLowerCase() === tech.toLowerCase();
                          return (
                            <button
                              key={i}
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedTech(tech);
                              }}
                              title={`Filter by ${tech}`}
                              className={`text-[11px] px-2.5 py-1 rounded-md font-mono transition-all cursor-pointer ${
                                isCurrentActive
                                  ? 'bg-cyan-500/30 text-cyan-200 border border-cyan-400 font-semibold'
                                  : 'bg-slate-900 text-slate-300 hover:text-cyan-300 hover:bg-slate-800 border border-slate-800'
                              }`}
                            >
                              {tech}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Action Buttons: View Project & Details */}
                    <div className="flex items-center gap-3 pt-3 border-t border-slate-800/80">
                      <button
                        onClick={() => onSelectProject(project)}
                        className="flex-1 py-2 px-3.5 text-xs font-semibold rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Details & Case Study</span>
                      </button>

                      <button
                        onClick={() => onSelectProject(project)}
                        className="py-2 px-3.5 text-xs font-medium rounded-lg text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 transition-colors flex items-center gap-1 cursor-pointer"
                      >
                        <span>Architecture</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty Filter State */
          <div className="p-12 text-center rounded-2xl glass-panel border border-slate-800 max-w-md mx-auto space-y-4">
            <div className="w-12 h-12 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto text-slate-400">
              <Layers className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">No Projects Match Selected Filter</h3>
              <p className="text-xs text-slate-400 mt-1">
                No project matches both "{selectedCategory}" and tech stack "{selectedTech}".
              </p>
            </div>
            <button
              onClick={handleResetFilters}
              className="px-4 py-2 text-xs font-semibold rounded-xl bg-cyan-500 text-slate-950 hover:bg-cyan-400 transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* GitHub Note */}
        <div className="mt-12 text-center">
          <p className="text-xs text-slate-400 font-mono inline-flex items-center gap-2 bg-slate-900/60 px-4 py-2 rounded-xl border border-slate-800">
            <Github className="w-4 h-4 text-slate-300" />
            <span>Explore repository repositories & code commits at</span>
            <a
              href={portfolioData.personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-400 hover:underline font-semibold"
            >
              github.com/kabil19112004
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};
