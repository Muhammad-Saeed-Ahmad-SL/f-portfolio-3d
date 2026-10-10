let lenis = null;

export const setLenis = (instance) => {
  lenis = instance;
};

/** Smooth-scroll to `#id` (or `#top`), via Lenis when it is running. */
export const scrollToHash = (hash) => {
  const target = hash === "#top" ? 0 : document.querySelector(hash);
  if (target === null) return;
  if (lenis) lenis.scrollTo(target, { offset: hash === "#top" ? 0 : -20, duration: 1.4 });
  else if (target === 0) window.scrollTo({ top: 0, behavior: "smooth" });
  else target.scrollIntoView({ behavior: "smooth" });
};
