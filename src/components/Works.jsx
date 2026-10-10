import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { projects } from "../constants";
import { Arrow, RevealLines, SectionLabel } from "./ui";

const displayUrl = (url) => url.replace(/^https?:\/\//, "").replace(/\/$/, "");

const ProjectCard = ({ project, index }) => {
  const ref = useRef();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  // Card drifts slightly against the scroll for a subtle parallax
  const cardY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  const { name, description, tags, image, live_demo_link: url, role } = project;
  const Tag = url ? "a" : "div";
  const linkProps = url
    ? { href: url, target: "_blank", rel: "noreferrer", "data-cursor": "Visit" }
    : { "data-cursor": "Private" };

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
      style={{ order: index }}
    >
      <Tag {...linkProps} className="group block">
        <motion.div
          style={{ y: cardY }}
          className="rounded-[18px] overflow-hidden bg-paper-2 border border-line shadow-[0_30px_80px_-40px_rgba(17,17,16,0.35)]"
        >
          {/* Browser chrome with the real address */}
          <div className="flex items-center gap-3 px-4 h-9 border-b border-line bg-paper">
            <span className="flex gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-ink/15 group-hover:bg-[#ff5f57] transition-colors" />
              <span className="w-2.5 h-2.5 rounded-full bg-ink/15 group-hover:bg-[#febc2e] transition-colors" />
              <span className="w-2.5 h-2.5 rounded-full bg-ink/15 group-hover:bg-[#28c840] transition-colors" />
            </span>
            <span className="flex-1 min-w-0 truncate text-center font-mono text-[10.5px] text-muted">
              {url ? displayUrl(url) : "private build"}
            </span>
            <span className="w-[42px]" />
          </div>
          <div className="relative overflow-hidden aspect-[16/10]">
            <img
              src={image}
              alt={`${name} screenshot`}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-[1.2s] ease-expo group-hover:scale-[1.04]"
            />
            <span className="absolute bottom-4 left-4 chip !text-ink !border-ink/10 bg-paper/90 backdrop-blur">
              {role}
            </span>
          </div>
        </motion.div>

        <div className="mt-6 flex items-start justify-between gap-6">
          <div className="min-w-0">
            <div className="flex items-baseline gap-3">
              <span className="font-mono text-[12px] text-muted">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="font-display font-semibold text-[1.9rem] sm:text-[2.4rem] tracking-[-0.04em] leading-none">
                {name}
              </h3>
            </div>
            <p className="mt-4 text-[15px] leading-relaxed text-muted max-w-[52ch]">
              {description}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {tags.map((t) => (
                <span key={t.name} className="chip">
                  {t.name}
                </span>
              ))}
            </div>
          </div>
          <span
            aria-hidden
            className="shrink-0 w-12 h-12 rounded-full border border-line flex items-center justify-center text-[18px] transition-all duration-500 ease-expo group-hover:bg-accent group-hover:border-accent group-hover:text-paper group-hover:-rotate-45"
          >
            <Arrow className="w-[18px] h-[18px]" />
          </span>
        </div>
        <p className="mt-4 font-mono text-[12px] tracking-wide">
          {url ? (
            <span className="text-ink underline decoration-line underline-offset-4 group-hover:decoration-accent transition-colors">
              {displayUrl(url)}
            </span>
          ) : (
            <span className="text-muted">Private project, demo available on request</span>
          )}
        </p>
      </Tag>
    </motion.article>
  );
};

const Works = () => (
  <>
    <SectionLabel index="02">Selected work</SectionLabel>
    <div className="mt-8 flex flex-wrap items-end justify-between gap-6">
      <h2 className={styles.sectionHeadText}>
        <RevealLines lines={["Selected", "projects"]} />
      </h2>
      <p className="max-w-sm text-[15px] leading-relaxed text-muted">
        A mix of products I built from scratch and ones I joined and helped grow. Click any card to open the live site.
        <span className="block mt-2 font-mono text-[11px] uppercase tracking-[0.14em] text-ink">
          {projects.length} projects
        </span>
      </p>
    </div>

    {/* Two staggered columns on desktop; `contents` keeps the original order on mobile */}
    <div className="mt-16 sm:mt-24 flex flex-col gap-20 md:flex-row md:gap-10 lg:gap-16">
      {[0, 1].map((col) => (
        <div
          key={col}
          className={`contents md:flex md:flex-col md:flex-1 md:gap-24 ${col ? "md:pt-48" : ""}`}
        >
          {projects.map((p, i) =>
            i % 2 === col ? <ProjectCard key={p.name} project={p} index={i} /> : null,
          )}
        </div>
      ))}
    </div>
  </>
);

export default SectionWrapper(Works, "projects");
