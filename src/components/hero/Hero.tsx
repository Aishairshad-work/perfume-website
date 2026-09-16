import React, { useState, useEffect } from 'react';
import { ShoppingBag, Menu, Heart, Globe } from 'lucide-react';
import { PERFUMES_DATA } from '../../data/perfumesData';
import { useCart } from '../../context/CartContext';
import { useCurrency } from '../../context/CurrencyContext';

interface HeroSlide {
  id: string;
  name: string;
  watermark: string;
  watermarkScale: string;
  volume: string;
  pricePKR: number;
  priceUSD: number;
  description: string;
  image: string;
  frontTilt: number;
  backTilt: number;
  glowColor: string;
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'elhsan-signature-50',
    name: 'ELHSAN Signature No. 1',
    watermark: 'SIGNATURE NO. 1',
    watermarkScale: 'clamp(3.8rem, 8.5vw, 8.2rem)',
    volume: '50ML e 1.7 fl.oz.',
    pricePKR: 1200,
    priceUSD: 68,
    description: 'An arresting masterpiece crafted on contrasting facets of crisp Italian bergamot, velvet iris root, and warm balsamic amber. The Scent of Confidence.',
    image: '/assets/hero-1.png',
    frontTilt: -10,
    backTilt: 16,
    glowColor: 'rgba(235, 175, 45, 0.28)'
  },
  {
    id: 'elhsan-imperial-100',
    name: 'ELHSAN Imperial Reserve',
    watermark: 'IMPERIAL RESERVE',
    watermarkScale: 'clamp(3.4rem, 7.8vw, 7.5rem)',
    volume: '100ML e 3.4 fl.oz.',
    pricePKR: 1900,
    priceUSD: 98,
    description: 'The monumental flacon crowned in silver chrome. A commanding composition of sweet Sicilian neroli, crimson saffron, and aged bourbon vetiver.',
    image: '/assets/hero-2.png',
    frontTilt: -12,
    backTilt: 14,
    glowColor: 'rgba(180, 140, 70, 0.26)'
  },
  {
    id: 'elhsan-desire-blue',
    name: 'Dunhill Desire Blue D.V.',
    watermark: 'DESIRE BLUE D.V.',
    watermarkScale: 'clamp(3.5rem, 8vw, 7.8rem)',
    volume: '50ML e 1.7 fl.oz.',
    pricePKR: 1600,
    priceUSD: 78,
    description: 'An invigorating gust of lotus leaf, deep marine salts, and sweet lychee grounded by warm benzoin and roasted tonka bean.',
    image: '/assets/hero-3.png',
    frontTilt: -8,
    backTilt: 18,
    glowColor: 'rgba(70, 130, 180, 0.25)'
  },
  {
    id: 'elhsan-aseel-crystal',
    name: 'Aseel Precious Extrait',
    watermark: 'ASEEL PRÉCIEUX',
    watermarkScale: 'clamp(3.6rem, 8vw, 8rem)',
    volume: '50ML e 1.7 fl.oz.',
    pricePKR: 1850,
    priceUSD: 88,
    description: 'A glowing amber elixir inside a diamond-faceted crystal flacon. An extravagant dance of golden saffron, roasted praline, and warm cedar resin.',
    image: '/assets/product3.png',
    frontTilt: -11,
    backTilt: 15,
    glowColor: 'rgba(215, 120, 50, 0.25)'
  }
];

interface HeroProps {
  onOpenConcierge?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenConcierge }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  const { totalCount, setIsCartOpen, setIsWishlistOpen, wishlist, addToCart } = useCart();
  const { currency, toggleCurrency, formatPrice } = useCurrency();

  // Scroll detection for sticky navbar transition
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY || document.documentElement.scrollTop || window.pageYOffset || 0;
      setIsScrolled(scrollPos > 30);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 4.5s luxury presentation loop matching the reference site
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % HERO_SLIDES.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  const activeSlide = HERO_SLIDES[activeIndex];

  const handleOrderNow = () => {
    const matchedProduct = PERFUMES_DATA.find(p => p.id === activeSlide.id) || PERFUMES_DATA[0];
    addToCart(matchedProduct, 1);
  };

  const scrollToCollection = () => {
    const el = document.getElementById('collection');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="parchment-hero-section" id="hero">
      {/* Botanical Watermark Left SVG */}
      <div className="botanical-bg-left">
        <svg viewBox="0 0 240 240" width="400" height="400" fill="none" stroke="#9e8b6b" strokeWidth="0.75" opacity="0.3">
          <path d="M120 220 C90 150 40 110 15 95 C65 95 90 150 120 220 Z" />
          <path d="M120 220 C150 150 200 110 225 95 C175 95 150 150 120 220 Z" />
          <path d="M120 220 C105 120 80 60 120 20 C160 60 135 120 120 220 Z" />
          <circle cx="120" cy="170" r="18" />
          <path d="M85 145 C60 95 35 45 10 20 C60 45 85 95 85 145 Z" />
        </svg>
      </div>

      {/* Botanical Watermark Right SVG */}
      <div className="botanical-bg-right">
        <svg viewBox="0 0 240 240" width="400" height="400" fill="none" stroke="#9e8b6b" strokeWidth="0.75" opacity="0.3">
          <path d="M120 220 C90 150 40 110 15 95 C65 95 90 150 120 220 Z" />
          <path d="M120 220 C150 150 200 110 225 95 C175 95 150 150 120 220 Z" />
          <path d="M120 220 C105 120 80 60 120 20 C160 60 135 120 120 220 Z" />
        </svg>
      </div>

      {/* Dynamic Warm Ambience Glow */}
      <div className="hero-warm-ambience">
        <div
          className="ambience-core-glow"
          style={{ background: `radial-gradient(circle, ${activeSlide.glowColor} 0%, transparent 70%)` }}
        />
      </div>

      {/* Parchment Top Navbar */}
      <header className={`parchment-top-navbar ${isScrolled ? 'is-sticky-scrolled' : ''}`}>
        <div className="navbar-logo-solo">
          <a href="#hero" title="ELHSAN PARFUMS" className="flex items-center gap-3">
            <img
              src="/assets/logo.png"
              alt="ELHSAN Logo"
              className="solo-logo-img"
            />
            <div className="hidden sm:flex flex-col text-left">
              <span className="font-cinzel text-xs tracking-[0.25em] font-semibold text-[#1a1815]">ELHSAN</span>
              <span className="text-[9px] tracking-[0.3em] text-[#8c6200] font-sans">PARFUMS</span>
            </div>
          </a>
        </div>

        <nav className="navbar-center-menu">
          <a href="#hero" className="nav-menu-link active">Home</a>
          <a href="#collection" className="nav-menu-link">Collection</a>
          <a href="#about" className="nav-menu-link">About</a>
          <a href="#craftsmanship" className="nav-menu-link">Craftsmanship</a>
          <a href="#moments" className="nav-menu-link">Moments</a>
          <a href="#atelier" className="nav-menu-link">Atelier</a>
          <a href="#faq" className="nav-menu-link">FAQ</a>
        </nav>

        <div className="navbar-right-utils">
          {/* Currency Toggle */}
          <button
            onClick={toggleCurrency}
            className="flex items-center gap-1 text-[11px] font-sans font-semibold tracking-wider text-[#4a4036] hover:text-[#b8860b] px-2.5 py-1 rounded-full border border-[#d2c3af]/60 bg-white/70 hover:bg-white transition-all"
            title="Switch Currency"
          >
            <Globe size={13} className="text-[#b8860b]" />
            <span>{currency}</span>
          </button>

          {/* Wishlist Button */}
          <button
            className="nav-cart-btn-icon relative"
            onClick={() => setIsWishlistOpen(true)}
            title="Saved Creations"
            aria-label="Wishlist"
          >
            <Heart size={21} strokeWidth={1.7} />
            {wishlist.length > 0 && (
              <span className="cart-mini-count">{wishlist.length}</span>
            )}
          </button>

          {/* Shopping Bag Button */}
          <button
            className="nav-cart-btn-icon"
            onClick={() => setIsCartOpen(true)}
            title="Shopping Bag"
            aria-label="Shopping Bag"
          >
            <ShoppingBag size={23} strokeWidth={1.7} />
            {totalCount > 0 && (
              <span className="cart-mini-count">{totalCount}</span>
            )}
          </button>

          {/* Concierge & Menu Drawer Button */}
          <button
            className="nav-menu-btn-icon"
            onClick={() => onOpenConcierge && onOpenConcierge()}
            aria-label="Open Concierge &amp; Contact Panel"
            title="Menu &amp; Concierge"
          >
            <Menu size={25} strokeWidth={1.8} />
          </button>
        </div>
      </header>

      {/* Hero Center Stage */}
      <div className="hero-center-stage">
        {/* Giant Watermark Typography with Luxury Drop Emblem */}
        <div className="large-watermark-wrapper">
          <div className="watermark-top-emblem">
            <svg viewBox="0 0 32 32" width="38" height="38" fill="none" stroke="currentColor" strokeWidth="1.2">
              <path d="M16 3C12 9 6 13 6 20a10 10 0 0 0 20 0c0-7-6-11-10-17z" />
              <path d="M16 10c-2.5 4-5 6.5-5 10a5 5 0 0 0 10 0c0-3.5-2.5-6-5-10z" />
            </svg>
          </div>
          <span
            key={activeSlide.id}
            className="large-watermark-text watermark-animated"
            style={{ fontSize: activeSlide.watermarkScale }}
          >
            {activeSlide.watermark}
          </span>
        </div>

        {/* Duo Bottles Showcase */}
        <div className="bottle-hero-showcase">
          <div className="duo-bottles-stage">
            {/* Perspective Back Bottle Anchor */}
            <div
              className="bottle-floating-anchor back-bottle-flow"
              style={{ '--target-tilt': `${activeSlide.backTilt}deg` } as React.CSSProperties}
            >
              <img
                key={`back-${activeSlide.id}`}
                src={activeSlide.image}
                alt={`${activeSlide.name} Perspective`}
                className="khwaab-transparent-bottle-img back-bottle-img"
              />
              <div className="bottle-floor-shadow back-shadow" />
            </div>

            {/* Perspective Front Bottle Anchor */}
            <div
              className="bottle-floating-anchor front-bottle-flow"
              style={{ '--target-tilt': `${activeSlide.frontTilt}deg` } as React.CSSProperties}
            >
              <img
                key={`front-${activeSlide.id}`}
                src={activeSlide.image}
                alt={activeSlide.name}
                className="khwaab-transparent-bottle-img front-bottle-img"
              />
              <div className="bottle-floor-shadow front-shadow" />
            </div>
          </div>

          {/* Floating Price & Volume Pill */}
          <div className="bottle-info-pill">
            <span className="price-tag font-sans font-medium">
              {formatPrice(activeSlide.priceUSD, activeSlide.pricePKR)}
            </span>
            <span className="divider-dot">•</span>
            <span className="volume-tag font-sans">{activeSlide.volume}</span>
          </div>
        </div>
      </div>

      {/* Hero Bottom Bar */}
      <footer className="hero-bottom-bar">
        {/* Left Editorial Narrative */}
        <div className="bar-left-story">
          <p className="story-editorial-copy font-editorial">
            {activeSlide.description}
          </p>
        </div>

        {/* Center Call to Action Button */}
        <div className="bar-center-cta">
          <button
            className="get-now-luxury-btn font-cinzel uppercase tracking-[0.2em]"
            onClick={handleOrderNow}
          >
            Order Now
          </button>
        </div>

        {/* Right Slide Progress Indicator */}
        <div className="bar-right-progress">
          <div className="progress-bars-row">
            {HERO_SLIDES.map((slide, idx) => (
              <span
                key={slide.id}
                className={`prog-bar-segment ${idx === activeIndex ? 'segment-active' : ''}`}
                onClick={() => setActiveIndex(idx)}
                title={slide.name}
              />
            ))}
            <span className="prog-bullet-dot active-bullet" />
            <span className="prog-bullet-dot" />
          </div>
        </div>
      </footer>
    </section>
  );
};
