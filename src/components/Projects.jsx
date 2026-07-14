import { useMemo, useRef, useState } from 'react';
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useMotionTemplate,
  useSpring,
  useTransform,
} from 'framer-motion';
import {
  TbExternalLink,
  TbBrandGithub,
  TbArrowUpRight,
  TbRotate,
  TbX,
  TbCircleCheck,
} from 'react-icons/tb';
import { projects, projectFilters } from '../data/projects.js';

const gridVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 28, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
  exit: { opacity: 0, scale: 0.92, transition: { duration: 0.2 } },
};

const highlights = [
  'Fully responsive, mobile-first layout',
  'Production-ready, deployed build',
  'Clean, documented codebase',
];

function ProjectCard({ project, index }) {
  const ref = useRef(null);
  const [flipped, setFlipped] = useState(false);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const springX = useSpring(px, { stiffness: 180, damping: 22 });
  const springY = useSpring(py, { stiffness: 180, damping: 22 });
  const rotateX = useTransform(springY, [0, 1], [7, -7]);
  const rotateY = useTransform(springX, [0, 1], [-7, 7]);
  const glowX = useMotionValue(0);
  const glowY = useMotionValue(0);
  const glow = useMotionTemplate`radial-gradient(280px circle at ${glowX}px ${glowY}px, rgba(79,224,203,0.14), transparent 70%)`;

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const relX = e.clientX - rect.left;
    const relY = e.clientY - rect.top;
    px.set(relX / rect.width);
    py.set(relY / rect.height);
    glowX.set(relX);
    glowY.set(relY);
  };
  const handleMouseLeave = () => {
    px.set(0.5);
    py.set(0.5);
  };

  return (
    <motion.div
      ref={ref}
      layout
      variants={cardVariants}
      exit="exit"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 1200 }}
      className="relative"
    >
      <motion.article
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        whileHover={{ y: -8 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        className="group relative glass rounded-2xl overflow-hidden hover:shadow-glowCyan hover:ring-1 hover:ring-accent/25"
      >
        <motion.div
          className="pointer-events-none absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: glow }}
          aria-hidden="true"
        />

        <motion.div
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformStyle: 'preserve-3d' }}
          className="relative"
        >
          <div style={{ backfaceVisibility: 'hidden' }}>
            <div
              className="relative aspect-[16/10] overflow-hidden bg-surface/10 ring-1 ring-edge/10"
              style={{ transform: 'translateZ(24px)' }}
            >
              <img
                src={project.image}
                alt={`${project.title} preview`}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950/70 via-transparent to-transparent" />

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setFlipped(true);
                }}
                aria-label="Flip card for more details"
                className="absolute top-3 right-3 w-8 h-8 rounded-full glass flex items-center justify-center text-fg opacity-0 group-hover:opacity-100 hover:text-accent hover:rotate-180 transition-all duration-300"
                style={{ transform: 'translateZ(40px)' }}
              >
                <TbRotate size={15} />
              </button>

              <div
                className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div style={{ transform: 'translateZ(50px)' }}>
                  <a
                    href={project.demo}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-cyan-400 text-ink-950 text-sm font-medium scale-90 group-hover:scale-100 transition-transform duration-300"
                  >
                    View project
                    <TbArrowUpRight size={15} />
                  </a>
                </div>
              </div>
            </div>

            <div className="relative p-6" style={{ transform: 'translateZ(12px)' }}>
              <span
                className="absolute top-4 right-5 font-display text-4xl font-bold text-fg/[0.04] select-none leading-none"
                aria-hidden="true"
              >
                {String(index + 1).padStart(2, '0')}
              </span>

              <h3 className="relative font-display font-semibold text-lg text-fg">
                {project.title}
              </h3>
              <p className="relative mt-2 text-sm text-muted/70 leading-relaxed">
                {project.description}
              </p>

              <div className="relative mt-4 flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="text-xs font-mono px-2.5 py-1 rounded-full bg-surface/5 text-accent"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="relative mt-6 flex gap-3">
                <motion.a
                  href={project.demo}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  className="inline-flex items-center gap-1.5 text-sm px-4 py-2 rounded-lg bg-cyan-400 text-ink-950 font-medium"
                >
                  <TbExternalLink size={15} />
                  Live Demo
                </motion.a>
                <motion.a
                  href={project.github}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  className="inline-flex items-center gap-1.5 text-sm px-4 py-2 rounded-lg glass text-fg"
                >
                  <TbBrandGithub size={15} />
                  Code
                </motion.a>
              </div>
            </div>
          </div>

          <div
            className="absolute inset-0 flex flex-col p-6"
            style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg) translateZ(1px)' }}
          >
            <div className="flex items-start justify-between">
              <p className="eyebrow">Project {String(index + 1).padStart(2, '0')}</p>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setFlipped(false);
                }}
                aria-label="Flip back"
                className="w-8 h-8 rounded-full glass flex items-center justify-center text-fg hover:text-accent transition-colors"
              >
                <TbX size={15} />
              </button>
            </div>

            <h3 className="mt-3 font-display font-semibold text-lg text-fg">{project.title}</h3>

            <ul className="mt-4 space-y-2.5">
              {highlights.map((point) => (
                <li key={point} className="flex items-start gap-2 text-sm text-muted/75">
                  <TbCircleCheck className="text-accent mt-0.5 shrink-0" size={16} />
                  {point}
                </li>
              ))}
            </ul>

            <p className="mt-4 text-xs font-mono uppercase tracking-widest text-accent2">
              Full stack
            </p>
            <div className="mt-2.5 flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="text-xs font-mono px-2.5 py-1 rounded-full bg-surface/5 text-accent"
                >
                  {t}
                </span>
              ))}
            </div>

            <div className="mt-auto pt-4 flex gap-3">
              <motion.a
                href={project.demo}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="inline-flex items-center gap-1.5 text-sm px-4 py-2 rounded-lg bg-cyan-400 text-ink-950 font-medium"
              >
                <TbExternalLink size={15} />
                Live Demo
              </motion.a>
              <motion.a
                href={project.github}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="inline-flex items-center gap-1.5 text-sm px-4 py-2 rounded-lg glass text-fg"
              >
                <TbBrandGithub size={15} />
                Code
              </motion.a>
            </div>
          </div>
        </motion.div>
      </motion.article>
    </motion.div>
  );
}

export default function Projects() {
  const [filter, setFilter] = useState('All');

  const visible = useMemo(
    () => (filter === 'All' ? projects : projects.filter((p) => p.tech.includes(filter))),
    [filter]
  );

  return (
    <section id="projects" className="relative py-10 sm:py-10 surface-alt overflow-hidden">
      <motion.div
        className="absolute top-0 right-[-8%] w-[340px] h-[340px] rounded-full bg-accent/10 blur-3xl"
        animate={{ y: [0, 22, 0], x: [0, -16, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      />
      <motion.div
        className="absolute bottom-0 left-[-8%] w-[300px] h-[300px] rounded-full bg-accent2/10 blur-3xl"
        animate={{ y: [0, -18, 0], x: [0, 14, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
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
          <p className="eyebrow">Projects</p>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="section-heading mb-8 sm:mb-10"
        >
          Selected work.
        </motion.h2>

        <motion.div
          variants={gridVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {visible.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}