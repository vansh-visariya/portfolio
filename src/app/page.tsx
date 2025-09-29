'use client';

import { useState } from 'react';
import Navigation from '@/components/Navigation';
import Scene3D from '@/components/Scene3D';
import ServicesSection from '@/components/ServicesSection';
import WorkSection from '@/components/WorkSection';
import LoadingScreen from '@/components/LoadingScreen';
import CursorEffect from '@/components/CursorEffect';
import { motion, AnimatePresence } from 'framer-motion';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <LoadingScreen onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      <div className="bg-black text-white overflow-x-hidden">
        <CursorEffect />
        <Navigation />

      {/* Hero Section with 3D Model */}
      <section id="home" className="relative h-screen">
        {/* Background gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900/50 to-black z-0" />
        <Scene3D />
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

      {/* Services Section */}
      <ServicesSection />

      {/* Work Section */}
      <WorkSection />

      {/* Contact Section */}
      <section id="contact" className="py-32 px-6 bg-gradient-to-br from-black via-gray-900/50 to-black">
        <motion.div
          className="max-w-5xl mx-auto text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.h2
            className="text-5xl md:text-7xl font-bold mb-10 gradient-text"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Let's Build Something Amazing
          </motion.h2>
          <motion.p
            className="text-xl md:text-2xl text-gray-300 mb-16 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Ready to bring AI innovation to your project? Let's discuss how we can create intelligent solutions together.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-8 justify-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.a
              href="https://github.com/vansh-visariya"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-green-400 to-blue-500 text-black px-10 py-5 rounded-lg font-bold text-lg hover:from-green-300 hover:to-blue-400 transition-all duration-300 hover:scale-105 hover:shadow-2xl glow-effect"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View My Work
            </motion.a>
            <motion.a
              href="#about"
              className="border-2 border-green-400 text-green-400 px-10 py-5 rounded-lg font-bold text-lg hover:bg-green-400 hover:text-black transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Learn More
            </motion.a>
          </motion.div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 border-t border-gray-800/50 bg-gradient-to-t from-black to-gray-900/30">
        <motion.div
          className="max-w-7xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center">
            <motion.div
              className="text-3xl font-bold mb-6 md:mb-0 gradient-text"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              WUKONG
            </motion.div>
            <motion.div
              className="flex space-x-8 text-gray-400"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <a href="https://github.com/vansh-visariya" target="_blank" rel="noopener noreferrer" className="hover:text-green-400 transition-all duration-300 hover:scale-110 transform text-lg font-medium">GitHub</a>
              <a href="https://linkedin.com/in/vansh-visariya" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-all duration-300 hover:scale-110 transform text-lg font-medium">LinkedIn</a>
              <a href="https://huggingface.co/vansh-myth" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400 transition-all duration-300 hover:scale-110 transform text-lg font-medium">HuggingFace</a>
            </motion.div>
          </div>
          <motion.div
            className="mt-12 pt-8 border-t border-gray-800/50 text-center text-gray-500"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <p className="text-lg">© 2024 Wukong AI/ML Developer. All rights reserved.</p>
            <p className="text-sm mt-2 text-gray-600">Building the future with artificial intelligence</p>
          </motion.div>
        </motion.div>
      </footer>
      </div>
    </>
  );
}
