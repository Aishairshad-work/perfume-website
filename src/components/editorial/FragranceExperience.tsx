import React from 'react';
import { Sparkles, Eye } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { PERFUMES_DATA } from '../../data/perfumesData';

export const FragranceExperience: React.FC = () => {
  const { setQuickViewProduct } = useCart();
  const featuredProduct = PERFUMES_DATA.find(p => p.id === 'elhsan-aseel-crystal') || PERFUMES_DATA[3];

  return (
    <section id="experience" className="relative py-32 bg-obsidian overflow-hidden border-t border-gold/20">
      {/* Slow floating mist and particles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-radial from-gold/10 via-gold/3 to-transparent blur-3xl animate-pulse-subtle" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,rgba(10,8,6,0.95)_100%)]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Eyebrow */}
        <div className="inline-flex items-center justify-center gap-2.5 mb-6">
          <span className="h-[1px] w-8 bg-gold/60" />
          <span className="text-[11px] uppercase font-semibold tracking-ultra-wide text-gold flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            The Sensory Philosophy
          </span>
          <span className="h-[1px] w-8 bg-gold/60" />
        </div>

        {/* Large Heading */}
        <h2 className="font-serif text-4xl sm:text-6xl xl:text-7xl font-light tracking-tight text-ivory-50 leading-tight max-w-4xl mx-auto">
          MORE THAN A <br />
          <span className="text-gold-gradient italic font-serif">FRAGRANCE.</span>
        </h2>

        {/* Supporting Copy */}
        <p className="font-cormorant text-xl sm:text-2xl text-ivory-300 italic mt-6 max-w-2xl mx-auto font-light leading-relaxed">
          &ldquo;A signature scent is not simply worn.
          <br />
          It becomes part of the memory.&rdquo;
        </p>

        {/* Large Perfume Visual Presentation */}
        <div className="mt-14 relative max-w-xl mx-auto flex flex-col items-center">
          {/* Subtle pedestal stage */}
          <div className="absolute bottom-6 w-80 sm:w-96 h-20 rounded-[100%] bg-gold/15 blur-2xl pointer-events-none" />
          <div className="absolute bottom-10 w-64 sm:w-72 h-8 rounded-[100%] border border-gold/30 bg-espresso-900/60 pointer-events-none shadow-[0_0_40px_rgba(197,160,89,0.3)]" />

          {/* Interactive Bottle */}
          <div
            onClick={() => setQuickViewProduct(featuredProduct)}
            className="relative z-10 cursor-pointer group transition-all duration-700 hover:scale-105"
          >
            <img
              src="/assets/product3.png"
              alt="Aseel Precious Extrait flacon"
              className="max-h-[380px] sm:max-h-[460px] w-auto object-contain filter drop-shadow-[0_25px_45px_rgba(0,0,0,0.85)]"
            />

            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-espresso-900/90 backdrop-blur-md border border-gold/40 px-5 py-2.5 shadow-2xl flex items-center gap-2 whitespace-nowrap group-hover:border-gold transition-colors">
              <Eye className="w-3.5 h-3.5 text-gold" />
              <span className="text-[10px] uppercase tracking-widest text-ivory-100 font-medium">
                {featuredProduct.name} &bull; Inspect Sillage
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
