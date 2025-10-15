import React, { useEffect, useRef, useState } from 'react';
import { Icon } from '@iconify/react';
import gsap from 'gsap';

const SkillCircle = ({
  icon,
  percent = 75,
  size = 120,
  color = '#FFCC00',
  label = 'Habilidad'
}) => {
  const circleRef = useRef(null);
  const containerRef = useRef(null);
  const [triggered, setTriggered] = useState(false);

  const strokeWidth = 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    const container = containerRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggered) {
          setTriggered(true);
        }
      },
      { threshold: 0.5 }
    );

    if (container) {
      observer.observe(container);
    }

    return () => {
      if (container) {
        observer.unobserve(container);
      }
    };
  }, [triggered]);

  useEffect(() => {
    if (triggered && circleRef.current) {
      gsap.fromTo(
        circleRef.current,
        { strokeDashoffset: circumference },
        {
          strokeDashoffset: circumference * (1 - percent / 100),
          duration: 1.2,
          ease: 'power2.out',
        }
      );
    }
  }, [triggered, circumference, percent]);

  return (
    <div ref={containerRef} className="flex flex-col items-center m-4">
      <div
        className="relative flex items-center justify-center"
        style={{ width: size, height: size }}
      >
        <svg width={size} height={size}>
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#d9d9d9"
            strokeWidth={strokeWidth}
            fill="none"
          />
          <circle
            ref={circleRef}
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={color}
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={circumference}
            strokeLinecap="round"
          />
        </svg>
  
        {typeof icon === "string" && icon.startsWith("pixelarticons:") ? (
  // 👉 icono de librería
  <Icon
    icon={icon}
    width={size * 0.4}
    height={size * 0.4}
    className="absolute text-text"
  />
) : (
  // 👉 cualquier otro string (URL, base64) o import de imagen
  <img
    src={icon}
    alt={label}
    className="absolute object-contain z-10"
    style={{ width: size * 0.4, height: size * 0.4 }}
  />
)}



      </div>
  
      <span className="mt-2 text-lg text-text text-center font-bit font-semibold">{label}</span>
      <span className="text-md font-bit text-gray-600 dark:text-gray-400 mt-1">{percent}%</span>
    </div>
  );
  
};

export default SkillCircle;