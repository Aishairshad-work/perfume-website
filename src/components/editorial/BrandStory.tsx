import React from 'react';
import { ArrowRight } from 'lucide-react';

export const BrandStory: React.FC = () => {
  return (
    <section id="brand-story" className="bg-ivory-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px]">
          {/* Left: Editorial Text */}
          <div className="flex flex-col justify-center px-8 sm:px-16 lg:px-20 py-20">
            <p className="text-xs uppercase tracking-widest text-gold font-semibold mb-4">
              The Art of Perfume
            </p>
            <h2 className="font-serif text-4xl sm:text-5xl xl:text-6xl text-espresso-900 font-light leading-tight">
              Crafted With
              <br />
              <span className="italic text-gold">Passion</span>
            </h2>
            <div className="h-[1px] w-16 bg-gold/50 my-8" />

            <p className="text-base text-espresso-500 font-light leading-relaxed mb-6">
              ELHSAN is born from a singular pursuit — the creation of fragrances that transcend the
              ordinary. Using rare botanicals sourced from the fields of Grasse, the oud forests of
              Assam, and the rose valleys of Turkey, each ELHSAN creation is a testament to the art
              of true haute parfumerie.
            </p>

            <p className="text-base text-espresso-500 font-light leading-relaxed mb-10">
              Every flacon that leaves our atelier carries within it an intimate story — six weeks of
              maceration, hand-testing by our master parfumeur, and final presentation in hand-tied
              burlap pouches that speak of heritage and care.
            </p>

            <button
              onClick={() => {
                const el = document.getElementById('craftsmanship');
                if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - 80, behavior: 'smooth' });
              }}
              className="group flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-espresso-900 hover:text-gold transition-colors w-fit"
            >
              Discover Our Craft
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>

            <div className="grid grid-cols-3 gap-6 mt-12 pt-10 border-t border-gold/20">
              <div>
                <p className="font-serif text-3xl text-espresso-900 font-semibold">1200+</p>
                <p className="text-xs uppercase tracking-wider text-espresso-400 mt-1">Happy Collectors</p>
              </div>
              <div>
                <p className="font-serif text-3xl text-espresso-900 font-semibold">12+</p>
                <p className="text-xs uppercase tracking-wider text-espresso-400 mt-1">Unique Accords</p>
              </div>
              <div>
                <p className="font-serif text-3xl text-espresso-900 font-semibold">6wk</p>
                <p className="text-xs uppercase tracking-wider text-espresso-400 mt-1">Maturation Time</p>
              </div>
            </div>
          </div>

          {/* Right: Lifestyle Photography */}
          <div className="relative h-[500px] lg:h-auto overflow-hidden bg-espresso-900">
            <img
              src="/assets/content1.JPG"
              alt="ELHSAN velvet presentation and luxury gift packaging"
             className="relative h-[500px] lg:h-auto overflow-hidden bg-espresso-900"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-transparent to-espresso-900/30" />
            <div className="absolute bottom-10 left-10 right-10 bg-espresso-900/80 backdrop-blur-sm border border-gold/30 p-6">
              <p className="font-cormorant text-xl italic text-ivory-100 font-light leading-relaxed">
                &ldquo;A signature scent is not simply worn.
                <br />
                It becomes part of the memory.&rdquo;
              </p>
              <span className="block mt-2 text-xs text-gold tracking-widest uppercase">— The ELHSAN Philosophy</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
