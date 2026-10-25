/**
 * Home — halaman beranda (one-page)
 * Alur kurasi mewah & fokus: Hero -> About -> Projects -> Process -> Experience -> Contact
 */
import Hero from '../sections/Hero';
import About from '../sections/About';
import Projects from '../sections/Projects';
import Process from '../sections/Process';
import Experience from '../sections/Experience';
import Contact from '../sections/Contact';

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Projects />
      <Process />
      <Experience />
      <Contact />
    </>
  );
}
