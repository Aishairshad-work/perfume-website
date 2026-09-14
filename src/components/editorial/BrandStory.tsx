import React from 'react';
import { ArrowRight } from 'lucide-react';

export const BrandStory: React.FC = () => {
  return (
    <section id="brand-story" className="bg-ivory-50 border-t border-ivory-300/80">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px] items-stretch">
          {/* Left: Editorial Text */}
          <div className="flex flex-col justify-center px-8 sm:px-14 lg:px-18 py-16 lg:py-24">
            <p className="text-xs uppercase tracking-widest text-gold-muted font-semibold mb-3">
              The Art of Perfume
            </p>
            <h2 className="font-serif text-4xl sm:text-5xl xl:text-6xl text-espresso-900 font-light leading-tight">
              Crafted With
              <br />
              <span className="italic text-gold-gradient font-serif">Passion</span>
            </h2>
            <div className="h-[1px] w-16 bg-gold/50 my-6" />

            <p className="text-base text-espresso-600 font-light leading-relaxed mb-5">
              ELHSAN is born from a singular pursuit — the creation of fragrances that transcend the
              ordinary. Using rare botanicals sourced from the fields of Grasse, the oud forests of
              Assam, and the rose valleys of Turkey, each ELHSAN creation is a testament to the art
              of true haute parfumerie.
            </p>

            <p className="text-base text-espresso-600 font-light leading-relaxed mb-8">
              Every flacon that leaves our atelier carries within it an intimate story — six weeks of
              maceration, hand-testing by our master parfumeur, and final presentation in hand-tied
              velvet and artisanal packaging that speak of heritage and care.
            </p>

            <button
              onClick={() => {
                const el = document.getElementById('craftsmanship');
                if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - 80, behavior: 'smooth' });
              }}
              className="group flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-espresso-900 hover:text-gold transition-colors w-fit cursor-pointer"
            >
              Discover Our Craft
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>

            <div className="grid grid-cols-3 gap-6 mt-10 pt-8 border-t border-gold/25">
              <div>
                <p className="font-serif text-3xl text-espresso-900 font-semibold">1200+</p>
                <p className="text-xs uppercase tracking-wider text-espresso-500 mt-1">Happy Collectors</p>
              </div>
              <div>
                <p className="font-serif text-3xl text-espresso-900 font-semibold">12+</p>
                <p className="text-xs uppercase tracking-wider text-espresso-500 mt-1">Unique Accords</p>
              </div>
              <div>
                <p className="font-serif text-3xl text-espresso-900 font-semibold">6wk</p>
                <p className="text-xs uppercase tracking-wider text-espresso-500 mt-1">Maturation Time</p>
              </div>
            </div>
          </div>

          {/* Right: Lifestyle Photography */}
          <div className="relative h-[460px] lg:h-auto min-h-[460px] overflow-hidden bg-ivory-200">
            <img
              src="/assets/content1.JPG"
              alt="ELHSAN velvet presentation and luxury gift packaging"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            <div className="absolute bottom-8 left-6 right-6 sm:bottom-10 sm:left-10 sm:right-10 bg-white/90 backdrop-blur-md border border-gold/40 p-6 shadow-xl">
              <p className="font-serif text-lg sm:text-xl italic text-espresso-900 font-light leading-relaxed">
                &ldquo;A signature scent is not simply worn.
                <br />
                It becomes part of the memory.&rdquo;
              </p>
              <span className="block mt-2.5 text-xs text-gold-muted tracking-widest uppercase font-semibold">— The ELHSAN Philosophy</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
