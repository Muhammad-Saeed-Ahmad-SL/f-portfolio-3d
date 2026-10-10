import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const words = ["Design", "Code", "Motion", "Saeed Ahmad"];

/** Count from 0 to 100 while cycling words, then lift the curtain. */
const Preloader = ({ onDone }) => {
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const total = reduce ? 300 : 1700;
    const start = performance.now();
    let raf;
    const tick = (now) => {
      const t = Math.min((now - start) / total, 1);
      setCount(Math.round((1 - Math.pow(1 - t, 3)) * 100));
      if (t < 1) raf = requestAnimationFrame(tick);
      else setTimeout(() => setDone(true), 250);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const word = words[Math.min(Math.floor(count / 26), words.length - 1)];

  return (
    <AnimatePresence onExitComplete={onDone}>
      {!done && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[80] bg-ink text-paper flex flex-col justify-between p-6 sm:p-12"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          <p className="eyebrow !text-paper/50">Portfolio {new Date().getFullYear()}</p>
          <div className="overflow-hidden">
            <motion.p
              key={word}
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif italic text-[3rem] sm:text-[5rem] leading-none"
            >
              {word}
            </motion.p>
          </div>
          <div className="flex items-end justify-between">
            <div className="h-px flex-1 bg-paper/15 mr-6 mb-4 relative overflow-hidden">
              <div
                className="absolute inset-y-0 left-0 bg-accent"
                style={{ width: `${count}%` }}
              />
            </div>
            <p className="font-display font-semibold text-[4rem] sm:text-[8rem] leading-[0.8] tabular-nums">
              {count}
              <span className="text-accent">%</span>
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
