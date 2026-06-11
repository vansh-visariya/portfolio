'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollToElement } = useSmoothScroll();
  const pathname = usePathname();
  const onClassicPage = pathname?.startsWith('/classic');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Play', href: '/', isInternal: false },
    { name: 'About', href: '#about', isInternal: true },
    { name: 'Work', href: '#work', isInternal: true },
    { name: 'Skills', href: '#skills', isInternal: true },
    { name: 'Blog', href: '/blog/', isInternal: false },
    { name: 'Contact', href: '/contact/', isInternal: false },
  ];

  const handleNavClick = (href: string, isInternal: boolean) => {
    if (isInternal) {
      if (onClassicPage) {
        scrollToElement(href);
      } else {
        window.location.href = `/classic/${href}`;
      }
    } else {
      window.location.href = href;
    }
    setIsOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'glass-strong' : ''
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <a
            href={onClassicPage ? '#' : '/'}
            onClick={(e) => {
              if (onClassicPage) {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            className="text-lg font-bold tracking-tight hover:opacity-80 transition-opacity"
          >
            <span className="gradient-text">V</span>
            <span className="text-white/90">ansh</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavClick(item.href, item.isInternal)}
                className="btn-ghost text-sm"
              >
                {item.name}
              </button>
            ))}
            <div className="w-px h-6 bg-white/10 mx-2" />
            <a href="mailto:hey@vansh.dev" className="btn-primary text-sm !py-2 !px-4">
              <span>Let&apos;s Talk</span>
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-white/70 hover:text-white transition-colors"
            aria-label="Toggle menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              {isOpen ? (
                <path d="M18 6L6 18M6 6l12 12" />
              ) : (
                <>
                  <path d="M4 8h16M4 16h16" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-strong overflow-hidden border-t border-white/5"
          >
            <div className="px-6 py-6 space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.href, item.isInternal)}
                  className="block w-full text-left py-3 px-4 text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-all text-sm"
                >
                  {item.name}
                </button>
              ))}
              <div className="pt-3">
                <a href="mailto:hey@vansh.dev" className="btn-primary w-full text-center text-sm !py-3">
                  <span>Let&apos;s Talk</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navigation;
