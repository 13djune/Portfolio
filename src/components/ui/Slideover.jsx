import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';

// --- Definiciones de Íconos Pixel Art (Usando Iconify) ---
// NOTA: Se asume que la librería @iconify/react está disponible en el entorno.

const XIcon = (props) => (
  <Icon icon="pixelarticons:close" className="w-6 h-6 pointer-events-none" {...props} />
);

const ChevronLeftIcon = (props) => (
  <Icon icon="pixelarticons:chevron-left" className="w-6 h-6 pointer-events-none" {...props} />
);

const ChevronRightIcon = (props) => (
  <Icon icon="pixelarticons:chevron-right" className="w-6 h-6 pointer-events-none" {...props} />
);
// -----------------------------------------------------------------


const ProjectModal = ({ project, onClose }) => {
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);

  useEffect(() => {
    if (project) {
      setCurrentMediaIndex(0);
    }
  }, [project]);

  const showNextMedia = () => {
    if (project?.media) {
      setCurrentMediaIndex((prevIndex) => (prevIndex + 1) % project.media.length);
    }
  };

  const showPreviousMedia = () => {
    if (project?.media) {
      setCurrentMediaIndex((prevIndex) => (prevIndex - 1 + project.media.length) % project.media.length);
    }
  };

  if (!project) return null;

  // Destructuración de los nuevos campos para usarlos fácilmente
  const { role, team, tools, time, learned, caseDetails } = project;

  // Función para obtener la etiqueta abreviada para móvil
  // Esta función revierte la lógica a la original que genera "Web", "GitHub", "Memoria", etc.
  const getShortLabel = (label) => {
    const lowerLabel = label.toLowerCase();
    
    // CASOS ESPECÍFICOS:
    if (lowerLabel.includes('figma') || lowerLabel.includes('prototipo')) {
      return 'Figma'; // Nuevo caso para 'Prototipo en Figma'
    }
    if (lowerLabel.includes('web') || lowerLabel.includes('sitio')) {
      return 'Web';
    }
    if (lowerLabel.includes('repo') || lowerLabel.includes('github')) {
      return 'GitHub';
    }
    if (lowerLabel.includes('memoria') || lowerLabel.includes('documento')) {
      return 'Memoria';
    }

    // CASOS GENERALES si la etiqueta ya es corta
    switch (lowerLabel) {
      case 'web':
        return 'Web';
      case 'github':
        return 'GitHub';
      case 'memoria':
        return 'Memoria';
      default:
        // Por defecto, muestra las primeras 3 letras para etiquetas no reconocidas
        return label.substring(0, 3);
    }
  };


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Fondo oscuro */}
      <div className="absolute inset-0 bg-background opacity-50" onClick={onClose}></div>

      {/* Modal centrado - Usamos overflow-y-auto en el modal para permitir scroll si el contenido es muy largo */}
      <div className=" relative bg-background rounded-2xl shadow-2xl max-w-6xl w-full mx-4 p-6 pt-0 z-10 animate-fadeIn max-h-[90vh] overflow-y-auto">
        
        {/* Header (Sticky) - Contiene Título, Enlaces y Botón de cierre */}
        <div className="slideover flex items-start justify-between mb-4 sticky top-0 bg-background z-20 py-6 ">
          
          {/* Contenedor principal de Título y Enlaces. Se apila en móvil (flex-col) y se pone en fila en escritorio (lg:flex-row). */}
          <div className='flex flex-col md:flex-row md:items-center lg:flex-row lg:items-center gap-2 lg:gap-4 max-w-[85%]'> 
            
            <h2 className="text-2xl font-bold text-text">{project.title}</h2>
            
            {/* Enlaces con lógica responsiva de abreviación */}
            {project.links && project.links.length > 0 && (
              <div className="flex gap-3 flex-wrap">
                {project.links.map((link, idx) => (
                  <a
                    key={idx}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pixelbutton flex items-center justify-center h-10 px-4 whitespace-nowrap"
                  >
                    {/* Texto completo en pantallas grandes */}
                    <span className="hidden lg:inline">{link.label}</span>
                    {/* Texto abreviado en pantallas pequeñas */}
                    <span className="lg:hidden">{getShortLabel(link.label)}</span>
                  </a>
                ))}
              </div>
            )}
          </div>
          
          <button
            type="button"
            className="p-2 rounded-full text-text hover:text-slate-600 dark:hover:text-slate-200 focus:outline-none"
            onClick={onClose}
          >
            <XIcon />
          </button>
        </div>

        {/* Media Carousel */}
        <div className="relative flex items-center justify-center mb-6">
          <button
            className="absolute left-0 p-2 pixelbutton"
            onClick={showPreviousMedia}
            disabled={project.media.length <= 1}
          >
            <ChevronLeftIcon />
          </button>
          {project.media[currentMediaIndex] &&
            (project.media[currentMediaIndex].type === 'image' ? (
              <img
                src={project.media[currentMediaIndex].src}
                alt="Project media"
                className="max-h-[50vh] object-contain rounded-lg shadow-md"
              />
            ) : (
              <video
                src={project.media[currentMediaIndex].src}
                controls
                className="max-h-[50vh] object-contain rounded-lg shadow-md"
              />
            ))}
          <button
            className="absolute right-0 p-2 pixelbutton"
            onClick={showNextMedia}
            disabled={project.media.length <= 1}
          >
            <ChevronRightIcon />
          </button>
        </div>

        {/* Contenido Detallado */}
        <div className="text-text space-y-6">
        <div className="p-4 space-y-3">
            {project.additionalText && <p className='whitespace-pre-line text-lg'>{project.additionalText}</p>}
          </div>
          {/* 1. SECCIÓN DE DATOS CLAVE (Tarjeta de Resumen) */}
          <div className="p-4 ">
            <h3 className="text-xl font-bold mb-3  text-text">Datos Clave</h3>
            <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-sm sm:grid-cols-4">
              <div className="col-span-1">
                <p className="font-semibold text-primary">Mi rol:</p>
                <p className='text-base text-text'>{role}</p>
              </div>
              <div className="col-span-1">
                <p className="font-semibold text-primary">Equipo:</p>
                <p className='text-base text-text'>{team}</p>
              </div>
              <div className="col-span-1">
                <p className="font-semibold text-primary">Tiempo:</p>
                <p className='text-base text-text'>{time}</p>
              </div>
            </div>
            
            <div className="mt-4">
              <p className="font-semibold text-text">Herramientas</p>
              <div className="flex flex-wrap gap-2 mt-1">
                {tools && tools.map((tool, index) => (
                  <span key={index} className="bg-primary text-background text-xs font-semibold px-2.5 py-0.5 rounded-full shadow-sm">{tool}</span>
                ))}
              </div>
            </div>

            <div className="mt-4 border-t border-gray-300 dark:border-gray-700 pt-3">
              <p className="font-bold text-lg text-primary">Aprendizaje Principal</p>
              <p className="italic text-base">{learned}</p>
            </div>
          </div>


          {/* 2. SECCIÓN PROCESO (CASE DETAILS) */}
          {caseDetails && (
            <div className="p-4  space-y-3">
              <h3 className="text-xl font-bold text-text">Proceso y Solucion</h3>
              <p><strong className='text-secondary text-lg font-bold'>Problema: </strong> {caseDetails.problem}</p>
              <p><strong className='text-secondary text-lg font-bold'>Opciones evaluadas: </strong> {caseDetails.options}</p>
              <p><strong className='text-secondary text-lg font-bold' >Decisión clave: </strong> {caseDetails.decision}</p>
              <p><strong className='text-secondary text-lg font-bold'>Resultado: </strong> {caseDetails.result}</p>
            </div>
          )}
          
       
    
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
