import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MarwarArch from './MarwarArch';

const faqs = [
  {
    id: 'faq-1',
    question: 'Is Saanj Bagh in Jodhpur vegetarian or non-vegetarian?',
    answer:
      'Saanj Bagh in Jodhpur is a vegetarian dining destination. It serves vegetarian food and does not serve non-vegetarian dishes.'
  },
  {
    id: 'faq-2',
    question: 'Does Saanj Bagh serve chicken, mutton, or fish?',
    answer:
      'No. Saanj Bagh does not serve non-vegetarian dishes such as chicken, mutton, or fish. Its food offering is vegetarian.'
  },
  {
    id: 'faq-3',
    question: 'Where is Saanj Bagh located?',
    answer:
      'Saanj Bagh is located along Airport Road, near Jeet Apartment, Ratanada, Jodhpur, Rajasthan 342011, India.'
  },
  {
    id: 'faq-4',
    question: 'Where can customers view the Saanj Bagh menu?',
    answer: (
      <span>
        You can explore our complete multi-section digital menu covering Indian specialties, pizzas, pastas, sizzlers, mocktails, and botanical cocktails directly at{' '}
        <a
          href="https://menu.saanjbagh.in/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-gold underline decoration-muted-gold/50 underline-offset-4 hover:text-soft-cream transition-colors font-medium"
        >
          menu.saanjbagh.in
        </a>.
      </span>
    )
  },
  {
    id: 'faq-5',
    question: 'How can customers contact or reserve a table at Saanj Bagh?',
    answer: (
      <span>
        For reservations and private dining enquiries, you can call our concierge at{' '}
        <a
          href="tel:+916350049073"
          className="text-muted-gold underline decoration-muted-gold/50 underline-offset-4 hover:text-soft-cream transition-colors font-medium"
        >
          +91 63500 49073
        </a>{' '}
        or connect with us on Instagram{' '}
        <a
          href="https://instagram.com/saanjbagh"
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-gold underline decoration-muted-gold/50 underline-offset-4 hover:text-soft-cream transition-colors font-medium"
        >
          @saanjbagh
        </a>.
      </span>
    )
  }
];

const FAQScene = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section
      id="faq-section"
      aria-labelledby="faq-heading"
      className="relative w-full bg-deep-forest text-soft-cream py-28 md:py-36 px-6 md:px-12 border-t border-muted-gold/15 overflow-hidden z-10 -mt-[2px]"
    >
      {/* Subtle Marwar Background Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5 z-0">
        <MarwarArch variant="solid" className="w-[120vw] md:w-[70vw] h-[100vh] text-royal-beige" />
      </div>

      <div className="container mx-auto max-w-4xl relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.8 }}
            className="mb-4 inline-block"
          >
            <span className="text-[10px] uppercase tracking-[0.4em] font-semibold text-muted-gold">
              Guest Information &amp; Essentials
            </span>
          </motion.div>

          <motion.h2
            id="faq-heading"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-3xl md:text-5xl font-serif text-soft-cream leading-tight"
          >
            Frequently Asked Questions
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-6 text-sm md:text-base text-soft-cream/70 font-serif max-w-2xl mx-auto leading-relaxed"
          >
            Essential dining facts, dietary classification, and venue guidelines for our guests in Jodhpur, Rajasthan.
          </motion.p>
        </div>

        {/* Accordion / FAQ List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="border border-muted-gold/20 rounded-sm bg-warm-sand/5 backdrop-blur-sm overflow-hidden transition-colors hover:border-muted-gold/40"
              >
                <button
                  type="button"
                  onClick={() => toggleFAQ(index)}
                  aria-expanded={isOpen}
                  aria-controls={`${faq.id}-answer`}
                  id={`${faq.id}-question`}
                  className="w-full text-left p-6 md:p-7 flex items-center justify-between gap-4 focus:outline-none focus:ring-1 focus:ring-muted-gold"
                >
                  <span className="text-base md:text-lg font-serif text-soft-cream font-medium tracking-wide">
                    {faq.question}
                  </span>
                  <span
                    className={`shrink-0 w-8 h-8 rounded-full border border-muted-gold/30 flex items-center justify-center text-muted-gold transition-transform duration-300 ${
                      isOpen ? 'rotate-180 bg-muted-gold/10' : ''
                    }`}
                    aria-hidden="true"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`${faq.id}-answer`}
                      role="region"
                      aria-labelledby={`${faq.id}-question`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <div className="px-6 pb-6 md:px-7 md:pb-7 text-sm md:text-base text-soft-cream/80 font-serif leading-relaxed border-t border-muted-gold/10 pt-4">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default FAQScene;
