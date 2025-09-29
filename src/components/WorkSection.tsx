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
    color: "from-blue-500/20 to-purple-500/20",
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
    color: "from-green-500/20 to-blue-500/20",
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
    color: "from-purple-500/20 to-pink-500/20",
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
    <section ref={ref} id="work" className="relative py-32 px-6 z-10">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
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
            Featured Projects
          </motion.h2>
          <motion.p
            className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            A showcase of my AI/ML projects, from intelligent chatbots to transformer models
            built from scratch, demonstrating expertise in modern AI development.
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-10 lg:gap-12 relative z-10">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="group cursor-pointer"
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
              onClick={() => window.open(project.github, '_blank')}
            >
              <div className={`
                relative overflow-hidden rounded-xl p-8 h-full
                bg-black/60
                backdrop-blur-md border border-white/10 hover:border-white/30
                transition-all duration-500 ease-out
                group-hover:scale-[1.02] group-hover:shadow-2xl
              `}>
                {/* Background effects */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
                  <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-radial from-green-400/20 to-transparent rounded-full -translate-y-20 translate-x-20" />
                </div>

                {/* Header */}
                <div className="relative z-10 flex items-center justify-between mb-6">
                  <div className="w-16 h-16 rounded-lg bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <span className="text-3xl">{project.image}</span>
                  </div>
                  <span className="text-xs text-gray-400 bg-white/10 px-3 py-1 rounded-full border border-white/10">
                    {project.category}
                  </span>
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-green-400 transition-colors duration-300">
                    {project.title}
                  </h3>

                  <p className="text-gray-300 text-sm leading-relaxed mb-6">
                    {project.description}
                  </p>

                  {/* Key Features */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-white mb-3 flex items-center">
                      <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                      Key Features
                    </h4>
                    <ul className="text-xs text-gray-300 space-y-2">
                      {project.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center">
                          <span className="w-1 h-1 bg-green-400/60 rounded-full mr-2"></span>
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
                        className="text-xs bg-white/10 text-gray-300 px-3 py-1 rounded-full border border-white/10 hover:border-green-400/30 transition-colors duration-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* GitHub Link */}
                  <motion.div
                    className="flex items-center text-green-400 text-sm font-medium group-hover:text-green-300"
                    initial={{ opacity: 0, x: -10 }}
                    animate={hoveredProject === project.id ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <svg className="mr-2 w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    View on GitHub
                    <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </motion.div>
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
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-16"
        >
          <a
            href="https://github.com/vansh-visariya"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-8 py-4 border border-white text-white font-semibold rounded-full hover:bg-white hover:text-black transition-all duration-300"
          >
            View All Projects
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
