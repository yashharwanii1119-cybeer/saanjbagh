import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import MarwarArch from './MarwarArch';
import { CINEMATIC_SPRING, FAST_SPRING } from '../utils/motion';

/**
 * Saanj Bagh Vegetarian Cuisine Showcase Data
 * Easily extensible array of authentic vegetarian dishes.
 */
export const CUISINE_ITEMS = [
  {
    id: 'dahi-ke-kebab',
    title: 'Dahi Ke Kebab',
    subtitle: 'Crisp Mathania Spiced Patties',
    category: 'Clay-Oven & Tandoor',
    tag: 'Signature Starter',
    description:
      'Silken hung curd infused with crushed roasted cumin, fresh coriander, and delicate desert spices, flash-crisped to golden perfection and paired with pickled shallots and beetroot essence.',
    image: `${import.meta.env.BASE_URL}assets/images/cuisine-kebabs.jpg`,
    alt: 'Saanj Bagh Artisanal Dahi Ke Kebab with Pickled Shallots and Beetroot Reduction',
    accentNote: 'Crisp Crust • Velvety Heart'
  },
  {
    id: 'florentine-starter',
    title: 'Stuffed Florentine Rolls',
    subtitle: 'Herb-Crusted Garden Medley',
    category: 'Around the World',
    tag: 'Botanical Fusion',
    description:
      'Artisanal farm-fresh spinach, cottage cheese, and sweet corn encased in a delicate golden herb crust, drizzled with aromatic herb coulis and house-made pomegranate glaze.',
    image: `${import.meta.env.BASE_URL}assets/images/cuisine-starter-platter.jpg`,
    alt: 'Saanj Bagh Stuffed Florentine Herb Crusted Rolls with Pomegranate Coulis',
    accentNote: 'Cottage Cheese • Garden Herbs'
  },
  {
    id: 'baked-pomodoro',
    title: 'Baked Vegetable Lasagna',
    subtitle: 'Slow-Simmered Pomodoro & Melted Bocconcini',
    category: 'Pasta & Continental',
    tag: 'Italian Hearth',
    description:
      'Tender layers of handcrafted pasta, garden vegetables, and sun-ripened San Marzano tomato reduction, baked under a bubbling crown of artisanal mozzarella and fresh basil leaves.',
    image: `${import.meta.env.BASE_URL}assets/images/cuisine-baked-lasagna.jpg`,
    alt: 'Saanj Bagh Slow-Baked Vegetable Lasagna in San Marzano Tomato Sauce',
    accentNote: 'Molten Mozzarella • Fresh Basil'
  },
  {
    id: 'burrata-neapolitan',
    title: 'Rucola Burrata Pizza',
    subtitle: 'Wood-Fired Neapolitan Crust',
    category: 'Pizzas & Wood-Fired',
    tag: 'Chef’s Special',
    description:
      'Slow-fermented sourdough crust blistered at high heat, layered with San Marzano sauce, fresh peppery rucola, and a creamy whole burrata sphere finished with cold-pressed olive oil.',
    image: `${import.meta.env.BASE_URL}assets/images/cuisine-burrata-pizza.jpg`,
    alt: 'Saanj Bagh Artisan Wood-Fired Neapolitan Pizza with Whole Fresh Burrata',
    accentNote: 'Artisan Burrata • Sourdough'
  },
  {
    id: 'botanical-cocktail',
    title: 'Sunset Botanical Elixir',
    subtitle: 'Layered Herb & Citrus Craft Beverage',
    category: 'Botanical Bar & Kitchen',
    tag: 'Evening Sanctuary',
    description:
      'A signature dual-toned botanical aperitif blending crushed garden mint, citrus reduction, butterfly pea blossom, and craft aromatic infusions crafted for sunset conversations.',
    image: `${import.meta.env.BASE_URL}assets/images/cuisine-botanical-cocktail.jpg`,
    alt: 'Saanj Bagh Dual-Layered Sunset Botanical Bar Cocktail with Fresh Citrus',
    accentNote: 'Garden Mint • Cold Infusion'
  }
];

const CuisineScene = () => {
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Preload upcoming cuisine imagery to prevent render flicker
  useEffect(() => {
    CUISINE_ITEMS.forEach((item) => {
      const img = new Image();
      img.src = item.image;
    });

    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mql.matches);
    const handler = (e) => setPrefersReducedMotion(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);

  // Track scroll through the expanded container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  const smoothProgress = useSpring(scrollYProgress, CINEMATIC_SPRING);

  // Atmospheric Color Transition: Warm Sand to Deep Forest
  const bg = useTransform(smoothProgress, [0, 0.2, 0.8, 1], ['#CDBB96', '#10251B', '#10251B', '#10251B']);
  const textColor = useTransform(smoothProgress, [0, 0.2], ['#10251B', '#E7DCC4']);
  const accentColor = useTransform(smoothProgress, [0, 0.2], ['#6F5732', '#C9A45C']);

  // Lantern light intensity
  const lanternOpacity = useTransform(smoothProgress, [0.1, 0.9], [0.3, 0.6]);

  // Update active slide index based on raw scroll progression
  useEffect(() => {
    const total = CUISINE_ITEMS.length;
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      // Map 0 -> 1 progress safely into [0 .. total - 1]
      const clamped = Math.max(0, Math.min(0.9999, latest));
      const nextIdx = Math.floor(clamped * total);
      setActiveIndex(nextIdx);
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
    tiltX.set(y * -0.06);
    tiltY.set(x * 0.06);
  };

  const handleMouseLeave = () => {
    tiltX.set(0);
    tiltY.set(0);
  };

  // Direct tab / indicator jump helper
  const handleJumpToSlide = (idx) => {
    if (!containerRef.current) return;
    const total = CUISINE_ITEMS.length;
    const containerTop = containerRef.current.offsetTop;
    const containerHeight = containerRef.current.offsetHeight;
    const windowH = window.innerHeight;
    const scrollableDistance = containerHeight - windowH;
    const targetScroll = containerTop + (idx / (total - 1 || 1)) * scrollableDistance;
    window.scrollTo({ top: targetScroll, behavior: 'smooth' });
  };

  const currentDish = CUISINE_ITEMS[activeIndex] || CUISINE_ITEMS[0];

  return (
    <motion.section
      id="cuisine-scene"
      ref={containerRef}
      style={{ backgroundColor: bg }}
      // Section height scaled by number of dishes (5 dishes * 100vh = 500vh container)
      // gives each dish a deliberate, unhurried, comfortable scroll span
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
        <div className="container mx-auto px-6 md:px-12 relative z-10 w-full max-w-7xl h-full flex flex-col justify-center py-6 md:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
            
            {/* LEFT COLUMN: Editorial Details, Category & Progress Indicators */}
            <div className="lg:col-span-5 order-2 lg:order-1 flex flex-col justify-center">
              
              {/* Eyebrow & Category Header */}
              <div className="flex items-center gap-3 mb-3 md:mb-5">
                <span className="text-[10px] md:text-xs uppercase tracking-[0.35em] font-semibold text-muted-gold">
                  Vegetarian Culinary Artistry
                </span>
                <span className="text-muted-gold/40 text-xs hidden sm:inline">•</span>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={currentDish.category}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.3 }}
                    className="text-[10px] uppercase tracking-[0.25em] text-soft-cream/60 font-medium"
                  >
                    {currentDish.category}
                  </motion.span>
                </AnimatePresence>
              </div>

              {/* Dish Name & Subtitle Transition */}
              <div className="min-h-[110px] md:min-h-[140px] flex flex-col justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentDish.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="inline-block mb-1.5">
                      <span className="text-[9px] uppercase tracking-[0.3em] font-bold text-[#C9A45C] bg-[#C9A45C]/10 border border-[#C9A45C]/25 px-2.5 py-0.5 rounded-full">
                        {currentDish.tag}
                      </span>
                    </div>
                    <motion.h3
                      style={{ color: textColor }}
                      className="text-3xl md:text-4xl lg:text-5xl font-serif leading-[1.1] tracking-tight"
                    >
                      {currentDish.title}
                    </motion.h3>
                    <p className="text-xs md:text-sm uppercase tracking-[0.2em] text-muted-gold/80 font-medium mt-1">
                      {currentDish.subtitle}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Editorial Description */}
              <div className="min-h-[90px] md:min-h-[110px] mt-2 mb-4 md:mb-6">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={currentDish.description}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35, delay: 0.05 }}
                    style={{ color: textColor }}
                    className="font-serif leading-relaxed text-sm md:text-base opacity-80 max-w-lg"
                  >
                    {currentDish.description}
                  </motion.p>
                </AnimatePresence>
              </div>

              {/* Sensory Accent Note Pill */}
              <div className="mb-6 md:mb-8">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentDish.accentNote}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="inline-flex items-center gap-2 text-xs font-serif italic text-muted-gold/90 bg-warm-sand/10 border border-muted-gold/20 px-3.5 py-1.5 rounded-full"
                  >
                    <span className="text-[9px] text-muted-gold">✦</span>
                    <span>{currentDish.accentNote}</span>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Slide Counter & Minimal Progress Indicators */}
              <div className="pt-4 border-t border-muted-gold/15 flex flex-wrap items-center justify-between gap-4">
                
                {/* Numeric Slide Indicator */}
                <div className="flex items-baseline gap-2 font-serif">
                  <span className="text-2xl md:text-3xl font-semibold text-muted-gold">
                    0{activeIndex + 1}
                  </span>
                  <span className="text-sm text-soft-cream/40">
                    / 0{CUISINE_ITEMS.length}
                  </span>
                </div>

                {/* Interactive Dish Bars */}
                <div className="flex items-center gap-2" role="tablist" aria-label="Cuisine slides">
                  {CUISINE_ITEMS.map((dish, idx) => {
                    const isActive = idx === activeIndex;
                    return (
                      <button
                        key={dish.id}
                        type="button"
                        onClick={() => handleJumpToSlide(idx)}
                        aria-label={`View ${dish.title}`}
                        aria-selected={isActive}
                        role="tab"
                        className="group py-2 focus:outline-none"
                      >
                        <div
                          className={`h-1.5 rounded-full transition-all duration-500 ${
                            isActive
                              ? 'w-10 bg-muted-gold shadow-[0_0_12px_rgba(201,164,92,0.8)]'
                              : 'w-4 bg-soft-cream/20 group-hover:bg-soft-cream/40'
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
                  className="text-xs uppercase tracking-[0.2em] font-bold text-muted-gold hover:text-soft-cream transition-colors flex items-center gap-2"
                >
                  <span>Full Menu</span>
                  <span className="w-5 h-[1px] bg-current" />
                </a>

              </div>

            </div>

            {/* RIGHT COLUMN: Large Food Photograph Inside Signature Marwar Arch */}
            <div className="lg:col-span-7 order-1 lg:order-2 flex justify-center items-center perspective-[1200px]">
              <motion.div
                style={{
                  rotateX: tiltX,
                  rotateY: tiltY,
                  z: 50
                }}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="relative w-full max-w-md lg:max-w-lg aspect-[3/4] md:aspect-[4/5]"
                data-cursor="view"
              >
                {/* Architectural Outer Shadow Recess */}
                <MarwarArch
                  variant="solid"
                  className="absolute inset-[-6%] text-[#08120d] opacity-60 blur-md pointer-events-none shadow-[inset_0_20px_50px_rgba(0,0,0,0.6)]"
                />

                {/* Arch Mask Framing the Food Imagery */}
                <MarwarArch
                  variant="mask"
                  className="w-full h-full relative z-10 shadow-[0_25px_60px_rgba(0,0,0,0.5)] border border-muted-gold/20 overflow-hidden"
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentDish.id}
                      initial={{ opacity: 0, scale: 1.08 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      transition={{
                        duration: prefersReducedMotion ? 0.2 : 0.65,
                        ease: [0.22, 1, 0.36, 1]
                      }}
                      className="w-full h-full relative"
                    >
                      <img
                        src={currentDish.image}
                        alt={currentDish.alt}
                        className="w-full h-full object-cover object-center"
                        loading="eager"
                        decoding="async"
                      />

                      {/* Subtle Ambient Vignette & Warm Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-deep-forest/70 via-transparent to-deep-forest/20 pointer-events-none" />
                      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_45%,_rgba(16,37,27,0.5)_100%)] pointer-events-none" />
                    </motion.div>
                  </AnimatePresence>

                  {/* Corner Botanical Hallmark Indicator */}
                  <div className="absolute bottom-4 left-4 z-20 pointer-events-none flex items-center gap-2 bg-deep-forest/80 backdrop-blur-md border border-muted-gold/30 px-3 py-1.5 rounded-sm">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                    <span className="text-[10px] uppercase tracking-[0.25em] text-soft-cream/90 font-medium">
                      Vegetarian • Jodhpur
                    </span>
                  </div>
                </MarwarArch>

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
