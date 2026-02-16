import React from 'react';
import Burbujas from '../../assets/img/burbujas.gif';
import Ordena from '../../assets/img/ordena.png';

const Home = () => (
  // Añadido 'relative' y 'overflow-hidden' para contener los elementos absolutos
  <section id="home" className="h-screen relative flex items-center justify-center p-4 transition-colors duration-500 overflow-hidden">
    
    {/* Contenedor de texto con z-10 para que esté siempre encima de las imágenes */}
    <div className="text-center z-10 relative max-w-2xl mx-auto">
      <h1 className='text-4xl leading-[2] md:text-5xl md:leading-[2]  font-bold mb-2'>
        Holaa!! Soy Belen
      </h1>
      <h3 className='text-xl md:text-2xl font-bold mb-6 text-text/80'>
        o june
      </h3>
      
      <div className="space-y-2 text-base md:text-lg">
        <p>una diseñadora gráfica y multimedia</p>
        <p>con un máster en diseño interactivo (UX/UI), basada en Madrid.</p>
        <p className="mt-4 font-medium">Encantada de conocerte :)</p>
      </div>
    </div>

    {/* IMÁGENES DECORATIVAS */}
    
    {/* Burbujas: 
       - Móvil: Pequeñas (w-24), abajo a la izquierda pero con poco margen.
       - Desktop: Más grandes (w-32 o w-[8rem]), más adentro de la pantalla.
    */}
    <img 
      src={Burbujas} 
      alt="Two bubbles in pixel art" 
      className="absolute w-24 md:w-[8rem] left-4 bottom-16 md:left-[10%] md:bottom-[15%] lg:left-[15rem] lg:bottom-[8rem] opacity-90"
    /> 

    {/* Ordenador: 
       - Móvil: Pequeño (w-24), arriba a la derecha.
       - Desktop: Más grande, posición original ajustada.
    */}
    <img 
      src={Ordena} 
      alt="Old PC computer in pixel art in isometric" 
      className="absolute w-24 md:w-[8rem] right-4 top-20 md:right-[10%] md:top-[15%] lg:right-[15rem] lg:top-[8rem] opacity-90"
    /> 

  </section>
);

export default Home;