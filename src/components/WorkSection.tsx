'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  color: string;
  tags: string[];
  github: string;
  features: string[];
}

const projects: Project[] = [
  {
    id: 1,
    title: "Kaito-AI",
    category: "AI Chatbot Platform",
    description: "Intelligent search & document analysis chatbot with RAG capabilities, web search integration, and multi-threading conversation management.",
    image: "🤖",
    color: "from-indigo-500/20 to-purple-500/20",
    tags: ["LangGraph", "RAG", "Streamlit", "Groq"],
    github: "https://github.com/vansh-visariya/kaito-ai",
    features: ["Web Search Mode", "Document Analysis", "Chat History", "Vector Search"]
  },
  {
    id: 2,
    title: "BhiduAI",
    category: "Localized LLM",
    description: "Cultural language model fine-tuned with Mumbai Bambaiyya slang, mixing Hindi, English, and local street language for authentic conversations.",
    image: "💬",
    color: "from-emerald-500/20 to-cyan-500/20",
    tags: ["LoRA", "Fine-tuning", "Gemma-2", "Cultural AI"],
    github: "https://github.com/vansh-visariya/BhiduAI",
    features: ["Mumbai Slang", "Cultural Nuances", "Localized Responses", "3000+ Dataset"]
  },
  {
    id: 3,
    title: "Kaito-Model",
    category: "Transformer Implementation",
    description: "Complete GPT-2 style transformer model built from scratch using PyTorch, demonstrating core concepts of self-attention and autoregressive generation.",
    image: "🧠",
    color: "from-violet-500/20 to-pink-500/20",
    tags: ["PyTorch", "Transformer", "GPT-2", "From Scratch"],
    github: "https://github.com/vansh-visariya/kaito-model",
    features: ["Multi-Head Attention", "Layer Normalization", "Text Generation", "Training Pipeline"]
  }
];

const WorkSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  return (
    <section ref={ref} id="work" className="relative py-24 px-6 z-10">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.h2
            className="text-2xl md:text-3xl font-bold mb-8 pixel-text-secondary"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            === PROJECT ARCHIVE ===
          </motion.h2>
          <motion.p
            className="text-xl md:text-2xl text-white/80 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            A showcase of my AI/ML projects, from intelligent chatbots to transformer models
            built from scratch, demonstrating expertise in modern AI development.
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-10 lg:gap-12 relative z-10 justify-items-center">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="group cursor-pointer w-full max-w-sm"
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
              onClick={() => window.open(project.github, '_blank')}
            >
              <div className="pixel-card p-6 h-full group-hover:pixel-glow">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="pixel-box-primary w-12 h-12 flex items-center justify-center">
                    <span className="text-xl text-black">{project.image}</span>
                  </div>
                  <div className="pixel-box px-2 py-1">
                    <span className="text-xs pixel-text-accent">{project.category.toUpperCase()}</span>
                  </div>
                </div>

                {/* Content */}
                <div>
                  <h3 className="text-lg font-bold mb-3 pixel-text-primary">
                    {project.title.toUpperCase()}.EXE
                  </h3>

                  <p className="text-xs text-white/80 leading-relaxed mb-4">
                    &gt; {project.description}
                  </p>

                  {/* Key Features */}
                  <div className="mb-4">
                    <h4 className="text-xs font-bold pixel-text-secondary mb-2">
                      FEATURES.LOG:
                    </h4>
                    <ul className="text-xs text-white/70 space-y-1">
                      {project.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center">
                          <span className="pixel-text-accent mr-2">•</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs pixel-box-secondary px-2 py-1 text-black font-bold"
                      >
                        {tag.toUpperCase()}
                      </span>
                    ))}
                  </div>

                  {/* GitHub Link */}
                  <motion.div
                    className="pixel-btn text-xs"
                    initial={{ opacity: 0 }}
                    animate={hoveredProject === project.id ? { opacity: 1 } : { opacity: 0.7 }}
                    transition={{ duration: 0.3 }}
                  >
                    [VIEW_SOURCE]
                  </motion.div>
                </div>


              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-16"
        >
          <a
            href="https://github.com/vansh-visariya"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center glass-effect-strong px-8 py-4 border border-white/20 text-white font-semibold rounded-full hover:bg-white/10 hover:border-white/40 transition-all duration-300 shimmer"
          >
            <span className="gradient-text">View All Projects</span>
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default WorkSection;
