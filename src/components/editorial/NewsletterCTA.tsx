import React, { useState } from 'react';
import { Sparkles, ArrowRight, Check } from 'lucide-react';

export const NewsletterCTA: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmail('');
    }, 4000);
  };

  return (
    <section className="relative py-24 sm:py-28 overflow-hidden bg-gradient-to-r from-champagne-light/60 via-[#F7F2EB] to-champagne-light/60 text-espresso-900 border-t border-ivory-300/80">
      {/* Background with supplied lifestyle image and light luxury warm overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img
          src="/assets/content2.jpg"
          alt="ELHSAN luxury packaging and golden flacons"
          className="w-full h-full object-cover opacity-15 filter brightness-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ivory-50/80 via-transparent to-ivory-50/80" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Eyebrow */}
        <div className="inline-flex items-center justify-center gap-2 mb-4">
          <span className="h-[1px] w-8 bg-gold/60" />
          <span className="text-[11px] uppercase tracking-ultra-wide text-gold-muted font-semibold flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            The Inner Circle
          </span>
          <span className="h-[1px] w-8 bg-gold/60" />
        </div>

        {/* Heading */}
        <h2 className="font-serif text-4xl sm:text-5xl xl:text-6xl text-espresso-900 font-light tracking-tight leading-tight">
          STAY IN THE SCENT OF <br />
          <span className="text-gold-gradient italic font-serif">LUXURY</span>
        </h2>

        {/* Text */}
        <p className="text-sm sm:text-base text-espresso-600 font-light mt-4 max-w-xl mx-auto leading-relaxed">
          Discover new arrivals, exclusive offers, and stories from ELHSAN.
          Receive an exclusive 10% privilege on your debut flacon with code <strong className="text-espresso-900 font-semibold">ELHSAN10</strong>.
        </p>

        {/* Input & Button */}
        <div className="mt-9 max-w-md mx-auto">
          {subscribed ? (
            <div className="p-4 bg-white/95 border border-gold/40 text-espresso-900 text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg animate-fadeIn font-medium">
              <Check className="w-4 h-4 text-gold-muted" />
              Welcome to the ELHSAN Private Circle
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 sm:gap-0 shadow-sm">
              <input
                type="email"
                required
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-3.5 bg-white/95 border border-gold/40 text-espresso-900 placeholder:text-espresso-400 text-xs focus:outline-none focus:border-gold shadow-xs"
              />
              <button
                type="submit"
                className="px-7 py-3.5 bg-espresso-900 hover:bg-gold text-ivory-50 hover:text-espresso-900 text-xs font-semibold uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 shrink-0 cursor-pointer shadow-md"
              >
                SUBSCRIBE &rarr;
              </button>
            </form>
          )}
        </div>

        <p className="text-[10px] text-espresso-500 mt-4 tracking-wider uppercase font-medium">
          Complimentary cancellation at any moment &bull; No spam guaranteed
        </p>
      </div>
    </section>
  );
};
