import { useEffect, useState } from "react";
import Lenis from "lenis";
import {
  About,
  Certificates,
  Contact,
  Cursor,
  Experience,
  Feedbacks,
  Hero,
  Navbar,
  Preloader,
  Tech,
  Works,
} from "./components";
import { setLenis } from "./utils/scroll";

const App = () => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ duration: 1.15, easing: (t) => 1 - Math.pow(1 - t, 4) });
    setLenis(lenis);
    let raf;
    const loop = (time) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      setLenis(null);
    };
  }, []);

  return (
    <>
      <Preloader onDone={() => setReady(true)} />
      <Cursor />
      <Navbar />
      <main>
        <Hero ready={ready} />
        <About />
        <Works />
        <Experience />
        <Tech />
        <Feedbacks />
        <Certificates />
        <Contact />
      </main>
    </>
  );
};

export default App;
