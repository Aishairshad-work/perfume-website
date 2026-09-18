import React, { useRef, useState, useEffect } from 'react';

export const BrandStory: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.18, rootMargin: '0px 0px -50px 0px' }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      className={`essence-luxury-section ${isInView ? 'in-view' : ''}`}
      id="about"
      ref={sectionRef}
    >
      <div className="essence-luxury-container">
        {/* Left Column: 3-Photo Editorial Collage */}
        <div className="essence-left-col">
          <div className="essence-photo-collage">
            <div className="collage-card card-top-left">
              <img
                src="/assets/content.JPG"
                alt="Artisanal ELHSAN Perfume Formulation"
                className="collage-img"
              />
            </div>
            <div className="collage-card card-bottom-left">
              <img
                src="/assets/man-with-perfume.jpg"
                alt="Sensorial Fragrance Journey"
                className="collage-img"
              />
            </div>
            <div className="collage-card card-right-tall">
              <img
                src="/assets/content2.jpg"
                alt="Golden Amber Extrait de Parfum Bottle"
                className="collage-img"
              />
            </div>
          </div>
        </div>

        {/* Right Column: Editorial Narrative & Typography */}
        <div className="essence-right-col">
          <div className="essence-about-kicker">
            <span className="editorial-kicker font-sans">ABOUT ELHSAN</span>
          </div>

          <div className="essence-title-wrapper">
            <h2 className="essence-main-title font-cinzel">
              <span className="title-row-one">Find Your</span>
              <span className="title-row-two">Signature Note</span>
            </h2>
          </div>

          <div className="essence-story-body">
            <p className="essence-narrative">
              <span className="story-emphasis">Born from the pursuit of enduring distinction</span>
              , ELHSAN crafts bespoke extraits and high-concentration perfumes blending rare natural resins, sparkling Calabrian citruses, and rich aged woods. Every formulation is{' '}
              <span className="story-emphasis">an intimate olfactory signature</span>
              {' '}— a presence designed to conquer every room you enter and linger with magnetic confidence.
            </p>

            <div className="mt-8 flex items-center gap-6">
              <div className="border-l-2 border-[#b8860b] pl-4">
                <span className="block font-cinzel text-xl font-bold text-[#1a1815]">14+ Hours</span>
                <span className="text-[11px] text-[#6e6962] tracking-wider uppercase font-sans">Enduring Sillage</span>
              </div>
              <div className="border-l-2 border-[#b8860b] pl-4">
                <span className="block font-cinzel text-xl font-bold text-[#1a1815]">100% Pure</span>
                <span className="text-[11px] text-[#6e6962] tracking-wider uppercase font-sans">Artisan Extraits</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
