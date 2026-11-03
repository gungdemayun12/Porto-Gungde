/**
 * Home — halaman beranda (one-page)
 * Hero -> Projects -> About -> Arcade -> Experience -> Contact
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
      <Projects />
      <About />
      <Arcade />
      <Experience />
      <Contact />
    </>
  );
}
