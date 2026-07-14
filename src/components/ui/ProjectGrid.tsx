'use client';

import { useState, useEffect } from 'react';
import ProjectModal, { Project } from './ProjectModal';
import { client } from '../../lib/sanity';
import { useLanguage } from '@/components/LanguageContext';

// Unified Mock Data Array (used as fallback when Sanity is empty)
// Unified Mock Data Array (used as fallback when Sanity is empty)
const ALL_PROJECTS: Project[] = [
  {
    _id: '1',
    title: 'Marketing Performance Dashboard',
    category: 'Tech & Analytics',
    projectType: 'professional',
    overview: 'Designed and implemented a centralized marketing dashboard during my internship at Universidade Lusófona to track acquisition channels, organic traffic, and Google Ads metrics.',
    skillsAcquired: ['Data Analysis', 'Performance Tracking', 'Process Optimization'],
    toolStack: ['Looker Studio', 'Google Sheets', 'Google Analytics'],
    mediaType: 'image'
  },
  {
    _id: '2',
    title: 'Rolex vs Grand Seiko Ad Dissection',
    category: 'Paid Campaigns',
    projectType: 'academic',
    overview: 'A detailed comparative analysis dissecting the paid advertising campaigns, messaging psychology, and creative distribution strategies of Rolex and Grand Seiko.',
    skillsAcquired: ['Ad Dissection', 'Campaign Analysis', 'Creative Strategy'],
    toolStack: ['Facebook Ad Library', 'Google Ads', 'Figma'],
    mediaType: 'pdf',
    mediaUrl: '/documents/AnaliseCriticaGrandSeikoRolex.pdf',
    attachments: [
      { name: 'Análise Crítica: Rolex vs Grand Seiko', url: '/documents/AnaliseCriticaGrandSeikoRolex.pdf' },
      { name: 'Ad Dissection Slides', url: '/documents/ROLEXVSGRANDSEIKO.pdf' }
    ]
  },
  {
    _id: '3',
    title: 'Metrics Study for Omega Shopify Website',
    category: 'Tech & Analytics',
    projectType: 'academic',
    overview: 'An in-depth performance analytics and conversion rate optimization (CRO) study analyzing user behavior metrics for an Omega timepiece e-commerce store.',
    skillsAcquired: ['Conversion Optimization', 'User Behavior Analysis', 'E-commerce Audit'],
    toolStack: ['Shopify Analytics', 'Google Analytics', 'Hotjar'],
    mediaType: 'image'
  },
  {
    _id: '8',
    title: 'Omega 3D Shopify Store',
    category: 'Academic / 3D',
    projectType: 'academic',
    overview: 'A fully interactive 3D spatial e-commerce prototype for an Omega timepiece boutique, demonstrating immersive product interaction.',
    skillsAcquired: ['Spatial E-commerce', 'Interactive Web3', '3D Scene Design'],
    toolStack: ['Unity', 'Shopify API', 'Blender'],
    mediaType: 'spatial',
    sceneName: 'scene_omega'
  },
  {
    _id: '4',
    title: 'Koenigsegg Brand Full Overview',
    category: 'Strategy',
    projectType: 'academic',
    overview: 'A deep strategic analysis of Koenigsegg\'s luxury brand positioning, hypercar market dynamics, and global digital marketing tactics.',
    skillsAcquired: ['Brand Auditing', 'Competitor Intelligence', 'Market Research'],
    toolStack: ['Semrush', 'Miro', 'PowerPoint'],
    mediaType: 'image'
  },
  {
    _id: '5',
    title: 'Audemars Piguet Full Overview',
    category: 'Strategy',
    projectType: 'academic',
    overview: 'A comprehensive brand audit and strategic overview of Audemars Piguet, exploring luxury watch marketing, exclusivity models, and digital outreach.',
    skillsAcquired: ['Luxury GTM Strategy', 'Market Positioning', 'Audience Research'],
    toolStack: ['Ahrefs', 'Semrush', 'Excel'],
    mediaType: 'pdf',
    mediaUrl: '/documents/AudemarsPiguet.pdf',
    attachments: [
      { name: 'Brand Audit & Strategy Presentation', url: '/documents/AudemarsPiguet.pdf' }
    ]
  },
  {
    _id: '6',
    title: 'Surf School Full Launch Plan',
    category: 'Strategy',
    projectType: 'academic',
    overview: 'A comprehensive go-to-market and digital launch plan for a local surf school, detailing acquisition channels, branding, and local search presence.',
    skillsAcquired: ['GTM Launch Planning', 'Local SEO', 'Marketing Strategy'],
    toolStack: ['Google Business Profile', 'Figma', 'Miro'],
    mediaType: 'image'
  },
  {
    _id: '7',
    title: 'Moon Boutique',
    category: 'Academic / 3D',
    projectType: 'academic',
    overview: 'An immersive 3D spatial e-commerce environment built as a university capstone project, integrating web platforms with spatial assets.',
    skillsAcquired: ['Spatial Design', 'C# Scripting', 'User Experience'],
    toolStack: ['Unity', 'Shopify API', 'Blender'],
    mediaType: 'spatial',
    sceneName: 'scene_route66'
  }
];

// Define standard filter categories
const FILTER_CATEGORIES = [
  'All',
  'Strategy',
  'Paid Campaigns',
  'Tech & Analytics',
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
        // Sanity is bypassed to strictly use the customized hardcoded ALL_PROJECTS array
        /*
        const query = `*[_type == "project"] | order(_createdAt desc) {
          _id,
          title,
          category,
          projectType,
          overview,
          githubUrl,
          skillsAcquired,
          toolStack,
          "thumbnailUrl": thumbnail.asset->url,
          sceneName,
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
              githubUrl: p.githubUrl,
              skillsAcquired: p.skillsAcquired || [],
              toolStack: p.toolStack || [],
              mediaType,
              mediaUrl,
              sceneName: p.sceneName,
              thumbnailUrl: p.thumbnailUrl
            };
          });

          setProjects(mapped);
        }
        */
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
