import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TbExternalLink, TbBrandGithub } from 'react-icons/tb';
import { projects, projectFilters } from '../data/projects.js';

export default function Projects() {
  const [filter, setFilter] = useState('All');

  const visible = useMemo(
    () => (filter === 'All' ? projects : projects.filter((p) => p.tech.includes(filter))),
    [filter]
  );

  return (
    <section id="projects" className="relative py-10 sm:py-10 surface-alt">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="eyebrow mb-4"
        >
          Projects
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="section-heading mb-10"
        >
          Selected work.
        </motion.h2>

        <div className="flex flex-wrap gap-2 mb-12">
          {projectFilters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-full text-sm font-mono transition-colors ${
                filter === f
                  ? 'bg-cyan-400 text-ink-950'
                  : 'glass text-muted/80 hover:text-fg'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6">
          <AnimatePresence mode="popLayout">
            {visible.map((project, i) => (
              <motion.article
                key={project.id}
                layout
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: 0.05 * i }}
                whileHover={{ y: -8 }}
                className="glass rounded-2xl overflow-hidden group"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-surface/10 ring-1 ring-edge/10">
                  <img
                    src={project.image}
                    alt={`${project.title} preview`}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-950/70 via-transparent to-transparent" />
                </div>

                <div className="p-6">
                  <h3 className="font-display font-semibold text-lg text-fg">
                    {project.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted/70 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="text-xs font-mono px-2.5 py-1 rounded-full bg-surface/5 text-accent"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="mt-6 flex gap-3">
                    <a
                      href={project.demo}
                      className="inline-flex items-center gap-1.5 text-sm px-4 py-2 rounded-lg bg-cyan-400 text-ink-950 font-medium"
                    >
                      <TbExternalLink size={15} />
                      Live Demo
                    </a>
                    <a
                      href={project.github}
                      className="inline-flex items-center gap-1.5 text-sm px-4 py-2 rounded-lg glass text-fg"
                    >
                      <TbBrandGithub size={15} />
                      Code
                    </a>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
