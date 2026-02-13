'use client';

import { useEffect, useState } from 'react';
import Navigation from '@/components/Navigation';
import Scene3D from '@/components/Scene3D';
import WorkSection from '@/components/WorkSection';
import LoadingScreen from '@/components/LoadingScreen';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useRef } from 'react';

/* ========== Reusable section fade-in ========== */
function FadeSection({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ========== Skills data ========== */
const skills = [
  { name: 'Transformer Architectures', level: 95 },
  { name: 'NLP & Language Models', level: 92 },
  { name: 'RAG Systems & Agents', level: 90 },
  { name: 'Fine-tuning & LoRA', level: 88 },
  { name: 'MLOps & Deployment', level: 85 },
  { name: 'PyTorch & Deep Learning', level: 93 },
];

const abilities = [
  {
    icon: '⚙️',
    title: 'Data Pipelines',
    description: 'End-to-end ML pipelines with automated preprocessing, feature engineering, and monitoring.',
  },
  {
    icon: '⚡',
    title: 'Model Fine-tuning',
    description: 'Custom model optimization with LoRA, QLoRA, and domain-specific training techniques.',
  },
  {
    icon: '🧠',
    title: 'RAG Systems',
    description: 'Intelligent document retrieval with vector search, embeddings, and context-aware generation.',
  },
  {
    icon: '💬',
    title: 'LLM Applications',
    description: 'Production-ready chatbots, autonomous agents, and conversational AI systems.',
  },
  {
    icon: '🚀',
    title: 'Optimization',
    description: 'Latency reduction, cost optimization, quantization, and scalable inference.',
  },
  {
    icon: '🛡️',
    title: 'AI Safety',
    description: 'Responsible AI with bias detection, safety guardrails, and evaluation frameworks.',
  },
];

const techStack = ['PyTorch', 'Transformers', 'LangChain', 'LangGraph', 'Vector DBs', 'Streamlit', 'HuggingFace', 'MLOps'];

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <AnimatePresence>
        {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      <div className="text-white overflow-x-hidden relative">
        {/* Subtle grid background */}
        <div className="fixed inset-0 grid-bg pointer-events-none" />

        {/* Ambient gradient orbs */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-indigo-500/[0.04] blur-[120px]" />
          <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-violet-500/[0.03] blur-[100px]" />
          <div className="absolute top-[40%] right-[-15%] w-[400px] h-[400px] rounded-full bg-cyan-500/[0.03] blur-[100px]" />
        </div>

        <Navigation />
        <Scene3D />

        {/* ============================== */}
        {/* Hero Section                   */}
        {/* ============================== */}
        <section id="home" className="relative min-h-screen flex items-center justify-center z-10 px-6">
          <div className="max-w-4xl mx-auto text-center">
            {/* Status badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-8"
            >
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-white/8 bg-white/[0.03] backdrop-blur-sm">
                <div className="status-dot" />
                <span className="text-sm text-white/60">Available for new projects</span>
              </div>
            </motion.div>

            {/* Headline */}
            <motion.h1
              className="heading-xl mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              I build{' '}
              <span className="gradient-text">intelligent</span>
              <br />
              systems with AI
            </motion.h1>

            {/* Sub-headline */}
            <motion.p
              className="text-lg md:text-xl text-white/45 max-w-2xl mx-auto mb-10 leading-relaxed"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
            >
              AI/ML engineer specializing in transformer architectures,
              LLM applications, and production-grade RAG systems.
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.8 }}
            >
              <a href="#work" className="btn-primary">
                <span>View Projects</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </a>
              <a href="#about" className="btn-outline">
                About Me
              </a>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
              className="mt-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 1 }}
            >
              <motion.div
                className="w-5 h-8 rounded-full border border-white/15 mx-auto flex justify-center pt-1.5"
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className="w-1 h-2 rounded-full bg-white/30" />
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ============================== */}
        {/* About Section                  */}
        {/* ============================== */}
        <section id="about" className="relative py-28 md:py-36 px-6 z-10">
          <div className="max-w-6xl mx-auto">
            <FadeSection>
              <p className="tag mb-4 text-xs tracking-widest uppercase">About</p>
              <h2 className="heading-lg mb-6">
                Turning research into{' '}
                <span className="gradient-text">real-world</span> AI
              </h2>
              <p className="text-white/45 max-w-2xl text-base leading-relaxed mb-16">
                I transform complex AI research into scalable, production-ready systems.
                From custom transformer models to intelligent chatbots and localized language models,
                I deliver measurable business impact through thoughtful engineering.
              </p>
            </FadeSection>

            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
              {/* Left — Bio & Tech */}
              <div className="space-y-8">
                <FadeSection delay={0.1}>
                  <div className="card-flat rounded-2xl p-6 md:p-8">
                    <h3 className="text-sm font-semibold text-white/70 uppercase tracking-wider mb-4">Profile</h3>
                    <div className="space-y-3 text-sm text-white/50 leading-relaxed">
                      <p><span className="text-white/80 font-medium">Role:</span> AI/ML Engineer</p>
                      <p><span className="text-white/80 font-medium">Focus:</span> Neural Networks & Intelligent Systems</p>
                      <p><span className="text-white/80 font-medium">Mission:</span> Building AI that pushes boundaries</p>
                      <p><span className="text-white/80 font-medium">Location:</span> India</p>
                    </div>
                  </div>
                </FadeSection>

                <FadeSection delay={0.2}>
                  <div className="card-flat rounded-2xl p-6 md:p-8">
                    <h3 className="text-sm font-semibold text-white/70 uppercase tracking-wider mb-5">Tech Stack</h3>
                    <div className="flex flex-wrap gap-2">
                      {techStack.map((tech) => (
                        <span key={tech} className="tag text-xs">{tech}</span>
                      ))}
                    </div>
                  </div>
                </FadeSection>
              </div>

              {/* Right — Skills bars */}
              <FadeSection delay={0.3}>
                <div className="card-flat rounded-2xl p-6 md:p-8">
                  <div className="flex items-center gap-2.5 mb-6">
                    <div className="status-dot" />
                    <h3 className="text-sm font-semibold text-white/70 uppercase tracking-wider">Skill Proficiency</h3>
                  </div>
                  <div className="space-y-5">
                    {skills.map((skill) => (
                      <div key={skill.name}>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-white/70">{skill.name}</span>
                          <span className="text-xs font-mono text-white/35">{skill.level}%</span>
                        </div>
                        <div className="skill-bar">
                          <motion.div
                            className="skill-bar-fill"
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            transition={{ duration: 1, delay: 0.3 }}
                            viewport={{ once: true }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeSection>
            </div>
          </div>
        </section>

        {/* ============================== */}
        {/* Capabilities / What I Do       */}
        {/* ============================== */}
        <section id="skills" className="relative py-28 md:py-36 px-6 z-10">
          <div className="max-w-6xl mx-auto">
            <FadeSection>
              <p className="tag mb-4 text-xs tracking-widest uppercase">Capabilities</p>
              <h2 className="heading-lg mb-4">
                What I <span className="gradient-text">Do</span>
              </h2>
              <p className="text-white/45 max-w-xl text-base leading-relaxed mb-16">
                Specialized in building intelligent AI systems that solve real-world problems,
                from transformer architectures to localized language models.
              </p>
            </FadeSection>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {abilities.map((ability, index) => (
                <FadeSection key={ability.title} delay={index * 0.08}>
                  <div className="card p-6 md:p-7 h-full group">
                    <div className="w-10 h-10 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-xl mb-5 group-hover:bg-indigo-500/10 group-hover:border-indigo-500/20 transition-all duration-300">
                      {ability.icon}
                    </div>
                    <h3 className="font-semibold text-white/90 mb-2 group-hover:text-indigo-300 transition-colors duration-300">
                      {ability.title}
                    </h3>
                    <p className="text-sm text-white/40 leading-relaxed">
                      {ability.description}
                    </p>
                  </div>
                </FadeSection>
              ))}
            </div>
          </div>
        </section>

        {/* ============================== */}
        {/* Featured Work                  */}
        {/* ============================== */}
        <WorkSection />

        {/* ============================== */}
        {/* Contact CTA                    */}
        {/* ============================== */}
        <section id="contact" className="relative py-28 md:py-36 px-6 z-10">
          <div className="max-w-3xl mx-auto text-center">
            <FadeSection>
              <p className="tag mb-4 text-xs tracking-widest uppercase">Get in Touch</p>
              <h2 className="heading-lg mb-6">
                Let&apos;s build something{' '}
                <span className="gradient-text">extraordinary</span>
              </h2>
              <p className="text-white/45 text-base leading-relaxed mb-10 max-w-xl mx-auto">
                From concept to production, I help teams build intelligent systems that scale.
                Tell me about your vision — I&apos;ll deliver results.
              </p>
            </FadeSection>

            <FadeSection delay={0.2}>
              <div className="grid sm:grid-cols-3 gap-4 mb-12">
                {[
                  { icon: '⚡', title: 'Fast Delivery', desc: 'Rapid prototyping to production' },
                  { icon: '🎯', title: 'Focused Solutions', desc: 'Tailored AI for your needs' },
                  { icon: '🚀', title: 'Scalable', desc: 'Built for growth & performance' },
                ].map((item) => (
                  <div key={item.title} className="card-flat rounded-2xl p-5 text-center">
                    <div className="text-2xl mb-3">{item.icon}</div>
                    <h3 className="text-sm font-semibold text-white/80 mb-1">{item.title}</h3>
                    <p className="text-xs text-white/40">{item.desc}</p>
                  </div>
                ))}
              </div>
            </FadeSection>

            <FadeSection delay={0.3}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="mailto:hey@vansh.dev" className="btn-primary">
                  <span>Start a Project</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
                <a href="/contact" className="btn-outline">Contact Page</a>
              </div>
            </FadeSection>
          </div>
        </section>

        {/* ============================== */}
        {/* Footer                         */}
        {/* ============================== */}
        <footer className="relative py-12 px-6 z-10 border-t border-white/5">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <span className="text-lg font-bold">
                  <span className="gradient-text">V</span>
                  <span className="text-white/80">ansh</span>
                </span>
                <p className="text-xs text-white/30 mt-1">AI/ML Engineer — Building intelligent systems</p>
              </div>

              <div className="flex items-center gap-4">
                <a href="https://github.com/vansh-visariya" target="_blank" rel="noopener noreferrer"
                   className="btn-ghost text-xs">GitHub</a>
                <a href="https://linkedin.com/in/vansh-visariya" target="_blank" rel="noopener noreferrer"
                   className="btn-ghost text-xs">LinkedIn</a>
                <a href="https://huggingface.co/vansh-myth" target="_blank" rel="noopener noreferrer"
                   className="btn-ghost text-xs">HuggingFace</a>
              </div>

              <p className="text-xs text-white/20">
                © {new Date().getFullYear()} Vansh. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
