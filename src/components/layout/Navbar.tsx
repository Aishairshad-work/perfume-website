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
      {/* Top Announcement Bar */}
      <div className="bg-espresso-950 text-ivory-300 border-b border-gold/20 text-[11px] tracking-widest-luxury uppercase py-1.5 px-4 text-center overflow-hidden relative">
        <div className="flex items-center justify-center gap-2">
          <Sparkles className="w-3 h-3 text-gold animate-pulse" />
          <span className="font-light">
            Artisanal Gift Box &amp; Velvet Pouch With Every Creation &bull; Complimentary Insured Delivery
          </span>
          <Sparkles className="w-3 h-3 text-gold animate-pulse" />
        </div>
      </div>

      {/* Main Glass Navbar */}
      <nav
        className={`transition-all duration-500 ${isScrolled
          ? 'bg-espresso-950/95 backdrop-blur-xl border-b border-gold/20 py-3 shadow-2xl'
          : 'bg-gradient-to-b from-espresso-950/90 via-espresso-900/60 to-transparent backdrop-blur-sm py-4 sm:py-5'
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Mobile: Hamburger Button */}
            <div className="flex items-center lg:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-ivory-200 hover:text-gold transition-colors p-2"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

            {/* Brand Lockup: Logo image + ELHSAN + HAUTE PARFUMERIE */}
            <div
              onClick={() => scrollToSection('hero')}
              className="relative flex items-center gap-3 cursor-pointer group py-1"
              aria-label="ELHSAN — Home"
            >
              {/* Stronger ambient light behind the logo — positioned farther left */}
              <div
                className="absolute -left-40 top-1/2 -translate-y-1/2 w-[500px] h-[220px] pointer-events-none"
                style={{
                  background:
                    'radial-gradient(ellipse, rgba(255,245,220,0.52) 0%, rgba(245,220,175,0.32) 25%, rgba(215,175,105,0.16) 48%, rgba(150,105,45,0.06) 65%, transparent 80%)',
                  filter: 'blur(32px)',
                }}
              />

              <img
                src="/assets/logo.png"
                alt="ELHSAN Emblem"
                className="relative z-10 h-14 sm:h-16 lg:h-[68px] w-auto object-contain flex-shrink-0 transition-transform duration-500 group-hover:scale-[1.04]"
              />

              <div className="relative z-10 flex flex-col leading-none">
                <span className="font-serif text-xl sm:text-2xl tracking-[0.25em] font-semibold text-ivory-100 group-hover:text-gold transition-colors duration-300 uppercase leading-none">
                  ELHSAN
                </span>

                <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.4em] text-gold/85 font-light mt-1.5">
                  HAUTE PARFUMERIE
                </span>
              </div>
            </div>
            {/* Desktop: CENTER Navigation Links */}
            <div className="hidden xl:flex items-center space-x-7 text-xs font-medium tracking-[0.2em] uppercase text-ivory-200">
              <button
                onClick={() => scrollToSection('hero')}
                className="hover:text-gold transition-colors duration-300 cursor-pointer"
              >
                HOME
              </button>
              <button
                onClick={() => scrollToSection('collections')}
                className="hover:text-gold transition-colors duration-300 cursor-pointer"
              >
                COLLECTION
              </button>
              <button
                onClick={() => scrollToSection('brand-story')}
                className="hover:text-gold transition-colors duration-300 cursor-pointer"
              >
                ABOUT
              </button>
              <button
                onClick={() => scrollToSection('craftsmanship')}
                className="hover:text-gold transition-colors duration-300 cursor-pointer"
              >
                INGREDIENTS
              </button>
              <button
                onClick={() => scrollToSection('experience')}
                className="hover:text-gold transition-colors duration-300 cursor-pointer"
              >
                OUR STORY
              </button>
              <button
                onClick={() => scrollToSection('footer')}
                className="hover:text-gold transition-colors duration-300 cursor-pointer"
              >
                CONTACT
              </button>
            </div>

            {/* Desktop & Mobile: RIGHT Actions */}
            <div className="flex items-center space-x-3 sm:space-x-4 text-ivory-200">
              {/* Currency Toggle */}
              <button
                onClick={toggleCurrency}
                className="flex items-center gap-1 text-[11px] tracking-widest uppercase px-2.5 py-1 rounded-full border border-gold/30 hover:border-gold hover:text-gold bg-espresso-900/60 transition-all duration-300 cursor-pointer"
                title="Switch Currency (PKR / USD)"
              >
                <Globe className="w-3.5 h-3.5 text-gold" />
                <span className="font-semibold text-gold">{currency}</span>
              </button>

              {/* Search Trigger */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="hover:text-gold transition-colors duration-300 p-2 rounded-full hover:bg-white/5 cursor-pointer"
                aria-label="Search Fragrances"
              >
                <Search className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              {/* Wishlist Trigger */}
              <button
                onClick={() => setIsWishlistOpen(true)}
                className="relative hover:text-gold transition-colors duration-300 p-2 rounded-full hover:bg-white/5 cursor-pointer"
                aria-label="Wishlist"
              >
                <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
                {wishlist.length > 0 && (
                  <span className="absolute top-1 right-1 bg-gold text-espresso-900 text-[9px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center shadow-md">
                    {wishlist.length}
                  </span>
                )}
              </button>

              {/* Account Icon */}
              <button
                onClick={handleAccountClick}
                className="relative hover:text-gold transition-colors duration-300 p-2 rounded-full hover:bg-white/5 hidden sm:block cursor-pointer"
                aria-label="Client Account"
                title="Maison VIP Account"
              >
                <User className="w-4 h-4 sm:w-5 sm:h-5" />
                {accountNotification && (
                  <span className="absolute -bottom-8 right-0 bg-espresso-900 border border-gold/40 text-gold text-[10px] uppercase tracking-wider px-2 py-1 whitespace-nowrap shadow-xl">
                    Maison VIP Active
                  </span>
                )}
              </button>

              {/* Shopping Bag Trigger */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative flex items-center gap-2 bg-gold/15 hover:bg-gold/25 border border-gold/40 text-ivory-100 hover:text-gold px-3 sm:px-3.5 py-1.5 rounded-full transition-all duration-300 shadow-sm cursor-pointer"
                aria-label="Shopping Bag"
              >
                <ShoppingBag className="w-4 h-4 text-gold" />
                <span className="text-xs font-semibold tracking-wider">{totalCount}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="xl:hidden bg-espresso-950/98 backdrop-blur-2xl border-b border-gold/20 px-6 py-8 space-y-6 animate-fadeIn">
            <div className="flex flex-col space-y-4 text-xs uppercase tracking-widest font-medium text-ivory-200">
              <button
                onClick={() => scrollToSection('hero')}
                className="text-left py-2 border-b border-white/5 hover:text-gold transition-colors"
              >
                HOME
              </button>
              <button
                onClick={() => scrollToSection('collections')}
                className="text-left py-2 border-b border-white/5 hover:text-gold transition-colors"
              >
                COLLECTION
              </button>
              <button
                onClick={() => scrollToSection('brand-story')}
                className="text-left py-2 border-b border-white/5 hover:text-gold transition-colors"
              >
                ABOUT
              </button>
              <button
                onClick={() => scrollToSection('craftsmanship')}
                className="text-left py-2 border-b border-white/5 hover:text-gold transition-colors"
              >
                INGREDIENTS
              </button>
              <button
                onClick={() => scrollToSection('products')}
                className="text-left py-2 border-b border-white/5 hover:text-gold transition-colors"
              >
                FRAGRANCES CATALOG
              </button>
              <button
                onClick={() => scrollToSection('experience')}
                className="text-left py-2 border-b border-white/5 hover:text-gold transition-colors"
              >
                OUR STORY &amp; PHILOSOPHY
              </button>
              <button
                onClick={() => scrollToSection('footer')}
                className="text-left py-2 border-b border-white/5 hover:text-gold transition-colors"
              >
                CONTACT
              </button>
            </div>

            <div className="pt-4 border-t border-gold/20 flex items-center justify-between text-xs text-ivory-300">
              <span>Display Currency:</span>
              <button
                onClick={toggleCurrency}
                className="px-3 py-1 border border-gold/40 text-gold rounded font-bold"
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
