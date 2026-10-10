import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { styles } from "../styles";
import { navLinks } from "../constants";
import { logo } from "../assets";
import { Magnetic, Roll } from "./ui";
import { scrollToHash } from "../utils/scroll";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Hide while scrolling down, reveal on the way up
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      setHidden(y > 300 && y > last);
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  const go = (e, hash) => {
    e.preventDefault();
    setOpen(false);
    scrollToHash(hash);
  };

  return (
    <>
      <motion.header
        animate={{ y: hidden && !open ? "-110%" : 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 inset-x-0 z-50"
      >
        <nav
          className={`${styles.paddingX} py-4 transition-colors duration-500 ${
            scrolled && !open ? "bg-paper/80 backdrop-blur-md border-b border-line" : ""
          }`}
        >
          <div className="max-w-[1400px] mx-auto flex items-center justify-between">
            <a href="#top" onClick={(e) => go(e, "#top")} className="flex items-center gap-3">
              <img src={logo} alt="" className={`w-9 h-9 rounded-full ${open ? "ring-1 ring-paper/30" : ""}`} />
              <span
                className={`font-display font-semibold text-[15px] tracking-tight transition-colors ${
                  open ? "text-paper" : ""
                }`}
              >
                <Roll>Saeed Ahmad</Roll>
              </span>
            </a>

            <ul className="hidden lg:flex items-center gap-9 text-[14px]">
              {navLinks.slice(0, -1).map((link) => (
                <li key={link.id}>
                  <a href={`#${link.id}`} onClick={(e) => go(e, `#${link.id}`)}>
                    <Roll>{link.title}</Roll>
                  </a>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-3">
              <Magnetic className="hidden sm:inline-block">
                <a
                  href="#contact"
                  onClick={(e) => go(e, "#contact")}
                  className="pill pill-ink !py-2.5 !px-5 !text-[13px]"
                >
                  <Roll>Let&apos;s talk</Roll>
                </a>
              </Magnetic>
              <button
                type="button"
                onClick={() => setOpen((o) => !o)}
                aria-label={open ? "Close menu" : "Open menu"}
                aria-expanded={open}
                className={`lg:hidden w-11 h-11 rounded-full flex flex-col items-center justify-center gap-1.5 transition-colors ${
                  open ? "bg-paper" : "bg-ink"
                }`}
              >
                <span
                  className={`block h-[1.5px] w-5 transition-transform duration-500 ease-expo ${
                    open ? "bg-ink translate-y-[3.75px] rotate-45" : "bg-paper"
                  }`}
                />
                <span
                  className={`block h-[1.5px] w-5 transition-transform duration-500 ease-expo ${
                    open ? "bg-ink -translate-y-[3.75px] -rotate-45" : "bg-paper"
                  }`}
                />
              </button>
            </div>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: "circle(0% at calc(100% - 42px) 38px)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 42px) 38px)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 42px) 38px)" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-40 bg-ink text-paper px-6 pt-28 pb-10 flex flex-col justify-between lg:hidden"
          >
            <ul className="flex flex-col gap-1">
              {navLinks.map((link, i) => (
                <li key={link.id} className="overflow-hidden">
                  <motion.a
                    href={`#${link.id}`}
                    onClick={(e) => go(e, `#${link.id}`)}
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    transition={{ delay: 0.25 + i * 0.06, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className="flex items-baseline gap-4 font-display font-semibold text-[3.2rem] leading-[1.05] tracking-[-0.04em]"
                  >
                    <span className="font-mono text-[11px] text-paper/40 tracking-normal">
                      0{i + 1}
                    </span>
                    {link.title}
                  </motion.a>
                </li>
              ))}
            </ul>
            <div className="flex items-center gap-3 text-paper/60 text-[13px]">
              <span className="pulse-dot" />
              Open to freelance and full-time work
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
