import React, { useState, useEffect } from 'react';
import { Search, ShoppingBag, Heart, Menu, X, Globe, Sparkles, User } from 'lucide-react';
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
      {/* Top Announcement Bar - Light Luxury Champagne */}
      <div className="bg-[#F6EFE6] text-espresso-800 border-b border-gold/25 text-[11px] tracking-widest-luxury uppercase py-2 px-4 text-center overflow-hidden relative">
        <div className="flex items-center justify-center gap-2">
          <Sparkles className="w-3 h-3 text-gold-muted animate-pulse" />
          <span className="font-medium">
            Artisanal Gift Box &amp; Velvet Pouch With Every Creation &bull; Complimentary Insured Delivery
          </span>
          <Sparkles className="w-3 h-3 text-gold-muted animate-pulse" />
        </div>
      </div>

      {/* Main Glass Navbar - Light Luxury Ivory */}
      <nav
        className={`transition-all duration-500 ${
          isScrolled
            ? 'bg-ivory-50/95 backdrop-blur-xl border-b border-ivory-300/80 py-3 shadow-[0_4px_25px_rgba(23,18,15,0.04)]'
            : 'bg-ivory-50/80 backdrop-blur-md border-b border-gold/15 py-3.5 sm:py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Mobile: Hamburger Button */}
            <div className="flex items-center lg:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-espresso-800 hover:text-gold transition-colors p-2 -ml-2"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

            {/* Brand Logo & Lockup - Restored and Perfectly Aligned */}
            <div
              onClick={() => scrollToSection('hero')}
              className="relative flex items-center cursor-pointer group py-1"
              aria-label="ELHSAN — Home"
            >
              {/* Subtle centered warm champagne/gold ambient glow behind the logo ONLY */}
              <div
                className="absolute left-7 sm:left-8 top-1/2 -translate-x-1/2 -translate-y-1/2 w-20 sm:w-24 h-20 sm:h-24 rounded-full pointer-events-none"
                style={{
                  background: 'radial-gradient(circle, rgba(229,201,132,0.50) 0%, rgba(212,175,100,0.18) 50%, transparent 72%)',
                  filter: 'blur(14px)',
                }}
              />

              <div className="relative z-10 flex items-center gap-3 sm:gap-3.5">
                <img
                  src="/assets/logo.png"
                  alt="ELHSAN"
                  className="h-12 sm:h-14 lg:h-16 w-auto object-contain flex-shrink-0 transition-transform duration-500 group-hover:scale-[1.03]"
                />

                <div className="flex flex-col justify-center leading-none">
                  <span className="font-serif text-lg sm:text-xl lg:text-2xl tracking-[0.24em] font-medium text-espresso-900 group-hover:text-gold transition-colors duration-300 uppercase leading-none">
                    ELHSAN
                  </span>
                  <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.38em] text-gold-muted font-medium mt-1 leading-none">
                    HAUTE PARFUMERIE
                  </span>
                </div>
              </div>
            </div>

            {/* Desktop: CENTER Navigation Links */}
            <div className="hidden xl:flex items-center space-x-8 text-xs font-medium tracking-[0.2em] uppercase text-espresso-800">
              <button
                onClick={() => scrollToSection('hero')}
                className="hover:text-gold transition-colors duration-300 cursor-pointer py-1"
              >
                HOME
              </button>
              <button
                onClick={() => scrollToSection('collections')}
                className="hover:text-gold transition-colors duration-300 cursor-pointer py-1"
              >
                COLLECTION
              </button>
              <button
                onClick={() => scrollToSection('brand-story')}
                className="hover:text-gold transition-colors duration-300 cursor-pointer py-1"
              >
                ABOUT
              </button>
              <button
                onClick={() => scrollToSection('craftsmanship')}
                className="hover:text-gold transition-colors duration-300 cursor-pointer py-1"
              >
                INGREDIENTS
              </button>
              <button
                onClick={() => scrollToSection('experience')}
                className="hover:text-gold transition-colors duration-300 cursor-pointer py-1"
              >
                OUR STORY
              </button>
              <button
                onClick={() => scrollToSection('footer')}
                className="hover:text-gold transition-colors duration-300 cursor-pointer py-1"
              >
                CONTACT
              </button>
            </div>

            {/* Desktop & Mobile: RIGHT Actions */}
            <div className="flex items-center space-x-2.5 sm:space-x-3.5 text-espresso-800">
              {/* Currency Toggle */}
              <button
                onClick={toggleCurrency}
                className="flex items-center gap-1.5 text-[11px] tracking-widest uppercase px-3 py-1.5 rounded-full border border-gold/40 hover:border-gold hover:text-espresso-900 bg-white/80 transition-all duration-300 cursor-pointer shadow-sm"
                title="Switch Currency (PKR / USD)"
              >
                <Globe className="w-3.5 h-3.5 text-gold-muted" />
                <span className="font-semibold text-espresso-900">{currency}</span>
              </button>

              {/* Search Trigger */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="hover:text-gold hover:bg-champagne-light/50 transition-colors duration-300 p-2 rounded-full cursor-pointer"
                aria-label="Search Fragrances"
              >
                <Search className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              {/* Wishlist Trigger */}
              <button
                onClick={() => setIsWishlistOpen(true)}
                className="relative hover:text-gold hover:bg-champagne-light/50 transition-colors duration-300 p-2 rounded-full cursor-pointer"
                aria-label="Wishlist"
              >
                <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
                {wishlist.length > 0 && (
                  <span className="absolute top-1 right-1 bg-gold text-espresso-900 text-[9px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center shadow-sm">
                    {wishlist.length}
                  </span>
                )}
              </button>

              {/* Account Icon */}
              <button
                onClick={handleAccountClick}
                className="relative hover:text-gold hover:bg-champagne-light/50 transition-colors duration-300 p-2 rounded-full hidden sm:block cursor-pointer"
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
                className="relative flex items-center gap-2 bg-espresso-900 hover:bg-gold text-ivory-50 hover:text-espresso-900 px-3.5 sm:px-4 py-1.5 rounded-full transition-all duration-300 shadow-sm cursor-pointer"
                aria-label="Shopping Bag"
              >
                <ShoppingBag className="w-4 h-4" />
                <span className="text-xs font-semibold tracking-wider">{totalCount}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="xl:hidden bg-ivory-50/98 backdrop-blur-2xl border-b border-ivory-300 px-6 py-8 space-y-6 shadow-2xl animate-fadeIn">
            <div className="flex flex-col space-y-4 text-xs uppercase tracking-widest font-medium text-espresso-800">
              <button
                onClick={() => scrollToSection('hero')}
                className="text-left py-2 border-b border-ivory-200 hover:text-gold transition-colors"
              >
                HOME
              </button>
              <button
                onClick={() => scrollToSection('collections')}
                className="text-left py-2 border-b border-ivory-200 hover:text-gold transition-colors"
              >
                COLLECTION
              </button>
              <button
                onClick={() => scrollToSection('brand-story')}
                className="text-left py-2 border-b border-ivory-200 hover:text-gold transition-colors"
              >
                ABOUT
              </button>
              <button
                onClick={() => scrollToSection('craftsmanship')}
                className="text-left py-2 border-b border-ivory-200 hover:text-gold transition-colors"
              >
                INGREDIENTS
              </button>
              <button
                onClick={() => scrollToSection('products')}
                className="text-left py-2 border-b border-ivory-200 hover:text-gold transition-colors"
              >
                FRAGRANCES CATALOG
              </button>
              <button
                onClick={() => scrollToSection('experience')}
                className="text-left py-2 border-b border-ivory-200 hover:text-gold transition-colors"
              >
                OUR STORY &amp; PHILOSOPHY
              </button>
              <button
                onClick={() => scrollToSection('footer')}
                className="text-left py-2 border-b border-ivory-200 hover:text-gold transition-colors"
              >
                CONTACT
              </button>
            </div>

            <div className="pt-4 border-t border-gold/20 flex items-center justify-between text-xs text-espresso-600">
              <span>Display Currency:</span>
              <button
                onClick={toggleCurrency}
                className="px-3 py-1.5 border border-gold/40 text-espresso-900 bg-white rounded font-bold shadow-sm"
              >
                {currency} (Tap to Switch)
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
