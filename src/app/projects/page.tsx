'use client';

import ProjectGrid from '@/components/ui/ProjectGrid';

export default function ProjectsPage() {
  return (
    <div className="flex flex-col items-center justify-start min-h-[calc(100vh-80px)] pb-20">
      <section className="w-full max-w-[1600px] mx-auto px-6 md:px-12 py-12 lg:py-20">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">My Portfolio</h1>
          <p className="text-foreground/70 max-w-xl text-lg">
            Explore my latest work across strategy, Web3, and search engine optimization. 
          </p>
        </div>
        
        {/* Unified Grid */}
        <div className="mb-12">
          <ProjectGrid />
        </div>
      </section>
    </div>
  );
}
