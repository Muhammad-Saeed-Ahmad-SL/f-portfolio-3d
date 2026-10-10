import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/** Pulls its child toward the pointer while hovered. */
export const Magnetic = ({ children, strength = 0.35, className = "" }) => {
  const ref = useRef();
  const x = useSpring(useMotionValue(0), { stiffness: 180, damping: 14 });
  const y = useSpring(useMotionValue(0), { stiffness: 180, damping: 14 });

  const move = (e) => {
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const leave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onPointerMove={move}
      onPointerLeave={leave}
      style={{ x, y }}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.div>
  );
};

/** Text that rolls to a duplicate of itself on hover (see .roll in index.css). */
export const Roll = ({ children }) => (
  <span className="roll">
    <span>{children}</span>
    <span aria-hidden="true">{children}</span>
  </span>
);

/**
 * Line-by-line masked reveal for big headings. Pass `play` to control it
 * manually; leave it undefined to reveal on scroll into view. The observer
 * sits on the wrapper because the lines start clipped out of their masks.
 */
export const RevealLines = ({ lines, className = "", delay = 0, play }) => {
  const trigger =
    play === undefined
      ? { initial: "hidden", whileInView: "show", viewport: { once: true, amount: 0.5 } }
      : { initial: "hidden", animate: play ? "show" : "hidden" };
  return (
    <motion.span className={`block ${className}`} {...trigger}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.1em] -mb-[0.1em]">
          <motion.span
            className="block"
            variants={{
              hidden: { y: "110%" },
              show: {
                y: 0,
                transition: { duration: 1.1, delay: delay + i * 0.09, ease: [0.16, 1, 0.3, 1] },
              },
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
};

export const Marquee = ({ items, reverse = false, speed = 38, className = "", separator = "✦" }) => (
  <div
    className={`overflow-hidden select-none ${reverse ? "marquee-reverse" : ""} ${className}`}
    style={{ "--marquee-speed": `${speed}s` }}
  >
    <div className="marquee-track">
      {[0, 1].map((copy) => (
        <div key={copy} className="flex shrink-0 items-center" aria-hidden={copy === 1}>
          {items.map((item) => (
            <span key={item} className="flex items-center">
              <span className="px-6">{item}</span>
              <span className="text-accent text-[0.5em]">{separator}</span>
            </span>
          ))}
        </div>
      ))}
    </div>
  </div>
);

export const SectionLabel = ({ index, children }) => (
  <div className="flex items-center gap-4 eyebrow">
    <span className="text-ink">({index})</span>
    <span className="h-px w-10 bg-line" />
    <span>{children}</span>
  </div>
);

/** Small line arrow icon; `diagonal` points up-right for external links. */
export const Arrow = ({ diagonal = false, className = "w-4 h-4" }) => (
  <svg
    viewBox="0 0 16 16"
    fill="none"
    aria-hidden="true"
    className={`${className} ${diagonal ? "-rotate-45" : ""}`}
  >
    <path d="M2 8h11M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
