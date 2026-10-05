import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const StoryScene = () => {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Background color subtle transition
  const bg = useTransform(scrollYProgress, [0, 0.5], ['#FAF8F5', '#F5F1E7']);

  // Parallax elements
  const mainImageY = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const secondaryImageY = useTransform(scrollYProgress, [0, 1], [50, -150]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <motion.section 
      id="story-scene" 
      ref={containerRef}
      style={{ backgroundColor: bg }}
      className="relative min-h-[120svh] w-full flex items-center justify-center py-32 px-6 md:px-12 overflow-hidden -mt-[2px] z-10"
    >
      <div className="container mx-auto max-w-7xl relative z-10">
        
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
            <span className="text-[10px] uppercase tracking-[0.4em] font-semibold text-forest/60">
              The Story
            </span>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-serif text-forest leading-tight text-balance">
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
            <span className="block overflow-hidden pb-2 text-forest/80 italic">
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
            <div className="aspect-[4/5] md:aspect-[3/4] overflow-hidden rounded-sm relative">
              <motion.div
                initial={{ scale: 1.2 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="w-full h-full"
              >
                <img 
                  src="/assets/images/story.png" 
                  alt="Saanjh Experience" 
                  className="w-full h-full object-cover origin-center"
                />
              </motion.div>
              <div className="absolute inset-0 bg-forest/10 mix-blend-overlay pointer-events-none" />
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
                  src="/assets/images/gallery-2.png" 
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
              className="relative z-20 bg-ivory/80 backdrop-blur-sm p-6 md:p-0"
            >
              <p className="text-base md:text-lg text-forest/70 leading-relaxed font-serif">
                Saanjh is an evening experience shaped by the spirit of the Blue City — where warm lights, garden paths, royal architecture, and thoughtful dining come together beneath the Jodhpur sky.
              </p>
              <motion.a
                href="#experience-scene"
                className="inline-block mt-8 text-xs uppercase tracking-[0.2em] font-medium text-forest hover:text-champagne transition-colors border-b border-forest/20 hover:border-champagne pb-1"
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
