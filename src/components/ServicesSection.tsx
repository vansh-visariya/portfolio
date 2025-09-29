'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const services = [
  {
    title: "AI Model Development",
    description: "Building custom transformer models, GPT architectures, and neural networks from scratch using PyTorch and cutting-edge techniques.",
    icon: "🧠",
    color: "from-purple-500/20 to-pink-500/20",
    borderColor: "border-purple-500/30",
    hoverColor: "hover:border-purple-400/60",
    iconBg: "bg-purple-500/10"
  },
  {
    title: "Natural Language Processing",
    description: "Creating intelligent chatbots, document analysis systems, and language models with advanced RAG capabilities.",
    icon: "💬",
    color: "from-blue-500/20 to-cyan-500/20",
    borderColor: "border-blue-500/30",
    hoverColor: "hover:border-blue-400/60",
    iconBg: "bg-blue-500/10"
  },
  {
    title: "Custom AI Solutions",
    description: "Developing localized LLMs, cultural language models, and specialized AI systems tailored to specific domains.",
    icon: "🎯",
    color: "from-green-500/20 to-emerald-500/20",
    borderColor: "border-green-500/30",
    hoverColor: "hover:border-green-400/60",
    iconBg: "bg-green-500/10"
  },
  {
    title: "Machine Learning Research",
    description: "Implementing state-of-the-art research, fine-tuning models, and exploring novel approaches to AI challenges.",
    icon: "🔬",
    color: "from-orange-500/20 to-red-500/20",
    borderColor: "border-orange-500/30",
    hoverColor: "hover:border-orange-400/60",
    iconBg: "bg-orange-500/10"
  }
];

const ServicesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="services" ref={ref} className="py-32 px-6 bg-gradient-to-b from-black via-gray-900/50 to-black">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.h2
            className="text-5xl md:text-7xl font-bold mb-8 gradient-text"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            What I Do
          </motion.h2>
          <motion.p
            className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            I specialize in building intelligent AI systems that solve real-world problems,
            from transformer architectures to localized language models and beyond.
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8, delay: index * 0.15 }}
              className="group"
            >
              <div className={`
                relative overflow-hidden rounded-xl p-6 h-full
                bg-gradient-to-br ${service.color}
                backdrop-blur-sm border ${service.borderColor} ${service.hoverColor}
                transition-all duration-500 ease-out
                group-hover:scale-105 group-hover:shadow-2xl
                glass-effect
              `}>
                {/* Background pattern */}
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-radial from-white/5 to-transparent rounded-full -translate-y-16 translate-x-16" />
                </div>

                {/* Icon container */}
                <div className={`
                  relative w-16 h-16 rounded-lg ${service.iconBg}
                  flex items-center justify-center mb-6
                  group-hover:scale-110 transition-transform duration-300
                `}>
                  <span className="text-2xl">{service.icon}</span>
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <h3 className="text-xl font-bold mb-4 text-white group-hover:text-green-400 transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {service.description}
                  </p>
                </div>

                {/* Hover effect overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-green-400/5 to-blue-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-20"
        >
          <motion.a
            href="#work"
            className="inline-flex items-center px-10 py-5 bg-gradient-to-r from-green-400 to-blue-500 text-black font-bold text-lg rounded-lg hover:from-green-300 hover:to-blue-400 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl glow-effect"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View My Projects
            <svg className="ml-3 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
