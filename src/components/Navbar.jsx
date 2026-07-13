import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { TbSun, TbMoon, TbMenu2, TbX, TbArrowUpRight } from 'react-icons/tb';
import { useTheme } from '../context/ThemeContext.jsx';
import { useActiveSection } from '../hooks/useActiveSection.js';

const links = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'services', label: 'Services' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
];

function ThemeToggle({ theme, toggleTheme, size = 'md' }) {
  const dim = size === 'sm' ? 'w-9 h-9' : 'w-10 h-10';
  return (
    <button
      aria-label="Toggle dark and light mode"
      onClick={toggleTheme}
      className={`${dim} shrink-0 rounded-full glass flex items-center justify-center text-fg hover:text-accent transition-colors overflow-hidden`}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
          animate={{ rotate: 0, opacity: 1, scale: 1 }}
          exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
          transition={{ duration: 0.25 }}
          className="flex"
        >
          {theme === 'dark' ? <TbSun size={17} /> : <TbMoon size={17} />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const active = useActiveSection(links.map((l) => l.id));
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const handleNav = (id) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-accent via-accent to-accent2 z-[70] origin-left"
        style={{ scaleX: progress }}
      />

      <header className="fixed top-0 inset-x-0 z-50 flex justify-center px-4 pt-4 sm:pt-5">
        <motion.nav
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className={`flex items-center gap-1 sm:gap-2 rounded-full w-full sm:w-auto justify-between sm:justify-start transition-all duration-300 ${
            scrolled ? 'glass shadow-glass px-2.5 py-2' : 'bg-transparent px-2 py-2'
          }`}
        >
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              handleNav('hero');
            }}
            className="flex items-center gap-2 pl-2 pr-3 shrink-0"
          >
            <img
              src="/Gemini_Generated_Image_v9h2a4v9h2a4v9h2-removebg-preview.png"
              alt="Belay Zeleke logo"
              className="h-8 w-auto object-contain"
            />
          </a>

          <ul className="hidden md:flex items-center gap-0.5 font-mono text-sm">
            {links.map((link) => (
              <li key={link.id} className="relative">
                {active === link.id && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-cyan-400"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
                <button
                  onClick={() => handleNav(link.id)}
                  className={`relative z-10 px-4 py-2 rounded-full transition-colors ${
                    active === link.id ? 'text-ink-950 font-medium' : 'text-muted/80 hover:text-fg'
                  }`}
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2 pl-1 pr-1 sm:pr-0">
            <ThemeToggle theme={theme} toggleTheme={toggleTheme} size="sm" />
            <button
              aria-label="Toggle navigation menu"
              onClick={() => setOpen((o) => !o)}
              className="md:hidden w-9 h-9 rounded-full glass flex items-center justify-center text-fg"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={open ? 'x' : 'menu'}
                  initial={{ rotate: -45, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 45, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex"
                >
                  {open ? <TbX size={18} /> : <TbMenu2 size={18} />}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
        </motion.nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-page/95 backdrop-blur-xl md:hidden"
          >
            <div className="absolute inset-0 dot-grid opacity-30" aria-hidden="true" />
            <div className="relative h-full flex flex-col items-center justify-center gap-2 px-6">
              {links.map((link, i) => (
                <motion.button
                  key={link.id}
                  onClick={() => handleNav(link.id)}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 12 }}
                  transition={{ delay: 0.05 * i, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="group flex items-center gap-2 py-3"
                >
                  <span
                    className={`font-display text-3xl sm:text-4xl font-semibold transition-colors ${
                      active === link.id ? 'text-accent' : 'text-fg group-hover:text-accent'
                    }`}
                  >
                    {link.label}
                  </span>
                  <TbArrowUpRight
                    size={22}
                    className="text-accent opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
                  />
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}