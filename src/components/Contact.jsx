import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { styles } from "../styles";
import { navLinks } from "../constants";
import { logo } from "../assets";
import { Arrow, Magnetic, RevealLines, Roll } from "./ui";
import { scrollToHash } from "../utils/scroll";

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || "service_kt79wjg";
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "template_zp6ndvn";
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "XmiAVAwPo7qEQI2g4";
const TO_EMAIL = import.meta.env.VITE_CONTACT_EMAIL || "saeed.irfan239960@gmail.com";

const useLocalTime = () => {
  const fmt = () =>
    new Date().toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Asia/Karachi",
    });
  const [time, setTime] = useState(fmt);
  useEffect(() => {
    const id = setInterval(() => setTime(fmt()), 30_000);
    return () => clearInterval(id);
  }, []);
  return time;
};

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [copied, setCopied] = useState(false);
  const time = useLocalTime();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("");
    setLoading(true);

    emailjs
      .send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name: form.name,
          to_name: "M. Saeed Ahmad",
          from_email: form.email,
          to_email: TO_EMAIL,
          message: form.message,
        },
        PUBLIC_KEY,
      )
      .then(
        () => {
          setLoading(false);
          setStatus("Thanks, I'll get back to you soon.");
          setForm({ name: "", email: "", message: "" });
        },
        (error) => {
          setLoading(false);
          console.error(error);
          setStatus("Something went wrong. Please email me directly instead.");
        },
      );
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(TO_EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${TO_EMAIL}`;
    }
  };

  return (
    <section
      id="contact"
      className="relative bg-ink text-paper rounded-t-[32px] sm:rounded-t-[56px] mx-2 sm:mx-4 mt-10 scroll-mt-16 overflow-hidden"
    >
      <div className={`${styles.container} pt-20 sm:pt-32`}>
        <div className="flex items-center gap-4 eyebrow !text-paper/50">
          <span className="text-paper">(07)</span>
          <span className="h-px w-10 bg-paper/20" />
          <span>Contact</span>
        </div>

        <h2 className="mt-8 font-display font-semibold tracking-[-0.05em] leading-[0.9] text-[3.4rem] sm:text-[6rem] lg:text-[8.5rem]">
          <RevealLines lines={["Let's work"]} />
          <span className={`${styles.serifAccent} text-accent`}>
            <RevealLines lines={["together."]} delay={0.12} />
          </span>
        </h2>

        <div className="mt-16 sm:mt-24 grid lg:grid-cols-12 gap-14">
          <div className="lg:col-span-5 flex flex-col gap-8">
            <p className="text-[17px] leading-relaxed text-paper/70 max-w-md">
              Hiring for a role or need something built? Send me a short message and I&apos;ll get
              back to you soon.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Magnetic strength={0.5}>
                <button
                  type="button"
                  onClick={copyEmail}
                  data-cursor={copied ? "Copied" : "Copy"}
                  className="w-40 h-40 sm:w-48 sm:h-48 rounded-full bg-accent text-paper font-display font-semibold text-[1.05rem] flex flex-col items-center justify-center gap-1 hover:scale-105 transition-transform duration-500 ease-expo"
                >
                  {copied ? "Copied!" : "Copy email"}
                </button>
              </Magnetic>
              <a
                href={`mailto:${TO_EMAIL}`}
                className="text-[15px] sm:text-[17px] underline decoration-paper/30 underline-offset-[6px] hover:decoration-accent transition-colors break-all"
              >
                {TO_EMAIL}
              </a>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="lg:col-span-7 flex flex-col gap-8">
            {[
              { name: "name", label: "What's your name?", type: "text", ph: "Jane Doe" },
              { name: "email", label: "Your email", type: "email", ph: "jane@company.com" },
            ].map((f, i) => (
              <label key={f.name} className="flex gap-5">
                <span className="font-mono text-[11px] text-paper/40 pt-1">0{i + 1}</span>
                <span className="flex-1">
                  <span className="block font-display text-[1.3rem] tracking-[-0.02em]">{f.label}</span>
                  <input
                    type={f.type}
                    name={f.name}
                    value={form[f.name]}
                    onChange={handleChange}
                    placeholder={f.ph}
                    required
                    className="input-line"
                  />
                </span>
              </label>
            ))}
            <label className="flex gap-5">
              <span className="font-mono text-[11px] text-paper/40 pt-1">03</span>
              <span className="flex-1">
                <span className="block font-display text-[1.3rem] tracking-[-0.02em]">
                  Tell me about the project
                </span>
                <textarea
                  rows="4"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="What are you building or hiring for?"
                  required
                  className="input-line resize-none"
                />
              </span>
            </label>
            <div className="flex flex-wrap items-center gap-5 pl-9">
              <Magnetic>
                <button
                  type="submit"
                  disabled={loading}
                  className="pill bg-paper text-ink hover:bg-accent hover:text-paper disabled:opacity-60"
                >
                  <Roll>{loading ? "Sending…" : "Send message"}</Roll>
                  <Arrow />
                </button>
              </Magnetic>
              {status ? (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-[14px] text-paper/70"
                  role="status"
                >
                  {status}
                </motion.p>
              ) : null}
            </div>
          </form>
        </div>
      </div>

      <footer className={`${styles.container} mt-24 sm:mt-36 pb-8`}>
        <div className="flex flex-wrap justify-between gap-8 border-t border-paper/15 pt-8 text-[13px]">
          <div className="flex items-center gap-3">
            <img src={logo} alt="" className="w-9 h-9 ring-1 ring-paper/20 rounded-full" />
            <div>
              <p className="font-display font-semibold">Muhammad Saeed Ahmad</p>
              <p className="text-paper/50">Full-stack developer</p>
            </div>
          </div>
          <ul className="flex flex-wrap gap-x-7 gap-y-2">
            {navLinks.map((l) => (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToHash(`#${l.id}`);
                  }}
                  className="text-paper/70 hover:text-paper"
                >
                  <Roll>{l.title}</Roll>
                </a>
              </li>
            ))}
          </ul>
          <div className="text-paper/50 font-mono text-[11px] uppercase tracking-[0.14em] leading-6">
            <p>Pakistan, {time} PKT</p>
            <p>© {new Date().getFullYear()} Saeed Ahmad</p>
          </div>
        </div>
        <p
          aria-hidden
          className="mt-12 font-display font-bold uppercase tracking-[-0.05em] leading-[0.78] text-[14.2vw] text-center text-paper/[0.07] select-none whitespace-nowrap"
        >
          Saeed Ahmad
        </p>
      </footer>
    </section>
  );
};

export default Contact;
