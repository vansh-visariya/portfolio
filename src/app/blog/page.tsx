'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import { getAllPosts } from '@/lib/blog';

export default function BlogPage() {
  const blogPosts = getAllPosts();

  return (
    <div className="min-h-screen text-white relative overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 grid-bg pointer-events-none" />
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-white/[0.02] blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[400px] h-[400px] rounded-full bg-white/[0.02] blur-[100px]" />
      </div>

      <Navigation />

      <main className="relative z-10 pt-28 pb-20 px-6">
        <div className="max-w-4xl mx-auto">

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
            <p className="tag mb-4 text-xs tracking-widest uppercase">Blog</p>
            <h1 className="heading-lg mb-4">
              Thoughts & <span className="gradient-text">Insights</span>
            </h1>
            <p className="text-white/45 max-w-lg text-base leading-relaxed">
              Technical articles, AI research notes, and development logs from the frontlines of machine learning.
            </p>
          </motion.div>

          {/* Posts */}
          {blogPosts.length > 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="space-y-4"
            >
              {blogPosts.map((post, index) => (
                <motion.article
                  key={post.slug}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                >
                  <Link href={`/blog/${post.slug}/`} className="card p-6 md:p-8 group cursor-pointer block">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="text-xs font-mono text-white/30">{post.date}</span>
                          <span className="text-xs text-white/20">·</span>
                          <span className="text-xs text-white/30">{post.readTime}</span>
                        </div>
                        <h2 className="text-lg font-semibold text-white/90 mb-2 group-hover:text-white transition-colors">
                          {post.title}
                        </h2>
                        <p className="text-sm text-white/40 leading-relaxed mb-4 line-clamp-2">
                          {post.excerpt}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {post.tags.map((tag) => (
                            <span key={tag} className="tag text-xs">{tag}</span>
                          ))}
                        </div>
                      </div>
                      <svg
                        className="w-5 h-5 text-white/15 group-hover:text-white/40 transition-colors flex-shrink-0 mt-1"
                        fill="none" stroke="currentColor" viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 17L17 7M17 7H7M17 7v10" />
                      </svg>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </motion.div>
          ) : (
            /* Empty state */
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-center py-20"
            >
              <div className="w-16 h-16 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-center text-3xl mx-auto mb-6">
                📝
              </div>
              <h3 className="text-lg font-semibold text-white/70 mb-2">Coming Soon</h3>
              <p className="text-sm text-white/40 max-w-sm mx-auto">
                Technical articles and AI research insights are on the way. Check back soon for in-depth posts.
              </p>
            </motion.div>
          )}

          {/* Subscribe CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-16"
          >
            <div className="card-flat rounded-2xl p-8 md:p-10 text-center">
              <h3 className="heading-md mb-3">Stay Updated</h3>
              <p className="text-sm text-white/40 mb-6 max-w-md mx-auto">
                New technical articles and AI research insights coming soon. Follow me to stay in the loop.
              </p>
              <div className="flex gap-3 justify-center">
                <a href="https://github.com/vansh-visariya" target="_blank" rel="noopener noreferrer" className="btn-outline text-sm">
                  GitHub
                </a>
                <a href="https://linkedin.com/in/vansh-visariya" target="_blank" rel="noopener noreferrer" className="btn-outline text-sm">
                  LinkedIn
                </a>
              </div>
            </div>
          </motion.div>

        </div>
      </main>
    </div>
  );
}
