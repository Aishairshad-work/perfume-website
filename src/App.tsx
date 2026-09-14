import React from 'react';
import { Navbar } from './components/layout/Navbar';
import { Hero } from './components/hero/Hero';
import { TrustStrip } from './components/layout/TrustStrip';
import { CollectionGrid } from './components/collections/CollectionGrid';
import { BrandStory } from './components/editorial/BrandStory';
import { ProductGrid } from './components/products/ProductGrid';
import { CloneCampaign } from './components/editorial/CloneCampaign';
import { Craftsmanship } from './components/editorial/Craftsmanship';
import { SecondCloneCampaign } from './components/editorial/SecondCloneCampaign';
import { FragranceExperience } from './components/editorial/FragranceExperience';
import { WhyElhsan } from './components/editorial/WhyElhsan';
import { ReviewsSection } from './components/editorial/ReviewsSection';
import { NewsletterCTA } from './components/editorial/NewsletterCTA';
import { Footer } from './components/layout/Footer';

import { CartDrawer } from './components/cart/CartDrawer';
import { CheckoutModal } from './components/checkout/CheckoutModal';
import { ProductDetailModal } from './components/modals/ProductDetailModal';
import { SearchModal } from './components/search/SearchModal';
import { WishlistDrawer } from './components/modals/WishlistDrawer';
import { ToastNotification } from './components/layout/ToastNotification';

export const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-ivory-50 text-espresso-900 selection:bg-gold-light/40 selection:text-espresso-900">
      {/* Navigation */}
      <Navbar />

      {/* Main Luxury Content Flow */}
      <main>
        {/* 1. Bright & Airy Luxury Fragrance Hero */}
        <Hero />

        {/* 2. Refined Trust & Guarantee Strip */}
        <TrustStrip />

        {/* 3. Shop by Collection (Editorial Tiles) */}
        <CollectionGrid />

        {/* 4. Brand Story / The Atelier (Split Screen Editorial) */}
        <BrandStory />

        {/* 5. Best Selling Products Catalog & Filter Tabs */}
        <ProductGrid />

        {/* 6. Character Campaign 1: "WEAR YOUR SIGNATURE" (clone.png) */}
        <CloneCampaign />

        {/* 7. Artisanal Craftsmanship ("Behind Every Drop") */}
        <Craftsmanship />

        {/* 8. Character Campaign 2: "MAKE IT YOURS." (clone1.png) */}
        <SecondCloneCampaign />

        {/* 9. Immersive Dark Fragrance Experience ("MORE THAN A FRAGRANCE.") */}
        <FragranceExperience />

        {/* 10. The 4 Benefits (Why ELHSAN) */}
        <WhyElhsan />

        {/* 11. Connoisseur Acclaims / Client Reviews */}
        <ReviewsSection />

        {/* 12. Final Cinematic CTA Newsletter */}
        <NewsletterCTA />
      </main>

      {/* 13. Dark Haute Parfumerie Footer */}
      <div id="footer">
        <Footer />
      </div>

      {/* Global E-Commerce Overlays & Modals */}
      <CartDrawer />
      <CheckoutModal />
      <ProductDetailModal />
      <SearchModal />
      <WishlistDrawer />
      <ToastNotification />
    </div>
  );
};

export default App;
