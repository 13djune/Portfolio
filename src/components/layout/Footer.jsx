import React from 'react';
import Cerezas from '../../assets/img/cerezas.gif';
const styles = `
@keyframes marquee {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}
.marquee {
  overflow: hidden;
  white-space: nowrap;
}
.marquee-content {
  display: inline-block;
  animation: marquee 20s linear infinite;
}
`;

const Footer = () => {
  return (
    <footer className="mt-20  pt-8 z-0">
      <style>{styles}</style>
      <div className="relative overflow-hidden">
     
      </div>
      <div className="relative w-full overflow-hidden  h-[60dvh] flex flex-col items-center justify-center">
        <div className="relative z-10  text-text flex flex-col items-center text-center">
          <p>¡Trabajemos juntos para crear algo inolvidable!</p>
          <br/>

          <p>Toda esta web está programada por mí (con React) &lt;3 </p>
          <br/>

          <p>Belén (June) Castillo · actualizado diciembre {new Date().getFullYear()} ©</p>
          <br/>

          <p>Pixel art: <a id="marina" href="https://marinamartinprieto.cargo.site/" className="text-blue-400 hover:underline">Marina Martín (Concept Artist)</a></p>
          <img src={Cerezas} alt="Cherries in pixel art moving" className="cereza mt-4 w-[7rem] absolute right-[-14rem]" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;