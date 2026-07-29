'use client';

import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '@/components/LanguageContext';

export default function AboutPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeShelfTab, setActiveShelfTab] = useState('books');
  const [activeLevel, setActiveLevel] = useState('all'); // 'all', 'degree', 'highschool'
  const [searchQuery, setSearchQuery] = useState('');
  const { language, t } = useLanguage();

  const carouselRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const [activeTimelineIdx, setActiveTimelineIdx] = useState(-1);
  const [timelineProgress, setTimelineProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!timelineRef.current) return;
      const rect = timelineRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      const elementHeight = rect.height;
      const elementTop = rect.top;
      
      const startThreshold = viewportHeight * 0.85;
      const endThreshold = viewportHeight * 0.15;
      
      const scrolled = startThreshold - elementTop;
      const totalScrollableRange = startThreshold - endThreshold + elementHeight;
      
      let progress = (scrolled / totalScrollableRange) * 100;
      progress = Math.max(0, Math.min(100, progress));
      setTimelineProgress(progress);

      const items = timelineRef.current.querySelectorAll('.timeline-item');
      let highestActiveIdx = -1;
      items.forEach((item, idx) => {
        const itemRect = item.getBoundingClientRect();
        if (itemRect.top < viewportHeight * 0.7) {
          highestActiveIdx = idx;
        }
      });
      setActiveTimelineIdx(highestActiveIdx);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;

    // Reset scroll position on tab change
    el.scrollLeft = 0;

    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY !== 0) {
        e.preventDefault();
        el.scrollLeft += e.deltaY;
      }
    };

    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      el.removeEventListener('wheel', handleWheel);
    };
  }, [activeShelfTab]);

  const courses = [
    { name: "Campaign Strategy & Planning", grade: 20, category: "Marketing & Strategy" },
    { name: "Mobile Marketing", grade: 20, category: "Marketing & Strategy" },
    { name: "Metrics & Performance Evaluation", grade: 20, category: "Tech & Analytics" },
    { name: "English Language Proficiency", grade: 20, category: "Core Science & PR" },
    { name: "Digital Marketing", grade: 19, category: "Marketing & Strategy" },
    { name: "Social Media Marketing", grade: 19, category: "Marketing & Strategy" },
    { name: "Portuguese & Communication Techniques", grade: 19, category: "Core Science & PR" },
    { name: "E-Commerce", grade: 18, category: "Marketing & Strategy" },
    { name: "Online Advertising", grade: 18, category: "Marketing & Strategy" },
    { name: "Marketing Fundamentals", grade: 18, category: "Marketing & Strategy" },
    { name: "Web Programming Languages Fundamentals", grade: 18, category: "Tech & Analytics" },
    { name: "Search Engine Optimization (SEO)", grade: 18, category: "Tech & Analytics" },
    { name: "Market Research", grade: 17, category: "Tech & Analytics" },
    { name: "Email Marketing", grade: 17, category: "Marketing & Strategy" },
    { name: "Content Marketing", grade: 17, category: "Marketing & Strategy" },
    { name: "Digital Image Composition", grade: 17, category: "Core Science & PR" },
    { name: "Consumer Behavior", grade: 16, category: "Marketing & Strategy" },
    { name: "Communication & Information Law", grade: 16, category: "Core Science & PR" },
    { name: "Content Management Systems (CMS)", grade: 16, category: "Tech & Analytics" },
    { name: "High School Portuguese", grade: 12, category: "High School" },
    { name: "High School English", grade: 16, category: "High School" },
    { name: "High School Philosophy", grade: 11, category: "High School" },
    { name: "High School Mathematics A", grade: 13, category: "High School" },
    { name: "High School Physics & Chemistry A", grade: 11, category: "High School" },
    { name: "High School Biology & Geology", grade: 10, category: "High School" },
    { name: "High School Biology", grade: 10, category: "High School" },
  ];

  const categories = activeLevel === 'degree'
    ? ['All', 'Marketing & Strategy', 'Tech & Analytics', 'Core Science & PR']
    : activeLevel === 'highschool'
      ? ['All']
      : ['All', 'Marketing & Strategy', 'Tech & Analytics', 'Core Science & PR', 'High School'];

  const filteredCourses = courses.filter(course => {
    // Level filter
    if (activeLevel === 'degree' && course.category === 'High School') return false;
    if (activeLevel === 'highschool' && course.category !== 'High School') return false;

    // Category filter
    const matchesCategory = activeCategory === 'All' || course.category === activeCategory;
    
    // Search filter
    const courseNameEn = course.name;
    const courseNamePt = t.courses[course.name as keyof typeof t.courses] || course.name;
    const matchesSearch = courseNameEn.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          courseNamePt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex flex-col items-center justify-start min-h-[calc(100vh-80px)] pb-20">
      {/* Hero Section */}
      <section className="w-full max-w-[1600px] mx-auto px-6 md:px-12 py-24 flex flex-col md:flex-row gap-12 lg:gap-24 items-start">
        <div className="flex-1 space-y-6">
          <div className="inline-block px-4 py-1.5 rounded-full bg-surface border border-white/10 text-accent-ice text-sm font-semibold tracking-wide mb-2">
            {t.about.badge}
          </div>
          <h1 className="text-5xl md:text-7xl font-heading font-extrabold tracking-tight text-white leading-tight">
            {t.about.titlePrefix}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-sky to-accent-indigo">
              {t.about.titleHighlight}
            </span>
          </h1>
          <p className="text-lg md:text-xl text-foreground/80 max-w-2xl leading-relaxed">
            {t.about.description}
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-6">
            <div className="p-4 rounded-2xl bg-surface border border-white/5">
              <div className="text-3xl font-bold text-white font-heading">18.35</div>
              <div className="text-sm text-foreground/60 mt-1">{t.about.avgLabel}</div>
            </div>
            <div className="p-4 rounded-2xl bg-surface border border-white/5">
              <div className="text-3xl font-bold text-accent-sky font-heading">{(t.about as any).specValue}</div>
              <div className="text-sm text-foreground/60 mt-1">{t.about.specLabel}</div>
            </div>
          </div>
        </div>
        
        <div ref={timelineRef} className="flex-1 w-full bg-surface/30 rounded-3xl p-8 border border-white/5 flex flex-col">
          <h2 className="text-2xl font-heading font-bold text-white mb-6 shrink-0">{t.about.experienceTitle}</h2>
          <div className="relative pr-3 pb-4 flex-1 space-y-6">
            {/* Background line */}
            <div className="absolute top-0 bottom-0 left-2.5 -translate-x-px md:left-1/2 md:-translate-x-1/2 w-0.5 bg-white/10"></div>
            {/* Active animated line fill */}
            <div 
              className="absolute top-0 left-2.5 -translate-x-px md:left-1/2 md:-translate-x-1/2 w-0.5 bg-gradient-to-b from-accent-sky via-accent-indigo to-transparent transition-all duration-300 origin-top"
              style={{ height: `${timelineProgress}%` }}
            ></div>
            
            {((t.about as any).experienceTimeline || []).map((item: any, idx: number) => {
              const isActive = idx <= activeTimelineIdx;
              return (
                <div key={idx} className={`timeline-item relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group transition-all duration-500 ${
                  isActive ? 'opacity-100 translate-y-0' : 'opacity-40 translate-y-4'
                }`}>
                  <div className={`flex items-center justify-center w-5 h-5 rounded-full border-2 bg-background shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 shadow-sm transition-all duration-500 ${
                    isActive ? 'border-accent-sky shadow-accent-sky/20 bg-background scale-110' : 'border-white/20 bg-surface'
                  }`}></div>
                  <div className={`w-[calc(100%-2.5rem)] md:w-[calc(50%-1.25rem)] bg-surface p-5 rounded-2xl border transition-all duration-500 ${
                    isActive ? 'border-accent-sky/50 bg-surface shadow-[0_0_15px_rgba(14,165,233,0.05)]' : 'border-white/5'
                  }`}>
                    <h4 className="font-heading font-semibold text-white">{item.role}</h4>
                    <div className={`text-sm font-medium mb-2 transition-colors duration-500 ${isActive ? 'text-accent-sky' : 'text-foreground/50'}`}>{item.date}</div>
                    <p className="text-foreground/70 text-sm">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Education & Academic Performance Section */}
      <section className="w-full max-w-[1600px] mx-auto px-6 md:px-12 py-12">
        <div className="bg-surface/30 rounded-3xl p-8 md:p-12 border border-white/5">
          <div className="grid lg:grid-cols-5 gap-12 items-start">
            
            {/* Left Column: Stats & Meta */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <div className="inline-block px-3 py-1 rounded-full bg-surface border border-white/10 text-accent-sky text-xs font-semibold tracking-wide mb-3">
                  {t.about.eduBadge}
                </div>
                <h2 className="text-3xl font-heading font-bold text-white mb-4">{t.about.eduTitle}</h2>
                <p className="text-foreground/70 leading-relaxed text-sm">
                  {t.about.eduDesc}
                </p>
              </div>

              <div 
                onClick={() => {
                  const nextLevel = activeLevel === 'degree' ? 'all' : 'degree';
                  setActiveLevel(nextLevel);
                  setActiveCategory('All');
                }}
                className={`p-6 rounded-2xl bg-surface flex items-center gap-6 cursor-pointer transition-all border ${
                  activeLevel === 'degree' 
                    ? 'border-accent-sky shadow-[0_0_15px_rgba(14,165,233,0.15)] ring-1 ring-accent-sky/30' 
                    : 'border-white/10 hover:border-white/20'
                }`}
              >
                <div className="relative w-20 h-20 flex items-center justify-center shrink-0">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle cx="40" cy="40" r="34" className="stroke-white/5 fill-none" strokeWidth="4" />
                    <circle 
                      cx="40" 
                      cy="40" 
                      r="34" 
                      className="fill-none stroke-accent-sky transition-all duration-1000" 
                      strokeWidth="4"
                      strokeDasharray={2 * Math.PI * 34}
                      strokeDashoffset={2 * Math.PI * 34 - (18.35 / 20) * (2 * Math.PI * 34)}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-base font-bold font-heading text-white">18.35</span>
                    <span className="text-[9px] text-foreground/50 uppercase">{language === 'en' ? 'of' : 'em'} 20</span>
                  </div>
                </div>
                <div>
                  <h4 className="font-heading font-semibold text-white">{t.about.degreeAvg}</h4>
                  <p className="text-xs text-foreground/50 mt-1">{t.about.degreeDesc}</p>
                </div>
              </div>

              <div 
                onClick={() => {
                  const nextLevel = activeLevel === 'highschool' ? 'all' : 'highschool';
                  setActiveLevel(nextLevel);
                  setActiveCategory('All');
                }}
                className={`p-6 rounded-2xl bg-surface flex items-center gap-6 cursor-pointer transition-all border ${
                  activeLevel === 'highschool' 
                    ? 'border-accent-indigo shadow-[0_0_15px_rgba(79,70,229,0.15)] ring-1 ring-accent-indigo/30' 
                    : 'border-white/5 hover:border-white/20 opacity-75 hover:opacity-100'
                }`}
              >
                <div className="relative w-20 h-20 flex items-center justify-center shrink-0">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle cx="40" cy="40" r="34" className="stroke-white/5 fill-none" strokeWidth="4" />
                    <circle 
                      cx="40" 
                      cy="40" 
                      r="34" 
                      className="fill-none stroke-accent-indigo transition-all duration-1000" 
                      strokeWidth="4"
                      strokeDasharray={2 * Math.PI * 34}
                      strokeDashoffset={2 * Math.PI * 34 - (11.8 / 20) * (2 * Math.PI * 34)}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-base font-bold font-heading text-foreground/70">11.8</span>
                    <span className="text-[9px] text-foreground/50 uppercase">{language === 'en' ? 'of' : 'em'} 20</span>
                  </div>
                </div>
                <div>
                  <h4 className="font-heading font-semibold text-white">{t.about.hsAvg}</h4>
                  <p className="text-xs text-foreground/50 mt-1">{t.about.hsDesc}</p>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Course Table */}
            <div className="lg:col-span-3 space-y-6">
              
              {/* Controls */}
              <div className="flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center">
                {/* Search Bar */}
                <div className="relative flex-1 max-w-xs">
                  <input 
                    type="text"
                    placeholder={t.about.searchPlaceholder}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-background border border-white/10 rounded-full px-4 py-2 text-sm text-white focus:outline-none focus:border-accent-sky transition-colors"
                  />
                </div>

                {/* Categories */}
                <div className="flex flex-wrap gap-2">
                  {categories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                        activeCategory === cat 
                          ? 'bg-accent-indigo text-white shadow-sm' 
                          : 'bg-surface hover:bg-white/5 text-foreground/75 border border-white/5'
                      }`}
                    >
                      {t.categories[cat as keyof typeof t.categories] || cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Grades Table */}
              <div className="bg-background/40 rounded-2xl border border-white/5 overflow-hidden max-h-[420px] overflow-y-auto custom-scrollbar">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead className="sticky top-0 z-10 bg-[#121A30]">
                      <tr className="border-b border-white/10 text-xs font-semibold text-foreground/50 uppercase">
                        <th className="px-6 py-4">{t.about.tableTitle}</th>
                        <th className="px-6 py-4">{t.about.tableCategory}</th>
                        <th className="px-6 py-4 text-right">{t.about.tableGrade}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 text-sm">
                      {filteredCourses.length > 0 ? (
                        filteredCourses.map((course, idx) => (
                          <tr key={idx} className="hover:bg-white/[0.02] transition-colors group">
                            <td className="px-6 py-4 text-white font-medium group-hover:text-accent-sky transition-colors">
                              {t.courses[course.name as keyof typeof t.courses] || course.name}
                            </td>
                            <td className="px-6 py-4 text-foreground/60 text-xs">
                              {t.categories[course.category as keyof typeof t.categories] || course.category}
                            </td>
                            <td className="px-6 py-4 text-right">
                              <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-white/5 text-white/90">
                                {course.grade}
                              </span>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={3} className="px-6 py-12 text-center text-foreground/40 text-sm">
                            {t.about.noMatches}
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* Bio / The Story Section */}
      <section className="w-full max-w-[1600px] mx-auto px-6 md:px-12 py-12">
        <div className="bg-surface/30 rounded-3xl p-8 md:p-16 lg:p-24 border border-white/5 relative overflow-hidden">
          {/* Decorative quote mark */}
          <div className="absolute top-0 left-8 text-[12rem] text-white/[0.03] font-serif leading-none select-none">"</div>
          
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-10 relative z-10 text-center">{t.about.storyTitle}</h2>
          
          <div className="md:columns-2 gap-12 space-y-6 text-lg text-foreground/80 leading-relaxed relative z-10">
            <p className="first-letter:text-5xl first-letter:font-bold first-letter:text-accent-indigo first-letter:mr-3 first-letter:float-left">{t.about.storyP1}</p>
            <p>
              {t.about.storyP2}
            </p>
            <p>
              {t.about.storyP3}
            </p>
          </div>
        </div>
      </section>

      {/* Merged Character & Personality Dashboard Section */}
      <section className="w-full max-w-[1600px] mx-auto px-6 md:px-12 py-12">
        <div className="bg-surface/30 rounded-3xl p-8 md:p-12 border border-white/5 space-y-8">
          <div className="border-b border-white/10 pb-6">
            <h2 className="text-3xl font-heading font-bold text-white mb-2">{(t.about as any).honestTitle}</h2>
            <p className="text-sm text-foreground/60">{(t.about as any).radarSubtitle}</p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Column 1: Superpowers */}
            <div className="space-y-4">
              <h3 className="text-lg font-heading font-semibold text-accent-sky flex items-center gap-2">
                <span>⚡</span> {(t.about as any).superpowersTitle}
              </h3>
              <ul className="space-y-3.5 text-sm text-foreground/80">
                {((t.about as any).superpowersList || []).map((item: string, idx: number) => {
                  const parts = item.split(':');
                  return (
                    <li key={idx} className="leading-relaxed">
                      <strong className="text-white block">{parts[0]}:</strong>{parts[1]}
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Column 2: Anti-Patterns */}
            <div className="space-y-4">
              <h3 className="text-lg font-heading font-semibold text-[#EF4444] flex items-center gap-2">
                <span>⚠️</span> {(t.about as any).antipatternsTitle}
              </h3>
              <ul className="space-y-3.5 text-sm text-foreground/80">
                {((t.about as any).antipatternsList || []).map((item: string, idx: number) => {
                  const parts = item.split(':');
                  return (
                    <li key={idx} className="leading-relaxed">
                      <strong className="text-white block">{parts[0]}:</strong>{parts[1]}
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Column 3: Personality Index Dials */}
            <div className="space-y-6 bg-background/20 p-6 rounded-2xl border border-white/5 flex flex-col justify-center">
              <div className="grid gap-4">
                {[
                  { label: language === 'pt' ? 'Tecnologia & Analítica' : 'Tech & Analytics', value: 35, color: 'stroke-accent-sky' },
                  { label: language === 'pt' ? 'Web3 & Tecnologia Espacial' : 'Web3 & Spatial Tech', value: 30, color: 'stroke-accent-indigo' },
                  { label: language === 'pt' ? 'Marketing & Estratégia' : 'Marketing & Strategy', value: 20, color: 'stroke-accent-ice' },
                  { label: language === 'pt' ? 'Comunicação & Design Visual' : 'Communication & Visuals', value: 15, color: 'stroke-emerald-400' }
                ].map((metric, i) => {
                  const radius = 20;
                  const strokeDasharray = 2 * Math.PI * radius;
                  const strokeDashoffset = strokeDasharray - (metric.value / 100) * strokeDasharray;
                  return (
                    <div key={i} className="flex items-center gap-4 bg-background/45 p-3.5 rounded-xl border border-white/5">
                      <div className="relative w-12 h-12 shrink-0">
                        <svg className="w-full h-full transform -rotate-90">
                          <circle cx="24" cy="24" r={radius} className="stroke-white/5 fill-none" strokeWidth="3" />
                          <circle 
                            cx="24" 
                            cy="24" 
                            r={radius} 
                            className={`fill-none ${metric.color} transition-all duration-1000`} 
                            strokeWidth="3"
                            strokeDasharray={strokeDasharray}
                            strokeDashoffset={strokeDashoffset}
                            strokeLinecap="round"
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center text-[11px] font-bold text-white font-heading">
                          {metric.value}%
                        </div>
                      </div>
                      <div className="text-xs font-semibold text-white/95 leading-tight">{metric.label}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Inspiration Shelf */}
      <section className="w-full max-w-[1600px] mx-auto px-6 md:px-12 py-12">
        <div className="bg-surface/30 rounded-3xl p-8 md:p-12 border border-white/5 space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-heading font-bold text-white mb-2">{(t.about as any).shelfTitle}</h2>
          </div>

          {/* Tab Navigation */}
          <div className="flex flex-wrap gap-2 justify-center border-b border-white/10 pb-6">
            {[
              { id: 'books', label: language === 'pt' ? 'Livros 📚' : 'Books 📚' },
              { id: 'albums', label: language === 'pt' ? 'Álbuns 🎵' : 'Albums 🎵' },
              { id: 'movies', label: language === 'pt' ? 'Filmes 🎬' : 'Movies 🎬' },
              { id: 'tv', label: language === 'pt' ? 'Séries 📺' : 'TV Shows 📺' },
              { id: 'games', label: language === 'pt' ? 'Jogos 🎮' : 'Games 🎮' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveShelfTab(tab.id)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all cursor-pointer ${
                  activeShelfTab === tab.id
                    ? 'bg-accent-indigo text-white shadow-sm'
                    : 'bg-background/40 hover:bg-white/5 text-foreground/75 border border-white/5'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content Display */}
          <div className="max-w-6xl mx-auto py-4">
            <div 
              ref={carouselRef}
              className="flex overflow-x-auto gap-4 pb-6 px-2 snap-x snap-mandatory scroll-smooth custom-scrollbar"
            >
              {((t.about as any)[`${activeShelfTab}List`] || []).map((item: any, i: number) => {
                let linkUrl = item.link || '#';
                if (!item.link) {
                  if (activeShelfTab === 'books') {
                    linkUrl = `https://www.goodreads.com/search?q=${encodeURIComponent(item.title)}`;
                  } else if (activeShelfTab === 'albums') {
                    linkUrl = `https://open.spotify.com/search/${encodeURIComponent(item.title)}`;
                  } else if (activeShelfTab === 'movies' || activeShelfTab === 'tv') {
                    linkUrl = `https://www.imdb.com/find?q=${encodeURIComponent(item.title)}`;
                  } else if (activeShelfTab === 'games') {
                    linkUrl = `https://www.google.com/search?q=${encodeURIComponent(item.title + ' game metacritic')}`;
                  }
                }

                return (
                  <a 
                    key={i}
                    href={linkUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 bg-background/30 hover:bg-white/[0.04] p-4 rounded-2xl border border-white/5 hover:border-white/10 transition-all duration-300 group w-72 sm:w-80 shrink-0 snap-start shadow-lg cursor-pointer"
                  >
                    {/* Rank Badge */}
                    <div className="text-2xl font-bold font-heading text-white/20 shrink-0 w-8 text-center group-hover:text-accent-sky/70 transition-colors">
                      {String(i + 1).padStart(2, '0')}
                    </div>
                    
                    {/* Thumbnail Image Container */}
                    <div className="relative w-16 h-22 bg-surface rounded-lg overflow-hidden shrink-0 border border-white/5 shadow-md flex items-center justify-center text-2xl">
                      {item.image ? (
                        <img 
                          src={item.image} 
                          alt={item.title} 
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          loading="lazy"
                          referrerPolicy="no-referrer"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                          }}
                        />
                      ) : null}
                      <span className="absolute text-white/10 select-none pointer-events-none">
                        {activeShelfTab === 'books' && '📚'}
                        {activeShelfTab === 'albums' && '🎵'}
                        {activeShelfTab === 'movies' && '🎬'}
                        {activeShelfTab === 'tv' && '📺'}
                        {activeShelfTab === 'games' && '🎮'}
                      </span>
                    </div>

                    {/* Metadata */}
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-bold text-white group-hover:text-accent-sky transition-colors truncate">
                        {item.title}
                      </h4>
                      <p className="text-xs text-foreground/50 mt-1 line-clamp-3 leading-relaxed">
                        {item.subtitle}
                      </p>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
