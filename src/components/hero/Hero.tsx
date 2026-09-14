import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
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

  // 4.2s smooth editorial transition loop between the hero flacons
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % heroProducts.length);
    }, 4200);
    return () => clearInterval(interval);
  }, [isHovered, heroProducts.length]);

  // Subtle natural mouse parallax
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 12;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 12;
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

  // Restrained, smooth luxury bottle transitions
  const bottleVariants = {
    initial: { opacity: 0, y: 20, scale: 0.96 },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] }
    },
    exit: {
      opacity: 0,
      y: -12,
      scale: 0.98,
      transition: { duration: 0.5, ease: [0.7, 0, 0.84, 0] }
    }
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-[88vh] pt-28 sm:pt-36 pb-12 sm:pb-16 flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#FAF8F5] via-[#F4EFE6] to-[#FAF8F5] text-espresso-900"
    >
      {/* Delicate ambient mist motes */}
      <FragranceMist />

      {/* Soft natural radial lighting behind flacon */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute w-[500px] h-[500px] sm:w-[620px] sm:h-[620px] rounded-full opacity-60 pointer-events-none"
          style={{
            top: '48%',
            left: '68%',
            transform: `translate(calc(-50% + ${mousePos.x * 0.25}px), calc(-50% + ${mousePos.y * 0.25}px))`,
            background: 'radial-gradient(circle, rgba(238, 226, 208, 0.75) 0%, rgba(246, 240, 232, 0.4) 45%, transparent 70%)',
            filter: 'blur(34px)',
            transition: 'transform 0.8s cubic-bezier(0.25,0.46,0.45,0.94)',
          }}
        />
        <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-white/60 to-transparent" />
        <div className="absolute bottom-0 inset-x-0 h-20 bg-gradient-to-t from-[#FAF8F5] to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 w-full relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* LEFT SIDE: Clean, Compact Luxury Text Block */}
          <div className="lg:col-span-7 flex flex-col justify-center text-center lg:text-left lg:pl-4 xl:pl-8 max-w-2xl mx-auto lg:mx-0">
            
            {/* 1. Brand Eyebrow */}
            <p className="text-[11px] sm:text-xs uppercase tracking-[0.28em] text-gold-dark font-sans font-medium">
              ELHSAN PARFUMS
            </p>

            {/* 2. Main Headline — strictly ONE horizontal line on desktop */}
            <h1 className="font-serif font-normal text-espresso-950 tracking-tight leading-[1.04] text-[2.5rem] sm:text-6xl lg:text-[4.15rem] xl:text-[4.75rem] lg:whitespace-nowrap mt-3 sm:mt-4">
              SCENT THAT{' '}
              <span className="text-gold-dark font-serif font-normal">
                STAYS.
              </span>
            </h1>

            {/* 3. Short Elegant Tagline */}
            <p className="font-sans text-base sm:text-lg text-espresso-700 font-normal tracking-wide mt-2">
              "The Scent of Confidence"
            </p>

            {/* 4. Short Description */}
            <p className="font-sans text-sm sm:text-[15px] text-espresso-600 font-light leading-relaxed max-w-lg mx-auto lg:mx-0 mt-3 sm:mt-4">
              Artisanal French essences and aged oriental resins, crafted into extraits de parfum that linger with quiet distinction.
            </p>

            {/* 5. Fragrance & Price Information */}
            <div className="flex flex-wrap items-baseline justify-center lg:justify-start gap-3 pt-4 sm:pt-5">
              <span className="font-serif text-2xl sm:text-3xl font-medium text-espresso-950">
                {formatPrice(currentProduct.price, currentProduct.pricePKR)}
              </span>
              <span className="text-xs uppercase tracking-widest text-espresso-500 font-sans font-medium">
                {currentProduct.name} &bull; {currentProduct.volume} {currentProduct.type}
              </span>
            </div>

            {/* 6. Refined Action Buttons (1 Primary, 1 Subtle Secondary) */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-6 sm:pt-7">
              <button
                onClick={() => scrollToSection('products')}
                className="w-full sm:w-auto px-8 py-3.5 bg-espresso-950 hover:bg-black text-white text-xs tracking-[0.2em] font-sans uppercase font-medium transition-all shadow-sm hover:shadow-md cursor-pointer text-center"
              >
                SHOP COLLECTION
              </button>

              <button
                onClick={() => scrollToSection('craftsmanship')}
                className="w-full sm:w-auto px-7 py-3.5 border border-espresso-950/25 hover:border-espresso-950 text-espresso-900 text-xs tracking-[0.2em] font-sans uppercase font-medium transition-all flex items-center justify-center gap-1.5 cursor-pointer text-center bg-white/40 hover:bg-white"
              >
                DISCOVER ATELIER
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* RIGHT SIDE: Natural, Spacious Perfume Bottle Presentation */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative min-h-[380px] sm:min-h-[460px] lg:min-h-[500px]">
            
            {/* Soft, natural floor contact shadow */}
            <div className="absolute bottom-6 sm:bottom-10 w-56 sm:w-72 h-7 rounded-[100%] bg-espresso-950/12 blur-md pointer-events-none" />
            <div className="absolute bottom-8 sm:bottom-12 w-40 sm:w-52 h-3 rounded-[100%] bg-espresso-950/20 blur-xs pointer-events-none" />

            {/* Flacon Presentation with smooth AnimatePresence transition */}
            <div
              className="relative z-20 flex items-center justify-center cursor-pointer min-h-[360px] sm:min-h-[440px] w-full"
              onClick={() => setQuickViewProduct(currentProduct)}
              style={{
                transform: `perspective(1000px) rotateY(${mousePos.x * 0.3}deg) rotateX(${-mousePos.y * 0.3}deg) translateY(${mousePos.y * 0.2}px)`
              }}
              title="Click to view details"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentProduct.id}
                  variants={bottleVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="relative flex items-center justify-center"
                >
                  <img
                    src={currentProduct.image}
                    alt={currentProduct.name}
                    className="max-h-[340px] sm:max-h-[440px] lg:max-h-[470px] w-auto object-contain bottle-drop-shadow hover:scale-102 transition-transform duration-500"
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Minimal Hero Flacon Switcher Controls */}
        <div className="mt-8 sm:mt-10 flex items-center justify-center">
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
