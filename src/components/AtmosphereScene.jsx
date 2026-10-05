import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const AtmosphereScene = () => {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, { damping: 20, stiffness: 40 });

  // Lighting Transition: Day to Evening
  const overlayOpacity = useTransform(smoothProgress, [0.3, 0.7], [0, 0.7]);
  const goldLightOpacity = useTransform(smoothProgress, [0.4, 0.8], [0, 0.4]);
  const scale = useTransform(smoothProgress, [0, 1], [1, 1.1]);
  const textY = useTransform(smoothProgress, [0, 1], [100, -100]);

  return (
    <motion.section 
      id="atmosphere-scene" 
      ref={containerRef}
      className="relative h-[150svh] w-full bg-forest overflow-hidden -mt-[2px] z-10"
    >
      {/* Background Cinematic Image */}
      <motion.div 
        style={{ scale }}
        className="absolute inset-0 w-full h-full"
      >
        <img 
          src="/assets/images/gallery-2.png" 
          alt="Saanjh Evening Atmosphere" 
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Darkening Evening Overlay */}
      <motion.div 
        style={{ opacity: overlayOpacity }}
        className="absolute inset-0 bg-[#0B140B] pointer-events-none mix-blend-multiply"
      />

      {/* Golden Warm Light Overlay */}
      <motion.div 
        style={{ opacity: goldLightOpacity }}
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_rgba(243,215,155,1)_0%,_transparent_70%)] pointer-events-none mix-blend-overlay"
      />

      {/* Subtle Dust Particles (CSS-based) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute w-[2px] h-[2px] bg-champagne rounded-full top-[20%] left-[30%] opacity-50 blur-[1px] animate-[ping_4s_ease-in-out_infinite]" />
        <div className="absolute w-[3px] h-[3px] bg-champagne rounded-full top-[60%] left-[70%] opacity-40 blur-[2px] animate-[ping_5s_ease-in-out_infinite_1s]" />
        <div className="absolute w-[2px] h-[2px] bg-champagne rounded-full top-[80%] left-[20%] opacity-60 blur-[1px] animate-[ping_6s_ease-in-out_infinite_2s]" />
      </div>

      {/* Cinematic Text */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center px-6 pointer-events-none z-10 text-center">
        <motion.div style={{ y: textY }}>
          <h2 className="text-4xl md:text-6xl lg:text-8xl font-serif text-ivory tracking-tight drop-shadow-2xl">
            <span className="block mb-2 text-ivory/90">AS THE SUN SETS,</span>
            <span className="block text-champagne italic">SAANJH COMES ALIVE.</span>
          </h2>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default AtmosphereScene;
