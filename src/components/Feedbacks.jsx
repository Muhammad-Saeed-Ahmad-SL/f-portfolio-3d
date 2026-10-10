import { motion } from "framer-motion";
import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { testimonials } from "../constants";
import { RevealLines, SectionLabel } from "./ui";

const Feedbacks = () => (
  <>
    <SectionLabel index="05">Client work</SectionLabel>
    <h2 className={`${styles.sectionHeadText} mt-8`}>
      <RevealLines lines={["A couple of", "recent jobs"]} />
    </h2>

    <div className="mt-14 sm:mt-20 grid md:grid-cols-2 gap-5">
      {testimonials.map((t, i) => (
        <motion.figure
          key={t.name}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ delay: i * 0.12, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className={`relative rounded-[24px] p-8 sm:p-10 flex flex-col justify-between min-h-[340px] ${
            i % 2 ? "bg-lilac/40" : "bg-accent text-paper"
          }`}
        >
          <span className="font-mono text-[11px] uppercase tracking-[0.14em] opacity-70">
            {t.designation}
          </span>
          <blockquote className="mt-10 font-display font-medium text-[1.25rem] sm:text-[1.5rem] leading-[1.35] tracking-[-0.02em]">
            {t.testimonial}
          </blockquote>
          <figcaption className="mt-8 flex items-center justify-between gap-4 text-[13px]">
            <span className="font-semibold">{t.name}</span>
            <span className="font-mono uppercase tracking-[0.12em] opacity-70">{t.company}</span>
          </figcaption>
        </motion.figure>
      ))}
    </div>
  </>
);

export default SectionWrapper(Feedbacks, "");
