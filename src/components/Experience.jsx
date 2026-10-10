import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { styles } from "../styles";
import { experiences } from "../constants";
import { SectionWrapper } from "../hoc";
import { RevealLines, SectionLabel } from "./ui";

const ease = [0.16, 1, 0.3, 1];

const Experience = () => {
  const [open, setOpen] = useState(0);

  return (
    <>
      <SectionLabel index="03">Experience</SectionLabel>
      <h2 className={`${styles.sectionHeadText} mt-8`}>
        <RevealLines lines={["Where I've", "worked"]} />
      </h2>

      <div className="mt-14 sm:mt-20 border-t border-ink">
        {experiences.map((exp, i) => {
          const isOpen = open === i;
          return (
            <motion.div
              key={exp.company_name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: i * 0.08, duration: 0.8, ease }}
              className="border-b border-line"
            >
              <button
                type="button"
                onClick={() => setOpen(isOpen ? -1 : i)}
                aria-expanded={isOpen}
                className="group w-full text-left py-7 sm:py-9 grid grid-cols-[1fr_auto] sm:grid-cols-12 gap-x-4 gap-y-3 items-center"
              >
                <span className="col-span-2 sm:col-span-3 font-mono text-[12px] text-muted tracking-wide">
                  {exp.date}
                </span>
                <span className="sm:col-span-8 flex items-center gap-4 min-w-0">
                  <img
                    src={exp.icon}
                    alt=""
                    className="w-11 h-11 shrink-0 rounded-full object-contain p-2 border border-line"
                    style={{ background: exp.iconBg }}
                  />
                  <span className="min-w-0">
                    <span className="block font-display font-semibold text-[1.4rem] sm:text-[2rem] tracking-[-0.03em] leading-tight transition-transform duration-500 ease-expo group-hover:translate-x-2">
                      {exp.company_name}
                    </span>
                    <span className="block text-[14px] text-muted mt-1">{exp.title}</span>
                  </span>
                </span>
                <span
                  aria-hidden
                  className={`sm:col-span-1 justify-self-end w-11 h-11 rounded-full border flex items-center justify-center text-[20px] transition-all duration-500 ease-expo ${
                    isOpen ? "bg-ink text-paper border-ink rotate-45" : "border-line group-hover:border-ink"
                  }`}
                >
                  +
                </span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.6, ease }}
                    className="overflow-hidden"
                  >
                    <ul className="pb-9 sm:pl-[25%] grid sm:grid-cols-2 gap-x-10 gap-y-4">
                      {exp.points.map((point) => (
                        <li key={point} className="flex gap-3 text-[15px] leading-relaxed text-ink/75">
                          <span className="mt-[0.6em] w-1.5 h-1.5 shrink-0 rounded-full bg-accent" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </>
  );
};

export default SectionWrapper(Experience, "experience");
