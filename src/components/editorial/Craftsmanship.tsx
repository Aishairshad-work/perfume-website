import React, { useRef, useState, useEffect } from 'react';

export const Craftsmanship: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isInView, setIsInView] = useState(false);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.18, rootMargin: '0px 0px -60px 0px' }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const vh = window.innerHeight;
      if (rect.top < vh && rect.bottom > 0) {
        const offset = (rect.top + rect.height / 2 - vh / 2) / vh;
        setMouseOffset({ x: offset * -32, y: offset * -3.5 });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section
      className={`scent-elegance-section ${isInView ? 'in-view' : ''}`}
      id="craftsmanship"
      ref={sectionRef}
    >
      <div className="scent-elegance-container">
        {/* Header Block */}
        <div className="scent-elegance-header">
          <span className="scent-kicker font-sans">CRAFTSMANSHIP &amp; PURITY</span>
          <h2 className="scent-elegance-title font-cinzel">
            Scent <span className="title-of-italic font-editorial">of</span> Elegance
          </h2>
          <p className="scent-elegance-subtitle font-sans">
            Every flacon of ELHSAN is a testament to uncompromising haute perfumery, formulated with rare botanical essences and presented with sustainable luxury.
          </p>
        </div>

        {/* 3-Column Scent Anatomy Stage */}
        <div className={`scent-anatomy-stage ${isInView ? 'in-view' : ''}`}>
          {/* Left Features Column */}
          <div className="anatomy-features-col left-features">
            {/* Feature 1 */}
            <div className="anatomy-feature-item left-item item-top point-anim-1">
              <div className="feature-text-block">
                <h4 className="feature-item-heading font-cinzel">14+ Hour Enduring Sillage</h4>
                <p className="feature-item-desc font-sans">
                  High-concentration artisan formulation designed to project magnetic confidence.
                </p>
              </div>
              <div className="feature-connector-line left-line">
                <span className="connector-dot" />
              </div>
            </div>

            {/* Feature 3 */}
            <div className="anatomy-feature-item left-item item-middle point-anim-3">
              <div className="feature-text-block">
                <h4 className="feature-item-heading font-cinzel">Direct Delivery to Your Door</h4>
                <p className="feature-item-desc font-sans">
                  Complimentary luxury gift box, velvet pouch, and insured shipping.
                </p>
              </div>
              <div className="feature-connector-line left-line">
                <span className="connector-dot" />
              </div>
            </div>

            {/* Feature 5 */}
            <div className="anatomy-feature-item left-item item-bottom point-anim-5">
              <div className="feature-text-block">
                <h4 className="feature-item-heading font-cinzel">Eco-Friendly Crafting</h4>
                <p className="feature-item-desc font-sans">
                  Heavyweight architectural glass flacons and recyclable bespoke packaging.
                </p>
              </div>
              <div className="feature-connector-line left-line">
                <span className="connector-dot" />
              </div>
            </div>
          </div>

          {/* Center Flacon Showcase with Glow */}
          <div className="anatomy-center-bottle">
            <div className="bottle-radial-glow" />
            <div
              className="bottle-floating-wrap"
              style={{
                transform: `translate3d(0, ${mouseOffset.y}px, 0)`
              }}
            >
              <img
                src="/assets/hero-1.png"
                alt="ELHSAN Signature No. 1 Flacon"
                className="anatomy-bottle-img"
              />
            </div>
          </div>

          {/* Right Features Column */}
          <div className="anatomy-features-col right-features">
            {/* Feature 2 */}
            <div className="anatomy-feature-item right-item item-top point-anim-2">
              <div className="feature-connector-line right-line">
                <span className="connector-dot" />
              </div>
              <div className="feature-text-block">
                <h4 className="feature-item-heading font-cinzel">Rare Natural Essences</h4>
                <p className="feature-item-desc font-sans">
                  Hand-selected Calabrian bergamot, velvet Grasse orris root, and Baltic amber.
                </p>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="anatomy-feature-item right-item item-middle point-anim-4">
              <div className="feature-connector-line right-line">
                <span className="connector-dot" />
              </div>
              <div className="feature-text-block">
                <h4 className="feature-item-heading font-cinzel">Six-Week Barrel Maturation</h4>
                <p className="feature-item-desc font-sans">
                  Aged in micro-batches to allow delicate botanical resins to meld into perfection.
                </p>
              </div>
            </div>

            {/* Feature 6 */}
            <div className="anatomy-feature-item right-item item-bottom point-anim-6">
              <div className="feature-connector-line right-line">
                <span className="connector-dot" />
              </div>
              <div className="feature-text-block">
                <h4 className="feature-item-heading font-cinzel">Skin-Safe &amp; Pure</h4>
                <p className="feature-item-desc font-sans">
                  Strict IFRA compliance, dermatologist certified, and free of harsh parabens.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
