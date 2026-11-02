/**
 * Home — halaman beranda (one-page)
 * Hero -> About -> Projects -> Arcade -> Experience -> Contact
 */
import Hero from '../sections/Hero';
import About from '../sections/About';
import Projects from '../sections/Projects';
import Arcade from '../sections/TypingGame';
import Experience from '../sections/Experience';
import Contact from '../sections/Contact';

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Projects />
      <Arcade />
      <Experience />
      <Contact />
    </>
  );
}
