'use client';

import { useEffect, useRef, useState } from 'react';

interface SpatialSceneViewerProps {
  sceneName: string; // 'scene_route66', 'scene_astronaut', 'scene_saturn', 'scene_omega'
  onClose?: () => void;
}

export default function SpatialSceneViewer({ sceneName, onClose }: SpatialSceneViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loadingProgress, setLoadingProgress] = useState<string>('Loading 3D Engine...');
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    let active = true;
    let renderer: any = null;
    let scene: any = null;
    let camera: any = null;
    let controls: any = null;
    let animationFrameId: number;

    // Helper to dynamically load external scripts sequentially
    const loadScript = (src: string): Promise<void> => {
      return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = () => resolve();
        script.onerror = () => reject();
        document.head.appendChild(script);
      });
    };

    async function initThree() {
      try {
        setLoadingProgress('Initializing 3D libraries...');
        // 1. Load Three.js and OrbitControls / GLTFLoader if they aren't loaded yet
        if (!(window as any).THREE) {
          await loadScript('https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js');
        }
        if (!(window as any).THREE.OrbitControls) {
          await loadScript('https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/controls/OrbitControls.js');
        }
        if (!(window as any).THREE.GLTFLoader) {
          await loadScript('https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/loaders/GLTFLoader.js');
        }

        if (!active) return;

        const THREE = (window as any).THREE;
        
        // 2. Fetch scene-data.json
        setLoadingProgress('Loading scene layout...');
        const basePath = `/PortfolioPC/spatial-scenes/${sceneName}/`;
        const response = await fetch(`${basePath}scene-data.json`);
        if (!response.ok) {
          throw new Error('Failed to load scene-data.json');
        }
        const sceneData = await response.json();
        
        if (!active) return;

        // 3. Set up Three.js Scene, Camera, Renderer
        scene = new THREE.Scene();
        scene.background = new THREE.Color(0x0a0a16);
        scene.fog = new THREE.FogExp2(0x0a0a16, 0.005);

        const width = containerRef.current?.clientWidth || window.innerWidth;
        const height = containerRef.current?.clientHeight || window.innerHeight;

        camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
        camera.position.set(-15, 8, 20);

        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.0;

        if (containerRef.current) {
          containerRef.current.innerHTML = '';
          containerRef.current.appendChild(renderer.domElement);
        }

        // 4. Add Lights
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        scene.add(ambientLight);

        const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
        dirLight.position.set(20, 40, 20);
        dirLight.castShadow = true;
        dirLight.shadow.mapSize.width = 2048;
        dirLight.shadow.mapSize.height = 2048;
        dirLight.shadow.camera.near = 0.5;
        dirLight.shadow.camera.far = 150;
        const d = 40;
        dirLight.shadow.camera.left = -d;
        dirLight.shadow.camera.right = d;
        dirLight.shadow.camera.top = d;
        dirLight.shadow.camera.bottom = -d;
        scene.add(dirLight);

        // Add a grid floor helper
        const gridHelper = new THREE.GridHelper(200, 50, 0x4f46e5, 0x1e1b4b);
        gridHelper.position.y = -0.01;
        scene.add(gridHelper);

        // 5. Controls
        controls = new THREE.OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;
        controls.maxPolarAngle = Math.PI / 2 - 0.05; // Don't go below ground
        controls.minDistance = 2;
        controls.maxDistance = 150;
        controls.target.set(0, 4, 0);

        // 6. Parse and Load Models
        const gltfLoader = new THREE.GLTFLoader();
        const models = sceneData.data?.scene?.models || {};
        const transforms = sceneData.data?.scene?.transforms || {};
        
        const totalModels = Object.keys(models).length;
        let loadedModels = 0;

        // Collect all models to load
        const loadPromises = Object.keys(models).map(async (key) => {
          const modelInfo = models[key];
          const transformInfo = transforms[key];
          const fileName = modelInfo.fileName;
          
          if (!fileName) return;

          const fileUrl = `${basePath}files/${encodeURIComponent(fileName)}`;
          
          try {
            const gltf = await new Promise<any>((resolve, reject) => {
              gltfLoader.load(fileUrl, resolve, undefined, reject);
            });

            if (!active) return;
            
            const obj = gltf.scene;

            // Apply transforms (Unity to Three.js conversion helper)
            if (transformInfo) {
              const pos = transformInfo.localPosition?.value || [0, 0, 0];
              const rot = transformInfo.localRotation?.value || [0, 0, 0, 1]; // quaternion [x,y,z,w]
              const scl = transformInfo.localScale?.value || [1, 1, 1];

              // Convert Unity left-handed system to Three.js right-handed:
              // Unity X is flipped in Three.js
              obj.position.set(-pos[0], pos[1], pos[2]);
              
              // Apply Quaternion rotation (Unity quat is left-handed, adjust if needed)
              // Typically: x, y, z are flipped or inverted
              const quat = new THREE.Quaternion(-rot[0], rot[1], rot[2], -rot[3]);
              obj.quaternion.copy(quat);

              // Apply scale (normalize negative scales from Unity)
              obj.scale.set(Math.abs(scl[0]), Math.abs(scl[1]), Math.abs(scl[2]));
            }

            // Enable shadow casting/receiving
            obj.traverse((child: any) => {
              if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
                // Double side rendering for nicer interior views
                if (child.material) {
                  child.material.side = THREE.DoubleSide;
                }
              }
            });

            scene.add(obj);
            loadedModels++;
            setLoadingProgress(`Loading 3D Models: ${loadedModels} / ${totalModels}`);
          } catch (err) {
            console.error(`Failed to load model ${fileName}:`, err);
          }
        });

        // 7. Check if there are environment GLB files in the directory that aren't listed in scene-data.json
        // For scene_route66: load 'malaROUTE66-v1.glb'
        // For scene_astronaut: load 'mars_one_mission_-_base (1).glb'
        // For scene_saturn: load 'saturn_v_-_nasa.glb' if not listed
        // For scene_omega: load 'omega_beugel.glb' or environmental bases
        let envFile = '';
        if (sceneName === 'scene_route66') {
          envFile = 'malaROUTE66-v1.glb';
        } else if (sceneName === 'scene_astronaut') {
          envFile = 'mars_one_mission_-_base (1).glb';
        } else if (sceneName === 'scene_saturn') {
          envFile = 'saturn_v_-_nasa.glb';
        } else if (sceneName === 'scene_omega') {
          envFile = 'omega_gadamis_004.glb';
        }

        if (envFile) {
          try {
            const envUrl = `${basePath}files/${encodeURIComponent(envFile)}`;
            const envGltf = await new Promise<any>((resolve, reject) => {
              gltfLoader.load(envUrl, resolve, undefined, reject);
            });
            if (active) {
              const envObj = envGltf.scene;
              // Unity environment fits perfectly at center
              envObj.position.set(0, 0, 0);
              envObj.scale.set(1, 1, 1);
              envObj.traverse((child: any) => {
                if (child.isMesh) {
                  child.receiveShadow = true;
                  child.castShadow = true;
                  if (child.material) {
                    child.material.side = THREE.DoubleSide;
                  }
                }
              });
              scene.add(envObj);
              console.log(`Loaded environment mesh: ${envFile}`);
            }
          } catch (err) {
            console.warn(`Environment mesh ${envFile} failed to load or was already included:`, err);
          }
        }

        await Promise.all(loadPromises);

        if (!active) return;
        setLoadingProgress(''); // Clear loader

        // 8. Animation Loop
        const animate = () => {
          if (!active) return;
          animationFrameId = requestAnimationFrame(animate);
          controls.update();
          renderer.render(scene, camera);
        };
        animate();

        // 9. Resize handler
        const handleResize = () => {
          if (!containerRef.current || !camera || !renderer) return;
          const w = containerRef.current.clientWidth;
          const h = containerRef.current.clientHeight;
          camera.aspect = w / h;
          camera.updateProjectionMatrix();
          renderer.setSize(w, h);
        };
        window.addEventListener('resize', handleResize);

      } catch (err) {
        console.error('Three.js Initialization failed:', err);
        setIsError(true);
      }
    }

    initThree();

    return () => {
      active = false;
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', () => {});
      if (renderer) {
        renderer.dispose();
      }
    };
  }, [sceneName]);

  return (
    <div className="relative w-full h-[60vh] min-h-[400px] bg-black/40 rounded-2xl border border-white/10 overflow-hidden group">
      {/* 3D Container */}
      <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Loading Overlay */}
      {loadingProgress && (
        <div className="absolute inset-0 bg-background/90 flex flex-col items-center justify-center gap-4 z-10">
          <div className="w-12 h-12 rounded-full border-4 border-indigo-500 border-t-transparent animate-spin"></div>
          <p className="text-foreground/80 font-medium text-sm animate-pulse">{loadingProgress}</p>
        </div>
      )}

      {/* Error Overlay */}
      {isError && (
        <div className="absolute inset-0 bg-background/95 flex flex-col items-center justify-center gap-2 z-10 p-6 text-center">
          <span className="text-4xl">⚠️</span>
          <h3 className="text-lg font-bold text-white mt-2">Failed to render scene</h3>
          <p className="text-foreground/60 text-sm max-w-xs">
            There was a problem loading the WebGL context. Please verify your graphics card supports WebGL.
          </p>
        </div>
      )}

      {/* Interactive Controls Overlay Hint */}
      {!loadingProgress && !isError && (
        <div className="absolute bottom-4 left-4 bg-black/75 border border-white/10 px-3 py-1.5 rounded-lg text-[10px] text-foreground/50 pointer-events-none transition-opacity duration-300 group-hover:opacity-100 opacity-0 uppercase tracking-widest font-bold">
          🖱️ Click & Drag to Orbit | Scroll to Zoom
        </div>
      )}

      {/* Fullscreen Close button if custom trigger */}
      {onClose && (
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 bg-black/60 border border-white/10 text-white hover:bg-white hover:text-black w-8 h-8 rounded-full flex items-center justify-center transition-colors cursor-pointer z-20"
        >
          ✕
        </button>
      )}
    </div>
  );
}
