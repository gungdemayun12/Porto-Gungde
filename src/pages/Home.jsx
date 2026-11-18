/**
 * Home — halaman beranda (one-page)
 * Hero -> Projects -> About -> Arcade -> Experience -> Contact
 */
import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from '../sections/Hero';
import About from '../sections/About';
import Projects from '../sections/Projects';
import Arcade from '../sections/TypingGame';
import Experience from '../sections/Experience';
import Contact from '../sections/Contact';

export default function Home() {
  const { hash } = useLocation();

  // Land on the requested section (e.g. /#projects after leaving a detail page)
  // before the browser paints, so the route transition never shows a flash.
  useLayoutEffect(() => {
    if (!hash) return;
    const id = decodeURIComponent(hash.slice(1));
    const target = document.getElementById(id);
    if (!target) return;
    const top = target.getBoundingClientRect().top + window.scrollY - 96;
    window.scrollTo({ top: Math.max(0, top), behavior: 'instant' });
  }, [hash]);

  return (
    <>
      <Hero />
      <Projects />
      <About />
      <Arcade />
      <Experience />
      <Contact />
    </>
  );
}
