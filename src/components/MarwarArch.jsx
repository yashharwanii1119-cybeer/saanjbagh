import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { CINEMATIC_SPRING } from '../utils/motion';

/**
 * MarwarArch Component
 * 
 * Creates a traditional Marwar/Jodhpur architectural arch.
 * 
 * Props:
 * - variant: 'solid' (renders a solid arch shape) | 'mask' (masks its children into an arch) | 'cutout'
 * - className: additional Tailwind classes
 * - children: content to render inside the arch
 * - withVines: boolean, if true, adds subtle climbing botanical vines along the arch
 */
const MarwarArch = ({ 
  variant = 'solid', 
  className = '', 
  children,
  style = {},
  withVines = false
}) => {
  const archRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: archRef,
    offset: ["start end", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, CINEMATIC_SPRING);
  const vineSway1 = useTransform(smoothProgress, [0, 1], [-2, 2]);
  const vineSway2 = useTransform(smoothProgress, [0, 1], [2, -2]);

  // A subtle Rajput/Marwar scalloped arch profile.
  // Using a 0 0 100 100 viewBox so it can stretch via preserveAspectRatio="none"
  const archPath = `
    M 0 100
    L 0 25
    C 0 20, 4 16, 10 16
    C 25 16, 40 4, 50 0
    C 60 4, 75 16, 90 16
    C 96 16, 100 20, 100 25
    L 100 100
    Z
  `;

  // For cutout variant (a wall with an arch doorway cut out)
  const cutoutPath = `
    M 0 0 L 100 0 L 100 100 L 0 100 Z
    ${archPath}
  `;

  const renderVines = () => {
    if (!withVines) return null;
    return (
      <div className="absolute inset-0 pointer-events-none z-[15] overflow-hidden opacity-30 text-deep-forest mix-blend-multiply">
        {/* Left Vine */}
        <motion.div 
          className="absolute left-0 top-[20%] w-[10%] h-[50%]"
          style={{ rotate: vineSway1, transformOrigin: "top left" }}
        >
          <svg viewBox="0 0 50 200" preserveAspectRatio="none" className="w-full h-full" fill="currentColor">
            <path d="M 0 0 C 10 50, 40 100, 20 150 C 10 180, 5 190, 0 200 C 15 170, 25 140, 10 80 C 0 50, 0 20, 0 0 Z" />
          </svg>
        </motion.div>
        {/* Right Vine */}
        <motion.div 
          className="absolute right-0 top-[10%] w-[10%] h-[60%]"
          style={{ rotate: vineSway2, transformOrigin: "top right" }}
        >
          <svg viewBox="0 0 50 200" preserveAspectRatio="none" className="w-full h-full" fill="currentColor">
            <path d="M 50 0 C 40 50, 10 100, 30 150 C 40 180, 45 190, 50 200 C 35 170, 25 140, 40 80 C 50 50, 50 20, 50 0 Z" />
          </svg>
        </motion.div>
      </div>
    );
  };

  if (variant === 'mask') {
    return (
      <div 
        ref={archRef}
        className={`relative overflow-hidden ${className}`}
        style={{
          ...style,
          maskImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' preserveAspectRatio='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M 0 100 L 0 25 C 0 20, 4 16, 10 16 C 25 16, 40 4, 50 0 C 60 4, 75 16, 90 16 C 96 16, 100 20, 100 25 L 100 100 Z' fill='black'/%3E%3C/svg%3E")`,
          maskSize: '100% 100%',
          maskRepeat: 'no-repeat',
          WebkitMaskImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' preserveAspectRatio='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M 0 100 L 0 25 C 0 20, 4 16, 10 16 C 25 16, 40 4, 50 0 C 60 4, 75 16, 90 16 C 96 16, 100 20, 100 25 L 100 100 Z' fill='black'/%3E%3C/svg%3E")`,
          WebkitMaskSize: '100% 100%',
          WebkitMaskRepeat: 'no-repeat',
        }}
      >
        {children}
        {renderVines()}
      </div>
    );
  }

  if (variant === 'cutout') {
    return (
      <div ref={archRef} className={`relative ${className}`} style={style}>
        <svg 
          className="absolute inset-0 w-full h-full pointer-events-none" 
          viewBox="0 0 100 100" 
          preserveAspectRatio="none"
        >
          {/* Using evenodd fill rule to cut the hole */}
          <path 
            d="M0,0 L100,0 L100,100 L0,100 Z M 0 100 L 0 25 C 0 20, 4 16, 10 16 C 25 16, 40 4, 50 0 C 60 4, 75 16, 90 16 C 96 16, 100 20, 100 25 L 100 100 Z"
            fill="currentColor" 
            fillRule="evenodd"
          />
        </svg>
        {children}
        {renderVines()}
      </div>
    );
  }

  // default 'solid'
  return (
    <div ref={archRef} className={`relative ${className}`} style={style}>
      <svg 
        className="absolute inset-0 w-full h-full pointer-events-none" 
        viewBox="0 0 100 100" 
        preserveAspectRatio="none"
      >
        <path d={archPath} fill="currentColor" />
      </svg>
      {/* Container for absolute children */}
      <div className="absolute inset-0 z-10">
        {children}
      </div>
      {renderVines()}
    </div>
  );
};

export default MarwarArch;
