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

  const { addToCart, setQuickViewProduct } = useCart();
  const { formatPrice } = useCurrency();

  const currentProduct = heroProducts[activeIndex] || heroProducts[0];

  // 2.8s - 3s luxury campaign animation loop between the three hero bottles
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % heroProducts.length);
    }, 1800);
    return () => clearInterval(interval);
  }, [isHovered, heroProducts.length]);

  // Subtle 3D mouse parallax calculation
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 16;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 16;
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
        // FIRST: Bottle 1 - subtle scale + fade + upward movement
        return {
          initial: { opacity: 0, y: 35, scale: 0.94, filter: 'blur(4px)' },
          animate: {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: 'blur(0px)',
            transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1] }
          },
          exit: {
            opacity: 0,
            y: -25,
            scale: 1.04,
            filter: 'blur(6px)',
            transition: { duration: 0.8, ease: [0.7, 0, 0.84, 0] }
          }
        };
      case 1:
        // SECOND: Bottle 2 - subtle rotation + scale animation + blur-to-sharp + soft floating
        return {
          initial: { opacity: 0, rotate: -4, scale: 0.9, filter: 'blur(10px)', y: 20 },
          animate: {
            opacity: 1,
            rotate: 0,
            scale: 1,
            filter: 'blur(0px)',
            y: 0,
            transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] }
          },
          exit: {
            opacity: 0,
            rotate: 3,
            scale: 0.96,
            filter: 'blur(8px)',
            transition: { duration: 0.8, ease: [0.7, 0, 0.84, 0] }
          }
        };
      case 2:
      default:
        // THIRD: Bottle 3 - elegant depth entrance with floating movement
        return {
          initial: { opacity: 0, scale: 1.08, y: 25, filter: 'blur(8px)' },
          animate: {
            opacity: 1,
            scale: 1,
            y: 0,
            filter: 'blur(0px)',
            transition: { duration: 1.15, ease: [0.16, 1, 0.3, 1] }
          },
          exit: {
            opacity: 0,
            scale: 0.92,
            y: -20,
            filter: 'blur(6px)',
            transition: { duration: 0.8, ease: [0.7, 0, 0.84, 0] }
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
      className="relative min-h-screen pt-28 pb-14 flex items-center justify-center overflow-hidden bg-gradient-to-b from-espresso-950 via-espresso-900 to-obsidian text-ivory-100 selection:bg-gold/30"
    >
      {/* Canvas particle mist */}
      <FragranceMist />

      {/* ── CINEMATIC BACKGROUND SYSTEM ── (CSS layers only, z-0 to z-9) */}
      <div className="absolute inset-0 pointer-events-none">

        {/* Layer 0: Deep ink base — left stays darkest, right warms slightly */}
        <div className="absolute inset-0 bg-[linear-gradient(105deg,rgba(4,3,2,1)_0%,rgba(8,6,4,1)_40%,rgba(14,10,6,1)_70%,rgba(10,7,4,1)_100%)]" />

        {/* Layer 1: Slow-moving warm ambient fog — right half only */}
        <div
          className="absolute top-0 right-0 w-[75%] h-full opacity-60"
          style={{
            background: 'radial-gradient(ellipse 90% 80% at 80% 45%, rgba(80,55,20,0.22) 0%, rgba(40,28,10,0.12) 50%, transparent 100%)',
            animation: 'heroFogDrift 18s ease-in-out infinite alternate',
          }}
        />

        {/* Layer 2: Bottle spotlight — tracks mouse parallax, right-center */}
        <div
          className="absolute w-[600px] h-[600px] rounded-full"
          style={{
            top: '50%',
            left: '62%',
            transform: `translate(calc(-50% + ${mousePos.x * 0.55}px), calc(-50% + ${mousePos.y * 0.55}px))`,
            background: 'radial-gradient(ellipse, rgba(197,160,89,0.13) 0%, rgba(140,100,40,0.07) 40%, transparent 70%)',
            filter: 'blur(24px)',
            transition: 'transform 0.8s cubic-bezier(0.25,0.46,0.45,0.94)',
          }}
        />

        {/* Layer 3: Upper atmospheric haze — diffused, right-biased */}
        <div
          className="absolute top-0 right-0 w-[65%] h-[55%] opacity-40"
          style={{
            background: 'radial-gradient(ellipse 80% 70% at 75% 20%, rgba(100,72,22,0.18) 0%, rgba(50,35,10,0.08) 55%, transparent 100%)',
            animation: 'heroUpperHaze 24s ease-in-out infinite alternate-reverse',
          }}
        />

        {/* Layer 4: Floor bloom — warm light reflecting from the bottle pedestal */}
        <div
          className="absolute bottom-0 w-full h-[45%]"
          style={{
            background: 'radial-gradient(ellipse 55% 60% at 68% 100%, rgba(197,160,89,0.09) 0%, rgba(100,75,25,0.05) 50%, transparent 100%)',
            animation: 'heroFloorBloom 20s ease-in-out infinite alternate',
          }}
        />

        {/* Layer 5: Left side dark curtain — keeps text area clean */}
        <div
          className="absolute inset-y-0 left-0 w-[52%]"
          style={{
            background: 'linear-gradient(to right, rgba(3,2,1,0.82) 0%, rgba(3,2,1,0.55) 55%, rgba(3,2,1,0) 100%)',
          }}
        />

        {/* Layer 6: Outer cinematic vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_50%,transparent_30%,rgba(4,3,2,0.88)_100%)]" />

        {/* Layer 7: Top edge darkening */}
        <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-[rgba(3,2,1,0.7)] to-transparent" />

        {/* Layer 8: Bottom edge fade to next section */}
        <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-[rgba(6,4,2,0.8)] to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center min-h-[75vh]">
          {/* LEFT SIDE: Luxury Typography & Editorial CTAs - shifted comfortably inward for balance */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6 text-center lg:text-left pt-6 lg:pt-0 lg:pl-10 xl:pl-16 2xl:pl-20">
            {/* Small Eyebrow Text */}
           git add . */}

            {/* Large Headline — one row on desktop */}
            <div>
              <h1 className="font-serif font-light tracking-tight leading-[0.95] text-ivory-50 text-5xl sm:text-6xl lg:text-7xl xl:text-8xl lg:whitespace-nowrap">
                SCENT THAT{' '}
                <span className="italic font-normal text-gold-gradient font-serif">
                  STAYS.
                </span>
              </h1>
              <p className="font-cormorant text-xl sm:text-2xl text-ivory-300 italic mt-3 font-light">
                "{currentProduct.subtitle}"
              </p>
            </div>

            {/* Supporting Text */}
            <p className="text-sm sm:text-base text-ivory-300 max-w-xl mx-auto lg:mx-0 font-light leading-relaxed">
              Discover fragrances crafted to become part of your story. Hand-blended with triple-filtered French essences and aged rare resins.
            </p>

            {/* Olfactory Notes Pill Strip */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-1">
              <span className="text-[11px] uppercase tracking-widest text-gold/90 font-semibold mr-1">
                Accords:
              </span>
              {currentProduct.notes.top.slice(0, 2).map((note, i) => (
                <span
                  key={i}
                  className="text-xs px-3 py-1 rounded-full bg-white/5 border border-gold/20 text-ivory-200"
                >
                  {note}
                </span>
              ))}
              <span className="text-xs px-3 py-1 rounded-full bg-gold/15 border border-gold/40 text-gold font-medium">
                {currentProduct.notes.base[0]}
              </span>
              <span className="text-[11px] text-ivory-400 italic ml-2">
                &bull; {currentProduct.longevity}
              </span>
            </div>

            {/* Pricing & Volume Display */}
            <div className="flex items-baseline justify-center lg:justify-start gap-4 pt-1">
              <span className="font-serif text-3xl sm:text-4xl font-semibold text-ivory-100 tracking-tight">
                {formatPrice(currentProduct.price, currentProduct.pricePKR)}
              </span>
              {currentProduct.originalPrice && currentProduct.originalPricePKR && (
                <span className="text-sm sm:text-base text-ivory-400 line-through font-light">
                  {formatPrice(currentProduct.originalPrice, currentProduct.originalPricePKR)}
                </span>
              )}
              <span className="text-xs uppercase tracking-widest text-gold px-2.5 py-0.5 rounded border border-gold/30 bg-gold/10">
                {currentProduct.volume} &bull; {currentProduct.type}
              </span>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <button
                onClick={() => scrollToSection('collections')}
                className="w-full sm:w-auto px-8 py-4 bg-gold hover:bg-gold-light text-espresso-900 font-semibold text-xs tracking-widest uppercase transition-all duration-300 transform hover:-translate-y-0.5 shadow-[0_10px_25px_rgba(197,160,89,0.3)] flex items-center justify-center gap-2 group cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4 transition-transform group-hover:scale-110" />
                SHOP COLLECTION
              </button>

              <button
                onClick={() => scrollToSection('brand-story')}
                className="w-full sm:w-auto px-7 py-4 border border-gold/40 hover:border-gold text-ivory-100 hover:text-gold font-medium text-xs tracking-widest uppercase transition-all duration-300 bg-espresso-900/50 backdrop-blur-sm flex items-center justify-center gap-2 group cursor-pointer"
              >
                DISCOVER ELHSAN
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={() => setQuickViewProduct(currentProduct)}
                className="w-full sm:w-auto px-5 py-4 text-ivory-300 hover:text-gold text-xs tracking-widest uppercase transition-colors flex items-center justify-center gap-1.5 group cursor-pointer"
              >
                <Eye className="w-4 h-4 text-gold" />
                Notes Pyramid
              </button>
            </div>
          </div>

          {/* RIGHT / CENTER: Cinematic Animated Perfume Bottle */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative min-h-[460px] sm:min-h-[560px]">
            {/* Bottle Pedestal & Reflective Halo */}
            <div className="absolute bottom-8 w-72 sm:w-96 h-28 rounded-[100%] bg-gold/15 blur-2xl pointer-events-none" />
            <div className="absolute bottom-14 w-64 sm:w-80 h-10 rounded-[100%] border border-gold/30 bg-espresso-900/70 shadow-[0_0_35px_rgba(197,160,89,0.3)] pointer-events-none" />

            {/* Flacon Presentation with Framer Motion AnimatePresence & Parallax */}
            <div
              className="relative z-20 flex items-center justify-center cursor-pointer min-h-[420px] sm:min-h-[500px] w-full"
              onClick={() => setQuickViewProduct(currentProduct)}
              style={{
                transform: `perspective(1000px) rotateY(${mousePos.x * 0.45}deg) rotateX(${-mousePos.y * 0.45}deg) translateY(${mousePos.y * 0.3}px)`
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
                    className="max-h-[390px] sm:max-h-[500px] w-auto object-contain filter drop-shadow-[0_30px_45px_rgba(0,0,0,0.75)] hover:scale-105 transition-transform duration-500"
                  />

                  {/* Badges Overlay */}
                  {currentProduct.badge && (
                    <div className="absolute top-4 right-0 bg-gold text-espresso-900 text-[10px] font-bold tracking-widest-luxury uppercase px-3.5 py-1 shadow-xl">
                      {currentProduct.badge}
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Micro-interaction Helper */}
            <p className="text-[10px] uppercase tracking-widest text-ivory-400 mt-4 flex items-center gap-1.5 opacity-80">
              <Eye className="w-3 h-3 text-gold" />
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
