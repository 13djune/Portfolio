import React, { useState, useEffect, useRef, useCallback } from 'react';
import '../../index.css'
const menuItems = [
  { id: 'about', label: 'Sobre mí', icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="Music-Headphones-Human--Streamline-Pixel" height="24" width="24" className='fill-current'>
    <desc>Music Headphones Human Streamline Icon: https://streamlinehq.com</desc>
    <title>music-headphones-human</title>
    <g>
      <path d="M22.28625 9.71625h1.1400000000000001v4.5675h-1.1400000000000001Z" stroke-width="0.75"></path>
      <path d="m7.428749999999999 9.71625 1.1400000000000001 0 0 -1.1475 1.1475 0 0 -1.1400000000000001 4.5675 0 0 1.1400000000000001 1.1475 0 0 -1.1400000000000001 3.4275 0 0 1.1400000000000001 1.1400000000000001 0 0 9.1425 1.1475 0 0 -2.2800000000000002 1.1400000000000001 0 0 -1.1475 -1.1400000000000001 0 0 -4.5675 1.1400000000000001 0 0 -1.1475 -1.1400000000000001 0 0 -4.5675 -1.1475 0 0 1.1400000000000001 -1.1400000000000001 0 0 -1.1400000000000001 -2.2874999999999996 0 0 -1.1475 -8.0025 0 0 1.1475 -1.1400000000000001 0 0 1.1400000000000001 -1.1400000000000001 0 0 2.2874999999999996 -1.1475 0 0 -3.4275 -1.1400000000000001 0 0 3.4275 -1.1400000000000001 0 0 1.1400000000000001 4.5675 0 0 1.1475z" stroke-width="0.75"></path>
      <path d="M18.85875 17.71125h1.1400000000000001v1.1475h-1.1400000000000001Z" stroke-width="0.75"></path>
      <path d="M18.85875 2.8537500000000002h1.1400000000000001v1.1475h-1.1400000000000001Z" stroke-width="0.75"></path>
      <path d="M17.71125 15.431249999999999h1.1475v1.1400000000000001h-1.1475Z" stroke-width="0.75"></path>
      <path d="M17.71125 11.99625h1.1475v2.2874999999999996h-1.1475Z" stroke-width="0.75"></path>
      <path d="M17.71125 1.71375h1.1475v1.1400000000000001h-1.1475Z" stroke-width="0.75"></path>
      <path d="M8.568750000000001 18.85875V21.15h-2.2800000000000002v1.1400000000000001h-2.2874999999999996v1.1400000000000001h18.285v-1.1400000000000001h-2.2874999999999996V21.15h-2.2874999999999996v-1.1475h1.1475v-1.1400000000000001Zm8.0025 3.4275h-4.5675V21.15h-2.2874999999999996v-1.1475H16.575000000000003Z" stroke-width="0.75"></path>
      <path d="M14.283750000000001 16.57125h3.4275v1.1400000000000001h-3.4275Z" stroke-width="0.75"></path>
      <path d="M13.143749999999999 15.431249999999999h1.1400000000000001v1.1400000000000001h-1.1400000000000001Z" stroke-width="0.75"></path>
      <path d="M12.00375 11.99625h1.1400000000000001v2.2874999999999996h-1.1400000000000001Z" stroke-width="0.75"></path>
      <path d="M12.00375 8.568750000000001h2.2800000000000002v1.1475h-2.2800000000000002Z" stroke-width="0.75"></path>
      <path d="M8.568750000000001 9.71625h1.1475v4.5675h-1.1475Z" stroke-width="0.75"></path>
      <path d="M7.428749999999999 0.57375h10.2825v1.1400000000000001H7.428749999999999Z" stroke-width="0.75"></path>
      <path d="M7.428749999999999 17.71125h1.1400000000000001v1.1475h-1.1400000000000001Z" stroke-width="0.75"></path>
      <path d="M7.428749999999999 14.283750000000001h1.1400000000000001v1.1475h-1.1400000000000001Z" stroke-width="0.75"></path>
      <path d="m2.86125 15.431249999999999 0 1.1400000000000001 3.4275 0 0 1.1400000000000001 1.1400000000000001 0 0 -2.2800000000000002 -4.5675 0z" stroke-width="0.75"></path>
      <path d="M6.28875 1.71375h1.1400000000000001v1.1400000000000001h-1.1400000000000001Z" stroke-width="0.75"></path>
      <path d="M5.14125 2.8537500000000002h1.1475v1.1475h-1.1475Z" stroke-width="0.75"></path>
      <path d="M4.00125 9.71625h1.1400000000000001v1.1400000000000001h-1.1400000000000001Z" stroke-width="0.75"></path>
      <path d="M2.86125 10.85625h1.1400000000000001v2.2874999999999996h-1.1400000000000001Z" stroke-width="0.75"></path>
      <path d="M1.71375 14.283750000000001h1.1475v1.1475h-1.1475Z" stroke-width="0.75"></path>
      <path d="M1.71375 8.568750000000001h1.1475v1.1475h-1.1475Z" stroke-width="0.75"></path>
      <path d="M0.57375 9.71625h1.1400000000000001v4.5675H0.57375Z" stroke-width="0.75"></path>
    </g>
  </svg> },
  { id: 'projects', label: 'Proyectos', icon:<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="Video-Movies-Vintage-Tv-2--Streamline-Pixel" className='fill-current' height="24" width="24">
    <desc>Video Movies Vintage Tv 2 Streamline Icon: https://streamlinehq.com</desc>
    <title>video-movies-vintage-tv-2</title>
    <g>
      <path d="M22.86 1.1400000000000001H24v14.857499999999998h-1.1400000000000001Z" stroke-width="0.75"></path>
      <path d="m1.1475 15.997499999999999 0 1.1475 3.4275 0 0 2.2800000000000002 1.1400000000000001 0 0 -2.2800000000000002 1.1400000000000001 0 0 2.2800000000000002 1.1475 0 0 -2.2800000000000002 7.995 0 0 2.2800000000000002 1.1475 0 0 -2.2800000000000002 1.1400000000000001 0 0 2.2800000000000002 1.1475 0 0 -2.2800000000000002 3.4275 0 0 -1.1475 -21.7125 0z" stroke-width="0.75"></path>
      <path d="m19.4325 22.8525 -1.1475 0 0 1.1475 2.2874999999999996 0 0 -4.574999999999999 -1.1400000000000001 0 0 3.4275z" stroke-width="0.75"></path>
      <path d="M18.285 13.71h3.4275v1.1475h-3.4275Z" stroke-width="0.75"></path>
      <path d="M18.285 11.43h3.4275v1.1400000000000001h-3.4275Z" stroke-width="0.75"></path>
      <path d="M18.285 6.855v3.4275h3.4275V6.855Zm2.2874999999999996 2.2874999999999996h-1.1400000000000001v-1.1475h1.1400000000000001Z" stroke-width="0.75"></path>
      <path d="M18.285 2.2874999999999996v3.4275h3.4275V2.2874999999999996Zm2.2874999999999996 2.2800000000000002h-1.1400000000000001V3.4275h1.1400000000000001Z" stroke-width="0.75"></path>
      <path d="M17.145 19.424999999999997h1.1400000000000001v3.4275h-1.1400000000000001Z" stroke-width="0.75"></path>
      <path d="M15.997499999999999 3.4275h-1.1400000000000001V2.2874999999999996H4.574999999999999v1.1400000000000001H3.4275v1.1400000000000001H2.2874999999999996v8.0025h1.1400000000000001v1.1400000000000001H4.574999999999999v1.1475h10.2825v-1.1475h1.1400000000000001v-1.1400000000000001h1.1475V4.5675h-1.1475Zm0 4.5675h-1.1400000000000001V6.855h-1.1400000000000001V5.715h-1.1475v1.1400000000000001h-1.1400000000000001v1.1400000000000001h-1.1400000000000001v1.1475h-1.1475v-1.1475h-1.1400000000000001v2.2874999999999996h1.1400000000000001v1.1475h1.1475v-1.1475h1.1400000000000001v-1.1400000000000001h1.1400000000000001v-1.1475h1.1475v1.1475h1.1400000000000001v1.1400000000000001h1.1400000000000001v1.1475h-1.1400000000000001v-1.1475h-1.1400000000000001v-1.1400000000000001h-1.1475v1.1400000000000001h-1.1400000000000001v1.1475h-1.1400000000000001v1.1400000000000001h-1.1475v-1.1400000000000001h-1.1400000000000001v-1.1475H6.855v-2.2874999999999996H5.715v1.1475H4.574999999999999v1.1400000000000001H3.4275v-1.1400000000000001H4.574999999999999v-1.1475h1.1400000000000001V6.855h1.1400000000000001V4.5675H5.715v1.1475H4.574999999999999v1.1400000000000001H3.4275V5.715H4.574999999999999V4.5675h1.1400000000000001V3.4275h1.1400000000000001v1.1400000000000001h1.1475v2.2874999999999996h1.1400000000000001v1.1400000000000001h1.1475V6.855h1.1400000000000001V5.715h1.1400000000000001V4.5675h1.1475v1.1475h1.1400000000000001v1.1400000000000001h1.1400000000000001Z" stroke-width="0.75"></path>
      <path d="M6.855 6.855h1.1475v1.1400000000000001H6.855Z" stroke-width="0.75"></path>
      <path d="M5.715 19.424999999999997h1.1400000000000001v3.4275H5.715Z" stroke-width="0.75"></path>
      <path d="m4.574999999999999 19.424999999999997 -1.1475 0 0 4.574999999999999 2.2874999999999996 0 0 -1.1475 -1.1400000000000001 0 0 -3.4275z" stroke-width="0.75"></path>
      <path d="m1.1475 2.2874999999999996 1.1400000000000001 0 0 -1.1475 20.572499999999998 0 0 -1.1400000000000001L1.1475 0l0 1.1400000000000001 -1.1475 0 0 14.857499999999998 1.1475 0 0 -13.71z" stroke-width="0.75"></path>
    </g>
  </svg> },
  { id: 'contact', label: 'Contacto', icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="Mobile-Phone--Streamline-Pixel" className='fill-current' height="24" width="24">
    <desc>Mobile Phone Streamline Icon: https://streamlinehq.com</desc>
    <title>mobile-phone</title>
    <g>
      <path d="M17.715 4.5675h1.1400000000000001v18.285h-1.1400000000000001Z" stroke-width="0.75"></path>
      <path d="M6.285 22.8525h11.43V24H6.285Z" stroke-width="0.75"></path>
      <path d="M15.4275 15.997499999999999h1.1475v1.1400000000000001h-1.1475Z" stroke-width="0.75"></path>
      <path d="M15.4275 13.71h1.1475v1.1400000000000001h-1.1475Z" stroke-width="0.75"></path>
      <path d="M14.287500000000001 20.565h2.2874999999999996v1.1475h-2.2874999999999996Z" stroke-width="0.75"></path>
      <path d="M14.287500000000001 18.285h2.2874999999999996v1.1400000000000001h-2.2874999999999996Z" stroke-width="0.75"></path>
      <path d="M7.4325 5.7075000000000005v6.862500000000001H16.575000000000003V5.7075000000000005Zm5.715 2.2874999999999996H12v1.1475h-1.1400000000000001v1.1400000000000001h-1.1475v1.1400000000000001h-1.1400000000000001V6.855h4.574999999999999Z" stroke-width="0.75"></path>
      <path d="m14.287500000000001 14.850000000000001 -1.1400000000000001 0 0 -1.1400000000000001 -2.2874999999999996 0 0 1.1400000000000001 -1.1475 0 0 1.1475 1.1475 0 0 1.1400000000000001 2.2874999999999996 0 0 -1.1400000000000001 1.1400000000000001 0 0 -1.1475z" stroke-width="0.75"></path>
      <path d="M10.86 20.565h2.2874999999999996v1.1475h-2.2874999999999996Z" stroke-width="0.75"></path>
      <path d="M10.86 18.285h2.2874999999999996v1.1400000000000001h-2.2874999999999996Z" stroke-width="0.75"></path>
      <path d="M7.4325 20.565h2.2800000000000002v1.1475H7.4325Z" stroke-width="0.75"></path>
      <path d="M7.4325 18.285h2.2800000000000002v1.1400000000000001H7.4325Z" stroke-width="0.75"></path>
      <path d="M7.4325 15.997499999999999h1.1400000000000001v1.1400000000000001H7.4325Z" stroke-width="0.75"></path>
      <path d="M7.4325 13.71h1.1400000000000001v1.1400000000000001H7.4325Z" stroke-width="0.75"></path>
      <path d="M6.285 0h1.1475v1.1400000000000001H6.285Z" stroke-width="0.75"></path>
      <path d="m6.285 4.5675 11.43 0 0 -1.1400000000000001 -9.1425 0 0 -2.2874999999999996 -1.1400000000000001 0 0 2.2874999999999996 -1.1475 0 0 -2.2874999999999996 -1.1400000000000001 0 0 21.7125 1.1400000000000001 0 0 -18.285z" stroke-width="0.75"></path>
    </g>
  </svg> },
];
const Sidebar = () => {
    const [active, setActive] = useState('about');
    const [menuOpen, setMenuOpen] = useState(false);
    const [showLabels, setShowLabels] = useState(false);

    const activeRef = useRef(active);
    const observerRef = useRef(null);
    const retryTimeoutRef = useRef(null);
  
    useEffect(() => {
      activeRef.current = active;
    }, [active]);
  
    const findSections = () =>
      menuItems.map(({ id }) => ({ id, el: document.getElementById(id) })).filter((s) => s.el);
  
    const initObserver = useCallback(() => {
      const sections = findSections().map((s) => s.el);
      if (!sections.length) return false;
  
      const detectionOffset = 100;
      const options = {
        rootMargin: `-${detectionOffset}px 0px -50% 0px`,
        threshold: 0,
      };
  
      const observer = new IntersectionObserver((entries) => {
        let bestMatchId = null;
        const intersecting = entries.filter((e) => e.isIntersecting);
        if (intersecting.length > 0) {
          const sorted = intersecting.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
          bestMatchId = sorted[sorted.length - 1].target.id;
        }
        if (window.scrollY < 5) bestMatchId = menuItems[0].id;
        if (bestMatchId && bestMatchId !== activeRef.current) {
          setActive(bestMatchId);
        }
      }, options);
  
      sections.forEach((s) => observer.observe(s));
      observerRef.current = observer;
      return true;
    }, []);
  
    useEffect(() => {
      let clean = false;
      if (window.scrollY < 5) setActive('about');
  
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
  
      const started = initObserver();
      if (!started) {
        retryTimeoutRef.current = setTimeout(() => {
          if (!clean) initObserver();
        }, 500);
      }
  
      return () => {
        clean = true;
        if (observerRef.current) observerRef.current.disconnect();
        if (retryTimeoutRef.current) clearTimeout(retryTimeoutRef.current);
      };
    }, [initObserver]);
  
    return (
      <>
        {/* === SVG FILTER (GOOEY EFFECT) === */}
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" style={{ display: 'none' }}>
          <defs>
            <filter id="goo">
              <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="8" />
              <feColorMatrix
                in="blur"
                mode="matrix"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
                result="goo"
              />
              <feComposite in2="goo" in="SourceGraphic" result="mix" />
            </filter>
          </defs>
        </svg>
  
        {/* ----------------------------- */}
        {/* 1. VERSIÓN MÓVIL (HAMBURGUESA) */}
        {/* ----------------------------- */}
        <nav className="gooey-sidebar mobile-menu" style={{ filter: 'url(#goo)' }}>
          <input
            type="checkbox"
            id="menu-open"
            className="menu-open"
            checked={menuOpen}
            onChange={() => setMenuOpen(!menuOpen)}
          />
          <label htmlFor="menu-open" className="menu-open-button">
            <svg className="hamburger-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>

            <svg className="close-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </label>
  
          {menuItems.map((item, index) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`menu-item ${active === item.id ? 'active' : ''}`} 
              style={{
                transform: menuOpen ? `translate3d(0, ${95 * (index + 1)}px, 0)` : 'translate3d(0,0,0)', 
              }}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
                setActive(item.id);
                setMenuOpen(false); 
              }}
            >
              <div className="icon">{item.icon}</div>
              <div className="label">{item.label}</div>
            </a>
          ))}
        </nav>

        {/* ----------------------------- */}
        {/* 2. VERSIÓN DESKTOP (ASIDE) */}
        {/* ----------------------------- */}
        <aside
            className="desktop-sidebar" 
            onMouseEnter={() => setShowLabels(true)}
            onMouseLeave={() => setShowLabels(false)}
        >
            {menuItems.map((item) => (
                <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={(e) => {
                        e.preventDefault();
                        document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
                        setActive(item.id); 
                    }}
                    className={`font-bit text-lg flex items-center px-4 py-2 rounded-xl transition-colors duration-300
                        ${active === item.id 
                            ? 'bg-accent text-text' 
                            : 'text-text hover:bg-[#3fe2f720]'}
                    `}
                >
                    {item.icon} 
                    
                    <span
                        className={`overflow-hidden transition-all duration-300 ease-in-out whitespace-nowrap
                            ${showLabels ? 'max-w-[150px] opacity-100 ml-3' : 'max-w-0 opacity-0'}
                        pointer-events-none`}
                    >
                        {item.label}
                    </span>
                </a>
            ))}
        </aside>
      </>
    );
  };
  
  export default Sidebar;