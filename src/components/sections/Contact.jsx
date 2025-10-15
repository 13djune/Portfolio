import React, { useState, useEffect } from 'react';
// import { Icon } from '@iconify/react';
import ContactSocials from '../ui/ContactSocials';
import DrawingCanvas from '../ui/DrawingCanvas';
import Corazon from '../../assets/img/corazon.gif';
const Contact = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Detectar el modo oscuro del sistema
    const checkDarkMode = () => {
      if (typeof window !== 'undefined') {
        const isDark = document.documentElement.classList.contains('dark');
        setIsDarkMode(isDark);
      }
    };

    checkDarkMode();
    
    // Observar cambios en la clase dark
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          checkDarkMode();
        }
      });
    });

    observer.observe(document.documentElement, { attributes: true });

    return () => observer.disconnect();
  }, []);

  return (
    <section id="contact" className={`min-h-screen flex flex-col items-center p-8 my-12 ${isDarkMode ? 'dark-mode' : ''}`}>
      
      <div className="text-center mb-8">
        <img 
          src={Corazon} 
          alt="Crystal heart in pixel art filling up" 
          className="cora mx-auto w-32 h-32 object-contain"
        />
        <h1 className="relative my-12 flex justify-center text-2xl md:text-3xl">
        Ponte en contacto conmigo:
        </h1>
      </div>

      <ContactSocials />

      <DrawingCanvas />

    </section>
  );
};

export default Contact;