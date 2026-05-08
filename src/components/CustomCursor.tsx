import React, { useEffect, useState, useRef } from 'react';

const CustomCursor: React.FC = () => {
  const [isPointer, setIsPointer] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        // Offset by half of 6px (w-1.5)
        dotRef.current.style.transform = `translate3d(${e.clientX - 3}px, ${e.clientY - 3}px, 0)`;
      }
    };

    const animateRing = () => {
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.15;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.15;
      
      if (ringRef.current) {
        // The offsets are handled by classes, so we just move to raw coordinates
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`;
      }
      requestAnimationFrame(animateRing);
    };

    const onMouseDown = () => setIsPointer(true);
    const onMouseUp = () => setIsPointer(false);
    const onMouseEnter = () => setIsHidden(false);
    const onMouseLeave = () => setIsHidden(true);

    const handleHover = () => {
      const hoverable = document.querySelectorAll('a, button, [role="button"], .group');
      hoverable.forEach((el) => {
        el.addEventListener('mouseenter', () => setIsPointer(true));
        el.addEventListener('mouseleave', () => setIsPointer(false));
      });
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('mouseenter', onMouseEnter);
    window.addEventListener('mouseleave', onMouseLeave);
    
    const rafId = requestAnimationFrame(animateRing);
    handleHover();

    // Initial check for mobile
    if (window.matchMedia('(pointer: coarse)').matches) {
       setIsHidden(true);
    }

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('mouseenter', onMouseEnter);
      window.removeEventListener('mouseleave', onMouseLeave);
      cancelAnimationFrame(rafId);
    };
  }, []);

  if (isHidden) return null;

  return (
    <>
      <div 
        ref={dotRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-accent-spring rounded-full pointer-events-none z-[9999] transition-transform duration-0"
        style={{ transform: 'translate3d(-100px, -100px, 0)', mixBlendMode: 'difference' }}
      />
      <div 
        ref={ringRef}
        className={`fixed top-0 left-0 border border-accent-spring/50 rounded-full pointer-events-none z-[9998] transition-all duration-300 ease-out flex items-center justify-center ${
          isPointer ? 'w-14 h-14 -ml-7 -mt-7 bg-accent-spring/5 border-accent-spring' : 'w-9 h-9 -ml-[18px] -mt-[18px]'
        }`}
        style={{ transform: 'translate3d(-100px, -100px, 0)' }}
      />
    </>
  );
};

export default CustomCursor;
