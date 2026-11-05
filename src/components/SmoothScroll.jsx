import React, { useEffect, useRef } from 'react';
import Lenis from 'lenis';

const SmoothScroll = ({ children }) => {
  const lenisRef = useRef(null);

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      return;
    }

    const isTouch = window.matchMedia('(pointer: coarse)').matches;

    // Initialize Lenis with controlled, elegant momentum damping
    // Prevents aggressive wheel jumps while preserving fluid editorial momentum
    const lenis = new Lenis({
      duration: isTouch ? 1.0 : 1.4, // Deliberate luxury editorial pacing
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 0.85, // Damps aggressive wheel impulses to prevent sudden multi-section skips
      smoothTouch: false, // Preserves native momentum gesture feel on touchscreens
      touchMultiplier: 1.5,
      infinite: false,
    });
    
    lenisRef.current = lenis;

    // Expose lenis instance globally for pinned section synchronization if needed
    window.__lenis = lenis;

    // requestAnimationFrame loop
    let rafId;
    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    
    rafId = requestAnimationFrame(raf);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      lenis.destroy();
      delete window.__lenis;
    };
  }, []);

  return <>{children}</>;
};

export default SmoothScroll;
