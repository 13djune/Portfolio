import React, { useState, useEffect, useRef, useCallback } from 'react';
import { initializeApp } from "firebase/app";
import { getAuth, signInAnonymously, onAuthStateChanged } from "firebase/auth";
import { 
  getFirestore, collection, 
  query, onSnapshot, addDoc, getDocs, deleteDoc, doc 
} from "firebase/firestore";
import Gato from '../../assets/img/gatito.gif'; 
import Tortuga from '../../assets/img/Tortuga.png'; 
import Goldfish from '../../assets/img/Goldfish.png';

// --- Estilos Globales (Slider vertical centrado) ---
const EstilosGlobales = () => (
  <style>{`
    @keyframes nadar-derecha {
      0% { transform: translateX(-150px) scaleX(1); }
      49.9% { transform: translateX(calc(100vw * 0.7 + 150px)) scaleX(1); }
      50% { transform: translateX(calc(100vw * 0.7 + 150px)) scaleX(-1); }
      99.9% { transform: translateX(-150px) scaleX(-1); }
      100% { transform: translateX(-150px) scaleX(1); }
    }
    
    @keyframes float-up {
      0% { transform: translateY(0) scale(1); opacity: 0.7; }
      40% { opacity: 0.7; }
      80% { opacity: 0; } 
      100% { transform: translateY(-600px) scale(1.2); opacity: 0; }
    }
    
    .tab-btn {
      flex: 1;
      padding: 10px;
      font-weight: 800;
      border: 2px solid var(--hover-accent);
      cursor: pointer;
      transition: all 0.2s ease;
      color: #6b7280;
      font-size: 1.2rem;
      white-space: nowrap;
      background-color: var(--background);
      letter-spacing: 0.5px;
      font-family: 'Bit', sans-serif;
    }
    .tab-btn:first-child { border-radius: 12px 0 0 12px; }
    .tab-btn:last-child { border-radius: 0 12px 12px 0; }
    .tab-btn.active {
      background-color: var(--hover-accent);
      border-color: var(--accent);
      color: var(--text);
      z-index: 10;
    }

    .paleta-btn {
      cursor: pointer;
      transition: all 0.2s ease;
      border: 4px solid transparent;
      border-radius: 16px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      box-shadow: 0 3px 6px var(--hover-accent);
    }
    .paleta-btn:hover {
      transform: scale(1.05);
      border-color: var(--accent);
      background-color: var(--background);
    }
    
    .control-btn {
      width: 56px;
      height: 56px;
      border-radius: 14px;
      background-color: var(--background);
      border: 2px solid var(--accent);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
      box-shadow: 0 4px 0 var(--hover-accent);
      transition: transform 0.1s;
    }
    .control-btn:active { transform: translateY(4px); box-shadow: none; }
    
    .add-btn {
      height: 56px;
      font-weight: 900;
      background-color: #22c55e;
      color: white;
      border: none;
      border-radius: 14px;
      cursor: pointer;
      font-size: 2.5rem;
      line-height: 1;
      box-shadow: 0 4px 0 #15803d;
      display: flex;
      align-items: center;
      justify-content: center;
      padding-bottom: 6px;
      flex-grow: 1;
      transition: transform 0.1s;
    }
    .add-btn:active { transform: translateY(4px); box-shadow: none; }
    .add-btn:disabled { background-color: #86efac; box-shadow: none; cursor: not-allowed; }

    .color-input-large {
      width: 56px;
      height: 56px;
      padding: 0;
      border: 4px solid white;
      border-radius: 14px;
      cursor: pointer;
      overflow: hidden;
      box-shadow: 0 3px 6px rgba(0,0,0,0.15);
    }
    .color-input-large::-webkit-color-swatch-wrapper { padding: 0; }
    .color-input-large::-webkit-color-swatch { border: none; border-radius: 10px; }
    
    .brush-size-slider {
      -webkit-appearance: none; width: 100%; height: 28px;
      background: #e5e7eb; border-radius: 14px; outline: none;
      writing-mode: unset; 
    }
    .brush-size-slider::-webkit-slider-thumb {
      -webkit-appearance: none; width: 36px; height: 36px;
      border-radius: 50%; background: #10b981; 
      box-shadow: 0 2px 4px rgba(0,0,0,0.2); border: 4px solid white; margin-top: -4px;
    }

    @media (min-width: 1024px) {
        .brush-size-slider {
            writing-mode: vertical-lr; 
            direction: rtl; 
            -webkit-appearance: none;
            width: 48px; 
            height: 100%; 
            padding: 0;
            background: transparent; 
            cursor: pointer;
        }
        
        .brush-size-slider::-webkit-slider-runnable-track {
            height: 100%;
            width: 8px;
            background: #cbd5e1;
            border-radius: 4px;
        }
        
        .brush-size-slider::-moz-range-track {
            height: 100%;
            width: 8px;
            background: #cbd5e1; 
            border-radius: 4px;
        }

        .brush-size-slider::-webkit-slider-thumb {
            -webkit-appearance: none; 
            width: 36px; 
            height: 36px;
            border-radius: 50%; 
            background: #10b981;
            box-shadow: 0 2px 4px rgba(0,0,0,0.2); 
            border: 4px solid white; 
            margin-left: -14px; 
            margin-right: -14px;
        }
        
        .brush-size-slider::-moz-range-thumb {
            width: 36px;
            height: 36px;
            border-radius: 50%;
            background: #10b981;
            box-shadow: 0 2px 4px rgba(0,0,0,0.2);
            border: 4px solid white;
        }
    }
  `}</style>
);

const PezPixelRojo = () => (<svg width="100%" height="100%" viewBox="0 0 10 8"><rect x="3" y="2" width="1" height="1" fill="#EF4444" /><rect x="4" y="1" width="1" height="1" fill="#F87171" /><rect x="5" y="1" width="1" height="1" fill="#F87171" /><rect x="6" y="2" width="1" height="1" fill="#EF4444" /><rect x="4" y="2" width="1" height="1" fill="#EF4444" /><rect x="5" y="2" width="1" height="1" fill="#EF4444" /><rect x="3" y="3" width="1" height="1" fill="#EF4444" /><rect x="4" y="3" width="1" height="1" fill="#DC2626" /><rect x="5" y="3" width="1" height="1" fill="#DC2626" /><rect x="6" y="3" width="1" height="1" fill="#EF4444" /><rect x="7" y="3" width="1" height="1" fill="#F87171" /><rect x="2" y="4" width="1" height="1" fill="#F87171" /><rect x="3" y="4" width="1" height="1" fill="#DC2626" /><rect x="4" y="4" width="1" height="1" fill="#B91C1C" /><rect x="5" y="4" width="1" height="1" fill="#B91C1C" /><rect x="6" y="4" width="1" height="1" fill="#DC2626" /><rect x="4" y="5" width="1" height="1" fill="#DC2626" /><rect x="5" y="5" width="1" height="1" fill="#DC2626" /><rect x="5" y="0" width="1" height="1" fill="#F87171" /></svg>);
const PezPixelAzul = () => (<svg width="100%" height="100%" viewBox="0 0 12 10"><rect x="2" y="4" width="1" height="1" fill="#60A5FA" /><rect x="3" y="3" width="1" height="1" fill="#60A5FA" /><rect x="4" y="3" width="1" height="1" fill="#3B82F6" /><rect x="5" y="3" width="1" height="1" fill="#3B82F6" /><rect x="6" y="3" width="1" height="1" fill="#3B82F6" /><rect x="7" y="3" width="1" height="1" fill="#2563EB" /><rect x="8" y="4" width="1" height="1" fill="#60A5FA" /><rect x="3" y="4" width="1" height="1" fill="#3B82F6" /><rect x="4" y="4" width="1" height="1" fill="#2563EB" /><rect x="5" y="4" width="1" height="1" fill="#1D4ED8" /><rect x="6" y="4" width="1" height="1" fill="#1D4ED8" /><rect x="7" y="4" width="1" height="1" fill="#2563EB" /><rect x="4" y="5" width="1" height="1" fill="#3B82F6" /><rect x="5" y="5" width="1" height="1" fill="#2563EB" /><rect x="6" y="5" width="1" height="1" fill="#2563EB" /><rect x="7" y="5" width="1" height="1" fill="#3B82F6" /><rect x="9" y="3" width="1" height="1" fill="#60A5FA" /><rect x="9" y="5" width="1" height="1" fill="#60A5FA" /><rect x="5" y="2" width="1" height="1" fill="#3B82F6" /><rect x="6" y="2" width="1" height="1" fill="#3B82F6" /><rect x="5" y="6" width="1" height="1" fill="#3B82F6" /><rect x="6" y="6" width="1" height="1" fill="#3B82F6" /></svg>);
const PezPixelVerde = () => (<svg width="100%" height="100%" viewBox="0 0 10 10"><rect x="3" y="2" width="1" height="1" fill="#4ADE80" /><rect x="4" y="2" width="1" height="1" fill="#22C55E" /><rect x="5" y="2" width="1" height="1" fill="#22C55E" /><rect x="2" y="3" width="1" height="1" fill="#4ADE80" /><rect x="3" y="3" width="1" height="1" fill="#22C55E" /><rect x="4" y="3" width="1" height="1" fill="#16A34A" /><rect x="5" y="3" width="1" height="1" fill="#16A34A" /><rect x="6" y="3" width="1" height="1" fill="#22C55E" /><rect x="7" y="3" width="1" height="1" fill="#4ADE80" /><rect x="8" y="3" width="1" height="1" fill="#4ADE80" /><rect x="3" y="4" width="1" height="1" fill="#22C55E" /><rect x="4" y="4" width="1" height="1" fill="#15803D" /><rect x="5" y="4" width="1" height="1" fill="#15803D" /><rect x="6" y="4" width="1" height="1" fill="#16A34A" /><rect x="2" y="5" width="1" height="1" fill="#4ADE80" /><rect x="3" y="5" width="1" height="1" fill="#22C55E" /><rect x="4" y="5" width="1" height="1" fill="#16A34A" /><rect x="5" y="5" width="1" height="1" fill="#16A34A" /><rect x="6" y="5" width="1" height="1" fill="#22C55E" /><rect x="7" y="5" width="1" height="1" fill="#4ADE80" /><rect x="3" y="6" width="1" height="1" fill="#4ADE80" /><rect x="4" y="6" width="1" height="1" fill="#22C55E" /><rect x="5" y="6" width="1" height="1" fill="#22C55E" /><rect x="4" y="7" width="1" height="1" fill="#4ADE80" /></svg>);
const TortugaPNG = () => (<img src={Tortuga} alt="Tortuga" className="w-full h-auto drop-shadow-lg" style={{ imageRendering: 'auto' }} />); 
const GoldfishPNG = () => (<img src={Goldfish} alt="Goldfish" className="w-full h-auto drop-shadow-lg" style={{ imageRendering: 'auto' }} />); 
const AlgaPixel = () => (<svg width="100%" height="100%" viewBox="0 0 6 15"><rect x="3" y="0" width="1" height="1" fill="#16A34A" /><rect x="2" y="1" width="1" height="1" fill="#16A34A" /><rect x="3" y="1" width="1" height="1" fill="#15803D" /><rect x="3" y="2" width="1" height="1" fill="#16A34A" /><rect x="4" y="2" width="1" height="1" fill="#15803D" /><rect x="3" y="3" width="1" height="1" fill="#16A34A" /><rect x="2" y="4" width="1" height="1" fill="#16A34A" /><rect x="3" y="4" width="1" height="1" fill="#15803D" /><rect x="3" y="5" width="1" height="1" fill="#16A34A" /><rect x="4" y="5" width="1" height="1" fill="#15803D" /><rect x="3" y="6" width="1" height="1" fill="#16A34A" /><rect x="2" y="7" width="1" height="1" fill="#16A34A" /><rect x="3" y="7" width="1" height="1" fill="#15803D" /><rect x="3" y="8" width="1" height="1" fill="#16A34A" /><rect x="3" y="9" width="1" height="1" fill="#15803D" /><rect x="2" y="10" width="1" height="1" fill="#16A34A" /><rect x="3" y="10" width="1" height="1" fill="#16A34A" /><rect x="3" y="11" width="1" height="1" fill="#15803D" /><rect x="4" y="11" width="1" height="1" fill="#16A34A" /><rect x="2" y="12" width="1" height="1" fill="#16A34A" /><rect x="3" y="12" width="1" height="1" fill="#16A34A" /><rect x="3" y="13" width="1" height="1" fill="#15803D" /><rect x="2" y="14" width="1" height="1" fill="#16A34A" /></svg>);
const BurbujaPixel = () => (<svg width="100%" height="100%" viewBox="0 0 4 4"><rect x="1" y="0" width="2" height="1" fill="#BFDBFE" /><rect x="0" y="1" width="1" height="2" fill="#BFDBFE" /><rect x="3" y="1" width="1" height="2" fill="#BFDBFE" /><rect x="1" y="3" width="2" height="1" fill="#BFDBFE" /><rect x="1" y="1" width="2" height="2" fill="#DBEAFE" /><rect x="1" y="1" width="1" height="1" fill="#EFF6FF" /></svg>);

// AÑADIDO 'tortuga' al diccionario de peces
const TIPOS_DE_PEZ = { rojo: PezPixelRojo, azul: PezPixelAzul, verde: PezPixelVerde, tortuga: TortugaPNG, goldfish: GoldfishPNG };
const TIPOS_DE_DECOR = { alga: AlgaPixel, burbuja: BurbujaPixel };

function Pez({ pez }) {
  const { categoria, tipo, dataURL, y, velocidad, delay, tamano } = pez;
  const estiloAnimacion = {
    top: `${y}%`,
    animation: `nadar-derecha ${tipo === 'tortuga' ? velocidad + 15 : velocidad}s linear ${delay}s infinite`,
    width: `${tamano}px`,
  };
  const PezComponent = TIPOS_DE_PEZ[tipo];
  return (
    <div className="absolute h-auto select-none pointer-events-none" style={estiloAnimacion}>
      {categoria === 'pez-dibujado' ? (
        <img src={dataURL} alt="Pez" className="w-full h-auto drop-shadow-lg" style={{ imageRendering: 'pixelated' }} />
      ) : (
        // Renderiza el componente SVG o el componente PNG
        <div className="w-full h-full"><PezComponent /></div>
      )}
    </div>
  );
}

function Decoracion({ decor }) {
  const { tipo, x, y, duracion, delay } = decor;
  let estilo = { left: `${x}%`, zIndex: 0 };
  if (tipo === 'alga') {
    estilo.bottom = `${y}%`; estilo.height = '60px'; estilo.width = '24px';
  } else if (tipo === 'burbuja') {
    estilo.bottom = `${y}%`;
    estilo.animation = `float-up ${duracion}s linear ${delay}s infinite`;
    estilo.height = '20px'; estilo.width = '20px';
  }
  const DecorComponent = TIPOS_DE_DECOR[tipo];
  return (<div className="absolute select-none pointer-events-none" style={estilo}><DecorComponent /></div>);
}

// --- COMPONENTE LIENZO  ---
function LienzoDibujo({ db, userId, collectionPath }) {
  const canvasRef = useRef(null);
  const [context, setContext] = useState(null);
  const [drawingSettings, setDrawingSettings] = useState({ color: '#EF4444', brushSize: 2 });
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const GRID_SIZE = 24;
  const canvasSize = 480; 
  const CELL_SIZE = canvasSize / GRID_SIZE;

  const saveToHistory = useCallback(() => {
    if (!context) return;
    const imageData = context.getImageData(0, 0, canvasSize, canvasSize);
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(imageData);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  }, [context, history, historyIndex, canvasSize]);

  const reset = useCallback(() => {
    if (!context) return;
    context.clearRect(0, 0, canvasSize, canvasSize);
    const initialImageData = context.getImageData(0, 0, canvasSize, canvasSize);
    setHistory([initialImageData]);
    setHistoryIndex(0);
  }, [context, canvasSize]);

  const undo = useCallback(() => {
    if (historyIndex > 0 && context && history[historyIndex - 1]) {
      const prevImageData = history[historyIndex - 1];
      context.clearRect(0, 0, canvasSize, canvasSize);
      context.putImageData(prevImageData, 0, 0);
      setHistoryIndex(historyIndex - 1);
    }
  }, [context, history, historyIndex, canvasSize]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = canvasSize;
      canvas.height = canvasSize;
      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      ctx.imageSmoothingEnabled = false;
      setContext(ctx);
      ctx.clearRect(0, 0, canvasSize, canvasSize);
      const initialImageData = ctx.getImageData(0, 0, canvasSize, canvasSize);
      setHistory([initialImageData]);
      setHistoryIndex(0);
    }
  }, [canvasSize]);

  const getGridCoordinates = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return { gx: 0, gy: 0 };
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const clientX = e.clientX || (e.touches && e.touches[0] ? e.touches[0].clientX : 0);
    const clientY = e.clientY || (e.touches && e.touches[0] ? e.touches[0].clientY : 0);
    const x = (clientX - rect.left) * scaleX;
    const y = (clientY - rect.top) * scaleY;
    const gx = Math.floor(x / CELL_SIZE);
    const gy = Math.floor(y / CELL_SIZE);
    return { gx, gy };
  };

  const paintCell = (gx, gy) => {
    if (!context) return;
    context.fillStyle = drawingSettings.color;
    const startX = (gx - Math.floor((drawingSettings.brushSize - 1) / 2)) * CELL_SIZE;
    const startY = (gy - Math.floor((drawingSettings.brushSize - 1) / 2)) * CELL_SIZE;
    const size = CELL_SIZE * drawingSettings.brushSize;
    context.fillRect(startX, startY, size, size);
  };

  const handleDraw = (e) => {
    if (e.buttons !== 1 && e.type === 'mousemove') return;
    const { gx, gy } = getGridCoordinates(e);
    paintCell(gx, gy);
  };

  const handleAddDibujo = async () => {
    if (!db || !userId || !collectionPath || !canvasRef.current) return;
    const dataURL = canvasRef.current.toDataURL();
    if (dataURL.length < 1000) return; 
    try {
      await addDoc(collection(db, collectionPath), {
        categoria: 'pez-dibujado', dataURL: dataURL,
        y: Math.random() * 70 + 10, velocidad: Math.random() * 15 + 20,
        delay: -(Math.random() * 20), tamano: Math.random() * 50 + 100,
        createdAt: new Date().toISOString(), ownerId: userId
      });
      reset();
    } catch (e) { console.error(e); }
  };

  return (
    <div className="flex flex-col lg:flex-row w-full h-full p-2 gap-2 items-center justify-between overflow-hidden min-h-0">
      
      <div className="flex-1 w-full h-full flex items-center justify-center bg-background rounded-xl border-2 border-dashed border-[#3fe2f754] relative min-h-0">
         <div className="relative aspect-square max-w-full max-h-full bg-background shadow-sm rounded-lg overflow-hidden">
            <canvas
              ref={canvasRef}
              onMouseDown={(e) => { handleDraw(e); saveToHistory(); }}
              onMouseMove={handleDraw}
              onMouseUp={saveToHistory}
              onTouchStart={(e) => { e.preventDefault(); handleDraw(e); }}
              onTouchMove={(e) => { e.preventDefault(); handleDraw(e); }}
              onTouchEnd={saveToHistory}
              className="w-full h-full cursor-crosshair touch-none block"
              style={{ imageRendering: 'pixelated' , border: '2px solid var( --secondary-hover)', borderRadius: '12px' }}
            />
            <div className="absolute top-2 left-0 w-full text-center pointer-events-none opacity-30">
               <span className="text-sm font-bold font-bit text-text tracking-widest">Dibuja tu propio pez mirando hacia la derecha →</span>
            </div>
         </div>
      </div>

      <div className="flex-none w-full lg:w-auto lg:h-full bg-background rounded-xl border border-[#3fe2f754] p-3 flex flex-col lg:flex-row gap-3 lg:gap-4 shadow-sm">
         
         <div className="flex flex-row lg:flex-col gap-3 w-full lg:w-auto flex-1 lg:flex-none">
             <input type="color" value={drawingSettings.color} 
                  onChange={(e) => setDrawingSettings(p => ({ ...p, color: e.target.value }))}
                  className="color-input-large shrink-0"
              />
             <div className="flex-1 lg:flex-none flex flex-row lg:flex-col items-center justify-center gap-1 lg:w-14 lg:bg-background lg:rounded-lg lg:border lg:border-hoveraccent lg:py-2  h-[75%]">
                 <span className="text-2xl font-black text-text font-bit leading-none shrink-0 lg:shrink">{drawingSettings.brushSize}</span>
                 <input type="range" min="1" max="4" value={drawingSettings.brushSize}
                      onChange={(e) => setDrawingSettings(p => ({ ...p, brushSize: Number(e.target.value) }))}
                      className="brush-size-slider lg:h-full"
                  />
             </div>
         </div>

         <div className="flex flex-row lg:flex-col gap-3 w-full lg:w-auto lg:justify-between lg:h-full">
             <div className="flex flex-row lg:flex-col gap-2 shrink-0 w-auto lg:w-full">
                 <button onClick={undo} disabled={historyIndex <= 0} className="control-btn text-text font-bit lg:w-full" title="Deshacer"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" id="Interface-Essential-Navigation-Left-Circle-2--Streamline-Pixel" className='fill-current' height="36" width="36">
  <desc>
    Interface Essential Navigation Left Circle 2 Streamline Icon: https://streamlinehq.com
  </desc>
  <title>interface-essential-navigation-left-circle-2</title>
  <g>
    <path d="M30.48 12.19H32v7.62h-1.52Z"  strokeWidth="1"></path>
    <path d="M28.95 19.81h1.53v3.05h-1.53Z"  strokeWidth="1"></path>
    <path d="M28.95 9.14h1.53v3.05h-1.53Z"  strokeWidth="1"></path>
    <path d="M27.43 22.86h1.52v3.04h-1.52Z"  strokeWidth="1"></path>
    <path d="M27.43 6.09h1.52v3.05h-1.52Z"  strokeWidth="1"></path>
    <path d="M25.9 25.9h1.53v1.53H25.9Z"  strokeWidth="1"></path>
    <path d="M25.9 4.57h1.53v1.52H25.9Z"  strokeWidth="1"></path>
    <path d="M22.86 27.43h3.04v1.52h-3.04Z"  strokeWidth="1"></path>
    <path d="m24.38 12.19 -1.52 0 0 -1.52 -9.15 0 0 -3.05 -1.52 0 0 1.52 -1.52 0 0 1.53 -1.53 0 0 1.52 -1.52 0 0 1.52 -1.53 0 0 1.53 1.53 0 0 1.52 1.52 0 0 1.53 1.53 0 0 1.52 1.52 0 0 1.52 1.52 0 0 -3.04 6.1 0 0 1.52 1.52 0 0 1.52 -1.52 0 0 1.53 -1.52 0 0 1.52 3.04 0 0 -1.52 3.05 0 0 -1.53 1.52 0 0 -7.62 -1.52 0 0 -1.52z"  strokeWidth="1"></path>
    <path d="M22.86 3.05h3.04v1.52h-3.04Z"  strokeWidth="1"></path>
    <path d="M19.81 28.95h3.05v1.53h-3.05Z"  strokeWidth="1"></path>
    <path d="M19.81 1.52h3.05v1.53h-3.05Z"  strokeWidth="1"></path>
    <path d="M12.19 30.48h7.62V32h-7.62Z"  strokeWidth="1"></path>
    <path d="M12.19 0h7.62v1.52h-7.62Z"  strokeWidth="1"></path>
    <path d="M9.14 28.95h3.05v1.53H9.14Z"  strokeWidth="1"></path>
    <path d="M9.14 1.52h3.05v1.53H9.14Z"  strokeWidth="1"></path>
    <path d="M6.09 27.43h3.05v1.52H6.09Z"  strokeWidth="1"></path>
    <path d="M6.09 3.05h3.05v1.52H6.09Z"  strokeWidth="1"></path>
    <path d="M4.57 25.9h1.52v1.53H4.57Z"  strokeWidth="1"></path>
    <path d="M4.57 4.57h1.52v1.52H4.57Z"  strokeWidth="1"></path>
    <path d="M3.05 22.86h1.52v3.04H3.05Z"  strokeWidth="1"></path>
    <path d="M3.05 6.09h1.52v3.05H3.05Z"  strokeWidth="1"></path>
    <path d="M1.52 19.81h1.53v3.05H1.52Z"  strokeWidth="1"></path>
    <path d="M1.52 9.14h1.53v3.05H1.52Z"  strokeWidth="1"></path>
    <path d="M0 12.19h1.52v7.62H0Z"  strokeWidth="1"></path>
  </g>
</svg></button>
                 <button onClick={reset} className="control-btn  lg:w-full" title="Borrar"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" id="Interface-Essential-Bin--Streamline-Pixel" className='fill-current' height="36" width="36">
  <desc>
    Interface Essential Bin Streamline Icon: https://streamlinehq.com
  </desc>
  <title>interface-essential-bin</title>
  <g>
    <path d="m25.905 8.38 0 16.76 1.53 0 0 -16.76 3.04 0 0 -1.52 -1.52 0 0 -1.53 -6.1 0 0 -3.05 -1.52 0 0 3.05 -10.67 0 0 -3.05 -1.52 0 0 3.05 -6.09 0 0 1.53 -1.53 0 0 1.52 3.05 0 0 16.76 1.52 0 0 -16.76 19.81 0z"  strokeWidth="1"></path>
    <path d="M24.385 25.14h1.52v4.57h-1.52Z"  strokeWidth="1"></path>
    <path d="M7.625 29.71h16.76v1.53H7.625Z"  strokeWidth="1"></path>
    <path d="M21.335 11.43h1.52v12.19h-1.52Z"  strokeWidth="1"></path>
    <path d="M19.815 23.62h1.52v3.04h-1.52Z"  strokeWidth="1"></path>
    <path d="M15.245 11.43h1.52v15.23h-1.52Z"  strokeWidth="1"></path>
    <path d="M10.665 0.76h10.67v1.52h-10.67Z"  strokeWidth="1"></path>
    <path d="M10.665 23.62h1.53v3.04h-1.53Z"  strokeWidth="1"></path>
    <path d="M9.145 11.43h1.52v12.19h-1.52Z"  strokeWidth="1"></path>
    <path d="M6.095 25.14h1.53v4.57h-1.53Z"  strokeWidth="1"></path>
  </g>
</svg></button>
             </div>
             <button 
                 onClick={handleAddDibujo} 
                 disabled={!db || historyIndex <= 0} 
                 className="add-btn flex-grow lg:w-full lg:flex-grow-0 lg:h-auto lg:py-4"
                 title="Añadir"
             >
                 +
             </button>
         </div>

      </div>
    </div>
  );
}

// --- Paletas definicion  ---
function PaletaPeces({ db, userId, collectionPath }) {
  const añadir = async (tipo) => {
    if (!db) return;
    const tamano = tipo === 'tortuga' ? Math.random() * 80 + 100 : Math.random() * 40 + 50; 

    await addDoc(collection(db, collectionPath), {
      categoria: 'pez', tipo, y: Math.random() * 70 + 10,
      velocidad: Math.random() * 15 + 25, delay: -(Math.random() * 25),
      tamano: tamano, createdAt: new Date().toISOString(), ownerId: userId
    });
  };
  return (
    <div className="flex flex-wrap content-center justify-center gap-6 w-full h-full overflow-y-auto p-4">
      {['rojo', 'azul', 'verde', 'tortuga', 'goldfish'].map((tipo) => (
        <button key={tipo} onClick={() => añadir(tipo)} className="paleta-btn w-36 h-36 bg-background">
          <div className="w-28 h-28">
            {tipo === 'rojo' && <PezPixelRojo/>} 
            {tipo === 'azul' && <PezPixelAzul/>} 
            {tipo === 'verde' && <PezPixelVerde/>}
            {tipo === 'tortuga' && <TortugaPNG/>} 
            {tipo === 'goldfish' && <GoldfishPNG/>}
          </div>
        </button>
      ))}
    </div>
  );
}

function PaletaDecor({ db, userId, collectionPath }) {
  const añadir = async (tipo) => {
    if (!db) return;
    let data = { categoria: 'decor', tipo, x: Math.random() * 95, y: 0, createdAt: new Date().toISOString(), ownerId: userId };
    if (tipo === 'alga') data.y = Math.random() * 10;
    else if (tipo === 'burbuja') { data.y = Math.random() * 15 + 5; data.duracion = Math.random() * 5 + 5; data.delay = Math.random() * 5; }
    await addDoc(collection(db, collectionPath), data);
  };
  return (
    <div className="flex flex-wrap content-center justify-center gap-6 w-full h-full overflow-y-auto p-4">
       <button onClick={() => añadir('alga')} className="paleta-btn w-36 h-44 bg-background">
         <div className="w-14 h-28"><AlgaPixel /></div><span className="text-base font-bit text-xl mt-2 text-green-700">ALGA</span>
       </button>
       <button onClick={() => añadir('burbuja')} className="paleta-btn w-36 h-44 bg-background">
         <div className="w-20 h-20 mb-2"><BurbujaPixel /></div><span className="text-base font-bit text-xl text-blue-400">BURBUJA</span>
       </button>
    </div>
  );
}

// --- APP PRINCIPAL ---
export default function AcuarioPixel2() {
  const [items, setItems] = useState([]);
  const [activeTab, setActiveTab] = useState('peces');
  const [db, setDb] = useState(null);
  const [userId, setUserId] = useState(null);
  const [collectionPath, setCollectionPath] = useState('');

  useEffect(() => {
    try {
      const firebaseConfig = {
        apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
        authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
        projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
        storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.REACT_APP_FIREBASE_APP_ID,
        measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
      };
      if (!firebaseConfig.apiKey) return;
      const app = initializeApp(firebaseConfig);
      const dbInstance = getFirestore(app);
      const auth = getAuth(app);
      setDb(dbInstance);
      const appIdValue = firebaseConfig.appId || 'default-app-id'; 
      setCollectionPath(`/artifacts/${appIdValue}/public/data/acuario-v2`);
      onAuthStateChanged(auth, async (u) => {
        if (u) setUserId(u.uid);
        else await signInAnonymously(auth).catch(console.error);
      });
    } catch (e) { console.error(e); }
  }, []);

  useEffect(() => {
    if (!db || !collectionPath) return;
    const unsub = onSnapshot(query(collection(db, collectionPath)), (snap) => {
      const loaded = [];
      snap.forEach(d => loaded.push({ id: d.id, ...d.data() }));
      loaded.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      setItems(loaded);
    });
    return () => unsub();
  }, [db, collectionPath]);

  
 // --- LÓGICA DE LIMPIEZA GRATUITA (CLIENTE) ---
 const limpiarElementosAntiguos = useCallback(async () => {
  if (!db || !collectionPath) return;

  // Frecuencia de limpieza: 7 días (1 semana)
  const cleanIntervalMs = 7 * 24 * 60 * 60 * 1000; 
  
  // Clave de almacenamiento local para rastrear la última ejecución
  const lastCleanKey = 'lastClean_Weekly'; 
  const ultimaLimpieza = localStorage.getItem(lastCleanKey);
  const haceLimiteTiempo = new Date(Date.now() - cleanIntervalMs);

  // Si la última limpieza fue hace menos de 7 días, no hagas nada.
  if (ultimaLimpieza && new Date(ultimaLimpieza) > haceLimiteTiempo) {
      console.log("Limpieza semanal ya realizada.");
      return;
  }

  try {
      console.log("Ejecutando limpieza semanal...");
      
      // Grupos de elementos a limpiar y el mínimo que deben quedar.
      const targets = [
          // Peces: Borrar totalmente (minToKeep: 0)
          { categoria: 'pez', tipos: ['rojo', 'azul', 'verde', 'tortuga', 'goldfish'], minToKeep: 2, sortField: 'createdAt' }, 
          // Decoración: Borrar hasta que queden 10 de cada uno.
          { categoria: 'decor', tipos: ['burbuja'], minToKeep: 10, sortField: 'createdAt' },
          { categoria: 'decor', tipos: ['alga'], minToKeep: 10, sortField: 'createdAt' },
      ];
      
      let totalDeleted = 0;

      // 1. OBTENEMOS TODOS LOS ELEMENTOS DE LA COLECCIÓN
      const qAll = query(collection(db, collectionPath));
      const snapshot = await getDocs(qAll);
      const allItems = snapshot.docs.map(doc => ({ id: doc.id, data: doc.data() }));

      // 2. PROCESAMOS CADA GRUPO
      for (const target of targets) {
          
          // Filtramos en JAVASCRIPT: solo elementos que coinciden con la categoría y el tipo.
          const filteredItems = allItems.filter(item => 
              item.data.categoria === target.categoria && target.tipos.includes(item.data.tipo)
          );
          
          if (filteredItems.length === 0) continue;

          // Ordenar por antigüedad (los más recientes al inicio, para no borrarlos)
          filteredItems.sort((a, b) => new Date(b.data.createdAt) - new Date(a.data.createdAt)); 
          
          // 3. CALCULAR CUÁNTOS BORRAR
          const countToRemove = Math.max(0, filteredItems.length - target.minToKeep);
          
          if (countToRemove > 0) {
              // Borramos los más antiguos (los que están después del índice 'minToKeep')
              const docsToDeletion = filteredItems.slice(target.minToKeep); 
              
              // 4. BORRADO SEGURO
              await Promise.all(docsToDeletion.map(docToDelete => {
                  // Construye la referencia segura del documento
                  const docRef = doc(db, collectionPath, docToDelete.id);
                  return deleteDoc(docRef);
              }));
              
              totalDeleted += docsToDeletion.length;
              
              const name = target.tipos.join(', ');
              console.log(`[Limpieza] Borrados ${docsToDeletion.length} elementos de tipo: ${name} (Mínimo a mantener: ${target.minToKeep})`);
          }
      }

      if (totalDeleted > 0) {
          console.log(`Limpieza semanal terminada. Total borrados: ${totalDeleted}`);
      } else {
          console.log("Limpieza semanal terminada. No se encontraron elementos que excedieran el límite mínimo.");
      }
      
      // 5. Marca la nueva fecha de limpieza para esperar 7 días.
      localStorage.setItem(lastCleanKey, new Date().toISOString());

  } catch (error) {
      console.error("Error al limpiar elementos. Por favor, verifica la ruta de colección y permisos.", error);
  }
}, [db, collectionPath]);

// 5. useEffect para disparar la limpieza al cargar la app
useEffect(() => {
    // Ejecuta la función si la base de datos está inicializada
    if (db && collectionPath) {
        limpiarElementosAntiguos();
    }
}, [db, collectionPath, limpiarElementosAntiguos]);
// --- FIN DE LA LÓGICA DE LIMPIEZA ---
  
  return (
    <>
      <EstilosGlobales />
      <div className='flex flex-col w-full h-[130dvh] overflow-hidden bg-background font-sans pb-safe lg:p-[3rem] p-[1rem]'>
        
        {/* Header Flotante: Z-50 para visibilidad */}
        <div className="relative top-0 left-0 w-full h-16 flex items-end justify-between px-4 z-50">
           <div className="font-black text-white flex items-center gap-2 drop-shadow-md">
              <span className="hidden sm:inline text-xl font-bold font-bit text-text">Si te aburres, colabora en el acuario:</span>
           </div>
           <img src={Gato} alt="Gato" className="h-16 w-auto object-contain opacity-90 drop-shadow-md" />
        </div>

        {/* ACUARIO: AQUÍ CAMBIAMOS ALTURAS. Móvil 30% / Desktop 60% */}
        <div className="relative h-[45%] lg:h-[60%] w-full bg-gradient-to-b from-cyan-200 via-cyan-300 to-blue-500 overflow-hidden z-10 rounded-t-3xl">
             <div className="absolute inset-0 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
             {items.map(item => (
               (item.categoria === 'pez' || item.categoria === 'pez-dibujado') 
               ? <Pez key={item.id} pez={item} /> 
               : <Decoracion key={item.id} decor={item} />
             ))}
             <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-white/40 to-transparent pointer-events-none"></div>
        </div>

        {/* PANEL: AQUÍ CAMBIAMOS ALTURAS. Móvil 70% / Desktop 40% */}
        <div className="h-[55%] lg:h-[40%] w-full bg-background flex flex-col  z-20 rounded-t-3xl border-t border-white/50 -mt-6">
            
            {/* Pestañas */}
            <div className="flex flex-shrink-0 w-full px-2 pt-3 pb-1 bg-transparent gap-2 justify-center">
              <button onClick={() => setActiveTab('peces')} className={`tab-btn rounded-xl border-0 shadow-sm ${activeTab==='peces'?'active ring-2 ring-hoveraccent':''}`}>PECES</button>
              <button onClick={() => setActiveTab('decor')} className={`tab-btn rounded-xl border-0 shadow-sm ${activeTab==='decor'?'active ring-2 ring-hoveraccent':''}`}>DECORACIÓN</button>
              <button onClick={() => setActiveTab('dibujar')} className={`tab-btn rounded-xl border-0 shadow-sm ${activeTab==='dibujar'?'active ring-2 ring-hoveraccent':''}`}>DIBUJAR</button>
            </div>

            {/* Contenido */}
            <div className="flex-1 w-full relative overflow-hidden bg-transparent p-1">
               {activeTab === 'peces' && <PaletaPeces db={db} userId={userId} collectionPath={collectionPath} />}
               {activeTab === 'decor' && <PaletaDecor db={db} userId={userId} collectionPath={collectionPath} />}
               {activeTab === 'dibujar' && <LienzoDibujo db={db} userId={userId} collectionPath={collectionPath} />}
            </div>
        </div>

      </div>
      <div className='flex flex-row mt-4'>
            <p>Inspirado por: </p>
            <a href="https://annasgarden.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-text font-bit hover:underline hover:text-accent px-2">
               Anna's Garden ❀
            </a>
        </div>
    </>
  );
}