'use client';

import { useState } from 'react';

export default function AboutPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const courses = [
    { name: "Search Engine Optimization (SEO)", grade: 20, category: "Tech & Analytics" },
    { name: "Digital Marketing Strategy", grade: 19, category: "Marketing & Strategy" },
    { name: "Web3 & Emerging Technologies", grade: 19, category: "Tech & Analytics" },
    { name: "Data Analytics & Attribution (GA4)", grade: 18, category: "Tech & Analytics" },
    { name: "Consumer Behavior & Neuromarketing", grade: 19, category: "Marketing & Strategy" },
    { name: "Brand Identity & Positioning", grade: 18, category: "Marketing & Strategy" },
    { name: "Copywriting & Storytelling", grade: 19, category: "Marketing & Strategy" },
    { name: "E-Commerce Architecture & Sales", grade: 19, category: "Marketing & Strategy" },
    { name: "Agile Project Management", grade: 18, category: "Core Science & PR" },
    { name: "Statistical Methods & Data Modelling", grade: 17, category: "Tech & Analytics" },
    { name: "Corporate Communication & PR", grade: 18, category: "Core Science & PR" },
    { name: "Communication & Media Theory", grade: 19, category: "Core Science & PR" },
  ];

  const categories = ['All', 'Marketing & Strategy', 'Tech & Analytics', 'Core Science & PR'];

  const filteredCourses = courses.filter(course => {
    const matchesCategory = activeCategory === 'All' || course.category === activeCategory;
    const matchesSearch = course.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex flex-col items-center justify-start min-h-[calc(100vh-80px)] pb-20">
      {/* Hero Section */}
      <section className="w-full max-w-[1600px] mx-auto px-6 md:px-12 py-24 flex flex-col md:flex-row gap-12 lg:gap-24 items-start">
        <div className="flex-1 space-y-6">
          <div className="inline-block px-4 py-1.5 rounded-full bg-surface border border-white/10 text-accent-cyan text-sm font-semibold tracking-wide mb-2">
            Pedro Coias
          </div>
          <h1 className="text-5xl md:text-7xl font-heading font-extrabold tracking-tight text-white leading-tight">
            Digital Strategist & <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-cyan to-accent-cobalt">Web3 Builder</span>
          </h1>
          <p className="text-lg md:text-xl text-foreground/80 max-w-2xl leading-relaxed">
            I specialize in merging technical strategy (SEO, Web3, Automations) with creative marketing to drive measurable growth.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-6">
            <div className="p-4 rounded-2xl bg-surface border border-white/5">
              <div className="text-3xl font-bold text-white font-heading">18.77</div>
              <div className="text-sm text-foreground/60 mt-1">Academic Average</div>
            </div>
            <div className="p-4 rounded-2xl bg-surface border border-white/5">
              <div className="text-3xl font-bold text-accent-cyan font-heading">SEO & SEM</div>
              <div className="text-sm text-foreground/60 mt-1">Specialization</div>
            </div>
          </div>
        </div>
        
        <div className="flex-1 w-full bg-surface/30 rounded-3xl p-8 border border-white/5 flex flex-col max-h-[600px]">
          <h2 className="text-2xl font-heading font-bold text-white mb-6 shrink-0">Experience & Certifications</h2>
          <div className="overflow-y-auto pr-3 pb-4 flex-1 space-y-6 relative before:absolute before:inset-0 before:ml-2 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-accent-cyan/20 before:to-transparent">
            
            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-5 h-5 rounded-full border-2 border-accent-cyan bg-background shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 shadow-[0_0_10px_rgba(0,180,216,0.5)]"></div>
              <div className="w-[calc(100%-2.5rem)] md:w-[calc(50%-1.25rem)] bg-surface p-5 rounded-2xl border border-white/5">
                <h4 className="font-heading font-semibold text-white">Digital Marketing Lead</h4>
                <div className="text-sm text-accent-cyan font-medium mb-2">2023 - Present</div>
                <p className="text-foreground/70 text-sm">Spearheading SEO architecture, Web3 integrations, and automated CRM workflows.</p>
              </div>
            </div>
 
            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
              <div className="flex items-center justify-center w-5 h-5 rounded-full border-2 border-white/20 bg-surface shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10"></div>
              <div className="w-[calc(100%-2.5rem)] md:w-[calc(50%-1.25rem)] bg-surface p-5 rounded-2xl border border-white/5">
                <h4 className="font-heading font-semibold text-white">Google Analytics Certified</h4>
                <div className="text-sm text-foreground/50 font-medium mb-2">2022</div>
                <p className="text-foreground/70 text-sm">Advanced dataLayer implementation and tracking infrastructure.</p>
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
                  Academic Performance
                </div>
                <h2 className="text-3xl font-heading font-bold text-white mb-4">Education & Grades</h2>
                <p className="text-foreground/70 leading-relaxed text-sm">
                  Giving recruiters and hiring managers an honest, 100% transparent picture of my academic foundations. Below is the verified transcript mapping my core courses.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-surface border border-white/10 flex items-center gap-6 shadow-[0_0_20px_rgba(0,180,216,0.05)]">
                <div className="relative w-20 h-20 flex items-center justify-center rounded-full bg-gradient-to-tr from-accent-cyan to-accent-cobalt p-1 shadow-[0_0_15px_rgba(0,180,216,0.3)] shrink-0">
                  <div className="w-full h-full rounded-full bg-background flex flex-col items-center justify-center">
                    <span className="text-xl font-bold font-heading text-white">18.77</span>
                    <span className="text-[10px] text-foreground/50 uppercase">of 20</span>
                  </div>
                </div>
                <div>
                  <h4 className="font-heading font-semibold text-white">Degree Average</h4>
                  <p className="text-xs text-foreground/50 mt-1">Bachelor's Degree in Digital Marketing & Communication</p>
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
                    placeholder="Search courses..."
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
                      {cat === 'All' ? 'All' : cat.split(' & ')[0].split(' / ')[0]}
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
                        <th className="px-6 py-4">Course Title</th>
                        <th className="px-6 py-4">Category</th>
                        <th className="px-6 py-4 text-right">Grade (/20)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 text-sm">
                      {filteredCourses.length > 0 ? (
                        filteredCourses.map((course, idx) => (
                          <tr key={idx} className="hover:bg-white/[0.02] transition-colors group">
                            <td className="px-6 py-4 text-white font-medium group-hover:text-accent-cyan transition-colors">
                              {course.name}
                            </td>
                            <td className="px-6 py-4 text-foreground/60 text-xs">
                              {course.category}
                            </td>
                            <td className="px-6 py-4 text-right">
                              <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-bold ${
                                course.grade >= 19 
                                  ? 'bg-accent-cyan/10 text-accent-cyan shadow-[0_0_8px_rgba(0,180,216,0.1)]' 
                                  : 'bg-white/5 text-white/90'
                              }`}>
                                {course.grade}
                              </span>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={3} className="px-6 py-12 text-center text-foreground/40 text-sm">
                            No courses match your filters.
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
          
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-10 relative z-10 text-center">The Story So Far</h2>
          
          <div className="md:columns-2 gap-12 space-y-6 text-lg text-foreground/80 leading-relaxed relative z-10">
            <p className="first-letter:text-5xl first-letter:font-bold first-letter:text-accent-cyan first-letter:mr-3 first-letter:float-left">
              This is where you can write your full, unabridged bio! You can use this expansive space to talk about your background, your passions, and exactly how you bridge the gap between creative marketing and technical architecture. The two-column editorial layout makes it easy to read even the longest stories.
            </p>
            <p>
              I started my journey with a deep curiosity for how digital ecosystems function. After mastering the technical intricacies of SEO and search engine algorithms, I realized that traffic is meaningless without engaging, high-quality content and brand identity to support it.
            </p>
            <p>
              <strong>Now, about that resume gap...</strong>
            </p>
            <p>
              <em>(Insert your high-levity explanation here! Whether you were scaling a mountain in Tibet, building a decentralized autonomous organization from a basement, or simply taking a much-needed mental health sabbatical to master the ancient art of sourdough bread, this is the perfect block to address it with massive humor and personality. Own the narrative!)</em>
            </p>
            <p>
              It turns out, stepping away from the keyboard was exactly what I needed to re-evaluate my approach to digital marketing. I returned with a renewed focus on building hybrid digital experiences that don't just capture attention, but retain it. 
            </p>
            <p>
              Ultimately, that time shaped my perspective and fueled my drive to build the immersive, Web3-integrated digital environments you see today. I am constantly exploring the bleeding edge of tech, whether that involves smart contracts, spatial 3D builds, or automating complex CRM workflows.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
