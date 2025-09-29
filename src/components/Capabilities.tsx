'use client';

import { motion } from 'framer-motion';

const groups = [
  {
    title: 'Experiential',
    href: '/services',
    items: [
      'Architecture',
      'Spatial & Interior Design',
      'Interactive / Creative Technology',
      'Event Production',
      'Projection Mapping',
      'Reactive Environments'
    ],
    color: 'from-emerald-500/10 to-cyan-500/10'
  },
  {
    title: 'Digital',
    href: '/services',
    items: [
      '3D Modelling',
      'Motion & Animation',
      'User Experience / Interface',
      'Development',
      'WebGL',
      'Performance & Analytics'
    ],
    color: 'from-indigo-500/10 to-fuchsia-500/10'
  },
  {
    title: 'Brand',
    href: '/services',
    items: [
      'Brand & Campaign Strategy',
      'Identity',
      'Content Production',
      'OOH',
      'Copywriting & Messaging',
      'Design Systems'
    ],
    color: 'from-rose-500/10 to-amber-500/10'
  }
];

const Capabilities = () => {
  return (
    <section id="capabilities" className="relative px-6 py-28 z-10">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      <div className="relative max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-14"
        >
          <h2 className="text-5xl md:text-7xl font-bold tracking-tight">Services</h2>
          <p className="mt-4 text-lg text-white/70 max-w-3xl">
            Small teams, big ideas. We tailor the right mix of experiential, digital, and brand services to your project.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {groups.map((g, i) => (
            <motion.div
              key={g.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              viewport={{ once: true }}
              className={`relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br ${g.color} backdrop-blur-sm`}
            >
              <div className="p-8">
                <div className="flex items-baseline justify-between">
                  <h3 className="text-2xl font-semibold">{g.title}</h3>
                  <span className="text-xs text-white/50">/ services</span>
                </div>
                <ul className="mt-6 space-y-3 text-white/80 text-sm">
                  {g.items.map((item) => (
                    <li key={item} className="flex items-center">
                      <span className="mr-2 h-1.5 w-1.5 rounded-full bg-white/50" />
                      {item}
                    </li>
                  ))}
                </ul>
                <a
                  href={g.href}
                  className="mt-8 inline-flex items-center text-white/80 hover:text-white transition-colors text-sm"
                >
                  Explore
                  <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Capabilities;


