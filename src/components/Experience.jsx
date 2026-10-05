import React from 'react';
import { motion } from 'framer-motion';

const experiences = [
  {
    title: 'Botanical Dining',
    description: 'A serene garden setting surrounded by lush greenery and warm ambient lighting.',
    image: `${import.meta.env.BASE_URL}assets/images/gallery-1.png`,
  },
  {
    title: 'Culinary Artistry',
    description: 'Premium Indian and Continental flavours presented with elegant artistry.',
    image: `${import.meta.env.BASE_URL}assets/images/food.png`,
  },
  {
    title: 'Crafted Evenings',
    description: 'Signature cocktails, intimate conversations, and unforgettable sunsets.',
    image: `${import.meta.env.BASE_URL}assets/images/drinks.png`,
  }
];

const Experience = () => {
  return (
    <section id="experience" className="py-24 md:py-32 bg-forest text-ivory overflow-hidden relative">
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-xs font-sans uppercase tracking-[0.4em] text-champagne mb-4 font-semibold"
          >
            The Experience
          </motion.h2>
          <motion.h3 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.1, ease: "easeOut" }}
            className="text-4xl md:text-5xl lg:text-6xl font-serif text-ivory mb-6"
          >
            A Journey for the Senses
          </motion.h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, delay: index * 0.2, ease: "easeOut" }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[3/4] overflow-hidden mb-8 rounded-sm">
                <img
                  src={exp.image}
                  alt={exp.title}
                  className="w-full h-full object-cover transition-transform duration-1000 ease-[0.25,0.46,0.45,0.94] group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest via-forest/20 to-transparent opacity-80 group-hover:opacity-50 transition-opacity duration-700" />
                
                {/* Gold Accent Overlay Frame */}
                <div className="absolute inset-4 border border-champagne/0 group-hover:border-champagne/30 transition-colors duration-700 pointer-events-none" />
              </div>
              
              <div className="overflow-hidden">
                <motion.div 
                  className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out"
                >
                  <h4 className="text-2xl font-serif text-champagne mb-3">{exp.title}</h4>
                  <p className="text-ivory/70 font-light leading-relaxed text-sm">{exp.description}</p>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
