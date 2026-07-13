import { motion, useMotionValue, useMotionTemplate } from 'framer-motion';
import { TbArrowRight } from 'react-icons/tb';
import { services } from '../data/services.js';

const gridVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.09, delayChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 28, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

function ServiceCard({ service, index }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const glow = useMotionTemplate`radial-gradient(240px circle at ${mouseX}px ${mouseY}px, rgba(79,224,203,0.16), transparent 75%)`;

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <motion.div
      variants={cardVariants}
      onMouseMove={handleMouseMove}
      whileHover={{ y: -10 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      className="group relative glass rounded-2xl p-7 overflow-hidden hover:shadow-glowCyan"
    >
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: glow }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-accent/0 group-hover:ring-accent/25 transition-all duration-300" aria-hidden="true" />

      <span
        className="absolute top-3 right-5 font-display text-6xl font-bold text-fg/[0.04] select-none leading-none"
        aria-hidden="true"
      >
        {String(index + 1).padStart(2, '0')}
      </span>

      <div className="relative">
        <motion.div
          whileHover={{ rotate: 10, scale: 1.1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 12 }}
          className="relative w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center"
        >
          <span className="absolute inset-0 rounded-xl bg-accent/25 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <service.icon className="relative text-accent" size={26} />
        </motion.div>

        <h3 className="mt-6 font-display font-semibold text-lg text-fg">{service.title}</h3>
        <p className="mt-3 text-sm text-muted/70 leading-relaxed">{service.description}</p>

        <div className="mt-5 flex items-center gap-1.5 text-sm font-mono text-accent overflow-hidden">
          <span className="flex items-center gap-1.5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
            Learn more
            <TbArrowRight size={14} />
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default function Services() {
  return (
    <section id="services" className="relative py-20 sm:py-20 overflow-hidden">
      <div className="absolute inset-0 dot-grid opacity-30" aria-hidden="true" />
      <motion.div
        className="absolute top-10 left-[-10%] w-[360px] h-[360px] rounded-full bg-accent/10 blur-3xl"
        animate={{ y: [0, 30, 0], x: [0, 20, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      />
      <motion.div
        className="absolute bottom-0 right-[-8%] w-[320px] h-[320px] rounded-full bg-accent2/10 blur-3xl"
        animate={{ y: [0, -24, 0], x: [0, -16, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
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
          <p className="eyebrow">Services</p>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="section-heading mb-4"
        >
          What I can build for you.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-muted/70 max-w-lg mb-14"
        >
          From the first line of code to the server it runs on — here's where I can help.
        </motion.p>

        <motion.div
          variants={gridVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid sm:grid-cols-3 lg:grid-cols-3 gap-6"
        >
          {services.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
