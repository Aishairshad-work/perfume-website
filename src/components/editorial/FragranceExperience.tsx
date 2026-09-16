import React, { useRef, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';

interface FragranceExperienceProps {
  onExplore?: () => void;
}

export const FragranceExperience: React.FC<FragranceExperienceProps> = ({ onExplore }) => {
  const containerRef = useRef<HTMLElement | null>(null);
  const bgRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || !bgRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const vh = window.innerHeight;
      if (rect.top <= vh && rect.bottom >= 0) {
        const p = ((vh - rect.top) / (vh + rect.height) - 0.5) * 20;
        bgRef.current.style.transform = `translate3d(0, ${p}px, 0)`;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAction = () => {
    if (onExplore) {
      onExplore();
    } else {
      const el = document.getElementById('collection');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="fyn-fullwidth-parallax-cta" ref={containerRef} id="experience">
      {/* Background Parallax Layer */}
      <div className="parallax-bg-layer" ref={bgRef}>
        <img
          src="/assets/content.JPG"
          alt="ELHSAN Haute Parfumerie Reserve"
          className="parallax-bg-image"
        />
      </div>

      {/* Gradient Overlay */}
      <div className="parallax-gradient-overlay" />

      {/* Content Container */}
      <div className="fyn-parallax-cta-container">
        <div className="fyn-parallax-cta-content">
          <span className="parallax-cta-kicker font-sans">HAUTE PARFUMERIE PRIVÉE</span>
          <h2 className="parallax-cta-title font-cinzel">
            <span className="parallax-title-line">The Art of Timeless Opulence</span>
          </h2>
          <p className="parallax-cta-desc font-sans">
            Handcrafted in rare micro-batches with pure aged agarwood, velvet Tuscan orris, and radiant molten amber.
          </p>
          <button className="parallax-cta-action-btn font-cinzel tracking-widest" onClick={handleAction}>
            <span>EXPLORE COLLECTION</span>
            <ArrowRight size={16} strokeWidth={2.4} />
          </button>
        </div>
      </div>
    </section>
  );
};
