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
    <section className="relative py-28 overflow-hidden bg-espresso-950 text-ivory-100 border-t border-gold/20">
      {/* Background with supplied lifestyle image and luxury dark overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/content2.jpg"
          alt="ELHSAN luxury packaging and golden flacons"
          className="w-full h-full object-cover opacity-25 filter grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-espresso-950 via-espresso-950/90 to-espresso-950/80" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Eyebrow */}
        <div className="inline-flex items-center justify-center gap-2 mb-4">
          <span className="h-[1px] w-8 bg-gold/60" />
          <span className="text-[11px] uppercase tracking-ultra-wide text-gold font-semibold flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            The Inner Circle
          </span>
          <span className="h-[1px] w-8 bg-gold/60" />
        </div>

        {/* Heading */}
        <h2 className="font-serif text-4xl sm:text-5xl xl:text-6xl text-ivory-50 font-light tracking-tight leading-tight">
          STAY IN THE SCENT OF <br />
          <span className="text-gold-gradient italic font-serif">LUXURY</span>
        </h2>

        {/* Text */}
        <p className="text-sm sm:text-base text-ivory-300 font-light mt-4 max-w-xl mx-auto leading-relaxed">
          Discover new arrivals, exclusive offers and stories from ELHSAN.
          Receive an exclusive 10% privilege on your debut flacon.
        </p>

        {/* Input & Button */}
        <div className="mt-10 max-w-md mx-auto">
          {subscribed ? (
            <div className="p-4 bg-espresso-900/90 border border-gold/40 text-gold text-xs uppercase tracking-widest flex items-center justify-center gap-2 animate-fadeIn">
              <Check className="w-4 h-4" />
              Welcome to the ELHSAN Private Circle
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 sm:gap-0">
              <input
                type="email"
                required
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-3.5 bg-espresso-900/80 border border-gold/30 text-ivory-100 placeholder:text-ivory-500 text-xs focus:outline-none focus:border-gold backdrop-blur-sm"
              />
              <button
                type="submit"
                className="px-6 py-3.5 bg-gold hover:bg-gold-light text-espresso-900 text-xs font-semibold uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 shrink-0 cursor-pointer shadow-[0_10px_20px_rgba(197,160,89,0.25)]"
              >
                SUBSCRIBE &rarr;
              </button>
            </form>
          )}
        </div>

        <p className="text-[10px] text-ivory-400 mt-4 tracking-wider uppercase">
          Complimentary cancellation at any moment &bull; No spam guaranteed
        </p>
      </div>
    </section>
  );
};
