import React, { useState, useMemo } from 'react';
import { X, Search, Sparkles, ArrowRight } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useCurrency } from '../../context/CurrencyContext';
import { PERFUMES_DATA } from '../../data/perfumesData';

export const SearchModal: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, setQuickViewProduct } = useCart();
  const { formatPrice } = useCurrency();
  const [query, setQuery] = useState('');

  const quickTags = ['Oud', 'Bergamot', 'Rose', 'Amber', 'Roll-On', 'Marine', 'Signature', 'Reserve'];

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return PERFUMES_DATA.slice(0, 4);

    return PERFUMES_DATA.filter((p) => {
      const matchName = p.name.toLowerCase().includes(q);
      const matchCategory = p.category.toLowerCase().includes(q);
      const matchSubtitle = p.subtitle.toLowerCase().includes(q);
      const matchAccords = p.accords.some(a => a.toLowerCase().includes(q));
      const matchNotes = [
        ...p.notes.top,
        ...p.notes.heart,
        ...p.notes.base
      ].some(n => n.toLowerCase().includes(q));

      return matchName || matchCategory || matchSubtitle || matchAccords || matchNotes;
    });
  }, [query]);

  if (!isSearchOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-start justify-center pt-20 px-4 sm:px-6">
      {/* Backdrop */}
      <div
        onClick={() => setIsSearchOpen(false)}
        className="fixed inset-0 bg-espresso-950/60 backdrop-blur-md transition-opacity"
      />

      <div className="relative w-full max-w-3xl bg-white border border-ivory-300 text-espresso-900 shadow-[0_25px_70px_rgba(28,25,23,0.25)] z-10 overflow-hidden">
        {/* Header & Input */}
        <div className="p-6 border-b border-ivory-200 flex items-center gap-4 bg-white">
          <Search className="w-6 h-6 text-gold-dark flex-shrink-0" />
          <input
            type="text"
            autoFocus
            placeholder="Search fragrances, accords (Oud, Rose, Bergamot)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-lg sm:text-xl font-light text-espresso-950 placeholder:text-taupe-light focus:outline-none font-serif"
          />
          <button
            onClick={() => setIsSearchOpen(false)}
            className="p-1.5 text-espresso-600 hover:text-gold-dark rounded-full hover:bg-ivory-100 transition-colors flex-shrink-0"
            aria-label="Close search"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Suggestion Pills */}
        <div className="px-6 py-3 bg-ivory-50 border-b border-ivory-200 flex flex-wrap items-center gap-2 text-xs">
          <span className="text-[10px] uppercase tracking-widest text-gold-dark font-semibold mr-1 flex items-center gap-1">
            <Sparkles className="w-3 h-3" /> Popular:
          </span>
          {quickTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setQuery(tag)}
              className="px-3 py-1 bg-white hover:bg-espresso-950 hover:text-white border border-ivory-300 text-espresso-800 rounded-full text-[11px] transition-colors shadow-2xs"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="p-6 max-h-[60vh] overflow-y-auto space-y-4 bg-white">
          <div className="flex justify-between items-center text-xs text-taupe mb-2">
            <span className="uppercase tracking-widest text-[10px] font-medium">
              {query ? `Search Results (${results.length})` : 'Curated Fragrance Showcase'}
            </span>
          </div>

          {results.length === 0 ? (
            <div className="text-center py-12 space-y-2">
              <p className="font-serif text-lg text-espresso-900">No fragrance matches found</p>
              <p className="text-xs text-taupe font-light">
                Try searching for 'Oud', 'Amber', 'Signature', or browse our full collection.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {results.map((product) => (
                <div
                  key={product.id}
                  onClick={() => {
                    setIsSearchOpen(false);
                    setQuickViewProduct(product);
                  }}
                  className="group p-3.5 bg-ivory-50/70 hover:bg-white border border-ivory-200 hover:border-gold/50 flex items-center gap-4 transition-all duration-300 cursor-pointer shadow-2xs hover:shadow-xs"
                >
                  <div className="w-16 h-20 bg-white border border-ivory-300 p-1 flex-shrink-0 flex items-center justify-center">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-contain filter drop-shadow group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[9px] uppercase tracking-widest text-gold-dark font-semibold">
                      {product.type}
                    </span>
                    <h4 className="font-serif text-sm text-espresso-950 font-semibold truncate group-hover:text-gold-dark transition-colors">
                      {product.name}
                    </h4>
                    <p className="text-[11px] text-taupe truncate mt-0.5 font-light">
                      {product.category}
                    </p>
                    <div className="flex items-center justify-between mt-2 pt-1.5 border-t border-ivory-200">
                      <span className="font-serif text-xs font-semibold text-espresso-900">
                        {formatPrice(product.price, product.pricePKR)}
                      </span>
                      <span className="text-[10px] text-gold-dark font-medium flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform">
                        Inspect Notes <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
