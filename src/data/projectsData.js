
import DB_1 from '../assets/img/Home.png';
import DB_2 from '../assets/img/About_1.png';
import DB_3 from '../assets/img/About_2.png';
import DB_4 from '../assets/img/About_3.png';
import DB_5 from '../assets/img/About_4.png';
import DB_7 from '../assets/img/Explorar_1.png';
import DB_8 from '../assets/img/Explorar_2.png';
import DB_9 from '../assets/img/Explorar_filters.png';
import DB_10 from '../assets/img/Navegar_1.png';
import DB_11 from '../assets/img/Navegar_2_plat.png';
import DB_12 from '../assets/img/Walkthrough.png';
import DB_13 from '../assets/img/Exp_DB.mp4';

import alphegor1 from '../assets/img/ALPHEGOR.20.png';
import alphegor2 from '../assets/img/ALPHEGOR1.png';
import alphegor3 from '../assets/img/ALPHEGOR3.png';
import alphegor4 from '../assets/img/ALPHEGOR4.png';

import talsie1 from '../assets/img/TALSIE2.png';
import talsie2 from '../assets/img/TALSIE1.png';
import talsie3 from '../assets/img/TALSIE3.png';
import talsie4 from '../assets/img/TALSIE4.png';

import serenyx1 from '../assets/img/Serenyx1.png';
import serenyx2 from '../assets/img/Serenyx2.png';

import enstock from '../assets/img/EN_STOCK.mp4';

import ESDMeet1 from '../assets/img/Comunidades_landing.png'
import ESDMeet2 from '../assets/img/Desktop_Feed_Chat.png'
import ESDMeet3 from '../assets/img/Desktop_Feed.png'
import ESDMeet4 from '../assets/img/PERFIL.png'

import GitHub from '../assets/img/github.png'

export const projectsData = [
  {
    id: 1,
    title: 'Digital Bloom',
    description: 'Un autorretrato digital sensible que transforma mis datos personales en una experiencia visual y poética, fomentando la reflexión sobre la identidad.',
    role: 'Diseñadora UX/UI y Desarrolladora Frontend',
    team: 'Proyecto Individual (TFM)',
    tools: ['React', 'Tailwind', 'JavaScript', 'Design Thinking', 'Netlify', 'GitHub', 'User Testing', 'Figma', 'Data Visualization', 'GSAP'], 
    time: '5 meses (Mayo - Septiembre 2025)',
    learned: 'Aprendí a manejar eficientemente la librería React para crear una experiencia web compleja y sensible, dominando la gestión de estado y componentes.',
    media: [
      { type: 'image', src: DB_1 },
      { type: 'image', src: DB_2 },
      { type: 'image', src: DB_3 },
      { type: 'image', src: DB_4 },
      { type: 'image', src: DB_5 },
      { type: 'image', src: DB_7 },
      { type: 'image', src: DB_8 },
      { type: 'image', src: DB_9 },
      { type: 'image', src: DB_10 },
      { type: 'image', src: DB_11 },
      { type: 'image', src: DB_12 },
      { type: 'video', src: DB_13 }
    ],
    additionalText: 'Digital Bloom, es mi Trabajo de Fin de Máster para explorar cómo nuestra huella digital puede servir como un autorretrato sensible y artístico. El objetivo principal era superar la visión fría y fragmentada de la identidad online, creando una experiencia visual que invitara a la reflexión sobre la relación entre las personas, la tecnología y la privacidad de sus datos. Para llevarlo a cabo, se aplicó la metodología Design Thinking de forma iterativa. Se estructuró la información en tres niveles ("Deseo, Cuerpo y Rastro") y se procedió a diseñar y desarrollar un prototipo funcional de la página web utilizando React, el cual fue posteriormente validado y perfeccionado mediante pruebas directas con usuarios.',
    caseDetails: {
      problem: 'La huella digital suele percibirse de forma fría y fragmentada, sin un componente artístico o de reflexión personal.',
      options: 'Se evaluó desarrollar una app móvil o una web interactiva; también usar p5.js para visualización o React para la estructura.',
      decision: 'Se eligió React con validación mediante *pruebas directas con usuarios* para asegurar la usabilidad y el impacto emocional de la interfaz.',
      result: 'Se obtuvo un prototipo web funcional que transforma datos personales en una visualización poética y fue bien recibido en las validaciones, cumpliendo el objetivo artístico.',
    },
    links: [
      { label: 'Sitio Web', url: 'https://dig1talbl0om.netlify.app/' },
      { label: 'Repositorio en GitHub', url: 'https://github.com/13djune/DigitalBloom' },
      { label: 'Memoria del proyecto', url: 'https://drive.google.com/file/d/1exdZzUYDHvLMoS7g58NCVrZstfkEAQBw/view' }
    ]
  },
    {
      id: 2,
      title: 'TALSIE',
      description: 'Web que satisfaría las necesidades de una marca de productos.',
      role: 'Diseñadora y Desarrolladora Frontend ',
    team: 'Equipo de 5 personas',
    tools: ['HTML', 'CSS', 'JavaScript', 'Bootstrap', 'GitHub', 'Netlify'],
    time: '3 semanas (Enero 2024)',
    learned: 'Perfeccioné la implementación de menús *hamburguesa* responsivos funcionales, priorizando la accesibilidad en móvil.',
      media: [
        { type: 'image', src: talsie1 },
        { type: 'image', src: talsie2 },
        { type: 'image', src: talsie3 },
        { type: 'image', src: talsie4 },
      ],
      additionalText: 'Un sitio web que satisfaría las necesidades de una marca de un producto, con secciones como una galería de productos, un carrito de compras, información de contacto, etc. Hicimos uso de un framework de frontend como Bootstrap, lenguajes HTML+CSS+JS, el repositorio de Github y el programa Netlify a través del cual se sincronizará y publicará el sitio web, mi trabajo consistió en hacer el diseño principal para todas las secciones, la página de inicio y crear el menú de hamburguesa (funcional en responsive).',
      caseDetails: {
        problem: 'Crear una presencia digital completa para una marca de productos con las secciones esenciales de e-commerce de forma rápida y eficiente.',
        options: 'Se consideró usar CSS puro o un framework como Bootstrap; se optó por Bootstrap para acelerar el desarrollo de la estructura y responsividad.',
        decision: 'Se decidió usar **Bootstrap** y enfocar mi trabajo en el diseño principal y la **funcionalidad responsiva del menú** para garantizar una buena experiencia móvil.',
        result: 'Se lanzó una web funcional, alojada en Netlify, con una interfaz de marca coherente y un menú navegable en todos los dispositivos.',
      },
      links: [
      { label: 'Sitio Web', url: 'https://talsie.netlify.app'},
      { label: 'Repositorio en GitHub', url: 'https://github.com/13djune/TALSIE' }
    ]
    },
    {
      id: 3,
      title: 'ALPHEGOR',
      description: 'Web del proyecto de fin de carrera de una estudiante de diseño de moda.',
      role: 'Desarrolladora Web Frontend',
    team: 'Colaboración Individual (Cliente Externo)',
    tools: ['HTML', 'CSS', 'JavaScript', 'GitHub', 'Netlify'],
    time: '3 semanas (Junio 2024)',
    learned: 'Desarrollé la habilidad de traducir una identidad visual muy específica y futurista a código, manteniendo la coherencia de marca.',
      media: [
        { type: 'image', src: alphegor1 },
        { type: 'image', src: alphegor2 },
        { type: 'image', src: alphegor3 },
        { type: 'image', src: alphegor4 },
      ],
      additionalText: 'Alphegor es una marca de ropa inspirada en un tema futurista y diferente. Su propósito principal es proporcionar a los usuarios una experiencia inmersiva para explorar y comprender el mundo del que nació Alphegor. Se utilizaron habilidades y conocimientos de HTML+CSS+JS, el repositorio de Github y el programa Netlify a través del cual se sincronizará y publicará el sitio web. La versión responsiva del sitio web no fue creada. Junio de 2024, Madrid.',
      caseDetails: {
        problem: 'Crear una experiencia web altamente estética e inmersiva para el PFC de moda con un enfoque temático futurista en un plazo ajustado.',
        options: 'Se valoró un desarrollo full-stack o un enfoque *static-site* simple; se priorizó la experiencia visual sobre la complejidad funcional.',
        decision: 'Se decidió usar **HTML/CSS/JS** puros para tener control total sobre el diseño y la animación, dejando la **versión responsiva fuera del alcance** inicial.',
        result: 'Se entregó un sitio web con alta fidelidad al diseño conceptual futurista, que sirvió como un portafolio inmersivo para el proyecto de moda.',
      },
      links: [
      { label: 'Sitio Web', url: 'https://alphegor.netlify.app'},
      { label: 'Repositorio en GitHub', url: 'https://github.com/13djune/ALPHEGOR' }
    ] 
    },
    {
      id: 4,
      title: 'Serenyx',
      description: 'Una aplicación para abordar las necesidades de salud mental y gestión de emociones.',
      role: 'Diseñadora UX/UI Principal',
    team: 'Proyecto Individual (TFG)',
    tools: ['Figma', 'User Persona', 'Prototipado de alta fidelidad', 'Test de usabilidad', 'Design Thinking', 'Investigación de usuarios'],
    time: '5 meses (Diseño Conceptual y Prototipado, Junio 2024)',
    learned: 'Profundicé en el diseño de interfaces sensibles y accesibles para temas de salud mental, aplicando principios de psicología UX.',
      media: [
        { type: 'image', src: serenyx1 },
        { type: 'image', src: serenyx2 },
      ],
      additionalText: 'Su propósito principal es proporcionar a los usuarios una herramienta accesible para gestionar problemas cotidianos, aprender sobre ellos y fomentar una comunidad de apoyo. La aplicación está dirigida a personas que buscan complementar su bienestar mental con métodos psicológicos respaldados, aunque no pretende ser un sustituto de la terapia profesional. En un contexto donde un alto porcentaje de la población sufre de trastornos mentales como la depresión, Serenyx emerge como una solución práctica y accesible para mejorar la salud mental en la vida cotidiana. Junio de 2024, Madrid',
      caseDetails: {
        problem: 'Existe una alta prevalencia de problemas de salud mental y se necesita una herramienta digital, práctica y accesible para la gestión emocional diaria.',
        options: 'Se consideró una web *responsive* o una app nativa; se decidió por una aplicación para la inmediatez y el acceso a funciones nativas del móvil.',
        decision: 'Se priorizó el diseño de **accesibilidad y flujo de usuario** mediante la creación de un prototipo de alta fidelidad en **Figma** para validar la experiencia.',
        result: 'Se generó un prototipo navegable que establece las bases para una herramienta de apoyo mental viable, con un enfoque claro en la experiencia del usuario (UX).',
      },
      links: [
        { label: 'Prototipo en Figma', url: 'https://www.figma.com/proto/RsHiPGhnRaycwWS3IDocga/Serenyx_Bel%C3%A9nCastillo?page-id=18%3A792&node-id=467-5730&node-type=frame&viewport=322%2C195%2C0.14&t=Y5xe8BBK1T6q6KGO-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=467%3A5730&show-proto-sidebar=1'},
      ]
    },
    {
      id: 5,
      title: 'EN STOCK',
      description: 'Un spot de la revista "EN STOCK" que combina 3D y 2D.',
      role: 'Diseñadora Gráfica y Animadora 2D/3D',
    team: 'Proyecto Personal',
    tools: ['Cinema 4D', 'Adobe After Effects', 'Adobe Illustrator'],
    time: '5 días',
    learned: 'Adquirí soltura en la integración de elementos 3D complejos modelados en Cinema 4D dentro de una composición 2D animada en After Effects.',
      media: [
        { type: 'video', src: enstock },      ],
      additionalText: 'La revista está pensada para ser una colección, tratando diferentes preocupaciones que podemos tener en el mundo creativo o artístico, y al mismo tiempo usando un alimento que puede ser similar al tema. Este volumen trata sobre la incertidumbre y está vinculado al repollo morado.',
      caseDetails: {
        problem: 'Crear un *spot* visualmente atractivo que comunique el tema abstracto de la "Incertidumbre" a través del simbolismo del repollo morado y la dualidad 2D/3D.',
        options: 'Se evaluó usar animación *stop-motion* o animación digital; se eligió esta última para la flexibilidad y la integración de 3D.',
        decision: 'Se optó por la combinación de **Cinema 4D y After Effects** para lograr una estética dinámica que mezcla lo táctil (2D) con lo digital (3D).',
        result: 'Se produjo un *spot* de corta duración que capta la atención y comunica eficazmente el concepto y la identidad visual de la revista.',
      },
      link: null,
    },
    {
      id: 6,
      title: 'ESDMeet',
      description: 'Una plataforma digital para optimizar la comunicación y fortalecer la comunidad escolar.',
      role: 'Diseñadora UX/UI',
    team: 'Equipo de 5 personas',
    tools: ['Figma', 'User Research', 'Diagramas de Flujo', 'Prototipado', 'Design Thinking', 'Arquitectura de la Información', 'Pruebas de Usabilidad'],
    time: '3 meses (Fase de Diseño y Prototipado) (Febrero - Abril 2025)',
    learned: 'Practiqué el diseño de sistemas de información complejos, enfocándome en la arquitectura de la información (AI) para múltiples perfiles de usuario (estudiante/docente/admin).',
      media: [
        { type: 'image', src: ESDMeet1 },
        { type: 'image', src: ESDMeet2 },
        { type: 'image', src: ESDMeet3 },
        { type: 'image', src: ESDMeet4 }
      ],
      additionalText: 'Este proyecto propone mejorar la comunicación en la escuela mediante una plataforma interactiva que optimiza el flujo de información y facilita la interacción entre estudiantes, docentes y personal administrativo. Al eliminar barreras comunicativas, se busca fortalecer el sentido de comunidad, promover la colaboración y crear un entorno más accesible e inclusivo para todos.',
      caseDetails: {
        problem: 'La comunicación interna en la escuela es fragmentada, dificultando el acceso a información relevante y el sentido de comunidad entre los miembros.',
        options: 'Se evaluó usar plataformas existentes (ej. Slack) o diseñar una solución a medida; se eligió esta última para integrar funciones específicas de la escuela.',
        decision: 'Se decidió iniciar con una fase de **investigación de usuarios (*User Research*)** y el diseño de la **Arquitectura de la Información** para definir los flujos clave.',
        result: 'Se diseñó un prototipo en Figma con una AI clara, que resuelve los problemas de comunicación y sirve como base para el desarrollo futuro.',
      },
      links:[
        { label: 'Prototipo en Figma', url: 'https://www.figma.com/proto/uuG3XtsRYQMQWLjQuyCamD/Prototipo_MDI?page-id=0%3A1&node-id=1-5524&viewport=-80%2C3%2C0.09&t=QyauFSjmlurNHo3z-1&scaling=scale-down-width&content-scaling=fixed' },
      ] 
    },

  ];