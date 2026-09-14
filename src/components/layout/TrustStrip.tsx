import React from 'react';
import { Truck, Sparkles, ShieldCheck, RotateCcw } from 'lucide-react';
import { useCurrency } from '../../context/CurrencyContext';

export const TrustStrip: React.FC = () => {
  const { currency } = useCurrency();

  const guarantees = [
    {
      icon: Truck,
      title: 'FREE SHIPPING',
      description: currency === 'PKR' ? 'On orders over Rs 2,500' : 'On orders over $50'
    },
    {
      icon: Sparkles,
      title: 'PREMIUM QUALITY',
      description: 'Finest ingredients'
    },
    {
      icon: ShieldCheck,
      title: 'SECURE PAYMENT',
      description: '100% safe & secure'
    },
    {
      icon: RotateCcw,
      title: 'EASY RETURNS',
      description: 'Hassle-free returns'
    }
  ];

  return (
    <section className="bg-ivory-100 border-y border-ivory-300/80 py-7 text-espresso-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
          {guarantees.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-3.5 group"
              >
                <div className="w-10 h-10 rounded-full bg-white border border-gold/35 flex items-center justify-center shrink-0 text-gold-muted group-hover:bg-gold group-hover:text-espresso-900 transition-all duration-300 shadow-xs">
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-widest text-espresso-900 group-hover:text-gold transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-espresso-500 mt-0.5 font-light leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
