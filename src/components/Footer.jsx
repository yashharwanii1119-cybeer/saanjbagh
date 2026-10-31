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
              alt="Saanj Bagh — Botanical Bar & Kitchen" 
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
          className="flex flex-wrap justify-center gap-6 md:gap-12 mb-12 text-xs uppercase tracking-[0.2em] font-medium"
        >
          <a href="#story-scene" className="hover:text-muted-gold transition-colors" data-cursor="hover">Story</a>
          <a href="#experience-scene" className="hover:text-muted-gold transition-colors" data-cursor="hover">Experience</a>
          <a href="#cuisine-scene" className="hover:text-muted-gold transition-colors" data-cursor="hover">Cuisine</a>
          <a href="https://menu.saanjbagh.in/" target="_blank" rel="noopener noreferrer" className="hover:text-muted-gold transition-colors" data-cursor="hover">Digital Menu</a>
          <a href="#gallery-scene" className="hover:text-muted-gold transition-colors" data-cursor="hover">Gallery</a>
          <a href="#faq-section" className="hover:text-muted-gold transition-colors" data-cursor="hover">FAQ</a>
          <a href="#location" className="hover:text-muted-gold transition-colors" data-cursor="hover">Location</a>
          <a href="tel:+916350049073" className="text-muted-gold hover:text-soft-cream transition-colors" data-cursor="hover">Reserve</a>
        </motion.nav>

        {/* Info */}
        <motion.div 
          id="location"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-center space-y-5 text-sm tracking-[0.1em]"
        >
          <p className="uppercase tracking-[0.3em] text-muted-gold font-semibold text-xs">
            Saanj Bagh — Botanical Bar &amp; Kitchen
          </p>

          <p className="text-soft-cream/80 text-xs md:text-sm font-serif max-w-lg mx-auto leading-relaxed">
            A vegetarian restaurant in Jodhpur, Rajasthan offering botanical garden dining, craft beverages, and refined Indian &amp; Continental vegetarian culinary artistry. (Does not serve non-vegetarian food).
          </p>
          
          <a 
            href="https://www.google.com/maps/search/?api=1&query=Saanj+Bagh,+Airport+Rd,+near+Jeet+Apartment,+Ratanada,+Jodhpur,+Rajasthan+342011"
            target="_blank" 
            rel="noopener noreferrer"
            className="block hover:text-muted-gold transition-colors duration-300 leading-relaxed text-xs md:text-sm"
            data-cursor="hover"
          >
            Airport Rd, near Jeet Apartment,<br/>
            Ratanada, Jodhpur, Rajasthan 342011
          </a>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-2 text-xs md:text-sm">
            <a href="tel:+916350049073" className="hover:text-muted-gold transition-colors duration-300" data-cursor="hover">
              +91 63500 49073
            </a>
            <span className="hidden sm:inline text-soft-cream/20">•</span>
            <a href="https://instagram.com/saanjbagh" target="_blank" rel="noopener noreferrer" className="hover:text-muted-gold transition-colors duration-300" data-cursor="hover">
              @saanjbagh
            </a>
            <span className="hidden sm:inline text-soft-cream/20">•</span>
            <a href="https://menu.saanjbagh.in/" target="_blank" rel="noopener noreferrer" className="text-muted-gold hover:text-soft-cream transition-colors duration-300" data-cursor="hover">
              menu.saanjbagh.in
            </a>
          </div>
        </motion.div>

        {/* Copyright */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-16 pt-8 border-t border-soft-cream/5 w-full text-center text-[10px] tracking-widest uppercase opacity-50"
        >
          &copy; {new Date().getFullYear()} Saanj Bagh. All Rights Reserved. • Vegetarian Restaurant in Jodhpur, Rajasthan.
        </motion.div>

      </div>
    </footer>
  );
};

export default Footer;
