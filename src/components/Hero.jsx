import { useRef } from 'react';
import { motion, useMotionValue, useMotionTemplate, useSpring, useTransform } from 'framer-motion';
import { TbDownload, TbMail, TbArrowUpRight } from 'react-icons/tb';
import {
  SiReact,
  SiNodedotjs,
  SiMongodb,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiDocker,
  SiFirebase,
  SiPostgresql,
  SiMysql,
  SiGit,
  SiGithub,
  SiExpress,
  SiRedux,
  SiReactrouter,
  SiJavascript,
  SiHtml5,
  SiVite,
  SiPrisma,
  SiSupabase,
} from 'react-icons/si';

const badges = [
  { icon: SiReact, label: 'React', color: '#61DAFB', top: '-6%', left: '40%', delay: 0 },
  { icon: SiFirebase, label: 'Firebase', color: '#FFCA28', top: '14%', left: '-12%', delay: 0.5 },
  { icon: SiNodedotjs, label: 'Node.js', color: '#5FA04E', top: '32%', left: '77%', delay: 1 },
  { icon: SiMysql, label: 'MySQL DB', color: '#4479A1', top: '58%', left: '-12%', delay: 1.5 },
  { icon: SiNextdotjs, label: 'Next.js', color: 'currentColor', top: '76%', left: '77%', delay: 2 },
  { icon: SiDocker, label: 'Docker', color: '#2496ED', top: '98%', left: '40%', delay: 2.5 },
];

const stats = [
  { value: '15+', label: 'Projects shipped' },
  { value: '10+', label: 'Technologies' },
];

const marqueeItems = [
  { icon: SiReact, label: 'React' },
  { icon: SiNextdotjs, label: 'Next.js' },
  { icon: SiTypescript, label: 'TypeScript' },
  { icon: SiNodedotjs, label: 'Node.js' },
  { icon: SiTailwindcss, label: 'Tailwind CSS' },
  { icon: SiMongodb, label: 'MongoDB' },
  { icon: SiDocker, label: 'Docker' },
  { icon: SiFirebase, label: 'Firebase' },
  { icon: SiPostgresql, label: 'PostgreSQL' },
  { icon: SiMysql, label: 'MySQL' },
  { icon: SiGit, label: 'Git' },
  { icon: SiGithub, label: 'GitHub' },
  { icon: SiExpress, label: 'Express.js' },
  { icon: SiRedux, label: 'Redux Toolkit' },
  { icon: SiReactrouter, label: 'React Router' },
  { icon: SiJavascript, label: 'JavaScript' },
  { icon: SiHtml5, label: 'HTML5' },
  { icon: SiVite, label: 'Vite' },
  { icon: SiPrisma, label: 'Prisma' },
  { icon: SiSupabase, label: 'Supabase' },
];

function TiltPortrait() {
  const ref = useRef(null);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const springX = useSpring(px, { stiffness: 150, damping: 18 });
  const springY = useSpring(py, { stiffness: 150, damping: 18 });
  const rotateX = useTransform(springY, [0, 1], [7, -7]);
  const rotateY = useTransform(springX, [0, 1], [-7, 7]);
  const glareX = useTransform(springX, [0, 1], ['0%', '100%']);
  const glareY = useTransform(springY, [0, 1], ['0%', '100%']);

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    px.set((e.clientX - rect.left) / rect.width);
    py.set((e.clientY - rect.top) / rect.height);
  };
  const handleMouseLeave = () => {
    px.set(0.5);
    py.set(0.5);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      className="img-frame relative overflow-hidden rounded-[2rem]"
    >
      <img
        src="../../public/images/profile 1.png"
        alt="Portrait of Belay Zeleke, Full Stack Web and App Developer"
        className="w-full aspect-[4/5] object-cover"
        loading="lazy"
      />
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300"
        style={{
          background: useMotionTemplate`radial-gradient(260px circle at ${glareX} ${glareY}, rgba(255,255,255,0.18), transparent 70%)`,
        }}
        aria-hidden="true"
      />
    </motion.div>
  );
}

function TechBadge({ badge }) {
  return (
    <motion.div
      className="absolute"
      style={{ top: badge.top, left: badge.left }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5 + badge.delay * 0.15, type: 'spring', stiffness: 260, damping: 18 }}
    >
      <motion.div
        whileHover={{ scale: 1.12, y: -4 }}
        animate={{ y: [0, -10, 0] }}
        transition={{
          y: { duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: badge.delay },
          scale: { type: 'spring', stiffness: 300, damping: 12 },
        }}
        className="flex items-center gap-2 glass rounded-full pl-2 pr-3.5 py-1.5 hover:shadow-glowCyan hover:ring-1 hover:ring-accent/25"
      >
        <span className="w-7 h-7 rounded-full bg-surface/10 flex items-center justify-center">
          <badge.icon
            size={15}
            style={{ color: badge.color !== 'currentColor' ? badge.color : undefined }}
            className="text-fg"
          />
        </span>
        <span className="font-mono text-xs text-fg whitespace-nowrap">{badge.label}</span>
      </motion.div>
    </motion.div>
  );
}

export default function Hero() {
  return (
    <section id="hero" className="relative overflow-hidden pt-32 pb-16 bg-glow-cyan">
      <div className="absolute inset-0 dot-grid opacity-40" aria-hidden="true" />
      <motion.div
        className="absolute top-24 right-[-8%] w-[380px] h-[380px] rounded-full bg-accent2/10 blur-3xl"
        animate={{ y: [0, 22, 0], x: [0, -14, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      />
      <motion.div
        className="absolute bottom-0 left-[-10%] w-[320px] h-[320px] rounded-full bg-accent/10 blur-3xl"
        animate={{ y: [0, -20, 0], x: [0, 16, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      />

      <div className="relative max-w-6xl mx-auto px-5 sm:px-8">
        <div className="grid md:grid-cols-[1.1fr_0.9fr] gap-16 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 mb-6"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-accent2 opacity-75 animate-ping" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent2" />
              </span>
              <span className="font-mono text-xs text-muted">Open to freelance &amp; full-time work</span>
            </motion.div>

            <h1 className="font-display text-4xl sm:text-5xl md:text-[3.4rem] font-semibold leading-[1.08] text-fg">
              <motion.span
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.08 }}
                className="block"
              >
                Turning ideas into
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.18 }}
                className="block gradient-text"
              >
                products that ship.
              </motion.span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.28 }}
              className="mt-6 text-muted/90 text-base sm:text-lg max-w-lg leading-relaxed"
            >
              I'm <span className="text-fg font-medium">Belay Zeleke</span>, a Full Stack Web
              &amp; App Developer. I plan, build, and ship responsive websites, mobile apps,
              APIs, and the backend systems that hold them together.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.36 }}
              className="mt-9 flex flex-wrap items-center gap-4"
            >
              <motion.a
                href="/Belay_Zeleke_Cv_Resume.pdf"
                download
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-cyan-400 text-ink-950 font-medium hover:shadow-glowCyan transition-shadow"
              >
                <TbDownload size={18} />
                Download CV
              </motion.a>
              <motion.button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg glass text-fg hover:text-accent hover:ring-1 hover:ring-accent/25 transition-colors"
              >
                <TbMail size={18} />
                Let's talk
              </motion.button>
            </motion.div>

            <div className="mt-12 grid grid-cols-3 gap-6 max-w-md">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 16, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: 0.5 + i * 0.1, type: 'spring', stiffness: 260, damping: 18 }}
                >
                  <p className="font-display text-2xl sm:text-3xl font-semibold text-fg">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-xs text-muted/70 leading-snug">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="hidden md:block relative mx-auto w-full max-w-[24rem] lg:max-w-[28rem]"
          >
            <div className="absolute inset-6 rounded-[2rem] bg-accent/10 blur-2xl" aria-hidden="true" />

            <motion.svg
              viewBox="0 0 100 100"
              className="absolute -inset-8 text-accent/20"
              animate={{ rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
              aria-hidden="true"
            >
              <circle
                cx="50"
                cy="50"
                r="49"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.6"
                strokeDasharray="1 5"
              />
            </motion.svg>

            <TiltPortrait />

            {badges.map((badge) => (
              <TechBadge key={badge.label} badge={badge} />
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-24 md:mt-32 pt-8 border-t border-edge/10"
        >
          <div className="flex items-center gap-3 mb-5">
            <p className="font-mono text-xs uppercase tracking-widest text-muted/60">
              Comfortable working with
            </p>
            <TbArrowUpRight className="text-muted/40" size={14} />
          </div>
          <div
            className="relative overflow-hidden"
            style={{ maskImage: 'linear-gradient(90deg, transparent, black 8%, black 92%, transparent)' }}
          >
            <div className="flex gap-10 w-max animate-marquee hover:[animation-play-state:paused]">
              {[...marqueeItems, ...marqueeItems].map((item, i) => (
                <div key={i} className="flex items-center gap-2 shrink-0">
                  <item.icon size={20} className="text-fg/80" />
                  <span className="font-mono text-sm text-muted/70 whitespace-nowrap">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}