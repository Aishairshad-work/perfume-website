import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, ArrowRight, Eye, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { PERFUMES_DATA } from '../../data/perfumesData';
import { FragranceMist } from './FragranceMist';
import { HeroControls } from './HeroControls';
import { useCart } from '../../context/CartContext';
import { useCurrency } from '../../context/CurrencyContext';

export const Hero: React.FC = () => {
  const heroProducts = PERFUMES_DATA.filter(p => p.heroProduct);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement | null>(null);

  const { setQuickViewProduct } = useCart();
  const { formatPrice } = useCurrency();

  const currentProduct = heroProducts[activeIndex] || heroProducts[0];

  // 4.2s luxury editorial presentation loop between the three hero bottles
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % heroProducts.length);
    }, 4200);
    return () => clearInterval(interval);
  }, [isHovered, heroProducts.length]);

  // Subtle 3D mouse parallax calculation
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 14;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 14;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
    setIsHovered(false);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -80;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  // Transition variants specifically tailored for each bottle index
  const getBottleVariants = (index: number) => {
    switch (index) {
      case 0:
        return {
          initial: { opacity: 0, y: 25, scale: 0.96 },
          animate: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] }
          },
          exit: {
            opacity: 0,
            y: -15,
            scale: 1.02,
            transition: { duration: 0.6, ease: [0.7, 0, 0.84, 0] }
          }
        };
      case 1:
        return {
          initial: { opacity: 0, rotate: -2, scale: 0.94, y: 20 },
          animate: {
            opacity: 1,
            rotate: 0,
            scale: 1,
            y: 0,
            transition: { duration: 0.95, ease: [0.16, 1, 0.3, 1] }
          },
          exit: {
            opacity: 0,
            rotate: 2,
            scale: 0.97,
            transition: { duration: 0.6, ease: [0.7, 0, 0.84, 0] }
          }
        };
      case 2:
      default:
        return {
          initial: { opacity: 0, scale: 1.04, y: 20 },
          animate: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] }
          },
          exit: {
            opacity: 0,
            scale: 0.95,
            y: -15,
            transition: { duration: 0.6, ease: [0.7, 0, 0.84, 0] }
          }
        };
    }
  };

  const bottleVariant = getBottleVariants(activeIndex);

  return (
    <section
      id="hero"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-[92vh] pt-32 sm:pt-36 pb-14 flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#FAF7F2] via-[#F4EFE6] to-[#FAF7F2] text-espresso-900 selection:bg-gold-light/40"
    >
      {/* Canvas particle mist - soft golden motes */}
      <FragranceMist />

      {/* ── LIGHT LUXURY AMBIENT BACKGROUND SYSTEM ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Soft radial champagne light centered behind the product bottle area */}
        <div
          className="absolute w-[560px] h-[560px] sm:w-[680px] sm:h-[680px] rounded-full opacity-70 pointer-events-none"
          style={{
            top: '48%',
            left: '68%',
            transform: `translate(calc(-50% + ${mousePos.x * 0.35}px), calc(-50% + ${mousePos.y * 0.35}px))`,
            background: 'radial-gradient(circle, rgba(235, 220, 195, 0.85) 0%, rgba(246, 239, 230, 0.5) 45%, transparent 75%)',
            filter: 'blur(36px)',
            transition: 'transform 0.8s cubic-bezier(0.25,0.46,0.45,0.94)',
          }}
        />

        {/* Delicate golden accent glow behind bottle */}
        <div
          className="absolute w-[360px] h-[360px] rounded-full opacity-60 pointer-events-none"
          style={{
            top: '48%',
            left: '68%',
            transform: 'translate(-50%, -50%)',
            background: 'radial-gradient(circle, rgba(229, 201, 132, 0.32) 0%, rgba(212, 175, 100, 0.12) 50%, transparent 72%)',
            filter: 'blur(28px)',
          }}
        />

        {/* Ambient top light wash */}
        <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-white/70 to-transparent" />

        {/* Soft subtle transition to the guarantee strip */}
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-[#FAF7F2] to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center min-h-[70vh]">
          {/* LEFT SIDE: Luxury Typography & Editorial CTAs - centered balance */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6 text-center lg:text-left pt-4 lg:pt-0 lg:pl-6 xl:pl-10">
            {/* Small Eyebrow Text */}
            <div className="inline-flex items-center justify-center lg:justify-start gap-2.5">
              <span className="h-[1px] w-8 bg-gold-muted/60" />
              <span className="text-[11px] uppercase font-semibold tracking-ultra-wide text-gold-muted flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-gold" />
                ELHSAN PARFUMS
              </span>
              <span className="h-[1px] w-8 bg-gold-muted/60 lg:hidden" />
            </div>

            {/* Large Headline — strictly ONE row on desktop */}
            <div>
              <h1 className="font-serif font-light tracking-tight leading-[0.98] text-espresso-900 text-4xl sm:text-6xl lg:text-[4.25rem] xl:text-[5rem] lg:whitespace-nowrap">
                SCENT THAT{' '}
                <span className="italic font-normal text-gold-gradient font-serif">
                  STAYS.
                </span>
              </h1>
              <p className="font-serif text-xl sm:text-2xl text-espresso-600 italic mt-3 font-light">
                &ldquo;{currentProduct.subtitle}&rdquo;
              </p>
            </div>

            {/* Supporting Text */}
            <p className="text-sm sm:text-base text-espresso-600 max-w-xl mx-auto lg:mx-0 font-light leading-relaxed">
              Discover artisanal fragrances crafted with triple-filtered French essences, aged oriental resins, and rare botanical absolutes. Made to linger with quiet distinction.
            </p>

            {/* Olfactory Notes Pill Strip */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-1">
              <span className="text-[11px] uppercase tracking-widest text-gold-muted font-semibold mr-1">
                Accords:
              </span>
              {currentProduct.notes.top.slice(0, 2).map((note, i) => (
                <span
                  key={i}
                  className="text-xs px-3.5 py-1 rounded-full bg-white/90 border border-ivory-300 text-espresso-700 shadow-xs font-normal"
                >
                  {note}
                </span>
              ))}
              <span className="text-xs px-3.5 py-1 rounded-full bg-gold/15 border border-gold/40 text-espresso-900 font-medium shadow-xs">
                {currentProduct.notes.base[0]}
              </span>
              <span className="text-[11px] text-espresso-500 italic ml-2">
                &bull; {currentProduct.longevity}
              </span>
            </div>

            {/* Pricing & Volume Display */}
            <div className="flex items-baseline justify-center lg:justify-start gap-4 pt-1">
              <span className="font-serif text-3xl sm:text-4xl font-semibold text-espresso-900 tracking-tight">
                {formatPrice(currentProduct.price, currentProduct.pricePKR)}
              </span>
              {currentProduct.originalPrice && currentProduct.originalPricePKR && (
                <span className="text-sm sm:text-base text-espresso-400 line-through font-light">
                  {formatPrice(currentProduct.originalPrice, currentProduct.originalPricePKR)}
                </span>
              )}
              <span className="text-xs uppercase tracking-widest text-espresso-800 px-2.5 py-0.5 rounded border border-gold/40 bg-gold/10 font-medium">
                {currentProduct.volume} &bull; {currentProduct.type}
              </span>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-3">
              <button
                onClick={() => scrollToSection('collections')}
                className="w-full sm:w-auto px-8 py-4 bg-espresso-900 hover:bg-gold text-ivory-50 hover:text-espresso-900 font-semibold text-xs tracking-widest uppercase transition-all duration-300 transform hover:-translate-y-0.5 shadow-[0_10px_25px_rgba(23,18,15,0.12)] flex items-center justify-center gap-2 group cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4 transition-transform group-hover:scale-110" />
                SHOP COLLECTION
              </button>

              <button
                onClick={() => scrollToSection('brand-story')}
                className="w-full sm:w-auto px-7 py-4 border border-espresso-800/40 hover:border-espresso-900 text-espresso-900 hover:text-gold font-medium text-xs tracking-widest uppercase transition-all duration-300 bg-white/80 backdrop-blur-sm flex items-center justify-center gap-2 group cursor-pointer shadow-xs"
              >
                DISCOVER ELHSAN
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={() => setQuickViewProduct(currentProduct)}
                className="w-full sm:w-auto px-5 py-4 text-espresso-600 hover:text-gold text-xs tracking-widest uppercase transition-colors flex items-center justify-center gap-1.5 group cursor-pointer font-medium"
              >
                <Eye className="w-4 h-4 text-gold-muted" />
                Notes Pyramid
              </button>
            </div>
          </div>

          {/* RIGHT / CENTER: Editorial Perfume Bottle Presentation */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative min-h-[440px] sm:min-h-[520px]">
            {/* Realistic soft studio floor contact shadow */}
            <div className="absolute bottom-8 sm:bottom-12 w-64 sm:w-80 h-9 rounded-[100%] bg-espresso-950/15 blur-lg pointer-events-none" />
            <div className="absolute bottom-11 sm:bottom-15 w-48 sm:w-60 h-4 rounded-[100%] bg-espresso-950/25 blur-sm pointer-events-none" />

            {/* Subtle warm pedestal light disc */}
            <div className="absolute bottom-10 sm:bottom-14 w-60 sm:w-72 h-8 rounded-[100%] border border-gold/30 bg-champagne-light/50 pointer-events-none shadow-[0_0_25px_rgba(197,160,89,0.2)]" />

            {/* Flacon Presentation with Framer Motion AnimatePresence & Parallax */}
            <div
              className="relative z-20 flex items-center justify-center cursor-pointer min-h-[400px] sm:min-h-[480px] w-full"
              onClick={() => setQuickViewProduct(currentProduct)}
              style={{
                transform: `perspective(1000px) rotateY(${mousePos.x * 0.4}deg) rotateX(${-mousePos.y * 0.4}deg) translateY(${mousePos.y * 0.25}px)`
              }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentProduct.id}
                  variants={bottleVariant}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="relative flex items-center justify-center"
                >
                  <img
                    src={currentProduct.image}
                    alt={currentProduct.name}
                    className="max-h-[380px] sm:max-h-[480px] w-auto object-contain bottle-drop-shadow hover:scale-105 transition-transform duration-500"
                  />

                  {/* Badges Overlay */}
                  {currentProduct.badge && (
                    <div className="absolute top-4 right-0 bg-espresso-900 text-gold text-[10px] font-bold tracking-widest-luxury uppercase px-3 py-1 shadow-md">
                      {currentProduct.badge}
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Micro-interaction Helper */}
            <p className="text-[10px] uppercase tracking-widest text-espresso-500 mt-4 flex items-center gap-1.5 opacity-80 font-medium">
              <Eye className="w-3 h-3 text-gold-muted" />
              Click Flacon to inspect Olfactory Pyramid
            </p>
          </div>
        </div>

        {/* Bottom Hero Bottle Switcher Controls */}
        <div className="mt-8 flex items-center justify-center">
          <HeroControls
            activeIndex={activeIndex}
            onSelect={(idx) => setActiveIndex(idx)}
            items={heroProducts.map(p => ({
              id: p.id,
              name: p.name,
              volume: p.volume,
              image: p.image
            }))}
          />
        </div>
      </div>
    </section>
  );
};
