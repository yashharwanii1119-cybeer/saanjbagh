import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const ReservationScene = () => {
  const containerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const btnRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, { damping: 20, stiffness: 40 });

  // Dramatic push-in effect
  const bgScale = useTransform(smoothProgress, [0, 1], [1, 1.2]);
  const contentY = useTransform(smoothProgress, [0, 1], [100, 0]);

  // Magnetic Button Logic
  React.useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) setIsMobile(true);
  }, []);

  const btnX = useSpring(0, { damping: 15, stiffness: 150 });
  const btnY = useSpring(0, { damping: 15, stiffness: 150 });

  const handleBtnMove = (e) => {
    if (isMobile || !btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    btnX.set((e.clientX - cx) * 0.4);
    btnY.set((e.clientY - cy) * 0.4);
  };

  const handleBtnLeave = () => {
    btnX.set(0);
    btnY.set(0);
  };

  return (
    <motion.section 
      id="reservation-scene" 
      ref={containerRef}
      className="relative h-[100svh] w-full bg-[#0B140B] text-ivory flex items-center justify-center overflow-hidden -mt-[2px]"
    >
      {/* Cinematic Background Push-in */}
      <motion.div 
        style={{ scale: bgScale }}
        className="absolute inset-0 w-full h-full"
      >
        <img 
          src={`${import.meta.env.BASE_URL}assets/images/hero.png`} 
          alt="Saanjh Evening" 
          className="w-full h-full object-cover"
        />
        {/* Very dark overlay to make text pop */}
        <div className="absolute inset-0 bg-[#0B140B]/80 mix-blend-multiply" />
      </motion.div>

      {/* Content */}
      <motion.div 
        style={{ y: contentY }}
        className="relative z-10 text-center px-6"
      >
        <h2 className="text-5xl md:text-7xl lg:text-8xl font-serif text-ivory mb-16 tracking-tight">
          MAKE AN EVENING <br/>
          <span className="text-champagne italic">OF IT.</span>
        </h2>
        
        {/* Magnetic Reserve Button */}
        <div className="flex justify-center">
          <motion.a
            href="#"
            ref={btnRef}
            onMouseMove={handleBtnMove}
            onMouseLeave={handleBtnLeave}
            style={{ x: btnX, y: btnY }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block px-12 py-5 bg-champagne text-forest text-sm uppercase tracking-[0.2em] font-bold rounded-full shadow-[0_10px_30px_rgba(243,215,155,0.2)] hover:shadow-[0_15px_40px_rgba(243,215,155,0.4)] transition-shadow duration-500"
            data-cursor="reserve"
          >
            Reserve a Table
          </motion.a>
        </div>
      </motion.div>
    </motion.section>
  );
};

export default ReservationScene;
