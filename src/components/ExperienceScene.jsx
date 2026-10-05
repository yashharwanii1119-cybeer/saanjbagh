import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import MarwarArch from './MarwarArch';
import { CINEMATIC_SPRING, FAST_SPRING } from '../utils/motion';

const ExperienceScene = () => {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Smooth the scroll for physics-based movement
  const smoothProgress = useSpring(scrollYProgress, CINEMATIC_SPRING);

  // Complex Parallax Movements
  const largeImageY = useTransform(smoothProgress, [0, 1], ['5%', '-5%']);
  const smallImageX = useTransform(smoothProgress, [0, 1], ['-2%', '2%']);
  const smallImageY = useTransform(smoothProgress, [0, 1], ['5%', '-5%']);
  
  // 3D Tilt Effect on hover
  const tiltX = useSpring(0, FAST_SPRING);
  const tiltY = useSpring(0, FAST_SPRING);

  // Architectural Parallax (Background, Midground, Foreground)
  const bgArchY = useTransform(smoothProgress, [0, 1], ['-2%', '2%']);
  const midArchY = useTransform(smoothProgress, [0, 1], ['2%', '-2%']);
  const fgArchY = useTransform(smoothProgress, [0, 1], ['5%', '-5%']);

  const handleMouseMove = (e) => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    tiltX.set(y * -0.05);
    tiltY.set(x * 0.05);
  };

  const handleMouseLeave = () => {
    tiltX.set(0);
    tiltY.set(0);
  };

  return (
    <motion.section 
      id="experience-scene" 
      ref={containerRef}
      className="relative min-h-[150svh] w-full bg-warm-sand text-deep-forest py-32 overflow-hidden flex items-center -mt-[2px]"
    >
      <div className="container mx-auto px-6 md:px-12 relative z-10 w-full h-full flex flex-col justify-center">
        
        {/* Architectural Layers */}
        <motion.div 
          style={{ y: bgArchY }}
          className="absolute inset-0 w-full h-full flex justify-center items-center pointer-events-none opacity-30 z-0"
        >
          <MarwarArch variant="solid" className="w-[120vw] md:w-[80vw] h-[120vh] text-royal-beige" />
        </motion.div>

        <motion.div 
          style={{ y: midArchY }}
          className="absolute inset-0 w-full h-full flex justify-center items-center pointer-events-none z-0"
        >
          <MarwarArch variant="cutout" className="w-[95%] md:w-[85%] h-[95%] text-warm-sand shadow-2xl drop-shadow-2xl" />
        </motion.div>

        <motion.div 
          style={{ y: fgArchY }}
          className="absolute inset-0 w-full h-[120%] -top-[10%] flex justify-center items-center pointer-events-none z-50"
        >
          <MarwarArch variant="cutout" className="w-[105%] md:w-[95%] h-[100%] text-royal-beige/90 shadow-[0_0_50px_rgba(0,0,0,0.1)]" />
        </motion.div>
        
        {/* Spatial Floating Typography */}
        <div className="absolute top-[10%] left-6 md:left-[10%] z-20 mix-blend-difference pointer-events-none text-soft-cream">
          <motion.h2 
            style={{ y: useTransform(smoothProgress, [0, 1], [-100, 100]) }}
            className="text-[10vw] md:text-[8vw] font-serif leading-[0.8] opacity-20 tracking-tighter"
          >
            THE
          </motion.h2>
          <motion.h2 
            style={{ y: useTransform(smoothProgress, [0, 1], [-50, 150]) }}
            className="text-[10vw] md:text-[8vw] font-serif leading-[0.8] opacity-20 tracking-tighter pl-12 md:pl-32"
          >
            EXPERIENCE
          </motion.h2>
        </div>

        <div className="relative w-full max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between">
          
          {/* Main Large Cinematic Image */}
          <motion.div 
            style={{ 
              y: largeImageY,
              rotateX: tiltX,
              rotateY: tiltY,
              z: 100
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="w-full lg:w-7/12 relative z-10 perspective-[1000px]"
            data-cursor="view"
          >
            <div className="aspect-[3/4] overflow-hidden rounded-sm relative shadow-[0_20px_50px_rgba(0,0,0,0.15)]">
              <motion.img 
                style={{ scale: useTransform(smoothProgress, [0, 1], [1.2, 1]) }}
                src={`${import.meta.env.BASE_URL}assets/images/gallery-1.png`} 
                alt="Saanjh Evening" 
                className="w-full h-full object-cover origin-bottom"
              />
              <div className="absolute inset-0 bg-deep-forest/20 mix-blend-multiply pointer-events-none" />
            </div>
          </motion.div>

          {/* Overlapping Small Image & Text */}
          <div className="w-full lg:w-5/12 relative z-30 mt-24 lg:mt-0 lg:-ml-24">
            
            <motion.div 
              style={{ x: smallImageX, y: smallImageY }}
              className="relative w-2/3 md:w-1/2 lg:w-3/4 ml-auto lg:ml-0 aspect-[4/3] rounded-sm overflow-hidden shadow-2xl mb-12"
              data-cursor="view"
            >
              <img 
                src={`${import.meta.env.BASE_URL}assets/images/drinks.png`} 
                alt="Crafted Drinks" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 border border-royal-beige/30 pointer-events-none" />
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 1 }}
              className="bg-royal-beige/90 backdrop-blur-md p-8 md:p-12 shadow-xl relative ml-6 mr-6 lg:ml-0 lg:-mt-24 lg:left-12"
            >
              <span className="text-[10px] uppercase tracking-[0.4em] font-semibold text-muted-gold mb-4 block">
                Botanical Dining
              </span>
              <h3 className="text-3xl md:text-5xl font-serif text-deep-forest mb-6 leading-tight text-balance">
                An evening designed <br/> to be remembered.
              </h3>
              <p className="text-deep-forest/70 font-serif leading-relaxed md:text-lg">
                Premium Indian and Continental flavours presented with elegant artistry. Signature cocktails, intimate conversations, and unforgettable sunsets set the stage for an extraordinary culinary journey.
              </p>
              
              <motion.button 
                whileHover={{ x: 5 }}
                className="mt-8 flex items-center gap-4 text-xs uppercase tracking-[0.2em] font-bold text-deep-forest hover:text-muted-gold transition-colors"
                data-cursor="hover"
              >
                <span>View Menu</span>
                <span className="w-8 h-[1px] bg-current" />
              </motion.button>
            </motion.div>

          </div>

        </div>
      </div>
    </motion.section>
  );
};

export default ExperienceScene;
