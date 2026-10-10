import { lazy, Suspense, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { styles } from "../styles";
import { marqueeSkills } from "../constants";
import { Arrow, Magnetic, Marquee, RevealLines, Roll } from "./ui";
import { scrollToHash } from "../utils/scroll";

const BlobCanvas = lazy(() => import("./canvas/Blob"));

const ease = [0.16, 1, 0.3, 1];

const Hero = ({ ready }) => {
  const ref = useRef();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  // Name lines drift apart and the blob sinks back as you scroll away
  const leftX = useTransform(scrollYProgress, [0, 1], ["0%", "-18%"]);
  const rightX = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const blobScale = useTransform(scrollYProgress, [0, 1], [1, 0.7]);
  const blobY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const fadeUp = (delay) => ({
    initial: { opacity: 0, y: 24 },
    animate: ready ? { opacity: 1, y: 0 } : {},
    transition: { duration: 1, delay, ease },
  });

  return (
    <section
      ref={ref}
      id="top"
      className="relative min-h-[100svh] flex flex-col overflow-hidden"
    >
      {/* 3D blob */}
      <motion.div
        style={{ scale: blobScale, y: blobY }}
        initial={{ opacity: 0, scale: 0.6 }}
        animate={ready ? { opacity: 1 } : {}}
        transition={{ duration: 1.6, delay: 0.2, ease }}
        className="absolute z-0 left-0 top-[26%] w-[100vw] h-[100vw] sm:left-auto sm:right-[-3%] sm:top-[3%] sm:w-[72vw] sm:h-[72vw] lg:w-[56vw] lg:h-[56vw] max-w-[920px] max-h-[920px]"
      >
        <Suspense fallback={null}>
          <BlobCanvas />
        </Suspense>
      </motion.div>

      <div className={`${styles.container} relative z-10 w-full flex-1 flex flex-col pt-28 sm:pt-32`}>
        <motion.div {...fadeUp(0.1)} className="flex flex-wrap items-center gap-x-6 gap-y-2">
          <span className="eyebrow">Full-stack developer</span>
          <span className="hidden sm:flex items-center gap-2 text-[13px] text-muted">
            <span className="pulse-dot" /> Open to new projects
          </span>
        </motion.div>

        <h1 className="mt-8 sm:mt-10 font-display font-bold uppercase tracking-[-0.055em] leading-[0.82] text-[22vw] sm:text-[17vw] xl:text-[15.5rem]">
          <motion.span style={{ x: leftX }} className="block">
            <RevealLines lines={["Saeed"]} play={ready} delay={0.15} />
          </motion.span>
          <motion.span style={{ x: rightX }} className="flex items-end gap-[3vw] sm:pl-[12vw]">
            <span
              className={`${styles.serifAccent} normal-case text-[0.32em] leading-none mb-[0.18em] text-accent hidden sm:block`}
            >
              <RevealLines lines={["(hello)"]} play={ready} delay={0.4} />
            </span>
            <RevealLines lines={["Ahmad"]} play={ready} delay={0.24} />
          </motion.span>
        </h1>

        <motion.div
          style={{ opacity: fade }}
          className="mt-auto pt-12 pb-8 grid gap-8 sm:grid-cols-12 items-end"
        >
          <motion.p
            {...fadeUp(0.55)}
            className="sm:col-span-6 lg:col-span-4 text-[17px] sm:text-[19px] leading-[1.5] text-ink/80 max-w-md"
          >
            I build websites and web apps for startups and growing businesses. Most of my work is{" "}
            <span className={`${styles.serifAccent} text-[1.25em] text-ink`}>SaaS products</span>,
            dashboards and the APIs behind them.
          </motion.p>

          <motion.div
            {...fadeUp(0.65)}
            className="sm:col-span-6 lg:col-span-8 flex flex-wrap sm:justify-end items-center gap-3"
          >
            <Magnetic>
              <a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToHash("#projects");
                }}
                className="pill pill-ink"
              >
                <Roll>See my work</Roll>
                <Arrow className="w-4 h-4 rotate-45" />
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToHash("#contact");
                }}
                className="pill pill-line"
              >
                <Roll>Get in touch</Roll>
              </a>
            </Magnetic>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : {}}
        transition={{ duration: 1, delay: 0.8 }}
        className="relative z-10 border-y border-line py-4 bg-paper/60 backdrop-blur-[2px]"
      >
        <Marquee
          items={marqueeSkills}
          className="font-display font-medium text-[1.4rem] sm:text-[1.9rem] tracking-[-0.02em]"
        />
      </motion.div>
    </section>
  );
};

export default Hero;
