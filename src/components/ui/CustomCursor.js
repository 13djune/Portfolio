import React, { useEffect, useRef, useCallback } from 'react';

const CustomCursor = () => {
    // 1. Referencia para la posición ACTUAL del ratón (antes era useState)
    const cursorPos = useRef({ x: 0, y: 0 });
    
    // 2. Referencia para la posición del borde (suavizada)
    const cursorBorderPos = useRef({ x: 0, y: 0 }); 

    // 3. Referencias a los elementos del DOM.
    const cursorRef = useRef(null);
    const cursorBorderRef = useRef(null);

    // Velocidad de movimiento del borde (suavizado). ¡Valor más alto para más arrastre!
    const easting = 25; 

    // --- Funciones de Manejo ---

    // La posición del ratón se guarda en la referencia, NO causa re-render de React
    const updateCursorPosition = useCallback((event) => {
        const x = event.clientX;
        const y = event.clientY;
        
        // Actualiza la posición del ratón en la referencia
        cursorPos.current = { x, y };

        // Mueve el punto pequeño INMEDIATAMENTE
        if (cursorRef.current) {
            cursorRef.current.style.transform = 
                `translate(${x - cursorRef.current.offsetWidth / 2}px, ${y - cursorRef.current.offsetHeight / 2}px)`;
        }
    }, []);

    // Bucle recursivo para la animación suave del borde
    const animateCursorBorder = useCallback(() => {
        // Lee la posición actual de ambas referencias
        let targetPos = cursorPos.current;
        let currentBorderPos = cursorBorderPos.current; 
        
        // CÁLCULO DEL SUAVIZADO (Easting)
        const newX = currentBorderPos.x + (targetPos.x - currentBorderPos.x) / easting;
        const newY = currentBorderPos.y + (targetPos.y - currentBorderPos.y) / easting;

        // Almacenar el nuevo valor en la referencia
        cursorBorderPos.current = { x: newX, y: newY };

        // Mover el borde (manipulación directa del DOM)
        if (cursorBorderRef.current) {
            cursorBorderRef.current.style.transform = 
                `translate(${newX - cursorBorderRef.current.offsetWidth / 2}px, ${newY - cursorBorderRef.current.offsetHeight / 2}px)`;
        }
        
        // Llamada recursiva para mantener la animación
        requestAnimationFrame(animateCursorBorder);
    }, []); // ¡SIN dependencias! Esto asegura que el bucle es estable y no se recrea.

    // Maneja los efectos de 'hover' en elementos interactivos (sin cambios)
    const handleHover = useCallback((event) => {
        const target = event.target;
        
        // **NUEVA COMPROBACIÓN:** Ignorar si el elemento o uno de sus padres tiene 'cursor-ignore'
        let currentElement = target;
        while (currentElement) {
            if (currentElement.classList && currentElement.classList.contains('cursor-ignore')) {
                return; // Ignorar el evento si encontramos la clase de exclusión
            }
            // Sube al padre para verificar la delegación
            currentElement = currentElement.parentElement;
        }

        // Elementos interactivos que SÍ deben activar el cursor personalizado
        const isInteractive = target.classList.contains('info') || 
                              target.classList.contains('soci') || 
                              target.classList.contains('card') || 
                              target.tagName === 'A' || 
                              target.tagName === 'BUTTON';
        
        if (cursorBorderRef.current) {
            if (event.type === 'mouseover' && isInteractive) {
                // ... (lógica de estilos para hover)
                cursorBorderRef.current.style.mixBlendMode = 'difference';
                cursorBorderRef.current.style.background = '#3ed9a6';
                cursorBorderRef.current.style.width = '30px'; 
                cursorBorderRef.current.style.height = '30px';
            } else if (event.type === 'mouseout') {
                // ... (lógica para restaurar estilos)
                cursorBorderRef.current.style.mixBlendMode = 'normal';
                cursorBorderRef.current.style.background = `radial-gradient(circle, #3ed9a6 10%, rgba(255, 255, 255, 0) 60%)`;
                cursorBorderRef.current.style.width = '70px'; 
                cursorBorderRef.current.style.height = '70px';
            }
        }
    }, []);


    // --- Hook de Efectos Secundarios ('useEffect') ---

    useEffect(() => {
        // Al montar el componente:
        document.addEventListener("mousemove", updateCursorPosition);
        document.addEventListener("mouseover", handleHover);
        document.addEventListener("mouseout", handleHover);

        // Iniciar la animación recursiva
        const animationFrameId = requestAnimationFrame(animateCursorBorder);
        
        // Función de limpieza 
        return () => {
            document.removeEventListener("mousemove", updateCursorPosition);
            document.removeEventListener("mouseover", handleHover);
            document.removeEventListener("mouseout", handleHover);
            cancelAnimationFrame(animationFrameId);
        };
    }, [updateCursorPosition, handleHover, animateCursorBorder]);

    // --- Renderizado ---

    return (
        <>
            <div id="cursor" ref={cursorRef} />
            <div id="cursor-border" ref={cursorBorderRef} />
        </>
    );
};

export default CustomCursor;