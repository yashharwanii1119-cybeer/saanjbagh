import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { FAST_SPRING } from '../utils/motion';

const CustomCursor = () => {
  const [isMobile, setIsMobile] = useState(true); // Default true to prevent flash
  const [cursorState, setCursorState] = useState('default'); // 'default', 'hover', 'view', 'reserve'
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const smoothX = useSpring(cursorX, FAST_SPRING);
  const smoothY = useSpring(cursorY, FAST_SPRING);

  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;
    
    setIsMobile(false);

    const moveCursor = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      
      const target = e.target;
      if (target.closest('[data-cursor="view"]')) {
        setCursorState('view');
      } else if (target.closest('[data-cursor="reserve"]')) {
        setCursorState('reserve');
      } else if (target.closest('a') || target.closest('button') || target.closest('[data-cursor="hover"]')) {
        setCursorState('hover');
      } else {
        setCursorState('default');
      }
    };

    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, [cursorX, cursorY]);

  if (isMobile) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 z-[9999] pointer-events-none flex items-center justify-center rounded-full mix-blend-difference bg-royal-beige text-deep-forest text-[8px] tracking-widest font-bold"
      style={{
        x: smoothX,
        y: smoothY,
        translateX: '-50%',
        translateY: '-50%'
      }}
      animate={{
        width: cursorState === 'default' ? 12 : cursorState === 'hover' ? 40 : 80,
        height: cursorState === 'default' ? 12 : cursorState === 'hover' ? 40 : 80,
        opacity: cursorState === 'default' ? 0.7 : 1
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <motion.span 
        initial={{ opacity: 0 }}
        animate={{ opacity: (cursorState === 'view' || cursorState === 'reserve') ? 1 : 0 }}
        className="absolute pointer-events-none"
      >
        {cursorState === 'view' ? 'VIEW' : cursorState === 'reserve' ? 'RESERVE' : ''}
      </motion.span>
    </motion.div>
  );
};

export default CustomCursor;
