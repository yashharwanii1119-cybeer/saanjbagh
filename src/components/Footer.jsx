import React from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <footer className="bg-[#0B140B] text-ivory/70 py-16 border-t border-champagne/10 relative z-10">
      <div className="container mx-auto px-6 md:px-12 flex flex-col items-center justify-center">
        
        {/* Logo */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <img 
            src={`${import.meta.env.BASE_URL}assets/images/saanj-bagh-logo.jpg`} 
            alt="Saanjh Logo" 
            className="h-20 object-contain mix-blend-screen opacity-90"
          />
        </motion.div>

        {/* Links */}
        <motion.nav 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-8 md:gap-16 mb-16 text-xs uppercase tracking-[0.2em] font-medium"
        >
          <a href="#story-scene" className="hover:text-champagne transition-colors" data-cursor="hover">Story</a>
          <a href="#experience-scene" className="hover:text-champagne transition-colors" data-cursor="hover">Experience</a>
          <a href="#gallery-scene" className="hover:text-champagne transition-colors" data-cursor="hover">Gallery</a>
          <a href="#reservation-scene" className="text-champagne hover:text-ivory transition-colors" data-cursor="hover">Reserve</a>
        </motion.nav>

        {/* Info */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-center space-y-4 text-xs tracking-[0.1em]"
        >
          <p className="uppercase tracking-[0.3em] text-champagne/80 font-semibold">Jodhpur, Rajasthan</p>
          <p>reservations@saanjh.com</p>
        </motion.div>

        {/* Copyright */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-20 pt-8 border-t border-ivory/5 w-full text-center text-[10px] tracking-widest uppercase opacity-50"
        >
          &copy; {new Date().getFullYear()} Saanjh. All Rights Reserved.
        </motion.div>

      </div>
    </footer>
  );
};

export default Footer;
