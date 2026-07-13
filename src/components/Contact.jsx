import { useState } from 'react';
import emailjs from '@emailjs/browser';
import { motion, AnimatePresence, useMotionValue, useMotionTemplate } from 'framer-motion';
import {
  TbMail,
  TbPhone,
  TbMapPin,
  TbBrandLinkedin,
  TbBrandGithub,
  TbBrandWhatsapp,
  TbLoader2,
  TbCheck,
  TbSend,
  TbAlertTriangle,
} from 'react-icons/tb';
import { SiUpwork } from 'react-icons/si';
import { EMAILJS_CONFIG } from '../config/emailjs.js';

const contactDetails = [
  { icon: TbMail, label: 'Email', value: 'belayzeleke1888@gmail.com', href: 'mailto:belayzeleke1888@gmail.com' },
  { icon: TbPhone, label: 'Phone', value: '+251 914 270 005', href: 'tel:+251914270005' },
  { icon: TbMapPin, label: 'Location', value: 'Addis Ababa, Ethiopia', href: null },
];

const socials = [
  { icon: TbBrandLinkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/belay-zeleke7' },
  { icon: TbBrandGithub, label: 'GitHub', href: 'https://github.com/belay-Zeleke' },
  { icon: TbBrandWhatsapp, label: 'WhatsApp', href: 'https://wa.me/251914270005' },
  { icon: SiUpwork, label: 'Upwork', href: '#' },
];

const listVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.96 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
};

function GlowCard({ children, className = '' }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const glow = useMotionTemplate`radial-gradient(220px circle at ${mouseX}px ${mouseY}px, rgba(79,224,203,0.14), transparent 75%)`;

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <motion.div
      variants={itemVariants}
      onMouseMove={handleMouseMove}
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 280, damping: 20 }}
      className={`group relative overflow-hidden hover:ring-1 hover:ring-accent/25 hover:shadow-glowCyan ${className}`}
    >
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: glow }}
        aria-hidden="true"
      />
      <div className="relative">{children}</div>
    </motion.div>
  );
}

function FormField({ id, label, as, ...props }) {
  return (
    <div>
      <label htmlFor={id} className="text-xs font-mono uppercase tracking-widest text-muted/60">
        {label}
      </label>
      <div className="mt-2">
        {as === 'textarea' ? (
          <textarea
            id={id}
            rows={5}
            {...props}
            className="w-full rounded-lg bg-surface/5 border border-edge/10 px-4 py-3 text-fg placeholder:text-muted/40 focus:border-accent focus:ring-2 focus:ring-accent/15 outline-none transition-all duration-200 resize-none"
          />
        ) : (
          <input
            id={id}
            {...props}
            className="w-full rounded-lg bg-surface/5 border border-edge/10 px-4 py-3 text-fg placeholder:text-muted/40 focus:border-accent focus:ring-2 focus:ring-accent/15 outline-none transition-all duration-200"
          />
        )}
      </div>
    </div>
  );
}

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    try {
      await emailjs.send(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.templateId,
        {
          name: form.name,
          email: form.email,
          message: form.message,
        },
        { publicKey: EMAILJS_CONFIG.publicKey }
      );

      setStatus('sent');
      setForm({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 3500);
    } catch (err) {
      console.error('EmailJS error:', err);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3500);
    }
  };

  return (
    <section id="contact" className="relative py-20 sm:py-20 surface-alt overflow-hidden">
      <motion.div
        className="absolute top-0 left-[-8%] w-[340px] h-[340px] rounded-full bg-accent/10 blur-3xl"
        animate={{ y: [0, 24, 0], x: [0, 18, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      />
      <motion.div
        className="absolute bottom-0 right-[-8%] w-[300px] h-[300px] rounded-full bg-accent2/10 blur-3xl"
        animate={{ y: [0, -20, 0], x: [0, -14, 0] }}
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
          <p className="eyebrow">Contact Me</p>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="section-heading mb-14"
        >
          Let's build something.
        </motion.h2>

        <div className="grid md:grid-cols-[1fr_1.2fr] gap-10">
          <motion.div
            variants={listVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="space-y-5"
          >
            {contactDetails.map((detail) => (
              <GlowCard key={detail.label} className="glass rounded-xl p-5">
                <div className="flex items-center gap-4">
                  <motion.span
                    whileHover={{ rotate: 8, scale: 1.1 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 12 }}
                    className="relative w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center shrink-0"
                  >
                    <detail.icon className="text-accent" size={18} />
                  </motion.span>
                  <div>
                    <p className="text-xs font-mono uppercase tracking-widest text-muted/50">
                      {detail.label}
                    </p>
                    {detail.href ? (
                      <a href={detail.href} className="text-fg hover:text-accent transition-colors">
                        {detail.value}
                      </a>
                    ) : (
                      <p className="text-fg">{detail.value}</p>
                    )}
                  </div>
                </div>
              </GlowCard>
            ))}

            <motion.div variants={itemVariants} className="flex gap-3 pt-2">
              {socials.map((social, i) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  initial={{ opacity: 0, scale: 0.6 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.05 * i, type: 'spring', stiffness: 300, damping: 15 }}
                  whileHover={{ y: -4, scale: 1.08 }}
                  className="w-11 h-11 rounded-full glass flex items-center justify-center text-fg hover:text-accent hover:shadow-glowCyan hover:ring-1 hover:ring-accent/25 transition-colors"
                >
                  <social.icon size={19} />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            onSubmit={handleSubmit}
            className="glass rounded-2xl p-7 space-y-5"
          >
            <FormField
              id="name"
              label="Name"
              name="name"
              type="text"
              required
              value={form.name}
              onChange={handleChange}
              placeholder="Your Full Name"
            />
            <FormField
              id="email"
              label="Email"
              name="email"
              type="email"
              required
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
            />
            <FormField
              id="message"
              label="Message"
              name="message"
              as="textarea"
              required
              value={form.message}
              onChange={handleChange}
              placeholder="Tell me about your project"
            />

            <motion.button
              type="submit"
              disabled={status === 'sending'}
              whileHover={status === 'idle' || status === 'error' ? { scale: 1.02 } : {}}
              whileTap={status === 'idle' || status === 'error' ? { scale: 0.98 } : {}}
              className={`relative w-full py-3 rounded-lg font-medium transition-shadow overflow-hidden ${
                status === 'sent'
                  ? 'bg-emerald-400 text-ink-950'
                  : status === 'error'
                  ? 'bg-red-400 text-ink-950'
                  : 'bg-cyan-400 text-ink-950 hover:shadow-glowCyan'
              }`}
            >
              <AnimatePresence mode="wait" initial={false}>
                {status === 'idle' && (
                  <motion.span
                    key="idle"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center justify-center gap-2"
                  >
                    <TbSend size={16} />
                    Send Message
                  </motion.span>
                )}
                {status === 'sending' && (
                  <motion.span
                    key="sending"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center justify-center gap-2"
                  >
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                      className="flex"
                    >
                      <TbLoader2 size={16} />
                    </motion.span>
                    Sending...
                  </motion.span>
                )}
                {status === 'sent' && (
                  <motion.span
                    key="sent"
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                    className="flex items-center justify-center gap-2"
                  >
                    <TbCheck size={16} />
                    Message sent — thank you!
                  </motion.span>
                )}
                {status === 'error' && (
                  <motion.span
                    key="error"
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                    className="flex items-center justify-center gap-2"
                  >
                    <TbAlertTriangle size={16} />
                    Couldn't send — try again
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}