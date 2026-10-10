import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useScroll } from 'framer-motion';
import MarwarArch from './MarwarArch';
import { CINEMATIC_SPRING, FAST_SPRING } from '../utils/motion';

const HeroScene = () => {
  const [isMobile, setIsMobile] = useState(false);
  
  // Scroll Parallax (Scene Transition)
  const { scrollY } = useScroll();
  const sceneY = useTransform(scrollY, [0, 800], [0, 200]);
  const sceneOpacity = useTransform(scrollY, [0, 600], [1, 0]);
  const sceneScale = useTransform(scrollY, [0, 600], [1, 0.95]);

  // Mouse Physics
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, CINEMATIC_SPRING);
  const smoothY = useSpring(mouseY, CINEMATIC_SPRING);

  // Layer Depths
  const bgX = useTransform(smoothX, [-0.5, 0.5], ['-2%', '2%']);
  const bgY = useTransform(smoothY, [-0.5, 0.5], ['-2%', '2%']);
  
  const midX = useTransform(smoothX, [-0.5, 0.5], ['-4%', '4%']);
  const midY = useTransform(smoothY, [-0.5, 0.5], ['-4%', '4%']);

  const fgX = useTransform(smoothX, [-0.5, 0.5], ['-6%', '6%']);
  const fgY = useTransform(smoothY, [-0.5, 0.5], ['-6%', '6%']);

  const textX = useTransform(smoothX, [-0.5, 0.5], ['2%', '-2%']);
  const textY = useTransform(smoothY, [-0.5, 0.5], ['2%', '-2%']);

  const lightX = useTransform(smoothX, [-0.5, 0.5], ['-20%', '20%']);
  const lightY = useTransform(smoothY, [-0.5, 0.5], ['-20%', '20%']);

  // Magnetic Button
  const btnRef = useRef(null);
  const btnX = useMotionValue(0);
  const btnY = useMotionValue(0);
  const btnSmoothX = useSpring(btnX, FAST_SPRING);
  const btnSmoothY = useSpring(btnY, FAST_SPRING);

  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isTouch || isReduced) {
      setIsMobile(true);
      return;
    }

    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      mouseX.set(e.clientX / innerWidth - 0.5);
      mouseY.set(e.clientY / innerHeight - 0.5);
    };

    const handleMouseLeave = () => {
      mouseX.set(0);
      mouseY.set(0);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [mouseX, mouseY]);

  const handleBtnMove = (e) => {
    if (isMobile || !btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    btnX.set((e.clientX - cx) * 0.3);
    btnY.set((e.clientY - cy) * 0.3);
  };

  const handleBtnLeave = () => {
    btnX.set(0);
    btnY.set(0);
  };

  return (
    <section 
      id="hero" 
      className="relative h-[100svh] w-full bg-deep-forest overflow-hidden z-10"
    >
      <motion.div 
        style={{ y: useTransform(scrollY, [0, 800], [0, 50]), opacity: sceneOpacity, scale: sceneScale }}
        className="absolute inset-[-5%] w-[110%] h-[110%] flex items-center justify-center"
      >
      {/* Layer 1: Base Background (Grand Gateway) */}
      <motion.div 
        className="absolute inset-0 z-0 flex items-end justify-center"
        style={isMobile ? {} : { x: bgX, y: bgY }}
      >
        <MarwarArch variant="mask" className="w-[95%] md:w-[85%] h-[95%] md:h-[90%]">
          <div className="w-full h-full">
            <img 
              src={`${import.meta.env.BASE_URL}assets/images/hero.png`} 
              alt="Saanjh Heritage Garden" 
              className="w-full h-full object-cover"
            />
          </div>
        </MarwarArch>
      </motion.div>

      {/* Layer 2: Atmosphere & Lighting */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-deep-forest/80 via-deep-forest/40 to-deep-forest/90 mix-blend-multiply pointer-events-none" />
      
      {/* Cursor Light */}
      <motion.div 
        className="absolute inset-[-50%] z-[2] pointer-events-none mix-blend-overlay"
        style={isMobile ? {} : { x: lightX, y: lightY }}
      >
        <div className="w-full h-full bg-[radial-gradient(ellipse_at_center,_rgba(201,164,92,0.4)_0%,_transparent_50%)]" />
      </motion.div>

      {/* Layer 3: Foreground Silhouette (Faked depth) */}
      <motion.div 
        className="absolute inset-0 z-[3] pointer-events-none mix-blend-multiply opacity-60"
        style={isMobile ? {} : { x: fgX, y: fgY }}
      >
        <div className="absolute -bottom-[10%] -left-[5%] w-[40%] h-[40%] bg-deep-forest rounded-full blur-[100px]" />
        <div className="absolute top-[10%] -right-[10%] w-[50%] h-[50%] bg-deep-forest rounded-full blur-[120px]" />
      </motion.div>

      {/* Layer 4: Spatial Typography */}
      <motion.div 
        className="relative z-10 w-full text-center px-6 max-w-5xl mx-auto"
        style={isMobile ? {} : { x: textX, y: textY }}
      >
        {/* Brand Logo */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          className="flex justify-center mb-8 m-0 p-0 font-normal"
        >
          <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden flex items-center justify-center mix-blend-multiply opacity-90">
            <img 
              src={`${import.meta.env.BASE_URL}assets/images/saanj-bagh-logo.jpg`} 
              alt="Saanj Bagh — Botanical Bar & Kitchen Logo" 
              className="w-full h-full object-contain"
            />
          </div>
        </motion.div>

        {/* Eyebrow (H1 for SEO) */}
        <motion.h1 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="mb-6 relative inline-block m-0 p-0"
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(0,0,0,0.6)_0%,_transparent_80%)] blur-md" />
          <span className="relative z-10 text-[10px] md:text-xs uppercase tracking-[0.4em] font-semibold text-muted-gold">
            Saanj Bagh — Botanical Bar & Kitchen
          </span>
        </motion.h1>

        {/* Main Title with staggered depth */}
        <motion.h2 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-4xl md:text-6xl lg:text-7xl font-serif text-soft-cream leading-tight text-balance drop-shadow-2xl"
        >
          Where Every Evening <br className="hidden md:block"/> Becomes a Memory
        </motion.h2>

        {/* Magnetic CTA */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="mt-16 flex justify-center items-center"
        >
          <motion.a
            href="#story"
            ref={btnRef}
            onMouseMove={handleBtnMove}
            onMouseLeave={handleBtnLeave}
            style={{ x: btnSmoothX, y: btnSmoothY }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block px-10 py-4 bg-muted-gold text-deep-forest text-xs uppercase tracking-[0.2em] font-bold rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.3)] hover:shadow-[0_15px_40px_rgba(201,164,92,0.4)] transition-shadow duration-500"
          >
            Explore the Experience
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center z-20"
      >
        <span className="text-muted-gold text-[9px] uppercase tracking-[0.4em] mb-2 font-medium">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-muted-gold via-muted-gold/50 to-transparent" />
      </motion.div>

      </motion.div>
    </section>
  );
};

export default HeroScene;
