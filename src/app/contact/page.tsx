'use client';

import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import { useState, useEffect } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Form submitted:', formData);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    { title: 'Email', value: 'hey@vansh.dev', icon: '📧' },
    { title: 'Response Time', value: '< 24 hours', icon: '⚡' },
    { title: 'Availability', value: 'Mon — Fri, 9AM → 6PM IST', icon: '🕒' },
  ];

  const socials = [
    { name: 'GitHub', href: 'https://github.com/vansh-visariya' },
    { name: 'LinkedIn', href: 'https://linkedin.com/in/vansh-visariya' },
    { name: 'HuggingFace', href: 'https://huggingface.co/vansh-myth' },
  ];

  return (
    <div className="min-h-screen text-white relative overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 grid-bg pointer-events-none" />
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-indigo-500/[0.04] blur-[120px]" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[400px] h-[400px] rounded-full bg-violet-500/[0.03] blur-[100px]" />
      </div>

      <Navigation />

      <main className="relative z-10 pt-28 pb-20 px-6">
        <div className="max-w-5xl mx-auto">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-14"
          >
            <a href="/" className="btn-ghost text-xs mb-6 inline-flex">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
              </svg>
              Back
            </a>
            <p className="tag mb-4 text-xs tracking-widest uppercase">Contact</p>
            <h1 className="heading-lg mb-4">
              Let&apos;s <span className="gradient-text">connect</span>
            </h1>
            <p className="text-white/45 max-w-lg text-base leading-relaxed">
              Have a project in mind? I&apos;d love to hear about it. Send me a message and I&apos;ll get back to you promptly.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-5 gap-10">

            {/* Contact Form (3 cols) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="lg:col-span-3"
            >
              <div className="card-flat rounded-2xl p-6 md:p-8">
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-medium text-white/50 mb-2 uppercase tracking-wider">Name</label>
                      <input
                        type="text" name="name" required
                        value={formData.name} onChange={handleInputChange}
                        className="input-modern"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-white/50 mb-2 uppercase tracking-wider">Email</label>
                      <input
                        type="email" name="email" required
                        value={formData.email} onChange={handleInputChange}
                        className="input-modern"
                        placeholder="you@company.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-white/50 mb-2 uppercase tracking-wider">Subject</label>
                    <input
                      type="text" name="subject" required
                      value={formData.subject} onChange={handleInputChange}
                      className="input-modern"
                      placeholder="Project inquiry"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-white/50 mb-2 uppercase tracking-wider">Message</label>
                    <textarea
                      name="message" required rows={5}
                      value={formData.message} onChange={handleInputChange}
                      className="input-modern resize-none"
                      placeholder="Tell me about your project..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`btn-primary w-full !py-3.5 ${isSubmitting ? 'opacity-60 cursor-not-allowed' : ''}`}
                  >
                    <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                    {!isSubmitting && (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    )}
                  </button>

                  {submitStatus === 'success' && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-center p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm"
                    >
                      Message sent successfully! I&apos;ll get back to you soon.
                    </motion.div>
                  )}

                  {submitStatus === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-center p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm"
                    >
                      Something went wrong. Please try again.
                    </motion.div>
                  )}
                </form>
              </div>
            </motion.div>

            {/* Sidebar (2 cols) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="lg:col-span-2 space-y-6"
            >
              {/* Contact Info */}
              <div className="card-flat rounded-2xl p-6 md:p-8">
                <h3 className="text-sm font-semibold text-white/70 uppercase tracking-wider mb-6">Contact Info</h3>
                <div className="space-y-5">
                  {contactInfo.map((info) => (
                    <div key={info.title} className="flex items-start gap-3">
                      <span className="text-lg">{info.icon}</span>
                      <div>
                        <p className="text-xs text-white/40 uppercase tracking-wider">{info.title}</p>
                        <p className="text-sm text-white/70 mt-0.5">{info.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Social links */}
              <div className="card-flat rounded-2xl p-6 md:p-8">
                <h3 className="text-sm font-semibold text-white/70 uppercase tracking-wider mb-5">Connect</h3>
                <div className="space-y-2">
                  {socials.map((s) => (
                    <a
                      key={s.name}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between py-2.5 px-3 rounded-lg hover:bg-white/[0.03] transition-colors group"
                    >
                      <span className="text-sm text-white/60 group-hover:text-white/90 transition-colors">{s.name}</span>
                      <svg className="w-4 h-4 text-white/20 group-hover:text-white/50 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 17L17 7M17 7H7M17 7v10" />
                      </svg>
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </main>
    </div>
  );
}
