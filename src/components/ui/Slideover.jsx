import React, { useState, useEffect } from 'react';
import { XIcon, ChevronLeftIcon, ChevronRightIcon } from '../icons/Pixelarticons';

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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Fondo oscuro */}
      <div className="absolute inset-0 bg-background opacity-50" onClick={onClose}></div>

      {/* Modal centrado */}
      <div className="relative bg-background rounded-2xl shadow-2xl max-w-4xl w-full mx-4 p-6 z-10 animate-fadeIn">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <h2 className="text-2xl font-bold text-text">{project.title}</h2>
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
          >
            <ChevronLeftIcon />
          </button>
          {project.media[currentMediaIndex] &&
            (project.media[currentMediaIndex].type === 'image' ? (
              <img
                src={project.media[currentMediaIndex].src}
                alt="Project media"
                className="max-h-96 object-contain rounded-lg"
              />
            ) : (
              <video
                src={project.media[currentMediaIndex].src}
                controls
                className="max-h-96 object-contain rounded-lg"
              />
            ))}
          <button
            className="absolute right-0 p-2 pixelbutton"
            onClick={showNextMedia}
          >
            <ChevronRightIcon />
          </button>
        </div>

        {/* Texto */}
        <div className="text-text  space-y-3 max-h-60 overflow-y-auto">
        
          {project.additionalText && <p>{project.additionalText}</p>}
          {project.links && project.links.length > 0 && (
            <div className="mt-4 flex gap-3 flex-wrap">
              {project.links.map((link, idx) => (
                <a
                  key={idx}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pixelbutton"
                >
                  {link.label}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
