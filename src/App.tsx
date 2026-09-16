import React, { useState } from 'react';
import { LuxuryPreloader } from './components/layout/LuxuryPreloader';
import { Hero } from './components/hero/Hero';
import { BrandStory } from './components/editorial/BrandStory';
import { ProductGrid } from './components/products/ProductGrid';
import { Craftsmanship } from './components/editorial/Craftsmanship';
import { RefinedMoments } from './components/editorial/RefinedMoments';
import { FragranceExperience } from './components/editorial/FragranceExperience';
import { AtelierLocation } from './components/editorial/AtelierLocation';
import { HauteFAQ } from './components/editorial/HauteFAQ';
import { Footer } from './components/layout/Footer';

import { ConciergeDrawer } from './components/layout/ConciergeDrawer';
import { CartDrawer } from './components/cart/CartDrawer';
import { CheckoutModal } from './components/checkout/CheckoutModal';
import { ProductDetailModal } from './components/modals/ProductDetailModal';
import { SearchModal } from './components/search/SearchModal';
import { WishlistDrawer } from './components/modals/WishlistDrawer';
import { CartToast } from './components/layout/CartToast';

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isConciergeOpen, setIsConciergeOpen] = useState(false);
  const [toastProduct, setToastProduct] = useState<{
    name: string;
    price: string | number;
    image: string;
  } | null>(null);
  const [isToastVisible, setIsToastVisible] = useState(false);

  const showToast = (prod: { name: string; price: string | number; image: string }) => {
    setToastProduct(prod);
    setIsToastVisible(true);
  };

  const handleNavigate = (id: string) => {
    setIsConciergeOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="site-canvas">
      {/* Luxury Preloader Entrance */}
      {isLoading && (
        <LuxuryPreloader
          minDuration={2800}
          onComplete={() => setIsLoading(false)}
        />
      )}

      {/* Main Luxury Site Canvas */}
      <div className={`site-frame ${!isLoading ? 'site-frame-visible' : ''}`}>
        {/* 1. Haute Parchment Hero with Integrated Navbar */}
        <Hero onOpenConcierge={() => setIsConciergeOpen(true)} />

        {/* 2. Brand Story / The Atelier Asymmetrical 3-Photo Collage (#about) */}
        <BrandStory />

        {/* 3. Curated Recommendation & Products Catalog (#collection) */}
        <ProductGrid onAddToCartToast={showToast} />

        {/* 4. Scent Craftsmanship & Interactive Anatomy (#craftsmanship) */}
        <Craftsmanship />

        {/* 5. Refined Moments Fragrances Grid (#moments) */}
        <RefinedMoments onExploreCollection={() => handleNavigate('collection')} />

        {/* 6. Parallax CTA Banner (#experience) */}
        <FragranceExperience onExplore={() => handleNavigate('collection')} />

        {/* 7. Flagship Boutique Atelier Location (#atelier) */}
        <AtelierLocation />

        {/* 8. Haute FAQ Section (#faq) */}
        <HauteFAQ />

        {/* 9. Haute Parfumerie Footer (#contact) */}
        <Footer />
      </div>

      {/* Luxury Concierge & Menu Slide-in Drawer */}
      <ConciergeDrawer
        isOpen={isConciergeOpen}
        onClose={() => setIsConciergeOpen(false)}
        onNavigate={handleNavigate}
      />

      {/* Luxury Quick View Product Detail Modal */}
      <ProductDetailModal onAddToCartToast={showToast} />

      {/* Floating Add to Cart Toast Notification */}
      <CartToast
        product={toastProduct}
        isVisible={isToastVisible}
        onClose={() => setIsToastVisible(false)}
      />

      {/* Global E-Commerce Drawers & Modals */}
      <CartDrawer />
      <CheckoutModal />
      <WishlistDrawer />
      <SearchModal />
    </div>
  );
};

export default App;
