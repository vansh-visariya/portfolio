'use client';

import { useEffect, useState } from 'react';
import Navigation from '@/components/Navigation';
import Scene3D from '@/components/Scene3D';
// import ServicesSection from '@/components/ServicesSection';
import WorkSection from '@/components/WorkSection';
import LoadingScreen from '@/components/LoadingScreen';
import CursorEffect from '@/components/CursorEffect';
import { motion, AnimatePresence } from 'framer-motion';
// Capabilities section removed per request

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [now, setNow] = useState<string>("");

  useEffect(() => {
    const formatTime = () => {
      const d = new Date();
      const hh = String(d.getHours()).padStart(2, '0');
      const mm = String(d.getMinutes()).padStart(2, '0');
      const ss = String(d.getSeconds()).padStart(2, '0');
      return `${hh}:${mm}:${ss}`;
    };
    setNow(formatTime());
    const t = setInterval(() => setNow(formatTime()), 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <LoadingScreen onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      <div className="bg-black text-white overflow-x-hidden">
        <CursorEffect />
        {/* Top info bar */}
        <div className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between py-3 text-xs tracking-wider uppercase text-white/70">
              <div className="pointer-events-auto flex items-center gap-3">
                <span className="opacity-70">New York City</span>
                <span className="opacity-40">/</span>
                <span className="opacity-70">72° Sunny</span>
              </div>
              <div className="pointer-events-auto flex items-center gap-3">
                <span className="opacity-70">{now}</span>
                <span className="opacity-40">/</span>
                <a href="mailto:hey@mantis.works" className="hover:text-white transition-colors">Let's chat</a>
              </div>
            </div>
          </div>
        </div>

        <Navigation />

      {/* Hero Section with 3D Model */}
      {/* Render the 3D background once; sections stack over it */}
      <Scene3D />
      <section id="home" className="relative min-h-[90vh] flex items-end pb-24 z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/70" />
        <div className="relative z-10 mx-auto max-w-7xl px-6">
          <motion.h1
            className="text-6xl md:text-8xl font-bold tracking-tight mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            WUKONG
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-white/80 max-w-3xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            AI/ML Developer — crafting immersive digital experiences.
          </motion.p>
        </div>
      </section>

      {/* Tagline Sections (AI/ML focus) */}
      <section className="relative px-6 py-32 z-10">
        <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" />
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className="text-[9vw] leading-[0.95] md:text-7xl font-bold tracking-tight"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Building reliable AI/ML systems with production‑grade LLMs.
          </motion.h2>
        </div>
      </section>

      <section className="relative px-6 pb-16 z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-start">
          <motion.h3
            className="text-4xl md:text-6xl font-semibold"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
          >
            From data pipelines to fine‑tuning,
            I ship measurable results.
          </motion.h3>
          <motion.h3
            className="text-4xl md:text-6xl font-semibold text-white/80"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            LLM apps, RAG search, agents—
            optimized for latency, safety, and UX.
          </motion.h3>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 px-6 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid lg:grid-cols-2 gap-20 items-center"
        >
          <div>
            <motion.h2
              className="text-4xl md:text-6xl font-bold mb-8 gradient-text"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Building Intelligent Systems
            </motion.h2>
            <motion.p
              className="text-lg text-gray-300 mb-6 leading-relaxed"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              I'm <span className="text-green-400 font-semibold">Wukong</span>, an AI/ML developer passionate about creating intelligent systems
              that push the boundaries of what's possible. From transformer models to
              localized language understanding, I build AI solutions that make a difference.
            </motion.p>
            <motion.p
              className="text-lg text-gray-300 leading-relaxed"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
            >
              Specializing in <span className="text-blue-400">deep learning</span>, <span className="text-purple-400">natural language processing</span>, and custom AI
              architectures, I transform complex problems into elegant, intelligent solutions.
            </motion.p>
          </div>
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <div className="relative overflow-hidden rounded-xl p-8 glass-effect border border-green-400/20 hover:border-green-400/40 transition-all duration-500 glow-effect">
              {/* Background pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 to-blue-600/20" />
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-radial from-green-400/30 to-transparent rounded-full -translate-y-16 translate-x-16" />
              </div>

              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-6 text-white flex items-center">
                  <span className="w-3 h-3 bg-green-400 rounded-full mr-3"></span>
                  My Expertise
                </h3>
                <ul className="space-y-4 text-gray-300">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-purple-400 rounded-full mr-3"></span>
                    <span>Transformer Architecture</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                    <span>Natural Language Processing</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-400 rounded-full mr-3"></span>
                    <span>Custom AI Solutions</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-orange-400 rounded-full mr-3"></span>
                    <span>Machine Learning Research</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Services Section removed */}

      {/* Work Section */}
      <WorkSection />

      {/* Contact Section (CTA) */}
      <section id="contact" className="py-32 px-6 bg-gradient-to-br from-black via-gray-900/50 to-black">
        <motion.div
          className="max-w-5xl mx-auto text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.h2
            className="text-5xl md:text-7xl font-bold mb-10"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Let’s build your next experiential project together.
          </motion.h2>
          <motion.p
            className="text-xl md:text-2xl text-gray-300 mb-16 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Small teams, big ideas. Streamlined by AI, crafted with love. Tell me about your brief and timeline—I'll propose an approach and assemble the right crew.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-8 justify-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.a
              href="mailto:hey@mantis.works"
              className="bg-white text-black px-10 py-5 rounded-lg font-bold text-lg hover:bg-gray-200 transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Email Me
            </motion.a>
            <motion.a
              href="#about"
              className="border-2 border-white text-white px-10 py-5 rounded-lg font-bold text-lg hover:bg-white hover:text-black transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Learn More
            </motion.a>
          </motion.div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-6 border-top border-gray-800/50 bg-gradient-to-t from-black to-gray-900/30">
        <motion.div
          className="max-w-7xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="grid md:grid-cols-3 gap-10">
            <div>
              <div className="text-3xl font-bold mb-4 gradient-text">WUKONG</div>
              <p className="text-white/70 text-sm max-w-sm">
                AI/ML developer focused on LLM applications, agents, and RAG systems that balance speed, accuracy, and delightful UX.
              </p>
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
