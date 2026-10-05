import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const GalleryScene = () => {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, { damping: 20, stiffness: 40 });

  // Complex multi-directional scroll paths
  const img1Y = useTransform(smoothProgress, [0, 1], [0, -300]);
  const img2Y = useTransform(smoothProgress, [0, 1], [200, -100]);
  const img2X = useTransform(smoothProgress, [0, 1], [50, -50]);
  const img3Y = useTransform(smoothProgress, [0, 1], [400, -400]);
  const img3Scale = useTransform(smoothProgress, [0.3, 0.7], [0.8, 1.1]);

  return (
    <motion.section 
      id="gallery-scene" 
      ref={containerRef}
      className="relative min-h-[200svh] w-full bg-[#1A291A] text-ivory overflow-hidden -mt-[2px] z-10"
    >
      {/* Sticky Header */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center pointer-events-none z-10">
        <motion.h2 
          style={{ 
            opacity: useTransform(smoothProgress, [0.2, 0.5, 0.8], [0, 1, 0]),
            scale: useTransform(smoothProgress, [0.2, 0.8], [0.8, 1.2])
          }}
          className="text-[15vw] font-serif tracking-tighter text-ivory/10 mix-blend-overlay"
        >
          THE SPACE
        </motion.h2>
      </div>

      {/* Spatial Image Composition */}
      <div className="absolute inset-0 w-full h-full max-w-7xl mx-auto pointer-events-auto">
        
        {/* Image 1: Top Left, moves up */}
        <motion.div 
          style={{ y: img1Y }}
          className="absolute top-[10%] left-[5%] md:left-[10%] w-[60%] md:w-[35%] aspect-[3/4] z-20"
          data-cursor="view"
        >
          <div className="w-full h-full overflow-hidden rounded-sm shadow-2xl">
            <motion.img 
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              src={`${import.meta.env.BASE_URL}assets/images/gallery-1.png`} 
              alt="Saanjh Evening Space" 
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>

        {/* Image 2: Middle Right, moves diagonally */}
        <motion.div 
          style={{ y: img2Y, x: img2X }}
          className="absolute top-[30%] right-[5%] md:right-[15%] w-[50%] md:w-[30%] aspect-square z-30"
          data-cursor="view"
        >
          <div className="w-full h-full overflow-hidden rounded-sm shadow-2xl border border-ivory/10">
            <motion.img 
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              src={`${import.meta.env.BASE_URL}assets/images/gallery-3.png`} 
              alt="Saanjh Dining Detail" 
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>

        {/* Image 3: Bottom Center, moves up fast and scales */}
        <motion.div 
          style={{ y: img3Y, scale: img3Scale }}
          className="absolute top-[60%] left-[20%] md:left-[30%] w-[70%] md:w-[45%] aspect-[16/9] z-40"
          data-cursor="view"
        >
          <div className="w-full h-full overflow-hidden rounded-sm shadow-2xl">
            <motion.img 
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              src={`${import.meta.env.BASE_URL}assets/images/gallery-2.png`} 
              alt="Saanjh Atmosphere" 
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>

      </div>
    </motion.section>
  );
};

export default GalleryScene;
