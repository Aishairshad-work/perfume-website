import React, { useState } from 'react';
import { X, Star, Heart, ShoppingBag, Check, ChevronDown, Sparkles, ShieldCheck, Clock, Wind } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useCurrency } from '../../context/CurrencyContext';

export const ProductDetailModal: React.FC = () => {
  const { quickViewProduct, setQuickViewProduct, addToCart, toggleWishlist, isInWishlist } = useCart();
  const { formatPrice } = useCurrency();

  const [quantity, setQuantity] = useState(1);
  const [selectedVolume, setSelectedVolume] = useState<string>('');
  const [added, setAdded] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState<string>('description');

  if (!quickViewProduct) return null;

  const currentVolume = selectedVolume || quickViewProduct.volume;
  const inWishlist = isInWishlist(quickViewProduct.id);

  const handleAddToCart = () => {
    addToCart(quickViewProduct, quantity, currentVolume);
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  };

  const volumeOptions = quickViewProduct.type === 'Concentré Roll-On'
    ? ['12ml Roll-On', '30ml Luxury Flacon']
    : ['50ml Extrait', '100ml Monumental Flacon'];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6 lg:p-10">
      {/* Backdrop */}
      <div
        onClick={() => setQuickViewProduct(null)}
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
      />

      <div className="relative w-full max-w-5xl bg-espresso-950 border border-gold/40 text-ivory-100 shadow-[0_30px_90px_rgba(0,0,0,0.9)] z-10 overflow-hidden my-auto">
        {/* Close Button */}
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-5 right-5 z-20 w-10 h-10 rounded-full bg-espresso-900/80 border border-gold/30 flex items-center justify-center text-ivory-300 hover:text-gold hover:border-gold transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 max-h-[90vh] overflow-y-auto">
          {/* Left 5 Cols: Flacon Presentation & Stage */}
          <div className="lg:col-span-5 bg-gradient-to-b from-espresso-900 via-espresso-950 to-obsidian p-8 sm:p-12 flex flex-col items-center justify-center relative border-b lg:border-b-0 lg:border-r border-gold/20 min-h-[420px]">
            {/* Background Aura */}
            <div className="absolute w-64 h-64 rounded-full bg-gold/15 blur-3xl pointer-events-none" />
            <div className="absolute bottom-12 w-48 h-8 rounded-[100%] bg-espresso-950 border border-gold/25 blur-sm pointer-events-none" />

            {/* Badges */}
            {quickViewProduct.badge && (
              <div className="absolute top-6 left-6 bg-gold text-espresso-900 text-[10px] font-bold tracking-widest px-3 py-1 uppercase shadow-md">
                {quickViewProduct.badge}
              </div>
            )}

            {/* Product Image */}
            <div className="relative z-10 w-full flex items-center justify-center group">
              <img
                src={quickViewProduct.image}
                alt={quickViewProduct.name}
                className="max-h-[380px] w-auto object-contain transition-transform duration-700 group-hover:scale-105 filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.8)]"
              />
            </div>

            {/* Sillage & Longevity Quick Badges */}
            <div className="grid grid-cols-2 gap-3 w-full mt-6 pt-4 border-t border-white/10 text-center">
              <div className="bg-espresso-800/40 border border-gold/20 py-2 px-3">
                <p className="text-[9px] uppercase tracking-widest text-gold flex items-center justify-center gap-1">
                  <Clock className="w-3 h-3" /> Longevity
                </p>
                <p className="text-xs text-ivory-200 mt-0.5 font-medium">{quickViewProduct.longevity}</p>
              </div>
              <div className="bg-espresso-800/40 border border-gold/20 py-2 px-3">
                <p className="text-[9px] uppercase tracking-widest text-gold flex items-center justify-center gap-1">
                  <Wind className="w-3 h-3" /> Sillage
                </p>
                <p className="text-xs text-ivory-200 mt-0.5 font-medium">{quickViewProduct.sillage}</p>
              </div>
            </div>
          </div>

          {/* Right 7 Cols: Olfactory Pyramid, Specifications & Purchase */}
          <div className="lg:col-span-7 p-6 sm:p-10 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              {/* Category & Rating */}
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-ultra-wide text-gold font-semibold flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  {quickViewProduct.gender} &bull; {quickViewProduct.type}
                </span>

                <div className="flex items-center gap-1">
                  <div className="flex text-gold">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${i < Math.floor(quickViewProduct.rating) ? 'fill-gold' : 'text-ivory-500'}`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-ivory-300 font-medium ml-1">
                    {quickViewProduct.rating} ({quickViewProduct.reviewsCount} reviews)
                  </span>
                </div>
              </div>

              {/* Title & Subtitle */}
              <div>
                <h2 className="font-serif text-3xl sm:text-4xl text-ivory-50 font-medium leading-tight">
                  {quickViewProduct.name}
                </h2>
                <p className="font-cormorant text-lg text-ivory-300 italic mt-1 font-light">
                  "{quickViewProduct.subtitle}"
                </p>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 pt-1">
                <span className="font-serif text-3xl font-semibold text-ivory-50">
                  {formatPrice(quickViewProduct.price, quickViewProduct.pricePKR)}
                </span>
                {quickViewProduct.originalPrice && quickViewProduct.originalPricePKR && (
                  <span className="text-sm text-ivory-400 line-through">
                    {formatPrice(quickViewProduct.originalPrice, quickViewProduct.originalPricePKR)}
                  </span>
                )}
                <span className="text-[10px] uppercase tracking-wider text-gold px-2 py-0.5 rounded border border-gold/30 bg-gold/10">
                  Complimentary Gift Bag Included
                </span>
              </div>

              {/* Olfactory Pyramid Section */}
              <div className="bg-espresso-900/60 border border-gold/25 p-4 space-y-3">
                <p className="text-[10px] uppercase tracking-ultra-wide text-gold font-semibold">
                  Olfactory Pyramid
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="border-l-2 border-gold/40 pl-3">
                    <span className="text-[10px] uppercase text-ivory-400 font-semibold block mb-1">
                      Top Notes
                    </span>
                    <p className="text-ivory-200 font-light leading-snug">
                      {quickViewProduct.notes.top.join(' • ')}
                    </p>
                  </div>
                  <div className="border-l-2 border-gold/60 pl-3">
                    <span className="text-[10px] uppercase text-gold font-semibold block mb-1">
                      Heart Notes
                    </span>
                    <p className="text-ivory-200 font-light leading-snug">
                      {quickViewProduct.notes.heart.join(' • ')}
                    </p>
                  </div>
                  <div className="border-l-2 border-gold pl-3">
                    <span className="text-[10px] uppercase text-ivory-400 font-semibold block mb-1">
                      Base Notes
                    </span>
                    <p className="text-ivory-200 font-light leading-snug">
                      {quickViewProduct.notes.base.join(' • ')}
                    </p>
                  </div>
                </div>

                {/* Accords tags */}
                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-white/5">
                  <span className="text-[10px] uppercase tracking-wider text-ivory-400 self-center mr-1">
                    Main Accords:
                  </span>
                  {quickViewProduct.accords.map((acc, i) => (
                    <span
                      key={i}
                      className="text-[10px] px-2.5 py-0.5 bg-espresso-800 border border-gold/20 text-ivory-300 rounded-full"
                    >
                      {acc}
                    </span>
                  ))}
                </div>
              </div>

              {/* Volume Switcher */}
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-ivory-300 font-semibold mb-2">
                  Select Size / Volume
                </label>
                <div className="flex gap-3">
                  {volumeOptions.map((vol) => (
                    <button
                      key={vol}
                      onClick={() => setSelectedVolume(vol)}
                      className={`px-4 py-2 text-xs tracking-wider uppercase border transition-all ${
                        currentVolume === vol
                          ? 'border-gold bg-gold/20 text-gold font-semibold'
                          : 'border-gold/20 bg-espresso-900/50 text-ivory-400 hover:border-gold/40'
                      }`}
                    >
                      {vol}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity & CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                {/* Quantity */}
                <div className="flex items-center border border-gold/40 bg-espresso-900 h-12 w-full sm:w-auto px-2">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 text-ivory-400 hover:text-gold text-base"
                  >
                    -
                  </button>
                  <span className="px-4 text-xs font-semibold text-ivory-100">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 text-ivory-400 hover:text-gold text-base"
                  >
                    +
                  </button>
                </div>

                {/* Add to Bag */}
                <button
                  onClick={handleAddToCart}
                  className={`flex-1 w-full h-12 text-xs font-semibold uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_10px_25px_rgba(197,160,89,0.25)] ${
                    added
                      ? 'bg-ivory-100 text-espresso-950'
                      : 'bg-gold hover:bg-gold-light text-espresso-900'
                  }`}
                >
                  {added ? (
                    <>
                      <Check className="w-4 h-4" />
                      Added To Bag
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      Add To Luxury Bag
                    </>
                  )}
                </button>

                {/* Wishlist */}
                <button
                  onClick={() => toggleWishlist(quickViewProduct.id)}
                  className={`h-12 w-12 border flex items-center justify-center transition-colors ${
                    inWishlist
                      ? 'border-gold bg-gold/20 text-gold'
                      : 'border-gold/30 text-ivory-300 hover:border-gold hover:text-gold'
                  }`}
                  aria-label="Wishlist"
                >
                  <Heart className={`w-5 h-5 ${inWishlist ? 'fill-gold' : ''}`} />
                </button>
              </div>

              {/* Accordion Tabs (Description, Ingredients, Shipping) */}
              <div className="border-t border-gold/20 pt-4 space-y-2 text-xs">
                {[
                  {
                    id: 'description',
                    title: 'Fragrance Story & Description',
                    content: (
                      <div className="space-y-2">
                        <p className="text-ivory-300 font-light leading-relaxed">
                          {quickViewProduct.description}
                        </p>
                        <p className="text-ivory-400 font-light italic leading-relaxed">
                          {quickViewProduct.story}
                        </p>
                      </div>
                    )
                  },
                  {
                    id: 'ingredients',
                    title: 'Artisanal Ingredients',
                    content: (
                      <div className="space-y-2 text-ivory-300 font-light leading-relaxed">
                        <p>
                          Cold-pressed botanicals, triple-filtered pure cane alcohol, and sustainably cultivated resinous extracts:
                        </p>
                        <p className="text-xs text-gold/80 font-mono">
                          {quickViewProduct.ingredients.join(' • ')}
                        </p>
                        <p className="text-[11px] text-ivory-400">
                          Formulated cruelty-free, paraben-free, and phthalate-free in accordance with IFRA international standards.
                        </p>
                      </div>
                    )
                  },
                  {
                    id: 'shipping',
                    title: 'Shipping & Delivery',
                    content: (
                      <div className="space-y-1.5 text-ivory-300 font-light leading-relaxed">
                        <p>
                          • Dispatched within 24 hours in our signature shockproof presentation box.
                        </p>
                        <p>
                          • Free insured express courier throughout Pakistan and international hubs.
                        </p>
                        <p>
                          • Cash on Delivery (COD) available with no extra surcharge.
                        </p>
                      </div>
                    )
                  }
                ].map((acc) => {
                  const isOpen = activeAccordion === acc.id;
                  return (
                    <div key={acc.id} className="border-b border-white/5 pb-2">
                      <button
                        onClick={() => setActiveAccordion(isOpen ? '' : acc.id)}
                        className="w-full flex items-center justify-between py-2 text-left text-ivory-200 hover:text-gold uppercase tracking-wider text-[11px] font-medium transition-colors"
                      >
                        <span>{acc.title}</span>
                        <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180 text-gold' : ''}`} />
                      </button>
                      {isOpen && (
                        <div className="pt-2 pb-3 pr-2 animate-fadeIn">
                          {acc.content}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Authenticity Guarantee */}
            <div className="flex items-center gap-2 text-[10px] text-ivory-400 uppercase tracking-widest pt-3 border-t border-white/5">
              <ShieldCheck className="w-3.5 h-3.5 text-gold" />
              <span>Original Flacon Guaranteed &bull; 7-Day Privilege Exchange</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
