import React from 'react';
import ProjectGrid from './ProjectGrid';
import Planta from '../../assets/img/plantita.gif';
const Projects = () => (
  <section id="projects" className="min-h-screen flex flex-col items-center p-8 my-12">
    <div className="text-center mb-10">
      <img src={Planta} alt="Planta pixel art" className="mx-auto w-[8rem] mb-12" />
      <h2 className="text-2xl md:text-3xl font-bold mt-4 text-text">Puedes echar un vistazo a mis proyectos:</h2>
    </div>
    <ProjectGrid />
  </section>
);

export default Projects;