'use client';

import { useState } from 'react';
import { useLanguage } from '@/components/LanguageContext';

export default function AboutPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const { language, t } = useLanguage();

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
    { name: "High School Mathematics", grade: 12, category: "High School" },
    { name: "High School Physics & Chemistry", grade: 11, category: "High School" },
    { name: "High School Philosophy", grade: 13, category: "High School" },
    { name: "High School English & Languages", grade: 14, category: "High School" },
  ];

  const categories = ['All', 'Marketing & Strategy', 'Tech & Analytics', 'Core Science & PR', 'High School'];

  const filteredCourses = courses.filter(course => {
    const matchesCategory = activeCategory === 'All' || course.category === activeCategory;
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
          <div className="inline-block px-4 py-1.5 rounded-full bg-surface border border-white/10 text-accent-cyan text-sm font-semibold tracking-wide mb-2">
            {t.about.badge}
          </div>
          <h1 className="text-5xl md:text-7xl font-heading font-extrabold tracking-tight text-white leading-tight">
            {t.about.titlePrefix}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-cyan to-accent-cobalt">
              {t.about.titleHighlight}
            </span>
          </h1>
          <p className="text-lg md:text-xl text-foreground/80 max-w-2xl leading-relaxed">
            {t.about.description}
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-6">
            <div className="p-4 rounded-2xl bg-surface border border-white/5">
              <div className="text-3xl font-bold text-white font-heading">18.77</div>
              <div className="text-sm text-foreground/60 mt-1">{t.about.avgLabel}</div>
            </div>
            <div className="p-4 rounded-2xl bg-surface border border-white/5">
              <div className="text-3xl font-bold text-accent-cyan font-heading">SEO & SEM</div>
              <div className="text-sm text-foreground/60 mt-1">{t.about.specLabel}</div>
            </div>
          </div>
        </div>
        
        <div className="flex-1 w-full bg-surface/30 rounded-3xl p-8 border border-white/5 flex flex-col max-h-[600px]">
          <h2 className="text-2xl font-heading font-bold text-white mb-6 shrink-0">{t.about.experienceTitle}</h2>
          <div className="overflow-y-auto pr-3 pb-4 flex-1 space-y-6 relative before:absolute before:inset-0 before:ml-2 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-accent-cyan/20 before:to-transparent">
            
            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-5 h-5 rounded-full border-2 border-accent-cyan bg-background shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 shadow-[0_0_10px_rgba(0,180,216,0.5)]"></div>
              <div className="w-[calc(100%-2.5rem)] md:w-[calc(50%-1.25rem)] bg-surface p-5 rounded-2xl border border-white/5">
                <h4 className="font-heading font-semibold text-white">{t.about.expRole1}</h4>
                <div className="text-sm text-accent-cyan font-medium mb-2">{t.about.expDate1}</div>
                <p className="text-foreground/70 text-sm">{t.about.expDesc1}</p>
              </div>
            </div>
 
            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
              <div className="flex items-center justify-center w-5 h-5 rounded-full border-2 border-white/20 bg-surface shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10"></div>
              <div className="w-[calc(100%-2.5rem)] md:w-[calc(50%-1.25rem)] bg-surface p-5 rounded-2xl border border-white/5">
                <h4 className="font-heading font-semibold text-white">{t.about.expRole2}</h4>
                <div className="text-sm text-foreground/50 font-medium mb-2">{t.about.expDate2}</div>
                <p className="text-foreground/70 text-sm">{t.about.expDesc2}</p>
              </div>
            </div>
 
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
                <div className="inline-block px-3 py-1 rounded-full bg-surface border border-white/10 text-accent-cyan text-xs font-semibold tracking-wide mb-3">
                  {t.about.eduBadge}
                </div>
                <h2 className="text-3xl font-heading font-bold text-white mb-4">{t.about.eduTitle}</h2>
                <p className="text-foreground/70 leading-relaxed text-sm">
                  {t.about.eduDesc}
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-surface border border-white/10 flex items-center gap-6 shadow-[0_0_20px_rgba(0,180,216,0.05)]">
                <div className="relative w-20 h-20 flex items-center justify-center rounded-full bg-gradient-to-tr from-accent-cyan to-accent-cobalt p-1 shadow-[0_0_15px_rgba(0,180,216,0.3)] shrink-0">
                  <div className="w-full h-full rounded-full bg-background flex flex-col items-center justify-center">
                    <span className="text-xl font-bold font-heading text-white">18.77</span>
                    <span className="text-[10px] text-foreground/50 uppercase">{language === 'en' ? 'of' : 'em'} 20</span>
                  </div>
                </div>
                <div>
                  <h4 className="font-heading font-semibold text-white">{t.about.degreeAvg}</h4>
                  <p className="text-xs text-foreground/50 mt-1">{t.about.degreeDesc}</p>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-surface border border-white/5 flex items-center gap-6 opacity-75 hover:opacity-100 transition-opacity">
                <div className="relative w-20 h-20 flex items-center justify-center rounded-full bg-white/10 p-1 shrink-0">
                  <div className="w-full h-full rounded-full bg-background flex flex-col items-center justify-center">
                    <span className="text-xl font-bold font-heading text-foreground/70">12.5</span>
                    <span className="text-[10px] text-foreground/50 uppercase">{language === 'en' ? 'of' : 'em'} 20</span>
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
                    className="w-full bg-background border border-white/10 rounded-full px-4 py-2 text-sm text-white focus:outline-none focus:border-accent-cyan transition-colors"
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
                          ? 'bg-accent-cyan text-background shadow-[0_0_10px_rgba(0,180,216,0.3)]' 
                          : 'bg-surface hover:bg-white/5 text-foreground/75 border border-white/5'
                      }`}
                    >
                      {t.categories[cat as keyof typeof t.categories] || cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Grades Table */}
              <div className="bg-background/40 rounded-2xl border border-white/5 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-white/10 text-xs font-semibold text-foreground/50 uppercase bg-surface/50">
                        <th className="px-6 py-4">{t.about.tableTitle}</th>
                        <th className="px-6 py-4">{t.about.tableCategory}</th>
                        <th className="px-6 py-4 text-right">{t.about.tableGrade}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 text-sm">
                      {filteredCourses.length > 0 ? (
                        filteredCourses.map((course, idx) => (
                          <tr key={idx} className="hover:bg-white/[0.02] transition-colors group">
                            <td className="px-6 py-4 text-white font-medium group-hover:text-accent-cyan transition-colors">
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
            <p className="first-letter:text-5xl first-letter:font-bold first-letter:text-accent-cyan first-letter:mr-3 first-letter:float-left">
              {t.about.storyP1}
            </p>
            <p>
              {t.about.storyP2}
            </p>
            <p>
              <strong>{t.about.storyP3}</strong>
            </p>
            <p>
              <em>{t.about.storyP4}</em>
            </p>
            <p>
              {t.about.storyP5}
            </p>
            <p>
              {t.about.storyP6}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
