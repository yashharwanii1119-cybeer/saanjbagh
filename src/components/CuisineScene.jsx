import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import MarwarArch from './MarwarArch';
import { CINEMATIC_SPRING, FAST_SPRING } from '../utils/motion';

/**
 * Saanj Bagh Vegetarian Cuisine Showcase Photography
 * Array of authentic vegetarian cuisine photographs with WebP and JPG fallbacks.
 */
export const CUISINE_IMAGES = [
  {
    id: 'dahi-ke-kebab',
    webp: `${import.meta.env.BASE_URL}assets/images/cuisine-kebabs.webp`,
    jpg: `${import.meta.env.BASE_URL}assets/images/cuisine-kebabs.jpg`,
    alt: 'Saanj Bagh Vegetarian Culinary Artistry — Handcrafted Spiced Kebabs with Pickled Shallots'
  },
  {
    id: 'florentine-starter',
    webp: `${import.meta.env.BASE_URL}assets/images/cuisine-starter-platter.webp`,
    jpg: `${import.meta.env.BASE_URL}assets/images/cuisine-starter-platter.jpg`,
    alt: 'Saanj Bagh Vegetarian Culinary Artistry — Herb Crusted Medley with Aromatic Reduction'
  },
  {
    id: 'baked-pomodoro',
    webp: `${import.meta.env.BASE_URL}assets/images/cuisine-baked-lasagna.webp`,
    jpg: `${import.meta.env.BASE_URL}assets/images/cuisine-baked-lasagna.jpg`,
    alt: 'Saanj Bagh Vegetarian Culinary Artistry — Slow-Baked Garden Lasagna in San Marzano Pomodoro'
  },
  {
    id: 'burrata-neapolitan',
    webp: `${import.meta.env.BASE_URL}assets/images/cuisine-burrata-pizza.webp`,
    jpg: `${import.meta.env.BASE_URL}assets/images/cuisine-burrata-pizza.jpg`,
    alt: 'Saanj Bagh Vegetarian Culinary Artistry — Wood-Fired Neapolitan Pizza with Whole Fresh Burrata'
  },
  {
    id: 'botanical-cocktail',
    webp: `${import.meta.env.BASE_URL}assets/images/cuisine-botanical-cocktail.webp`,
    jpg: `${import.meta.env.BASE_URL}assets/images/cuisine-botanical-cocktail.jpg`,
    alt: 'Saanj Bagh Vegetarian Culinary Artistry — Layered Botanical Bar Infusion with Fresh Citrus'
  }
];

const CuisineScene = () => {
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loadedImages, setLoadedImages] = useState(() => ({ 0: true }));
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Robust proactive multi-stage preloader
  useEffect(() => {
    // Check reduced motion preference
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mql.matches);
    const mqlHandler = (e) => setPrefersReducedMotion(e.matches);
    mql.addEventListener('change', mqlHandler);

    // Preload and decode ALL images immediately so they reside in browser GPU cache
    CUISINE_IMAGES.forEach((item, index) => {
      const img = new Image();
      img.src = item.webp;

      if ('decode' in img) {
        img.decode()
          .then(() => {
            setLoadedImages((prev) => ({ ...prev, [index]: true }));
          })
          .catch(() => {
            // Fallback to onload or jpg
            img.onload = () => setLoadedImages((prev) => ({ ...prev, [index]: true }));
            img.onerror = () => {
              const fallback = new Image();
              fallback.src = item.jpg;
              fallback.onload = () => setLoadedImages((prev) => ({ ...prev, [index]: true }));
            };
          });
      } else {
        img.onload = () => setLoadedImages((prev) => ({ ...prev, [index]: true }));
      }
    });

    return () => mql.removeEventListener('change', mqlHandler);
  }, []);

  // Track scroll progress across the pinned container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  const smoothProgress = useSpring(scrollYProgress, CINEMATIC_SPRING);

  // Atmospheric Color Transitions: Warm Sand to Deep Forest
  const bg = useTransform(smoothProgress, [0, 0.2, 0.8, 1], ['#CDBB96', '#10251B', '#10251B', '#10251B']);
  const textColor = useTransform(smoothProgress, [0, 0.2], ['#10251B', '#E7DCC4']);
  const accentColor = useTransform(smoothProgress, [0, 0.2], ['#6F5732', '#C9A45C']);

  // Lantern light intensity
  const lanternOpacity = useTransform(smoothProgress, [0.1, 0.9], [0.3, 0.6]);

  // Update active slide index based on scroll position without re-rendering text
  useEffect(() => {
    const total = CUISINE_IMAGES.length;
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      const clamped = Math.max(0, Math.min(0.9999, latest));
      const nextIdx = Math.floor(clamped * total);
      setActiveIndex((prev) => (prev === nextIdx ? prev : nextIdx));
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  // 3D Tilt for food image
  const tiltX = useSpring(0, FAST_SPRING);
  const tiltY = useSpring(0, FAST_SPRING);

  const handleMouseMove = (e) => {
    if (prefersReducedMotion) return;
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    tiltX.set(y * -0.05);
    tiltY.set(x * 0.05);
  };

  const handleMouseLeave = () => {
    tiltX.set(0);
    tiltY.set(0);
  };

  // Direct tab / indicator jump helper
  const handleJumpToSlide = (idx) => {
    if (!containerRef.current) return;
    const total = CUISINE_IMAGES.length;
    const containerTop = containerRef.current.offsetTop;
    const containerHeight = containerRef.current.offsetHeight;
    const windowH = window.innerHeight;
    const scrollableDistance = containerHeight - windowH;
    const targetScroll = containerTop + (idx / (total - 1 || 1)) * scrollableDistance;
    window.scrollTo({ top: targetScroll, behavior: 'smooth' });
  };

  return (
    <motion.section
      id="cuisine-scene"
      ref={containerRef}
      style={{ backgroundColor: bg }}
      // Scaled scroll height (5 images * 100vh = 500vh container)
      // gives each photograph a generous, deliberate, fluid scroll span
      className="relative min-h-[500vh] w-full text-soft-cream -mt-[2px]"
      aria-label="Saanj Bagh Vegetarian Cuisine Showcase"
    >
      {/* Pinned Sticky Viewport: Locked while scrolling through all dishes */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        
        {/* Subtle Warm Lantern Ambience */}
        <motion.div
          className="absolute top-[15%] right-[10%] w-[60%] h-[60%] pointer-events-none mix-blend-overlay z-0"
          style={{ opacity: lanternOpacity }}
        >
          <div className="w-full h-full bg-[radial-gradient(circle_at_center,_rgba(201,164,92,1)_0%,_transparent_70%)] blur-[50px]" />
        </motion.div>

        {/* Ambient Marwar Arch Background Watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5 z-0">
          <MarwarArch variant="solid" className="w-[120vw] md:w-[75vw] h-[110vh] text-royal-beige" />
        </div>

        {/* Floating Background Typography */}
        <div className="absolute top-[4%] md:top-[8%] right-6 md:right-[8%] z-0 pointer-events-none text-right">
          <motion.span
            style={{ color: accentColor }}
            className="text-[12vw] md:text-[9vw] font-serif leading-[0.8] tracking-tighter opacity-10 select-none block"
          >
            CUISINE
          </motion.span>
        </div>

        {/* Main Editorial Split-Screen Layout */}
        <div className="container mx-auto px-5 sm:px-6 md:px-12 relative z-10 w-full max-w-7xl h-full flex flex-col justify-center py-4 md:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-14 items-center">
            
            {/* LEFT COLUMN: UNIVERSAL BRAND CONTENT (Stationary, Unchanging Across All Slides) */}
            <div className="lg:col-span-5 order-2 lg:order-1 flex flex-col justify-center">
              
              {/* Eyebrow */}
              <div className="mb-2 md:mb-5">
                <span className="text-[10px] md:text-xs uppercase tracking-[0.35em] font-semibold text-muted-gold">
                  VEGETARIAN CULINARY ARTISTRY
                </span>
              </div>

              {/* Main Heading */}
              <div className="mb-3 md:mb-6">
                <motion.h2
                  style={{ color: textColor }}
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif leading-[1.08] tracking-tight text-balance"
                >
                  A Celebration of <br className="hidden sm:inline" />
                  Nature, Heritage &amp; Flavour.
                </motion.h2>
              </div>

              {/* Description */}
              <div className="mb-4 md:mb-8">
                <motion.p
                  style={{ color: textColor }}
                  className="font-serif leading-relaxed text-xs sm:text-sm md:text-base opacity-80 max-w-lg"
                >
                  Rooted in Rajasthan&apos;s culinary heritage, Saanj Bagh celebrates thoughtfully crafted vegetarian cuisine, bringing together regional ingredients, traditional techniques and contemporary culinary artistry.
                </motion.p>
              </div>

              {/* Supporting Line Pill */}
              <div className="mb-6 md:mb-10">
                <div className="inline-flex items-center gap-2 text-[11px] sm:text-xs font-serif italic text-muted-gold/90 bg-warm-sand/10 border border-muted-gold/20 px-3.5 py-1.5 md:px-4 md:py-2 rounded-full">
                  <span className="text-[9px] text-muted-gold">✦</span>
                  <span>Locally Inspired · Thoughtfully Crafted · Entirely Vegetarian</span>
                </div>
              </div>

              {/* Slide Counter & Minimal Progress Indicators */}
              <div className="pt-3 md:pt-4 border-t border-muted-gold/15 flex flex-wrap items-center justify-between gap-4">
                
                {/* Numeric Slide Indicator */}
                <div className="flex items-baseline gap-2 font-serif">
                  <span className="text-xl md:text-3xl font-semibold text-muted-gold">
                    0{activeIndex + 1}
                  </span>
                  <span className="text-xs md:text-sm text-soft-cream/40">
                    / 0{CUISINE_IMAGES.length}
                  </span>
                </div>

                {/* Minimal Interactive Progress Bars */}
                <div className="flex items-center gap-2" role="tablist" aria-label="Cuisine photography progress">
                  {CUISINE_IMAGES.map((item, idx) => {
                    const isActive = idx === activeIndex;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => handleJumpToSlide(idx)}
                        aria-label={`View photography slide 0${idx + 1}`}
                        aria-selected={isActive}
                        role="tab"
                        className="group py-2 focus:outline-none"
                      >
                        <div
                          className={`h-1.5 rounded-full transition-all duration-500 ${
                            isActive
                              ? 'w-8 sm:w-10 bg-muted-gold shadow-[0_0_12px_rgba(201,164,92,0.8)]'
                              : 'w-3 sm:w-4 bg-soft-cream/20 group-hover:bg-soft-cream/40'
                          }`}
                        />
                      </button>
                    );
                  })}
                </div>

                {/* Direct Link to Official Digital Menu */}
                <a
                  href="https://menu.saanjbagh.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] md:text-xs uppercase tracking-[0.2em] font-bold text-muted-gold hover:text-soft-cream transition-colors flex items-center gap-2"
                >
                  <span>Full Menu</span>
                  <span className="w-5 h-[1px] bg-current" />
                </a>

              </div>

            </div>

            {/* RIGHT COLUMN: Pure Food Photography Area in Clean, Elegant Rectangular Container */}
            <div className="lg:col-span-7 order-1 lg:order-2 flex justify-center items-center perspective-[1200px]">
              <motion.div
                style={{
                  rotateX: tiltX,
                  rotateY: tiltY,
                  z: 50
                }}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="relative w-full max-w-[280px] sm:max-w-sm md:max-w-md lg:max-w-lg aspect-[4/5] mx-auto"
                data-cursor="view"
              >
                {/* Elegant subtle architectural drop shadow on rectangular container */}
                <div className="absolute inset-0 bg-[#08120d]/80 blur-xl translate-y-3 pointer-events-none rounded-sm" />

                {/* Clean, Elegant Rectangular Image Container (No arch masks, no clip paths, subtle 2px border radius) */}
                <div className="w-full h-full relative z-10 rounded-[2px] shadow-[0_20px_50px_rgba(0,0,0,0.55)] border border-muted-gold/25 overflow-hidden bg-[#10251B]">
                  {/* Layered Persistent Image Canvas:
                      All images exist simultaneously as absolute layers.
                      Transitions crossfade opacity smoothly with ZERO blank frame gaps.
                  */}
                  <div className="relative w-full h-full overflow-hidden">
                    {CUISINE_IMAGES.map((dish, index) => {
                      const isActive = index === activeIndex;
                      const isLoaded = loadedImages[index] || index === 0;

                      return (
                        <motion.div
                          key={dish.id}
                          className="absolute inset-0 w-full h-full"
                          initial={false}
                          animate={{
                            opacity: isActive ? 1 : 0,
                            scale: isActive ? 1 : 1.05,
                            zIndex: isActive ? 10 : 1
                          }}
                          transition={{
                            opacity: {
                              duration: prefersReducedMotion ? 0.2 : 0.7,
                              ease: [0.22, 1, 0.36, 1]
                            },
                            scale: {
                              duration: prefersReducedMotion ? 0.2 : 0.9,
                              ease: [0.22, 1, 0.36, 1]
                            }
                          }}
                          style={{
                            pointerEvents: isActive ? 'auto' : 'none'
                          }}
                        >
                          <picture className="w-full h-full block">
                            <source srcSet={dish.webp} type="image/webp" />
                            <img
                              src={isLoaded ? dish.webp : dish.jpg}
                              alt={dish.alt}
                              className="w-full h-full object-cover object-center"
                              loading={index <= 1 ? 'eager' : 'lazy'}
                              decoding="async"
                              onError={(e) => {
                                // Fallback to JPG immediately if WebP fails
                                if (e.currentTarget.src !== dish.jpg) {
                                  e.currentTarget.src = dish.jpg;
                                }
                              }}
                            />
                          </picture>
                        </motion.div>
                      );
                    })}

                    {/* Subtle Ambient Vignette & Warm Depth Gradients (Clean: No text overlay) */}
                    <div className="absolute inset-0 bg-gradient-to-t from-deep-forest/40 via-transparent to-deep-forest/10 pointer-events-none z-20" />
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_55%,_rgba(16,37,27,0.35)_100%)] pointer-events-none z-20" />
                  </div>
                </div>

                {/* Subtle Floating Decorative Scroll Cue */}
                <div className="absolute -bottom-6 right-2 z-20 pointer-events-none hidden md:flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-muted-gold/60">
                  <span>Scroll to explore</span>
                  <span className="inline-block animate-bounce">↓</span>
                </div>
              </motion.div>
            </div>

          </div>
        </div>

      </div>
    </motion.section>
  );
};

export default CuisineScene;
