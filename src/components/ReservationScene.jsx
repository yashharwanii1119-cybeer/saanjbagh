import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import MarwarArch from './MarwarArch';

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
      className="relative h-[120svh] w-full bg-deep-forest text-soft-cream flex items-center justify-center overflow-hidden -mt-[2px] z-10"
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
        <div className="absolute inset-0 bg-deep-forest/90 mix-blend-multiply" />
      </motion.div>

      {/* Royal Chamber Architectural Frame */}
      <motion.div 
        style={{ y: useTransform(smoothProgress, [0, 1], [50, -50]) }}
        className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none z-10"
      >
        <MarwarArch variant="cutout" className="w-[95%] md:w-[70%] h-[95%] md:h-[90%] text-deep-forest shadow-[0_0_100px_rgba(201,164,92,0.15)]" />
        
        {/* Inner glow inside the arch */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[80%] h-[80%] bg-[radial-gradient(ellipse_at_center,_rgba(201,164,92,0.15)_0%,_transparent_70%)] blur-2xl pointer-events-none" />
        </div>
      </motion.div>

      {/* Content */}
      <motion.div 
        style={{ y: contentY }}
        className="relative z-20 text-center px-6 max-w-lg"
      >
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif text-soft-cream mb-12 tracking-tight drop-shadow-lg">
          MAKE AN EVENING <br/>
          <span className="text-muted-gold italic drop-shadow-[0_0_30px_rgba(201,164,92,0.3)]">OF IT.</span>
        </h2>
        
        {/* Magnetic Reserve Button */}
        <div className="flex justify-center">
          <motion.a
            href="tel:+916350049073"
            ref={btnRef}
            onMouseMove={handleBtnMove}
            onMouseLeave={handleBtnLeave}
            style={{ x: btnX, y: btnY }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block px-12 py-5 bg-muted-gold text-deep-forest text-sm uppercase tracking-[0.2em] font-bold rounded-full shadow-[0_10px_30px_rgba(201,164,92,0.2)] hover:shadow-[0_15px_40px_rgba(201,164,92,0.4)] transition-shadow duration-500"
            data-cursor="reserve"
          >
            Reserve a Table
          </motion.a>
        </div>
        
        <div className="mt-12 flex flex-col items-center gap-2">
          <a href="tel:+916350049073" className="text-xl md:text-2xl font-serif text-soft-cream hover:text-muted-gold transition-colors duration-300">
            +91 63500 49073
          </a>
          <p className="text-sm font-serif text-soft-cream/60 italic">
            Join us in the royal gardens.
          </p>
        </div>
      </motion.div>
    </motion.section>
  );
};

export default ReservationScene;
