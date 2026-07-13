import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TOTAL_MS = 1800;

const faces = [
  { glyph: '<', transform: 'translateZ(32px)' },
  { glyph: '/>', transform: 'rotateY(180deg) translateZ(32px)' },
  { glyph: '{', transform: 'rotateY(90deg) translateZ(32px)' },
  { glyph: '}', transform: 'rotateY(-90deg) translateZ(32px)' },
  { glyph: ';', transform: 'rotateX(90deg) translateZ(32px)' },
  { glyph: '#', transform: 'rotateX(-90deg) translateZ(32px)' },
];

export default function Loader() {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const start = performance.now();
    let raf;

    const tick = (now) => {
      const pct = Math.min(100, Math.round(((now - start) / TOTAL_MS) * 100));
      setProgress(pct);
      if (pct < 100) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const t = setTimeout(() => setVisible(false), TOTAL_MS);
    return () => {
      clearTimeout(t);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[9998] flex items-center justify-center bg-page overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.15, filter: 'blur(8px)' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="absolute inset-0 dot-grid opacity-30" aria-hidden="true" />
          <motion.div
            className="absolute w-[380px] h-[380px] rounded-full bg-accent/15 blur-3xl"
            animate={{ scale: [1, 1.25, 1], opacity: [0.5, 0.9, 0.5] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
            aria-hidden="true"
          />

          <div className="relative flex flex-col items-center gap-9">
            <div className="relative" style={{ width: 64, height: 64, perspective: '600px' }}>
              <motion.svg
                viewBox="0 0 100 100"
                className="absolute -inset-10 text-accent2/30"
                animate={{ rotate: 360 }}
                transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
                aria-hidden="true"
              >
                <circle
                  cx="50"
                  cy="50"
                  r="49"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.8"
                  strokeDasharray="2 6"
                />
              </motion.svg>

              <motion.div
                className="absolute inset-0"
                style={{ transformStyle: 'preserve-3d' }}
                animate={{ rotateX: 360, rotateY: 360 }}
                transition={{ duration: 3.2, repeat: Infinity, ease: 'linear' }}
              >
                {faces.map((face) => (
                  <div
                    key={face.glyph}
                    className="absolute inset-0 flex items-center justify-center glass rounded-md border border-accent/30 font-mono text-accent text-xl font-semibold"
                    style={{ transform: face.transform, backfaceVisibility: 'hidden' }}
                  >
                    {face.glyph}
                  </div>
                ))}
              </motion.div>
            </div>

            <div className="flex flex-col items-center gap-3">
              <div className="flex items-baseline gap-2 font-mono text-accent">
                <motion.span
                  key={progress}
                  initial={{ opacity: 0.4 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.15 }}
                  className="text-2xl font-semibold tabular-nums"
                >
                  {progress}
                </motion.span>
                <span className="text-sm text-muted/60">%</span>
              </div>

              <div className="w-40 h-1 rounded-full bg-surface/10 overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-accent to-accent2"
                  style={{ width: `${progress}%` }}
                  transition={{ ease: 'linear' }}
                />
              </div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.4 }}
                className="font-mono text-xs text-muted/60"
              >
                Compiling portfolio<span className="animate-blink">...</span>
              </motion.p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}