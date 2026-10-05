import React from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <footer className="bg-deep-forest text-soft-cream/70 py-16 border-t border-muted-gold/10 relative z-10">
      <div className="container mx-auto px-6 md:px-12 flex flex-col items-center justify-center">
        
        {/* Logo */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <div className="w-20 h-20 rounded-full overflow-hidden flex items-center justify-center mix-blend-screen opacity-90 mx-auto">
            <img 
              src={`${import.meta.env.BASE_URL}assets/images/saanj-bagh-logo.jpg`} 
              alt="Saanjh Logo" 
              className="w-full h-full object-contain"
            />
          </div>
        </motion.div>

        {/* Links */}
        <motion.nav 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-8 md:gap-16 mb-16 text-xs uppercase tracking-[0.2em] font-medium"
        >
          <a href="#story-scene" className="hover:text-muted-gold transition-colors" data-cursor="hover">Story</a>
          <a href="#experience-scene" className="hover:text-muted-gold transition-colors" data-cursor="hover">Experience</a>
          <a href="#gallery-scene" className="hover:text-muted-gold transition-colors" data-cursor="hover">Gallery</a>
          <a href="tel:+916350049073" className="text-muted-gold hover:text-soft-cream transition-colors" data-cursor="hover">Reserve</a>
        </motion.nav>

        {/* Info */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-center space-y-6 text-sm tracking-[0.1em]"
        >
          <p className="uppercase tracking-[0.3em] text-muted-gold/80 font-semibold text-xs">Saanj Bagh</p>
          
          <a 
            href="https://www.google.com/maps/search/?api=1&query=Saanj+Bagh,+Airport+Rd,+near+Jeet+Apartment,+Ratanada,+Jodhpur,+Rajasthan+342011"
            target="_blank" 
            rel="noopener noreferrer"
            className="block hover:text-muted-gold transition-colors duration-300"
            data-cursor="hover"
          >
            Airport Rd, near Jeet Apartment,<br/>
            Ratanada, Jodhpur, Rajasthan 342011
          </a>
          
          <div className="flex flex-col items-center gap-4 pt-2">
            <a href="tel:+916350049073" className="hover:text-muted-gold transition-colors duration-300" data-cursor="hover">
              +91 63500 49073
            </a>
            <a href="https://instagram.com/saanjbagh" target="_blank" rel="noopener noreferrer" className="hover:text-muted-gold transition-colors duration-300" data-cursor="hover">
              @saanjbagh
            </a>
          </div>
        </motion.div>

        {/* Copyright */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-20 pt-8 border-t border-soft-cream/5 w-full text-center text-[10px] tracking-widest uppercase opacity-50"
        >
          &copy; {new Date().getFullYear()} Saanj Bagh. All Rights Reserved.
        </motion.div>

      </div>
    </footer>
  );
};

export default Footer;
