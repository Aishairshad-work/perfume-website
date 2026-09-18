import React, { useRef, useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';

interface RefinedMomentsProps {
  onExploreCollection?: () => void;
}

export const RefinedMoments: React.FC<RefinedMomentsProps> = ({ onExploreCollection }) => {
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

  const handleExplore = () => {
    if (onExploreCollection) {
      onExploreCollection();
    } else {
      const el = document.getElementById('collection');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      className={`refined-moments-section ${isInView ? 'in-view' : ''}`}
      id="moments"
      ref={sectionRef}
    >
      {/* Decorative Wave SVG */}
      <div className="moments-decor-waves">
        <svg viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 20C30 20 40 40 60 40C80 40 90 20 110 20" stroke="#c4a162" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M10 45C30 45 40 65 60 65C80 65 90 45 110 45" stroke="#c4a162" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M10 70C30 70 40 90 60 90C80 90 90 70 110 70" stroke="#c4a162" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M10 95C30 95 40 115 60 115C80 115 90 95 110 95" stroke="#c4a162" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      </div>

      <div className="refined-moments-container">
        {/* Header Block */}
        <div className="refined-moments-header">
          <div className="moments-pill-badge">
            <span className="font-sans">Favorite Fragrances</span>
          </div>
          <h2 className="refined-moments-title font-cinzel">
            Refined Scents <span className="title-highlight font-editorial">for Every Moment</span>
          </h2>
        </div>

        {/* 3-Column Moments Grid */}
        <div className="moments-grid-layout">
          {/* Left Column (2 Cards) */}
          <div className="moments-side-col left-col">
            <div className="moment-card card-fresh" onClick={handleExplore}>
              <img
                src="/assets/moment-topleft.jpg"
                alt="Fresh Daytime Fragrance"
                className="moment-card-bg"
              />
              <div className="moment-card-overlay">
                <p className="moment-card-copy font-sans">
                  A crisp and radiant accord with clean citrus notes, perfect for everyday boardroom authority.
                </p>
                <button className="moment-arrow-btn" aria-label="Explore Daytime Scents">
                  <ArrowRight size={17} />
                </button>
              </div>
            </div>

            <div className="moment-card" onClick={handleExplore}>
              <img
                src="/assets/moment-bottomleft.jpg"
                alt="Pure Concentre Roll-On"
                className="moment-card-bg"
              />
              <div className="moment-card-overlay">
                <p className="moment-card-copy font-sans">
                  Pure pulse-point oil roll-ons for discreet midday rejuvenation and international travel.
                </p>
                <button className="moment-arrow-btn" aria-label="Explore Concentre Oils">
                  <ArrowRight size={17} />
                </button>
              </div>
            </div>
          </div>

          {/* Center Column (1 Tall Hero Card) */}
          <div className="moments-center-col">
            <div className="moment-card card-center-hero" onClick={handleExplore}>
              <img
                src="/assets/moment-center.jpg"
                alt="ELHSAN Signature Masterpiece"
                className="moment-card-bg"
              />
              <div className="moment-card-overlay hero-overlay">
                <p className="moment-card-copy hero-copy font-sans">
                  ELHSAN Signature No. 1 — Our flagship extrait uniting crisp bergamot, velvet iris root, and Baltic amber. The Scent of Confidence.
                </p>
                <button className="moment-arrow-btn hero-arrow-btn" aria-label="Explore Signature Scent">
                  <ArrowRight size={20} />
                </button>
              </div>
            </div>
          </div>

          {/* Right Column (2 Cards) */}
          <div className="moments-side-col right-col">
            <div className="moment-card" onClick={handleExplore}>
              <img
                src="/assets/moment-topright.jpg"
                alt="Evening Opulence"
                className="moment-card-bg"
              />
              <div className="moment-card-overlay">
                <p className="moment-card-copy font-sans">
                  Velvety night plum, aged agarwood, and honeyed saffron curated for black-tie galas.
                </p>
                <button className="moment-arrow-btn" aria-label="Explore Evening Fragrances">
                  <ArrowRight size={17} />
                </button>
              </div>
            </div>

            <div className="moment-card" onClick={handleExplore}>
              <img
                src="/assets/moment-bottomright.jpg"
                alt="Artisanal Heritage"
                className="moment-card-bg"
              />
              <div className="moment-card-overlay">
                <p className="moment-card-copy font-sans">
                  Private reserve batches rested for six weeks in temperature-controlled vats.
                </p>
                <button className="moment-arrow-btn" aria-label="Explore Artisanal Heritage">
                  <ArrowRight size={17} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Center Discover CTA */}
        <div className="moments-center-cta">
          <button
            className="discover-collection-btn font-cinzel tracking-[0.2em]"
            onClick={handleExplore}
          >
            DISCOVER ALL CREATIONS
          </button>
        </div>
      </div>
    </section>
  );
};
