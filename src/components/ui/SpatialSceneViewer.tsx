'use client';

// Spatial 3D integration is paused for now.
// This component is kept as a placeholder — the full Three.js implementation
// is preserved in scratch/SpatialSceneViewer_full.tsx for future use.

interface SpatialSceneViewerProps {
  sceneName: string; // 'scene_route66', 'scene_astronaut', 'scene_saturn', 'scene_omega'
  onClose?: () => void;
}

export default function SpatialSceneViewer({ sceneName, onClose }: SpatialSceneViewerProps) {
  return (
    <div className="relative w-full h-[60vh] min-h-[400px] bg-black/40 rounded-2xl border border-white/10 overflow-hidden flex flex-col items-center justify-center gap-4 text-center px-6">
      <div className="w-16 h-16 rounded-full bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-3xl">
        🚀
      </div>
      <h3 className="text-white font-semibold text-lg">3D Scene Coming Soon</h3>
      <p className="text-white/50 text-sm max-w-xs">
        The interactive spatial viewer for <span className="text-indigo-400 font-medium">{sceneName}</span> is currently being integrated. Check back soon!
      </p>
      {onClose && (
        <button
          onClick={onClose}
          className="mt-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white/60 hover:text-white text-sm transition-all hover:bg-white/10"
        >
          Close
        </button>
      )}
    </div>
  );
}
