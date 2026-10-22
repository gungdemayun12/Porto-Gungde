/**
 * Services — layanan utama dalam circular carousel yang bisa digeser.
 */
import { useEffect, useState } from 'react';
import CircularCarousel from '../components/ui/CircularCarousel';
import SectionTitle from '../components/ui/SectionTitle';
import { useLang } from '../hooks/useLang';
import { servicesData } from '../data/services';

export default function Services() {
  const { t, lang } = useLang();
  const [activeIndex, setActiveIndex] = useState(0);
  const [theme, setTheme] = useState(() =>
    document.documentElement.classList.contains('dark') ? 'dark' : 'light'
  );

  useEffect(() => {
    const root = document.documentElement;
    const observer = new MutationObserver(() => {
      setTheme(root.classList.contains('dark') ? 'dark' : 'light');
    });
    observer.observe(root, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  const items = servicesData.map((service) => ({
    src: service.image,
    alt: service.imageAlt[lang] || service.imageAlt.en,
    title: service.title[lang] || service.title.en,
    subtitle: service.subtitle[lang] || service.subtitle.en,
  }));
  const activeService = servicesData[activeIndex];

  return (
    <section
      id="services"
      className="section-padding bg-surface/30"
      aria-label={t.services.sectionTitle}
    >
      <div className="container-main">
        <SectionTitle
          label={t.services.eyebrow}
          title={t.services.sectionTitle}
          subtitle={t.services.sectionSubtitle}
        />

        <div className="mx-auto h-[430px] w-full max-w-5xl sm:h-[500px] lg:h-[560px]">
          <CircularCarousel
            items={items}
            preset="cylinder"
            intro="rise"
            cardWidth={210}
            aspectRatio={0.86}
            gap={28}
            autoplay="drift"
            speed={10}
            pauseOnHover
            focusOnClick
            captions
            fadeColor={theme === 'dark' ? '#090A0D' : '#FCFAF6'}
            ariaLabel={t.services.carouselLabel}
            onChange={setActiveIndex}
          />
        </div>

        <p
          key={activeService.id}
          className="mx-auto mt-2 max-w-2xl text-center text-sm leading-relaxed text-muted sm:text-base"
          aria-live="polite"
        >
          {activeService.description[lang] || activeService.description.en}
        </p>
      </div>
    </section>
  );
}
