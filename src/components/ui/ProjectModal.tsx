'use client';

import { useEffect, useState } from 'react';
import { 
  SiMeta, SiShopify, SiUnity, SiGoogle, SiGoogleanalytics,
  SiFigma, SiDiscord, SiSemrush, SiBlender, SiSolidity,
  SiMiro, SiTrello
} from 'react-icons/si';
import { FaWrench, FaFileExcel, FaChartBar, FaSearch } from 'react-icons/fa';

const getToolIcon = (toolName: string) => {
  const name = toolName.toLowerCase().replace(/[\s\-_]/g, '');
  switch (name) {
    case 'meta':
    case 'facebook':
      return <SiMeta className="w-5 h-5 text-[#0668E1]" />;
    case 'shopify':
      return <SiShopify className="w-5 h-5 text-[#96BF48]" />;
    case 'unity':
      return <SiUnity className="w-5 h-5 text-white" />;
    case 'google':
    case 'googleapps':
    case 'googleappsscript':
      return <SiGoogle className="w-5 h-5 text-[#4285F4]" />;
    case 'googleanalytics':
    case 'analytics':
    case 'ga4':
      return <SiGoogleanalytics className="w-5 h-5 text-[#E37400]" />;
    case 'excel':
    case 'microsoftexcel':
      return <FaFileExcel className="w-5 h-5 text-[#107C41]" />;
    case 'tableau':
      return <FaChartBar className="w-5 h-5 text-[#E97627]" />;
    case 'figma':
      return <SiFigma className="w-5 h-5 text-[#F24E1E]" />;
    case 'ahrefs':
      return <FaSearch className="w-5 h-5 text-[#FF5A5F]" />;
    case 'discord':
      return <SiDiscord className="w-5 h-5 text-[#5865F2]" />;
    case 'semrush':
      return <SiSemrush className="w-5 h-5 text-[#FF6200]" />;
    case 'blender':
      return <SiBlender className="w-5 h-5 text-[#EA7600]" />;
    case 'solidity':
      return <SiSolidity className="w-5 h-5 text-white" />;
    case 'miro':
      return <SiMiro className="w-5 h-5 text-[#FFD02F]" />;
    case 'trello':
      return <SiTrello className="w-5 h-5 text-[#0079BF]" />;
    default:
      return <FaWrench className="w-4 h-4 text-foreground/50" />;
  }
};

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
  thumbnailUrl?: string;
}

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);

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

  // Reset fullscreen when modal closes or changes
  useEffect(() => {
    if (!isOpen) {
      setIsFullscreen(false);
    }
  }, [isOpen]);

  if (!isOpen || !project) return null;

  const resolveMediaUrl = (url?: string) => {
    if (!url) return '';
    if (url.startsWith('http://') || url.startsWith('https://')) return url;
    const cleanUrl = url.startsWith('/') ? url : `/${url}`;
    return `/PortfolioPC${cleanUrl}`;
  };

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
              <div className={`w-full bg-background rounded-2xl border border-white/5 overflow-hidden relative group ${
                project.mediaType === 'pdf' ? 'h-[550px]' : 'aspect-video'
              }`}>
                {project.mediaType === 'spatial' ? (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-surface to-background">
                    <span className="text-4xl mb-4">🌌</span>
                    <button className="px-6 py-3 rounded-full bg-accent-cobalt text-white font-medium hover:bg-accent-cobalt/80 transition-colors shadow-[0_0_20px_rgba(67,97,238,0.4)]">
                      Enter Immersive Space
                    </button>
                    <p className="text-xs text-foreground/50 mt-4">Loads external Unity/WebGL iframe</p>
                  </div>
                ) : project.mediaType === 'pdf' && project.mediaUrl ? (
                  <iframe 
                    src={`${resolveMediaUrl(project.mediaUrl)}#toolbar=0`} 
                    className="w-full h-full border-0 bg-white/10" 
                    title={project.title}
                  />
                ) : project.mediaType === 'image' && project.mediaUrl ? (
                  <img src={resolveMediaUrl(project.mediaUrl)} alt={project.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-foreground/40 font-medium">
                    Media Viewer
                  </div>
                )}
                
                {/* Download Protection Overlay (Invisible) - Disabled for PDFs to allow scrolling */}
                {project.mediaType !== 'pdf' && (
                  <div 
                    className="absolute inset-0 z-10 bg-transparent" 
                    onContextMenu={(e) => e.preventDefault()}
                    title="Protected Media"
                  ></div>
                )}

                {/* Fullscreen Button */}
                {project.mediaUrl && (
                  <button 
                    onClick={() => setIsFullscreen(true)}
                    className="absolute bottom-4 right-4 z-20 px-3.5 py-2 rounded-lg bg-surface/80 border border-white/10 hover:bg-surface hover:text-accent-cyan transition-all text-xs font-semibold text-white/90 backdrop-blur-md shadow-lg flex items-center gap-1.5"
                    title="Expand View"
                  >
                    <span>⛶</span> Fullscreen
                  </button>
                )}
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
                      <div className="w-8 h-8 rounded-lg bg-surface flex items-center justify-center shrink-0">
                        {getToolIcon(tool)}
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

      {/* Fullscreen Overlay */}
      {isFullscreen && (
        <div className="fixed inset-0 z-[100] bg-background flex flex-col p-0 animate-in fade-in duration-200">
          {/* Solid, floating close button */}
          <button 
            onClick={() => setIsFullscreen(false)}
            className="absolute top-6 right-6 z-[110] w-12 h-12 rounded-full bg-accent-cyan text-background font-bold shadow-[0_0_20px_rgba(0,180,216,0.6)] flex items-center justify-center hover:scale-110 active:scale-95 transition-all text-xl cursor-pointer"
            title="Close Fullscreen"
            aria-label="Close Fullscreen"
          >
            ✕
          </button>
          
          <div className="w-full h-full bg-background relative">
            {project.mediaType === 'pdf' ? (
              <iframe 
                src={`${resolveMediaUrl(project.mediaUrl)}#toolbar=0`} 
                className="w-full h-full border-0 bg-white" 
                title={project.title}
              />
            ) : project.mediaType === 'image' ? (
              <img src={resolveMediaUrl(project.mediaUrl)} alt={project.title} className="w-full h-full object-contain" />
            ) : project.mediaType === 'spatial' ? (
              <iframe 
                src={project.mediaUrl} 
                className="w-full h-full border-0" 
                title={project.title}
              />
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
}
