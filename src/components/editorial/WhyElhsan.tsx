import React from 'react';
import { Droplet, Clock, Crown, Heart, Sparkles } from 'lucide-react';

export const WhyElhsan: React.FC = () => {
  const pillars = [
    {
      icon: Droplet,
      title: 'PREMIUM INGREDIENTS',
      description: 'Finest carefully selected ingredients sourced from Grasse, Assam, and Kannauj.'
    },
    {
      icon: Clock,
      title: 'LONG LASTING',
      description: 'A memorable fragrance trail that stays with you for 12 to 16 enduring hours.'
    },
    {
      icon: Crown,
      title: 'LUXURY EXPERIENCE',
      description: 'Designed to make every moment feel special with hand-tied velvet presentation.'
    },
    {
      icon: Heart,
      title: 'CRUELTY FREE',
      description: 'Thoughtfully created with responsible values, phthalate-free and paraben-free.'
    }
  ];

  return (
    <section className="py-24 bg-[#FAF7F2] border-t border-ivory-300/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="h-[1px] w-6 bg-gold/60" />
            <span className="text-[11px] uppercase tracking-ultra-wide text-gold-muted font-semibold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-gold" />
              The ELHSAN Distinction
            </span>
            <span className="h-[1px] w-6 bg-gold/60" />
          </div>

          <h2 className="font-serif text-4xl sm:text-5xl text-espresso-900 tracking-tight font-light">
            Why ELHSAN
          </h2>
          <p className="text-sm sm:text-base text-espresso-600 font-light mt-3 leading-relaxed">
            The values and mastery that elevate our fragrances into unforgettable olfactory companions.
          </p>
          <div className="h-[1px] w-20 bg-gold/50 mx-auto mt-6" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="bg-white border border-ivory-300 hover:border-gold/50 p-8 text-center transition-all duration-500 hover:-translate-y-1 hover:shadow-xl group shadow-[0_4px_20px_rgba(23,18,15,0.03)]"
              >
                <div className="w-14 h-14 rounded-full bg-[#FAF7F2] border border-gold/30 flex items-center justify-center mx-auto text-gold-muted group-hover:bg-gold group-hover:text-espresso-900 transition-all duration-300 mb-6 shadow-xs">
                  <Icon className="w-6 h-6 stroke-[1.25]" />
                </div>
                <h3 className="font-serif text-base font-semibold text-espresso-900 tracking-wide uppercase group-hover:text-gold transition-colors">
                  {pillar.title}
                </h3>
                <p className="text-xs text-espresso-500 font-light leading-relaxed mt-3">
                  {pillar.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
