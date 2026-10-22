/**
 * Home — halaman beranda (one-page)
 * Alur kurasi mewah & fokus: Hero -> About -> Projects -> Services -> Experience -> Contact
 */
import Hero from '../sections/Hero';
import About from '../sections/About';
import Projects from '../sections/Projects';
import Services from '../sections/Services';
import Experience from '../sections/Experience';
import Contact from '../sections/Contact';

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Projects />
      <Services />
      <Experience />
      <Contact />
    </>
  );
}
