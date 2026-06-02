'use client';

import { useState, useEffect } from 'react';
import ProjectModal, { Project } from './ProjectModal';
import { client } from '../../lib/sanity';
import { useLanguage } from '@/components/LanguageContext';

// Unified Mock Data Array (used as fallback when Sanity is empty)
const ALL_PROJECTS: Project[] = [
  { _id: '1', title: 'Global Market Expansion', category: 'Strategy', projectType: 'professional', overview: 'Developed a comprehensive go-to-market strategy for a fintech startup entering the European market, resulting in a 40% increase in initial user acquisition.', skillsAcquired: ['Market Research', 'Financial Modeling', 'GTM Strategy'], toolStack: ['Excel', 'Tableau', 'Miro'], mediaType: 'image' },
  { _id: '2', title: 'Brand Repositioning Campaign', category: 'Strategy', projectType: 'professional', overview: 'Led a cross-functional team to reposition a legacy B2B brand for a younger demographic.', skillsAcquired: ['Brand Identity', 'Audience Segmentation'], toolStack: ['Figma', 'Google Analytics'], mediaType: 'image' },
  { _id: '3', title: 'NFT Loyalty Program', category: 'Web3', projectType: 'professional', overview: 'Designed and deployed a smart contract-based loyalty program for an e-commerce brand.', skillsAcquired: ['Smart Contract Design', 'Tokenomics', 'Community Building'], toolStack: ['Solidity', 'Hardhat', 'Discord'], mediaType: 'image' },
  { _id: '4', title: 'Organic Traffic 300% Scaling', category: 'SEO & SEM', projectType: 'professional', overview: 'Completely overhauled the technical SEO and content architecture for a SaaS platform.', skillsAcquired: ['Technical SEO', 'Keyword Strategy', 'Link Building'], toolStack: ['Ahrefs', 'Screaming Frog', 'Google Search Console'], mediaType: 'image' },
  { _id: '5', title: 'Moon Boutique', category: 'Academic / 3D', projectType: 'academic', overview: 'An immersive 3D spatial e-commerce environment built as a university capstone project.', skillsAcquired: ['Spatial Design', 'C# Scripting', 'User Experience'], toolStack: ['Unity', 'Shopify API', 'Blender'], mediaType: 'spatial' },
  { _id: '6', title: 'SEO Audit & Competitor Report', category: 'SEO & SEM', projectType: 'academic', overview: 'A detailed technical and competitor audit report designed to scale organic reach by identifying indexing blockers and high-value keyword opportunities.', skillsAcquired: ['Technical Auditing', 'On-page Optimization', 'Competitor Intelligence'], toolStack: ['Semrush', 'Screaming Frog', 'Search Console'], mediaType: 'pdf', mediaUrl: './sample-report.pdf' }
];

// Define standard filter categories
const FILTER_CATEGORIES = [
  'All',
  'Strategy',
  'Web3',
  'SEO & SEM',
  'Content Marketing',
  'Social Media',
  'Academic / 3D'
];

export default function ProjectGrid() {
  const [projects, setProjects] = useState<Project[]>(ALL_PROJECTS);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [activeContext, setActiveContext] = useState<string>('All'); // 'All', 'professional', 'academic'
  const [loading, setLoading] = useState(true);
  const { t } = useLanguage();

  useEffect(() => {
    async function getProjects() {
      try {
        const query = `*[_type == "project"] | order(_createdAt desc) {
          _id,
          title,
          category,
          projectType,
          overview,
          skillsAcquired,
          toolStack,
          "thumbnailUrl": thumbnail.asset->url,
          "media": mediaGallery[0] {
            type,
            "imageUrl": imageFile.asset->url,
            "pdfUrl": pdfFile.asset->url,
            embedUrl
          }
        }`;
        
        const sanityData = await client.fetch(query);
        
        if (sanityData && sanityData.length > 0) {
          const mapCategory = (cat: string) => {
            switch (cat) {
              case 'strategy': return 'Strategy';
              case 'web3': return 'Web3';
              case 'seo-sem': return 'SEO & SEM';
              case 'content-marketing': return 'Content Marketing';
              case 'social-media': return 'Social Media';
              case 'academic-3d': return 'Academic / 3D';
              default: return cat;
            }
          };

          const mapped: Project[] = sanityData.map((p: any) => {
            let mediaUrl = undefined;
            let mediaType: 'image' | 'spatial' | 'pdf' | 'video' | undefined = undefined;

            if (p.media) {
              mediaType = p.media.type;
              if (p.media.type === 'pdf') {
                mediaUrl = p.media.pdfUrl;
              } else if (p.media.type === 'image') {
                mediaUrl = p.media.imageUrl;
              } else if (p.media.type === 'video' || p.media.type === 'spatial') {
                mediaUrl = p.media.embedUrl;
              }
            }

            return {
              _id: p._id,
              title: p.title,
              category: mapCategory(p.category),
              projectType: p.projectType || 'professional', // fallback
              overview: p.overview || '',
              skillsAcquired: p.skillsAcquired || [],
              toolStack: p.toolStack || [],
              mediaType,
              mediaUrl,
              thumbnailUrl: p.thumbnailUrl
            };
          });

          setProjects(mapped);
        }
      } catch (err) {
        console.error("Failed to load projects from Sanity: ", err);
      } finally {
        setLoading(false);
      }
    }
    
    getProjects();
  }, []);

  // Combined Dynamic Filter Logic
  const displayProjects = projects.filter(p => {
    const matchesContext = activeContext === 'All' || p.projectType === activeContext;
    const matchesCategory = activeFilter === 'All' || p.category === activeFilter;
    return matchesContext && matchesCategory;
  });

  return (
    <>
      <div className="w-full">
        {/* Project Context Filter Toggles (Professional vs Academic) */}
        <div className="flex flex-wrap gap-2 mb-6 p-1 bg-surface/30 rounded-2xl border border-white/5 w-fit">
          <button 
            onClick={() => { setActiveContext('All'); setActiveFilter('All'); }}
            className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
              activeContext === 'All' 
                ? 'bg-accent-indigo text-white shadow-sm' 
                : 'text-foreground/60 hover:text-white'
            }`}
          >
            {t.projects.subAll}
          </button>
          <button 
            onClick={() => { setActiveContext('professional'); setActiveFilter('All'); }}
            className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
              activeContext === 'professional' 
                ? 'bg-accent-indigo text-white shadow-sm' 
                : 'text-foreground/60 hover:text-white'
            }`}
          >
            {t.projects.subProf}
          </button>
          <button 
            onClick={() => { setActiveContext('academic'); setActiveFilter('All'); }}
            className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
              activeContext === 'academic' 
                ? 'bg-accent-indigo text-white shadow-sm' 
                : 'text-foreground/60 hover:text-white'
            }`}
          >
            {t.projects.subAcad}
          </button>
        </div>

        {/* Global Category Filter Bar */}
        <div className="flex flex-wrap gap-2 mb-10 pb-4 border-b border-surface overflow-x-auto custom-scrollbar">
          {FILTER_CATEGORIES.map(filter => {
            // Only show category if it is valid for the current active context (just an optimization, but let's keep all standard categories active)
            return (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all whitespace-nowrap cursor-pointer ${
                  activeFilter === filter
                    ? 'bg-accent-indigo text-white shadow-sm'
                    : 'bg-surface/50 text-foreground/70 hover:bg-surface hover:text-white border border-white/5'
                }`}
              >
                {t.categories[filter as keyof typeof t.categories] || filter}
              </button>
            );
          })}
        </div>

        {/* Project Grid */}
        {displayProjects.length === 0 ? (
          <div className="w-full min-h-[300px] bg-surface/30 rounded-3xl border border-white/10 flex items-center justify-center p-8">
            <div className="text-center">
              <span className="text-4xl text-foreground/20 mb-4 block">👀</span>
              <p className="text-foreground/60">{t.about.noMatches}</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayProjects.map((project) => (
              <div 
                key={project._id}
                onClick={() => setSelectedProject(project)}
                className="bg-surface border border-white/10 rounded-2xl overflow-hidden cursor-pointer group hover:border-accent-sky/50 transition-colors animate-in fade-in slide-in-from-bottom-4 duration-500"
              >
                {/* Card Thumbnail */}
                <div className="w-full aspect-video bg-background relative overflow-hidden flex items-center justify-center">
                  {project.thumbnailUrl ? (
                    <img 
                      src={project.thumbnailUrl} 
                      alt={project.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : project.mediaType === 'spatial' ? (
                    <div className="absolute inset-0 bg-gradient-to-br from-accent-indigo/20 to-background flex items-center justify-center">
                      <span className="text-5xl group-hover:scale-110 transition-transform duration-500">🌌</span>
                    </div>
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-surface to-background flex items-center justify-center">
                      <span className="text-4xl text-foreground/20 group-hover:scale-110 transition-transform duration-500">🖼️</span>
                    </div>
                  )}
                  {/* Subtle hover overlay */}
                  <div className="absolute inset-0 bg-accent-sky/0 group-hover:bg-accent-sky/5 transition-colors duration-300"></div>
                </div>
                
                {/* Card Content */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-accent-sky text-xs font-bold tracking-wider uppercase">
                      {project.category}
                    </span>
                    {project.projectType && (
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-white/5 text-foreground/50 uppercase tracking-wider">
                        {project.projectType === 'professional' ? t.projects.typeProf.split(' ')[0] : project.projectType === 'academic' ? t.projects.typeAcad.split(' ')[0] : t.projects.typePers.split(' ')[0]}
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl font-heading font-bold text-white mb-3 line-clamp-1 group-hover:text-accent-sky transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-foreground/70 line-clamp-2">
                    {project.overview}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <ProjectModal 
        project={selectedProject} 
        isOpen={!!selectedProject} 
        onClose={() => setSelectedProject(null)} 
      />
    </>
  );
}
