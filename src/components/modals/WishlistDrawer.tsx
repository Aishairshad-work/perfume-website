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
        className="absolute inset-0 bg-espresso-950/60 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white border-l border-ivory-300 text-espresso-900 flex flex-col shadow-2xl relative">
          {/* Header */}
          <div className="px-6 py-5 border-b border-ivory-200 flex items-center justify-between bg-ivory-50/90 backdrop-blur-md">
            <div className="flex items-center gap-2.5">
              <Heart className="w-5 h-5 text-gold-dark fill-gold-dark" />
              <div>
                <h3 className="font-serif text-lg tracking-wider text-espresso-950 uppercase">
                  Saved Fragrances
                </h3>
                <span className="text-[10px] uppercase tracking-widest text-taupe font-medium">
                  {wishlist.length} {wishlist.length === 1 ? 'Creation' : 'Creations'} in Wishlist
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsWishlistOpen(false)}
              className="p-2 text-espresso-600 hover:text-gold-dark hover:bg-ivory-100 rounded-full transition-colors"
              aria-label="Close Wishlist"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Wishlist Items List */}
          <div className="flex-1 overflow-y-auto px-6 py-6 space-y-5 divide-y divide-ivory-200 bg-white">
            {wishlistProducts.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full bg-champagne-100 border border-gold/30 flex items-center justify-center text-gold-dark">
                  <Heart className="w-8 h-8 opacity-70" />
                </div>
                <h4 className="font-serif text-xl text-espresso-950">Your Wishlist is Empty</h4>
                <p className="text-xs text-taupe max-w-xs font-light leading-relaxed">
                  Curate your personal olfactory desires. Click the heart icon on any flacon to keep it close.
                </p>
                <button
                  onClick={() => {
                    setIsWishlistOpen(false);
                    const el = document.getElementById('products');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="mt-2 px-6 py-3 bg-espresso-950 hover:bg-black text-white text-xs font-semibold uppercase tracking-widest transition-all shadow-sm cursor-pointer"
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
                    className="w-20 h-24 bg-ivory-50 border border-ivory-300 flex-shrink-0 flex items-center justify-center p-2 relative group cursor-pointer shadow-2xs"
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
                          <p className="text-[9px] uppercase tracking-widest text-gold-dark font-semibold">
                            {product.category}
                          </p>
                          <h4
                            onClick={() => {
                              setIsWishlistOpen(false);
                              setQuickViewProduct(product);
                            }}
                            className="font-serif text-sm text-espresso-950 font-medium hover:text-gold-dark transition-colors cursor-pointer"
                          >
                            {product.name}
                          </h4>
                          <span className="text-[10px] text-taupe">
                            {product.volume} &bull; {product.type}
                          </span>
                        </div>
                        <button
                          onClick={() => toggleWishlist(product.id)}
                          className="text-taupe-light hover:text-red-500 transition-colors p-1"
                          aria-label="Remove from wishlist"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      <span className="font-serif text-sm font-semibold text-espresso-950">
                        {formatPrice(product.price, product.pricePKR)}
                      </span>

                      <button
                        onClick={() => addToCart(product)}
                        className="px-3 py-1.5 bg-espresso-950 hover:bg-black text-white text-[10px] uppercase tracking-widest font-semibold flex items-center gap-1 transition-colors cursor-pointer shadow-2xs"
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
            <div className="p-6 border-t border-ivory-200 bg-ivory-50/90 backdrop-blur">
              <button
                onClick={() => {
                  wishlistProducts.forEach((p) => addToCart(p));
                  setIsWishlistOpen(false);
                }}
                className="w-full py-3.5 bg-espresso-950 hover:bg-black text-white text-xs font-semibold uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg cursor-pointer"
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
