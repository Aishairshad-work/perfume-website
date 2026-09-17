import React from 'react';
import { X, Phone, MessageCircle, Mail, MapPin, Clock, Globe, Heart } from 'lucide-react';
import { useCurrency } from '../../context/CurrencyContext';
import { useCart } from '../../context/CartContext';

interface ConciergeDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (sectionId: string) => void;
}

export const ConciergeDrawer: React.FC<ConciergeDrawerProps> = ({
  isOpen,
  onClose,
  onNavigate
}) => {
  const { currency, toggleCurrency } = useCurrency();
  const { wishlist, setIsWishlistOpen } = useCart();
  return (
    <div
      className={`luxury-drawer-backdrop ${isOpen ? 'drawer-open' : ''}`}
      onClick={onClose}
      aria-hidden={!isOpen}
    >
      <aside
        className={`luxury-drawer-panel light-theme menu-drawer ${isOpen ? 'panel-visible' : ''}`}
        onClick={e => e.stopPropagation()}
        role="dialog"
        aria-label="ELHSAN Concierge and Menu"
      >
        {/* Drawer Header */}
        <div className="drawer-header-row">
          <div className="drawer-brand-wrap">
            <img
              src="/assets/logo.png"
              alt="ELHSAN Parfums Logo"
              className="drawer-logo-img"
            />
            <div className="drawer-header-text">
              <span className="drawer-brand-title font-cinzel">ELHSAN PARFUMS</span>
              <span className="drawer-brand-subtitle font-sans">CONCIERGE &amp; ATELIER</span>
            </div>
          </div>
          <button
            className="drawer-close-btn"
            onClick={onClose}
            aria-label="Close Concierge Panel"
          >
            <X size={20} />
          </button>
        </div>

        {/* Drawer Content */}
        <div className="concierge-content-container">
          {/* Quick Navigation Links */}
          <div className="concierge-card-block">
            <span className="concierge-block-heading font-cinzel">HAUTE DIRECTORY</span>
            <div className="flex flex-col gap-2 pt-1">
              {[
                { label: 'Home Experience', id: 'hero' },
                { label: 'Bespoke Collection', id: 'collection' },
                { label: 'The Maison & Atelier', id: 'about' },
                { label: 'Artisanal Craftsmanship', id: 'craftsmanship' },
                { label: 'Curated Moments', id: 'moments' },
                { label: 'Parfum Privée', id: 'experience' },
                { label: 'Atelier Boutique', id: 'atelier' },
                { label: 'Frequently Asked', id: 'faq' }
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className="text-left text-xs uppercase tracking-[0.2em] font-medium text-[#2c251b] hover:text-[#b8860b] py-2 px-3 rounded hover:bg-[#f3efe6] transition-all flex items-center justify-between group"
                >
                  <span>{item.label}</span>
                  <span className="text-[#b8860b] opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                </button>
              ))}
            </div>
          </div>

          {/* Currency & Saved Creations Block */}
          <div className="concierge-card-block">
            <span className="concierge-block-heading font-cinzel">PREFERENCES & CREATIONS</span>
            <div className="flex items-center justify-between gap-3 pt-1">
              <button
                onClick={toggleCurrency}
                className="flex-1 flex items-center justify-between gap-2 px-3 py-2 border border-[#d2c3af]/60 rounded-lg text-xs font-semibold text-[#2c251b] hover:border-[#b8860b] bg-white transition-all shadow-sm"
              >
                <div className="flex items-center gap-1.5">
                  <Globe size={14} className="text-[#b8860b]" />
                  <span>Currency: {currency}</span>
                </div>
                <span className="text-[10px] text-[#8c6200] font-sans">SWITCH</span>
              </button>

              <button
                onClick={() => {
                  onClose();
                  setIsWishlistOpen(true);
                }}
                className="flex items-center gap-2 px-3 py-2 border border-[#d2c3af]/60 rounded-lg text-xs font-semibold text-[#2c251b] hover:border-[#b8860b] bg-white transition-all shadow-sm"
              >
                <Heart size={14} className="text-[#b8860b]" />
                <span>Wishlist ({wishlist.length})</span>
              </button>
            </div>
          </div>

          {/* Direct Concierge Block */}
          <div className="concierge-card-block">
            <span className="concierge-block-heading font-cinzel">DIRECT CONCIERGE</span>

            <div className="contact-detail-row">
              <div className="detail-icon-box">
                <Phone size={17} />
              </div>
              <div className="detail-info">
                <span className="detail-label">VIP Helpline &amp; Orders</span>
                <a href="tel:+923001234567" className="detail-val-link">
                  +92 300 1234567
                </a>
              </div>
            </div>

            <div className="contact-detail-row">
              <div className="detail-icon-box">
                <MessageCircle size={17} />
              </div>
              <div className="detail-info">
                <span className="detail-label">WhatsApp Concierge</span>
                <a
                  href="https://wa.me/923001234567"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="detail-val-link"
                >
                  Chat with Fragrance Expert
                </a>
              </div>
            </div>

            <div className="contact-detail-row">
              <div className="detail-icon-box">
                <Mail size={17} />
              </div>
              <div className="detail-info">
                <span className="detail-label">Private Enquiries</span>
                <a href="mailto:concierge@elhsanparfums.com" className="detail-val-link">
                  concierge@elhsanparfums.com
                </a>
              </div>
            </div>
          </div>

          {/* Boutique Hours & Flagship */}
          <div className="concierge-card-block">
            <span className="concierge-block-heading font-cinzel">FLAGSHIP ATELIER</span>

            <div className="contact-detail-row">
              <div className="detail-icon-box">
                <MapPin size={17} />
              </div>
              <div className="detail-info">
                <span className="detail-label">Atelier Location</span>
                <span className="text-xs text-[#6e6962] leading-relaxed">
                  ELHSAN Flagship Atelier, Luxury Boulevard, Gulberg, Lahore
                </span>
              </div>
            </div>

            <div className="contact-detail-row">
              <div className="detail-icon-box">
                <Clock size={17} />
              </div>
              <div className="detail-info">
                <span className="detail-label">Boutique Hours</span>
                <span className="text-xs text-[#6e6962]">
                  Monday – Saturday: 11:00 AM – 9:30 PM
                </span>
              </div>
            </div>
          </div>

          {/* Scent That Stays Badge */}
          <div className="mt-4 p-4 rounded-lg bg-[#fdfbf7] border border-[#e8dfcf] text-center">
            <p className="text-[10px] tracking-[0.25em] text-[#b8860b] font-cinzel uppercase font-semibold">
              SCENT THAT STAYS.
            </p>
            <p className="text-[11px] text-[#8c857b] font-editorial italic mt-1">
              "The Scent of Confidence"
            </p>
          </div>
        </div>
      </aside>
    </div>
  );
};
