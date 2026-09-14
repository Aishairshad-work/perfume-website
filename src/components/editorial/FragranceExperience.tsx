import React from 'react';
import { Sparkles, Eye } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { PERFUMES_DATA } from '../../data/perfumesData';

export const FragranceExperience: React.FC = () => {
  const { setQuickViewProduct } = useCart();
  const featuredProduct = PERFUMES_DATA.find(p => p.id === 'elhsan-aseel-crystal') || PERFUMES_DATA[3];

  return (
    <section id="experience" className="relative py-28 lg:py-32 bg-gradient-to-b from-ivory-50 via-[#F7F2EB] to-ivory-100 overflow-hidden border-t border-ivory-300/80">
      {/* Slow floating mist and particles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-radial from-gold/15 via-gold/5 to-transparent blur-3xl pointer-events-none" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Eyebrow */}
        <div className="inline-flex items-center justify-center gap-2.5 mb-5">
          <span className="h-[1px] w-8 bg-gold/60" />
          <span className="text-[11px] uppercase font-semibold tracking-ultra-wide text-gold-muted flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            The Sensory Philosophy
          </span>
          <span className="h-[1px] w-8 bg-gold/60" />
        </div>

        {/* Large Heading */}
        <h2 className="font-serif text-4xl sm:text-6xl xl:text-7xl font-light tracking-tight text-espresso-900 leading-tight max-w-4xl mx-auto">
          MORE THAN A <br />
          <span className="text-gold-gradient italic font-serif">FRAGRANCE.</span>
        </h2>

        {/* Supporting Copy */}
        <p className="font-serif text-xl sm:text-2xl text-espresso-600 italic mt-5 max-w-2xl mx-auto font-light leading-relaxed">
          &ldquo;A signature scent is not simply worn.
          <br />
          It becomes part of the memory.&rdquo;
        </p>

        {/* Large Perfume Visual Presentation */}
        <div className="mt-14 relative max-w-xl mx-auto flex flex-col items-center">
          {/* Subtle pedestal stage */}
          <div className="absolute bottom-6 w-80 sm:w-96 h-12 rounded-[100%] bg-espresso-950/15 blur-lg pointer-events-none" />
          <div className="absolute bottom-10 w-64 sm:w-72 h-7 rounded-[100%] border border-gold/35 bg-white/70 shadow-[0_0_30px_rgba(197,160,89,0.2)] pointer-events-none" />

          {/* Interactive Bottle */}
          <div
            onClick={() => setQuickViewProduct(featuredProduct)}
            className="relative z-10 cursor-pointer group transition-all duration-700 hover:scale-105"
          >
            <img
              src="/assets/product3.png"
              alt="Aseel Precious Extrait flacon"
              className="max-h-[360px] sm:max-h-[440px] w-auto object-contain bottle-drop-shadow"
            />

            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-md border border-gold/40 px-5 py-2.5 shadow-2xl flex items-center gap-2 whitespace-nowrap group-hover:border-gold transition-colors">
              <Eye className="w-3.5 h-3.5 text-gold-muted" />
              <span className="text-[10px] uppercase tracking-widest text-espresso-900 font-semibold">
                {featuredProduct.name} &bull; Inspect Sillage
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
