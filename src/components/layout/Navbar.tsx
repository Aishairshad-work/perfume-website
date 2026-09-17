import React, { useState, useEffect } from 'react';
import { Search, ShoppingBag, Heart, Menu, X, Globe, User, Phone, Mail } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useCurrency } from '../../context/CurrencyContext';

export const Navbar: React.FC = () => {
  const { totalCount, setIsCartOpen, wishlist, setIsSearchOpen, setIsWishlistOpen } = useCart();
  const { currency, toggleCurrency } = useCurrency();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [accountNotification, setAccountNotification] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -80;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const handleAccountClick = () => {
    setAccountNotification(true);
    setTimeout(() => setAccountNotification(false), 3000);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-500">
      {/* Main Glass Navbar - Reference Style */}
      <nav
        className={`parchment-top-navbar ${isScrolled ? 'is-sticky-scrolled' : ''}`}
      >
        <div className="w-full max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
          <div className="flex items-center justify-between gap-2">
            {/* Mobile: Hamburger Button */}
            <div className="flex items-center lg:hidden flex-shrink-0">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-espresso-800 hover:text-gold transition-colors p-1.5 -ml-1 rounded-full focus:outline-none"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
              </button>
            </div>

            {/* Brand Logo & Lockup */}
            <div
              onClick={() => scrollToSection('hero')}
              className="navbar-logo-solo relative flex items-center cursor-pointer group py-1 flex-shrink-0"
              aria-label="ELHSAN — Home"
            >
              {/* Warm champagne/gold ambient glow behind the logo */}
              <div
                className="absolute left-6 sm:left-8 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 sm:w-24 h-16 sm:h-24 rounded-full pointer-events-none"
                style={{
                  background: 'radial-gradient(circle, rgba(229,201,132,0.50) 0%, rgba(212,175,100,0.18) 50%, transparent 72%)',
                  filter: 'blur(14px)',
                }}
              />

              <div className="relative z-10 flex items-center gap-2 sm:gap-3.5">
                <img
                  src="/assets/logo.png"
                  alt="ELHSAN"
                  className={`h-10 sm:h-14 lg:h-16 w-auto object-contain flex-shrink-0 transition-all duration-300 group-hover:scale-[1.05] ${isScrolled ? 'h-9 sm:h-12' : ''}`}
                />
              </div>
            </div>

            {/* Desktop: CENTER Navigation Links */}
            <div className="navbar-center-menu hidden lg:flex items-center gap-8 xl:gap-11">
              <button
                onClick={() => scrollToSection('hero')}
                className="nav-menu-link"
              >
                HOME
              </button>
              <button
                onClick={() => scrollToSection('collections')}
                className="nav-menu-link"
              >
                COLLECTION
              </button>
              <button
                onClick={() => scrollToSection('brand-story')}
                className="nav-menu-link"
              >
                ABOUT
              </button>
              <button
                onClick={() => scrollToSection('craftsmanship')}
                className="nav-menu-link"
              >
                INGREDIENTS
              </button>
              <button
                onClick={() => scrollToSection('experience')}
                className="nav-menu-link"
              >
                OUR STORY
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="nav-menu-link"
              >
                CONTACT
              </button>
            </div>

            {/* Desktop & Mobile: RIGHT Actions */}
            <div className="navbar-right-utils flex items-center gap-1.5 sm:gap-2.5 lg:gap-3 text-espresso-800 flex-shrink-0">
              {/* Currency Toggle */}
              <button
                onClick={toggleCurrency}
                className="hidden sm:flex items-center gap-1 text-[10px] sm:text-[11px] tracking-widest uppercase px-2 sm:px-3 py-1 sm:py-1.5 rounded-full border border-gold/40 hover:border-gold hover:text-espresso-900 bg-white/80 transition-all duration-300 cursor-pointer shadow-sm"
                title="Switch Currency (PKR / USD)"
              >
                <Globe className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-gold-muted" />
                <span className="font-semibold text-espresso-900">{currency}</span>
              </button>

              {/* Search Trigger */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="hover:text-gold hover:bg-champagne-light/50 transition-colors duration-300 p-1.5 sm:p-2 rounded-full cursor-pointer"
                aria-label="Search Fragrances"
              >
                <Search className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              {/* Wishlist Trigger */}
              <button
                onClick={() => setIsWishlistOpen(true)}
                className="relative hover:text-gold hover:bg-champagne-light/50 transition-colors duration-300 p-1.5 sm:p-2 rounded-full cursor-pointer"
                aria-label="Wishlist"
              >
                <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
                {wishlist.length > 0 && (
                  <span className="absolute top-0.5 right-0.5 sm:top-1 sm:right-1 bg-gold text-espresso-900 text-[8px] sm:text-[9px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center shadow-sm">
                    {wishlist.length}
                  </span>
                )}
              </button>

              {/* Account Icon */}
              <button
                onClick={handleAccountClick}
                className="relative hover:text-gold hover:bg-champagne-light/50 transition-colors duration-300 p-1.5 sm:p-2 rounded-full hidden md:block cursor-pointer"
                aria-label="Client Account"
                title="Maison VIP Account"
              >
                <User className="w-4 h-4 sm:w-5 sm:h-5" />
                {accountNotification && (
                  <span className="absolute -bottom-8 right-0 bg-white border border-gold/40 text-espresso-900 text-[10px] uppercase tracking-wider px-2.5 py-1 whitespace-nowrap shadow-xl">
                    Maison VIP Active
                  </span>
                )}
              </button>

              {/* Shopping Bag Trigger */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative flex items-center gap-1.5 bg-espresso-900 hover:bg-gold text-ivory-50 hover:text-espresso-900 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full transition-all duration-300 shadow-sm cursor-pointer"
                aria-label="Shopping Bag"
              >
                <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span className="text-[11px] sm:text-xs font-semibold tracking-wider">{totalCount}</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Luxury Drawer Overlay / Concierge Mobile Menu */}
      <div
        className={`luxury-drawer-backdrop ${mobileMenuOpen ? 'drawer-open' : ''}`}
        onClick={() => setMobileMenuOpen(false)}
      >
        <aside
          className={`luxury-drawer-panel light-theme menu-drawer ${mobileMenuOpen ? 'panel-visible' : ''}`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="drawer-header-row">
            <div className="drawer-brand-wrap">
              <img
                src="/assets/logo.png"
                alt="ELHSAN"
                className="drawer-logo-img"
              />
              <div className="drawer-header-text">
                <span className="drawer-brand-title font-cinzel">ELHSAN PARFUMS</span>
                <span className="drawer-brand-subtitle">HAUTE PARFUMERIE PRIVÉE</span>
              </div>
            </div>
            <button
              className="drawer-close-btn"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close Navigation Menu"
            >
              <X size={18} />
            </button>
          </div>

          <div className="concierge-content-container">
            {/* Navigation Links Block */}
            <div className="concierge-card-block">
              <span className="concierge-block-heading">NAVIGATION</span>
              <div className="flex flex-col space-y-2 text-xs uppercase tracking-widest font-medium text-espresso-800">
                <button
                  onClick={() => scrollToSection('hero')}
                  className="text-left py-1.5 hover:text-gold transition-colors flex items-center justify-between"
                >
                  <span>HOME</span>
                  <span className="text-[10px] text-espresso-400">01</span>
                </button>
                <button
                  onClick={() => scrollToSection('collections')}
                  className="text-left py-1.5 hover:text-gold transition-colors flex items-center justify-between"
                >
                  <span>COLLECTION</span>
                  <span className="text-[10px] text-espresso-400">02</span>
                </button>
                <button
                  onClick={() => scrollToSection('brand-story')}
                  className="text-left py-1.5 hover:text-gold transition-colors flex items-center justify-between"
                >
                  <span>ABOUT</span>
                  <span className="text-[10px] text-espresso-400">03</span>
                </button>
                <button
                  onClick={() => scrollToSection('craftsmanship')}
                  className="text-left py-1.5 hover:text-gold transition-colors flex items-center justify-between"
                >
                  <span>INGREDIENTS</span>
                  <span className="text-[10px] text-espresso-400">04</span>
                </button>
                <button
                  onClick={() => scrollToSection('experience')}
                  className="text-left py-1.5 hover:text-gold transition-colors flex items-center justify-between"
                >
                  <span>OUR STORY</span>
                  <span className="text-[10px] text-espresso-400">05</span>
                </button>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="text-left py-1.5 hover:text-gold transition-colors flex items-center justify-between"
                >
                  <span>CONTACT</span>
                  <span className="text-[10px] text-espresso-400">06</span>
                </button>
              </div>
            </div>

            {/* Currency Switcher */}
            <div className="concierge-card-block">
              <span className="concierge-block-heading">PREFERENCES</span>
              <div className="flex items-center justify-between text-xs text-espresso-800">
                <span className="font-medium">Currency:</span>
                <button
                  onClick={toggleCurrency}
                  className="flex items-center gap-1.5 px-3 py-1.5 border border-gold/40 text-espresso-900 bg-white rounded-full font-bold shadow-sm hover:border-gold transition-all"
                >
                  <Globe className="w-3.5 h-3.5 text-gold-muted" />
                  <span>{currency}</span>
                  <span className="text-[10px] font-normal text-espresso-500">(Tap to switch)</span>
                </button>
              </div>
            </div>

            {/* Direct Concierge Block */}
            <div className="concierge-card-block">
              <span className="concierge-block-heading">DIRECT CONCIERGE</span>
              <div className="contact-detail-row">
                <div className="detail-icon-box">
                  <Phone size={16} />
                </div>
                <div className="detail-info">
                  <span className="detail-label">VIP Concierge & Orders</span>
                  <a href="tel:+923001234567" className="detail-val-link">+92 300 1234567</a>
                </div>
              </div>
              <div className="contact-detail-row">
                <div className="detail-icon-box">
                  <Mail size={16} />
                </div>
                <div className="detail-info">
                  <span className="detail-label">Private Enquiries</span>
                  <a href="mailto:concierge@elhsanparfums.com" className="detail-val-link">concierge@elhsanparfums.com</a>
                </div>
              </div>
            </div>
          </div>

          <div className="drawer-footer-block mt-4">
            <span className="drawer-tagline font-editorial italic text-center">“Scent That Stays”</span>
            <span className="drawer-copyright text-center">&copy; {new Date().getFullYear()} ELHSAN PARFUMS. ALL RIGHTS RESERVED.</span>
          </div>
        </aside>
      </div>
    </header>
  );
};
