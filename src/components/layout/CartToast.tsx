import React, { useEffect } from 'react';

interface CartToastProps {
  product: {
    name: string;
    price: string | number;
    image: string;
  } | null;
  isVisible: boolean;
  onClose: () => void;
}

export const CartToast: React.FC<CartToastProps> = ({
  product,
  isVisible,
  onClose
}) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3800);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible || !product) return null;

  return (
    <div className="cart-toast-wrapper" role="alert" aria-live="polite">
      <div className="cart-toast-card">
        <div className="cart-toast-thumb-wrap">
          <img
            src={product.image}
            alt={product.name}
            className="cart-toast-thumb"
          />
          <span className="cart-toast-badge-check">✓</span>
        </div>
        <div className="cart-toast-info">
          <span className="cart-toast-status font-sans">ADDED TO YOUR BAG</span>
          <h4 className="cart-toast-title font-cinzel">{product.name}</h4>
          <span className="cart-toast-price font-sans">
            {typeof product.price === 'number' ? `PKR ${product.price.toLocaleString()}` : product.price}
          </span>
        </div>
        <button
          className="cart-toast-close-btn"
          onClick={onClose}
          aria-label="Dismiss notification"
        >
          ✕
        </button>
      </div>
    </div>
  );
};
