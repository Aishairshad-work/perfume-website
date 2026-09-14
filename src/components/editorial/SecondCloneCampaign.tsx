import React, { useState, useRef } from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { PERFUMES_DATA } from '../../data/perfumesData';

export const SecondCloneCampaign: React.FC = () => {
  const { setQuickViewProduct } = useCart();
  const imperialProduct = PERFUMES_DATA.find(p => p.id === 'elhsan-imperial-100');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLDivElement | null>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 15;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 15;
    setMousePos({ x, y });
  };

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative bg-gradient-to-b from-[#FAF7F2] via-champagne-light/30 to-ivory-50 overflow-hidden py-20 lg:py-28 min-h-[700px] flex items-center border-t border-ivory-300/80"
    >
      {/* Background ambient lighting */}
      <div
        className="absolute top-1/2 left-1/4 w-[500px] h-[500px] rounded-full bg-gold/15 blur-3xl pointer-events-none transition-transform duration-700 ease-out"
        style={{
          transform: `translate(${mousePos.x * 0.4}px, ${mousePos.y * 0.4}px)`
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left 6 cols: High Fashion Campaign Visual */}
          <div className="lg:col-span-6 flex justify-center relative order-2 lg:order-1">
            <div className="relative">
              {/* Golden circular backdrop frame */}
              <div className="absolute inset-0 m-auto w-80 sm:w-96 h-80 sm:h-96 rounded-full border border-gold/30 bg-radial from-gold/15 to-transparent blur-[1px] pointer-events-none" />

              <img
                src="/assets/clone1.png"
                alt="ELHSAN — Make It Yours Editorial Campaign"
                className="relative z-10 max-h-[500px] sm:max-h-[600px] w-auto object-contain bottle-drop-shadow transition-transform duration-500 hover:scale-105"
                style={{
                  transform: `perspective(1000px) rotateY(${mousePos.x * 0.3}deg) translateY(${mousePos.y * 0.2}px)`
                }}
              />

              {/* Accompanying Floating Flacon badge */}
              <div
                onClick={() => imperialProduct && setQuickViewProduct(imperialProduct)}
                className="absolute bottom-6 right-2 sm:-right-4 bg-white/95 backdrop-blur-md border border-gold/40 p-3.5 shadow-2xl flex items-center gap-3 cursor-pointer hover:border-gold transition-all z-20 group"
              >
                <div className="w-12 h-14 bg-ivory-100 p-1 flex items-center justify-center border border-gold/25 shadow-xs">
                  <img
                    src="/assets/hero-2.png"
                    alt="Imperial Reserve"
                    className="w-full h-full object-contain filter drop-shadow-xs"
                  />
                </div>
                <div>
                  <span className="text-[9px] uppercase tracking-widest text-gold-muted font-semibold">
                    Featured Flacon
                  </span>
                  <p className="font-serif text-sm text-espresso-900 group-hover:text-gold transition-colors font-medium">
                    Imperial Reserve 100ml
                  </p>
                  <span className="text-[10px] text-espresso-500">Inspect Olfactory Profile &rarr;</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right 6 cols: Editorial Storytelling */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left order-1 lg:order-2">
            <div className="inline-flex items-center justify-center lg:justify-start gap-2.5">
              <span className="h-[1px] w-8 bg-gold/60" />
              <span className="text-[11px] uppercase tracking-ultra-wide text-gold-muted font-semibold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-gold" />
                Haute Parfumerie Campaign
              </span>
              <span className="h-[1px] w-8 bg-gold/60 lg:hidden" />
            </div>

            <h2 className="font-serif text-4xl sm:text-6xl xl:text-7xl text-espresso-900 font-light leading-none tracking-tight">
              MAKE IT <br />
              <span className="text-gold-gradient italic font-serif">YOURS.</span>
            </h2>

            <p className="text-base text-espresso-600 font-light leading-relaxed max-w-lg mx-auto lg:mx-0">
              A perfume does not define you — you define it. As the golden accords of crimson saffron
              and aged bourbon vetiver blend with the natural warmth of your pulse points, ELHSAN
              becomes an unrepeatable signature that is entirely your own.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2 max-w-md mx-auto lg:mx-0">
              <div className="border-l-2 border-gold/50 pl-4 text-left">
                <span className="font-serif text-2xl text-espresso-900 font-semibold block">100%</span>
                <span className="text-[11px] text-espresso-500 uppercase tracking-widest font-medium">Natural Absolutes</span>
              </div>
              <div className="border-l-2 border-gold/50 pl-4 text-left">
                <span className="font-serif text-2xl text-espresso-900 font-semibold block">16+ Hours</span>
                <span className="text-[11px] text-espresso-500 uppercase tracking-widest font-medium">Enduring Projection</span>
              </div>
            </div>

            <div className="pt-3 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button
                onClick={() => imperialProduct && setQuickViewProduct(imperialProduct)}
                className="w-full sm:w-auto px-8 py-4 bg-espresso-900 hover:bg-gold text-ivory-50 hover:text-espresso-900 font-semibold text-xs tracking-widest uppercase transition-all duration-300 shadow-[0_10px_25px_rgba(23,18,15,0.12)] flex items-center justify-center gap-2 cursor-pointer"
              >
                Experience Imperial Reserve
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  const el = document.getElementById('products');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full sm:w-auto px-6 py-4 text-espresso-700 hover:text-gold text-xs tracking-widest uppercase transition-colors flex items-center justify-center gap-1 cursor-pointer font-medium"
              >
                View Complete Catalog &rarr;
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
