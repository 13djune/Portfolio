import React, { useState, useEffect, useRef, useCallback } from 'react';
// --- ¡IMPORTANTE! Importaciones de Firebase para NPM ---
import { initializeApp } from "firebase/app";
import { getAuth, signInAnonymously, onAuthStateChanged } from "firebase/auth";
import { 
  getFirestore, setLogLevel, collection, 
  query, onSnapshot, addDoc 
} from "firebase/firestore";
import Gato from '../../assets/img/gatito.gif'; 

// --- Estilos Globales y Animaciones ---
const EstilosGlobales = () => (
  <style>{`
    @keyframes nadar-derecha {
      0% {
        transform: translateX(-150px) scaleX(1);
      }
      49.9% {
        transform: translateX(calc(100vw * 0.7 + 150px)) scaleX(1);
      }
      50% {
        transform: translateX(calc(100vw * 0.7 + 150px)) scaleX(-1);
      }
      99.9% {
        transform: translateX(-150px) scaleX(-1);
      }
      100% {
        transform: translateX(-150px) scaleX(1);
      }
    }
    
    @keyframes float-up {
      0% {
        transform: translateY(0);
        opacity: 0.8;
      }
      100% {
        transform: translateY(-200px);
        opacity: 0;
      }
    }
    
    /* Estilos para la paleta */
    .paleta-btn {
      cursor: pointer;
      transition: all 0.2s ease;
      border: 4px solid transparent;
      border-radius: 8px;
    }
    .paleta-btn:hover {
      transform: scale(1.1);
      border-color: var(--accent);
      background-color: rgba(255,255,255,0.2);
    }
    .paleta-btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
    
    /* Estilos para las pestañas de la paleta */
    .tab-btn {
      flex: 1;
      padding: 10px;
      font-weight: 600;
      border: 2px solid var(--hoveraccent);
      cursor: pointer;
      transition: all 0.2s ease;
      color: var(--text);
    }
    .tab-btn:first-child { border-radius: 8px 0 0 8px; }
    .tab-btn:last-child { border-radius: 0 8px 8px 0; }
    .tab-btn.active {
      background-color: #3fe2f7;
      color: var(--text);
      border-color: var(--hoveraccent);
    }
    
    /* Estilos para los botones del lienzo */
    .control-btn {
      padding: 6px 10px;
      font-size: 14px;
      border-radius: 6px;
      background-color: #f0f0f0;
      border: 1px solid #ddd;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 4px;
      font-weight: 500;
      transition: all 0.2s ease;
      
    }
    .control-btn:hover {
      background-color: #e0e0e0;
    }
    .control-btn:disabled {
      opacity: 0.5;
    }
    .add-btn {
      width: 100%;
      padding: 10px;
      font-weight: bold;
      background-color: #28a745;
      color: white;
      border-color: #218838;
      border-radius: 6px;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    .add-btn:hover {
      background-color: #218838;
    }
    .add-btn:disabled {
      background-color: #94d3a2;
      cursor: not-allowed;
    }
  `}</style>
);

// --- SVGs de Peces Pixel Art ---
const PezPixelRojo = () => (
  <svg width="40" height="32" viewBox="0 0 10 8" xmlns="http://www.w3.org/2000/svg" shapeRendering="crispEdges">
    <rect x="3" y="2" width="1" height="1" fill="#EF4444" /> <rect x="4" y="1" width="1" height="1" fill="#F87171" /> <rect x="5" y="1" width="1" height="1" fill="#F87171" /> <rect x="6" y="2" width="1" height="1" fill="#EF4444" /> <rect x="4" y="2" width="1" height="1" fill="#EF4444" /> <rect x="5" y="2" width="1" height="1" fill="#EF4444" /> <rect x="3" y="3" width="1" height="1" fill="#EF4444" /> <rect x="4" y="3" width="1" height="1" fill="#DC2626" /> <rect x="5" y="3" width="1" height="1" fill="#DC2626" /> <rect x="6" y="3" width="1" height="1" fill="#EF4444" /> <rect x="7" y="3" width="1" height="1" fill="#F87171" /> <rect x="2" y="4" width="1" height="1" fill="#F87171" /> <rect x="3" y="4" width="1" height="1" fill="#DC2626" /> <rect x="4" y="4" width="1" height="1" fill="#B91C1C" /> <rect x="5" y="4" width="1" height="1" fill="#B91C1C" /> <rect x="6" y="4" width="1" height="1" fill="#DC2626" /> <rect x="4" y="5" width="1" height="1" fill="#DC2626" /> <rect x="5" y="5" width="1" height="1" fill="#DC2626" /> <rect x="5" y="0" width="1" height="1" fill="#F87171" />
  </svg>
);
const PezPixelAzul = () => (
  <svg width="48" height="40" viewBox="0 0 12 10" xmlns="http://www.w3.org/2000/svg" shapeRendering="crispEdges">
    <rect x="2" y="4" width="1" height="1" fill="#60A5FA" /> <rect x="3" y="3" width="1" height="1" fill="#60A5FA" /> <rect x="4" y="3" width="1" height="1" fill="#3B82F6" /> <rect x="5" y="3" width="1" height="1" fill="#3B82F6" /> <rect x="6" y="3" width="1" height="1" fill="#3B82F6" /> <rect x="7" y="3" width="1" height="1" fill="#2563EB" /> <rect x="8" y="4" width="1" height="1" fill="#60A5FA" /> <rect x="3" y="4" width="1" height="1" fill="#3B82F6" /> <rect x="4" y="4" width="1" height="1" fill="#2563EB" /> <rect x="5" y="4" width="1" height="1" fill="#1D4ED8" /> <rect x="6" y="4" width="1" height="1" fill="#1D4ED8" /> <rect x="7" y="4" width="1" height="1" fill="#2563EB" /> <rect x="4" y="5" width="1" height="1" fill="#3B82F6" /> <rect x="5" y="5" width="1" height="1" fill="#2563EB" /> <rect x="6" y="5" width="1" height="1" fill="#2563EB" /> <rect x="7" y="5" width="1" height="1" fill="#3B82F6" /> <rect x="9" y="3" width="1" height="1" fill="#60A5FA" /> <rect x="9" y="5" width="1" height="1" fill="#60A5FA" /> <rect x="5" y="2" width="1" height="1" fill="#3B82F6" /> <rect x="6" y="2" width="1" height="1" fill="#3B82F6" /> <rect x="5" y="6" width="1" height="1" fill="#3B82F6" /> <rect x="6" y="6" width="1" height="1" fill="#3B82F6" />
  </svg>
);
const PezPixelVerde = () => (
  <svg width="40" height="40" viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg" shapeRendering="crispEdges">
    <rect x="3" y="2" width="1" height="1" fill="#4ADE80" /> <rect x="4" y="2" width="1" height="1" fill="#22C55E" /> <rect x="5" y="2" width="1" height="1" fill="#22C55E" /> <rect x="2" y="3" width="1" height="1" fill="#4ADE80" /> <rect x="3" y="3" width="1" height="1" fill="#22C55E" /> <rect x="4" y="3" width="1" height="1" fill="#16A34A" /> <rect x="5" y="3" width="1" height="1" fill="#16A34A" /> <rect x="6" y="3" width="1" height="1" fill="#22C55E" /> <rect x="7" y="3" width="1" height="1" fill="#4ADE80" /> <rect x="8" y="3" width="1" height="1" fill="#4ADE80" /> <rect x="3" y="4" width="1" height="1" fill="#22C55E" /> <rect x="4" y="4" width="1" height="1" fill="#15803D" /> <rect x="5" y="4" width="1" height="1" fill="#15803D" /> <rect x="6" y="4" width="1" height="1" fill="#16A34A" /> <rect x="2" y="5" width="1" height="1" fill="#4ADE80" /> <rect x="3" y="5" width="1" height="1" fill="#22C55E" /> <rect x="4" y="5" width="1" height="1" fill="#16A34A" /> <rect x="5" y="5" width="1" height="1" fill="#16A34A" /> <rect x="6" y="5" width="1" height="1" fill="#22C55E" /> <rect x="7" y="5" width="1" height="1" fill="#4ADE80" /> <rect x="3" y="6" width="1" height="1" fill="#4ADE80" /> <rect x="4" y="6" width="1" height="1" fill="#22C55E" /> <rect x="5" y="6" width="1" height="1" fill="#22C55E" /> <rect x="4" y="7" width="1" height="1" fill="#4ADE80" />
  </svg>
);
const TIPOS_DE_PEZ = {
  rojo: PezPixelRojo,
  azul: PezPixelAzul,
  verde: PezPixelVerde,
};

// --- SVGs de Decoración ---
const AlgaPixel = () => (
  <svg width="24" height="60" viewBox="0 0 6 15" xmlns="http://www.w3.org/2000/svg" shapeRendering="crispEdges">
    <rect x="3" y="0" width="1" height="1" fill="#16A34A" /> <rect x="2" y="1" width="1" height="1" fill="#16A34A" /> <rect x="3" y="1" width="1" height="1" fill="#15803D" /> <rect x="3" y="2" width="1" height="1" fill="#16A34A" /> <rect x="4" y="2" width="1" height="1" fill="#15803D" /> <rect x="3" y="3" width="1" height="1" fill="#16A34A" /> <rect x="2" y="4" width="1" height="1" fill="#16A34A" /> <rect x="3" y="4" width="1" height="1" fill="#15803D" /> <rect x="3" y="5" width="1" height="1" fill="#16A34A" /> <rect x="4" y="5" width="1" height="1" fill="#15803D" /> <rect x="3" y="6" width="1" height="1" fill="#16A34A" /> <rect x="2" y="7" width="1" height="1" fill="#16A34A" /> <rect x="3" y="7" width="1" height="1" fill="#15803D" /> <rect x="3" y="8" width="1" height="1" fill="#16A34A" /> <rect x="3" y="9" width="1" height="1" fill="#15803D" /> <rect x="2" y="10" width="1" height="1" fill="#16A34A" /> <rect x="3" y="10" width="1" height="1" fill="#16A34A" /> <rect x="3" y="11" width="1" height="1" fill="#15803D" /> <rect x="4" y="11" width="1" height="1" fill="#16A34A" /> <rect x="2" y="12" width="1" height="1" fill="#16A34A" /> <rect x="3" y="12" width="1" height="1" fill="#16A34A" /> <rect x="3" y="13" width="1" height="1" fill="#15803D" /> <rect x="2" y="14" width="1" height="1" fill="#16A34A" />
  </svg>
);
const BurbujaPixel = () => (
  <svg width="16" height="16" viewBox="0 0 4 4" xmlns="http://www.w3.org/2000/svg" shapeRendering="crispEdges">
    <rect x="1" y="0" width="2" height="1" fill="#BFDBFE" />
    <rect x="0" y="1" width="1" height="2" fill="#BFDBFE" />
    <rect x="3" y="1" width="1" height="2" fill="#BFDBFE" />
    <rect x="1" y="3" width="2" height="1" fill="#BFDBFE" />
    <rect x="1" y="1" width="2" height="2" fill="#DBEAFE" />
    <rect x="1" y="1" width="1" height="1" fill="#EFF6FF" />
  </svg>
);
const TIPOS_DE_DECOR = {
  alga: AlgaPixel,
  burbuja: BurbujaPixel,
};

// --- Componente Pez (Mejorado) ---
// Renderiza un SVG pre-hecho O una imagen de dataURL
function Pez({ pez }) {
  // FIX: 'id' no se usa, así que lo eliminamos de la desestructuración
  const { categoria, tipo, dataURL, y, velocidad, delay, tamano } = pez;
  
  const estiloAnimacion = {
    top: `${y}%`,
    animation: `nadar-derecha ${velocidad}s linear ${delay}s infinite`,
    width: `${tamano}px`,
  };

  const isDibujado = categoria === 'pez-dibujado';
  const PezComponent = TIPOS_DE_PEZ[tipo];

  return (
    <div className="absolute h-auto" style={estiloAnimacion}>
      {isDibujado ? (
        <img
          src={dataURL}
          alt="Pez dibujado"
          className="w-full h-auto drop-shadow-lg"
          style={{ imageRendering: 'pixelated' }}
        />
      ) : (
        <PezComponent />
      )}
    </div>
  );
}

// --- Componente Decoracion (NUEVO) ---
function Decoracion({ decor }) {
  // FIX: 'id' no se usa, así que lo eliminamos de la desestructuración
  const { tipo, x, y, duracion, delay } = decor;
  
  let estilo = {
    left: `${x}%`,
    zIndex: 0,
  };
  
  if (tipo === 'alga') {
    estilo.bottom = `${y}%`; // Se pega al fondo
  } else if (tipo === 'burbuja') {
    estilo.bottom = `${y}%`; // Empieza desde abajo
    estilo.animation = `float-up ${duracion}s linear ${delay}s infinite`;
  }
  
  const DecorComponent = TIPOS_DE_DECOR[tipo];
  if (!DecorComponent) return null;

  return (
    <div className="absolute" style={estilo}>
      <DecorComponent />
    </div>
  );
}

// --- Componente: Lienzo de Dibujo (Simplificado) ---
// Este es tu lienzo, ahora integrado en la paleta
function LienzoDibujo({ db, userId, collectionPath }) {
  const canvasRef = useRef(null);
  const [context, setContext] = useState(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawingSettings, setDrawingSettings] = useState({ color: '#EF4444', brushSize: 1 });
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const lastPixel = useRef(null); // Para el dibujo pixelado

  const canvasWidth = 240; // Múltiplo de 24 para la cuadrícula
  const canvasHeight = 240; // Múltiplo de 24 para la cuadrícula
  const GRID_SIZE = 24;
  const CELL_SIZE = canvasWidth / GRID_SIZE; // 10px

  // --- Funciones de Historial y Reset ---
  const saveToHistory = useCallback(() => {
    if (!context) return;
    const canvas = canvasRef.current;
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(imageData);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  }, [context, history, historyIndex]);

  const reset = useCallback(() => {
    if (!context) return;
    context.clearRect(0, 0, canvasWidth, canvasHeight);
    const initialImageData = context.getImageData(0, 0, canvasWidth, canvasHeight);
    setHistory([initialImageData]);
    setHistoryIndex(0);
  }, [context]);

  const undo = useCallback(() => {
    if (historyIndex > 0 && context && history[historyIndex - 1]) {
      const prevImageData = history[historyIndex - 1];
      // Limpiar antes de poner la imagen para evitar artefactos
      context.clearRect(0, 0, canvasWidth, canvasHeight);
      context.putImageData(prevImageData, 0, 0);
      setHistoryIndex(historyIndex - 1);
    }
  }, [context, history, historyIndex]);

  // --- Inicialización ---
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
      // --- FIX: Añadir { willReadFrequently: true } para la advertencia ---
      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      ctx.imageSmoothingEnabled = false;
      setContext(ctx);
      
      // Set initial state
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      const initialImageData = ctx.getImageData(0, 0, canvasWidth, canvasHeight);
      setHistory([initialImageData]);
      setHistoryIndex(0);
    }
  }, []);

  // --- Configuración del Contexto ---
  useEffect(() => {
    if (context) {
      // El color se aplicará en paintCell
    }
  }, [context, drawingSettings]);

  // --- Funciones de Dibujo (REHECHAS para Pixel Art) ---
  const getGridCoordinates = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const clientX = e.clientX || (e.touches && e.touches[0] ? e.touches[0].clientX : 0);
    const clientY = e.clientY || (e.touches && e.touches[0] ? e.touches[0].clientY : 0);
    const x = (clientX - rect.left) * (canvas.width / rect.width);
    const y = (clientY - rect.top) * (canvas.height / rect.height);
    
    // Convertir a coordenadas de la cuadrícula
    const gx = Math.floor(x / CELL_SIZE);
    const gy = Math.floor(y / CELL_SIZE);
    
    return { gx, gy };
  };
  
  const paintCell = (gx, gy) => {
    if (!context) return;
    const { color, brushSize } = drawingSettings;
    context.fillStyle = color;
    
    // Centrar el pincel si es más grande que 1
    const startX = (gx - Math.floor((brushSize - 1) / 2)) * CELL_SIZE;
    const startY = (gy - Math.floor((brushSize - 1) / 2)) * CELL_SIZE;
    const size = CELL_SIZE * brushSize;
    
    context.fillRect(startX, startY, size, size);
  };
  
  const startDrawing = (e) => {
    if (!context) return;
    const { gx, gy } = getGridCoordinates(e);
    setIsDrawing(true);
    paintCell(gx, gy);
    lastPixel.current = { gx, gy };
  };

  const draw = (e) => {
    if (!isDrawing || !context) return;
    const { gx, gy } = getGridCoordinates(e);
    
    // Dibujar solo si nos hemos movido a un nuevo píxel
    if (gx !== lastPixel.current?.gx || gy !== lastPixel.current?.gy) {
      paintCell(gx, gy);
      lastPixel.current = { gx, gy };
    }
  };

  const stopDrawing = () => {
    if (!context) return;
    setIsDrawing(false);
    lastPixel.current = null;
    saveToHistory();
  };

  // --- Añadir Pez Dibujado a Firebase ---
  const handleAddDibujo = async () => {
    if (!db || !userId || !collectionPath || !canvasRef.current) return;
    
    const dataURL = canvasRef.current.toDataURL();
    
    // --- CORRECCIÓN AQUÍ ---
    // El límite anterior (5000) era demasiado alto y bloqueaba dibujos pequeños.
    // Lo bajamos a 1000, que sigue siendo más grande que un lienzo vacío
    // pero permite que se añadan dibujos sencillos.
    if (dataURL.length < 1000) { // Evitar lienzos vacíos
      console.log("Lienzo vacío, no se añadirá.");
      return;
    }

    const nuevoPezDibujado = {
      categoria: 'pez-dibujado',
      dataURL: dataURL,
      y: Math.random() * 70 + 10,
      velocidad: Math.random() * 15 + 20,
      delay: -(Math.random() * 20),
      tamano: Math.random() * 50 + 100,
      createdAt: new Date().toISOString(),
      ownerId: userId
    };

    try {
      await addDoc(collection(db, collectionPath), nuevoPezDibujado);
      console.log("Pez dibujado añadido.");
      reset(); // Limpiar lienzo después de añadir
    } catch (e) {
      console.error("Error al añadir el pez dibujado: ", e);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <p className="text-sm text-text  text-center mb-2 font-semibold font-bit">
        Dibuja tu pez mirando a la DERECHA ➡️
      </p>
      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        onTouchStart={(e) => { e.preventDefault(); startDrawing(e.touches[0]); }}
        onTouchMove={(e) => { e.preventDefault(); draw(e.touches[0]); }}
        onTouchEnd={stopDrawing}
        className="pixelbutton3 border-2 border-blue-200 rounded-lg cursor-crosshair bg-background"
        style={{ imageRendering: 'pixelated' }}
      />
      <div className="flex flex-col gap-2 w-full">
        <div className="flex justify-between items-center w-full">
          <label className="font-semibold font-bit">Color:</label>
          <input
            type="color"
            value={drawingSettings.color}
            onChange={(e) => setDrawingSettings(p => ({ ...p, color: e.target.value }))}
            className="w-16 h-10 p-0 border-none rounded"
          />
        </div>
        <div className="flex justify-between items-center w-full">
          <label className="font-semibold font-bit">Pincel (px):</label>
          <input
            type="range"
            min="1"
            max="4"
            value={drawingSettings.brushSize}
            onChange={(e) => setDrawingSettings(p => ({ ...p, brushSize: Number(e.target.value) }))}
            className="flex-grow mx-2 font-bit"
          />
          <span className="w-6 text-right font-bit">{drawingSettings.brushSize}</span>
        </div>
      </div>
      <div className="flex justify-center gap-2 w-full">
        <button onClick={undo} className="control-btn text-text font-bit" disabled={historyIndex <= 0}>↩️ Deshacer</button>
        <button onClick={reset} className="control-btn text-text font-bit ">🗑️ Borrar</button>
      </div>
      <button 
        className="add-btn font-bit pixelbutton" 
        onClick={handleAddDibujo}
        disabled={!db || historyIndex <= 0}
      >
        Añadir Dibujo al Acuario
      </button>
    </div>
  );
}


// --- Componente: Pestaña de Peces Pre-hechos ---
function PaletaPeces({ db, userId, collectionPath }) {
  const añadirPez = async (tipoPez) => {
    if (!db || !userId || !collectionPath) return;
    const nuevoPez = {
      categoria: 'pez', // Categoría
      tipo: tipoPez,
      y: Math.random() * 70 + 10,
      velocidad: Math.random() * 15 + 25,
      delay: -(Math.random() * 25),
      tamano: Math.random() * 40 + 50,
      createdAt: new Date().toISOString(),
      ownerId: userId
    };
    try {
      await addDoc(collection(db, collectionPath), nuevoPez);
    } catch (e) {
      console.error("Error al añadir el pez: ", e);
    }
  };

  return (
    <div className="flex flex-col items-center gap-6 p-4">
      <p className="text-sm text-text  font-bit text-center">
        Haz clic en un pez para añadirlo.
      </p>
      {[
        { tipo: 'rojo', comp: <PezPixelRojo /> },
        { tipo: 'azul', comp: <PezPixelAzul /> },
        { tipo: 'verde', comp: <PezPixelVerde /> },
      ].map((pez) => (
        <button
          key={pez.tipo}
          onClick={() => añadirPez(pez.tipo)}
          disabled={!db}
          className="paleta-btn  font-bit  p-4 bg-background rounded-lg shadow-md"
        >
          {pez.comp}
        </button>
      ))}
    </div>
  );
}

// --- Componente: Pestaña de Decoración ---
function PaletaDecor({ db, userId, collectionPath }) {
  const añadirDecor = async (tipoDecor) => {
    if (!db || !userId || !collectionPath) return;
    
    let nuevoDecor = {
      categoria: 'decor',
      tipo: tipoDecor,
      x: Math.random() * 95, // Posición horizontal (0-95%)
      y: 0, // Posición vertical (se maneja en CSS)
      createdAt: new Date().toISOString(),
      ownerId: userId
    };
    
    if (tipoDecor === 'alga') {
      nuevoDecor.y = Math.random() * 10; // 0-10% desde el fondo
    } else if (tipoDecor === 'burbuja') {
      nuevoDecor.y = Math.random() * 15 + 5; // 5-20% desde el fondo
      nuevoDecor.duracion = Math.random() * 5 + 5; // 5-10s
      nuevoDecor.delay = Math.random() * 5; // 0-5s
    }

    try {
      await addDoc(collection(db, collectionPath), nuevoDecor);
    } catch (e) {
      console.error("Error al añadir decoración: ", e);
    }
  };

  return (
    <div className="flex flex-col items-center gap-6 p-4">
      <p className="text-sm text-text  font-bit text-center">
        Añade decoración al fondo.
      </p>
      <button 
        onClick={() => añadirDecor('alga')} 
        disabled={!db} 
        className="paleta-btn  font-bit p-4 bg-background rounded-lg shadow-md flex flex-col items-center gap-2"
      >
        <AlgaPixel />
        Añadir Alga
      </button>
      <button 
        onClick={() => añadirDecor('burbuja')} 
        disabled={!db} 
        className="paleta-btn  font-bit p-4 bg-background rounded-lg shadow-md flex flex-col items-center gap-2"
      >
        <BurbujaPixel />
        Añadir Burbuja
      </button>
    </div>
  );
}

// --- Componente Principal (AcuarioPixel2) ---
export default function AcuarioPixel2() {
  const [items, setItems] = useState([]); // ¡Ahora guarda todos los items!
  const [activeTab, setActiveTab] = useState('peces');
  
  // --- Estados de Firebase ---
  const [db, setDb] = useState(null);
  const [userId, setUserId] = useState(null);
  const [collectionPath, setCollectionPath] = useState('');

  // --- Inicialización de Firebase y Autenticación ---
  useEffect(() => {
    try {
      // --- ¡IMPORTANTE! AHORA LEE DESDE process.env ---
      // El código buscará tus claves en el archivo .env
      // Asegúrate de haber creado el archivo .env en la raíz de tu proyecto
      // y haber REINICIADO tu servidor.
      const firebaseConfig = {
        apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
        authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
        projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
        storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.REACT_APP_FIREBASE_APP_ID,
        measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
      };
      // --- FIN DE LA CONFIGURACIÓN ---
      
      // Si la config no está rellenada, no continuar.
      if (!firebaseConfig.apiKey) {
         console.warn("Configuración de Firebase no encontrada o inválida. Revisa tu archivo .env y REINICIA el servidor.");
         return; // No continuar si la config es incorrecta
      }

      const app = initializeApp(firebaseConfig); // Usar la config parseada
      const dbInstance = getFirestore(app);
      const auth = getAuth(app);
      
      setLogLevel('Debug');
      setDb(dbInstance);
      
      // Usar un appId de la config o uno por defecto
      const appId = firebaseConfig.appId || 'default-app-id';
      const path = `/artifacts/${appId}/public/data/acuario-v2`; 
      setCollectionPath(path);

      onAuthStateChanged(auth, async (user) => {
        if (user) {
          setUserId(user.uid);
        } else {
          try {
            // En un proyecto local, siempre usamos anónimo
            await signInAnonymously(auth);
          } catch (authError) {
            console.error("Error signing in:", authError);
          }
        }
      });
    } catch (e) {
      console.error("Error initializing Firebase:", e);
    }
  }, []); // El array de dependencias está vacío, se ejecuta solo una vez

  // --- Carga de Items desde Firestore ---
  useEffect(() => {
    if (!db || !collectionPath || !userId) return; 
    
    const q = query(collection(db, collectionPath));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const cargados = [];
      querySnapshot.forEach((doc) => {
        cargados.push({ id: doc.id, ...doc.data() });
      });
      cargados.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      setItems(cargados);
      console.log(`Cargados ${cargados.length} items de Firestore.`);
    }, (error) => {
      console.error("Error fetching items from Firestore:", error);
    });

    return () => unsubscribe();
  }, [db, userId, collectionPath]); 


  // --- Renderizado del Acuario y la Paleta ---
  return (
    <>
      <EstilosGlobales />
      <div className='flex flex-col items-center
'>

      
      <div className="w-[100%] canvas-header text-center flex flex-row justify-between items-end text-text px-24">
          <p className="text-lg mb-1 text-text">
            Si estás aburrido, prueba a dibujar algo para el acuario:
          </p>
          <img 
            src={Gato}
            alt="Cute cat in pixel art jumping" 
            className="responsive-img gato w-[5rem] object-contain"
          /> 
        </div>
      <div className="flex h-screen w-screen font-sans">
        {/* Sección del Acuario (70% del ancho) */}
        <div className="acuario w-[70%] h-full bg-gradient-to-b from-blue-400 to-blue-700 relative overflow-hidden rounded-full">
          <h1 className="absolute top-4 left-1/2 -translate-x-1/2 text-white/70 font-bold text-3xl drop-shadow-lg p-2 select-none z-20">
            Mi Acuario
          </h1>
          <div className="absolute bottom-0 left-0 w-full h-1/4 bg-gradient-to-t from-emerald-800/40 to-transparent z-10" />
          
          {/* Renderizado de Items */}
          {items.map((item) => {
            if (item.categoria === 'pez' || item.categoria === 'pez-dibujado') {
              return <Pez key={item.id} pez={item} />;
            }
            if (item.categoria === 'decor') {
              return <Decoracion key={item.id} decor={item} />;
            }
            return null;
          })}
          
          {/* Mensaje de carga */}
          {(!db || !userId) && (
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center z-50">
              <p className="text-white font-bit text-2xl font-bold">Conectando al acuario...</p>
            </div>
          )}
        </div>

        {/* Sección de la Paleta (30% del ancho) */}
        <div className="paleta-wrapper w-[30%] h-full bg-background  z-30  flex flex-col">
          <div className="p-4 border-b border-text">
            <h2 className="text-xl  font-bold text-text text-center">
              Herramientas
            </h2>
          </div>
          
          {/* Pestañas */}
          <div className="flex p-4">
            <button 
              className={`tab-btn ${activeTab === 'peces' ? 'active' : ''} font-bit bg-background`}
              onClick={() => setActiveTab('peces')}
            >
              Peces
            </button>
            <button 
              className={`tab-btn ${activeTab === 'decor' ? 'active' : ''} font-bit bg-background`}
              onClick={() => setActiveTab('decor')}
            >
              Decoración
            </button>
            <button 
              className={`tab-btn ${activeTab === 'dibujar' ? 'active' : ''} font-bit bg-background`}
              onClick={() => setActiveTab('dibujar')}
            >
              Dibujar
            </button>
          </div>
          
          {/* Contenido de la Pestaña */}
          <div className="flex-grow overflow-y-auto">
            {activeTab === 'peces' && (
              <PaletaPeces 
                db={db} userId={userId} collectionPath={collectionPath}
              />
            )}
            {activeTab === 'decor' && (
              <PaletaDecor 
                db={db} userId={userId} collectionPath={collectionPath}
              />
            )}
            {activeTab === 'dibujar' && (
              <LienzoDibujo 
                db={db} userId={userId} collectionPath={collectionPath}
              />
            )}
          </div>
        </div>
        
      </div>
        <div className='flex flex-row mt-4'>
            <p>Inspirado por: </p>
            <a href="https://annasgarden.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-text font-bit hover:underline">
              Annas Garden
            </a>
        </div>
      </div>
    </>
  );
}

