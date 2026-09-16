import React, { useState, useEffect } from 'react';
import { X, ShoppingBag, Check } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useCurrency } from '../../context/CurrencyContext';

interface ProductDetailModalProps {
  onAddToCartToast?: (product: { name: string; price: string | number; image: string }) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ onAddToCartToast }) => {
  const { quickViewProduct, setQuickViewProduct, addToCart } = useCart();
  const { formatPrice } = useCurrency();
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    if (quickViewProduct) {
      setQuantity(1);
      setIsAdded(false);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && quickViewProduct) {
        setQuickViewProduct(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [quickViewProduct, setQuickViewProduct]);

  if (!quickViewProduct) return null;

  const handleAddToCart = () => {
    addToCart(quickViewProduct, quantity);
    setIsAdded(true);
    if (onAddToCartToast) {
      onAddToCartToast({
        name: quickViewProduct.name,
        price: formatPrice(quickViewProduct.price, quickViewProduct.pricePKR),
        image: quickViewProduct.image
      });
    }
    setTimeout(() => {
      setIsAdded(false);
    }, 1800);
  };

  return (
    <div
      className="fyn-modal-overlay"
      onClick={() => setQuickViewProduct(null)}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="fyn-modal-container"
        onClick={e => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          className="fyn-modal-close-btn"
          onClick={() => setQuickViewProduct(null)}
          aria-label="Close modal"
        >
          <X size={18} />
        </button>

        {/* Modal 2-Column Grid */}
        <div className="fyn-modal-body-grid">
          {/* Visual Column */}
          <div className="fyn-modal-visual-col">
            <div className="fyn-modal-stage">
              <div className="modal-sunlight-aura" />
              <div className="modal-bottle-wrap">
                <img
                  src={quickViewProduct.image}
                  alt={`${quickViewProduct.name} Extrait De Parfum`}
                  className="modal-bottle-img"
                />
              </div>
              <div className="travertine-pedestal-slab" style={{ backgroundColor: '#e0d2bf' }}>
                <div className="slab-top-bevel" />
                <div className="bottle-travertine-shadow" />
              </div>
            </div>
          </div>

          {/* Info Column */}
          <div className="fyn-modal-info-col">
            <span className="modal-kicker font-sans">HAUTE PARFUMERIE</span>
            <div className="modal-title-row">
              <h2 className="modal-product-title font-cinzel">{quickViewProduct.name}</h2>
            </div>
            <span className="modal-subtitle font-sans">
              {quickViewProduct.type} &bull; {quickViewProduct.volume}
            </span>

            <div className="modal-price-tag font-sans font-semibold">
              {formatPrice(quickViewProduct.price, quickViewProduct.pricePKR)}
            </div>

            <p className="modal-desc-text font-sans">
              {quickViewProduct.description}
            </p>

            {/* Olfactory Notes Box */}
            <div className="modal-notes-box">
              <span className="modal-notes-label font-sans">OLFACTORY NOTES:</span>
              <p className="modal-notes-val font-sans">
                {quickViewProduct.category} &bull; {quickViewProduct.accords.join(', ')}
              </p>
            </div>

            {/* Action Row: Stepper + Add Button */}
            <div className="modal-action-row">
              <div className="modal-quantity-stepper">
                <button
                  type="button"
                  className="step-btn"
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  aria-label="Decrease quantity"
                >
                  −
                </button>
                <span className="step-val font-sans font-semibold px-2">{quantity}</span>
                <button
                  type="button"
                  className="step-btn"
                  onClick={() => setQuantity(q => q + 1)}
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>

              <button
                className={`modal-add-to-bag-btn font-cinzel tracking-widest ${isAdded ? 'is-added' : ''}`}
                onClick={handleAddToCart}
              >
                {isAdded ? (
                  <>
                    <Check size={16} />
                    <span>ADDED TO BAG</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag size={16} />
                    <span>ADD TO BAG</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
