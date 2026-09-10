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
    <section id="collections" className="py-24 bg-ivory-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-xs uppercase tracking-widest text-gold font-semibold mb-3">
            Explore the House
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl text-espresso-900 tracking-tight font-light">
            Shop by Collection
          </h2>
          <div className="h-[1px] w-24 bg-gold/50 mx-auto mt-6" />
        </div>

        {/*
          ── GRID ──────────────────────────────────────────────────────────────
          grid-rows-[1fr] ensures all 4 cards stretch to the same height.
          Each card is a flex-col so image-zone + text-zone stack vertically
          and NEVER overlap.
        */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5 items-stretch">
          {COLLECTIONS_DATA.map((col) => (
            <div
              key={col.id}
              className="group flex flex-col bg-espresso-900 cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-transparent hover:border-gold/40"
              onClick={scrollToProducts}
            >
              {/* ── IMAGE ZONE: fixed height, bottle stays here ── */}
              <div className="relative w-full bg-espresso-900 overflow-hidden flex-shrink-0" style={{ height: '280px' }}>
                {/* Fragrance count badge — top-right inside image zone */}
                <span className="absolute top-4 right-4 z-10 text-[10px] bg-gold/20 backdrop-blur-sm border border-gold/30 text-gold px-2.5 py-1 rounded-full">
                  {col.productCount} Fragrances
                </span>

                {/* Bottle image — contained, padded, never exits this zone */}
                <img
                  src={col.image}
                  alt={col.title}
                  className="w-full h-full object-contain p-8 transition-transform duration-700 group-hover:scale-[1.06] filter drop-shadow-[0_12px_28px_rgba(0,0,0,0.5)]"
                />

                {/* Very subtle bottom fade that bleeds into text zone */}
                <div className="absolute bottom-0 inset-x-0 h-12 bg-gradient-to-t from-espresso-900 to-transparent pointer-events-none" />
              </div>

              {/* ── TEXT ZONE: completely separate, below image ── */}
              <div className="flex flex-col flex-1 px-5 pt-4 pb-5 border-t border-gold/10">
                {/* Eyebrow */}
                <p className="text-[10px] uppercase tracking-widest text-gold font-semibold mb-2">
                  {col.tagline}
                </p>

                {/* Title */}
                <h3 className="font-serif text-[22px] text-ivory-50 font-semibold tracking-wide uppercase leading-tight mb-2">
                  {col.title}
                </h3>

                {/* Description */}
                <p className="text-xs text-ivory-300 font-light leading-relaxed line-clamp-2 mb-0">
                  {col.description}
                </p>

                {/* Spacer — pushes CTA to bottom */}
                <div className="flex-1 min-h-[12px]" />

                {/* CTA — anchored at bottom */}
                <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-gold font-semibold group-hover:gap-3 transition-all duration-300 pt-4 border-t border-gold/10 mt-2">
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
