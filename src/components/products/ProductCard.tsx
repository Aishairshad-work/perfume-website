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
      className="group flex flex-col bg-espresso-900 border border-espresso-800 hover:border-gold/40 transition-all duration-500 cursor-pointer shadow-sm hover:shadow-xl"
    >
      {/* ══════════════════════════════════════════════════════
          IMAGE ZONE — fixed height, bottle is FULLY contained
          inside this zone and NEVER exits into the text area.
         ══════════════════════════════════════════════════════ */}
      <div className="relative bg-espresso-900 overflow-hidden flex-shrink-0" style={{ height: '260px' }}>

        {/* Badge — top-left */}
        {product.badge && (
          <div className="absolute top-3 left-3 z-10 bg-gold text-espresso-900 text-[9px] font-sans font-bold tracking-[0.15em] uppercase px-2.5 py-1">
            {product.badge}
          </div>
        )}

        {/* Wishlist — top-right */}
        <button
          onClick={handleWishlist}
          className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-espresso-800/80 backdrop-blur-sm border border-espresso-700 flex items-center justify-center text-ivory-400 hover:text-gold hover:border-gold/60 transition-all duration-300"
          aria-label="Toggle Wishlist"
        >
          <Heart className={`w-3.5 h-3.5 transition-all ${inWishlist ? 'fill-gold text-gold' : ''}`} />
        </button>

        {/* Bottle image — centred, padded, object-contain keeps it inside */}
        <img
          src={product.image}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-contain p-8 transition-transform duration-700 group-hover:scale-[1.05] filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.6)]"
        />

        {/* Subtle hover overlay */}
        <div className="absolute inset-0 bg-gold/0 group-hover:bg-gold/[0.04] transition-all duration-300" />

        {/* Quick-action bar — slides up from inside image zone only */}
        <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out flex">
          <button
            onClick={(e) => { e.stopPropagation(); setQuickViewProduct(product); }}
            className="flex-1 bg-espresso-800/95 backdrop-blur text-ivory-300 hover:text-gold text-[10px] font-sans uppercase tracking-[0.15em] py-3 flex items-center justify-center gap-1.5 border-r border-espresso-700 transition-colors"
          >
            <Eye className="w-3.5 h-3.5" /> Notes
          </button>
          <button
            onClick={handleAddToCart}
            className={`flex-1 text-[10px] font-sans font-semibold uppercase tracking-[0.15em] py-3 flex items-center justify-center gap-1.5 transition-all duration-300 ${
              added
                ? 'bg-gold/20 text-gold'
                : 'bg-gold hover:bg-gold-dark text-espresso-900'
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
          Uses flex-col so CTA always anchors to the bottom
          regardless of title/description length differences.
         ══════════════════════════════════════════════════════ */}
      <div className="flex flex-col flex-1 px-5 pt-4 pb-5">

        {/* Row 1: Category eyebrow — SAME position on every card */}
        <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-gold leading-none mb-2 flex-shrink-0">
          {product.category}
        </p>

        {/* Row 2: Product title — fixed min-height so 1-line vs 2-line titles don't shift layout */}
        <h3 className="font-serif text-[15px] font-medium text-ivory-100 leading-snug group-hover:text-gold transition-colors flex-shrink-0 line-clamp-2 mb-2" style={{ minHeight: '42px' }}>
          {product.name}
        </h3>

        {/* Row 3: Volume + type */}
        <p className="font-sans text-[10px] text-ivory-400 uppercase tracking-[0.12em] mb-3 flex-shrink-0">
          {product.volume} &bull; {product.type}
        </p>

        {/* Row 4: Star rating */}
        <div className="flex items-center gap-1.5 mb-4 flex-shrink-0">
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3 h-3 ${i < Math.floor(product.rating) ? 'text-gold fill-gold' : 'text-espresso-600'}`}
              />
            ))}
          </div>
          <span className="font-sans text-[11px] text-ivory-500">
            {product.rating.toFixed(1)} ({product.reviewsCount})
          </span>
        </div>

        {/* Flex spacer — pushes price + CTA to same baseline on all cards */}
        <div className="flex-1" />

        {/* Row 5: Price divider + price — always at bottom */}
        <div className="flex items-baseline gap-2 pt-3 border-t border-espresso-700 mb-4 flex-shrink-0">
          <span className="font-serif text-[17px] font-semibold text-ivory-100 leading-none">
            {formatPrice(product.price, product.pricePKR)}
          </span>
          {product.originalPrice && product.originalPricePKR && (
            <span className="font-sans text-[12px] text-ivory-500 line-through font-light">
              {formatPrice(product.originalPrice, product.originalPricePKR)}
            </span>
          )}
          {product.originalPrice && (
            <span className="font-sans text-[9px] bg-gold/10 text-gold px-1.5 py-0.5 font-semibold uppercase tracking-wider border border-gold/20">
              SALE
            </span>
          )}
        </div>

        {/* Row 6: CTA — always at same baseline across all cards */}
        <button
          onClick={handleAddToCart}
          className={`w-full py-2.5 font-sans text-[10px] font-semibold uppercase tracking-[0.2em] flex items-center justify-center gap-1.5 transition-all duration-300 flex-shrink-0 ${
            added
              ? 'bg-gold/20 text-gold border border-gold/40'
              : 'bg-transparent text-ivory-200 hover:bg-gold hover:text-espresso-900 border border-espresso-700 hover:border-gold'
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
