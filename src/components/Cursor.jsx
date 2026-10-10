import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * Dot + trailing ring. Any element with `data-cursor="Label"` grows the ring
 * and shows the label; plain links/buttons just grow it.
 */
const Cursor = () => {
  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState("");
  const [hovering, setHovering] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 260, damping: 26, mass: 0.6 });
  const ry = useSpring(y, { stiffness: 260, damping: 26, mass: 0.6 });

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!mq.matches) return;
    setEnabled(true);
    document.documentElement.classList.add("has-cursor");

    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const over = (e) => {
      const target = e.target.closest("[data-cursor], a, button, input, textarea");
      setHovering(Boolean(target));
      setLabel(target?.dataset.cursor || "");
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerover", over);
    return () => {
      document.documentElement.classList.remove("has-cursor");
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
    };
  }, [x, y]);

  if (!enabled) return null;

  const size = label ? 96 : hovering ? 56 : 34;

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 z-[90] pointer-events-none w-1.5 h-1.5 rounded-full bg-accent"
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
      />
      <motion.div
        className={`fixed top-0 left-0 z-[90] pointer-events-none rounded-full flex items-center justify-center font-mono text-[10px] uppercase tracking-[0.14em] transition-[width,height,background-color,border-color] duration-300 ease-expo ${
          label
            ? "bg-ink text-paper border border-ink"
            : hovering
              ? "border border-accent bg-accent/10"
              : "border border-ink/40"
        }`}
        style={{ x: rx, y: ry, translateX: "-50%", translateY: "-50%", width: size, height: size }}
      >
        {label}
      </motion.div>
    </>
  );
};

export default Cursor;
