import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Icon } from '@iconify/react';
// Asegúrate de que esta ruta sea correcta
import Gato from '../../assets/img/gatito.gif'; 

// Color de fondo por defecto
const LIGHT_BG = '#f7fdfb';
const DARK_BG = '#05140f'; 

const INITIAL_DRAWING_SETTINGS = {
  color: '#9e99f8', // Color de trazo
  lineWidth: 5,
  lineCap: 'round',
  lineJoin: 'round',
  strokeType: 'dash', // 'dash', 'line', 'circle'
  fillShape: false,
  eraser: false, // Estado de la goma
};

const DrawingCanvas = () => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [context, setContext] = useState(null);
  const [canvasSize, setCanvasSize] = useState({ width: 800, height: 400 });

  const getBackgroundColorBasedOnMode = useCallback(() => {
    const isDark = document.documentElement.classList.contains('dark') || 
                   localStorage.getItem('theme') === 'dark';
    return isDark ? DARK_BG : LIGHT_BG;
  }, []);

  const [drawingSettings, setDrawingSettings] = useState(() => ({
    ...INITIAL_DRAWING_SETTINGS,
    backgroundColor: getBackgroundColorBasedOnMode()
  }));
  
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isLocked, setIsLocked] = useState(false); 
  
  const [startPoint, setStartPoint] = useState(null); 
  const [initialImageData, setInitialImageData] = useState(null); 

  // --- Inicialización y Configuración del Contexto
  
  const applyContextSettings = useCallback((ctx, settings) => {
    if (!ctx) return;
    
    ctx.strokeStyle = settings.color; 
    ctx.lineWidth = settings.lineWidth;
    ctx.lineCap = settings.lineCap;
    ctx.lineJoin = settings.lineJoin;
    ctx.fillStyle = settings.color; 
    
    ctx.globalCompositeOperation = settings.eraser ? 'destination-out' : 'source-over'; 
  }, []);
  
  // Función CRUCIAL: Dibuja el fondo sin afectar el dibujo
  const drawBackground = useCallback((ctx, newBg) => {
    const canvas = canvasRef.current;
    if (ctx && canvas) {
      const currentCompositeOperation = ctx.globalCompositeOperation;
      
      // Mantiene los píxeles existentes y pinta por debajo
      ctx.globalCompositeOperation = 'destination-over';
      ctx.fillStyle = newBg;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Restaura el modo de dibujo que estaba activo
      ctx.globalCompositeOperation = currentCompositeOperation;
    }
  }, []); 

  // --- Funciones de Historial y Reset

  const saveToHistory = useCallback(() => {
    const canvas = canvasRef.current;
    if (!context || !canvas || isLocked) return; 
    
    const newHistory = history.slice(0, historyIndex + 1);
    const currentImageData = context.getImageData(0, 0, canvas.width, canvas.height);
    
    // Evita guardar si no hay cambios (opcional, pero útil)
    if (newHistory.length > 0) {
        const lastData = newHistory[newHistory.length - 1].data;
        let isSame = true;
        for (let i = 0; i < lastData.length; i++) {
            if (lastData[i] !== currentImageData.data[i]) {
                isSame = false;
                break;
            }
        }
        if (isSame) return;
    }

    newHistory.push(currentImageData);
    
    const maxHistory = 50;
    if (newHistory.length > maxHistory) {
        newHistory.shift(); 
    }

    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  }, [context, history, historyIndex, isLocked]); 

  // CORRECCIÓN: Acepta el color de fondo como argumento
  const restoreFromHistory = useCallback((index, bgColor) => {
    const canvas = canvasRef.current;
    if (context && history[index] && canvas) {
      context.globalCompositeOperation = 'source-over'; 
      context.putImageData(history[index], 0, 0);
      setHistoryIndex(index);
      applyContextSettings(context, drawingSettings); 
      
      // Repinta el fondo con el color pasado como argumento
      drawBackground(context, bgColor); 
    }
  }, [context, history, drawingSettings, applyContextSettings, drawBackground]); 
  
  // Modificación: Pasa el color actual
  const undo = useCallback(() => {
    if (historyIndex > 0) {
      restoreFromHistory(historyIndex - 1, drawingSettings.backgroundColor);
    }
  }, [historyIndex, restoreFromHistory, drawingSettings.backgroundColor]);

  // Modificación: Pasa el color actual
  const redo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      restoreFromHistory(historyIndex + 1, drawingSettings.backgroundColor);
    }
  }, [historyIndex, history.length, restoreFromHistory, drawingSettings.backgroundColor]);


  // CORRECCIÓN en Reset para garantizar que el nuevo fondo se guarde
  const reset = useCallback((newBg = drawingSettings.backgroundColor) => {
    const canvas = canvasRef.current;
    if (context && canvas) {
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.fillStyle = newBg;
      context.fillRect(0, 0, canvas.width, canvas.height);
      
      const initialImageData = context.getImageData(0, 0, canvas.width, canvas.height);
      setHistory([initialImageData]);
      setHistoryIndex(0);
      
      setStartPoint(null); 
      setInitialImageData(null); 
      
      if (drawingSettings.backgroundColor !== newBg) {
          setDrawingSettings(prev => ({ ...prev, backgroundColor: newBg }));
      }
    }
  }, [context, drawingSettings.backgroundColor]); 

  // --- Inicialización
  
  // CORRECCIÓN CRÍTICA AQUÍ
  const initializeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const currentBg = getBackgroundColorBasedOnMode(); // Obtener el fondo real del tema
      
      if (canvas.width !== canvasSize.width || canvas.height !== canvasSize.height) {
          // Si el tamaño cambia, ajustamos
          canvas.width = canvasSize.width;
          canvas.height = canvasSize.height;
      }

      const ctx = canvas.getContext('2d');
      setContext(ctx); 
      
      applyContextSettings(ctx, drawingSettings);
      
      // Lógica de inicialización: si no hay historial o el tamaño cambió
      if (history.length === 0 || 
          (history[0] && (canvas.width !== history[0].width || canvas.height !== history[0].height)) ||
          !history[0]) {
        // Ejecutamos un reset usando el color actual del tema, forzando la sincronización
        reset(currentBg); 
      } else {
         // Si hay historial, restauramos y usamos el color de fondo ACTUAL del tema/estado.
         restoreFromHistory(historyIndex, drawingSettings.backgroundColor); 
      }
      
      // Aseguramos que el estado de React refleje el color de fondo del tema en la inicialización
      if (drawingSettings.backgroundColor !== currentBg) {
           setDrawingSettings(prev => ({ ...prev, backgroundColor: currentBg }));
      }
    }
  }, [canvasSize, drawingSettings, history, historyIndex, restoreFromHistory, applyContextSettings, reset, getBackgroundColorBasedOnMode]); 
  
  // --- Lógica de Efectos
  
  // FUNCIÓN CENTRAL PARA CAMBIAR EL FONDO Y ACTUALIZAR EL HISTORIAL
  // NOTA: Eliminamos drawingSettings.backgroundColor de las dependencias para evitar stale closures
  const changeCanvasBackground = useCallback((newBg) => {
    if (context && canvasRef.current) {
        setDrawingSettings(prev => {
            const currentBg = prev.backgroundColor;
            
            // 1. Si el color ya es el nuevo, no hacemos nada en el contexto.
            if (currentBg === newBg) return prev; 
            
            // 2. Restauramos el dibujo (con el color de fondo actual/viejo)
            restoreFromHistory(historyIndex, currentBg); 
            
            // 3. Pintamos el NUEVO fondo por debajo
            drawBackground(context, newBg);
            
            // 4. Guardamos el nuevo estado del canvas (dibujo + nuevo fondo) en la historia
            saveToHistory();
            
            // 5. Devolvemos el nuevo estado para React
            return { ...prev, backgroundColor: newBg };
        });
    } else {
        // Si el canvas no está inicializado, solo actualizamos el estado de React
        setDrawingSettings(prev => ({ ...prev, backgroundColor: newBg }));
    }

  }, [context, historyIndex, restoreFromHistory, drawBackground, saveToHistory]);
  
  // CORRECCIÓN CRÍTICA: EFECTO PARA SINCRONIZAR EL FONDO CON EL MODO OSCURO
  useEffect(() => { 
    const html = document.documentElement;
    const handleModeChange = () => {
      const newBg = getBackgroundColorBasedOnMode();
      
      // Llama a la función central que maneja el cambio de estado y el canvas
      changeCanvasBackground(newBg);
    };
    
    // MutationObserver para detectar cambios en la clase 'dark' del <html>
    const observer = new MutationObserver(handleModeChange);
    observer.observe(html, { attributes: true, attributeFilter: ['class'] });
    
    // Ejecuta al inicio por si el tema ya está establecido (redundante, pero seguro)
    // NOTA: initializeCanvas ya lo maneja al inicio, pero esto asegura la sincronización rápida.
    // handleModeChange(); 

    return () => observer.disconnect();
    // Dependencias ajustadas para evitar stale closures en drawingSettings.backgroundColor
  }, [getBackgroundColorBasedOnMode, changeCanvasBackground]); 
  
  // ... (El resto del código es el mismo)
  
  useEffect(() => { 
    const handleResize = () => {
      setCanvasSize(prevSize => { 
          const newWidth = Math.min(window.innerWidth * 0.9, 1200);
          const newHeight = Math.min(window.innerHeight * 0.7, 800);
          if (Math.abs(prevSize.width - newWidth) > 5 || Math.abs(prevSize.height - newHeight) > 5) {
              return { width: newWidth, height: newHeight };
          }
          return prevSize;
      });
    };
    handleResize(); 
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []); 
  
  useEffect(() => { initializeCanvas(); }, [canvasSize, initializeCanvas]);
  useEffect(() => { 
    if (context) {
      applyContextSettings(context, drawingSettings);
    }
  }, [context, drawingSettings, applyContextSettings]);

  // --- Funciones de Dibujo (sin cambios relevantes)
  
  const getCoordinates = useCallback((e) => { 
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const clientX = e.clientX || (e.touches && e.touches[0] ? e.touches[0].clientX : 0);
    const clientY = e.clientY || (e.touches && e.touches[0] ? e.touches[0].clientY : 0);
    
    const x = (clientX - rect.left) * (canvas.width / rect.width); 
    const y = (clientY - rect.top) * (canvas.height / rect.height);
    
    return { x, y }; 
  }, []); 

  const drawShape = useCallback((startX, startY, endX, endY, type) => {
    if (!context || !initialImageData) return;

    context.putImageData(initialImageData, 0, 0);
    context.beginPath();

    if (type === 'line') {
      context.moveTo(startX, startY);
      context.lineTo(endX, endY);
      context.stroke();
    } else if (type === 'circle') {
      const radius = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));
      context.arc(startX, startY, radius, 0, 2 * Math.PI);
      
      if (drawingSettings.fillShape) {
        context.fill(); 
      }
      context.stroke();
    }
    context.closePath();

  }, [context, initialImageData, drawingSettings.fillShape]);

  const startDrawing = useCallback((e) => { 
    if (isLocked || !context) return;
    const { x, y } = getCoordinates(e);
    setIsDrawing(true); 

    if (drawingSettings.strokeType !== 'dash') {
      const canvas = canvasRef.current;
      setInitialImageData(context.getImageData(0, 0, canvas.width, canvas.height));
      setStartPoint({ x, y });
    } else { 
      context.beginPath();
      context.moveTo(x, y);
    }
  }, [isLocked, context, getCoordinates, drawingSettings.strokeType]); 

  const draw = useCallback((e) => { 
    if (!isDrawing || isLocked || !context) return;
    const { x, y } = getCoordinates(e);

    if (drawingSettings.strokeType === 'dash') {
      context.lineTo(x, y);
      context.stroke();
    } else if (startPoint && initialImageData) {
      drawShape(startPoint.x, startPoint.y, x, y, drawingSettings.strokeType);
    }
  }, [isDrawing, isLocked, context, getCoordinates, drawingSettings.strokeType, startPoint, initialImageData, drawShape]); 

  const stopDrawing = useCallback((e) => { 
    if (isDrawing && context) {
      if (drawingSettings.strokeType === 'dash') {
        context.closePath();
      } else if (startPoint) {
        const { x, y } = getCoordinates(e);
        drawShape(startPoint.x, startPoint.y, x, y, drawingSettings.strokeType);
        
        setStartPoint(null);
        setInitialImageData(null);
      }
      
      setIsDrawing(false); 
      saveToHistory(); 
    }
  }, [isDrawing, context, drawingSettings.strokeType, saveToHistory, startPoint, getCoordinates, drawShape]); 

  // --- Funciones de Utilidad
  
  const handleSettingChange = (key, value) => {
    setDrawingSettings(prev => ({ ...prev, [key]: value }));
  };
  
  const toggleEraser = () => {
      setDrawingSettings(prev => {
          return { ...prev, eraser: !prev.eraser, fillShape: !prev.eraser ? false : prev.fillShape };
      });
  };
  
  // CORRECCIÓN FINAL PARA EL SELECTOR DE COLOR
  const handleBackgroundChange = (e) => {
      const newBg = e.target.value;
      if (newBg !== drawingSettings.backgroundColor) {
        changeCanvasBackground(newBg);
      }
  };
  
  const handleFillShapeChange = (value) => {
      if (drawingSettings.eraser) {
          handleSettingChange('fillShape', false);
      } else {
          handleSettingChange('fillShape', value);
      }
  };


  // --- Renderizado

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      
      <div className="font-bit"> 
        {/* Encabezado sin cambios */}
        <div className="canvas-header text-center flex flex-row justify-between items-end text-[#282a36] dark:text-[#a0a0a0]">
          <p className="text-lg mb-1 text-text">
            Si estás aburrido, prueba a dibujar algo:
          </p>
          <img 
            src={Gato}
            alt="Cute cat in pixel art jumping" 
            className="responsive-img gato w-[5rem] object-contain"
          /> 
        </div>

        {/* Canvas */}
        <canvas
          ref={canvasRef}
          width={canvasSize.width} 
          height={canvasSize.height} 
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={(e) => { e.preventDefault(); startDrawing(e); }}
          onTouchMove={(e) => { e.preventDefault(); draw(e); }}
          onTouchEnd={stopDrawing}
          className="border border-[#cdf8e8] dark:border-[#384242] rounded-lg cursor-crosshair w-full h-auto"
          style={{ backgroundColor: drawingSettings.backgroundColor }} 
        />

        {/* Controles */}
        <div className="controls mt-6 space-y-4">
        
          {/* Fila 1: Acciones */}
          <div className="button-container flex flex-wrap gap-2 justify-center">
            <button 
              className={`control-btn ${isLocked ? 'active-setting' : ''}`}
              onClick={() => setIsLocked(prev => !prev)} 
              disabled={!context}
            >
              <Icon icon={isLocked ? "pixelarticons:lock-open" : "pixelarticons:lock"} className="text-lg" />
              {isLocked ? 'Desbloquear' : 'Bloquear'}
            </button>
            
            <button className="control-btn" onClick={undo} disabled={historyIndex <= 0}>
              <Icon icon="pixelarticons:undo" className="text-lg" /> Deshacer
            </button>
            
            <button className="control-btn" onClick={redo} disabled={historyIndex >= history.length - 1}>
              <Icon icon="pixelarticons:redo" className="text-lg" /> Rehacer
            </button>
            
            <button className="control-btn" onClick={() => reset()} disabled={!context}>
              <Icon icon="pixelarticons:trash" className="text-lg" /> Resetear
            </button>
          </div>

          <hr className="border-[#e0e0e0] dark:border-[#444444] my-2" />

          {/* Fila 2: Herramientas y Propiedades del Trazo */}
          <div className="button-container flex flex-wrap gap-4 items-center justify-center">
            
            {/* HERRAMIENTA LÁPIZ / GOMA */}
            <div className="flex items-center gap-1">
              <span className="control-label">Herramienta</span>
              <button 
                className={`control-btn ${drawingSettings.eraser ? 'active-setting' : ''}`}
                onClick={toggleEraser}
              >
                <Icon icon={drawingSettings.eraser ? "pixelarticons:delete" : "pixelarticons:edit"} className="text-lg" />
                {drawingSettings.eraser ? 'Goma' : 'Lápiz'}
              </button>
            </div>

            {/* GROSOR */}
            <div className="flex items-center gap-1">
              <span className="control-label">Grosor</span>
              <select 
                value={drawingSettings.lineWidth}
                onChange={(e) => handleSettingChange('lineWidth', parseInt(e.target.value))}
                className="control-btn select-control min-w-[5rem] bg-background"
              >
                {Array.from({ length: 25 }, (_, i) => i + 1).map(n => (
                  <option key={n} value={n}>{n}px</option>
                ))}
              </select>
            </div>

            {/* COLOR */}
            <div className="flex items-center gap-1">
              <span className="control-label">Color</span>
              <div className="w-8 h-8  overflow-hidden "> 
                <input 
                  type="color" 
                  value={drawingSettings.color}
                  onChange={(e) => handleSettingChange('color', e.target.value)}
                  disabled={drawingSettings.eraser}
                  className="w-full h-full p-0 border-none cursor-pointer block" 
                />
              </div>
            </div>
            
            {/* ESTILO DE TRAZO */}
            <div className="flex items-center gap-1">
              <span className="control-label">Estilo</span>
              <select 
                value={drawingSettings.strokeType}
                onChange={(e) => handleSettingChange('strokeType', e.target.value)}
                className="control-btn select-control min-w-[8rem] bg-background"
              >
                <option value="dash">Mano Alzada</option>
                <option value="line">Línea</option> 
                <option value="circle">Círculo</option> 
              </select>
            </div>
            
            {/* RELLENO DE FIGURA */}
            {(drawingSettings.strokeType === 'circle' || drawingSettings.strokeType === 'rectangle') && (
                <div className="flex items-center gap-1">
                    <span className="control-label">Relleno</span>
                    <button 
                        className={`control-btn !p-2 ${drawingSettings.fillShape ? 'active-setting' : ''}`}
                        onClick={() => handleFillShapeChange(!drawingSettings.fillShape)}
                        disabled={drawingSettings.eraser}
                    >
                        <Icon icon={drawingSettings.fillShape ? "pixelarticons:check" : "pixelarticons:close"} className="text-lg" />
                    </button>
                </div>
            )}
          </div>
          
          <hr className="border-[#e0e0e0] dark:border-[#444444] my-2" />
          
          {/* Fila 3: Propiedades Avanzadas y Fondo */}
          <div className="button-container flex flex-wrap gap-4 items-center justify-center">
            
            {/* PUNTA */}
            <div className="flex items-center gap-1">
              <span className="control-label">Punta</span>
              <select 
                value={drawingSettings.lineCap}
                onChange={(e) => handleSettingChange('lineCap', e.target.value)}
                className="control-btn select-control min-w-[8rem] bg-background"
                disabled={drawingSettings.strokeType !== 'dash'}
              >
                <option value="round">Redonda</option>
                <option value="square">Cuadrada</option>
                <option value="butt">Butt</option>
              </select>
            </div>

            {/* JUNTAS */}
            <div className="flex items-center gap-1">
              <span className="control-label">Juntas</span>
              <select 
                value={drawingSettings.lineJoin}
                onChange={(e) => handleSettingChange('lineJoin', e.target.value)}
                className="control-btn select-control min-w-[8rem] bg-background"
                disabled={drawingSettings.strokeType !== 'dash'}
              >
                <option value="round">Redondas</option>
                <option value="miter">Miter</option>
                <option value="bevel">Bevel</option>
              </select>
            </div>

            {/* FONDO */}
            <div className="flex items-center gap-2">
              <span className="control-label">Fondo</span>
              <div className="w-8 h-8 overflow-hidden">
                <input 
                  type="color" 
                  value={drawingSettings.backgroundColor}
                  onChange={handleBackgroundChange}
                  className="w-full h-full p-0 border-none cursor-pointer block" 
                />
              </div>
            </div>
          </div>

          {/* Indicador de estado */}
          <div className="text-center text-sm text-[#666666] dark:text-[#999999] mt-4">
            {isLocked ? 'Canvas bloqueado 🔒' : 'Canvas listo para dibujar ✅'} | 
            Historial: **{historyIndex + 1}/{history.length}**
            {drawingSettings.strokeType !== 'dash' && (
              <span className="ml-2 text-[#9e99f8]">**(Figura: {drawingSettings.strokeType.toUpperCase()})**</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DrawingCanvas;