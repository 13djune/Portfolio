
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


export const projectsData = [
  {
    id: 1,
    title: 'Digital Bloom',
    description: 'Un autorretrato digital sensible que transforma mis datos personales en una experiencia visual y poética, fomentando la reflexión sobre la identidad.',
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
      media: [
        { type: 'image', src: talsie1 },
        { type: 'image', src: talsie2 },
        { type: 'image', src: talsie3 },
        { type: 'image', src: talsie4 },
      ],
      additionalText: 'Un sitio web que satisfaría las necesidades de una marca de un producto, con secciones como una galería de productos, un carrito de compras, información de contacto, etc. Hicimos uso de un framework de frontend como Bootstrap, lenguajes HTML+CSS+JS, el repositorio de Github y el programa Netlify a través del cual se sincronizará y publicará el sitio web, mi trabajo consistió en hacer el diseño principal para todas las secciones, la página de inicio y crear el menú de hamburguesa (funcional en responsivo). Enero de 2024, Madrid.',
      links: [
      { label: 'Sitio Web', url: 'https://talsie.netlify.app'},
      { label: 'Repositorio en GitHub', url: 'https://github.com/13djune/TALSIE' }
    ]
    },
    {
      id: 3,
      title: 'ALPHEGOR',
      description: 'Web del proyecto de fin de carrera de una estudiante de diseño de moda.',
      media: [
        { type: 'image', src: alphegor1 },
        { type: 'image', src: alphegor2 },
        { type: 'image', src: alphegor3 },
        { type: 'image', src: alphegor4 },
      ],
      additionalText: 'Alphegor es una marca de ropa inspirada en un tema futurista y diferente. Su propósito principal es proporcionar a los usuarios una experiencia inmersiva para explorar y comprender el mundo del que nació Alphegor. Se utilizaron habilidades y conocimientos de HTML+CSS+JS, el repositorio de Github y el programa Netlify a través del cual se sincronizará y publicará el sitio web. La versión responsiva del sitio web no fue creada. Junio de 2024, Madrid.',
      links: [
      { label: 'Sitio Web', url: 'https://alphegor.netlify.app'},
      { label: 'Repositorio en GitHub', url: 'https://github.com/13djune/ALPHEGOR' }
    ] 
    },
    {
      id: 4,
      title: 'Serenyx',
      description: 'Una aplicación para abordar las necesidades de salud mental y gestión de emociones.',
      media: [
        { type: 'image', src: serenyx1 },
        { type: 'image', src: serenyx2 },
      ],
      additionalText: 'Su propósito principal es proporcionar a los usuarios una herramienta accesible para gestionar problemas cotidianos, aprender sobre ellos y fomentar una comunidad de apoyo. La aplicación está dirigida a personas que buscan complementar su bienestar mental con métodos psicológicos respaldados, aunque no pretende ser un sustituto de la terapia profesional. En un contexto donde un alto porcentaje de la población sufre de trastornos mentales como la depresión, Serenyx emerge como una solución práctica y accesible para mejorar la salud mental en la vida cotidiana. Junio de 2024, Madrid',
      links: [
        { label: 'Prototipo en Figma', url: 'https://www.figma.com/proto/RsHiPGhnRaycwWS3IDocga/Serenyx_Bel%C3%A9nCastillo?page-id=18%3A792&node-id=467-5730&node-type=frame&viewport=322%2C195%2C0.14&t=Y5xe8BBK1T6q6KGO-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=467%3A5730&show-proto-sidebar=1'},
      ]
    },
    {
      id: 5,
      title: 'EN STOCK',
      description: 'Un spot de la revista "EN STOCK" que combina 3D y 2D.',
      media: [
        { type: 'video', src: enstock },      ],
      additionalText: 'La revista está pensada para ser una colección, tratando diferentes preocupaciones que podemos tener en el mundo creativo o artístico, y al mismo tiempo usando un alimento que puede ser similar al tema. Este volumen trata sobre la incertidumbre y está vinculado al repollo morado.',
      link: null,
    },
    {
      id: 6,
      title: 'ESDMeet',
      description: 'Una plataforma digital para optimizar la comunicación y fortalecer la comunidad escolar.',
      media: [
        { type: 'image', src: ESDMeet1 },
        { type: 'image', src: ESDMeet2 },
        { type: 'image', src: ESDMeet3 },
        { type: 'image', src: ESDMeet4 }
      ],
      additionalText: 'Este proyecto propone mejorar la comunicación en la escuela mediante una plataforma interactiva que optimiza el flujo de información y facilita la interacción entre estudiantes, docentes y personal administrativo. Al eliminar barreras comunicativas, se busca fortalecer el sentido de comunidad, promover la colaboración y crear un entorno más accesible e inclusivo para todos.',
      links:[
        { label: 'Prototipo en Figma', url: 'https://www.figma.com/proto/uuG3XtsRYQMQWLjQuyCamD/Prototipo_MDI?page-id=0%3A1&node-id=1-5524&viewport=-80%2C3%2C0.09&t=QyauFSjmlurNHo3z-1&scaling=scale-down-width&content-scaling=fixed' },
      ] 
    },

  ];