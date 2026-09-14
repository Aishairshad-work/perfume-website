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
        className="fixed inset-0 bg-espresso-950/60 backdrop-blur-md transition-opacity"
      />

      <div className="relative w-full max-w-5xl bg-white border border-ivory-300 text-espresso-900 shadow-[0_30px_90px_rgba(28,25,23,0.2)] z-10 overflow-hidden my-auto">
        {/* Close Button */}
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-5 right-5 z-20 w-10 h-10 rounded-full bg-ivory-100/90 border border-ivory-300 flex items-center justify-center text-espresso-700 hover:text-gold-dark hover:border-gold transition-colors shadow-sm"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 max-h-[90vh] overflow-y-auto">
          {/* Left 5 Cols: Flacon Presentation & Stage */}
          <div className="lg:col-span-5 bg-gradient-to-b from-ivory-100 via-ivory-50 to-champagne-100/50 p-8 sm:p-12 flex flex-col items-center justify-center relative border-b lg:border-b-0 lg:border-r border-ivory-300 min-h-[420px]">
            {/* Background Aura */}
            <div className="absolute w-64 h-64 rounded-full bg-gold/15 blur-3xl pointer-events-none" />
            <div className="absolute bottom-12 w-48 h-8 rounded-[100%] bg-gold/10 border border-gold/20 blur-sm pointer-events-none" />

            {/* Badges */}
            {quickViewProduct.badge && (
              <div className="absolute top-6 left-6 bg-espresso-950 text-white text-[10px] font-bold tracking-widest px-3 py-1 uppercase shadow-md">
                {quickViewProduct.badge}
              </div>
            )}

            {/* Product Image */}
            <div className="relative z-10 w-full flex items-center justify-center group">
              <img
                src={quickViewProduct.image}
                alt={quickViewProduct.name}
                className="max-h-[380px] w-auto object-contain transition-transform duration-700 group-hover:scale-105 filter drop-shadow-[0_20px_35px_rgba(28,25,23,0.18)]"
              />
            </div>

            {/* Sillage & Longevity Quick Badges */}
            <div className="grid grid-cols-2 gap-3 w-full mt-6 pt-4 border-t border-ivory-300 text-center">
              <div className="bg-white/90 border border-ivory-300 py-2 px-3 shadow-xs">
                <p className="text-[9px] uppercase tracking-widest text-gold-dark flex items-center justify-center gap-1 font-semibold">
                  <Clock className="w-3 h-3" /> Longevity
                </p>
                <p className="text-xs text-espresso-800 mt-0.5 font-medium">{quickViewProduct.longevity}</p>
              </div>
              <div className="bg-white/90 border border-ivory-300 py-2 px-3 shadow-xs">
                <p className="text-[9px] uppercase tracking-widest text-gold-dark flex items-center justify-center gap-1 font-semibold">
                  <Wind className="w-3 h-3" /> Sillage
                </p>
                <p className="text-xs text-espresso-800 mt-0.5 font-medium">{quickViewProduct.sillage}</p>
              </div>
            </div>
          </div>

          {/* Right 7 Cols: Olfactory Pyramid, Specifications & Purchase */}
          <div className="lg:col-span-7 p-6 sm:p-10 space-y-6 flex flex-col justify-between bg-white">
            <div className="space-y-4">
              {/* Category & Rating */}
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-ultra-wide text-gold-dark font-semibold flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  {quickViewProduct.gender} &bull; {quickViewProduct.type}
                </span>

                <div className="flex items-center gap-1">
                  <div className="flex text-gold">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${i < Math.floor(quickViewProduct.rating) ? 'fill-gold' : 'text-ivory-400'}`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-espresso-600 font-medium ml-1">
                    {quickViewProduct.rating} ({quickViewProduct.reviewsCount} reviews)
                  </span>
                </div>
              </div>

              {/* Title & Subtitle */}
              <div>
                <h2 className="font-serif text-3xl sm:text-4xl text-espresso-950 font-medium leading-tight">
                  {quickViewProduct.name}
                </h2>
                <p className="font-serif text-lg text-taupe italic mt-1 font-light">
                  "{quickViewProduct.subtitle}"
                </p>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 pt-1">
                <span className="font-serif text-3xl font-semibold text-espresso-950">
                  {formatPrice(quickViewProduct.price, quickViewProduct.pricePKR)}
                </span>
                {quickViewProduct.originalPrice && quickViewProduct.originalPricePKR && (
                  <span className="text-sm text-taupe-light line-through">
                    {formatPrice(quickViewProduct.originalPrice, quickViewProduct.originalPricePKR)}
                  </span>
                )}
                <span className="text-[10px] uppercase tracking-wider text-gold-dark px-2.5 py-0.5 rounded border border-gold/30 bg-champagne-100/60 font-medium">
                  Complimentary Gift Bag Included
                </span>
              </div>

              {/* Olfactory Pyramid Section */}
              <div className="bg-ivory-50/80 border border-ivory-300 p-4 space-y-3">
                <p className="text-[10px] uppercase tracking-ultra-wide text-gold-dark font-semibold">
                  Olfactory Pyramid
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="border-l-2 border-gold/50 pl-3">
                    <span className="text-[10px] uppercase text-taupe font-semibold block mb-1">
                      Top Notes
                    </span>
                    <p className="text-espresso-800 font-light leading-snug">
                      {quickViewProduct.notes.top.join(' • ')}
                    </p>
                  </div>
                  <div className="border-l-2 border-gold pl-3">
                    <span className="text-[10px] uppercase text-gold-dark font-semibold block mb-1">
                      Heart Notes
                    </span>
                    <p className="text-espresso-800 font-light leading-snug">
                      {quickViewProduct.notes.heart.join(' • ')}
                    </p>
                  </div>
                  <div className="border-l-2 border-espresso-800 pl-3">
                    <span className="text-[10px] uppercase text-taupe font-semibold block mb-1">
                      Base Notes
                    </span>
                    <p className="text-espresso-800 font-light leading-snug">
                      {quickViewProduct.notes.base.join(' • ')}
                    </p>
                  </div>
                </div>

                {/* Accords tags */}
                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-ivory-200">
                  <span className="text-[10px] uppercase tracking-wider text-taupe self-center mr-1">
                    Main Accords:
                  </span>
                  {quickViewProduct.accords.map((acc, i) => (
                    <span
                      key={i}
                      className="text-[10px] px-2.5 py-0.5 bg-white border border-ivory-300 text-espresso-700 rounded-full shadow-2xs"
                    >
                      {acc}
                    </span>
                  ))}
                </div>
              </div>

              {/* Volume Switcher */}
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-espresso-700 font-semibold mb-2">
                  Select Size / Volume
                </label>
                <div className="flex gap-3">
                  {volumeOptions.map((vol) => (
                    <button
                      key={vol}
                      onClick={() => setSelectedVolume(vol)}
                      className={`px-4 py-2 text-xs tracking-wider uppercase border transition-all ${
                        currentVolume === vol
                          ? 'border-espresso-950 bg-espresso-950 text-white font-semibold'
                          : 'border-ivory-300 bg-ivory-50 text-espresso-700 hover:border-gold'
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
                <div className="flex items-center border border-ivory-300 bg-ivory-50 h-12 w-full sm:w-auto px-2">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 text-espresso-600 hover:text-gold-dark text-base font-medium"
                  >
                    -
                  </button>
                  <span className="px-4 text-xs font-semibold text-espresso-950">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 text-espresso-600 hover:text-gold-dark text-base font-medium"
                  >
                    +
                  </button>
                </div>

                {/* Add to Bag */}
                <button
                  onClick={handleAddToCart}
                  className={`flex-1 w-full h-12 text-xs font-semibold uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 shadow-sm ${
                    added
                      ? 'bg-gold text-espresso-950'
                      : 'bg-espresso-950 hover:bg-black text-white hover:shadow-md'
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
                      ? 'border-gold bg-gold/15 text-gold-dark'
                      : 'border-ivory-300 bg-ivory-50 text-espresso-700 hover:border-gold hover:text-gold-dark'
                  }`}
                  aria-label="Wishlist"
                >
                  <Heart className={`w-5 h-5 ${inWishlist ? 'fill-gold-dark text-gold-dark' : ''}`} />
                </button>
              </div>

              {/* Accordion Tabs (Description, Ingredients, Shipping) */}
              <div className="border-t border-ivory-200 pt-4 space-y-2 text-xs">
                {[
                  {
                    id: 'description',
                    title: 'Fragrance Story & Description',
                    content: (
                      <div className="space-y-2">
                        <p className="text-espresso-700 font-light leading-relaxed">
                          {quickViewProduct.description}
                        </p>
                        <p className="text-taupe font-serif italic leading-relaxed">
                          {quickViewProduct.story}
                        </p>
                      </div>
                    )
                  },
                  {
                    id: 'ingredients',
                    title: 'Artisanal Ingredients',
                    content: (
                      <div className="space-y-2 text-espresso-700 font-light leading-relaxed">
                        <p>
                          Cold-pressed botanicals, triple-filtered pure cane alcohol, and sustainably cultivated resinous extracts:
                        </p>
                        <p className="text-xs text-gold-dark font-mono font-medium">
                          {quickViewProduct.ingredients.join(' • ')}
                        </p>
                        <p className="text-[11px] text-taupe">
                          Formulated cruelty-free, paraben-free, and phthalate-free in accordance with IFRA international standards.
                        </p>
                      </div>
                    )
                  },
                  {
                    id: 'shipping',
                    title: 'Shipping & Delivery',
                    content: (
                      <div className="space-y-1.5 text-espresso-700 font-light leading-relaxed">
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
                    <div key={acc.id} className="border-b border-ivory-200 pb-2">
                      <button
                        onClick={() => setActiveAccordion(isOpen ? '' : acc.id)}
                        className="w-full flex items-center justify-between py-2 text-left text-espresso-900 hover:text-gold-dark uppercase tracking-wider text-[11px] font-medium transition-colors"
                      >
                        <span>{acc.title}</span>
                        <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180 text-gold-dark' : 'text-espresso-500'}`} />
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
            <div className="flex items-center gap-2 text-[10px] text-taupe uppercase tracking-widest pt-3 border-t border-ivory-200">
              <ShieldCheck className="w-3.5 h-3.5 text-gold-dark" />
              <span>Original Flacon Guaranteed &bull; 7-Day Privilege Exchange</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
