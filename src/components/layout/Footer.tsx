import React from 'react';
import { Instagram, Facebook, Twitter, Mail, Phone, MapPin, Sparkles } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-espresso-950 text-ivory-300 border-t border-gold/15">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <img
                src="/assets/logo.png"
                alt="ELHSAN Logo"
                className="w-8 h-8 object-contain filter drop-shadow-[0_2px_8px_rgba(197,160,89,0.3)]"
              />
              <span className="font-serif text-2xl tracking-[0.25em] text-ivory-100 uppercase">
                ELHSAN
              </span>
            </div>
            <p className="text-[10px] uppercase tracking-ultra-wide text-gold mb-5">
              Haute Parfumerie
            </p>
            <p className="text-sm text-ivory-400 font-light leading-relaxed mb-6">
              Born from a singular pursuit — the creation of fragrances that transcend the ordinary.
              Artisanal. Purposeful. Eternal.
            </p>

            {/* Newsletter */}
            <div>
              <p className="text-[10px] uppercase tracking-widest text-ivory-300 mb-3 font-medium">
                Join the Inner Circle
              </p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-1 px-3 py-2.5 bg-espresso-800 border border-gold/20 text-ivory-100 text-xs placeholder:text-ivory-500 focus:outline-none focus:border-gold transition-colors"
                />
                <button className="px-4 py-2.5 bg-gold hover:bg-gold-light text-espresso-900 text-xs font-bold uppercase transition-colors">
                  Join
                </button>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-[10px] uppercase tracking-ultra-wide text-gold font-semibold mb-5">
              The House
            </h4>
            <ul className="space-y-3 text-sm">
              {[
                { label: 'Home', section: 'hero' },
                { label: 'Collections', section: 'collections' },
                { label: 'Fragrance Catalog', section: 'products' },
                { label: 'Brand Story', section: 'brand-story' },
                { label: 'Craftsmanship', section: 'craftsmanship' },
                { label: 'Client Reviews', section: 'reviews' },
              ].map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => scrollToSection(link.section)}
                    className="text-ivory-400 hover:text-gold transition-colors cursor-pointer text-sm font-light"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h4 className="text-[10px] uppercase tracking-ultra-wide text-gold font-semibold mb-5">
              Client Services
            </h4>
            <ul className="space-y-3 text-sm text-ivory-400 font-light">
              <li>Free Express Delivery</li>
              <li>Artisanal Gift Packaging</li>
              <li>Cash on Delivery (COD)</li>
              <li>Easy 7-Day Returns</li>
              <li>Authentic Essences Guarantee</li>
              <li>Cruelty-Free Certified</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[10px] uppercase tracking-ultra-wide text-gold font-semibold mb-5">
              Contact the Atelier
            </h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                <span className="text-ivory-400 font-light">+92 300 0000000</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                <span className="text-ivory-400 font-light">hello@elhsan.com</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                <span className="text-ivory-400 font-light">Lahore, Pakistan</span>
              </li>
            </ul>

            {/* Social Links */}
            <div className="flex gap-3 mt-6">
              {[
                { icon: Instagram, label: 'Instagram' },
                { icon: Facebook, label: 'Facebook' },
                { icon: Twitter, label: 'Twitter/X' },
              ].map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="w-9 h-9 rounded-full border border-gold/30 flex items-center justify-center text-ivory-400 hover:text-gold hover:border-gold hover:bg-gold/10 transition-all duration-300"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5 py-5 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-ivory-500">
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 text-gold" />
            <span>© {new Date().getFullYear()} ELHSAN Haute Parfumerie. All rights reserved.</span>
          </div>
          <div className="flex gap-6">
            <span className="hover:text-gold transition-colors cursor-pointer">Privacy Policy</span>
            <span className="hover:text-gold transition-colors cursor-pointer">Terms of Service</span>
            <span className="hover:text-gold transition-colors cursor-pointer">Ingredient Policy</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
