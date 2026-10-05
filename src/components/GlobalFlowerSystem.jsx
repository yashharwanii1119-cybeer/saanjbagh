import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useVelocity, useMotionValue } from 'framer-motion';

const PRIMARY = "#C6A66B"; // flower-base
const LIGHT = "#F5EFE4";   // flower-light
const DARK = "#A9894F";    // flower-dark
const DEEP = "#233D2D";    // flower-deep (muted)

// --- Occasional Foreground Petal ---
const ForegroundPetal = ({ smoothProgress, colorValue }) => {
  // Enters at 0.35, crosses viewport, exits at 0.55
  const x = useTransform(smoothProgress, [0.3, 0.45, 0.6], ['120vw', '0vw', '-100vw']);
  const y = useTransform(smoothProgress, [0.3, 0.45, 0.6], ['120vh', '0vh', '-100vh']);
  const rotate = useTransform(smoothProgress, [0.3, 0.6], [-45, 45]);
  const scale = useTransform(smoothProgress, [0.3, 0.45, 0.6], [1.5, 3.5, 1.5]);
  const opacity = useTransform(smoothProgress, [0.3, 0.35, 0.55, 0.6], [0, 0.25, 0.25, 0]);

  return (
    <motion.div 
      className="absolute top-0 left-0 w-full h-full pointer-events-none z-50 overflow-hidden"
      style={{ opacity }}
    >
      <motion.div
        style={{ x, y, rotate, scale }}
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

// --- Single Petal Particle ---
const Particle = ({ smoothProgress, config, colorValue }) => {
  const x = useTransform(smoothProgress, [0, 1], [config.startX, config.endX]);
  const y = useTransform(smoothProgress, [0, 1], [config.startY, config.endY]);
  const rotate = useTransform(smoothProgress, [0, 1], [config.startRot, config.endRot]);
  // Opacity peaks in the middle of its journey
  const opacity = useTransform(smoothProgress, [0, 0.1, 0.5, 0.9, 1], [0, 0.2, 0.2, 0.2, 0]);

  return (
    <motion.div
      className="absolute"
      style={{ x, y, rotate, opacity, scale: config.scale }}
    >
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
        <motion.path 
          d="M12 21C9 20.5 9 15.5 10.25 13.5C10.75 15.5 11.25 17.75 12 18.5C12.75 17.75 13.25 15.5 13.75 13.5C15 15.5 15 20.5 12 21Z" 
          style={{ fill: colorValue }}
        />
      </svg>
    </motion.div>
  );
};

// --- Petal Particles System ---
const particleConfigs = [
  { startX: '10vw', endX: '80vw', startY: '110vh', endY: '-10vh', startRot: 0, endRot: 360, scale: 1.2 },
  { startX: '80vw', endX: '20vw', startY: '-10vh', endY: '110vh', startRot: 45, endRot: -360, scale: 0.9 },
  { startX: '40vw', endX: '90vw', startY: '60vh', endY: '-20vh', startRot: 90, endRot: 540, scale: 1.5 },
  { startX: '90vw', endX: '10vw', startY: '20vh', endY: '120vh', startRot: -45, endRot: -400, scale: 1.1 },
  { startX: '5vw', endX: '60vw', startY: '90vh', endY: '-30vh', startRot: 180, endRot: 720, scale: 1.8 },
  { startX: '70vw', endX: '30vw', startY: '-20vh', endY: '130vh', startRot: 270, endRot: -180, scale: 0.8 },
];

const PetalParticles = ({ smoothProgress, colorValue }) => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particleConfigs.map((config, i) => (
        <Particle key={i} smoothProgress={smoothProgress} config={config} colorValue={colorValue} />
      ))}
    </div>
  );
};

// --- Main System ---
const GlobalFlowerSystem = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  // Global Scroll Source of Truth (Direct, zero-delay mapping)
  const { scrollYProgress } = useScroll();
  const smoothProgress = scrollYProgress; // Aliased to prevent massive variable renaming below
  
  // Physics Velocity (Lag/Drag effect)
  const scrollVelocity = useVelocity(scrollYProgress);
  const velocitySpring = useSpring(scrollVelocity, { damping: 20, stiffness: 40 });

  // Mouse Parallax
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

  // --- CONTINUOUS SCROLL MAPPINGS ---
  
  // 1. Spatial Cinematic Journey (Scale, Rotate, Translate)
  // Scale range: 0.7 to 3.5, completely scrubbable.
  const globalScale = useTransform(smoothProgress, [0, 0.2, 0.4, 0.6, 0.8, 1], [0.7, 1.2, 1.8, 1.5, 2.8, 3.5]);
  const globalRotate = useTransform(smoothProgress, [0, 1], [0, 75]);
  const globalX = useTransform(smoothProgress, [0, 0.2, 0.4, 0.6, 0.8, 1], ['0vw', '15vw', '-15vw', '5vw', '-25vw', '15vw']);
  const globalY = useTransform(smoothProgress, [0, 0.2, 0.4, 0.6, 0.8, 1], ['5vh', '25vh', '-15vh', '20vh', '40vh', '-10vh']);

  // 2. Layered Depth Parallax (Z-Depth shifting as we move through it)
  // The outer leaves move the most, the center moves the least
  const layer1X = useTransform(smoothProgress, [0, 1], ['-20px', '40px']);
  const layer1Y = useTransform(smoothProgress, [0, 1], ['20px', '-40px']);
  
  const layer2X = useTransform(smoothProgress, [0, 1], ['-10px', '20px']);
  const layer2Y = useTransform(smoothProgress, [0, 1], ['10px', '-20px']);
  
  const layer3X = useTransform(smoothProgress, [0, 1], ['0px', '5px']);
  const layer3Y = useTransform(smoothProgress, [0, 1], ['0px', '-5px']);

  // 3. Petal Separation / Bloom
  // Starts closed, opens continuously through the scroll
  const leftPetalBaseRot = useTransform(smoothProgress, [0, 0.2, 0.5, 0.8, 1], [-2, -8, -15, -22, -35]);
  const rightPetalBaseRot = useTransform(smoothProgress, [0, 0.2, 0.5, 0.8, 1], [2, 8, 15, 22, 35]);
  const leftPetalX = useTransform(smoothProgress, [0, 1], [0, -15]);
  const rightPetalX = useTransform(smoothProgress, [0, 1], [0, 15]);
  const centerPetalScaleY = useTransform(smoothProgress, [0, 0.5, 1], [0.85, 1.05, 1.25]);

  // 4. Velocity Physics (Lag/Drag effect)
  // Velocity is added to the base rotation
  const leftVelRot = useTransform(velocitySpring, [-1, 1], [-30, 30]);
  const rightVelRot = useTransform(velocitySpring, [-1, 1], [30, -30]);

  const leftFinalRot = useTransform(() => leftPetalBaseRot.get() + leftVelRot.get());
  const rightFinalRot = useTransform(() => rightPetalBaseRot.get() + rightVelRot.get());

  // 5. Scene-Aware Color Transitions
  // 0=Hero(Dark), 0.2=Story(Light), 0.4=Exp(Light), 0.6=Cuisine(Dark), 0.8=Gallery(Dark), 1.0=Res(Dark)
  const outerColor = useTransform(smoothProgress, [0, 0.2, 0.4, 0.6, 0.8, 1], [PRIMARY, DEEP, DEEP, PRIMARY, PRIMARY, PRIMARY]);
  const midColor = useTransform(smoothProgress, [0, 0.2, 0.4, 0.6, 0.8, 1], [LIGHT, DARK, DARK, LIGHT, LIGHT, LIGHT]);
  const innerColor = useTransform(smoothProgress, [0, 0.2, 0.4, 0.6, 0.8, 1], [LIGHT, DARK, DARK, LIGHT, LIGHT, LIGHT]);
  const centerColor = useTransform(smoothProgress, [0, 0.2, 0.4, 0.6, 0.8, 1], [PRIMARY, DEEP, DEEP, PRIMARY, PRIMARY, PRIMARY]);

  // 6. Master Masking Opacity (Fades to 0 at Hero, Atmosphere, Reservation to keep photography clean)
  // Scroll map: Hero(~0.10), Story(~0.23), Exp(~0.38), Cuisine(~0.53), Gallery(~0.74), Atm(~0.90), Res(1.0)
  const masterOpacity = useTransform(smoothProgress, [0, 0.08, 0.12, 0.70, 0.76, 1], [0, 0, 1, 1, 0, 0]);

  const outerOpacity = useTransform(smoothProgress, [0, 0.2, 0.4, 0.6, 0.8, 1], [0.15, 0.12, 0.12, 0.12, 0.15, 0.15]);
  const midOpacity = useTransform(smoothProgress, [0, 0.2, 0.4, 0.6, 0.8, 1], [0.18, 0.15, 0.15, 0.15, 0.18, 0.18]);
  const innerOpacity = useTransform(smoothProgress, [0, 0.2, 0.4, 0.6, 0.8, 1], [0.25, 0.20, 0.20, 0.20, 0.25, 0.25]);
  const centerOpacity = useTransform(smoothProgress, [0, 0.2, 0.4, 0.6, 0.8, 1], [0.28, 0.22, 0.22, 0.22, 0.28, 0.28]);

  // 7. Mouse Parallax (Layered on top of scroll)
  const outerMouseX = useTransform(smoothMouseX, [-0.5, 0.5], ['-35px', '35px']);
  const outerMouseY = useTransform(smoothMouseY, [-0.5, 0.5], ['-35px', '35px']);
  const midMouseX = useTransform(smoothMouseX, [-0.5, 0.5], ['-15px', '15px']);
  const midMouseY = useTransform(smoothMouseY, [-0.5, 0.5], ['-15px', '15px']);
  const innerMouseX = useTransform(smoothMouseX, [-0.5, 0.5], ['10px', '-10px']);
  const innerMouseY = useTransform(smoothMouseY, [-0.5, 0.5], ['10px', '-10px']);

  // Combine scroll depth parallax with mouse parallax
  const finalLayer1X = useTransform(() => layer1X.get() + (isMobile ? 0 : parseFloat(outerMouseX.get())));
  const finalLayer1Y = useTransform(() => layer1Y.get() + (isMobile ? 0 : parseFloat(outerMouseY.get())));
  
  const finalLayer2X = useTransform(() => layer2X.get() + (isMobile ? 0 : parseFloat(midMouseX.get())));
  const finalLayer2Y = useTransform(() => layer2Y.get() + (isMobile ? 0 : parseFloat(midMouseY.get())));
  
  const finalLayer3X = useTransform(() => layer3X.get() + (isMobile ? 0 : parseFloat(innerMouseX.get())));
  const finalLayer3Y = useTransform(() => layer3Y.get() + (isMobile ? 0 : parseFloat(innerMouseY.get())));

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
      <PetalParticles smoothProgress={smoothProgress} colorValue={innerColor} />
      {!isMobile && <ForegroundPetal smoothProgress={smoothProgress} colorValue={midColor} />}

      <motion.div 
        className="absolute inset-0 flex items-center justify-center origin-center"
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

          {/* Depth Layer 1: Outer Leaves */}
          <motion.g 
            style={{ x: finalLayer1X, y: finalLayer1Y }}
            filter="url(#flower-glow)"
          >
            <motion.line x1="50" y1="75" x2="50" y2="150" strokeWidth="1.5" strokeLinecap="round" style={{ stroke: outerColor, opacity: outerOpacity }} />
            <motion.path d="M 50 92 C 40 88 38 72 41 64 C 43 73 47 80 50 82 Z" style={{ fill: outerColor, opacity: outerOpacity }} />
            <motion.path d="M 50 88 C 60 84 62 68 59 60 C 57 69 53 76 50 78 Z" style={{ fill: outerColor, opacity: outerOpacity }} />
          </motion.g>

          {/* Depth Layer 2: Background Petals */}
          <motion.g 
            style={{ x: finalLayer2X, y: finalLayer2Y }}
          >
            <motion.path d="M 50 75 C 38 73 38 53 43 45 C 45 53 47 62 50 65 Z" transform="scale(1.3) translate(-10, -15)" style={{ fill: midColor, opacity: midOpacity }} />
            <motion.path d="M 50 75 C 62 73 62 53 57 45 C 55 53 53 62 50 65 Z" transform="scale(1.3) translate(10, -15)" style={{ fill: midColor, opacity: midOpacity }} />
          </motion.g>

          {/* Depth Layer 3: Main Inner Petals */}
          <motion.g 
            style={{ x: finalLayer3X, y: finalLayer3Y }}
          >
            {/* Center Petal */}
            <motion.path 
              d="M 50 40 C 45 52 46.5 68 50 75 C 53.5 68 55 52 50 40 Z" 
              style={{ scaleY: centerPetalScaleY, transformOrigin: '50px 75px', fill: centerColor, opacity: centerOpacity }}
            />

            {/* Left Petal */}
            <motion.path 
              d="M 50 75 C 38 73 38 53 43 45 C 45 53 47 62 50 65 Z" 
              style={{ 
                rotate: leftFinalRot, 
                x: leftPetalX,
                transformOrigin: '50px 75px',
                fill: innerColor,
                opacity: innerOpacity
              }}
            />

            {/* Right Petal */}
            <motion.path 
              d="M 50 75 C 62 73 62 53 57 45 C 55 53 53 62 50 65 Z" 
              style={{ 
                rotate: rightFinalRot, 
                x: rightPetalX,
                transformOrigin: '50px 75px',
                fill: innerColor,
                opacity: innerOpacity
              }}
            />
          </motion.g>
        </svg>
      </motion.div>
    </motion.div>
  );
};

export default GlobalFlowerSystem;
