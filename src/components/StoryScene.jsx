import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import MarwarArch from './MarwarArch';
import { CINEMATIC_SPRING } from '../utils/motion';

const StoryScene = () => {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, CINEMATIC_SPRING);

  // Background color subtle transition (Royal Beige to Warm Sand)
  const bg = useTransform(smoothProgress, [0, 0.5], ['#D8C7A5', '#CDBB96']);

  // Parallax elements (standardized bounds)
  const mainImageY = useTransform(smoothProgress, [0, 1], ['5%', '-5%']);
  const secondaryImageY = useTransform(smoothProgress, [0, 1], ['10%', '-10%']);
  const textY = useTransform(smoothProgress, [0, 1], ['5%', '-5%']);
  
  // Lantern light intensity
  const lanternOpacity = useTransform(smoothProgress, [0.3, 0.7], [0, 0.4]);

  return (
    <motion.section 
      id="story-scene" 
      ref={containerRef}
      style={{ backgroundColor: bg }}
      className="relative min-h-[120svh] w-full flex items-center justify-center py-32 px-6 md:px-12 overflow-hidden -mt-[2px]"
    >
      <div className="container mx-auto max-w-7xl relative z-10">
        
        {/* Subtle Lantern Light */}
        <motion.div 
          className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] pointer-events-none mix-blend-overlay z-0"
          style={{ opacity: lanternOpacity }}
        >
          <div className="w-full h-full bg-[radial-gradient(circle_at_center,_rgba(201,164,92,1)_0%,_transparent_70%)] blur-[40px]" />
        </motion.div>
        
        {/* Header Section */}
        <motion.div 
          style={{ y: textY }}
          className="w-full md:w-2/3 mx-auto text-center mb-24 md:mb-40"
        >
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 1 }}
            className="mb-8 relative inline-block"
          >
            <span className="text-[10px] uppercase tracking-[0.4em] font-semibold text-dark-bronze">
              The Story
            </span>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-serif text-deep-forest leading-tight text-balance">
            <span className="block overflow-hidden pb-2">
              <motion.span 
                initial={{ y: "100%" }}
                whileInView={{ y: "0%" }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                className="block"
              >
                Where Jodhpur slows down,
              </motion.span>
            </span>
            <span className="block overflow-hidden pb-2 text-deep-forest/80 italic">
              <motion.span 
                initial={{ y: "100%" }}
                whileInView={{ y: "0%" }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="block"
              >
                and the evening begins.
              </motion.span>
            </span>
          </h2>
        </motion.div>

        {/* Editorial Composition */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center relative">
          
          {/* Main Large Image */}
          <motion.div 
            style={{ y: mainImageY }}
            className="md:col-span-7 relative z-10"
            data-cursor="view"
          >
            <div className="relative p-4 md:p-6 bg-warm-sand/40 rounded-sm shadow-xl">
              <MarwarArch variant="mask" withVines className="aspect-[4/5] md:aspect-[3/4] overflow-hidden relative">
                <motion.div
                  initial={{ scale: 1.2 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className="w-full h-full"
                >
                  <img 
                    src={`${import.meta.env.BASE_URL}assets/images/story.png`} 
                    alt="Saanjh Experience" 
                    className="w-full h-full object-cover origin-center"
                  />
                </motion.div>
                <div className="absolute inset-0 bg-deep-forest/10 mix-blend-overlay pointer-events-none" />
              </MarwarArch>
              {/* Architectural inner shadow for depth */}
              <MarwarArch variant="cutout" className="absolute inset-4 md:inset-6 pointer-events-none opacity-20 text-dark-bronze shadow-inner" />
            </div>
          </motion.div>

          {/* Secondary Image & Text Block */}
          <div className="md:col-span-4 md:col-start-9 flex flex-col justify-end space-y-16">
            
            <motion.div 
              style={{ y: secondaryImageY }}
              className="relative hidden md:block w-3/4 ml-auto"
            >
              <div className="aspect-square overflow-hidden rounded-sm relative">
                <img 
                  src={`${import.meta.env.BASE_URL}assets/images/gallery-2.png`} 
                  alt="Atmosphere details" 
                  className="w-full h-full object-cover grayscale-[30%] hover:grayscale-0 transition-all duration-700"
                />
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative z-20 bg-royal-beige/80 backdrop-blur-sm p-6 md:p-0"
            >
              <p className="text-base md:text-lg text-dark-bronze leading-relaxed font-serif">
                Saanjh is an evening experience shaped by the spirit of the Blue City — where warm lights, garden paths, royal architecture, and thoughtful dining come together beneath the Jodhpur sky.
              </p>
              <motion.a
                href="#experience-scene"
                className="inline-block mt-8 text-xs uppercase tracking-[0.2em] font-medium text-deep-forest hover:text-muted-gold transition-colors border-b border-deep-forest/20 hover:border-muted-gold pb-1"
                data-cursor="hover"
              >
                Discover the Experience
              </motion.a>
            </motion.div>

          </div>
        </div>

      </div>
    </motion.section>
  );
};

export default StoryScene;
