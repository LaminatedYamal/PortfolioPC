'use client';

import { useState } from 'react';
import ProjectModal, { Project } from './ProjectModal';

// Unified Mock Data Array
const ALL_PROJECTS: Project[] = [
  { _id: '1', title: 'Global Market Expansion', category: 'Strategy', overview: 'Developed a comprehensive go-to-market strategy for a fintech startup entering the European market, resulting in a 40% increase in initial user acquisition.', skillsAcquired: ['Market Research', 'Financial Modeling', 'GTM Strategy'], toolStack: ['Excel', 'Tableau', 'Miro'], mediaType: 'image' },
  { _id: '2', title: 'Brand Repositioning Campaign', category: 'Strategy', overview: 'Led a cross-functional team to reposition a legacy B2B brand for a younger demographic.', skillsAcquired: ['Brand Identity', 'Audience Segmentation'], toolStack: ['Figma', 'Google Analytics'], mediaType: 'image' },
  { _id: '3', title: 'NFT Loyalty Program', category: 'Web3', overview: 'Designed and deployed a smart contract-based loyalty program for an e-commerce brand.', skillsAcquired: ['Smart Contract Design', 'Tokenomics', 'Community Building'], toolStack: ['Solidity', 'Hardhat', 'Discord'], mediaType: 'image' },
  { _id: '4', title: 'Organic Traffic 300% Scaling', category: 'SEO & SEM', overview: 'Completely overhauled the technical SEO and content architecture for a SaaS platform.', skillsAcquired: ['Technical SEO', 'Keyword Strategy', 'Link Building'], toolStack: ['Ahrefs', 'Screaming Frog', 'Google Search Console'], mediaType: 'image' },
  { _id: '5', title: 'Moon Boutique', category: 'Academic / 3D', overview: 'An immersive 3D spatial e-commerce environment built as a university capstone project.', skillsAcquired: ['Spatial Design', 'C# Scripting', 'User Experience'], toolStack: ['Unity', 'Shopify API', 'Blender'], mediaType: 'spatial' }
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
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('All');

  // Filter logic
  const displayProjects = activeFilter === 'All' 
    ? ALL_PROJECTS 
    : ALL_PROJECTS.filter(p => p.category === activeFilter);

  return (
    <>
      <div className="w-full">
        {/* Global Filter Bar */}
        <div className="flex flex-wrap gap-2 mb-10 pb-4 border-b border-surface overflow-x-auto custom-scrollbar">
          {FILTER_CATEGORIES.map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                activeFilter === filter
                  ? 'bg-accent-royal text-white shadow-[0_0_15px_rgba(58,134,200,0.4)]'
                  : 'bg-surface/50 text-foreground/70 hover:bg-surface hover:text-white border border-white/5'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Project Grid */}
        {displayProjects.length === 0 ? (
          <div className="w-full min-h-[300px] bg-surface/30 rounded-3xl border border-white/10 flex items-center justify-center p-8">
            <div className="text-center">
              <span className="text-4xl text-foreground/20 mb-4 block">👀</span>
              <p className="text-foreground/60">No projects currently available under this filter.</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayProjects.map((project) => (
              <div 
                key={project._id}
                onClick={() => setSelectedProject(project)}
                className="bg-surface border border-white/10 rounded-2xl overflow-hidden cursor-pointer group hover:border-accent-cyan/50 transition-colors animate-in fade-in slide-in-from-bottom-4 duration-500"
              >
                {/* Card Thumbnail */}
                <div className="w-full aspect-video bg-background relative overflow-hidden flex items-center justify-center">
                  {project.mediaType === 'spatial' ? (
                    <div className="absolute inset-0 bg-gradient-to-br from-accent-cobalt/20 to-background flex items-center justify-center">
                      <span className="text-5xl group-hover:scale-110 transition-transform duration-500">🌌</span>
                    </div>
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-surface to-background flex items-center justify-center">
                      <span className="text-4xl text-foreground/20 group-hover:scale-110 transition-transform duration-500">🖼️</span>
                    </div>
                  )}
                  {/* Subtle hover overlay */}
                  <div className="absolute inset-0 bg-accent-cyan/0 group-hover:bg-accent-cyan/10 transition-colors duration-300"></div>
                </div>
                
                {/* Card Content */}
                <div className="p-6">
                  <div className="text-accent-cyan text-xs font-bold tracking-wider uppercase mb-2">
                    {project.category}
                  </div>
                  <h3 className="text-xl font-heading font-bold text-white mb-3 line-clamp-1 group-hover:text-accent-cyan transition-colors">
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
