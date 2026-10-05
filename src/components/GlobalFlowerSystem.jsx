import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useVelocity, useMotionValue } from 'framer-motion';

const PRIMARY = "#C6A66B"; // flower-base
const LIGHT = "#F5EFE4";   // flower-light
const DARK = "#A9894F";    // flower-dark
const DEEP = "#233D2D";    // flower-deep (muted)

// --- Occasional Foreground Petal ---
const OccasionalForegroundPetal = ({ isMobile, colorValue }) => {
  if (isMobile) return null;
  return (
    <motion.div className="absolute top-0 left-0 w-full h-full pointer-events-none z-50 overflow-hidden">
      <motion.div
        initial={{ x: '120vw', y: '120vh', rotate: -45, scale: 2.5, opacity: 0 }}
        animate={{ 
          x: '-20vw', 
          y: '-20vh', 
          rotate: 45,
          opacity: [0, 0.25, 0.25, 0]
        }}
        transition={{ duration: 25, repeat: Infinity, repeatDelay: 15, ease: 'linear' }}
        className="absolute"
      >
        <svg width="250" height="250" viewBox="0 0 24 24" fill="none">
          <motion.path 
            d="M12 21C9 20.5 9 15.5 10.25 13.5C10.75 15.5 11.25 17.75 12 18.5C12.75 17.75 13.25 15.5 13.75 13.5C15 15.5 15 20.5 12 21Z" 
            style={{ fill: colorValue }}
            filter="blur(3px)"
          />
        </svg>
      </motion.div>
    </motion.div>
  );
};

// --- Petal Particles ---
const PetalParticles = ({ isMobile, colorValue }) => {
  if (isMobile) return null;
  const petals = Array.from({ length: 8 });
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {petals.map((_, i) => (
        <motion.div
          key={i}
          className="absolute opacity-0"
          initial={{ 
            x: `${Math.random() * 100}vw`, 
            y: i % 2 === 0 ? '120vh' : '-20vh',
            rotate: Math.random() * 360,
            scale: 0.8 + Math.random() * 1.5
          }}
          animate={{
            y: i % 2 === 0 ? '-20vh' : '120vh',
            x: `calc(${Math.random() * 100}vw + ${Math.random() > 0.5 ? 300 : -300}px)`,
            rotate: Math.random() * 720,
            opacity: [0, 0.2, 0.2, 0],
          }}
          transition={{
            duration: 25 + Math.random() * 20,
            repeat: Infinity,
            delay: Math.random() * 15,
            ease: 'linear'
          }}
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
            <motion.path 
              d="M12 21C9 20.5 9 15.5 10.25 13.5C10.75 15.5 11.25 17.75 12 18.5C12.75 17.75 13.25 15.5 13.75 13.5C15 15.5 15 20.5 12 21Z" 
              style={{ fill: colorValue }}
            />
          </svg>
        </motion.div>
      ))}
    </div>
  );
};

// --- Main System ---
const GlobalFlowerSystem = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { damping: 60, stiffness: 30, mass: 2 });
  
  const scrollVelocity = useVelocity(smoothProgress);
  const velocitySpring = useSpring(scrollVelocity, { damping: 30, stiffness: 40 });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { damping: 40, stiffness: 30 });
  const smoothMouseY = useSpring(mouseY, { damping: 40, stiffness: 30 });

  useEffect(() => {
    const mediaQueryReduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const mediaQueryTouch = window.matchMedia('(pointer: coarse)');
    setIsReducedMotion(mediaQueryReduced.matches);
    setIsMobile(mediaQueryTouch.matches);

    if (mediaQueryReduced.matches || mediaQueryTouch.matches) return;

    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      mouseX.set(e.clientX / innerWidth - 0.5);
      mouseY.set(e.clientY / innerHeight - 0.5);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  // Massive continuous journey transformation
  const globalScale = useTransform(smoothProgress, [0, 0.2, 0.4, 0.6, 0.8, 1], [1.8, 2.2, 3.5, 2.5, 5.0, 3.0]);
  const globalX = useTransform(smoothProgress, [0, 0.2, 0.4, 0.6, 0.8, 1], ['0%', '15%', '-10%', '5%', '-20%', '0%']);
  const globalY = useTransform(smoothProgress, [0, 0.2, 0.4, 0.6, 0.8, 1], ['0vh', '20vh', '-10vh', '15vh', '30vh', '5vh']);
  const globalRotate = useTransform(smoothProgress, [0, 1], [0, 60]);

  // Color Transitions (Scene-Aware)
  // 0=Hero(Dark), 0.2=Story(Light), 0.4=Exp(Light), 0.6=Cuisine(Dark), 0.8=Gallery(Dark), 1.0=Res(Dark)
  const outerColor = useTransform(smoothProgress, [0, 0.2, 0.4, 0.6, 0.8, 1], [PRIMARY, DEEP, DEEP, PRIMARY, PRIMARY, PRIMARY]);
  const midColor = useTransform(smoothProgress, [0, 0.2, 0.4, 0.6, 0.8, 1], [LIGHT, DARK, DARK, LIGHT, LIGHT, LIGHT]);
  const innerColor = useTransform(smoothProgress, [0, 0.2, 0.4, 0.6, 0.8, 1], [LIGHT, DARK, DARK, LIGHT, LIGHT, LIGHT]);
  const centerColor = useTransform(smoothProgress, [0, 0.2, 0.4, 0.6, 0.8, 1], [PRIMARY, DEEP, DEEP, PRIMARY, PRIMARY, PRIMARY]);

  // Master Opacity (0 at Hero, Atmosphere, Reservation. 1 at Story, Experience, Cuisine, Gallery)
  // Scroll map: Hero(~0.10), Story(~0.23), Exp(~0.38), Cuisine(~0.53), Gallery(~0.74), Atm(~0.90), Res(1.0)
  const masterOpacity = useTransform(smoothProgress, [0, 0.08, 0.12, 0.70, 0.76, 1], [0, 0, 1, 1, 0, 0]);

  // Opacity Transitions (Photography dip removed, masterOpacity handles it)
  const outerOpacity = useTransform(smoothProgress, [0, 0.2, 0.4, 0.6, 0.8, 1], [0.15, 0.12, 0.12, 0.12, 0.15, 0.15]);
  const midOpacity = useTransform(smoothProgress, [0, 0.2, 0.4, 0.6, 0.8, 1], [0.18, 0.15, 0.15, 0.15, 0.18, 0.18]);
  const innerOpacity = useTransform(smoothProgress, [0, 0.2, 0.4, 0.6, 0.8, 1], [0.25, 0.20, 0.20, 0.20, 0.25, 0.25]);
  const centerOpacity = useTransform(smoothProgress, [0, 0.2, 0.4, 0.6, 0.8, 1], [0.28, 0.22, 0.22, 0.22, 0.28, 0.28]);

  // Bloom animation for Hero
  const leftPetalRot = useTransform(smoothProgress, [0, 0.15, 1], [-25, 0, 12]);
  const rightPetalRot = useTransform(smoothProgress, [0, 0.15, 1], [25, 0, -12]);
  const centerPetalScaleY = useTransform(smoothProgress, [0, 0.15, 1], [0.7, 1, 1.15]);
  
  // Velocity distortions
  const leftVelRot = useTransform(velocitySpring, [-0.5, 0.5], [-20, 20]);
  const rightVelRot = useTransform(velocitySpring, [-0.5, 0.5], [20, -20]);

  // Amplified Mouse Parallax
  const outerMouseX = useTransform(smoothMouseX, [-0.5, 0.5], ['-35px', '35px']);
  const outerMouseY = useTransform(smoothMouseY, [-0.5, 0.5], ['-35px', '35px']);
  
  const midMouseX = useTransform(smoothMouseX, [-0.5, 0.5], ['-15px', '15px']);
  const midMouseY = useTransform(smoothMouseY, [-0.5, 0.5], ['-15px', '15px']);

  const innerMouseX = useTransform(smoothMouseX, [-0.5, 0.5], ['10px', '-10px']);
  const innerMouseY = useTransform(smoothMouseY, [-0.5, 0.5], ['10px', '-10px']);

  if (isReducedMotion) {
    return (
      <div className="fixed inset-0 z-[5] pointer-events-none flex items-center justify-center opacity-30">
        <svg viewBox="0 0 100 150" className="w-[120vw] h-[120vh] max-w-7xl">
          <g transform="translate(0, 20)">
            <motion.path d="M 50 75 C 38 73 38 53 43 45 C 45 53 47 62 50 65 Z" style={{ fill: innerColor }} />
            <motion.path d="M 50 75 C 62 73 62 53 57 45 C 55 53 53 62 50 65 Z" style={{ fill: innerColor }} />
            <motion.path d="M 50 40 C 45 52 46.5 68 50 75 C 53.5 68 55 52 50 40 Z" style={{ fill: centerColor }} />
          </g>
        </svg>
      </div>
    );
  }

  return (
    <motion.div 
      style={{ opacity: masterOpacity }}
      className="fixed inset-0 z-[5] pointer-events-none overflow-hidden"
    >
      <PetalParticles isMobile={isMobile} colorValue={innerColor} />
      <OccasionalForegroundPetal isMobile={isMobile} colorValue={midColor} />

      <motion.div 
        className="absolute inset-0 flex items-center justify-center origin-center"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 4, ease: "easeOut" }}
        style={{ 
          scale: globalScale, 
          x: globalX,
          y: globalY, 
          rotate: globalRotate
        }}
      >
        <svg 
          viewBox="0 0 100 150" 
          className="w-[120vw] h-[120vh] md:w-[90vw] md:h-[150vh] max-w-[2000px]"
          style={{ overflow: 'visible' }}
        >
          <defs>
            <filter id="flower-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Depth Layer 1: Outer Leaves (Slow Breathing) */}
          <motion.g 
            style={isMobile ? {} : { x: outerMouseX, y: outerMouseY }}
            animate={{ scale: [1, 1.03, 1], rotate: [0, -1, 0] }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
            filter="url(#flower-glow)"
          >
            <motion.line x1="50" y1="75" x2="50" y2="150" strokeWidth="1.5" strokeLinecap="round" style={{ stroke: outerColor, opacity: outerOpacity }} />
            <motion.path d="M 50 92 C 40 88 38 72 41 64 C 43 73 47 80 50 82 Z" style={{ fill: outerColor, opacity: outerOpacity }} />
            <motion.path d="M 50 88 C 60 84 62 68 59 60 C 57 69 53 76 50 78 Z" style={{ fill: outerColor, opacity: outerOpacity }} />
          </motion.g>

          {/* Depth Layer 2: Background Petals */}
          <motion.g 
            style={isMobile ? {} : { x: midMouseX, y: midMouseY }}
            animate={{ scale: [1, 1.02, 1], rotate: [0, 1, 0] }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          >
            <motion.path d="M 50 75 C 38 73 38 53 43 45 C 45 53 47 62 50 65 Z" transform="scale(1.3) translate(-10, -15)" style={{ fill: midColor, opacity: midOpacity }} />
            <motion.path d="M 50 75 C 62 73 62 53 57 45 C 55 53 53 62 50 65 Z" transform="scale(1.3) translate(10, -15)" style={{ fill: midColor, opacity: midOpacity }} />
          </motion.g>

          {/* Depth Layer 3: Main Inner Petals */}
          <motion.g 
            style={isMobile ? {} : { x: innerMouseX, y: innerMouseY }}
            animate={{ scale: [1, 1.015, 1] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 4 }}
          >
            {/* Center Petal */}
            <motion.path 
              d="M 50 40 C 45 52 46.5 68 50 75 C 53.5 68 55 52 50 40 Z" 
              style={{ scaleY: centerPetalScaleY, transformOrigin: '50px 75px', fill: centerColor, opacity: centerOpacity }}
              animate={{ filter: ["brightness(1)", "brightness(1.1)", "brightness(1)"] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Left Petal */}
            <motion.path 
              d="M 50 75 C 38 73 38 53 43 45 C 45 53 47 62 50 65 Z" 
              style={{ 
                rotate: useTransform(() => leftPetalRot.get() + leftVelRot.get()), 
                transformOrigin: '50px 75px',
                fill: innerColor,
                opacity: innerOpacity
              }}
              animate={{ rotate: [0, -2, 0], x: [0, -3, 0] }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Right Petal */}
            <motion.path 
              d="M 50 75 C 62 73 62 53 57 45 C 55 53 53 62 50 65 Z" 
              style={{ 
                rotate: useTransform(() => rightPetalRot.get() + rightVelRot.get()), 
                transformOrigin: '50px 75px',
                fill: innerColor,
                opacity: innerOpacity
              }}
              animate={{ rotate: [0, 2, 0], x: [0, 3, 0] }}
              transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.g>
        </svg>
      </motion.div>
    </motion.div>
  );
};

export default GlobalFlowerSystem;
