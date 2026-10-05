import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const GlobalAtmosphereSystem = () => {
  const { scrollYProgress } = useScroll();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const smoothProgress = useSpring(scrollYProgress, { damping: 25, stiffness: 40 });

  // 1. Distant Haze (0.1x visual depth - color transition)
  const hazeOpacity = useTransform(smoothProgress, [0, 1], [0.1, 0.4]);
  const hazeBg = useTransform(smoothProgress, [0, 0.5, 1], ['#CDBB96', '#6F5732', '#10251B']);

  // 2. Distant Architecture (0.2x)
  const archY = useTransform(smoothProgress, [0, 1], [0, -100]);

  // 3. Foliage Edge Silhouettes (0.4x)
  const foliageRightY = useTransform(smoothProgress, [0, 1], [-50, -200]);
  const foliageLeftY = useTransform(smoothProgress, [0, 1], [100, -150]);

  // 4. Dust / Pollen (1.1 - 1.2x)
  // We'll generate a small, fixed number of particles
  const particleCount = isMobile ? 4 : 8;
  const particles = Array.from({ length: particleCount }).map((_, i) => {
    const seedX = (i * 17) % 100; // pseudo-random spread
    const seedY = (i * 23) % 100;
    const speed = 1.1 + (i % 3) * 0.1;
    const direction = i % 2 === 0 ? 1 : -1;
    return { id: i, seedX, seedY, speed, direction };
  });

  return (
    <div className="fixed inset-0 pointer-events-none z-[-5] overflow-hidden" aria-hidden="true">
      
      {/* 1. Distant Haze */}
      <motion.div 
        className="absolute inset-0 mix-blend-multiply"
        style={{ backgroundColor: hazeBg, opacity: hazeOpacity }}
      />

      {/* 2. Distant Architecture (Subtle Silhouettes) */}
      {!isMobile && (
        <motion.div 
          className="absolute inset-0 flex justify-around items-end opacity-[0.03] text-deep-forest"
          style={{ y: archY }}
        >
          {/* Abstract Jharokha Silhouette */}
          <svg className="w-64 h-96 mb-[-10vh]" viewBox="0 0 100 200" preserveAspectRatio="none" fill="currentColor">
            <path d="M 20 200 L 20 100 C 20 80, 10 70, 10 50 C 30 20, 50 0, 50 0 C 50 0, 70 20, 90 50 C 90 70, 80 80, 80 100 L 80 200 Z" />
          </svg>
          
          <svg className="w-96 h-[500px] mb-[10vh]" viewBox="0 0 100 200" preserveAspectRatio="none" fill="currentColor">
            <path d="M 10 200 L 10 50 C 10 30, 0 20, 0 10 C 20 0, 50 10, 50 10 C 50 10, 80 0, 100 10 C 100 20, 90 30, 90 50 L 90 200 Z" />
          </svg>
        </motion.div>
      )}

      {/* 3. Foliage Edge Silhouettes */}
      <motion.div 
        className="absolute -top-[10%] -right-[5%] w-[30%] md:w-[20%] opacity-10 text-deep-forest mix-blend-multiply"
        style={{ y: foliageRightY }}
      >
        <svg viewBox="0 0 100 100" fill="currentColor">
          {/* Abstract Palm/Foliage Fronds */}
          <path d="M100 0 C80 20, 60 50, 40 100 C70 80, 90 50, 100 30 Z" />
          <path d="M100 20 C70 30, 50 60, 30 100 C60 80, 80 50, 100 40 Z" />
        </svg>
      </motion.div>

      <motion.div 
        className="absolute top-[40%] -left-[10%] w-[40%] md:w-[25%] opacity-10 text-deep-forest mix-blend-multiply"
        style={{ y: foliageLeftY }}
      >
        <svg viewBox="0 0 100 100" fill="currentColor">
          {/* Wide Botanical Leaves */}
          <path d="M0 50 C20 30, 50 20, 100 40 C70 70, 40 80, 0 50 Z" />
          <path d="M0 30 C30 10, 60 10, 90 20 C60 50, 30 60, 0 30 Z" />
        </svg>
      </motion.div>

      {/* 4. Dust / Pollen */}
      <div className="absolute inset-0 z-[40]">
        {particles.map((p) => {
          const yTransform = useTransform(
            smoothProgress, 
            [0, 1], 
            [`${p.seedY}vh`, `${p.seedY - (100 * p.speed)}vh`]
          );
          
          const xTransform = useTransform(
            smoothProgress,
            [0, 1],
            [`${p.seedX}vw`, `${p.seedX + (20 * p.direction)}vw`]
          );

          const opacityTransform = useTransform(
            smoothProgress,
            [0, 0.5, 1],
            [0.1, 0.4, 0.1]
          );

          return (
            <motion.div
              key={p.id}
              className="absolute w-[3px] h-[3px] md:w-[4px] md:h-[4px] rounded-full bg-muted-gold shadow-[0_0_8px_rgba(201,164,92,0.6)]"
              style={{
                y: yTransform,
                x: xTransform,
                opacity: opacityTransform
              }}
            />
          );
        })}
      </div>
      
    </div>
  );
};

export default GlobalAtmosphereSystem;
