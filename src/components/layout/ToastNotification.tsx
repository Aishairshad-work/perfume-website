import React from 'react';
import { Sparkles, X, ShoppingBag } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export const ToastNotification: React.FC = () => {
  const { notificationMessage, clearNotification, lastAddedProduct, setIsCartOpen } = useCart();

  if (!notificationMessage) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-bounce-subtle max-w-sm w-full">
      <div className="bg-espresso-950/95 border border-gold/40 backdrop-blur-xl p-4 text-ivory-100 shadow-[0_20px_40px_rgba(0,0,0,0.7)] flex items-start gap-3">
        {lastAddedProduct ? (
          <div className="w-12 h-12 bg-espresso-900 border border-gold/20 flex-shrink-0 p-1">
            <img
              src={lastAddedProduct.image}
              alt={lastAddedProduct.name}
              className="w-full h-full object-contain filter drop-shadow"
            />
          </div>
        ) : (
          <div className="w-9 h-9 rounded-full bg-gold/15 border border-gold/40 flex items-center justify-center flex-shrink-0 text-gold">
            <Sparkles className="w-4 h-4" />
          </div>
        )}

        <div className="flex-1">
          <div className="flex items-center gap-1.5 text-gold text-[10px] uppercase tracking-widest font-semibold">
            <Sparkles className="w-3 h-3" />
            <span>Maison Notification</span>
          </div>
          <p className="text-xs text-ivory-200 mt-1 font-light leading-snug">
            {notificationMessage}
          </p>
          <button
            onClick={() => {
              clearNotification();
              setIsCartOpen(true);
            }}
            className="mt-2 text-[10px] uppercase tracking-widest text-gold hover:text-gold-light font-semibold flex items-center gap-1 cursor-pointer transition-colors"
          >
            <ShoppingBag className="w-3 h-3" />
            View Luxury Bag &rarr;
          </button>
        </div>

        <button
          onClick={clearNotification}
          className="text-ivory-400 hover:text-gold transition-colors p-1"
          aria-label="Close notification"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
