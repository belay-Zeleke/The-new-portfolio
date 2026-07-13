import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TbBrandLinkedin, TbBrandGithub, TbBrandWhatsapp, TbArrowUp } from 'react-icons/tb';
import { SiUpwork } from 'react-icons/si';

const socials = [
  { icon: TbBrandLinkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/belay-zeleke7' },
  { icon: TbBrandGithub, label: 'GitHub', href: 'https://github.com/belay-Zeleke' },
  { icon: TbBrandWhatsapp, label: 'WhatsApp', href: 'https://wa.me/251914270005' },
  { icon: SiUpwork, label: 'Upwork', href: '#' },
];

function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 480);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, y: 16, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.8 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          whileHover={{ y: -4, scale: 1.06 }}
          whileTap={{ scale: 0.92 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Back to top"
          className="fixed bottom-6 right-6 z-40 w-11 h-11 rounded-full glass flex items-center justify-center text-fg hover:text-accent hover:shadow-glowCyan hover:ring-1 hover:ring-accent/25 transition-colors"
        >
          <motion.span animate={{ y: [0, -2, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}>
            <TbArrowUp size={18} />
          </motion.span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}

export default function Footer() {
  return (
    <footer className="relative border-t border-edge/10 py-5 overflow-hidden">
      <div className="absolute inset-0 dot-grid opacity-20" aria-hidden="true" />
      <motion.div
        className="absolute -top-24 left-[-10%] w-[300px] h-[300px] rounded-full bg-accent/10 blur-3xl"
        animate={{ y: [0, 20, 0], x: [0, 16, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      />
      <motion.div
        className="absolute -bottom-24 right-[-8%] w-[280px] h-[280px] rounded-full bg-accent2/10 blur-3xl"
        animate={{ y: [0, -18, 0], x: [0, -14, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      />

      <div className="absolute top-0 left-0 right-0 h-px overflow-hidden" aria-hidden="true">
        <motion.div
          className="h-full w-1/3 bg-gradient-to-r from-transparent via-accent to-transparent"
          animate={{ x: ['-100%', '400%'] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="relative max-w-6xl mx-auto px-5 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-6"
      >
        <motion.a href="#hero" whileHover="hover" className="flex items-center gap-2">
          <img
            src="/Gemini_Generated_Image_v9h2a4v9h2a4v9h2-removebg-preview.png"
            alt="Belay Zeleke logo"
            className="h-10 w-auto object-contain"
          />
        </motion.a>

        <div className="flex gap-3">
          {socials.map((social, i) => (
            <motion.a
              key={social.label}
              href={social.href}
              aria-label={social.label}
              initial={{ opacity: 0, scale: 0.6, y: 10 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.06 * i, type: 'spring', stiffness: 300, damping: 15 }}
              whileHover={{ y: -5, scale: 1.1, rotate: 6 }}
              whileTap={{ scale: 0.92 }}
              className="w-10 h-10 rounded-full glass flex items-center justify-center text-fg hover:text-accent hover:shadow-glowCyan hover:ring-1 hover:ring-accent/25 transition-colors"
            >
              <social.icon size={17} />
            </motion.a>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-sm text-muted/50 font-mono"
        >
          © 2024 Belay Zeleke. All rights reserved.
        </motion.p>
      </motion.div>

      <BackToTop />
    </footer>
  );
}