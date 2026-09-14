import React from 'react';
import { Star, ShieldCheck, Sparkles } from 'lucide-react';
import { REVIEWS_DATA } from '../../data/perfumesData';

export const ReviewsSection: React.FC = () => {
  return (
    <section id="reviews" className="py-24 bg-ivory-50 border-t border-ivory-300/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="h-[1px] w-6 bg-gold/60" />
            <span className="text-[11px] uppercase tracking-ultra-wide text-gold-muted font-semibold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-gold" />
              Connoisseur Acclaims
            </span>
            <span className="h-[1px] w-6 bg-gold/60" />
          </div>

          <h2 className="font-serif text-4xl sm:text-5xl text-espresso-900 tracking-tight font-light">
            Words of Distinction
          </h2>
          <p className="text-sm sm:text-base text-espresso-600 font-light mt-3 leading-relaxed">
            Honest reflections from fragrance lovers and collectors across Pakistan and the Emirates.
          </p>
          <div className="h-[1px] w-20 bg-gold/50 mx-auto mt-6" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {REVIEWS_DATA.map((review) => (
            <div
              key={review.id}
              className="bg-white border border-ivory-300 hover:border-gold/50 p-6 flex flex-col justify-between shadow-[0_4px_20px_rgba(23,18,15,0.03)] hover:shadow-[0_12px_30px_rgba(197,160,89,0.12)] transition-all duration-300 group"
            >
              <div>
                {/* Rating */}
                <div className="flex text-gold mb-3">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-gold" />
                  ))}
                </div>

                <h4 className="font-serif text-sm font-semibold text-espresso-900 mb-2 leading-snug group-hover:text-gold transition-colors">
                  &ldquo;{review.title}&rdquo;
                </h4>

                <p className="text-xs text-espresso-600 font-light leading-relaxed">
                  {review.comment}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-ivory-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-serif text-xs font-semibold text-espresso-900">
                      {review.author}
                    </p>
                    <p className="text-[10px] text-espresso-500 font-light">
                      {review.location}
                    </p>
                  </div>
                  {review.verified && (
                    <span className="text-[9px] uppercase tracking-wider text-gold-muted font-semibold flex items-center gap-0.5">
                      <ShieldCheck className="w-3 h-3" /> Verified
                    </span>
                  )}
                </div>

                <span className="block mt-2 text-[9px] text-gold-muted font-medium uppercase tracking-wider">
                  &bull; {review.fragranceName}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
