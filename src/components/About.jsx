import { useRef } from 'react';
import { motion, useMotionValue, useMotionTemplate, useSpring, useTransform } from 'framer-motion';
import { TbBulb, TbStack2, TbPuzzle, TbCode } from 'react-icons/tb';

const traits = [
  {
    icon: TbStack2,
    title: 'Frontend to backend',
    text: 'Comfortable across the whole stack — from interfaces to databases and everything in between.',
  },
  {
    icon: TbPuzzle,
    title: 'Problem-solver',
    text: 'I break down complex requirements into clear, buildable pieces and ship working solutions.',
  },
  {
    icon: TbBulb,
    title: 'Scalable by design',
    text: 'I plan for growth from day one, so what I build today keeps working as it grows.',
  },
];

const traitGrid = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const traitItem = {
  hidden: { opacity: 0, y: 24, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

function TraitCard({ trait }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const glow = useMotionTemplate`radial-gradient(200px circle at ${mouseX}px ${mouseY}px, rgba(79,224,203,0.16), transparent 75%)`;

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <motion.div
      variants={traitItem}
      onMouseMove={handleMouseMove}
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 280, damping: 20 }}
      className="group relative glass rounded-xl p-5 overflow-hidden hover:shadow-glowCyan hover:ring-1 hover:ring-accent/25"
    >
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: glow }}
        aria-hidden="true"
      />
      <motion.div
        whileHover={{ rotate: 10, scale: 1.12 }}
        transition={{ type: 'spring', stiffness: 300, damping: 12 }}
        className="relative w-11 h-11 rounded-lg bg-accent/10 flex items-center justify-center"
      >
        <span className="absolute inset-0 rounded-lg bg-accent/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <trait.icon className="relative text-accent" size={22} />
      </motion.div>
      <h3 className="relative mt-4 font-display font-semibold text-fg">{trait.title}</h3>
      <p className="relative mt-2 text-sm text-muted/70 leading-relaxed">{trait.text}</p>
    </motion.div>
  );
}

function TiltPortrait() {
  const ref = useRef(null);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const springX = useSpring(px, { stiffness: 150, damping: 18 });
  const springY = useSpring(py, { stiffness: 150, damping: 18 });
  const rotateX = useTransform(springY, [0, 1], [8, -8]);
  const rotateY = useTransform(springX, [0, 1], [-8, 8]);
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
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="relative self-center max-w-[320px] md:max-w-none mx-auto"
      style={{ perspective: 1000 }}
    >
      <motion.div
        className="absolute -inset-8 rounded-[2rem] bg-accent/10 blur-3xl"
        animate={{ scale: [1, 1.12, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      />

      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="code-window relative p-2 animate-floaty"
      >
        <img
          src="/images/profile-2.png"
          alt="Portrait of Belay Zeleke, Full Stack Web and App Developer"
          className="w-full rounded-lg object-cover"
          loading="lazy"
        />
        <motion.div
          className="pointer-events-none absolute inset-2 rounded-lg opacity-0 hover:opacity-100 transition-opacity duration-300"
          style={{
            background: useMotionTemplate`radial-gradient(220px circle at ${glareX} ${glareY}, rgba(255,255,255,0.16), transparent 70%)`,
          }}
          aria-hidden="true"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 10 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.3, type: 'spring', stiffness: 260, damping: 18 }}
        className="absolute -bottom-5 -right-5 glass rounded-xl px-4 py-3 font-mono text-xs text-accent"
      >
        <span className="inline-flex items-center gap-1.5">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-accent2 opacity-75 animate-ping" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent2" />
          </span>
          status: <span className="text-accent2">available</span>
        </span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: -10 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.45, type: 'spring', stiffness: 260, damping: 18 }}
        className="absolute -top-5 -left-5 hidden sm:block"
      >
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
          className="flex items-center gap-2 glass rounded-full pl-2 pr-3.5 py-1.5"
        >
          <span className="w-7 h-7 rounded-full bg-accent/10 flex items-center justify-center">
            <TbCode className="text-accent" size={14} />
          </span>
          <span className="font-mono text-xs text-fg whitespace-nowrap">Full Stack Dev</span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default function About() {
  return (
    <section id="about" className="relative py-5 sm:py-5 overflow-hi  dden">
      <motion.div
        className="absolute top-10 left-[-10%] w-[340px] h-[340px] rounded-full bg-accent/10 blur-3xl"
        animate={{ y: [0, 28, 0], x: [0, 18, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      />
      <motion.div
        className="absolute bottom-10 right-[-8%] w-[300px] h-[300px] rounded-full bg-accent2/10 blur-3xl"
        animate={{ y: [0, -22, 0], x: [0, -16, 0] }}
        transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      />

      <div className="relative max-w-6xl mx-auto px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 mb-7"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-accent opacity-75 animate-ping" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
          </span>
          <p className="eyebrow">About Me</p>
        </motion.div>

        <div className="grid md:grid-cols-[340px_1fr] gap-10 items-center">
          <TiltPortrait />

          <div>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="section-heading"
            >
              I build reliable software.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-6 text-muted/80 leading-relaxed max-w-2xl"
            >
              I'm a Full Stack Web and App Developer focused on building responsive websites, web applications, mobile applications, APIs, and backend systems. I care about clean architecture, readable code, and interfaces that feel effortless to use and I enjoy the process of taking a product from a rough idea to something people rely on every day.
              <br /> <br />
              I enjoy working across the entire development lifecycle, from planning and architecture to deployment and maintenance. Constant learning and exploring new technologies are an important part of how I work, helping me build solutions that are modern, scalable, and reliable. My goal is not just to write code, but to create products that deliver real value and provide a smooth experience for the people who use them.
            </motion.p>
          </div>
        </div>

        <motion.div
          variants={traitGrid}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="mt-10 grid sm:grid-cols-3 gap-5"
        >
          {traits.map((trait) => (
            <TraitCard key={trait.title} trait={trait} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}