import { motion } from "framer-motion";
import { SectionWrapper } from "../hoc";
import { certificates } from "../constants";
import { Arrow, SectionLabel } from "./ui";

const Certificates = () => (
  <div className="grid lg:grid-cols-12 gap-10">
    <div className="lg:col-span-4">
      <SectionLabel index="06">Certificates</SectionLabel>
      <p className="mt-6 text-[15px] leading-relaxed text-muted max-w-xs">
        Click any certificate to check it on Coursera or Credly.
      </p>
    </div>
    <ul className="lg:col-span-8 border-t border-ink">
      {certificates.map((cert, i) => (
        <motion.li
          key={cert.credentialId}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.07, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="border-b border-line"
        >
          <a
            href={cert.url}
            target="_blank"
            rel="noreferrer"
            data-cursor="Verify"
            className="group flex items-center justify-between gap-6 py-6"
          >
            <span className="min-w-0">
              <span className="block font-display font-semibold text-[1.2rem] sm:text-[1.5rem] tracking-[-0.02em] leading-snug group-hover:text-accent transition-colors">
                {cert.name}
              </span>
              <span className="mt-1 block font-mono text-[11px] text-muted tracking-wide uppercase">
                {cert.issuer}, ID {cert.credentialId}
              </span>
            </span>
            <span
              aria-hidden
              className="shrink-0 text-[20px] transition-transform duration-500 ease-expo group-hover:-rotate-45"
            >
              <Arrow className="w-5 h-5" />
            </span>
          </a>
        </motion.li>
      ))}
    </ul>
  </div>
);

export default SectionWrapper(Certificates, "certificates");
