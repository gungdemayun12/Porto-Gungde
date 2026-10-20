/**
 * Testimonials — slider testimoni otomatis
 * Dengan auto-play, pause on hover, swipe di mobile, dan dots navigasi.
 */
import { useState, useEffect, useCallback, useRef } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import SectionTitle from '../components/ui/SectionTitle';
import { useLang } from '../hooks/useLang';
import { useInView } from '../hooks/useInView';
import { testimonialsData } from '../data/testimonials';

export default function Testimonials() {
  const { t, lang } = useLang();
  const { ref, isInView } = useInView({ triggerOnce: true });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef(0);

  const total = testimonialsData.length;

  // Auto-play
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % total);
    }, 5000);
    return () => clearInterval(interval);
  }, [isPaused, total]);

  const goTo = useCallback((idx) => {
    setCurrentIndex(idx);
  }, []);

  const goPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  const goNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  // Swipe handling di mobile
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      diff > 0 ? goNext() : goPrev();
    }
  };

  const current = testimonialsData[currentIndex];
  const quote = current.quote[lang] || current.quote.en;
  const role = current.role[lang] || current.role.en;

  return (
    <section id="testimonials" className="section-padding" aria-label="Testimonials" ref={ref}>
      <div className="container-main">
        <SectionTitle
          title={t.testimonials.sectionTitle}
          subtitle={t.testimonials.sectionSubtitle}
        />

        <div
          className={`max-w-3xl mx-auto transition-all duration-700
            ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Kartu testimoni */}
          <div className="relative p-8 lg:p-12 rounded-[var(--radius-card)] bg-surface border border-border card-shadow text-center">
            {/* Ikon kutipan */}
            <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-6">
              <Quote size={20} className="text-gold" />
            </div>

            {/* Kutipan */}
            <blockquote className="text-text text-lg lg:text-xl leading-relaxed mb-8 italic">
              {quote}
            </blockquote>

            {/* Rating bintang */}
            <div className="flex justify-center gap-1 mb-4">
              {[...Array(current.rating)].map((_, i) => (
                <Star key={i} size={16} className="text-gold fill-gold" />
              ))}
            </div>

            {/* Profil */}
            <div>
              {/* Avatar */}
              <div className="w-12 h-12 rounded-full bg-gold/10 border-2 border-gold/30 mx-auto mb-2
                flex items-center justify-center">
                <span className="text-gold-text font-heading font-bold text-sm">
                  {current.name.split(' ').map((n) => n[0]).join('')}
                </span>
              </div>
              <p className="font-heading font-semibold text-text">{current.name}</p>
              <p className="text-muted text-sm">{role}</p>
            </div>
          </div>

          {/* Navigasi */}
          <div className="flex items-center justify-center gap-4 mt-8">
            {/* Tombol prev */}
            <button
              onClick={goPrev}
              aria-label="Previous testimonial"
              className="p-2 rounded-full border border-border text-muted hover:text-gold hover:border-gold
                transition-all duration-300 cursor-pointer"
            >
              <ChevronLeft size={18} />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonialsData.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 cursor-pointer
                    ${i === currentIndex ? 'bg-gold w-6' : 'bg-border hover:bg-muted'}`}
                />
              ))}
            </div>

            {/* Tombol next */}
            <button
              onClick={goNext}
              aria-label="Next testimonial"
              className="p-2 rounded-full border border-border text-muted hover:text-gold hover:border-gold
                transition-all duration-300 cursor-pointer"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
