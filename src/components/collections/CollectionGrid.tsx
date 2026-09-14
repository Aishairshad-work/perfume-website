import React from 'react';
import { ArrowRight } from 'lucide-react';
import { COLLECTIONS_DATA } from '../../data/collectionsData';

export const CollectionGrid: React.FC = () => {
  const scrollToProducts = () => {
    const el = document.getElementById('products');
    if (el) {
      const y = el.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <section id="collections" className="py-24 bg-ivory-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="h-[1px] w-6 bg-gold/60" />
            <span className="text-[11px] uppercase tracking-ultra-wide text-gold-muted font-semibold flex items-center gap-1.5">
              Explore the House
            </span>
            <span className="h-[1px] w-6 bg-gold/60" />
          </div>

          <h2 className="font-serif text-4xl sm:text-5xl text-espresso-900 tracking-tight font-light leading-tight">
            Shop by Collection
          </h2>
          <p className="text-sm sm:text-base text-espresso-600 font-light mt-3 leading-relaxed max-w-xl mx-auto">
            From concentrated pulse-point oils to monumental extrait flacons, explore the distinct expressions of ELHSAN.
          </p>
          <div className="h-[1px] w-20 bg-gold/50 mx-auto mt-6" />
        </div>

        {/* ── GRID ── equal height flex cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6 items-stretch">
          {COLLECTIONS_DATA.map((col) => (
            <div
              key={col.id}
              className="group flex flex-col bg-white cursor-pointer shadow-[0_4px_20px_rgba(23,18,15,0.03)] hover:shadow-[0_12px_32px_rgba(197,160,89,0.12)] transition-all duration-500 overflow-hidden border border-ivory-300 hover:border-gold/50 h-full"
              onClick={scrollToProducts}
            >
              {/* ── IMAGE ZONE: fixed height, bottle stays here ── */}
              <div className="relative w-full bg-[#FAF7F2] overflow-hidden flex-shrink-0 flex items-center justify-center border-b border-ivory-200/70" style={{ height: '275px' }}>
                {/* Fragrance count badge — top-right inside image zone */}
                <span className="absolute top-3.5 right-3.5 z-10 text-[10px] bg-white/90 backdrop-blur-xs border border-gold/30 text-espresso-800 px-2.5 py-1 rounded-full shadow-xs font-medium">
                  {col.productCount} Fragrances
                </span>

                {/* Bottle image — contained, padded */}
                <div className="w-full h-full flex items-center justify-center p-7">
                  <img
                    src={col.image}
                    alt={col.title}
                    className="max-h-[190px] w-auto object-contain transition-transform duration-700 group-hover:scale-[1.06] bottle-drop-shadow"
                  />
                </div>
              </div>

              {/* ── TEXT ZONE: completely separate, below image ── */}
              <div className="flex flex-col flex-1 px-5 pt-4 pb-5">
                {/* Eyebrow */}
                <p className="text-[10px] uppercase tracking-widest text-gold-muted font-semibold mb-1.5">
                  {col.tagline}
                </p>

                {/* Title */}
                <h3 className="font-serif text-[20px] text-espresso-900 font-medium tracking-wide uppercase leading-tight mb-2 group-hover:text-gold transition-colors">
                  {col.title}
                </h3>

                {/* Description */}
                <p className="text-xs text-espresso-500 font-light leading-relaxed line-clamp-2 mb-0">
                  {col.description}
                </p>

                {/* Spacer */}
                <div className="flex-1 min-h-[12px]" />

                {/* CTA — anchored at bottom */}
                <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-espresso-900 font-semibold group-hover:text-gold group-hover:gap-2.5 transition-all duration-300 pt-3.5 border-t border-ivory-200 mt-2">
                  {col.linkText}
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
