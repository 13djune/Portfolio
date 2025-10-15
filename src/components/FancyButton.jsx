import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function FancyButton({ label = 'Get GSAP', icon, onClick }) {
    const buttonRef = useRef(null);
  const flairRef = useRef(null);
  const xSet = useRef(null);
  const ySet = useRef(null);

  useEffect(() => {
    if (!buttonRef.current || !flairRef.current) return;

    const button = buttonRef.current;
    const flair = flairRef.current;

    xSet.current = gsap.quickSetter(flair, 'xPercent');
    ySet.current = gsap.quickSetter(flair, 'yPercent');

    const getXY = (e) => {
      const { left, top, width, height } = button.getBoundingClientRect();

      const x = gsap.utils.pipe(
        gsap.utils.mapRange(0, width, 0, 100),
        gsap.utils.clamp(0, 100)
      )(e.clientX - left);

      const y = gsap.utils.pipe(
        gsap.utils.mapRange(0, height, 0, 100),
        gsap.utils.clamp(0, 100)
      )(e.clientY - top);

      return { x, y };
    };

    const handleEnter = (e) => {
      const { x, y } = getXY(e);
      xSet.current(x);
      ySet.current(y);

      gsap.to(flair, {
        scale: 1,
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    const handleLeave = (e) => {
      const { x, y } = getXY(e);
      gsap.killTweensOf(flair);

      gsap.to(flair, {
        xPercent: x > 90 ? x + 20 : x < 10 ? x - 20 : x,
        yPercent: y > 90 ? y + 20 : y < 10 ? y - 20 : y,
        scale: 0,
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    const handleMove = (e) => {
      const { x, y } = getXY(e);
      gsap.to(flair, {
        xPercent: x,
        yPercent: y,
        duration: 0.4,
        ease: 'power2',
      });
    };

    button.addEventListener('mouseenter', handleEnter);
    button.addEventListener('mouseleave', handleLeave);
    button.addEventListener('mousemove', handleMove);

    return () => {
      button.removeEventListener('mouseenter', handleEnter);
      button.removeEventListener('mouseleave', handleLeave);
      button.removeEventListener('mousemove', handleMove);
    };
  }, []);

  return (
<button
  ref={buttonRef}
  onClick={onClick}
  className="pixelbutton group overflow-hidden"
>
  <span
    ref={flairRef}
    className="absolute inset-0 pointer-events-none scale-0 origin-top-left will-change-transform"
  >
    <span className="pointer-events-none absolute left-1/2 top-1/2 w-[150%] aspect-square bg-secondary rounded-full transform -translate-x-1/2 -translate-y-1/2" />
  </span>

  {icon && <span className="relative z-10">{icon}</span>}
  <span className="relative z-10 pointer-events-none">{label}</span>
</button>


  );
}
