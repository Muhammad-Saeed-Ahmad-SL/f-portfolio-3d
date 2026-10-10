import { motion } from "framer-motion";
import { styles } from "../styles";
import { marqueeSkills, skillGroups } from "../constants";
import { Marquee, RevealLines } from "./ui";

const Tech = () => (
  <section id="skills" className="relative bg-ink text-paper rounded-[32px] sm:rounded-[56px] mx-2 sm:mx-4 scroll-mt-16 overflow-hidden">
    <div className={`${styles.container} pt-20 sm:pt-32`}>
      <div className="flex items-center gap-4 eyebrow !text-paper/50">
        <span className="text-paper">(04)</span>
        <span className="h-px w-10 bg-paper/20" />
        <span>Skills</span>
      </div>
      <div className="mt-8 flex flex-wrap items-end justify-between gap-6">
        <h2 className={styles.sectionHeadText}>
          <RevealLines lines={["Skills and tools"]} />
        </h2>
        <p className={`${styles.serifAccent} text-[1.5rem] text-paper/60 max-w-xs`}>
          What I use day to day.
        </p>
      </div>
    </div>

    <div className="mt-14 sm:mt-20 space-y-2 font-display font-semibold tracking-[-0.04em] text-[3rem] sm:text-[5.5rem] leading-[1.05]">
      <Marquee items={marqueeSkills.slice(0, 6)} speed={30} />
      <Marquee
        items={marqueeSkills.slice(6)}
        speed={34}
        reverse
        className="text-transparent [-webkit-text-stroke:1px_rgba(241,237,228,0.55)]"
      />
    </div>

    <div className={`${styles.container} pt-16 sm:pt-24 pb-24 sm:pb-36`}>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-paper/10 rounded-[20px] overflow-hidden">
        {skillGroups.map((group, i) => (
          <motion.div
            key={group.title}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: (i % 3) * 0.1, duration: 0.8 }}
            className="group bg-ink p-7 sm:p-9 hover:bg-ink-2 transition-colors"
          >
            <div className="flex items-baseline justify-between">
              <h3 className="font-display font-semibold text-[1.5rem] tracking-[-0.03em]">
                {group.title}
              </h3>
              <span className="font-mono text-[11px] text-paper/40">
                {String(group.items.length).padStart(2, "0")}
              </span>
            </div>
            <ul className="mt-6 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <li
                  key={item}
                  className="text-[13px] px-3 py-1.5 rounded-full border border-paper/15 text-paper/75 group-hover:border-paper/25 transition-colors"
                >
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Tech;
