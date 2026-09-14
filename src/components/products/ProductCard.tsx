import React, { useState } from 'react';
import { Heart, Eye, ShoppingBag, Star, Check } from 'lucide-react';
import { Product } from '../../types/perfume';
import { useCart } from '../../context/CartContext';
import { useCurrency } from '../../context/CurrencyContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, setQuickViewProduct, toggleWishlist, isInWishlist } = useCart();
  const { formatPrice } = useCurrency();
  const [added, setAdded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  const inWishlist = isInWishlist(product.id);

  return (
    <div
      onClick={() => setQuickViewProduct(product)}
      className="group flex flex-col h-full bg-white border border-ivory-300 hover:border-gold/50 transition-all duration-500 cursor-pointer shadow-[0_4px_20px_rgba(23,18,15,0.03)] hover:shadow-[0_12px_32px_rgba(197,160,89,0.12)] hover:-translate-y-1 relative"
    >
      {/* ══════════════════════════════════════════════════════
          IMAGE ZONE — fixed height, bottle is FULLY contained
          inside this zone and NEVER exits into the text area.
         ══════════════════════════════════════════════════════ */}
      <div className="relative bg-[#FAF7F2] overflow-hidden flex-shrink-0 flex items-center justify-center border-b border-ivory-200/70" style={{ height: '275px' }}>
        {/* Soft centered bottle glow */}
        <div className="absolute w-44 h-44 rounded-full bg-gold/10 blur-xl pointer-events-none" />

        {/* Badge — top-left */}
        {product.badge && (
          <div className="absolute top-3 left-3 z-10 bg-espresso-900 text-gold text-[9px] font-sans font-bold tracking-[0.16em] uppercase px-2.5 py-1 shadow-xs">
            {product.badge}
          </div>
        )}

        {/* Wishlist — top-right */}
        <button
          onClick={handleWishlist}
          className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/90 backdrop-blur-xs border border-ivory-300 flex items-center justify-center text-espresso-600 hover:text-gold hover:border-gold transition-all duration-300 shadow-xs"
          aria-label="Toggle Wishlist"
        >
          <Heart className={`w-3.5 h-3.5 transition-all ${inWishlist ? 'fill-gold text-gold' : ''}`} />
        </button>

        {/* Bottle image — centred, padded, object-contain */}
        <div className="relative z-10 w-full h-full flex items-center justify-center p-6">
          <img
            src={product.image}
            alt={product.name}
            className="max-h-[195px] w-auto object-contain transition-transform duration-700 group-hover:scale-[1.05] bottle-drop-shadow"
          />
        </div>

        {/* Quick-action bar — slides up on hover */}
        <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out flex bg-white/95 backdrop-blur-sm border-t border-ivory-200 z-20">
          <button
            onClick={(e) => { e.stopPropagation(); setQuickViewProduct(product); }}
            className="flex-1 text-espresso-700 hover:text-gold text-[10px] font-sans uppercase tracking-[0.15em] py-2.5 flex items-center justify-center gap-1.5 border-r border-ivory-200 transition-colors"
          >
            <Eye className="w-3.5 h-3.5 text-gold-muted" /> Notes
          </button>
          <button
            onClick={handleAddToCart}
            className={`flex-1 text-[10px] font-sans font-semibold uppercase tracking-[0.15em] py-2.5 flex items-center justify-center gap-1.5 transition-all duration-300 ${
              added
                ? 'bg-gold/25 text-espresso-900'
                : 'bg-gold hover:bg-gold-light text-espresso-900'
            }`}
          >
            {added ? (
              <><Check className="w-3.5 h-3.5" /> Added</>
            ) : (
              <><ShoppingBag className="w-3.5 h-3.5" /> Add to Bag</>
            )}
          </button>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          TEXT ZONE — completely separate section below image.
          Controlled fixed heights ensure pixel-perfect baselines.
         ══════════════════════════════════════════════════════ */}
      <div className="flex flex-col flex-1 px-5 pt-4 pb-5">
        {/* Row 1: Category eyebrow — SAME position on every card */}
        <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-gold-muted leading-none mb-2 flex-shrink-0">
          {product.category}
        </p>

        {/* Row 2: Product title — fixed min-height so 1-line vs 2-line titles don't shift layout */}
        <h3 className="font-serif text-[16px] sm:text-[17px] font-medium text-espresso-900 leading-snug group-hover:text-gold transition-colors flex-shrink-0 line-clamp-2 mb-2" style={{ minHeight: '44px' }}>
          {product.name}
        </h3>

        {/* Row 3: Volume + type */}
        <p className="font-sans text-[10px] text-espresso-500 uppercase tracking-[0.12em] mb-2.5 flex-shrink-0 font-medium">
          {product.volume} &bull; {product.type}
        </p>

        {/* Row 4: Star rating */}
        <div className="flex items-center gap-1.5 mb-3 flex-shrink-0">
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3 h-3 ${i < Math.floor(product.rating) ? 'text-gold fill-gold' : 'text-ivory-400'}`}
              />
            ))}
          </div>
          <span className="font-sans text-[11px] text-espresso-500">
            {product.rating.toFixed(1)} ({product.reviewsCount})
          </span>
        </div>

        {/* Flex spacer — pushes price + CTA to same baseline on all cards */}
        <div className="flex-1 min-h-[8px]" />

        {/* Row 5: Price divider + price — always at bottom baseline */}
        <div className="flex items-baseline gap-2 pt-3 border-t border-ivory-200 mb-3.5 flex-shrink-0">
          <span className="font-serif text-[18px] font-semibold text-espresso-900 leading-none">
            {formatPrice(product.price, product.pricePKR)}
          </span>
          {product.originalPrice && product.originalPricePKR && (
            <span className="font-sans text-[12px] text-espresso-400 line-through font-light">
              {formatPrice(product.originalPrice, product.originalPricePKR)}
            </span>
          )}
          {product.originalPrice && (
            <span className="font-sans text-[9px] bg-gold/15 text-gold-dark px-1.5 py-0.5 font-bold uppercase tracking-wider border border-gold/30">
              SALE
            </span>
          )}
        </div>

        {/* Row 6: CTA — always at same baseline across all cards */}
        <button
          onClick={handleAddToCart}
          className={`w-full py-2.5 font-sans text-[10px] font-semibold uppercase tracking-[0.2em] flex items-center justify-center gap-1.5 transition-all duration-300 flex-shrink-0 cursor-pointer ${
            added
              ? 'bg-gold/25 text-espresso-900 border border-gold/50'
              : 'bg-transparent text-espresso-900 hover:bg-espresso-900 hover:text-ivory-50 border border-espresso-900'
          }`}
        >
          {added ? (
            <><Check className="w-3 h-3" /> Added to Bag</>
          ) : (
            <><ShoppingBag className="w-3 h-3" /> Add to Bag</>
          )}
        </button>
      </div>
    </div>
  );
};
