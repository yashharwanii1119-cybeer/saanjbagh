import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const CuisineScene = () => {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, { damping: 25, stiffness: 50 });

  // Atmospheric Color Transition: Ivory to Forest
  const bg = useTransform(smoothProgress, [0.2, 0.5], ['#F5F1E7', '#1A291A']);
  const textColor = useTransform(smoothProgress, [0.2, 0.5], ['#1A291A', '#FAF8F5']);
  const accentColor = useTransform(smoothProgress, [0.2, 0.5], ['#1A291A', '#F3D79B']);

  // Parallax
  const plateY = useTransform(smoothProgress, [0, 1], [150, -150]);
  const textGroupY = useTransform(smoothProgress, [0, 1], [0, -100]);

  // 3D Tilt for food image
  const tiltX = useSpring(0, { damping: 20, stiffness: 100 });
  const tiltY = useSpring(0, { damping: 20, stiffness: 100 });

  const handleMouseMove = (e) => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    tiltX.set(y * -0.08);
    tiltY.set(x * 0.08);
  };

  const handleMouseLeave = () => {
    tiltX.set(0);
    tiltY.set(0);
  };

  return (
    <motion.section 
      id="cuisine-scene" 
      ref={containerRef}
      style={{ backgroundColor: bg }}
      className="relative min-h-[140svh] w-full flex items-center justify-center overflow-hidden py-32 -mt-[2px] z-10"
    >
      <div className="container mx-auto px-6 md:px-12 relative z-10 w-full h-full flex flex-col justify-center">
        
        {/* Floating Typography */}
        <div className="absolute top-[5%] md:top-[10%] right-6 md:right-[10%] z-0 pointer-events-none text-right">
          <motion.h2 
            style={{ 
              y: useTransform(smoothProgress, [0, 1], [100, -100]),
              color: accentColor,
              opacity: useTransform(smoothProgress, [0.2, 0.5], [0.1, 0.05])
            }}
            className="text-[12vw] md:text-[10vw] font-serif leading-[0.8] tracking-tighter"
          >
            THE
          </motion.h2>
          <motion.h2 
            style={{ 
              y: useTransform(smoothProgress, [0, 1], [50, -150]),
              color: accentColor,
              opacity: useTransform(smoothProgress, [0.2, 0.5], [0.1, 0.05])
            }}
            className="text-[12vw] md:text-[10vw] font-serif leading-[0.8] tracking-tighter pr-12 md:pr-32"
          >
            CUISINE
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Text Content */}
          <motion.div 
            style={{ y: textGroupY }}
            className="relative z-20 order-2 lg:order-1 pt-12 lg:pt-0"
          >
            <motion.span 
              style={{ color: accentColor }}
              className="text-[10px] uppercase tracking-[0.4em] font-semibold mb-6 block"
            >
              Culinary Artistry
            </motion.span>
            
            <motion.h3 
              style={{ color: textColor }}
              className="text-4xl md:text-5xl lg:text-7xl font-serif mb-8 leading-tight text-balance"
            >
              Rooted in Rajasthan. <br/> Reimagined for the evening.
            </motion.h3>
            
            <motion.p 
              style={{ color: textColor }}
              className="font-serif leading-relaxed md:text-lg opacity-70 max-w-lg mb-12"
            >
              A celebration of local ingredients and heritage recipes, transformed through modern techniques. Every dish tells a story of the desert landscape, crafted specifically for the fading light.
            </motion.p>
          </motion.div>

          {/* Large Food Imagery */}
          <div className="relative z-10 order-1 lg:order-2 perspective-[1200px]">
            <motion.div 
              style={{ 
                y: plateY,
                rotateX: tiltX,
                rotateY: tiltY,
                z: 50
              }}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="aspect-[4/5] rounded-[100px] md:rounded-[200px] overflow-hidden shadow-2xl relative"
              data-cursor="view"
            >
              <motion.img 
                style={{ scale: useTransform(smoothProgress, [0, 1], [1.3, 1]) }}
                src={`${import.meta.env.BASE_URL}assets/images/food.png`} 
                alt="Saanjh Signature Dish" 
                className="w-full h-full object-cover origin-center"
              />
              {/* Vignette overlay */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_40%,_rgba(0,0,0,0.6)_100%)] pointer-events-none" />
            </motion.div>
          </div>

        </div>
      </div>
    </motion.section>
  );
};

export default CuisineScene;
