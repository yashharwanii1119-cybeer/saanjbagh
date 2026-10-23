import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { CINEMATIC_SPRING } from '../utils/motion';
import MarwarArch from './MarwarArch';

const GalleryScene = () => {
  const containerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' ? window.innerWidth < 768 : false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, { damping: 20, stiffness: 40 });

  // On mobile, gently scale parallax displacement so images have breathing room and never overlap
  const factor = isMobile ? 0.22 : 1;

  // Multi-directional scroll paths
  const img1Y = useTransform(smoothProgress, [0, 0.25], [50 * factor, -200 * factor]);
  const img2Y = useTransform(smoothProgress, [0.08, 0.32], [120 * factor, -120 * factor]);
  const img2X = useTransform(smoothProgress, [0.08, 0.32], [40 * factor, -40 * factor]);
  const img3Y = useTransform(smoothProgress, [0.18, 0.42], [150 * factor, -150 * factor]);
  const img3Scale = useTransform(smoothProgress, [0.18, 0.42], [0.88, 1.05]);

  const img4Y = useTransform(smoothProgress, [0.26, 0.52], [120 * factor, -160 * factor]);
  const img12Y = useTransform(smoothProgress, [0.38, 0.64], [160 * factor, -160 * factor]);
  const img12Scale = useTransform(smoothProgress, [0.38, 0.64], [0.88, 1.05]);

  const img6Y = useTransform(smoothProgress, [0.46, 0.72], [120 * factor, -120 * factor]);
  const img6X = useTransform(smoothProgress, [0.46, 0.72], [-40 * factor, 40 * factor]);

  const img7Y = useTransform(smoothProgress, [0.54, 0.78], [150 * factor, -150 * factor]);
  const img8Y = useTransform(smoothProgress, [0.62, 0.86], [150 * factor, -80 * factor]);
  const img8Scale = useTransform(smoothProgress, [0.62, 0.86], [0.9, 1.05]);

  const img9Y  = useTransform(smoothProgress, [0.69, 0.92], [150 * factor, -150 * factor]);
  const img9Scale = useTransform(smoothProgress, [0.69, 0.92], [0.88, 1.05]);
  const img10Y = useTransform(smoothProgress, [0.76, 0.98], [120 * factor, -120 * factor]);
  const img10X = useTransform(smoothProgress, [0.76, 0.98], [40 * factor, -40 * factor]);
  const img11Y = useTransform(smoothProgress, [0.84, 1.00], [150 * factor, -150 * factor]);
  const img11Scale = useTransform(smoothProgress, [0.84, 1.00], [0.88, 1.05]);

  const titleOpacity = useTransform(smoothProgress, [0.05, 0.15, 0.85, 0.95], [0, 1, 1, 0]);
  const titleScale = useTransform(smoothProgress, [0.1, 0.9], [0.85, 1.15]);

  return (
    <motion.section 
      id="gallery-scene" 
      ref={containerRef}
      className="relative min-h-[380svh] md:min-h-[750svh] w-full bg-deep-forest text-soft-cream overflow-hidden -mt-[2px]"
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
          className="absolute top-[2%] md:top-[4%] left-[4%] md:left-[10%] w-[68%] md:w-[32%] aspect-[3/4] z-20"
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
          className="absolute top-[15%] md:top-[15%] right-[4%] md:right-[12%] w-[60%] md:w-[28%] aspect-square z-20"
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
          className="absolute top-[24%] md:top-[27%] left-[6%] md:left-[24%] w-[78%] md:w-[42%] aspect-[16/9] z-20"
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
          className="absolute top-[31%] md:top-[39%] right-[4%] md:right-[14%] w-[68%] md:w-[32%] aspect-[3/4] z-20"
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

        {/* Image 12: Signage Night — fills slot between image 4 and image 6 */}
        <motion.div 
          style={{ y: img12Y, scale: img12Scale }}
          className="absolute top-[44%] md:top-[51%] left-[5%] md:left-[10%] w-[76%] md:w-[40%] aspect-[16/9] z-20"
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

        {/* Image 6: Heritage Reception Lounge */}
        <motion.div 
          style={{ y: img6Y, x: img6X }}
          className="absolute top-[51%] md:top-[63%] right-[4%] md:right-[15%] w-[60%] md:w-[28%] aspect-square z-20"
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
          className="absolute top-[60%] md:top-[60%] left-[5%] md:left-[16%] w-[76%] md:w-[42%] aspect-[16/9] z-20"
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
          className="absolute top-[67%] md:top-[70%] right-[4%] md:right-[18%] w-[76%] md:w-[44%] aspect-[16/9] z-20"
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
          className="absolute top-[74%] md:top-[79%] left-[5%] md:left-[10%] w-[78%] md:w-[44%] aspect-[16/9] z-20"
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
          className="absolute top-[81%] md:top-[84%] right-[4%] md:right-[12%] w-[60%] md:w-[28%] aspect-square z-20"
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
          className="absolute top-[90%] md:top-[89%] left-[8%] md:left-[22%] w-[84%] md:w-[46%] aspect-[16/9] z-20"
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

      </div>
    </motion.section>
  );
};

export default GalleryScene;