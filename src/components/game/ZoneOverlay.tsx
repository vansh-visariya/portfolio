'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import type { Zone } from '@/content/zones';
import { profile, techStack, skills, abilities, socials, contactInfo } from '@/content/profile';
import { projects } from '@/content/projects';
import { getAllPosts } from '@/lib/blog';

interface ZoneOverlayProps {
  zone: Zone;
  onClose: () => void;
}

function AboutContent() {
  return (
    <div className="space-y-6">
      <p className="text-white/55 text-sm leading-relaxed">{profile.bio}</p>
      <div className="grid sm:grid-cols-2 gap-3 text-sm text-white/50">
        <p><span className="text-white/80 font-medium">Role:</span> {profile.role}</p>
        <p><span className="text-white/80 font-medium">Focus:</span> {profile.focus}</p>
        <p><span className="text-white/80 font-medium">Mission:</span> {profile.mission}</p>
        <p><span className="text-white/80 font-medium">Location:</span> {profile.location}</p>
      </div>
      <div>
        <h3 className="text-xs font-semibold text-white/60 uppercase tracking-wider mb-3">Tech Stack</h3>
        <div className="flex flex-wrap gap-2">
          {techStack.map((tech) => (
            <span key={tech} className="tag text-xs">{tech}</span>
          ))}
        </div>
      </div>
      <div>
        <h3 className="text-xs font-semibold text-white/60 uppercase tracking-wider mb-3">Skill Proficiency</h3>
        <div className="space-y-3">
          {skills.map((skill) => (
            <div key={skill.name}>
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs text-white/70">{skill.name}</span>
                <span className="text-[10px] font-mono text-white/35">{skill.level}%</span>
              </div>
              <div className="skill-bar">
                <div className="skill-bar-fill" style={{ width: `${skill.level}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProjectsContent() {
  return (
    <div className="space-y-4">
      {projects.map((project) => (
        <a
          key={project.id}
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className={`card p-5 block bg-gradient-to-br ${project.gradient} group`}
        >
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center text-xl shrink-0">
              {project.emoji}
            </div>
            <div className="min-w-0">
              <p className="text-[10px] uppercase tracking-widest text-white/35 mb-0.5">{project.category}</p>
              <h3 className="font-semibold text-white/90 group-hover:text-white transition-colors">
                {project.title} <span className="text-white/30 text-xs">↗ GitHub</span>
              </h3>
              <p className="text-xs text-white/45 leading-relaxed mt-1.5">{project.description}</p>
              <div className="flex flex-wrap gap-1.5 mt-3">
                {project.tags.map((tag) => (
                  <span key={tag} className="tag text-[10px]">{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </a>
      ))}
    </div>
  );
}

function SkillsContent() {
  return (
    <div className="grid sm:grid-cols-2 gap-4">
      {abilities.map((ability) => (
        <div key={ability.title} className="card-flat rounded-xl p-4">
          <div className="text-xl mb-2">{ability.icon}</div>
          <h3 className="text-sm font-semibold text-white/85 mb-1">{ability.title}</h3>
          <p className="text-xs text-white/40 leading-relaxed">{ability.description}</p>
        </div>
      ))}
    </div>
  );
}

function BlogContent() {
  const posts = getAllPosts();
  return (
    <div className="space-y-3">
      {posts.map((post) => (
        <Link key={post.slug} href={`/blog/${post.slug}/`} className="card p-4 block group">
          <div className="flex items-center gap-2.5 mb-1.5">
            <span className="text-[10px] font-mono text-white/30">{post.date}</span>
            <span className="text-[10px] text-white/20">·</span>
            <span className="text-[10px] text-white/30">{post.readTime}</span>
          </div>
          <h3 className="text-sm font-semibold text-white/85 group-hover:text-white transition-colors">
            {post.title}
          </h3>
          <p className="text-xs text-white/40 leading-relaxed mt-1 line-clamp-2">{post.excerpt}</p>
        </Link>
      ))}
      <Link href="/blog/" className="btn-outline text-xs w-full justify-center !py-2.5 inline-flex">
        Open full blog →
      </Link>
    </div>
  );
}

function ContactContent() {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {contactInfo.map((info) => (
          <div key={info.title} className="flex items-start gap-3">
            <span className="text-lg">{info.icon}</span>
            <div>
              <p className="text-[10px] text-white/40 uppercase tracking-wider">{info.title}</p>
              <p className="text-sm text-white/70 mt-0.5">{info.value}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="space-y-2">
        {socials.map((s) => (
          <a
            key={s.name}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            className="card-flat rounded-xl p-3.5 flex items-center justify-between group"
          >
            <span className="text-sm text-white/75 group-hover:text-white transition-colors">
              {s.name}
            </span>
            <span className="text-white/25 text-xs">↗</span>
          </a>
        ))}
      </div>
      <div className="flex flex-col sm:flex-row gap-3">
        <a href={`mailto:${profile.email}`} className="btn-primary text-sm flex-1 justify-center">
          Send an email
        </a>
        <Link href="/contact/" className="btn-outline text-sm flex-1 text-center !py-2.5">
          Contact page
        </Link>
      </div>
    </div>
  );
}

const CONTENT: Record<Zone['id'], () => React.ReactNode> = {
  about: AboutContent,
  projects: ProjectsContent,
  skills: SkillsContent,
  blog: BlogContent,
  contact: ContactContent,
};

export default function ZoneOverlay({ zone, onClose }: ZoneOverlayProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const Content = CONTENT[zone.id];

  useEffect(() => {
    panelRef.current?.focus();
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <motion.div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={`${zone.label} — ${zone.name}`}
        tabIndex={-1}
        className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl border border-white/10 bg-[#080808] outline-none"
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 24, scale: 0.97 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
      >
        {/* Header */}
        <div
          className="sticky top-0 z-10 px-6 py-5 border-b border-white/[0.06] bg-[#080808]/95 backdrop-blur-sm"
          style={{ boxShadow: `inset 0 2px 0 ${zone.color}` }}
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p
                className="text-[11px] font-mono uppercase tracking-widest mb-1"
                style={{ color: zone.color }}
              >
                {zone.name}
              </p>
              <h2 className="text-xl font-bold text-white/95">{zone.label}</h2>
              <p className="text-xs text-white/40 mt-1">{zone.tagline}</p>
            </div>
            <button
              onClick={onClose}
              aria-label="Close overlay"
              className="shrink-0 w-9 h-9 rounded-lg border border-white/10 bg-white/[0.04] text-white/60 hover:text-white hover:bg-white/[0.08] transition-colors flex items-center justify-center"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="px-6 py-6">
          <Content />
        </div>

        {/* Footer hint */}
        <div className="px-6 pb-5 text-[11px] text-white/25 font-mono">
          Press Esc or click outside to return to the network
        </div>
      </motion.div>
    </motion.div>
  );
}
