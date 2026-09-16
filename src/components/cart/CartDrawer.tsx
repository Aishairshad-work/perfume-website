import React from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useCurrency } from '../../context/CurrencyContext';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    subtotalUSD,
    subtotalPKR,
    totalCount,
    setIsCheckoutOpen
  } = useCart();
  const { formatPrice, currency } = useCurrency();

  if (!isCartOpen) return null;

  const freeShippingThresholdUSD = 50;
  const freeShippingThresholdPKR = 2500;
  const currentSubtotal = currency === 'PKR' ? subtotalPKR : subtotalUSD;
  const currentThreshold = currency === 'PKR' ? freeShippingThresholdPKR : freeShippingThresholdUSD;
  const progressPercent = Math.min(100, Math.round((currentSubtotal / currentThreshold) * 100));

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-ivory-50 border-l border-gold/30 text-espresso-900 flex flex-col shadow-2xl relative">
          {/* Header */}
          <div className="px-6 py-5 border-b border-ivory-300 flex items-center justify-between bg-white/80 backdrop-blur-md">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-gold-muted" />
              <div>
                <h3 className="font-serif text-lg tracking-wider text-espresso-900 uppercase">
                  Your Luxury Bag
                </h3>
                <span className="text-[10px] uppercase tracking-widest text-gold-muted font-medium">
                  {totalCount} {totalCount === 1 ? 'Creation' : 'Creations'} Selected
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 text-espresso-500 hover:text-espresso-900 hover:bg-champagne-light/50 rounded-full transition-colors cursor-pointer"
              aria-label="Close Cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Complimentary Shipping Progress */}
          <div className="bg-champagne-light/40 px-6 py-3.5 border-b border-gold/20">
            <div className="flex items-center justify-between text-[11px] mb-1.5">
              <span className="text-espresso-700 font-light flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-gold-muted" />
                {progressPercent >= 100
                  ? 'Complimentary Express Delivery Unlocked!'
                  : `Add ${currency === 'PKR' ? `Rs ${(freeShippingThresholdPKR - currentSubtotal).toLocaleString()}` : `$${(freeShippingThresholdUSD - currentSubtotal).toFixed(0)}`} for Free Delivery`}
              </span>
              <span className="text-gold-muted font-bold">{progressPercent}%</span>
            </div>
            <div className="w-full h-1.5 bg-ivory-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gold transition-all duration-500 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto px-6 py-6 space-y-5 divide-y divide-ivory-200">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full bg-champagne-light/60 border border-gold/30 flex items-center justify-center text-gold-muted shadow-xs">
                  <ShoppingBag className="w-8 h-8 opacity-70" />
                </div>
                <h4 className="font-serif text-xl text-espresso-900">Your bag is empty</h4>
                <p className="text-xs text-espresso-500 max-w-xs font-light leading-relaxed">
                  Experience the pinnacle of haute parfumerie. Discover our signature flacons and concentrated perfume oils.
                </p>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    const el = document.getElementById('collection') || document.getElementById('products');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="mt-2 px-6 py-3 bg-espresso-900 hover:bg-gold text-ivory-50 hover:text-espresso-900 text-xs font-semibold uppercase tracking-widest transition-all cursor-pointer shadow-sm"
                >
                  Discover Fragrances
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div key={`${item.product.id}-${item.selectedVolume}`} className="pt-4 first:pt-0 flex gap-4">
                  {/* Flacon Thumbnail */}
                  <div className="w-20 h-24 bg-[#FAF7F2] border border-ivory-300 flex-shrink-0 flex items-center justify-center p-2 relative group shadow-xs">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-full h-full object-contain filter drop-shadow-xs"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-[9px] uppercase tracking-widest text-gold-muted font-semibold">
                            {item.product.category}
                          </p>
                          <h4 className="font-serif text-sm text-espresso-900 font-medium leading-snug">
                            {item.product.name}
                          </h4>
                          <span className="text-[10px] text-espresso-500">
                            {item.selectedVolume} &bull; {item.product.type}
                          </span>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.product.id, item.selectedVolume)}
                          className="text-espresso-400 hover:text-red-500 transition-colors p-1 cursor-pointer"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      {/* Quantity Controls */}
                      <div className="flex items-center border border-ivory-300 bg-white rounded shadow-xs">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.selectedVolume, item.quantity - 1)}
                          className="px-2 py-1 text-espresso-600 hover:text-gold transition-colors cursor-pointer"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2.5 text-xs text-espresso-900 font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.selectedVolume, item.quantity + 1)}
                          className="px-2 py-1 text-espresso-600 hover:text-gold transition-colors cursor-pointer"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="font-serif text-sm font-semibold text-espresso-900">
                        {formatPrice(
                          item.product.price * item.quantity,
                          item.product.pricePKR * item.quantity
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Summary & Checkout */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-ivory-300 bg-white/95 backdrop-blur-sm space-y-4 shadow-lg">
              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-espresso-600 font-light">
                  <span>Subtotal</span>
                  <span className="text-espresso-900 font-serif text-sm font-semibold">
                    {formatPrice(subtotalUSD, subtotalPKR)}
                  </span>
                </div>
                <div className="flex justify-between text-espresso-600 font-light">
                  <span className="flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-gold-muted" />
                    Artisanal Velvet Packaging
                  </span>
                  <span className="text-gold-muted uppercase tracking-widest text-[10px] font-semibold">Complimentary</span>
                </div>
                <div className="flex justify-between text-espresso-600 font-light">
                  <span>Express Shipping</span>
                  <span className="text-gold-muted uppercase tracking-widest text-[10px] font-semibold">
                    {progressPercent >= 100 ? 'Complimentary' : 'Standard Delivery'}
                  </span>
                </div>
                <div className="h-px bg-ivory-200 my-2" />
                <div className="flex justify-between text-espresso-900 text-base font-serif font-semibold">
                  <span>Estimated Total</span>
                  <span className="text-espresso-900">
                    {formatPrice(subtotalUSD, subtotalPKR)}
                  </span>
                </div>
              </div>

              <button
                onClick={handleProceedToCheckout}
                className="w-full py-4 bg-espresso-900 hover:bg-gold text-ivory-50 hover:text-espresso-900 text-xs font-semibold uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 shadow-md cursor-pointer"
              >
                Proceed To Checkout
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-espresso-500 uppercase tracking-widest pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-gold-muted" />
                <span>100% Guaranteed Authentic Haute Parfumerie</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
