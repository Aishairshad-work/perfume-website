import React from 'react';
import { X, Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useCurrency } from '../../context/CurrencyContext';
import { PERFUMES_DATA } from '../../data/perfumesData';

export const WishlistDrawer: React.FC = () => {
  const { wishlist, isWishlistOpen, setIsWishlistOpen, toggleWishlist, addToCart, setQuickViewProduct } = useCart();
  const { formatPrice } = useCurrency();

  if (!isWishlistOpen) return null;

  const wishlistProducts = PERFUMES_DATA.filter((p) => wishlist.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsWishlistOpen(false)}
        className="absolute inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-espresso-950 border-l border-gold/25 text-ivory-100 flex flex-col shadow-2xl relative">
          {/* Header */}
          <div className="px-6 py-5 border-b border-gold/20 flex items-center justify-between bg-espresso-900/60 backdrop-blur-md">
            <div className="flex items-center gap-2.5">
              <Heart className="w-5 h-5 text-gold fill-gold" />
              <div>
                <h3 className="font-serif text-lg tracking-wider text-ivory-50 uppercase">
                  Saved Fragrances
                </h3>
                <span className="text-[10px] uppercase tracking-widest text-gold/80 font-light">
                  {wishlist.length} {wishlist.length === 1 ? 'Creation' : 'Creations'} in Wishlist
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsWishlistOpen(false)}
              className="p-2 text-ivory-400 hover:text-gold hover:bg-white/5 rounded-full transition-colors"
              aria-label="Close Wishlist"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Wishlist Items List */}
          <div className="flex-1 overflow-y-auto px-6 py-6 space-y-5 divide-y divide-white/5">
            {wishlistProducts.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center text-gold">
                  <Heart className="w-8 h-8 opacity-60" />
                </div>
                <h4 className="font-serif text-xl text-ivory-100">Your Wishlist is Empty</h4>
                <p className="text-xs text-ivory-400 max-w-xs font-light leading-relaxed">
                  Curate your personal olfactory desires. Click the heart icon on any flacon to keep it close.
                </p>
                <button
                  onClick={() => {
                    setIsWishlistOpen(false);
                    const el = document.getElementById('products');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="mt-2 px-6 py-3 bg-gold hover:bg-gold-light text-espresso-900 text-xs font-semibold uppercase tracking-widest transition-all"
                >
                  Explore Fragrances
                </button>
              </div>
            ) : (
              wishlistProducts.map((product) => (
                <div key={product.id} className="pt-4 first:pt-0 flex gap-4">
                  {/* Flacon Thumbnail */}
                  <div
                    onClick={() => {
                      setIsWishlistOpen(false);
                      setQuickViewProduct(product);
                    }}
                    className="w-20 h-24 bg-gradient-to-b from-espresso-900 to-espresso-800 border border-gold/20 flex-shrink-0 flex items-center justify-center p-2 relative group cursor-pointer"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-contain filter drop-shadow group-hover:scale-105 transition-transform"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-[9px] uppercase tracking-widest text-gold">
                            {product.category}
                          </p>
                          <h4
                            onClick={() => {
                              setIsWishlistOpen(false);
                              setQuickViewProduct(product);
                            }}
                            className="font-serif text-sm text-ivory-100 font-medium hover:text-gold transition-colors cursor-pointer"
                          >
                            {product.name}
                          </h4>
                          <span className="text-[10px] text-ivory-400">
                            {product.volume} &bull; {product.type}
                          </span>
                        </div>
                        <button
                          onClick={() => toggleWishlist(product.id)}
                          className="text-ivory-500 hover:text-red-400 transition-colors p-1"
                          aria-label="Remove from wishlist"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      <span className="font-serif text-sm font-semibold text-ivory-100">
                        {formatPrice(product.price, product.pricePKR)}
                      </span>

                      <button
                        onClick={() => addToCart(product)}
                        className="px-3 py-1.5 bg-gold hover:bg-gold-light text-espresso-900 text-[10px] uppercase tracking-widest font-semibold flex items-center gap-1 transition-colors"
                      >
                        <ShoppingBag className="w-3 h-3" />
                        Move to Bag
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {wishlistProducts.length > 0 && (
            <div className="p-6 border-t border-gold/20 bg-espresso-900/80 backdrop-blur">
              <button
                onClick={() => {
                  wishlistProducts.forEach((p) => addToCart(p));
                  setIsWishlistOpen(false);
                }}
                className="w-full py-3.5 bg-gold hover:bg-gold-light text-espresso-900 text-xs font-semibold uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_10px_25px_rgba(197,160,89,0.3)] cursor-pointer"
              >
                Add All To Luxury Bag
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
