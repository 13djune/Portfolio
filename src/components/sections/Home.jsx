import React from 'react';
import Burbujas from '../../assets/img/burbujas.gif';
import Ordena from '../../assets/img/ordena.png';
const Home = () => (
  <section id="home" className="h-screen flex items-center justify-center p-8 transition-colors duration-500">
    <div className="text-center">
  <img src={Burbujas} alt="Two bubbles in pixel art" className="burbujas  w-[8rem] absolute  left-[10rem] bottom-[6rem]"/> 
  <img src={Ordena} alt="Old PC computer in pixel art in isometric" className="ordena w-[8rem] absolute  right-[10rem] top-[6rem]"/> 
    <h1 className='text-3xl md:text-4xl font-bold mb-4'>Holaa!! Soy Belen</h1>
    <h3 className='text-xl md:text-2xl font-bold  mb-4'>o june</h3>
    <p className="text-lg">una diseñadora gráfica y multimedia</p>
    <p className="text-lg">con un máster en diseño interactivo (UX/UI), basada en Madrid.</p>
    <p className="text-lg">Encantada de conocerte :)</p>
    </div>
  </section>
);

export default Home;