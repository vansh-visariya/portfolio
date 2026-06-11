'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { projects } from '@/content/projects';

const WorkSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <section ref={ref} id="work" className="relative py-28 md:py-36 px-6 z-10">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16 md:mb-20 text-center"
        >
          <p className="tag mb-4 text-xs tracking-widest uppercase">Featured Projects</p>
          <h2 className="heading-lg mb-4">
            Things I&apos;ve <span className="gradient-text">Built</span>
          </h2>
          <p className="text-white/50 max-w-xl mx-auto text-base leading-relaxed">
            A selection of AI/ML projects showcasing expertise in transformer architectures,
            LLM applications, and intelligent systems.
          </p>
        </motion.div>

        {/* Projects grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.a
              key={project.id}
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: index * 0.15 }}
              className="group block"
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div className={`card p-6 md:p-8 h-full relative overflow-hidden bg-gradient-to-br ${project.gradient}`}>
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-2xl">
                    {project.emoji}
                  </div>
                  <svg
                    className={`w-5 h-5 text-white/20 transition-all duration-300 ${hoveredId === project.id ? 'text-white/60 translate-x-1 -translate-y-1' : ''}`}
                    fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 17L17 7M17 7H7M17 7v10" />
                  </svg>
                </div>

                {/* Category */}
                <p className="text-xs text-white/40 font-mono tracking-wider uppercase mb-2">
                  {project.category}
                </p>

                {/* Title */}
                <h3 className="text-xl font-semibold mb-3 text-white group-hover:text-white transition-colors duration-300">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-white/50 leading-relaxed mb-6">
                  {project.description}
                </p>

                {/* Features */}
                <div className="space-y-2 mb-6">
                  {project.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-2 text-sm text-white/40">
                      <div className="w-1 h-1 rounded-full bg-white/60" />
                      {feature}
                    </div>
                  ))}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.tags.map((tag) => (
                    <span key={tag} className="tag text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        {/* View all */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-14"
        >
          <a
            href="https://github.com/vansh-visariya"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline"
          >
            View All on GitHub
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default WorkSection;
