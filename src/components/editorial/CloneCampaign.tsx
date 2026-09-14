import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { PERFUMES_DATA } from '../../data/perfumesData';

export const CloneCampaign: React.FC = () => {
  const { setQuickViewProduct } = useCart();
  const signatureProduct = PERFUMES_DATA.find(p => p.id === 'elhsan-signature-50');

  return (
    <section className="relative bg-gradient-to-r from-ivory-50 via-[#F7F2EB] to-ivory-100 overflow-hidden min-h-[85vh] flex items-center border-t border-ivory-300/80">
      <div className="absolute right-0 top-1/4 w-[500px] h-[500px] rounded-full bg-gold/15 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center py-20 lg:py-24">
          {/* Left: Campaign Typography */}
          <div>
            <div className="flex items-center gap-2.5 mb-6">
              <span className="h-[1px] w-8 bg-gold/60" />
              <span className="text-[10px] uppercase tracking-widest text-gold-muted font-semibold flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-gold" />
                The Scent of Confidence
              </span>
            </div>

            <h2 className="font-serif text-4xl sm:text-6xl xl:text-7xl text-espresso-900 font-light leading-none tracking-tight">
              WEAR YOUR
              <br />
              <span className="text-gold-gradient italic font-serif">SIGNATURE</span>
            </h2>

            <p className="text-base text-espresso-600 mt-6 font-light leading-relaxed max-w-md">
              Confidence is not worn — it is carried. In every whisper of Calabrian bergamot,
              every drift of warm Baltic amber, ELHSAN Signature No. 1 becomes your unmistakable
              declaration in any room you walk into.
            </p>

            <div className="grid grid-cols-2 gap-4 mt-8">
              {[
                { value: '342', label: 'Five-Star Reviews' },
                { value: '14h+', label: 'Longevity' },
                { value: '97%', label: 'Would Repurchase' },
                { value: '#1', label: 'Best Seller Rank' },
              ].map((stat, i) => (
                <div key={i} className="border border-gold/30 px-5 py-4 bg-white/90 shadow-sm backdrop-blur-xs">
                  <p className="font-serif text-2xl text-espresso-900 font-semibold">{stat.value}</p>
                  <p className="text-[10px] uppercase tracking-widest text-espresso-500 mt-1 font-medium">{stat.label}</p>
                </div>
              ))}
            </div>

            <button
              onClick={() => signatureProduct && setQuickViewProduct(signatureProduct)}
              className="group mt-8 px-8 py-4 bg-espresso-900 hover:bg-gold text-ivory-50 hover:text-espresso-900 font-semibold text-xs tracking-widest uppercase transition-all duration-300 flex items-center gap-2 shadow-[0_10px_25px_rgba(23,18,15,0.12)] cursor-pointer"
            >
              Discover Signature No. 1
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          {/* Right: High-Fashion Editorial Image */}
          <div className="relative flex justify-center">
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-80 sm:w-96 h-80 sm:h-96 rounded-full bg-radial from-gold/25 via-gold/10 to-transparent blur-2xl" />
            </div>
            <div className="relative z-10">
              <img
                src="/assets/clone.png"
                alt="ELHSAN — The Scent of Confidence campaign"
                className="max-h-[480px] sm:max-h-[580px] w-auto object-contain bottle-drop-shadow"
              />
              <div className="absolute top-10 -right-2 sm:right-0 bg-white/95 backdrop-blur-md border border-gold/40 px-4 py-3 shadow-xl">
                <p className="text-[9px] uppercase tracking-widest text-gold-muted font-semibold">Signature Note</p>
                <p className="font-serif text-base text-espresso-900 font-medium mt-0.5">Baltic Amber</p>
              </div>
              <div className="absolute bottom-16 -left-2 sm:left-0 bg-white/95 backdrop-blur-md border border-gold/40 px-4 py-3 shadow-xl">
                <p className="text-[9px] uppercase tracking-widest text-gold-muted font-semibold">Longevity</p>
                <p className="font-serif text-base text-espresso-900 font-medium mt-0.5">12 – 14 Hours</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
