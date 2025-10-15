import React, { useState } from 'react';
import { projectsData } from '../../data/projectsData';
import Slideover from '../ui/Slideover';
import FancyButton from '../FancyButton';
const ProjectGrid = () => {
  const [activeProject, setActiveProject] = useState(null);

  const openSlideover = (project) => {
    setActiveProject(project);
  };

  const closeSlideover = () => {
    setActiveProject(null);
  };

  return (
    <div className="w-full max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {projectsData.map((project) => (
          <div
            key={project.id}
            className="rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105 flex flex-col justify-around items-center pb-4"
          >
            {project.media[0] && (
              <div className="h-48 overflow-hidden w-[-webkit-fill-available]">
                {project.media[0].type === 'image' ? (
                  <img src={project.media[0].src} alt="Imagen del proyecto" className="w-full h-full object-cover" />
                ) : (
                  <video src={project.media[0].src} controls className="w-full h-full object-cover"></video>
                )}
              </div>
            )}
            <div className="p-4 flex flex-col items-center text-center">
              <h4 className="text-xl font-bit text-text">{project.title}</h4>
              <p className="mt-2 text-text">{project.description}</p>
            </div>
              <FancyButton
                className="font-bit w-max text-text rounded-lg flex flex-row items-center justify-center  "
                onClick={() => openSlideover(project)}
                label= "Ver más"
              >
              </FancyButton>
          </div>
        ))}
      </div>
      <Slideover project={activeProject} onClose={closeSlideover} />
    </div>
  );
};

export default ProjectGrid;