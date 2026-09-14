import React from 'react';
import { Leaf, Award, Flame, Package } from 'lucide-react';

export const Craftsmanship: React.FC = () => {
  const steps = [
    {
      icon: Leaf,
      step: '01',
      title: 'Rare Botanical Sourcing',
      text: 'Our master parfumeur hand-selects ingredients from Grasse, Kannauj, Turkey, and Assam. Each raw material undergoes rigorous quality testing before approval.'
    },
    {
      icon: Flame,
      step: '02',
      title: 'Cold Press & Distillation',
      text: 'Essential oils are extracted using cold press or steam distillation at precise temperatures, preserving the delicate aromatic molecules in their most expressive form.'
    },
    {
      icon: Award,
      step: '03',
      title: 'Six-Week Maceration',
      text: 'Accords rest and deepen for a minimum of six weeks in temperature-controlled ceramic vessels. Time is the most precious ingredient in every ELHSAN creation.'
    },
    {
      icon: Package,
      step: '04',
      title: 'Artisanal Presentation',
      text: 'Each flacon is individually inspected, hand-sealed, and presented in signature burlap pouches with a gold-stamped ELHSAN crest — ready to be gifted or treasured.'
    }
  ];

  return (
    <section id="craftsmanship" className="bg-ivory-50 py-24 border-t border-ivory-300/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-16 items-center">
          {/* Left: Photography Grid */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="overflow-hidden h-64 sm:h-80 shadow-md">
                <img
                  src="/assets/content.JPG"
                  alt="ELHSAN artisan dispatch workshop"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="overflow-hidden h-64 sm:h-80 mt-8 shadow-md">
                <img
                  src="/assets/content2.jpg"
                  alt="Black marble pedestal with gold ELHSAN crest"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-md border border-gold/40 px-6 py-3.5 text-center shadow-xl whitespace-nowrap">
              <p className="font-serif text-gold-muted text-lg font-semibold">Certified</p>
              <p className="text-[10px] uppercase tracking-widest text-espresso-600 mt-0.5 font-medium">Cruelty Free &bull; Phthalate Free</p>
            </div>
          </div>

          {/* Right: Process Steps */}
          <div>
            <p className="text-xs uppercase tracking-widest text-gold-muted font-semibold mb-3">
              The Artisanal Process
            </p>
            <h2 className="font-serif text-4xl sm:text-5xl text-espresso-900 font-light leading-tight mb-8">
              Behind Every
              <br />
              <span className="italic text-gold-gradient font-serif">Drop</span>
            </h2>

            <div className="space-y-7">
              {steps.map((step, idx) => {
                const Icon = step.icon;
                return (
                  <div key={idx} className="flex gap-5 group">
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 rounded-full border border-gold/40 bg-white flex items-center justify-center text-gold-muted group-hover:bg-gold group-hover:text-espresso-900 transition-all duration-300 shrink-0 shadow-xs">
                        <Icon className="w-4 h-4" />
                      </div>
                      {idx < steps.length - 1 && (
                        <div className="w-px flex-1 bg-gold/25 mt-3" />
                      )}
                    </div>
                    <div className="pb-6">
                      <p className="text-[10px] text-gold-muted uppercase tracking-widest font-semibold mb-1">Step {step.step}</p>
                      <h4 className="font-serif text-lg text-espresso-900 font-medium mb-1.5">{step.title}</h4>
                      <p className="text-sm text-espresso-600 font-light leading-relaxed">{step.text}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
