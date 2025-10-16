import React from 'react';
import SkillCircle from '../ui/SkillCircle';
import Avatar from '../../assets/img/avatar.png';
import VS from '../../assets/img/Visual-Studio-Code.png';
import Adobe from '../../assets/img/Adobe.png';
import Git from '../../assets/img/github.png';
import Figma from '../../assets/img/Figma.png';
import Microsoft from '../../assets/img/Microsoft.png';
import Blender from '../../assets/img/Blender.png';
import DownloadButtons from '../ui/DownloadButtons';
const About = () => {
    const skills = [
        { icon: Adobe, percent: 75, color: '#ff6b6b', label: 'Adobe Suite' },
        { icon: VS, percent: 87, color: '#08aabf', label: 'Visual Studio Code' },
        { icon: Git, percent: 83, color: '#9e99f8', label: 'GitHub' },
        { icon: Figma, percent: 80, color: '#32cd32', label: 'Figma' },
        { icon: Microsoft, percent: 70, color: '#e36b2c', label: 'Microsoft Office' },
        { icon: Blender, percent: 60, color: '#ffa200', label: 'Blender' },
      ];
      

  return (
    <section id="about" className="min-h-screen flex flex-col items-center justify-center p-8  my-12">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold  mb-8">
          Sobre Mi
        </h2>
        
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div className="flex justify-center">
            <img 
              src={Avatar}
              alt="Belén Castillo" 
              className=" w-64 h-64 object-cover "
            />
          </div>
          <div className="text-left">
            <p className="text-lg text-text mb-6">
              Soy una desarrolladora Front-End y diseñadora UX/UI apasionada por crear experiencias digitales 
              memorables. Con formación en diseño y desarrollo web, combino habilidades técnicas 
              con sensibilidad artística para construir proyectos innovadores.
            </p>
            <p className="text-lg text-text mb-6">
              Mi enfoque se centra en la creación de interfaces intuitivas, responsive design 
              y experiencias de usuario excepcionales. Me encanta explorar nuevas tecnologías 
              y enfrentar desafíos creativos.
            </p>
            <p className="text-lg text-text mb-6">
              Cuando no estoy programando, disfruto del arte digital, la ilustración y 
              explorar tendencias en diseño interactivo.
            </p>
            <p className="text-lg text-text">
              Si quieres descargar mi CV, puedes hacerlo aquí:
            </p>
            <DownloadButtons />
          </div>
          
        </div>

        {/* Sección de habilidades */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-text mb-8">
            Mis Habilidades
          </h3>
          <div className="flex flex-wrap justify-center gap-8">
            {skills.map((skill, index) => (
              <SkillCircle
                key={index}
                icon={skill.icon}
                percent={skill.percent}
                color={skill.color}
                label={skill.label}
                size={100}
              />
            ))}
          </div>
          <div >
          <h3 className="text-3xl font-bold text-text my-8 ">
            Soft Skills
          </h3>
          <div className='flex flex-wrap justify-center grid md:grid-cols-2 gap-8 text-left'>
          <div className="p-4 pixelbutton3 flex flex-row ">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="Email-Mail-Chat--Streamline-Pixel" className='w-[6rem] m-4 fill-text'>
  <desc>
    Email Mail Chat Streamline Icon: https://streamlinehq.com
  </desc>
  <title>email-mail-chat</title>
  <g>
    <path d="m16.575000000000003 11.43 0 1.1400000000000001 -2.2874999999999996 0 0 1.1475 -6.855 0 0 1.1400000000000001 3.4275 0 0 1.1400000000000001 1.1400000000000001 0 0 1.1475 1.1475 0 0 1.1400000000000001 4.5675 0 0 1.1400000000000001 1.1475 0 0 1.1475 1.1400000000000001 0 0 1.1400000000000001 1.1400000000000001 0 0 -4.5675 1.1475 0 0 -1.1475 1.1400000000000001 0 0 -4.5675 -1.1400000000000001 0 0 -1.1475 -1.1475 0 0 -1.1400000000000001 -2.2800000000000002 0 0 -3.4275 -1.1475 0 0 5.715 -1.1400000000000001 0z" stroke-width="0.75"></path>
    <path d="M16.575000000000003 4.5675h1.1400000000000001v1.1475H16.575000000000003Z" stroke-width="0.75"></path>
    <path d="M13.1475 8.0025h2.2800000000000002v2.2800000000000002h-2.2800000000000002Z" stroke-width="0.75"></path>
    <path d="M14.287500000000001 3.4275h2.2874999999999996v1.1400000000000001h-2.2874999999999996Z" stroke-width="0.75"></path>
    <path d="M8.5725 8.0025h2.2874999999999996v2.2800000000000002h-2.2874999999999996Z" stroke-width="0.75"></path>
    <path d="M6.285 14.857499999999998h1.1475v1.1400000000000001H6.285Z" stroke-width="0.75"></path>
    <path d="M5.1450000000000005 2.2874999999999996h9.1425v1.1400000000000001H5.1450000000000005Z" stroke-width="0.75"></path>
    <path d="m5.1450000000000005 13.7175 -1.1400000000000001 0 0 4.5675 1.1400000000000001 0 0 -1.1400000000000001 1.1400000000000001 0 0 -1.1475 -1.1400000000000001 0 0 -2.2800000000000002z" stroke-width="0.75"></path>
    <path d="M4.005 8.0025h2.2800000000000002v2.2800000000000002H4.005Z" stroke-width="0.75"></path>
    <path d="M2.8575 3.4275h2.2874999999999996v1.1400000000000001H2.8575Z" stroke-width="0.75"></path>
    <path d="M2.8575 12.57h1.1475v1.1475H2.8575Z" stroke-width="0.75"></path>
    <path d="M1.7175 11.43h1.1400000000000001v1.1400000000000001H1.7175Z" stroke-width="0.75"></path>
    <path d="M1.7175 4.5675h1.1400000000000001v1.1475H1.7175Z" stroke-width="0.75"></path>
    <path d="M0.5700000000000001 5.715h1.1475v5.715H0.5700000000000001Z" stroke-width="0.75"></path>
  </g>
</svg>
                <div>
                <h5 className="font-semibold text-text font-bit text-2xl">Comunicación</h5>
                <p className="text-text text-lg text-wrap">Me gusta explicar lo técnico de forma sencilla, ya sea a un cliente o a alguien del equipo que no programa. Uso ejemplos y maquetas para no crear confusión.</p>

                </div>
              </div>
              <div className="p-4 pixelbutton3 flex flex-row">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="Multiple-User--Streamline-Pixel" className='w-[4rem] m-4 fill-text'>
  <desc>
    Multiple User Streamline Icon: https://streamlinehq.com
  </desc>
  <title>multiple-user</title>
  <g>
    <path d="M22.86 13.713750000000001H24v1.1475h-1.1400000000000001Z" stroke-width="0.75"></path>
    <path d="M20.572499999999998 12.57375h2.2874999999999996v1.1400000000000001h-2.2874999999999996Z" stroke-width="0.75"></path>
    <path d="M20.572499999999998 10.286249999999999h1.1400000000000001v1.1475h-1.1400000000000001Z" stroke-width="0.75"></path>
    <path d="m17.145 11.43375 0 -2.2874999999999996 -1.1400000000000001 0 0 -1.1475 -1.1475 0 0 -2.2800000000000002 1.1475 0 0 -1.1475 4.5675 0 0 1.1475 1.1400000000000001 0 0 4.5675 1.1475 0 0 -6.855 -1.1475 0 0 -1.1475 -1.1400000000000001 0 0 -1.1400000000000001 -4.5675 0 0 1.1400000000000001 -1.1475 0 0 1.1475 -1.1400000000000001 0 0 3.4275 -3.4275 0 0 -3.4275 -1.1475 0 0 -1.1475 -1.1400000000000001 0 0 -1.1400000000000001 -4.574999999999999 0 0 1.1400000000000001 -1.1400000000000001 0 0 1.1475 -1.1400000000000001 0 0 6.855 1.1400000000000001 0 0 -4.5675 1.1400000000000001 0 0 -1.1475 4.574999999999999 0 0 1.1475 1.1400000000000001 0 0 2.2800000000000002 -1.1400000000000001 0 0 1.1475 -1.1400000000000001 0 0 2.2874999999999996 -3.435 0 0 1.1400000000000001 3.435 0 0 4.5675 1.1400000000000001 0 0 -5.7075000000000005 1.1400000000000001 0 0 -1.1475 5.715 0 0 1.1475 1.1475 0 0 5.7075000000000005 1.1400000000000001 0 0 -4.5675 3.4275 0 0 -1.1400000000000001 -3.4275 0z" stroke-width="0.75"></path>
    <path d="M18.285 21.71625h1.1475v1.1400000000000001h-1.1475Z" stroke-width="0.75"></path>
    <path d="M17.145 20.576249999999998h1.1400000000000001v1.1400000000000001h-1.1400000000000001Z" stroke-width="0.75"></path>
    <path d="M14.857499999999998 19.42875h2.2874999999999996v1.1475h-2.2874999999999996Z" stroke-width="0.75"></path>
    <path d="M14.857499999999998 17.14125h1.1475v1.1475h-1.1475Z" stroke-width="0.75"></path>
    <path d="M13.7175 12.57375h1.1400000000000001v2.2874999999999996h-1.1400000000000001Z" stroke-width="0.75"></path>
    <path d="M9.1425 18.28875h5.715v1.1400000000000001h-5.715Z" stroke-width="0.75"></path>
    <path d="M10.290000000000001 16.00125h3.4275v1.1400000000000001h-3.4275Z" stroke-width="0.75"></path>
    <path d="M9.1425 12.57375h1.1475v2.2874999999999996h-1.1475Z" stroke-width="0.75"></path>
    <path d="M8.0025 17.14125h1.1400000000000001v1.1475h-1.1400000000000001Z" stroke-width="0.75"></path>
    <path d="M6.862500000000001 19.42875h2.2800000000000002v1.1475H6.862500000000001Z" stroke-width="0.75"></path>
    <path d="M5.715 20.576249999999998h1.1475v1.1400000000000001H5.715Z" stroke-width="0.75"></path>
    <path d="M4.574999999999999 21.71625h1.1400000000000001v1.1400000000000001H4.574999999999999Z" stroke-width="0.75"></path>
    <path d="M2.2874999999999996 10.286249999999999h1.1400000000000001v1.1475H2.2874999999999996Z" stroke-width="0.75"></path>
    <path d="M1.1475 12.57375h2.2800000000000002v1.1400000000000001H1.1475Z" stroke-width="0.75"></path>
    <path d="M0 13.713750000000001h1.1475v1.1475H0Z" stroke-width="0.75"></path>
  </g>
</svg>
                <div>
                <h5 className="font-semibold text-text font-bit text-2xl">Trabajo en equipo</h5>
                <p className="text-text text-lg text-wrap">Disfruto trabajar con otras personas, ver distintas perpectivas y llegar a un objetivo en común.</p>

                </div>
              </div>
              <div className="p-4 pixelbutton3 flex flex-row">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="Ecology-Wood-Plant-Grow--Streamline-Pixel" className='w-[5rem] m-4 fill-text'>
  <desc>
    Ecology Wood Plant Grow Streamline Icon: https://streamlinehq.com
  </desc>
  <title>ecology-wood-plant-grow</title>
  <g>
    <path d="M21.7125 22.2825H24v1.1475h-2.2874999999999996Z" stroke-width="0.75"></path>
    <path d="M21.7125 18.855h1.1475v1.1475h-1.1475Z" stroke-width="0.75"></path>
    <path d="M20.572499999999998 21.142500000000002h1.1400000000000001v1.1400000000000001h-1.1400000000000001Z" stroke-width="0.75"></path>
    <path d="m21.7125 18.855 0 -1.1400000000000001 -1.1400000000000001 0 0 -8.0025 -1.1475 0 0 4.574999999999999 -1.1400000000000001 0 0 1.1400000000000001 1.1400000000000001 0 0 5.715 1.1475 0 0 -2.2874999999999996 1.1400000000000001 0z" stroke-width="0.75"></path>
    <path d="M18.285 8.5725h1.1400000000000001v1.1400000000000001h-1.1400000000000001Z" stroke-width="0.75"></path>
    <path d="M17.145 10.86h1.1400000000000001v2.2800000000000002h-1.1400000000000001Z" stroke-width="0.75"></path>
    <path d="M15.997499999999999 7.425000000000001h2.2874999999999996v1.1475h-2.2874999999999996Z" stroke-width="0.75"></path>
    <path d="M5.715 15.4275h12.57v1.1400000000000001H5.715Z" stroke-width="0.75"></path>
    <path d="M15.997499999999999 9.712499999999999h1.1475v1.1475h-1.1475Z" stroke-width="0.75"></path>
    <path d="M6.855 13.14h10.290000000000001v1.1475H6.855Z" stroke-width="0.75"></path>
    <path d="M13.71 22.2825h1.1475v1.1475h-1.1475Z" stroke-width="0.75"></path>
    <path d="M13.71 18.855h1.1475v2.2874999999999996h-1.1475Z" stroke-width="0.75"></path>
    <path d="M12.57 10.86h2.2874999999999996V12h-2.2874999999999996Z" stroke-width="0.75"></path>
    <path d="M10.2825 17.715h1.1475v4.5675h-1.1475Z" stroke-width="0.75"></path>
    <path d="M9.1425 22.2825h1.1400000000000001v1.1475h-1.1400000000000001Z" stroke-width="0.75"></path>
    <path d="M10.2825 7.425000000000001V12h1.1475V7.425000000000001h3.4275V6.285h1.1400000000000001V5.1450000000000005h1.1475V3.9975h1.1400000000000001V0.5700000000000001h-4.574999999999999v1.1475h-1.1400000000000001v1.1400000000000001h-1.1400000000000001v1.1400000000000001h-1.1475v2.2874999999999996h-1.1400000000000001V7.425000000000001Zm2.2874999999999996 -3.4275h1.1400000000000001V2.8575h1.1475V1.7175h1.1400000000000001v1.1400000000000001h-1.1400000000000001v1.1400000000000001h-1.1475v1.1475h-1.1400000000000001Z" stroke-width="0.75"></path>
    <path d="M6.855 9.712499999999999h2.2874999999999996v1.1475H6.855Z" stroke-width="0.75"></path>
    <path d="M6.855 18.855h1.1475v2.2874999999999996H6.855Z" stroke-width="0.75"></path>
    <path d="M5.715 7.425000000000001h2.2874999999999996v1.1475H5.715Z" stroke-width="0.75"></path>
    <path d="M5.715 10.86h1.1400000000000001v2.2800000000000002H5.715Z" stroke-width="0.75"></path>
    <path d="m4.5675 14.287500000000001 0 -4.574999999999999 -1.1400000000000001 0 0 9.1425 -2.2874999999999996 0 0 1.1475 2.2874999999999996 0 0 1.1400000000000001 1.1400000000000001 0 0 -5.715 1.1475 0 0 -1.1400000000000001 -1.1475 0z" stroke-width="0.75"></path>
    <path d="M4.5675 8.5725h1.1475v1.1400000000000001H4.5675Z" stroke-width="0.75"></path>
    <path d="m4.5675 1.7175 0 3.4275 1.1475 0 0 1.1400000000000001 3.4275 0 0 -2.2874999999999996 -2.2874999999999996 0 0 -1.1400000000000001 -1.1400000000000001 0 0 -1.1400000000000001 -1.1475 0z" stroke-width="0.75"></path>
    <path d="M2.2874999999999996 21.142500000000002h1.1400000000000001v1.1400000000000001H2.2874999999999996Z" stroke-width="0.75"></path>
    <path d="M1.1400000000000001 22.2825h1.1475v1.1475H1.1400000000000001Z" stroke-width="0.75"></path>
    <path d="M0 17.715h1.1400000000000001v1.1400000000000001H0Z" stroke-width="0.75"></path>
  </g>
</svg>
                <div>
                <h5 className="font-semibold text-text font-bit text-2xl">Adaptabilidad</h5>
                <p className="text-text text-lg text-wrap">Si aparece una herramienta nueva o el plan cambia, me acomodo rápido. Aprender sobre la marcha me motiva más que seguir siempre igual.</p>

                </div>
              </div>
              <div className="p-4 pixelbutton3 flex flex-row">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="Content-Files-Sticky-Notepad-1--Streamline-Pixel" className='w-[5rem] m-4 fill-text'>
  <desc>
    Content Files Sticky Notepad 1 Streamline Icon: https://streamlinehq.com
  </desc>
  <title>content-files-sticky-notepad-1</title>
  <g>
    <path d="m20.572499999999998 19.42875 0 1.1475 3.4275 0 0 -5.715 -1.1400000000000001 0 0 4.5675 -2.2874999999999996 0z" stroke-width="0.75"></path>
    <path d="M21.72 7.998749999999999h1.1400000000000001v6.862500000000001h-1.1400000000000001Z" stroke-width="0.75"></path>
    <path d="M12.5775 20.576249999999998h7.995v1.1400000000000001H12.5775Z" stroke-width="0.75"></path>
    <path d="m19.4325 9.14625 -1.1400000000000001 0 0 7.995 -6.862500000000001 0 0 1.1475 8.0025 0 0 -9.1425z" stroke-width="0.75"></path>
    <path d="m4.574999999999999 22.856250000000003 8.0025 0 0 -1.1400000000000001 -6.862500000000001 0 0 -2.2874999999999996 5.715 0 0 -1.1400000000000001 -10.2825 0 0 -5.715 -1.1475 0 0 6.855 4.574999999999999 0 0 3.4275z" stroke-width="0.75"></path>
    <path d="M8.0025 14.861250000000002h4.574999999999999v1.1400000000000001h-4.574999999999999Z" stroke-width="0.75"></path>
    <path d="M8.0025 12.57375h6.855v1.1400000000000001h-6.855Z" stroke-width="0.75"></path>
    <path d="M8.0025 10.286249999999999h4.574999999999999v1.1475h-4.574999999999999Z" stroke-width="0.75"></path>
    <path d="M8.0025 7.998749999999999h6.855v1.1475h-6.855Z" stroke-width="0.75"></path>
    <path d="M3.435 12.57375h2.2800000000000002v2.2874999999999996H3.435Z" stroke-width="0.75"></path>
    <path d="M3.435 7.998749999999999h2.2800000000000002v2.2874999999999996H3.435Z" stroke-width="0.75"></path>
    <path d="m2.2874999999999996 3.4312500000000004 3.4275 0 0 2.2874999999999996 8.0025 0 0 -2.2874999999999996 5.715 0 0 5.715 1.1400000000000001 0 0 -1.1475 1.1475 0 0 -4.5675 -1.1475 0 0 -1.1475 -6.855 0 0 -1.1400000000000001 -8.0025 0 0 1.1400000000000001 -4.5675 0 0 10.290000000000001 1.1400000000000001 0 0 -9.1425z" stroke-width="0.75"></path>
  </g>
</svg>
                <div>
                <h5 className="font-semibold text-text font-bit text-2xl">Organización</h5>
                <p className="text-text text-lg text-wrap">Me gusta tener todo claro: tareas, fechas y prioridades. Uso herramientas como Miró o Notion para no perderme y que el equipo sepa en qué estamos.</p>

                </div>
              </div>
              <div className="p-4 pixelbutton3 flex flex-row">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="Business-Product-Target--Streamline-Pixel" className='w-[5rem] m-4 fill-text'>
  <desc>
    Business Product Target Streamline Icon: https://streamlinehq.com
  </desc>
  <title>business-product-target</title>
  <g>
    <path d="M22.8525 9.1425H24v5.715h-1.1475Z" stroke-width="0.75"></path>
    <path d="m21.7125 2.2874999999999996 0 -2.2874999999999996 -1.1400000000000001 0 0 1.1400000000000001 -1.1475 0 0 1.1475 -1.1400000000000001 0 0 3.4275 3.4275 0 0 -1.1400000000000001 1.1400000000000001 0 0 -1.1475 1.1475 0 0 -1.1400000000000001 -2.2874999999999996 0z" stroke-width="0.75"></path>
    <path d="M21.7125 14.857499999999998h1.1400000000000001v2.2874999999999996h-1.1400000000000001Z" stroke-width="0.75"></path>
    <path d="M21.7125 6.855h1.1400000000000001v2.2874999999999996h-1.1400000000000001Z" stroke-width="0.75"></path>
    <path d="M20.572499999999998 17.145h1.1400000000000001v2.2874999999999996h-1.1400000000000001Z" stroke-width="0.75"></path>
    <path d="M19.424999999999997 19.4325h1.1475v1.1400000000000001H19.424999999999997Z" stroke-width="0.75"></path>
    <path d="M17.145 20.572499999999998h2.2800000000000002v1.1400000000000001h-2.2800000000000002Z" stroke-width="0.75"></path>
    <path d="M17.145 5.715h1.1400000000000001v1.1400000000000001h-1.1400000000000001Z" stroke-width="0.75"></path>
    <path d="M15.997499999999999 6.855h1.1475v1.1475h-1.1475Z" stroke-width="0.75"></path>
    <path d="M14.857499999999998 21.7125h2.2874999999999996v1.1475h-2.2874999999999996Z" stroke-width="0.75"></path>
    <path d="M14.857499999999998 10.290000000000001h1.1400000000000001v3.4275h-1.1400000000000001Z" stroke-width="0.75"></path>
    <path d="M14.857499999999998 8.0025h1.1400000000000001v1.1400000000000001h-1.1400000000000001Z" stroke-width="0.75"></path>
    <path d="M14.857499999999998 1.1400000000000001h2.2874999999999996v1.1475h-2.2874999999999996Z" stroke-width="0.75"></path>
    <path d="M13.71 13.7175h1.1475v1.1400000000000001h-1.1475Z" stroke-width="0.75"></path>
    <path d="M13.71 9.1425h1.1475v1.1475h-1.1475Z" stroke-width="0.75"></path>
    <path d="M9.1425 22.86h5.715V24h-5.715Z" stroke-width="0.75"></path>
    <path d="M12.57 10.290000000000001h1.1400000000000001v1.1400000000000001h-1.1400000000000001Z" stroke-width="0.75"></path>
    <path d="M10.2825 14.857499999999998h3.4275v1.1400000000000001h-3.4275Z" stroke-width="0.75"></path>
    <path d="M11.43 11.43h1.1400000000000001v1.1400000000000001h-1.1400000000000001Z" stroke-width="0.75"></path>
    <path d="M10.2825 8.0025h3.4275v1.1400000000000001h-3.4275Z" stroke-width="0.75"></path>
    <path d="M9.1425 0h5.715v1.1400000000000001h-5.715Z" stroke-width="0.75"></path>
    <path d="M9.1425 13.7175h1.1400000000000001v1.1400000000000001h-1.1400000000000001Z" stroke-width="0.75"></path>
    <path d="M9.1425 9.1425h1.1400000000000001v1.1475h-1.1400000000000001Z" stroke-width="0.75"></path>
    <path d="M6.855 21.7125h2.2874999999999996v1.1475H6.855Z" stroke-width="0.75"></path>
    <path d="M7.995 10.290000000000001h1.1475v3.4275h-1.1475Z" stroke-width="0.75"></path>
    <path d="M6.855 1.1400000000000001h2.2874999999999996v1.1475H6.855Z" stroke-width="0.75"></path>
    <path d="M4.5675 20.572499999999998h2.2874999999999996v1.1400000000000001H4.5675Z" stroke-width="0.75"></path>
    <path d="M4.5675 2.2874999999999996h2.2874999999999996v1.1400000000000001H4.5675Z" stroke-width="0.75"></path>
    <path d="m5.715 9.1425 1.1400000000000001 0 0 -2.2874999999999996 2.2874999999999996 0 0 -1.1400000000000001 6.855 0 0 -1.1400000000000001 -1.1400000000000001 0 0 -1.1475 -5.715 0 0 1.1475 -2.2874999999999996 0 0 1.1400000000000001 -1.1400000000000001 0 0 1.1400000000000001 -1.1475 0 0 2.2874999999999996 -1.1400000000000001 0 0 5.715 1.1400000000000001 0 0 2.2874999999999996 1.1475 0 0 1.1400000000000001 1.1400000000000001 0 0 1.1475 2.2874999999999996 0 0 1.1400000000000001 5.715 0 0 -1.1400000000000001 2.2874999999999996 0 0 -1.1475 1.1400000000000001 0 0 -1.1400000000000001 1.1400000000000001 0 0 -2.2874999999999996 1.1475 0 0 -5.715 -1.1475 0 0 -1.1400000000000001 -1.1400000000000001 0 0 6.855 -1.1400000000000001 0 0 2.2874999999999996 -1.1475 0 0 1.1400000000000001 -6.855 0 0 -1.1400000000000001 -2.2874999999999996 0 0 -2.2874999999999996 -1.1400000000000001 0 0 -5.715z" stroke-width="0.75"></path>
    <path d="M3.4275 19.4325h1.1400000000000001v1.1400000000000001H3.4275Z" stroke-width="0.75"></path>
    <path d="M3.4275 3.4275h1.1400000000000001V4.574999999999999H3.4275Z" stroke-width="0.75"></path>
    <path d="M2.2874999999999996 17.145h1.1400000000000001v2.2874999999999996H2.2874999999999996Z" stroke-width="0.75"></path>
    <path d="M2.2874999999999996 4.574999999999999h1.1400000000000001v2.2800000000000002H2.2874999999999996Z" stroke-width="0.75"></path>
    <path d="M1.1400000000000001 14.857499999999998h1.1475v2.2874999999999996H1.1400000000000001Z" stroke-width="0.75"></path>
    <path d="M1.1400000000000001 6.855h1.1475v2.2874999999999996H1.1400000000000001Z" stroke-width="0.75"></path>
    <path d="M0 9.1425h1.1400000000000001v5.715H0Z" stroke-width="0.75"></path>
  </g>
</svg>
<div>
<h5 className="font-semibold text-text font-bit text-2xl">Resolución de problemas</h5>
<p className="text-text text-lg text-wrap">Cuando surge un problema, no me bloqueo. Busco alternativas, pruebo cosas y pido ayuda si hace falta hasta que encontramos la solución.</p>

</div>
</div>
<div className="p-4 pixelbutton3 flex flex-row">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="Social-Rewards-Heart-Like-Circle--Streamline-Pixel" className='w-[5rem] m-4 fill-text pointer-events-none'>
  <desc>
    Social Rewards Heart Like Circle Streamline Icon: https://streamlinehq.com
  </desc>
  <title>social-rewards-heart-like-circle</title>
  <g>
    <path d="M22.8525 9.1425H24v5.715h-1.1475Z" stroke-width="0.75"></path>
    <path d="M21.7125 14.857499999999998h1.1400000000000001v2.2874999999999996h-1.1400000000000001Z" stroke-width="0.75"></path>
    <path d="M21.7125 6.855h1.1400000000000001v2.2874999999999996h-1.1400000000000001Z" stroke-width="0.75"></path>
    <path d="M20.572499999999998 17.145h1.1400000000000001v2.2800000000000002h-1.1400000000000001Z" stroke-width="0.75"></path>
    <path d="M20.572499999999998 4.5675h1.1400000000000001v2.2874999999999996h-1.1400000000000001Z" stroke-width="0.75"></path>
    <path d="M19.424999999999997 19.424999999999997h1.1475v1.1475H19.424999999999997Z" stroke-width="0.75"></path>
    <path d="M19.424999999999997 3.4275h1.1475v1.1400000000000001H19.424999999999997Z" stroke-width="0.75"></path>
    <path d="M17.137500000000003 20.572499999999998h2.2874999999999996v1.1400000000000001h-2.2874999999999996Z" stroke-width="0.75"></path>
    <path d="M18.285 8.0025h-1.1475V6.855h-3.4275v1.1475h-1.1400000000000001v1.1400000000000001h-1.1475v-1.1400000000000001h-1.1400000000000001V6.855H6.855v1.1475H5.715v1.1400000000000001H4.5675v3.4275h1.1475v1.1475h1.1400000000000001v1.1400000000000001h1.1400000000000001v1.1400000000000001h1.1475v1.1475h1.1400000000000001v1.1400000000000001h1.1400000000000001v1.1400000000000001h1.1475v-1.1400000000000001h1.1400000000000001v-1.1400000000000001h1.1475v-1.1475h1.1400000000000001v-1.1400000000000001h1.1400000000000001v-1.1400000000000001h1.1475v-1.1475h1.1400000000000001v-3.4275h-1.1400000000000001Zm-1.1475 4.5675h-1.1400000000000001v-2.2874999999999996h-2.2874999999999996v-1.1400000000000001h2.2874999999999996v1.1400000000000001h1.1400000000000001Z" stroke-width="0.75"></path>
    <path d="M17.137500000000003 2.2874999999999996h2.2874999999999996v1.1400000000000001h-2.2874999999999996Z" stroke-width="0.75"></path>
    <path d="M14.857499999999998 21.7125h2.2800000000000002v1.1475h-2.2800000000000002Z" stroke-width="0.75"></path>
    <path d="M14.857499999999998 1.1400000000000001h2.2800000000000002v1.1475h-2.2800000000000002Z" stroke-width="0.75"></path>
    <path d="M9.1425 22.86h5.715V24h-5.715Z" stroke-width="0.75"></path>
    <path d="M9.1425 0h5.715v1.1400000000000001h-5.715Z" stroke-width="0.75"></path>
    <path d="M6.855 21.7125h2.2874999999999996v1.1475H6.855Z" stroke-width="0.75"></path>
    <path d="M6.855 1.1400000000000001h2.2874999999999996v1.1475H6.855Z" stroke-width="0.75"></path>
    <path d="M4.5675 20.572499999999998h2.2874999999999996v1.1400000000000001H4.5675Z" stroke-width="0.75"></path>
    <path d="M4.5675 2.2874999999999996h2.2874999999999996v1.1400000000000001H4.5675Z" stroke-width="0.75"></path>
    <path d="M3.4275 19.424999999999997h1.1400000000000001v1.1475H3.4275Z" stroke-width="0.75"></path>
    <path d="M3.4275 3.4275h1.1400000000000001v1.1400000000000001H3.4275Z" stroke-width="0.75"></path>
    <path d="M2.2800000000000002 17.145h1.1475v2.2800000000000002H2.2800000000000002Z" stroke-width="0.75"></path>
    <path d="M2.2800000000000002 4.5675h1.1475v2.2874999999999996H2.2800000000000002Z" stroke-width="0.75"></path>
    <path d="M1.1400000000000001 14.857499999999998h1.1400000000000001v2.2874999999999996H1.1400000000000001Z" stroke-width="0.75"></path>
    <path d="M1.1400000000000001 6.855h1.1400000000000001v2.2874999999999996H1.1400000000000001Z" stroke-width="0.75"></path>
    <path d="M0 9.1425h1.1400000000000001v5.715H0Z" stroke-width="0.75"></path>
  </g>
</svg>
<div>
<h5 className="font-semibold text-text font-bit text-2xl">Empatía</h5>
<p className="text-text text-lg text-wrap">Intento ponerme en el lugar del cliente o del usuario final. Eso me ayuda a entender qué esperan y cómo hacerles la vida más fácil con lo que desarrollo.</p>

</div>
</div>
          </div>
          </div>
        </div>

        {/* Experiencia y educación */}
        <div className="grid md:grid-cols-2 gap-8 text-left">
          <div>
            <h4 className="text-2xl font-bold font-daydream text-text mb-4">Experiencia</h4>
            <div className="space-y-4">
              <a     href="#projects" 

  rel="noopener noreferrer" 
  className="p-4 flex flex-row pixelbutton2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="Coding-Apps-Websites-Dinosaur-Error--Streamline-Pixel" className='w-[4rem] m-4 fill-text pointer-events-none'>
  <desc>
    Coding Apps Websites Dinosaur Error Streamline Icon: https://streamlinehq.com
  </desc>
  <title>coding-apps-websites-dinosaur-error</title>
  <g>
    <path d="M22.86 18.85875H24v1.1400000000000001h-1.1400000000000001Z" stroke-width="0.75"></path>
    <path d="m24 10.85625 0 -2.2874999999999996 -1.1400000000000001 0 0 1.1475 -1.1475 0 0 -2.2874999999999996 -1.1400000000000001 0 0 4.574999999999999 -1.1475 0 0 -1.1475 -1.1400000000000001 0 0 2.2874999999999996 2.2874999999999996 0 0 3.4275 -5.715 0 0 1.1475 9.1425 0 0 -1.1475 -2.2874999999999996 0 0 -5.715 2.2874999999999996 0z" stroke-width="0.75"></path>
    <path d="M21.7125 0.57375H24v1.1400000000000001h-2.2874999999999996Z" stroke-width="0.75"></path>
    <path d="M19.424999999999997 18.85875h1.1475v1.1400000000000001H19.424999999999997Z" stroke-width="0.75"></path>
    <path d="M18.285 2.86125h2.2874999999999996v1.1400000000000001h-2.2874999999999996Z" stroke-width="0.75"></path>
    <path d="M14.857499999999998 18.85875h1.1400000000000001v1.1400000000000001h-1.1400000000000001Z" stroke-width="0.75"></path>
    <path d="m14.857499999999998 7.428749999999999 -3.4275 0 0 1.1400000000000001 3.4275 0 0 1.1475 1.1400000000000001 0 0 -5.715 -1.1400000000000001 0 0 3.4275z" stroke-width="0.75"></path>
    <path d="M10.2825 12.00375h-2.2800000000000002v1.1400000000000001h2.2800000000000002v1.1400000000000001h-2.2800000000000002v-1.1400000000000001H6.855v4.574999999999999h3.4275v1.1400000000000001H6.855v1.1400000000000001H3.4275V21.15H4.574999999999999v2.2800000000000002h2.2800000000000002v-1.1400000000000001H5.715V21.15h3.4275v-1.1475h1.1400000000000001v1.1475h2.2874999999999996v-1.1475h-1.1400000000000001v-4.5675h1.1400000000000001v1.1400000000000001h1.1475v-2.2874999999999996h-2.2874999999999996v-3.4275h3.4275v-1.1400000000000001h-4.574999999999999Zm0 4.5675h-2.2800000000000002v-1.1400000000000001h2.2800000000000002Z" stroke-width="0.75"></path>
    <path d="M8.0025 0.57375h2.2800000000000002v1.1400000000000001h-2.2800000000000002Z" stroke-width="0.75"></path>
    <path d="M6.855 5.14125h1.1475v2.2874999999999996H6.855Z" stroke-width="0.75"></path>
    <path d="M5.715 2.86125h9.1425v1.1400000000000001H5.715Z" stroke-width="0.75"></path>
    <path d="M5.715 17.71875h1.1400000000000001v1.1400000000000001H5.715Z" stroke-width="0.75"></path>
    <path d="M4.574999999999999 4.00125h1.1400000000000001v8.0025H4.574999999999999Z" stroke-width="0.75"></path>
    <path d="M3.4275 12.00375H4.574999999999999v3.4275H3.4275Z" stroke-width="0.75"></path>
    <path d="M2.2874999999999996 18.85875h1.1400000000000001v1.1400000000000001H2.2874999999999996Z" stroke-width="0.75"></path>
    <path d="M2.2874999999999996 15.431249999999999h1.1400000000000001v1.1400000000000001H2.2874999999999996Z" stroke-width="0.75"></path>
    <path d="M1.1400000000000001 17.71875h1.1475v1.1400000000000001H1.1400000000000001Z" stroke-width="0.75"></path>
    <path d="M0 4.00125h2.2874999999999996v1.1400000000000001H0Z" stroke-width="0.75"></path>
    <path d="m1.1400000000000001 15.431249999999999 1.1475 0 0 -1.1475 -1.1475 0 0 -1.1400000000000001 -1.1400000000000001 0 0 4.574999999999999 1.1400000000000001 0 0 -2.2874999999999996z" stroke-width="0.75"></path>
  </g>
</svg>
                <div className='pointer-events-none'>
                <h5 className="font-semibold text-primary font-bit text-2xl">Desarrolladora front-end (freelance)</h5>
                <p className="text-text">2023 - Presente</p>
                <p className="text-lg text-text">Desarrollo de aplicaciones web y portfolios personalizados</p>

                </div>
              </a>
              <a   href="https://ging.github.io/" 
  target="_blank" 
  rel="noopener noreferrer" 
  className=" p-4 pixelbutton2 flex flex-row">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="Coding-Apps-Websites-Programming-Browser--Streamline-Pixel" className='w-[4rem] m-4 fill-text pointer-events-none'>
  <desc>
    Coding Apps Websites Programming Browser Streamline Icon: https://streamlinehq.com
  </desc>
  <title>coding-apps-websites-programming-browser</title>
  <g>
    <path d="m1.1400000000000001 6.855 21.72 0 0 14.857499999999998 1.1400000000000001 0 0 -19.424999999999997 -1.1400000000000001 0 0 3.4275 -21.72 0 0 -3.4275 -1.1400000000000001 0 0 19.424999999999997 1.1400000000000001 0 0 -14.857499999999998z" stroke-width="0.75"></path>
    <path d="M1.1400000000000001 21.7125h21.72v1.1475H1.1400000000000001Z" stroke-width="0.75"></path>
    <path d="M3.4275 9.1425v10.290000000000001h17.145V9.1425Zm6.855 5.715h-1.1400000000000001v1.1400000000000001h-1.1400000000000001v1.1475H6.855v-1.1475h1.1475v-1.1400000000000001h1.1400000000000001v-1.1400000000000001h-1.1400000000000001v-1.1475H6.855v-1.1400000000000001h1.1475v1.1400000000000001h1.1400000000000001v1.1475h1.1400000000000001Zm6.862500000000001 0h-4.574999999999999v-1.1400000000000001h4.574999999999999Z" stroke-width="0.75"></path>
    <path d="M6.855 3.4275h1.1475V4.574999999999999H6.855Z" stroke-width="0.75"></path>
    <path d="M4.574999999999999 3.4275h1.1400000000000001V4.574999999999999H4.574999999999999Z" stroke-width="0.75"></path>
    <path d="M2.2874999999999996 3.4275h1.1400000000000001V4.574999999999999H2.2874999999999996Z" stroke-width="0.75"></path>
    <path d="M1.1400000000000001 1.1400000000000001h21.72v1.1475H1.1400000000000001Z" stroke-width="0.75"></path>
  </g>
</svg>
                <div className='pointer-events-none'>

                <h5 className="font-semibold text-primary font-bit text-2xl">Diseñadora front-end & UI/UX</h5>
                <p className="text-text">UPM-GING (Grupo de Investigación Next Generation) · 2025</p>
                <p className="text-lg text-text">Programación de interfaces y experiencias de usuario</p>
                </div>
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-2xl font-bold text-text font-daydream  mb-4">Educacion</h4>
            <div className="space-y-4">
              <a   href="https://www.udit.es/grado-en-diseno-multimedia-y-grafico/" 
  target="_blank" 
  rel="noopener noreferrer" 
  className=" p-4 pixelbutton2 flex flex-row">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="Design-Drawing-Board--Streamline-Pixel" className='w-[4rem] m-4 fill-text pointer-events-none'>
  <desc>
    Design Drawing Board Streamline Icon: https://streamlinehq.com
  </desc>
  <title>design-drawing-board</title>
  <g>
    <path d="m22.856250000000003 19.424999999999997 -1.1400000000000001 0 0 3.4275 -1.1400000000000001 0 0 -2.2800000000000002 -1.1475 0 0 3.4275 3.4275 0 0 -4.574999999999999z" stroke-width="0.75"></path>
    <path d="M20.576249999999998 14.857499999999998h1.1400000000000001v4.5675h-1.1400000000000001Z" stroke-width="0.75"></path>
    <path d="M18.28875 17.137500000000003h1.1400000000000001v3.435h-1.1400000000000001Z" stroke-width="0.75"></path>
    <path d="M18.28875 12.57h1.1400000000000001v2.2874999999999996h1.1475v-3.4275h-1.1475V5.715h1.1475v-4.574999999999999h-8.0025V0h-1.1400000000000001v1.1400000000000001H3.4312500000000004v4.574999999999999H4.574999999999999V2.2874999999999996h12.5775v3.4275h-1.1475v5.715h-1.1400000000000001v4.5675H2.2912500000000002v-4.5675h-1.1475v5.7075000000000005h2.2874999999999996v3.435H4.574999999999999v-3.435h1.1475v3.435H4.574999999999999v2.2800000000000002H3.4312500000000004v-2.2800000000000002h-1.1400000000000001V24h3.4275v-2.2874999999999996h6.855V24h3.4275v-3.4275h-1.1400000000000001v2.2800000000000002h-1.1475v-2.2800000000000002h-6.855V19.424999999999997h6.855v1.1475h1.1475v-3.435h1.1400000000000001v3.435h1.1475v-3.435h1.1400000000000001Zm-4.574999999999999 5.715h-6.855v-1.1475h6.855Z" stroke-width="0.75"></path>
    <path d="M13.713750000000001 7.995h1.1475v2.2874999999999996h-1.1475Z" stroke-width="0.75"></path>
    <path d="M12.57375 10.2825h1.1400000000000001v2.2874999999999996h-1.1400000000000001Z" stroke-width="0.75"></path>
    <path d="M12.57375 6.855h1.1400000000000001v1.1400000000000001h-1.1400000000000001Z" stroke-width="0.75"></path>
    <path d="M12.57375 3.4275h1.1400000000000001v1.1400000000000001h-1.1400000000000001Z" stroke-width="0.75"></path>
    <path d="M6.85875 12.57h5.715v1.1400000000000001h-5.715Z" stroke-width="0.75"></path>
    <path d="M10.286249999999999 7.995h1.1475v1.1475h-1.1475Z" stroke-width="0.75"></path>
    <path d="M9.14625 10.2825h1.1400000000000001v1.1475h-1.1400000000000001Z" stroke-width="0.75"></path>
    <path d="M6.85875 7.995h1.1475v1.1475h-1.1475Z" stroke-width="0.75"></path>
    <path d="m12.57375 6.855 0 -2.2874999999999996 -1.1400000000000001 0 0 1.1475 -1.1475 0 0 -2.2874999999999996 -1.1400000000000001 0 0 2.2874999999999996 -1.1400000000000001 0 0 -1.1475 -1.1475 0 0 1.1475 -1.1400000000000001 0 0 1.1400000000000001 6.855 0z" stroke-width="0.75"></path>
    <path d="M5.71875 10.2825h1.1400000000000001v2.2874999999999996h-1.1400000000000001Z" stroke-width="0.75"></path>
    <path d="M5.71875 3.4275h1.1400000000000001v1.1400000000000001h-1.1400000000000001Z" stroke-width="0.75"></path>
    <path d="M4.57125 6.855h1.1475v3.4275h-1.1475Z" stroke-width="0.75"></path>
    <path d="M2.2912500000000002 5.715h1.1400000000000001v5.715h-1.1400000000000001Z" stroke-width="0.75"></path>
  </g>
</svg>
                <div className='pointer-events-none'>
                <h5 className="font-semibold text-primary font-bit text-2xl">Grado en Diseño Gráfico y Multimedia</h5>
                <p className="text-text ">UDIT · 2019-2024</p>
                <p className="text-lg text-text">Estudios en diseño gráfico </p>

                </div>
              </a>
              <a   href="https://mdi.esdmadrid.es/" 
  target="_blank" 
  rel="noopener noreferrer" 
  className=" p-4 pixelbutton2 flex flex-row">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="Coding-Apps-Websites-Mobile--Streamline-Pixel" className='w-[4rem] m-4 fill-text pointer-events-none'>
  <desc>
    Coding Apps Websites Mobile Streamline Icon: https://streamlinehq.com
  </desc>
  <title>coding-apps-websites-mobile</title>
  <g>
    <path d="M22.86 0h-6.862500000000001v1.1475h-1.1400000000000001v6.855H1.1400000000000001v1.1400000000000001h13.7175v3.435h1.1400000000000001v4.5675H1.1400000000000001V9.1425H0v10.290000000000001h1.1400000000000001v-1.1400000000000001h14.857499999999998v1.1400000000000001h1.1475v-5.715h5.715v-1.1400000000000001H24V1.1475h-1.1400000000000001Zm-4.574999999999999 1.1475h2.2874999999999996v1.1400000000000001h-2.2874999999999996Zm4.574999999999999 10.2825h-6.862500000000001V2.2874999999999996h1.1475v1.1475h4.5675V2.2874999999999996h1.1475Z" stroke-width="0.75"></path>
    <path d="M20.572499999999998 6.862500000000001h1.1400000000000001v1.1400000000000001h-1.1400000000000001Z" stroke-width="0.75"></path>
    <path d="M20.572499999999998 4.574999999999999h1.1400000000000001v1.1400000000000001h-1.1400000000000001Z" stroke-width="0.75"></path>
    <path d="M18.285 8.0025h2.2874999999999996v1.1400000000000001h-2.2874999999999996Z" stroke-width="0.75"></path>
    <path d="M17.145 6.862500000000001h1.1400000000000001v1.1400000000000001h-1.1400000000000001Z" stroke-width="0.75"></path>
    <path d="M17.145 4.574999999999999h1.1400000000000001v1.1400000000000001h-1.1400000000000001Z" stroke-width="0.75"></path>
    <path d="m1.1400000000000001 19.4325 0 1.1400000000000001 4.574999999999999 0 0 1.1475 1.1400000000000001 0 0 -1.1475 3.4275 0 0 1.1475 1.1475 0 0 -1.1475 4.5675 0 0 -1.1400000000000001 -14.857499999999998 0z" stroke-width="0.75"></path>
    <path d="M13.7175 12.5775h1.1400000000000001v1.1400000000000001h-1.1400000000000001Z" stroke-width="0.75"></path>
    <path d="M12.57 13.7175h1.1475v1.1400000000000001h-1.1475Z" stroke-width="0.75"></path>
    <path d="M12.57 11.43h1.1475v1.1475h-1.1475Z" stroke-width="0.75"></path>
    <path d="M11.43 14.857499999999998h1.1400000000000001v1.1475h-1.1400000000000001Z" stroke-width="0.75"></path>
    <path d="M11.43 10.290000000000001h1.1400000000000001v1.1400000000000001h-1.1400000000000001Z" stroke-width="0.75"></path>
    <path d="m5.715 22.86 0 -1.1400000000000001 -1.1400000000000001 0 0 2.2800000000000002 7.995 0 0 -2.2800000000000002 -1.1400000000000001 0 0 1.1400000000000001 -5.715 0z" stroke-width="0.75"></path>
    <path d="M9.1425 10.290000000000001h1.1400000000000001v2.2874999999999996h-1.1400000000000001Z" stroke-width="0.75"></path>
    <path d="M8.0025 12.5775h1.1400000000000001v1.1400000000000001h-1.1400000000000001Z" stroke-width="0.75"></path>
    <path d="M6.855 13.7175h1.1475v2.2874999999999996H6.855Z" stroke-width="0.75"></path>
    <path d="M4.574999999999999 14.857499999999998h1.1400000000000001v1.1475H4.574999999999999Z" stroke-width="0.75"></path>
    <path d="M4.574999999999999 10.290000000000001h1.1400000000000001v1.1400000000000001H4.574999999999999Z" stroke-width="0.75"></path>
    <path d="M3.4275 13.7175H4.574999999999999v1.1400000000000001H3.4275Z" stroke-width="0.75"></path>
    <path d="M3.4275 11.43H4.574999999999999v1.1475H3.4275Z" stroke-width="0.75"></path>
    <path d="M2.2874999999999996 12.5775h1.1400000000000001v1.1400000000000001H2.2874999999999996Z" stroke-width="0.75"></path>
  </g>
</svg>
                <div className='pointer-events-none'>
                <h5 className="font-semibold text-primary font-bit text-2xl">Máster en Diseño Interactivo</h5>
                <p className="text-text">ESD Madrid · 2024-2025</p>
                <p className="text-lg text-text">Especialización en diseño UX/UI</p>

                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;