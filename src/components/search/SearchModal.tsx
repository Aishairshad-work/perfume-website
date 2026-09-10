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
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
      />

      <div className="relative w-full max-w-3xl bg-espresso-950 border border-gold/40 text-ivory-100 shadow-[0_25px_70px_rgba(0,0,0,0.9)] z-10 overflow-hidden">
        {/* Header & Input */}
        <div className="p-6 border-b border-gold/20 flex items-center gap-4">
          <Search className="w-6 h-6 text-gold flex-shrink-0" />
          <input
            type="text"
            autoFocus
            placeholder="Search fragrances, accords (Oud, Rose, Bergamot)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-lg sm:text-xl font-light text-ivory-100 placeholder:text-ivory-500 focus:outline-none"
          />
          <button
            onClick={() => setIsSearchOpen(false)}
            className="p-1.5 text-ivory-400 hover:text-gold rounded-full transition-colors flex-shrink-0"
            aria-label="Close search"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Suggestion Pills */}
        <div className="px-6 py-3 bg-espresso-900/60 border-b border-white/5 flex flex-wrap items-center gap-2 text-xs">
          <span className="text-[10px] uppercase tracking-widest text-gold font-medium mr-1 flex items-center gap-1">
            <Sparkles className="w-3 h-3" /> Popular:
          </span>
          {quickTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setQuery(tag)}
              className="px-2.5 py-1 bg-espresso-800/80 hover:bg-gold hover:text-espresso-900 border border-gold/20 text-ivory-300 rounded text-[11px] transition-colors"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="p-6 max-h-[60vh] overflow-y-auto space-y-4">
          <div className="flex justify-between items-center text-xs text-ivory-400 mb-2">
            <span className="uppercase tracking-widest text-[10px]">
              {query ? `Search Results (${results.length})` : 'Curated Fragrance Showcase'}
            </span>
          </div>

          {results.length === 0 ? (
            <div className="text-center py-12 space-y-2">
              <p className="font-serif text-lg text-ivory-200">No fragrance matches found</p>
              <p className="text-xs text-ivory-400 font-light">
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
                  className="group p-3 bg-espresso-900/40 hover:bg-espresso-900/80 border border-gold/20 hover:border-gold/50 flex items-center gap-4 transition-all duration-300 cursor-pointer"
                >
                  <div className="w-16 h-20 bg-espresso-800 border border-gold/20 p-1 flex-shrink-0 flex items-center justify-center">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-contain filter drop-shadow group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[9px] uppercase tracking-widest text-gold font-medium">
                      {product.type}
                    </span>
                    <h4 className="font-serif text-sm text-ivory-100 font-semibold truncate group-hover:text-gold transition-colors">
                      {product.name}
                    </h4>
                    <p className="text-[11px] text-ivory-400 truncate mt-0.5 font-light">
                      {product.category}
                    </p>
                    <div className="flex items-center justify-between mt-2 pt-1 border-t border-white/5">
                      <span className="font-serif text-xs font-semibold text-ivory-200">
                        {formatPrice(product.price, product.pricePKR)}
                      </span>
                      <span className="text-[10px] text-gold flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform">
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
