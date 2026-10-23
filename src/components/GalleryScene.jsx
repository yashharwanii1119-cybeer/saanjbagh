import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { CINEMATIC_SPRING } from '../utils/motion';
import MarwarArch from './MarwarArch';

const GalleryScene = () => {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, { damping: 20, stiffness: 40 });

  // Complex multi-directional scroll paths
  const img1Y = useTransform(smoothProgress, [0, 0.25], [50, -200]);
  const img2Y = useTransform(smoothProgress, [0.05, 0.35], [120, -120]);
  const img2X = useTransform(smoothProgress, [0.05, 0.35], [40, -40]);
  const img3Y = useTransform(smoothProgress, [0.18, 0.48], [150, -150]);
  const img3Scale = useTransform(smoothProgress, [0.22, 0.45], [0.88, 1.05]);

  const img4Y = useTransform(smoothProgress, [0.3, 0.6], [120, -160]);
  const img6Y = useTransform(smoothProgress, [0.54, 0.84], [120, -120]);
  const img6X = useTransform(smoothProgress, [0.54, 0.84], [-40, 40]);

  const img7Y = useTransform(smoothProgress, [0.54, 0.78], [150, -150]);
  const img8Y = useTransform(smoothProgress, [0.63, 0.88], [150, -80]);
  const img8Scale = useTransform(smoothProgress, [0.66, 0.86], [0.9, 1.05]);

  // New images 9–12 — same 25% scroll-span pattern as originals
  const img9Y  = useTransform(smoothProgress, [0.70, 0.95], [150, -150]);
  const img9Scale = useTransform(smoothProgress, [0.73, 0.93], [0.88, 1.05]);
  const img10Y = useTransform(smoothProgress, [0.76, 1.00], [120, -120]);
  const img10X = useTransform(smoothProgress, [0.76, 1.00], [40, -40]);
  const img11Y = useTransform(smoothProgress, [0.82, 1.00], [150, -150]);
  const img11Scale = useTransform(smoothProgress, [0.84, 0.98], [0.88, 1.05]);
  const img12Y = useTransform(smoothProgress, [0.42, 0.72], [160, -160]);
  const img12Scale = useTransform(smoothProgress, [0.46, 0.68], [0.88, 1.05]);

  const titleOpacity = useTransform(smoothProgress, [0.05, 0.15, 0.85, 0.95], [0, 1, 1, 0]);
  const titleScale = useTransform(smoothProgress, [0.1, 0.9], [0.85, 1.15]);

  return (
    <motion.section 
      id="gallery-scene" 
      ref={containerRef}
      className="relative min-h-[750svh] w-full bg-deep-forest text-soft-cream overflow-hidden -mt-[2px]"
    >
      {/* Sticky Header */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center pointer-events-none z-10">
        <motion.h2 
          style={{ 
            opacity: titleOpacity,
            scale: titleScale
          }}
          className="text-[15vw] font-serif tracking-tighter text-soft-cream/10 mix-blend-overlay"
        >
          THE SPACE
        </motion.h2>
      </div>

      {/* Spatial Image Composition */}
      <div className="absolute inset-0 w-full h-full max-w-7xl mx-auto pointer-events-auto">
        
        {/* Image 1: Top Left, moves up */}
        <motion.div 
          style={{ y: img1Y }}
          className="absolute top-[4%] left-[5%] md:left-[10%] w-[72%] md:w-[32%] aspect-[3/4] z-20"
          data-cursor="view"
        >
          <MarwarArch variant="mask" className="w-full h-full shadow-2xl">
            <motion.img 
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              src={`${import.meta.env.BASE_URL}assets/images/gallery-pathway.jpg`} 
              alt="Saanj Bagh Illuminated Garden Walkway" 
              className="w-full h-full object-cover object-center"
              loading="lazy"
              decoding="async"
            />
          </MarwarArch>
        </motion.div>

        {/* Image 2: Middle Right, moves diagonally */}
        <motion.div 
          style={{ y: img2Y, x: img2X }}
          className="absolute top-[15%] right-[5%] md:right-[12%] w-[62%] md:w-[28%] aspect-square z-20"
          data-cursor="view"
        >
          <div className="relative w-full h-full p-4 md:p-6 bg-warm-sand/20 rounded-sm shadow-2xl backdrop-blur-sm">
            <MarwarArch variant="solid" className="absolute inset-0 text-royal-beige opacity-10 pointer-events-none shadow-inner" />
            <div className="w-full h-full overflow-hidden rounded-sm relative z-10 border border-soft-cream/10">
              <motion.img 
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                src={`${import.meta.env.BASE_URL}assets/images/gallery-lounge.jpg`} 
                alt="Saanj Bagh Indoor Botanical Lounge" 
                className="w-full h-full object-cover object-center"
                loading="lazy"
              decoding="async"
              />
            </div>
          </div>
        </motion.div>

        {/* Image 3: Outdoor Cabanas */}
        <motion.div 
          style={{ y: img3Y, scale: img3Scale }}
          className="absolute top-[27%] left-[8%] md:left-[24%] w-[84%] md:w-[42%] aspect-[16/9] z-20"
          data-cursor="view"
        >
          <MarwarArch variant="mask" className="w-full h-full shadow-2xl">
            <motion.img 
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              src={`${import.meta.env.BASE_URL}assets/images/gallery-cabanas.jpg`} 
              alt="Saanj Bagh Outdoor Dining Pavilions" 
              className="w-full h-full object-cover object-center"
              loading="lazy"
              decoding="async"
            />
          </MarwarArch>
        </motion.div>

        {/* Image 4: Indoor Dining Room */}
        <motion.div 
          style={{ y: img4Y }}
          className="absolute top-[39%] right-[5%] md:right-[14%] w-[72%] md:w-[32%] aspect-[3/4] z-20"
          data-cursor="view"
        >
          <MarwarArch variant="mask" className="w-full h-full shadow-2xl">
            <motion.img 
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              src={`${import.meta.env.BASE_URL}assets/images/gallery-indoor-dining.jpg`} 
              alt="Saanj Bagh Indoor Dining Room with Artisanal Terracotta Arch" 
              className="w-full h-full object-cover object-center"
              loading="lazy"
              decoding="async"
            />
          </MarwarArch>
        </motion.div>



        {/* Image 6: Heritage Reception Lounge */}
        <motion.div 
          style={{ y: img6Y, x: img6X }}
          className="absolute top-[63%] right-[5%] md:right-[15%] w-[62%] md:w-[28%] aspect-square z-20"
          data-cursor="view"
        >
          <div className="relative w-full h-full p-4 md:p-6 bg-warm-sand/20 rounded-sm shadow-2xl backdrop-blur-sm">
            <MarwarArch variant="solid" className="absolute inset-0 text-royal-beige opacity-10 pointer-events-none shadow-inner" />
            <div className="w-full h-full overflow-hidden rounded-sm relative z-10 border border-soft-cream/10">
              <motion.img 
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                src={`${import.meta.env.BASE_URL}assets/images/gallery-reception.jpg`} 
                alt="Saanj Bagh Heritage Reception and Botanical Lounge" 
                className="w-full h-full object-cover object-center"
                loading="lazy"
              decoding="async"
              />
            </div>
          </div>
        </motion.div>

        {/* Image 7: Botanical Glasshouse Dining Room */}
        <motion.div 
          style={{ y: img7Y }}
          className="absolute top-[60%] left-[8%] md:left-[16%] w-[80%] md:w-[42%] aspect-[16/9] z-20"
          data-cursor="view"
        >
          <MarwarArch variant="mask" className="w-full h-full shadow-2xl">
            <motion.img 
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              src={`${import.meta.env.BASE_URL}assets/images/gallery-garden-room.jpg`} 
              alt="Saanj Bagh Botanical Glasshouse Dining Room" 
              className="w-full h-full object-cover object-center"
              loading="lazy"
              decoding="async"
            />
          </MarwarArch>
        </motion.div>

        {/* Image 8: Courtyard Dining under Night Sky */}
        <motion.div 
          style={{ y: img8Y, scale: img8Scale }}
          className="absolute top-[70%] right-[6%] md:right-[18%] w-[82%] md:w-[44%] aspect-[16/9] z-20"
          data-cursor="view"
        >
          <MarwarArch variant="mask" className="w-full h-full shadow-2xl">
            <motion.img 
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              src={`${import.meta.env.BASE_URL}assets/images/gallery-courtyard-dining.jpg`} 
              alt="Saanj Bagh Outdoor Courtyard Dining with Illuminated Heritage Niches" 
              className="w-full h-full object-cover object-center"
              loading="lazy"
              decoding="async"
            />
          </MarwarArch>
        </motion.div>

        {/* Image 9: Interior Bar — wide landscape, left */}
        <motion.div 
          style={{ y: img9Y, scale: img9Scale }}
          className="absolute top-[79%] left-[5%] md:left-[10%] w-[84%] md:w-[44%] aspect-[16/9] z-20"
          data-cursor="view"
        >
          <MarwarArch variant="mask" className="w-full h-full shadow-2xl">
            <motion.img 
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              src={`${import.meta.env.BASE_URL}assets/images/gallery-interior-bar.jpg`} 
              alt="Saanj Bagh Circular Bar Interior with Saanj Bagh Logo" 
              className="w-full h-full object-cover object-center"
              loading="lazy"
              decoding="async"
            />
          </MarwarArch>
        </motion.div>

        {/* Image 10: Glasshouse Dining — square float right, diagonal */}
        <motion.div 
          style={{ y: img10Y, x: img10X }}
          className="absolute top-[84%] right-[4%] md:right-[12%] w-[62%] md:w-[28%] aspect-square z-20"
          data-cursor="view"
        >
          <div className="relative w-full h-full p-4 md:p-6 bg-warm-sand/20 rounded-sm shadow-2xl backdrop-blur-sm">
            <MarwarArch variant="solid" className="absolute inset-0 text-royal-beige opacity-10 pointer-events-none shadow-inner" />
            <div className="w-full h-full overflow-hidden rounded-sm relative z-10 border border-soft-cream/10">
              <motion.img 
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                src={`${import.meta.env.BASE_URL}assets/images/gallery-glasshouse.jpg`} 
                alt="Saanj Bagh Glasshouse Dining Room with Garden Views" 
                className="w-full h-full object-cover object-center"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </motion.div>

        {/* Image 11: Warm Dining Room — wide landscape, center */}
        <motion.div 
          style={{ y: img11Y, scale: img11Scale }}
          className="absolute top-[89%] left-[8%] md:left-[22%] w-[82%] md:w-[46%] aspect-[16/9] z-20"
          data-cursor="view"
        >
          <MarwarArch variant="mask" className="w-full h-full shadow-2xl">
            <motion.img 
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              src={`${import.meta.env.BASE_URL}assets/images/gallery-dining-room.jpg`} 
              alt="Saanj Bagh Warm Dining Room with Stone Wall and Chandeliers" 
              className="w-full h-full object-cover object-center"
              loading="lazy"
              decoding="async"
            />
          </MarwarArch>
        </motion.div>

        {/* Image 12: Signage Night — fills slot left by removed image 5 */}
        <motion.div 
          style={{ y: img12Y, scale: img12Scale }}
          className="absolute top-[51%] left-[6%] md:left-[10%] w-[82%] md:w-[40%] aspect-[16/9] z-20"
          data-cursor="view"
        >
          <MarwarArch variant="mask" className="w-full h-full shadow-2xl">
            <motion.img 
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              src={`${import.meta.env.BASE_URL}assets/images/gallery-signage-night.jpg`} 
              alt="Saanj Bagh Botanical Bar and Kitchen Entrance Signage at Night" 
              className="w-full h-full object-cover object-center"
              loading="lazy"
              decoding="async"
            />
          </MarwarArch>
        </motion.div>

      </div>
    </motion.section>
  );
};

export default GalleryScene;
