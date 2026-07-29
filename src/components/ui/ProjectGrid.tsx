'use client';

import { useState, useEffect } from 'react';
import ProjectModal, { Project } from './ProjectModal';
import { client } from '../../lib/sanity';
import { useLanguage } from '@/components/LanguageContext';

// Unified Mock Data Array (used as fallback when Sanity is empty)
const ALL_PROJECTS: Project[] = [
  {
    _id: '1',
    title: 'Marketing Performance Dashboard',
    category: 'Tech & Analytics',
    projectType: 'professional',
    overview: 'Designed and implemented a centralized marketing dashboard during my internship at Universidade Lusófona to track acquisition channels, organic traffic, and Google Ads metrics in real time.',
    skillsAcquired: ['Data Analysis', 'Performance Tracking', 'Process Optimization'],
    toolStack: ['GitHub', 'Antigravity', 'Gemini', 'Google Ads', 'Google Search Console'],
    mediaType: 'pdf',
    mediaUrl: '/documents/Internship_Final_Report.pdf',
    attachments: [
      { name: 'Internship Final Report (PDF)', url: '/documents/Internship_Final_Report.pdf' }
    ],
    thumbnailUrl: '/images/covers/Internship_Final_Report.png'
  },
  {
    _id: '2',
    title: 'Rolex vs Grand Seiko Ad Dissection',
    category: 'Paid Campaigns',
    projectType: 'academic',
    overview: 'A detailed comparative analysis dissecting the paid advertising campaigns, messaging psychology, and creative distribution strategies of Rolex and Grand Seiko across digital platforms.',
    skillsAcquired: ['Ad Dissection', 'Campaign Analysis', 'Creative Strategy'],
    toolStack: ['Google Transparency Center', 'Google Ads', 'Canva'],
    mediaType: 'pdf',
    mediaUrl: '/documents/ROLEXVSGRANDSEIKO.pdf',
    attachments: [
      { name: 'Ad Dissection Slides', url: '/documents/ROLEXVSGRANDSEIKO.pdf' },
      { name: 'Análise Crítica: Rolex vs Grand Seiko', url: '/documents/RolexGrandSeiko_Analysis.pdf' }
    ],
    thumbnailUrl: '/images/covers/RolexGrandSeiko_Analysis.png'
  },
  {
    _id: '3',
    title: 'Metrics Study for Omega Shopify Website',
    category: 'Tech & Analytics',
    projectType: 'academic',
    overview: 'A strategic analytics report outlining key performance metrics, success criteria, and measurement frameworks defined to track success for our specific e-commerce scenario.',
    skillsAcquired: ['Conversion Optimization', 'User Behavior Analysis', 'E-commerce Audit'],
    toolStack: ['Shopify Analytics', 'Google Analytics', 'GTM', 'Hotjar'],
    mediaType: 'pdf',
    mediaUrl: '/documents/Omega_Shopify_Presentation.pdf',
    attachments: [
      { name: 'Omega Shopify Metrics Presentation', url: '/documents/Omega_Shopify_Presentation.pdf' }
    ],
    thumbnailUrl: '/images/covers/Omega_Shopify_Presentation.png'
  },
  {
    _id: '8',
    title: 'Omega Shopify Store',
    category: 'Tech & Analytics',
    projectType: 'academic',
    overview: 'An interactive e-commerce boutique prototype built for Omega timepieces on Shopify, focused on conversion rate optimization, storefront design, and digital store UX.',
    skillsAcquired: ['E-commerce Strategy', 'Conversion Optimization', 'Storefront UX'],
    toolStack: ['Shopify', 'Antigravity', 'Gemini'],
    mediaType: 'website',
    mediaUrl: 'https://omega-estore.myshopify.com/en',
    storePassword: 'ai?nuncausei',
    thumbnailUrl: '/images/covers/Omega_Shopify_Presentation.png'
  },
  {
    _id: '4',
    title: 'Koenigsegg Content Marketing Report',
    category: 'Strategy',
    projectType: 'academic',
    overview: 'A deep content marketing analysis of Koenigsegg\'s digital presence — examining brand voice, distribution channels, editorial strategy, and storytelling.',
    skillsAcquired: ['Content Strategy', 'Brand Auditing', 'Competitor Intelligence'],
    toolStack: ['Canva', 'Clipchamp', 'Notion'],
    mediaType: 'pdf',
    mediaUrl: '/documents/Koenigsegg_Content_Marketing.pdf',
    attachments: [
      { name: 'Koenigsegg Content Marketing Report', url: '/documents/Koenigsegg_Content_Marketing.pdf' }
    ],
    thumbnailUrl: '/images/covers/Koenigsegg_Content_Marketing.png'
  },
  {
    _id: '12',
    title: 'Koenigsegg — Social Media Analysis',
    category: 'Paid Campaigns',
    projectType: 'academic',
    overview: 'A comprehensive social media strategy and channel performance analysis for Koenigsegg, evaluating audience engagement, content distribution, and social platform growth tactics.',
    skillsAcquired: ['Social Media Audit', 'Channel Strategy', 'Audience Growth'],
    toolStack: ['Meta Business Suite', 'Semrush', 'PowerPoint'],
    mediaType: 'pdf',
    mediaUrl: '/documents/Koenigsegg_Trab_Total.pdf',
    attachments: [
      { name: 'Análise de Redes Sociais — Relatório Total', url: '/documents/Koenigsegg_Trab_Total.pdf' }
    ],
    thumbnailUrl: '/images/covers/Koenigsegg_Trab_Total.png'
  },
  {
    _id: '5',
    title: 'Audemars Piguet Full Overview',
    category: 'Strategy',
    projectType: 'academic',
    overview: 'A comprehensive brand audit and strategic overview of Audemars Piguet, exploring luxury watch marketing, exclusivity models, digital outreach, and the brand\'s positioning within the ultra-premium segment.',
    skillsAcquired: ['Luxury GTM Strategy', 'Market Positioning', 'Audience Research'],
    toolStack: ['Notion', 'Google Transparency Center', 'Meta Business Suite'],
    mediaType: 'pdf',
    mediaUrl: '/documents/AudemarsPiguet.pdf',
    attachments: [
      { name: 'Brand Audit & Strategy Presentation (PT)', url: '/documents/AudemarsPiguet.pdf' }
    ],
    thumbnailUrl: '/images/covers/AudemarsPiguet.png'
  },
  {
    _id: '6',
    title: 'Saoloto Surf School — Campaign Strategy',
    category: 'Strategy',
    projectType: 'academic',
    overview: 'A full campaign strategy and media planning document for Saoloto, a local surf school — covering acquisition channels, seasonal content planning, local SEO, and paid social frameworks.',
    skillsAcquired: ['Campaign Strategy', 'Media Planning', 'Local SEO'],
    toolStack: ['Notion', 'Google Analytics', 'Google Trends', 'Canva'],
    mediaType: 'pdf',
    mediaUrl: '/documents/Saoloto_Campaign_Strategy.pdf',
    attachments: [
      { name: 'Campaign Strategy & Planning', url: '/documents/Saoloto_Campaign_Strategy.pdf' },
      { name: 'Apresentação Saoloto Deck', url: '/documents/Apresentacao_Saoloto.pdf' },
      { name: 'Saoloto Data & Metrics Report', url: '/documents/Saoloto_Data.pdf' }
    ],
    thumbnailUrl: '/images/covers/Saoloto_Campaign_Strategy.png'
  },
  {
    _id: '9',
    title: 'SEO Audit — Publication Improvement Plan',
    category: 'Strategy',
    projectType: 'academic',
    overview: 'A structured SEO audit of an existing online publication, evaluating on-page performance, keyword targeting, and content gaps — followed by a concrete action plan to improve organic visibility.',
    skillsAcquired: ['Technical SEO', 'Content Gap Analysis', 'Keyword Research'],
    toolStack: ['Semrush', 'Google Search Console', 'Screaming Frog'],
    mediaType: 'pdf',
    mediaUrl: '/documents/SEO_Publication_Audit.pdf',
    attachments: [
      { name: 'SEO Audit Report', url: '/documents/SEO_Publication_Audit.pdf' }
    ],
    thumbnailUrl: '/images/covers/SEO_Publication_Audit.png'
  },
  {
    _id: '10',
    title: 'NeRF & Photogrammetry Research',
    category: 'Academic / 3D',
    projectType: 'academic',
    overview: 'A university research project exploring Neural Radiance Fields (NeRF) as a photogrammetry technique — studying how AI can reconstruct detailed 3D models from 2D image sets for use in spatial marketing environments.',
    skillsAcquired: ['NeRF / Neural Radiance Fields', 'Photogrammetry', '3D Research'],
    toolStack: ['Instant NeRF', 'Blender', 'Python'],
    mediaType: 'pdf',
    mediaUrl: '/documents/NeRF_Photogrammetry.pdf',
    attachments: [
      { name: 'NeRF & Photogrammetry Research Paper', url: '/documents/NeRF_Photogrammetry.pdf' }
    ],
    thumbnailUrl: '/images/covers/NeRF_Photogrammetry.png'
  },
  {
    _id: '11',
    title: 'Email Marketing Metrics Analysis',
    category: 'Tech & Analytics',
    projectType: 'academic',
    overview: 'An analytical study of email marketing performance metrics — examining open rates, click-through rates, conversion funnels, and audience segmentation strategies for optimizing email campaign effectiveness.',
    skillsAcquired: ['Email Analytics', 'Campaign Measurement', 'Audience Segmentation'],
    toolStack: ['Mailchimp', 'Gemini', 'DNS Configuration'],
    mediaType: 'pdf',
    mediaUrl: '/documents/Email_Marketing_Analysis.pdf',
    attachments: [
      { name: 'Email Marketing Analysis Document', url: '/documents/Email_Marketing_Analysis.pdf' }
    ],
    thumbnailUrl: '/images/covers/Email_Marketing_Analysis.png'
  },
  {
    _id: '7',
    title: 'Moon Boutique',
    category: 'Academic / 3D',
    projectType: 'academic',
    overview: 'An immersive 3D spatial experience created in Unity, Blender, and Spatial SDK. Explores virtual boutique environments, interactive 3D product showcases, and spatial UI/UX design. (Note: If you would like to explore the interactive 3D scenes directly, feel free to reach out via the Contact page and I can send them over!)',
    skillsAcquired: ['Spatial Design', 'C# Scripting', 'User Experience'],
    toolStack: ['Unity', 'Spatial SDK', 'Blender', 'Meshy', 'Reality Scan', 'C#'],
    mediaType: 'spatial',
    mediaUrl: '/moon-boutique/index.html'
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
  const [activeContext, setActiveContext] = useState<string>('All');
  const [loading, setLoading] = useState(true);
  const { t } = useLanguage();

  useEffect(() => {
    setLoading(false);
  }, []);

  const displayProjects = projects.filter(p => {
    const matchesContext = activeContext === 'All' || p.projectType === activeContext;
    const matchesCategory = activeFilter === 'All' || p.category === activeFilter;
    return matchesContext && matchesCategory;
  }).map(p => {
    const translatedItem = (t as any).projectItems?.[p._id];
    if (translatedItem) {
      return {
        ...p,
        title: translatedItem.title || p.title,
        overview: translatedItem.overview || p.overview
      };
    }
    return p;
  });

  return (
    <>
      <div className="w-full">
        {/* Context Filter Toggles */}
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
          {FILTER_CATEGORIES.map(filter => (
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
          ))}
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
                <div className="w-full aspect-video bg-background relative overflow-hidden flex items-center justify-center">
                  {project.thumbnailUrl ? (
                    <img 
                      src={project.thumbnailUrl.startsWith('http') ? project.thumbnailUrl : (project.thumbnailUrl.startsWith('/') ? `/PortfolioPC${project.thumbnailUrl}` : `/PortfolioPC/${project.thumbnailUrl}`)} 
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
                  <div className="absolute inset-0 bg-accent-sky/0 group-hover:bg-accent-sky/5 transition-colors duration-300"></div>
                </div>
                
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
