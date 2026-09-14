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
    <footer className="bg-[#F7F3EB] text-espresso-700 border-t border-gold/25">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/assets/logo.png"
                alt="ELHSAN Logo"
                className="h-10 w-auto object-contain filter drop-shadow-xs"
              />
              <div className="flex flex-col justify-center leading-none">
                <span className="font-serif text-xl tracking-[0.24em] font-medium text-espresso-900 uppercase">
                  ELHSAN
                </span>
                <span className="text-[8px] uppercase tracking-[0.38em] text-gold-muted font-medium mt-1">
                  HAUTE PARFUMERIE
                </span>
              </div>
            </div>

            <p className="text-sm text-espresso-600 font-light leading-relaxed mb-6">
              Born from a singular pursuit — the creation of fragrances that transcend the ordinary.
              Artisanal. Purposeful. Eternal.
            </p>

            {/* Newsletter */}
            <div>
              <p className="text-[10px] uppercase tracking-widest text-espresso-800 mb-2.5 font-semibold">
                Join the Inner Circle
              </p>
              <div className="flex shadow-xs">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-1 px-3.5 py-2.5 bg-white border border-gold/30 text-espresso-900 text-xs placeholder:text-espresso-400 focus:outline-none focus:border-gold transition-colors"
                />
                <button className="px-4.5 py-2.5 bg-espresso-900 hover:bg-gold text-ivory-50 hover:text-espresso-900 text-xs font-bold uppercase transition-colors cursor-pointer">
                  Join
                </button>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-[10px] uppercase tracking-ultra-wide text-gold-muted font-semibold mb-5">
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
                    className="text-espresso-600 hover:text-espresso-900 hover:underline transition-colors cursor-pointer text-sm font-light"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h4 className="text-[10px] uppercase tracking-ultra-wide text-gold-muted font-semibold mb-5">
              Client Services
            </h4>
            <ul className="space-y-3 text-sm text-espresso-600 font-light">
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
            <h4 className="text-[10px] uppercase tracking-ultra-wide text-gold-muted font-semibold mb-5">
              Contact the Atelier
            </h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-gold-muted shrink-0 mt-0.5" />
                <span className="text-espresso-600 font-light">+92 300 0000000</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-gold-muted shrink-0 mt-0.5" />
                <span className="text-espresso-600 font-light">hello@elhsan.com</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-gold-muted shrink-0 mt-0.5" />
                <span className="text-espresso-600 font-light">Lahore, Pakistan</span>
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
                  className="w-9 h-9 rounded-full border border-gold/35 bg-white flex items-center justify-center text-espresso-700 hover:text-espresso-900 hover:border-gold hover:bg-champagne-light/50 transition-all duration-300 shadow-xs"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-ivory-300/80 py-5 px-4 bg-[#F2EDE3]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-espresso-500">
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 text-gold-muted" />
            <span>&copy; {new Date().getFullYear()} ELHSAN Haute Parfumerie. All rights reserved.</span>
          </div>
          <div className="flex gap-6 font-medium">
            <span className="hover:text-espresso-900 transition-colors cursor-pointer">Privacy Policy</span>
            <span className="hover:text-espresso-900 transition-colors cursor-pointer">Terms of Service</span>
            <span className="hover:text-espresso-900 transition-colors cursor-pointer">Ingredient Policy</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
