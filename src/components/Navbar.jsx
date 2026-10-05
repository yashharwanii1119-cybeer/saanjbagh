import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: 'Story', href: '#story-scene' },
    { name: 'Experience', href: '#experience-scene' },
    { name: 'Gallery', href: '#gallery-scene' }
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ease-[0.22,1,0.36,1] ${
          isScrolled 
            ? 'py-4 bg-forest/90 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.1)]' 
            : 'py-8 bg-transparent'
        }`}
      >
        <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
          
          {/* Logo */}
          <motion.a 
            href="#hero" 
            className="relative z-50 flex items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: isScrolled ? 1 : 0 }}
            transition={{ duration: 0.5 }}
            style={{ pointerEvents: isScrolled ? 'auto' : 'none' }}
          >
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden flex items-center justify-center mix-blend-screen">
              <img 
                src={`${import.meta.env.BASE_URL}assets/images/saanj-bagh-logo.jpg`} 
                alt="Saanjh Logo" 
                className="w-full h-full object-contain"
              />
            </div>
          </motion.a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-12">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="group relative text-xs uppercase tracking-[0.2em] font-medium text-soft-cream/90 hover:text-muted-gold transition-colors duration-300 py-2"
                data-cursor="hover"
              >
                <motion.span whileHover={{ y: -2 }} className="inline-block transition-transform duration-300">
                  {link.name}
                </motion.span>
                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-muted-gold transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-[0.22,1,0.36,1]" />
              </a>
            ))}
            <a
              href="tel:+916350049073"
              data-cursor="hover"
              className="group relative text-xs uppercase tracking-[0.2em] font-medium text-deep-forest bg-muted-gold px-8 py-3 rounded-full overflow-hidden shadow-lg transition-all duration-300 hover:shadow-muted-gold/20"
            >
              <div className="absolute inset-0 bg-royal-beige transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.22,1,0.36,1]" />
              <span className="relative z-10 flex items-center gap-2">
                Reserve
              </span>
            </a>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden relative z-50 text-soft-cream focus:outline-none p-2 mix-blend-difference"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <div className="w-8 h-4 flex flex-col justify-between items-end">
              <motion.span 
                animate={{ 
                  rotate: isMobileMenuOpen ? 45 : 0, 
                  y: isMobileMenuOpen ? 7 : 0,
                  backgroundColor: isMobileMenuOpen ? '#C9A45C' : '#E7DCC4' 
                }}
                className="w-full h-[1px] block transition-colors"
              />
              <motion.span 
                animate={{ 
                  width: isMobileMenuOpen ? '100%' : '75%',
                  rotate: isMobileMenuOpen ? -45 : 0, 
                  y: isMobileMenuOpen ? -7 : 0,
                  backgroundColor: isMobileMenuOpen ? '#C9A45C' : '#E7DCC4' 
                }}
                className="h-[1px] block transition-colors"
              />
            </div>
          </button>
        </div>
      </header>

      {/* Premium Full-Screen Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ clipPath: 'circle(0% at top right)' }}
            animate={{ clipPath: 'circle(150% at top right)' }}
            exit={{ clipPath: 'circle(0% at top right)' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 bg-deep-forest flex flex-col justify-between"
          >
            {/* Top header in menu */}
            <div className="w-full pt-8 px-6 flex justify-between items-center">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="w-16 h-16 rounded-full overflow-hidden flex items-center justify-center mix-blend-screen"
              >
                <img 
                  src={`${import.meta.env.BASE_URL}assets/images/saanj-bagh-logo.jpg`}
                  alt="Saanjh"
                  className="w-full h-full object-contain"
                />
              </motion.div>
              {/* Close button is handled by the toggle above using z-50 */}
            </div>

            {/* Centered Navigation */}
            <div className="flex-1 flex flex-col justify-center items-center space-y-12 px-6">
              {[...navLinks, { name: 'Reserve', href: 'tel:+916350049073' }].map((link, i) => (
                <div key={link.name} className="overflow-hidden">
                  <motion.a
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    initial={{ y: '100%', opacity: 0 }}
                    animate={{ y: '0%', opacity: 1 }}
                    exit={{ y: '-100%', opacity: 0 }}
                    transition={{ delay: 0.3 + i * 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    whileHover={{ scale: 1.05, color: '#C9A45C' }}
                    whileTap={{ scale: 0.95 }}
                    className={`block text-4xl font-serif tracking-widest uppercase transition-colors ${
                      link.name === 'Reserve' ? 'text-muted-gold mt-8' : 'text-soft-cream'
                    }`}
                  >
                    {link.name}
                  </motion.a>
                </div>
              ))}
            </div>

            {/* Bottom Accent */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 1 }}
              className="w-full pb-10 px-6 text-center text-soft-cream/40 text-[10px] tracking-[0.3em] uppercase"
            >
              Jodhpur, Rajasthan
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
