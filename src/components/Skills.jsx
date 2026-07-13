import { useMemo, useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useMotionTemplate } from 'framer-motion';
import { skillCategories } from '../data/skills.js';

const filters = ['All', ...skillCategories.map((c) => c.label)];

const gridVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.035 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 18, scale: 0.94 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
  exit: { opacity: 0, scale: 0.9, transition: { duration: 0.15 } },
};

function SkillCard({ skill }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const glow = useMotionTemplate`radial-gradient(140px circle at ${mouseX}px ${mouseY}px, rgba(79,224,203,0.2), transparent 75%)`;

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <motion.div
      layout
      variants={cardVariants}
      exit="exit"
      onMouseMove={handleMouseMove}
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="group relative glass rounded-xl p-4 flex flex-col items-center gap-3 text-center overflow-hidden hover:ring-1 hover:ring-accent/25 hover:shadow-glowCyan"
    >
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: glow }}
        aria-hidden="true"
      />
      <motion.div
        whileHover={{ rotate: [0, -10, 10, -6, 0], scale: 1.15 }}
        transition={{ duration: 0.55, ease: 'easeInOut' }}
        className="relative"
      >
        <skill.icon
          size={30}
          className="relative text-fg"
          style={{ color: skill.color !== 'currentColor' ? skill.color : undefined }}
        />
      </motion.div>
      <span className="relative text-sm text-fg/90">{skill.name}</span>
    </motion.div>
  );
}

export default function Skills() {
  const [active, setActive] = useState('All');

  const visibleCategories = useMemo(
    () => (active === 'All' ? skillCategories : skillCategories.filter((c) => c.label === active)),
    [active]
  );

  const totalSkills = useMemo(
    () => skillCategories.reduce((sum, c) => sum + c.skills.length, 0),
    []
  );

  return (
    <section id="skills" className="relative py-20 sm:py-15 surface-alt overflow-hidden">
      <motion.div
        className="absolute top-0 right-[-8%] w-[340px] h-[340px] rounded-full bg-accent/10 blur-3xl"
        animate={{ y: [0, 24, 0], x: [0, -18, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      />
      <motion.div
        className="absolute bottom-0 left-[-8%] w-[300px] h-[300px] rounded-full bg-accent2/10 blur-3xl"
        animate={{ y: [0, -22, 0], x: [0, 16, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      />

      <div className="relative max-w-6xl mx-auto px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 mb-4"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-accent opacity-75 animate-ping" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
          </span>
          <p className="eyebrow">Skills</p>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="section-heading mb-4"
        >
          Tools I reach for.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-muted/70 max-w-lg mb-10"
        >
          Different technologies across frontend, backend, databases, mobile, and tooling.
        </motion.p>

        <div className="flex flex-wrap gap-1 mb-10">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={`relative px-2 py-2 rounded-full text-sm font-mono transition-colors ${
                active === f ? 'text-ink-950' : 'glass text-muted/80 hover:text-fg'
              }`}
            >
              {active === f && (
                <motion.span
                  layoutId="skills-filter-pill"
                  className="absolute inset-0 rounded-full bg-cyan-400"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative">{f}</span>
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="space-y-12"
          >
            {visibleCategories.map((category) => (
              <div key={category.id}>
                <h3 className="flex items-center gap-2 font-mono text-sm uppercase tracking-widest text-accent2 mb-5">
                  {category.label}
                  
                </h3>
                <motion.div
                  variants={gridVariants}
                  initial="hidden"
                  animate="show"
                  className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-6 lg:grid-cols-6 gap-4"
                >
                  <AnimatePresence>
                    {category.skills.map((skill) => (
                      <SkillCard key={skill.name} skill={skill} />
                    ))}
                  </AnimatePresence>
                </motion.div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}