import React, { useRef, useState, useEffect } from 'react';
import { MapPin, Clock, Phone, ExternalLink, ArrowRight } from 'lucide-react';

export const AtelierLocation: React.FC = () => {
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

  const handleDirections = () => {
    window.open('https://maps.google.com/?q=Lahore+Gulberg+Pakistan', '_blank');
  };

  return (
    <section
      className={`atelier-location-section ${isInView ? 'in-view' : ''}`}
      id="atelier"
      ref={sectionRef}
    >
      <div className="atelier-location-container">
        <div className="atelier-location-grid">
          {/* Left Column: Details & Information */}
          <div className="atelier-info-col">
            <span className="atelier-kicker font-sans">VISIT OUR ATELIER</span>
            <h2 className="atelier-title font-cinzel">
              Lahore, Flagship Haute Boutique
            </h2>

            <div className="atelier-details-list">
              {/* Location */}
              <div className="atelier-detail-item">
                <div className="atelier-icon-circle">
                  <MapPin size={18} strokeWidth={2} />
                </div>
                <div className="atelier-text-block">
                  <h4 className="detail-item-heading font-cinzel">Atelier Location</h4>
                  <p className="detail-item-text font-sans">
                    ELHSAN Flagship Atelier, Luxury Avenue, Gulberg III, Lahore, Pakistan
                  </p>
                </div>
              </div>

              {/* Hours */}
              <div className="atelier-detail-item">
                <div className="atelier-icon-circle">
                  <Clock size={18} strokeWidth={2} />
                </div>
                <div className="atelier-text-block">
                  <h4 className="detail-item-heading font-cinzel">Atelier Hours</h4>
                  <p className="detail-item-text font-sans">
                    Monday to Saturday: 11:00 AM – 10:00 PM <br />
                    Sunday: By Private Concierge Appointment Only
                  </p>
                </div>
              </div>

              {/* Helpline */}
              <div className="atelier-detail-item">
                <div className="atelier-icon-circle">
                  <Phone size={18} strokeWidth={2} />
                </div>
                <div className="atelier-text-block">
                  <h4 className="detail-item-heading font-cinzel">VIP Helpline &amp; Orders</h4>
                  <p className="detail-item-text font-sans">
                    Direct line: +92 300 1234567 • concierge@elhsanparfums.com
                  </p>
                </div>
              </div>
            </div>

            <button
              className="atelier-directions-btn font-cinzel"
              onClick={handleDirections}
            >
              <span>GET DIRECTIONS</span>
              <ArrowRight size={16} strokeWidth={2} />
            </button>
          </div>

          {/* Right Column: Interactive Minimalist Map Visual Card */}
          <div className="atelier-map-col">
            <div className="minimalist-map-card">
              <div className="map-dot-grid" />

              <div className="map-landmark-block">
                <span className="font-cinzel">ELHSAN ATELIER<br />HAUTE PARFUMERIE</span>
              </div>

              {/* Street Overlays */}
              <div className="map-street horizontal-street">
                <span className="text-[9px] tracking-[0.2em] text-[#9c8b77] uppercase font-sans">
                  Luxury Avenue Promenade
                </span>
              </div>

              <div className="map-street vertical-street" />

              {/* Central Map Pin Beacon */}
              <div className="absolute top-[48%] left-[64%] -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center">
                <div className="relative flex items-center justify-center">
                  <span className="absolute w-12 h-12 rounded-full bg-[#c4a162]/30 animate-ping" />
                  <span className="absolute w-8 h-8 rounded-full bg-[#c4a162]/40" />
                  <div className="w-6 h-6 rounded-full bg-[#1a1610] text-[#dfb758] flex items-center justify-center shadow-lg border border-[#dfb758]">
                    <span className="text-[10px]">♦</span>
                  </div>
                </div>
                <div className="mt-2 bg-[#1a1610] text-white px-3 py-1 rounded shadow-md border border-[#c4a162]/50 text-center">
                  <span className="block text-[10px] font-cinzel tracking-wider text-[#dfb758]">ELHSAN ATELIER</span>
                  <span className="block text-[8px] text-[#baa58e] tracking-widest font-sans">LEVEL 1, SUITE A</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
