'use client';

import ProjectGrid from '@/components/ui/ProjectGrid';
import { useLanguage } from '@/components/LanguageContext';

export default function ProjectsPage() {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col items-center justify-start min-h-[calc(100vh-80px)] pb-20">
      <section className="w-full max-w-[1600px] mx-auto px-6 md:px-12 py-12 lg:py-20">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">{t.projects.title}</h1>
          <p className="text-foreground/70 max-w-xl text-lg">
            {t.projects.subtitle}
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
