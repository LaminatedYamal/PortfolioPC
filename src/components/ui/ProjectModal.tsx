'use client';

import { useEffect } from 'react';

// Using a basic interface to type the project data
export interface Project {
  _id: string;
  title: string;
  category: string;
  overview: string;
  skillsAcquired?: string[];
  toolStack?: string[];
  // we can expand this with Sanity portable text block types later
  description?: string; 
  mediaUrl?: string; // a placeholder for image/iframe URL
  mediaType?: 'image' | 'spatial' | 'pdf' | 'video';
}

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  // Prevent scrolling on the body when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 pb-safe">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-background/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative w-full max-w-5xl max-h-[90vh] bg-surface rounded-3xl border border-white/10 shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-white/10">
          <div>
            <div className="text-accent-cyan text-sm font-semibold tracking-wide uppercase mb-1">
              {project.category}
            </div>
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-white">
              {project.title}
            </h2>
          </div>
          <button 
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 overflow-y-auto custom-scrollbar flex-1">
          <div className="grid md:grid-cols-5 gap-8">
            
            {/* Left Column: Media & Description */}
            <div className="md:col-span-3 space-y-6">
              
              {/* Media Gallery Placeholder */}
              <div className="w-full aspect-video bg-background rounded-2xl border border-white/5 overflow-hidden relative group">
                {project.mediaType === 'spatial' ? (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-surface to-background">
                    <span className="text-4xl mb-4">🌌</span>
                    <button className="px-6 py-3 rounded-full bg-accent-cobalt text-white font-medium hover:bg-accent-cobalt/80 transition-colors shadow-[0_0_20px_rgba(67,97,238,0.4)]">
                      Enter Immersive Space
                    </button>
                    <p className="text-xs text-foreground/50 mt-4">Loads external Unity/WebGL iframe</p>
                  </div>
                ) : project.mediaType === 'image' && project.mediaUrl ? (
                  <img src={project.mediaUrl} alt={project.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-foreground/40 font-medium">
                    Media Viewer
                  </div>
                )}
                
                {/* Download Protection Overlay (Invisible) */}
                <div 
                  className="absolute inset-0 z-10 bg-transparent" 
                  onContextMenu={(e) => e.preventDefault()}
                  title="Protected Media"
                ></div>
              </div>

              {/* Description */}
              <div>
                <h3 className="text-xl font-heading font-semibold text-white mb-3">Project Overview</h3>
                <p className="text-foreground/80 leading-relaxed">
                  {project.overview}
                </p>
              </div>
            </div>

            {/* Right Column: Skills & Tools */}
            <div className="md:col-span-2 space-y-8">
              
              {/* Skills */}
              <div>
                <h3 className="text-lg font-heading font-semibold text-white mb-4 flex items-center gap-2">
                  <span className="text-accent-cyan">⚡</span> Skills Acquired
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.skillsAcquired?.map((skill, i) => (
                    <span key={i} className="px-3 py-1.5 bg-background border border-white/10 rounded-lg text-sm text-foreground/90">
                      {skill}
                    </span>
                  )) || <span className="text-foreground/50 text-sm">No skills listed.</span>}
                </div>
              </div>

              {/* Tools */}
              <div>
                <h3 className="text-lg font-heading font-semibold text-white mb-4 flex items-center gap-2">
                  <span className="text-accent-royal">🛠</span> Tool Stack
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {project.toolStack?.map((tool, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 bg-background border border-white/10 rounded-xl">
                      {/* Placeholder for FontAwesome icon */}
                      <div className="w-8 h-8 rounded-lg bg-surface flex items-center justify-center text-xs">
                        ICO
                      </div>
                      <span className="text-sm font-medium text-foreground/90">{tool}</span>
                    </div>
                  )) || <span className="text-foreground/50 text-sm">No tools listed.</span>}
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
