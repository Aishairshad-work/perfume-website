import React, { useState, useMemo } from 'react';
import { Sparkles, SlidersHorizontal } from 'lucide-react';
import { PERFUMES_DATA } from '../../data/perfumesData';
import { ProductCard } from './ProductCard';

export const ProductGrid: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('all');

  const tabs = [
    { id: 'all', label: 'All Creations' },
    { id: 'bestseller', label: 'Best Sellers' },
    { id: 'edp', label: 'Eau de Parfum' },
    { id: 'rollon', label: 'Concentré Oils' },
    { id: 'unisex', label: 'Unisex' },
    { id: 'men', label: 'Men' },
    { id: 'women', label: 'Women' }
  ];

  const filteredProducts = useMemo(() => {
    switch (activeTab) {
      case 'bestseller':
        return PERFUMES_DATA.filter((p) => p.featured || p.badge?.includes('BEST') || p.badge?.includes('ICONIC'));
      case 'edp':
        return PERFUMES_DATA.filter((p) => p.type === 'Eau de Parfum' || p.type === 'Parfum Extrait');
      case 'rollon':
        return PERFUMES_DATA.filter((p) => p.type === 'Concentré Roll-On');
      case 'unisex':
        return PERFUMES_DATA.filter((p) => p.gender === 'Unisex');
      case 'men':
        return PERFUMES_DATA.filter((p) => p.gender === 'Men');
      case 'women':
        return PERFUMES_DATA.filter((p) => p.gender === 'Women');
      default:
        return PERFUMES_DATA;
    }
  }, [activeTab]);

  return (
    <section id="products" className="py-24 bg-ivory-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="h-[1px] w-6 bg-gold/60" />
            <span className="text-[11px] uppercase tracking-ultra-wide text-gold font-semibold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              Artisanal Olfactory Catalog
            </span>
            <span className="h-[1px] w-6 bg-gold/60" />
          </div>

          <h2 className="font-serif text-4xl sm:text-5xl text-espresso-900 tracking-tight font-light leading-tight">
            Best Selling Products
          </h2>
          <p className="text-sm sm:text-base text-espresso-500 font-light mt-4 leading-relaxed">
            Distilled from rare botanical absolutes, cold-pressed citrus, and aged oriental resins.
            Every ELHSAN creation is designed to linger as an indelible memory.
          </p>
          <div className="h-[1px] w-24 bg-gold/40 mx-auto mt-6" />
        </div>

        {/* Filter Tabs Strip */}
        <div className="flex items-center justify-center mb-12 overflow-x-auto pb-3 scrollbar-none">
          <div className="inline-flex items-center gap-2 p-1.5 bg-ivory-200/80 rounded-full border border-gold/20 shadow-inner">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 sm:px-5 py-2 text-xs uppercase tracking-wider rounded-full transition-all duration-300 whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'bg-espresso-900 text-gold shadow-md font-semibold'
                      : 'text-espresso-600 hover:text-espresso-900 hover:bg-ivory-300/60 font-medium'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Products Count Indicator */}
        <div className="flex items-center justify-between text-xs text-espresso-400 mb-6 px-1">
          <span className="uppercase tracking-widest text-[11px] flex items-center gap-1.5">
            <SlidersHorizontal className="w-3.5 h-3.5 text-gold" />
            Showing {filteredProducts.length} Exceptional {filteredProducts.length === 1 ? 'Flacon' : 'Flacons'}
          </span>
          <span className="font-light italic text-[11px]">Hand-blended in small artisan batches</span>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};
