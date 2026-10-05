import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import MarwarArch from './MarwarArch';
import { CINEMATIC_SPRING, FAST_SPRING } from '../utils/motion';

const CuisineScene = () => {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, CINEMATIC_SPRING);

  // Atmospheric Color Transition: Warm Sand to Deep Forest
  const bg = useTransform(smoothProgress, [0.2, 0.5], ['#CDBB96', '#10251B']);
  const textColor = useTransform(smoothProgress, [0.2, 0.5], ['#10251B', '#D8C7A5']);
  const accentColor = useTransform(smoothProgress, [0.2, 0.5], ['#6F5732', '#C9A45C']);

  // Parallax
  const plateY = useTransform(smoothProgress, [0, 1], ['5%', '-5%']);
  const textGroupY = useTransform(smoothProgress, [0, 1], ['2%', '-2%']);

  // Lantern light intensity
  const lanternOpacity = useTransform(smoothProgress, [0.3, 0.7], [0, 0.5]);

  // 3D Tilt for food image
  const tiltX = useSpring(0, FAST_SPRING);
  const tiltY = useSpring(0, FAST_SPRING);

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
      className="relative min-h-[140svh] w-full flex items-center justify-center overflow-hidden py-32 -mt-[2px]"
    >
      <div className="container mx-auto px-6 md:px-12 relative z-10 w-full h-full flex flex-col justify-center">
        
        {/* Subtle Lantern Light */}
        <motion.div 
          className="absolute top-[20%] right-[10%] w-[60%] h-[60%] pointer-events-none mix-blend-overlay z-0"
          style={{ opacity: lanternOpacity }}
        >
          <div className="w-full h-full bg-[radial-gradient(circle_at_center,_rgba(201,164,92,1)_0%,_transparent_70%)] blur-[40px]" />
        </motion.div>
        
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

          {/* Large Food Imagery inside Architectural Alcove */}
          <div className="relative z-10 order-1 lg:order-2 perspective-[1200px] py-12">
            <motion.div 
              style={{ 
                y: plateY,
                rotateX: tiltX,
                rotateY: tiltY,
                z: 50
              }}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="relative"
              data-cursor="view"
            >
              {/* Outer architectural recess shadow */}
              <MarwarArch variant="solid" className="absolute inset-[-10%] md:inset-[-15%] text-[#0a1711] shadow-[inset_0_20px_50px_rgba(0,0,0,0.5)] opacity-50 blur-md pointer-events-none" />
              
              <MarwarArch variant="mask" className="aspect-[4/5] relative z-10 shadow-2xl">
                <motion.img 
                  style={{ scale: useTransform(smoothProgress, [0, 1], [1.05, 1]) }}
                  src={`${import.meta.env.BASE_URL}assets/images/food.png`} 
                  alt="Saanjh Signature Dish" 
                  className="w-full h-full object-cover origin-center"
                />
                {/* Vignette overlay */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_40%,_rgba(0,0,0,0.6)_100%)] pointer-events-none" />
              </MarwarArch>
              
            </motion.div>
          </div>

        </div>
      </div>
    </motion.section>
  );
};

export default CuisineScene;
