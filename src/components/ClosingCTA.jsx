import React from 'react';
import { motion } from 'framer-motion';

const ClosingCTA = () => {
  return (
    <section className="py-40 bg-sunset relative overflow-hidden flex items-center justify-center min-h-[70vh]">
      {/* Background Decor & Atmospheric Lighting */}
      <motion.div 
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-ivory/20 via-transparent to-forest/40 mix-blend-overlay pointer-events-none" 
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-forest/30 pointer-events-none" />
      
      <div className="container mx-auto px-6 md:px-12 relative z-10 text-center">
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
            variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-5xl md:text-7xl lg:text-8xl font-serif text-forest mb-8 leading-tight"
          >
            Your Evening <br className="hidden sm:block"/> Awaits.
          </motion.h2>
          
          <motion.p 
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.8 }}
            className="text-lg md:text-xl text-forest/90 font-light mb-12 max-w-2xl mx-auto"
          >
            Step into a world of botanical beauty, exquisite flavours, and unforgettable moments.
          </motion.p>
          
          <motion.div 
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <a
              href="#reserve"
              className="px-10 py-5 bg-forest text-champagne uppercase tracking-[0.2em] text-xs font-semibold rounded-full hover:bg-charcoal transition-colors duration-300 w-full sm:w-auto shadow-xl"
            >
              Reserve Your Table
            </a>
            <a
              href="#contact"
              className="px-10 py-5 border border-forest/50 text-forest uppercase tracking-[0.2em] text-xs font-semibold rounded-full hover:bg-forest/10 hover:border-forest transition-all duration-300 w-full sm:w-auto"
            >
              Find Us
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ClosingCTA;
