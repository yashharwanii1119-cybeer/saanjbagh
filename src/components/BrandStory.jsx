import React from 'react';
import { motion } from 'framer-motion';

const BrandStory = () => {
  return (
    <section id="story" className="py-24 md:py-32 bg-ivory overflow-hidden relative">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          {/* Image with robust iOS-safe overlay reveal */}
          <div className="w-full lg:w-1/2 relative">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative aspect-[4/5] overflow-hidden rounded-tl-[120px] rounded-br-[120px]"
            >
              <motion.img
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 10, ease: "linear" }}
                src="/assets/images/story.png"
                alt="Elegant outdoor cabanas at Saanj Bagh"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-forest/10 mix-blend-multiply pointer-events-none" />
              
              {/* Overlay reveal animation (Safe for all browsers) */}
              <motion.div 
                initial={{ scaleY: 1 }}
                whileInView={{ scaleY: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                className="absolute inset-0 bg-ivory origin-top pointer-events-none"
              />
            </motion.div>

            {/* Decorative Element */}
            <motion.div 
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="absolute -bottom-6 -right-6 w-32 h-32 border border-champagne rounded-full hidden md:block pointer-events-none" 
            />
            <motion.div 
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 1, duration: 0.8 }}
              className="absolute -top-6 -left-6 w-48 h-48 border border-champagne/40 rounded-full hidden md:block pointer-events-none" 
            />
          </div>

          {/* Text Content */}
          <div className="w-full lg:w-1/2 lg:pr-12">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.2 }
                }
              }}
            >
              <motion.h2 
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-xs font-sans uppercase tracking-[0.4em] text-antique mb-4 font-semibold"
              >
                Our Story
              </motion.h2>
              <motion.h3 
                variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="text-4xl md:text-5xl lg:text-6xl font-serif text-forest mb-8 leading-tight"
              >
                An Escape <br/> Into Elegance
              </motion.h3>
              <motion.p 
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.8 }}
                className="text-lg md:text-xl text-charcoal/80 font-light leading-relaxed mb-8 text-balance"
              >
                Hidden amidst the vibrant spirit of Jodhpur, Saanj Bagh brings together the charm of nature, the warmth of Indian hospitality, and the art of unforgettable dining.
              </motion.p>
              <motion.p 
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.8 }}
                className="text-base text-charcoal/70 font-light leading-relaxed mb-10"
              >
                Every corner of our botanical garden is thoughtfully designed to immerse you in a world of serenity and royal grandeur. As the sun sets, the garden transforms into a magical oasis illuminated by a warm, inviting glow.
              </motion.p>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default BrandStory;
