'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const services = [
  {
    title: 'AI Model Development',
    description: 'Building custom transformer models, GPT architectures, and neural networks from scratch using PyTorch.',
    icon: '🧠',
  },
  {
    title: 'Natural Language Processing',
    description: 'Creating intelligent chatbots, document analysis systems, and language models with advanced RAG capabilities.',
    icon: '💬',
  },
  {
    title: 'Custom AI Solutions',
    description: 'Developing localized LLMs, cultural language models, and specialized AI systems tailored to specific domains.',
    icon: '🎯',
  },
  {
    title: 'Machine Learning Research',
    description: 'Implementing state-of-the-art research, fine-tuning models, and exploring novel approaches to AI challenges.',
    icon: '🔬',
  },
];

const ServicesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="services" ref={ref} className="py-28 md:py-36 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <p className="tag mb-4 text-xs tracking-widest uppercase">Services</p>
          <h2 className="heading-lg mb-4">
            How I can <span className="gradient-text">help</span>
          </h2>
          <p className="text-white/45 max-w-xl text-base leading-relaxed">
            Specialized in building intelligent AI systems that solve real-world problems.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="card p-6 group"
            >
              <div className="w-10 h-10 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-xl mb-5 group-hover:bg-indigo-500/10 group-hover:border-indigo-500/20 transition-all duration-300">
                {service.icon}
              </div>
              <h3 className="font-semibold text-white/90 mb-2 group-hover:text-indigo-300 transition-colors duration-300">
                {service.title}
              </h3>
              <p className="text-sm text-white/40 leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
