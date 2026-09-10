import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { PERFUMES_DATA } from '../../data/perfumesData';

export const CloneCampaign: React.FC = () => {
  const { setQuickViewProduct } = useCart();
  const signatureProduct = PERFUMES_DATA.find(p => p.id === 'elhsan-signature-50');

  return (
    <section className="relative bg-obsidian overflow-hidden min-h-screen flex items-center">
      <div className="absolute inset-0 bg-gradient-to-r from-espresso-950 via-obsidian to-espresso-950" />
      <div className="absolute right-0 top-1/4 w-[600px] h-[600px] rounded-full bg-gold/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center py-24">
          {/* Left: Campaign Typography */}
          <div>
            <div className="flex items-center gap-2.5 mb-8">
              <span className="h-[1px] w-8 bg-gold/60" />
              <span className="text-[10px] uppercase tracking-widest text-gold font-medium flex items-center gap-1.5">
                <Sparkles className="w-3 h-3" />
                The Scent of Confidence
              </span>
            </div>

            <h2 className="font-serif text-5xl sm:text-6xl xl:text-7xl text-ivory-50 font-light leading-none tracking-tight">
              WEAR YOUR
              <br />
              <span className="text-gold-gradient italic font-serif">SIGNATURE</span>
            </h2>

            <p className="text-base text-ivory-400 mt-8 font-light leading-relaxed max-w-md">
              Confidence is not worn — it is carried. In every whisper of Calabrian bergamot,
              every drift of warm Baltic amber, ELHSAN Signature No. 1 becomes your unmistakable
              declaration in any room you walk into.
            </p>

            <div className="grid grid-cols-2 gap-4 mt-10">
              {[
                { value: '342', label: 'Five-Star Reviews' },
                { value: '14h+', label: 'Longevity' },
                { value: '97%', label: 'Would Repurchase' },
                { value: '#1', label: 'Best Seller Rank' },
              ].map((stat, i) => (
                <div key={i} className="border border-gold/20 px-5 py-4 bg-espresso-800/30">
                  <p className="font-serif text-2xl text-gold font-semibold">{stat.value}</p>
                  <p className="text-[10px] uppercase tracking-widest text-ivory-400 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>

            <button
              onClick={() => signatureProduct && setQuickViewProduct(signatureProduct)}
              className="group mt-10 px-8 py-4 bg-gold hover:bg-gold-light text-espresso-900 font-semibold text-xs tracking-widest uppercase transition-all duration-300 flex items-center gap-2 shadow-[0_10px_25px_rgba(197,160,89,0.3)]"
            >
              Discover Signature No. 1
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          {/* Right: High-Fashion Editorial Image */}
          <div className="relative flex justify-center">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-72 h-72 rounded-full bg-gold/10 blur-3xl" />
            </div>
            <div className="relative z-10">
              <img
                src="/assets/clone.png"
                alt="ELHSAN — The Scent of Confidence campaign"
                className="max-h-[500px] sm:max-h-[620px] w-auto object-contain filter drop-shadow-[0_30px_60px_rgba(0,0,0,0.7)]"
              />
              <div className="absolute top-10 -right-4 sm:right-0 bg-espresso-800/90 backdrop-blur border border-gold/30 px-4 py-3 shadow-xl">
                <p className="text-[9px] uppercase tracking-widest text-gold">Signature Note</p>
                <p className="font-serif text-base text-ivory-100 mt-0.5">Baltic Amber</p>
              </div>
              <div className="absolute bottom-20 -left-4 sm:left-0 bg-espresso-800/90 backdrop-blur border border-gold/30 px-4 py-3 shadow-xl">
                <p className="text-[9px] uppercase tracking-widest text-gold">Longevity</p>
                <p className="font-serif text-base text-ivory-100 mt-0.5">12 – 14 Hours</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
