import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Loader = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Check if we've already shown the loader in this session
    const hasLoaded = sessionStorage.getItem('saanjBaghLoaded');
    
    if (hasLoaded) {
      setIsVisible(false);
      onComplete();
      return;
    }

    // Sequence timing: 
    // Logo fade in: 0-0.5s
    // Hold: 0.5s-1.2s
    // Fade out: 1.2s-1.5s
    const timer = setTimeout(() => {
      setIsVisible(false);
      sessionStorage.setItem('saanjBaghLoaded', 'true');
      setTimeout(onComplete, 500); // Give time for exit animation
    }, 1500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ivory"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-center"
          >
            <img 
              src={`${import.meta.env.BASE_URL}assets/images/saanj-bagh-logo.jpg`} 
              alt="Saanj Bagh Logo" 
              className="h-32 md:h-48 object-contain mb-4"
            />
            {/* Subtle gold accent animation */}
            <motion.div 
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "100%", opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6, ease: "easeInOut" }}
              className="h-[1px] bg-champagne"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loader;
