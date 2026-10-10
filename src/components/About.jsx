import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { styles } from "../styles";
import { services, stats } from "../constants";
import { SectionWrapper } from "../hoc";
import { RevealLines, SectionLabel } from "./ui";

const statement =
  "Hi, I'm Saeed. I've been building for the web since 2022, and these days I work across the whole stack, from the database and API to the screens people click through. I've worked on carbon reporting tools, ad research platforms, home care services, restaurant billing and plenty of internal dashboards.";

const Word = ({ children, progress, range }) => {
  const opacity = useTransform(progress, range, [0.14, 1]);
  return (
    <motion.span style={{ opacity }} className="inline-block mr-[0.25em]">
      {children}
    </motion.span>
  );
};

/** Each word brightens as the paragraph scrolls through the viewport. */
const ScrubText = ({ text }) => {
  const ref = useRef();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const words = text.split(" ");
  return (
    <p
      ref={ref}
      className="font-display font-medium tracking-[-0.03em] leading-[1.12] text-[1.9rem] sm:text-[2.8rem] lg:text-[3.6rem]"
    >
      {words.map((w, i) => (
        <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
          {w}
        </Word>
      ))}
    </p>
  );
};

const About = () => (
  <>
    <SectionLabel index="01">About</SectionLabel>

    <div className="mt-10 sm:mt-14 max-w-[1150px]">
      <ScrubText text={statement} />
    </div>

    <div className="mt-16 sm:mt-24 grid grid-cols-3 border-t border-line">
      {stats.map((s, i) => (
        <motion.div
          key={s.label}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className={`pt-6 sm:pt-8 ${i ? "pl-4 sm:pl-8 border-l border-line" : ""}`}
        >
          <p className="font-display font-semibold tracking-[-0.05em] text-[3rem] sm:text-[5.5rem] leading-none">
            {s.value}
          </p>
          <p className="mt-2 eyebrow">{s.label}</p>
        </motion.div>
      ))}
    </div>

    <div className="mt-24 sm:mt-36 grid lg:grid-cols-12 gap-10">
      <div className="lg:col-span-4">
        <h2 className={styles.sectionHeadText}>
          <RevealLines lines={["How I", "can help"]} />
        </h2>
        <p className={`${styles.serifAccent} mt-4 text-[1.4rem] text-muted`}>
          The work I do most often.
        </p>
      </div>
      <ol className="lg:col-span-8 border-t border-ink">
        {services.map((s, i) => (
          <motion.li
            key={s.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ delay: i * 0.06, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="group relative isolate border-b border-line py-7 sm:py-9 grid sm:grid-cols-12 gap-3 overflow-hidden"
          >
            <span className="absolute inset-0 bg-ink origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-500 ease-expo -z-10" />
            <span className="sm:col-span-1 font-mono text-[12px] text-muted group-hover:text-paper/50 transition-colors pt-2 sm:pl-3">
              0{i + 1}
            </span>
            <h3 className="sm:col-span-5 font-display font-semibold text-[1.7rem] sm:text-[2.1rem] tracking-[-0.03em] leading-tight group-hover:text-paper group-hover:translate-x-3 transition-all duration-500 ease-expo">
              {s.title}
            </h3>
            <p className="sm:col-span-6 text-[15px] leading-relaxed text-muted group-hover:text-paper/70 transition-colors sm:pr-4">
              {s.description}
            </p>
          </motion.li>
        ))}
      </ol>
    </div>
  </>
);

export default SectionWrapper(About, "about");
