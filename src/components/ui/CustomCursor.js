import React, { useEffect, useRef, useCallback } from 'react';

const CustomCursor = () => {
    const cursorPos = useRef({ x: 0, y: 0 });
    
    const cursorBorderPos = useRef({ x: 0, y: 0 }); 

    const cursorRef = useRef(null);
    const cursorBorderRef = useRef(null);

    // Velocidad de movimiento del borde (suavizado). ¡Valor más alto para más arrastre!
    const easting = 30; 


    const updateCursorPosition = useCallback((event) => {
        const x = event.clientX;
        const y = event.clientY;
        
        cursorPos.current = { x, y };

        if (cursorRef.current) {
            cursorRef.current.style.transform = 
                `translate(${x - cursorRef.current.offsetWidth / 2}px, ${y - cursorRef.current.offsetHeight / 2}px)`;
        }
    }, []);

    const animateCursorBorder = useCallback(() => {
        let targetPos = cursorPos.current;
        let currentBorderPos = cursorBorderPos.current; 
        
        // CÁLCULO DEL SUAVIZADO (Easting)
        const newX = currentBorderPos.x + (targetPos.x - currentBorderPos.x) / easting;
        const newY = currentBorderPos.y + (targetPos.y - currentBorderPos.y) / easting;

        cursorBorderPos.current = { x: newX, y: newY };

        if (cursorBorderRef.current) {
            cursorBorderRef.current.style.transform = 
                `translate(${newX - cursorBorderRef.current.offsetWidth / 2}px, ${newY - cursorBorderRef.current.offsetHeight / 2}px)`;
        }
        
        requestAnimationFrame(animateCursorBorder);
    }, []); 

    const handleHover = useCallback((event) => {
        const target = event.target;
        
        let currentElement = target;
        while (currentElement) {
            if (currentElement.classList && currentElement.classList.contains('cursor-ignore')) {
                return; 
            }
            currentElement = currentElement.parentElement;
        }

        const isInteractive = target.classList.contains('info') || 
                              target.classList.contains('soci') || 
                              target.classList.contains('card') || 
                              target.tagName === 'A' || 
                              target.tagName === 'BUTTON';
        
        if (cursorBorderRef.current) {
            if (event.type === 'mouseover' && isInteractive) {
                cursorBorderRef.current.style.mixBlendMode = 'difference';
                cursorBorderRef.current.style.background = '#3ed9a6';
                cursorBorderRef.current.style.width = '30px'; 
                cursorBorderRef.current.style.height = '30px';
            } else if (event.type === 'mouseout') {
                cursorBorderRef.current.style.mixBlendMode = 'normal';
                cursorBorderRef.current.style.background = `radial-gradient(circle, #3ed9a6 10%, rgba(255, 255, 255, 0) 60%)`;
                cursorBorderRef.current.style.width = '70px'; 
                cursorBorderRef.current.style.height = '70px';
            }
        }
    }, []);



    useEffect(() => {
        document.addEventListener("mousemove", updateCursorPosition);
        document.addEventListener("mouseover", handleHover);
        document.addEventListener("mouseout", handleHover);

        const animationFrameId = requestAnimationFrame(animateCursorBorder);
        
        return () => {
            document.removeEventListener("mousemove", updateCursorPosition);
            document.removeEventListener("mouseover", handleHover);
            document.removeEventListener("mouseout", handleHover);
            cancelAnimationFrame(animationFrameId);
        };
    }, [updateCursorPosition, handleHover, animateCursorBorder]);


    return (
        <>
            <div id="cursor" ref={cursorRef} />
            <div id="cursor-border" ref={cursorBorderRef} />
        </>
    );
};

export default CustomCursor;