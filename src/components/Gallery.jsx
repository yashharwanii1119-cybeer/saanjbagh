import React from 'react';
import { motion } from 'framer-motion';

const images = [
  { src: `${import.meta.env.BASE_URL}assets/images/gallery-2.png`, alt: 'Romantic dining table setup', className: 'col-span-12 md:col-span-8 aspect-[16/9]' },
  { src: `${import.meta.env.BASE_URL}assets/images/drinks.png`, alt: 'Cocktail', className: 'col-span-12 md:col-span-4 aspect-[4/5]' },
  { src: `${import.meta.env.BASE_URL}assets/images/gallery-1.png`, alt: 'Garden view', className: 'col-span-12 md:col-span-4 aspect-[3/4]' },
  { src: `${import.meta.env.BASE_URL}assets/images/gallery-3.png`, alt: 'Sunset view', className: 'col-span-12 md:col-span-8 aspect-[16/9]' },
];

const Gallery = () => {
  return (
    <section id="gallery" className="py-24 md:py-32 bg-ivory">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center mb-16 overflow-hidden">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <h2 className="text-xs font-sans uppercase tracking-[0.4em] text-antique mb-4 font-semibold">
              Visual Journey
            </h2>
            <h3 className="text-4xl md:text-5xl lg:text-6xl font-serif text-forest">
              Moments in Time
            </h3>
          </motion.div>
        </div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.15 }
            }
          }}
          className="grid grid-cols-12 gap-4 md:gap-6 lg:gap-8"
        >
          {images.map((image, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 50, scale: 0.95 },
                visible: { opacity: 1, y: 0, scale: 1 }
              }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className={`relative overflow-hidden group ${image.className}`}
            >
              <motion.img
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-forest/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Gallery;
