'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const groups = [
  {
    title: 'AI/ML Engineering',
    items: ['Transformer Architectures', 'LLM Fine-tuning', 'RAG Systems', 'Neural Networks', 'Model Optimization', 'MLOps'],
  },
  {
    title: 'Development',
    items: ['Python / PyTorch', 'LangChain / LangGraph', 'Vector Databases', 'API Design', 'Streamlit / Gradio', 'Full-stack Apps'],
  },
  {
    title: 'Research',
    items: ['NLP / NLU', 'Attention Mechanisms', 'Cultural AI Models', 'Evaluation Frameworks', 'Dataset Curation', 'AI Safety'],
  },
];

const Capabilities = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="capabilities" ref={ref} className="relative py-28 md:py-36 px-6 z-10">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <p className="tag mb-4 text-xs tracking-widest uppercase">Expertise</p>
          <h2 className="heading-lg mb-4">
            Areas of <span className="gradient-text">expertise</span>
          </h2>
          <p className="text-white/45 max-w-xl text-base leading-relaxed">
            Deep knowledge across AI/ML engineering, development, and research.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {groups.map((g, i) => (
            <motion.div
              key={g.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="card-flat rounded-2xl p-6 md:p-8"
            >
              <h3 className="text-lg font-semibold text-white/90 mb-6">{g.title}</h3>
              <ul className="space-y-3">
                {g.items.map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-sm text-white/50">
                    <div className="w-1 h-1 rounded-full bg-indigo-400/60" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Capabilities;
