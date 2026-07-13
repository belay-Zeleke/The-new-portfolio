import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { TbBriefcase, TbBuildingSkyscraper, TbUsers, TbSchool } from 'react-icons/tb';
import { experience } from '../data/experience.js';

const icons = {
  freelance: TbBriefcase,
  internship: TbBuildingSkyscraper,
  'local-clients': TbUsers,
  bootcamp: TbSchool,
};

export default function Experience() {
  const trackRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start 85%', 'end 65%'],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section id="experience" className="relative py-20 sm:py-20 overflow-hidden">
      <motion.div
        className="absolute top-1/3 left-[-10%] w-[320px] h-[320px] rounded-full bg-accent/10 blur-3xl"
        animate={{ y: [0, 26, 0], x: [0, 16, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      />
      <motion.div
        className="absolute bottom-0 right-[-8%] w-[280px] h-[280px] rounded-full bg-accent2/10 blur-3xl"
        animate={{ y: [0, -20, 0], x: [0, -14, 0] }}
        transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      />

      <div className="relative max-w-4xl mx-auto px-5 sm:px-8">
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
          <p className="eyebrow">Experience</p>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="section-heading mb-14"
        >
          Where I've worked.
        </motion.h2>

        <div ref={trackRef} className="relative pl-9 space-y-8">
          <div className="absolute left-[7px] top-0 bottom-0 w-px bg-edge/10" aria-hidden="true" />
          <motion.div
            className="absolute left-[7px] top-0 w-px bg-gradient-to-b from-accent via-accent to-accent2 origin-top"
            style={{ height: lineHeight }}
            aria-hidden="true"
          />

          {experience.map((item, i) => {
            const Icon = icons[item.id] ?? TbBriefcase;
            const isCurrent = item.period.toLowerCase().includes('present');

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.55, delay: 0.08 * i, ease: [0.22, 1, 0.36, 1] }}
                className="relative"
              >
                <span className="absolute -left-9 top-1 flex h-4 w-4 items-center justify-center">
                  {isCurrent && (
                    <span className="absolute inline-flex h-full w-full rounded-full bg-accent opacity-60 animate-ping" />
                  )}
                  <span className="relative w-3.5 h-3.5 rounded-full bg-page border-2 border-accent" />
                </span>

                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                  className="group glass rounded-2xl p-6 hover:shadow-glowCyan hover:ring-1 hover:ring-accent/25 transition-shadow duration-300"
                >
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div className="flex items-center gap-3">
                      <motion.span
                        whileHover={{ rotate: 8, scale: 1.08 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 12 }}
                        className="relative w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0"
                      >
                        <span className="absolute inset-0 rounded-lg bg-accent/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <Icon className="relative text-accent" size={19} />
                      </motion.span>
                      <div>
                        <h3 className="font-display font-semibold text-lg text-fg leading-snug">
                          {item.role}
                        </h3>
                        <p className="text-sm text-accent/90">{item.org}</p>
                      </div>
                    </div>

                    <span
                      className={`font-mono text-xs px-3 py-1 rounded-full whitespace-nowrap ${
                        isCurrent
                          ? 'bg-accent2/15 text-accent2'
                          : 'bg-surface/10 text-muted/70'
                      }`}
                    >
                      {item.period}
                    </span>
                  </div>

                  <p className="mt-4 text-sm text-muted/70 leading-relaxed max-w-xl">
                    {item.description}
                  </p>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
