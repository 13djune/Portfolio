import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';

// --- Íconos ---
const XIcon = (props) => (
  <Icon icon="pixelarticons:close" className="w-8 h-8 pointer-events-none" {...props} />
);

const ChevronLeftIcon = (props) => (
  <Icon icon="pixelarticons:chevron-left" className="w-8 h-8 pointer-events-none" {...props} />
);

const ChevronRightIcon = (props) => (
  <Icon icon="pixelarticons:chevron-right" className="w-8 h-8 pointer-events-none" {...props} />
);

const ProjectModal = ({ project, onClose }) => {
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);

  useEffect(() => {
    if (project) setCurrentMediaIndex(0);
  }, [project]);

  // Bloquear scroll del body y asegurar que el modal esté arriba
  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [project]);

  const showNextMedia = (e) => {
    e?.stopPropagation();
    if (project?.media) {
      setCurrentMediaIndex((prev) => (prev + 1) % project.media.length);
    }
  };

  const showPreviousMedia = (e) => {
    e?.stopPropagation();
    if (project?.media) {
      setCurrentMediaIndex((prev) => (prev - 1 + project.media.length) % project.media.length);
    }
  };

  if (!project) return null;

  const { role, team, tools, time, learned, caseDetails } = project;

  const getShortLabel = (label) => {
    const lowerLabel = label.toLowerCase();
    if (lowerLabel.includes('figma')) return 'Figma';
    if (lowerLabel.includes('web')) return 'Web';
    if (lowerLabel.includes('github')) return 'GitHub';
    return label.length > 6 ? label.substring(0, 4) + '.' : label;
  };

  return (
    // Z-INDEX ALTO: z-[100] para asegurar que tape el navbar
    <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center">
      
      {/* Backdrop oscuro */}
      <div 
        className="absolute inset-0 bg-background/80 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />

      {/* MODAL */}
      <div className="relative w-full h-full md:h-auto md:max-h-[90vh] md:w-[90%] md:max-w-6xl bg-background md:rounded-2xl shadow-2xl flex flex-col animate-fadeIn overflow-hidden border-2 border-text/10">
        
        {/* HEADER STICKY */}
        <div className="flex-none px-4 py-4 md:px-6 md:py-5 border-b-2 border-text/10 flex items-start justify-between bg-background z-20 sticky top-0 shadow-sm">
          <div className="flex flex-col gap-3 w-[85%]">
            {/* Título con tu fuente Bit */}
            <h2 className="text-xl md:text-3xl font-bold  text-text leading-tight uppercase">
              {project.title}
            </h2>
            
            {/* Enlaces estilo Pixel Button */}
            {project.links?.length > 0 && (
              <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar md:flex-wrap">
                {project.links.map((link, idx) => (
                  <a
                    key={idx}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pixelbutton flex-shrink-0 flex items-center justify-center h-8 md:h-10 px-4 text-xs md:text-sm whitespace-nowrap font-bit uppercase tracking-wide"
                  >
                    <span className="hidden md:inline">{link.label}</span>
                    <span className="md:hidden">{getShortLabel(link.label)}</span>
                  </a>
                ))}
              </div>
            )}
          </div>

          <button
            type="button"
            className="p-2 -mr-2 text-text hover:text-primary transition-colors"
            onClick={onClose}
          >
            <XIcon />
          </button>
        </div>

        {/* CONTENIDO */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 md:space-y-8 scrollbar-thin scrollbar-thumb-primary scrollbar-track-transparent">
          
          {/* MEDIA CAROUSEL */}
          <div className="relative w-full bg-text/5 rounded-xl overflow-hidden group aspect-video md:aspect-[21/9] flex items-center justify-center border-2 border-dashed border-text/20">
            {project.media[currentMediaIndex] && (
              project.media[currentMediaIndex].type === 'image' ? (
                <img
                  src={project.media[currentMediaIndex].src}
                  alt={`Slide ${currentMediaIndex}`}
                  className="w-full h-full object-contain"
                />
              ) : (
                <video
                  src={project.media[currentMediaIndex].src}
                  controls
                  className="w-full h-full object-contain"
                />
              )
            )}

            {project.media.length > 1 && (
              <>
                <button
                  className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-background border-2 border-text hover:bg-primary hover:text-background rounded-lg shadow-pixel text-text transition-all"
                  onClick={showPreviousMedia}
                >
                  <ChevronLeftIcon />
                </button>
                <button
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-background border-2 border-text hover:bg-primary hover:text-background rounded-lg shadow-pixel text-text transition-all"
                  onClick={showNextMedia}
                >
                  <ChevronRightIcon />
                </button>
              </>
            )}
          </div>

          {/* TEXTO ADICIONAL */}
          {project.additionalText && (
            <div className="max-w-none">
              <p className="whitespace-pre-line text-base md:text-lg text-text leading-relaxed font-medium">
                {project.additionalText}
              </p>
            </div>
          )}

          {/* DATOS CLAVE (Estilo limpio) */}
          <div className="bg-text/5 rounded-xl p-5 border-2 border-text/10">
            <h3 className="text-xl font-bold mb-4 text-text  uppercase flex items-center gap-2">
               Ficha Tecnica
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div>
                <span className="block text-lg uppercase tracking-wider text-primary font-bold font-bit mb-1">Rol</span>
                <span className="text-sm md:text-base text-text font-bit">{role}</span>
              </div>
              <div>
                <span className="block text-lg uppercase tracking-wider text-primary font-bold font-bit mb-1">Equipo</span>
                <span className="text-sm md:text-base text-text font-bit">{team}</span>
              </div>
              <div>
                <span className="block text-lg uppercase tracking-wider text-primary font-bold font-bit mb-1">Tiempo</span>
                <span className="text-sm md:text-base text-text font-bit">{time}</span>
              </div>
              <div>
                <span className="block text-lg uppercase tracking-wider text-primary font-bold font-bit mb-2">Herramientas</span>
                {/* PILLS: Estilo original redondeado */}
                <div className="flex flex-wrap gap-2">
                  {tools?.map((tool, i) => (
                    <span key={i} className="bg-primary text-background text-sm font-bold px-3 py-1 rounded-full shadow-sm font-bit">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {learned && (
              <div className="mt-6 pt-4 border-t-2 border-dashed border-text/10">
                <span className="block text-basic uppercase tracking-wider text-primary font-bold font-bit mb-2">Aprendizaje</span>
                <p className="text-sm md:text-base text-text italic">"{learned}"</p>
              </div>
            )}
          </div>

          {/* PROCESO Y SOLUCIÓN (Estilo web integrado, no alertas genéricas) */}
          {caseDetails && (
            <div className="space-y-6 pb-4">
              <h3 className="text-xl md:text-2xl font-bold text-text border-b-4 border-primary inline-block pb-1">
                Proceso y Resultado
              </h3>
              
              <div className="grid gap-6 md:grid-cols-2">
                {/* Caja Problema */}
                <div className="p-5 border-2 border-text/20 rounded-xl bg-background relative">
                   <span className="absolute -top-3 left-4 bg-background px-2 text-sm font-bit text-secondary uppercase tracking-widest">
                     El Problema
                   </span>
                   <p className="text-text mt-1">{caseDetails.problem}</p>
                </div>

                {/* Caja Solución */}
                <div className="p-5 border-2 border-primary rounded-xl bg-background relative shadow-pixel-sm">
                   <span className="absolute -top-3 left-4 bg-primary text-background px-2 text-sm font-bit uppercase tracking-widest rounded-xl ">
                     La Solución
                   </span>
                   <p className="text-text mt-1">{caseDetails.result}</p>
                </div>

                {/* Caja Detalles Extra (Full width) */}
                <div className="md:col-span-2 bg-text/5 p-5 rounded-xl border border-text/10">
                  <p className="mb-2">
                    <strong className="text-primary font-bit text-lg uppercase mr-2">Decisión Clave:</strong> 
                    {caseDetails.decision}
                  </p>
                  <p className="">
                    <strong className="text-primary font-bit text-lg uppercase mr-2">Opciones:</strong> 
                    {caseDetails.options}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;