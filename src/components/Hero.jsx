import React, { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useScroll } from 'framer-motion';

const Hero = () => {
  const [isMobile, setIsMobile] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const { scrollY } = useScroll();

  // Scroll animations for cinematic transition to next section
  const scrollBgY = useTransform(scrollY, [0, 1000], [0, 150]);
  const scrollBgScale = useTransform(scrollY, [0, 1000], [1, 1.05]);
  const scrollContentY = useTransform(scrollY, [0, 600], [0, -100]);
  const scrollContentOpacity = useTransform(scrollY, [0, 400], [1, 0]);

  // Smooth springs for mouse parallax (Inertial Motion)
  const springConfig = { damping: 40, stiffness: 60, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Layer 1: Background (~2px movement)
  const bgX = useTransform(smoothX, [-0.5, 0.5], ['-2px', '2px']);
  const bgY = useTransform(smoothY, [-0.5, 0.5], ['-2px', '2px']);

  // Layer 3: Foreground (~8px)
  const fgX = useTransform(smoothX, [-0.5, 0.5], ['-8px', '8px']);
  const fgY = useTransform(smoothY, [-0.5, 0.5], ['-8px', '8px']);

  // Layer 4: Content (~2px opposite)
  const contentX = useTransform(smoothX, [-0.5, 0.5], ['2px', '-2px']);
  const contentY = useTransform(smoothY, [-0.5, 0.5], ['2px', '-2px']);

  // Layer 5: Logo independent parallax (~4px opposite)
  const logoX = useTransform(smoothX, [-0.5, 0.5], ['4px', '-4px']);
  const logoY = useTransform(smoothY, [-0.5, 0.5], ['4px', '-4px']);

  // Cursor Light Tracking (~20% viewport offset)
  const lightX = useTransform(smoothX, [-0.5, 0.5], ['-15%', '15%']);
  const lightY = useTransform(smoothY, [-0.5, 0.5], ['-15%', '15%']);

  // Magnetic Button state
  const buttonRef = useRef(null);
  const btnMouseX = useMotionValue(0);
  const btnMouseY = useMotionValue(0);
  const btnSpringConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const btnSmoothX = useSpring(btnMouseX, btnSpringConfig);
  const btnSmoothY = useSpring(btnMouseY, btnSpringConfig);

  useEffect(() => {
    const isCoarse = window.matchMedia("(pointer: coarse)").matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (isCoarse || prefersReducedMotion) {
      setIsMobile(true);
      return;
    }

    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      const x = e.clientX / innerWidth - 0.5;
      const y = e.clientY / innerHeight - 0.5;
      mouseX.set(x);
      mouseY.set(y);
    };

    const handleMouseLeave = () => {
      mouseX.set(0);
      mouseY.set(0);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [mouseX, mouseY]);

  const handleButtonMouseMove = (e) => {
    if (!buttonRef.current || isMobile) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;
    
    // Magnetic pull: subtle movement towards cursor
    btnMouseX.set(distanceX * 0.15); 
    btnMouseY.set(distanceY * 0.15);
  };

  const handleButtonMouseLeave = () => {
    btnMouseX.set(0);
    btnMouseY.set(0);
  };

  // Entrance animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        staggerChildren: 0.25,
        delayChildren: 0.5
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] } 
    }
  };

  const logoVariants = {
    hidden: { opacity: 0, scale: 0.92 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      transition: { duration: 1.5, ease: [0.22, 1, 0.36, 1] } 
    }
  };

  return (
    <section id="hero" className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-forest">
      
      {/* Background Container with Scroll Parallax */}
      <motion.div 
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{ y: scrollBgY, scale: scrollBgScale }}
      >
        {/* Layer 1: Distant Background */}
        <motion.div 
          className="absolute inset-[-5%] z-0"
          style={isMobile ? {} : { x: bgX, y: bgY }}
        >
          {/* Subtle cinematic background movement */}
          <motion.div
            animate={{ 
              scale: [1, 1.05, 1],
              x: ['0%', '-1%', '0%'],
              y: ['0%', '1%', '0%']
            }}
            transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
            className="w-full h-full"
          >
            <motion.img
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2, ease: "easeOut" }}
              src="/assets/images/hero.png"
              alt="Botanical Garden Background"
              className="w-full h-full object-cover origin-center"
            />
          </motion.div>
        </motion.div>

        {/* Base dark overlay to unify layers */}
        <div className="absolute inset-0 z-[1] bg-gradient-to-b from-forest/70 via-forest/30 to-forest/90 pointer-events-none" />

        {/* Layer 2: Subtle Atmospheric Cursor Light */}
        <motion.div 
          className="absolute inset-[-30%] z-[2] pointer-events-none mix-blend-overlay" 
          style={isMobile ? {} : { x: lightX, y: lightY }}
        >
          <motion.div 
            animate={{ opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            className="w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-sunset/30 via-champagne/5 to-transparent"
          />
        </motion.div>

        {/* Layer 3: Foreground Depth Elements */}
        <motion.div 
          className="absolute inset-0 z-[3] pointer-events-none mix-blend-multiply opacity-50" 
          style={isMobile ? {} : { x: fgX, y: fgY }}
        >
          {/* Faking foreground out-of-focus botanical elements */}
          <div className="absolute -top-[5%] -left-[5%] w-[40%] h-[40%] bg-forest rounded-full blur-[100px]" />
          <div className="absolute -bottom-[5%] -right-[5%] w-[50%] h-[50%] bg-botanical rounded-full blur-[120px]" />
        </motion.div>
      </motion.div>

      {/* Layer 4: Content wrapped in Scroll Transition */}
      <motion.div 
        className="relative z-10 w-full"
        style={{ y: scrollContentY, opacity: scrollContentOpacity }}
      >
        <motion.div 
          className="text-center px-6 max-w-4xl mx-auto mt-20"
          style={isMobile ? {} : { x: contentX, y: contentY }}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          
          {/* Logo with independent parallax and scroll animation */}
          <motion.div 
            style={isMobile ? {} : { 
              x: logoX, 
              y: logoY,
              scale: useTransform(scrollY, [0, 400], [1, 1.1]),
              opacity: useTransform(scrollY, [0, 400], [1, 0])
            }}
            variants={logoVariants} 
            className="flex justify-center mb-8 origin-center"
          >
            <img 
              src="/assets/images/saanj-bagh-logo.jpg" 
              alt="Saanj Bagh Official Logo" 
              className="h-24 md:h-32 object-contain mix-blend-multiply" 
            />
          </motion.div>

          {/* Eyebrow */}
          <motion.div variants={itemVariants} className="mb-5 inline-block relative px-10 py-4">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(0,0,0,0.5)_0%,_rgba(0,0,0,0)_80%)] pointer-events-none" />
            <p
              className="relative z-10 text-xs md:text-sm uppercase tracking-[0.4em] font-medium"
              style={{ color: '#F3D79B', textShadow: '0 2px 12px rgba(0, 0, 0, 0.75)' }}
            >
              Where Jodhpur's Royal Soul Comes Alive
            </p>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-6xl lg:text-7xl font-serif text-ivory mb-8 leading-tight text-balance drop-shadow-lg"
          >
            Where Every Evening <br className="hidden md:block"/> Becomes a Memory
          </motion.h1>

          {/* Magnetic CTA Button */}
          <motion.div variants={itemVariants} className="flex flex-col items-center justify-center mt-12 px-6 sm:px-0 relative z-20">
            <motion.div
              ref={buttonRef}
              onMouseMove={handleButtonMouseMove}
              onMouseLeave={handleButtonMouseLeave}
              style={{ x: btnSmoothX, y: btnSmoothY }}
              className="inline-block"
            >
              <motion.a
                href="#experience"
                whileHover={{ scale: 1.02, filter: "brightness(1.08)" }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="px-10 py-5 bg-champagne text-forest uppercase tracking-[0.2em] text-xs font-bold rounded-full shadow-xl text-center inline-block cursor-pointer transition-colors"
              >
                Explore the Experience
              </motion.a>
            </motion.div>
          </motion.div>
          
        </motion.div>
      </motion.div>

      {/* Refined Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 2.5 }}
        style={{ opacity: scrollContentOpacity }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center z-10 pointer-events-none"
      >
        <span className="text-ivory/60 text-[9px] uppercase tracking-[0.4em] mb-1 font-medium">Scroll</span>
        <span className="text-ivory/40 text-[10px] mb-2 font-light">↓</span>
        <div className="w-[1px] h-10 bg-ivory/10 relative overflow-hidden">
          <motion.div
            animate={{ 
              y: ['-100%', '100%'],
              opacity: [0, 1, 0]
            }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            className="w-full h-[50%] bg-champagne/70 absolute top-0"
          />
        </div>
      </motion.div>
      
    </section>
  );
};

export default Hero;
