'use client';

import { useEffect, useState } from 'react';
import Navigation from '@/components/Navigation';
import Scene3D from '@/components/Scene3D';
import WorkSection from '@/components/WorkSection';
import LoadingScreen from '@/components/LoadingScreen';
import { motion, AnimatePresence } from 'framer-motion';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [now, setNow] = useState<string>("");
  const [score, setScore] = useState(0);

  useEffect(() => {
    const formatTime = () => {
      const d = new Date();
      const hh = String(d.getHours()).padStart(2, '0');
      const mm = String(d.getMinutes()).padStart(2, '0');
      return `${hh}:${mm}`;
    };
    setNow(formatTime());
    const t = setInterval(() => setNow(formatTime()), 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    // Simulate score increment for game feel
    const scoreInterval = setInterval(() => {
      setScore(prev => prev + Math.floor(Math.random() * 10));
    }, 2000);
    return () => clearInterval(scoreInterval);
  }, []);

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <LoadingScreen onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      <div className="text-white overflow-x-hidden relative scan-lines">
        {/* Pixel grid background */}
        <div className="fixed inset-0 pointer-events-none opacity-10">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `
                linear-gradient(rgba(0,255,65,0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0,255,65,0.1) 1px, transparent 1px)
              `,
              backgroundSize: '20px 20px'
            }}
          />
        </div>

        {/* Game HUD */}
        <div className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
          <div className="flex items-center justify-between p-4">
            {/* Left HUD */}
            <div className="pointer-events-auto pixel-box px-4 py-2">
              <div className="flex items-center gap-4 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 pixel-blink"></div>
                  <span className="pixel-text-primary">NYC</span>
                </div>
                <span>|</span>
                <span className="pixel-text-accent">{now}</span>
              </div>
            </div>

            {/* Right HUD */}
            <div className="pointer-events-auto pixel-box px-4 py-2">
              <div className="flex items-center gap-4 text-xs">
                <span className="pixel-text-secondary">SCORE: {score.toLocaleString()}</span>
                <span>|</span>
                <a href="mailto:hey@mantis.works" className="pixel-text-accent hover:pixel-text-primary transition-colors">
                  CONTACT
                </a>
              </div>
            </div>
          </div>
        </div>

        <Navigation />

        {/* Hero Section with 3D Model */}
        <Scene3D />
        <section id="home" className="relative min-h-screen flex items-center justify-center z-10 pt-20">
          <div className="relative z-10 mx-auto max-w-6xl px-6 text-center">
            {/* Game Status */}
            <motion.div
              className="mb-12"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="pixel-box-primary px-6 py-3 inline-block mb-8">
                <div className="flex items-center gap-3 text-xs">
                  <div className="w-2 h-2 bg-black pixel-pulse"></div>
                  <span className="text-black font-bold">PLAYER: WUKONG</span>
                  <span className="text-black">|</span>
                  <span className="text-black">STATUS: ONLINE</span>
                </div>
              </div>
            </motion.div>

            {/* Main Title */}
            <motion.h1
              className="text-6xl md:text-8xl font-bold mb-8 pixel-text-glow pixel-float"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              WUKONG.EXE
            </motion.h1>

            {/* Subtitle */}
            <motion.div
              className="space-y-6 mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
            >
              <div className="pixel-box px-8 py-4 max-w-4xl mx-auto">
                <p className="text-sm md:text-base pixel-text-primary leading-relaxed">
                  &gt; AI/ML DEVELOPER SPECIALIZING IN NEURAL NETWORKS
                </p>
                <p className="text-sm md:text-base text-white/80 leading-relaxed mt-2">
                  &gt; BUILDING INTELLIGENT SYSTEMS WITH TRANSFORMERS, RAG & LLM APPS
                </p>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.9 }}
            >
              <a href="#work" className="pixel-btn pixel-btn-primary">
                [VIEW PROJECTS]
              </a>
              <a href="#about" className="pixel-btn">
                [ABOUT PLAYER]
              </a>
              <a href="mailto:hey@mantis.works" className="pixel-btn pixel-btn-secondary">
                [SEND MESSAGE]
              </a>
            </motion.div>
          </div>
        </section>

        {/* Mission Statement */}
        <section className="relative px-6 py-24 z-10">
          <div className="max-w-6xl mx-auto">
            <motion.div
              className="pixel-card p-8 text-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl md:text-4xl font-bold mb-8 pixel-text-secondary">
                === MISSION BRIEFING ===
              </h2>

              <div className="space-y-6 text-sm md:text-base">
                <p className="pixel-text-primary">
                  &gt; OBJECTIVE: BUILD RELIABLE AI/ML SYSTEMS WITH PRODUCTION-GRADE LLMS
                </p>
                <p className="text-white/80">
                  &gt; TRANSFORMING COMPLEX AI RESEARCH INTO SCALABLE SOLUTIONS
                </p>
                <p className="text-white/80">
                  &gt; DELIVERING MEASURABLE BUSINESS IMPACT THROUGH INTELLIGENT SYSTEMS
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Skills/Abilities Grid */}
        <section className="relative px-6 py-24 z-10">
          <div className="max-w-6xl mx-auto">
            <motion.h2
              className="text-2xl md:text-3xl font-bold text-center mb-12 pixel-text-accent"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              === PLAYER ABILITIES ===
            </motion.h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "DATA_PIPELINES.EXE",
                  description: "End-to-end ML pipelines with automated preprocessing & monitoring",
                  icon: "⚙️",
                  level: "LVL 95"
                },
                {
                  title: "FINE_TUNING.EXE",
                  description: "Custom model optimization with LoRA, QLoRA & domain training",
                  icon: "⚡",
                  level: "LVL 92"
                },
                {
                  title: "RAG_SYSTEMS.EXE",
                  description: "Intelligent document retrieval with vector search",
                  icon: "🧠",
                  level: "LVL 88"
                },
                {
                  title: "LLM_APPS.EXE",
                  description: "Production-ready chatbots, agents & conversational AI",
                  icon: "💬",
                  level: "LVL 90"
                },
                {
                  title: "OPTIMIZATION.EXE",
                  description: "Latency reduction, cost optimization & scalability",
                  icon: "🚀",
                  level: "LVL 87"
                },
                {
                  title: "AI_SAFETY.EXE",
                  description: "Responsible AI with bias detection & safety guardrails",
                  icon: "🛡️",
                  level: "LVL 85"
                }
              ].map((ability, index) => (
                <motion.div
                  key={ability.title}
                  className="pixel-card p-6 group hover:pixel-glow"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl">{ability.icon}</span>
                    <span className="pixel-text-secondary text-xs">{ability.level}</span>
                  </div>
                  <h3 className="text-sm font-bold mb-3 pixel-text-primary">
                    {ability.title}
                  </h3>
                  <p className="text-xs text-white/80 leading-relaxed">
                    {ability.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* About/Player Info Section */}
        <section id="about" className="relative py-24 px-6 z-10">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className="grid lg:grid-cols-2 gap-12 items-start"
            >
              {/* Player Bio */}
              <div className="space-y-8">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-2xl md:text-3xl font-bold mb-6 pixel-text-secondary">
                    === PLAYER PROFILE ===
                  </h2>
                </motion.div>

                <motion.div
                  className="pixel-card p-6 space-y-4"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  <div className="space-y-3 text-sm">
                    <p className="pixel-text-primary">
                      &gt; PLAYER_NAME: <span className="pixel-text-accent">WUKONG</span>
                    </p>
                    <p className="text-white/80">
                      &gt; CLASS: AI/ML DEVELOPER
                    </p>
                    <p className="text-white/80">
                      &gt; SPECIALIZATION: NEURAL NETWORKS & INTELLIGENT SYSTEMS
                    </p>
                    <p className="text-white/80">
                      &gt; MISSION: BUILDING AI SOLUTIONS THAT PUSH BOUNDARIES
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  className="pixel-card p-6"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-sm font-bold mb-4 pixel-text-primary">TECH_STACK.CONFIG</h3>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {["PYTORCH", "TRANSFORMERS", "LANGCHAIN", "VECTOR_DBS", "MLOPS", "PRODUCTION_AI"].map((tech) => (
                      <div key={tech} className="pixel-box-primary px-3 py-1 text-center">
                        <span className="text-black font-bold">{tech}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Stats Panel */}
              <motion.div
                className="pixel-card p-6"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-3 h-3 bg-green-400 pixel-pulse"></div>
                    <h3 className="text-lg font-bold pixel-text-secondary">PLAYER_STATS.DAT</h3>
                  </div>

                  <div className="space-y-4">
                    {[
                      { skill: "TRANSFORMER_ARCH", level: 95, color: "bg-green-400" },
                      { skill: "NLP_PROCESSING", level: 92, color: "bg-yellow-400" },
                      { skill: "CUSTOM_AI_SOLUTIONS", level: 88, color: "bg-orange-400" },
                      { skill: "ML_RESEARCH", level: 85, color: "bg-red-400" }
                    ].map((item, index) => (
                      <div key={item.skill} className="space-y-2">
                        <div className="flex justify-between items-center text-xs">
                          <span className="pixel-text-primary">{item.skill}</span>
                          <span className="pixel-text-accent">{item.level}/100</span>
                        </div>
                        <div className="w-full bg-gray-700 h-3 pixel-box">
                          <motion.div
                            className={`h-full ${item.color}`}
                            initial={{ width: 0 }}
                            whileInView={{ width: `${item.level}%` }}
                            transition={{ duration: 1, delay: 0.8 + index * 0.1 }}
                            viewport={{ once: true }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

      {/* Services Section removed */}

      {/* Work Section */}
      <WorkSection />

      {/* Contact Section (CTA) */}
      <section id="contact" className="relative py-24 px-6 z-10">
        <motion.div
          className="max-w-6xl mx-auto text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-4xl font-bold mb-8 pixel-text-secondary">
              Let’s build your next
              <br />
              <span className="gradient-text">AI-powered</span> project
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-full mx-auto"></div>
          </motion.div>
          <motion.p
            className="text-xl md:text-2xl text-white/80 mb-16 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            From concept to production, I help teams build intelligent systems that scale.
            Tell me about your vision—I'll propose an approach and deliver results.
          </motion.p>

          <motion.div
            className="grid md:grid-cols-3 gap-8 mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
          >
            {[
              { icon: "⚡", title: "Fast Delivery", desc: "Rapid prototyping to production deployment" },
              { icon: "🎯", title: "Focused Solutions", desc: "Tailored AI systems for your specific needs" },
              { icon: "🚀", title: "Scalable Architecture", desc: "Built for growth and performance" }
            ].map((item, index) => (
              <div key={item.title} className="glass-effect p-6 rounded-2xl">
                <div className="text-3xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold mb-2 text-white">{item.title}</h3>
                <p className="text-white/70">{item.desc}</p>
              </div>
            ))}
          </motion.div>
          <motion.div
            className="flex flex-col sm:flex-row gap-8 justify-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.a
              href="mailto:hey@mantis.works"
              className="group glass-effect-strong px-10 py-5 rounded-full font-bold text-lg hover:scale-105 transition-all duration-300 shimmer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="gradient-text">Start a Project</span>
            </motion.a>
            <motion.a
              href="#about"
              className="px-10 py-5 border border-white/20 rounded-full font-bold text-lg hover:bg-white/10 hover:border-white/40 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Learn More
            </motion.a>
          </motion.div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="relative py-20 px-6 z-10">
        <div className="absolute inset-0 section-overlay" />
        <motion.div
          className="max-w-7xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="grid md:grid-cols-3 gap-10">
            <div>
              <div className="text-4xl font-black mb-6 gradient-text">WUKONG</div>
              <p className="text-white/70 text-base max-w-sm leading-relaxed">
                AI/ML developer focused on LLM applications, agents, and RAG systems that balance speed, accuracy, and delightful UX.
              </p>
              <div className="flex gap-4 mt-6">
                <a href="https://github.com/vansh-visariya" target="_blank" rel="noopener noreferrer"
                   className="w-10 h-10 glass-effect rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                  <span className="text-white/70 hover:text-white">📧</span>
                </a>
                <a href="https://linkedin.com/in/vansh-visariya" target="_blank" rel="noopener noreferrer"
                   className="w-10 h-10 glass-effect rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                  <span className="text-white/70 hover:text-white">💼</span>
                </a>
                <a href="https://huggingface.co/vansh-myth" target="_blank" rel="noopener noreferrer"
                   className="w-10 h-10 glass-effect rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                  <span className="text-white/70 hover:text-white">🤗</span>
                </a>
              </div>
            </div>
            <div>
              <div className="text-white/80 font-semibold mb-4">Quick Links</div>
              <ul className="space-y-2 text-white/60">
                <li><a href="#home" className="hover:text-white transition-colors">Home</a></li>
                <li><a href="#about" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#work" className="hover:text-white transition-colors">Projects</a></li>
                <li><a href="#contact" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <div className="text-white/80 font-semibold mb-4">Contact</div>
              <div className="space-y-3">
                <a href="mailto:hey@mantis.works" className="block hover:text-white text-white/70 transition-colors">hey@mantis.works</a>
                <div className="flex gap-6 text-white/60">
                  <a href="https://github.com/vansh-visariya" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GitHub</a>
                  <a href="https://linkedin.com/in/vansh-visariya" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
                  <a href="https://huggingface.co/vansh-myth" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">HuggingFace</a>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-800/50 text-center text-gray-500">
            <p className="text-sm">© {new Date().getFullYear()} Wukong AI/ML Developer. All rights reserved.</p>
          </div>
        </motion.div>
      </footer>
      </div>
    </>
  );
}
