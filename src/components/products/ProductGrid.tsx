import React, { useState, useRef, useEffect } from 'react';
import { ShoppingBag, Eye } from 'lucide-react';
import { PERFUMES_DATA } from '../../data/perfumesData';
import { Product } from '../../types/perfume';
import { useCart } from '../../context/CartContext';
import { useCurrency } from '../../context/CurrencyContext';

interface ProductGridProps {
  onAddToCartToast?: (product: { name: string; price: string | number; image: string }) => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({ onAddToCartToast }) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isInView, setIsInView] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [addedId, setAddedId] = useState<string | null>(null);

  const { addToCart, setQuickViewProduct } = useCart();
  const { formatPrice } = useCurrency();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const categories = [
    { id: 'all', label: `All Creations (${PERFUMES_DATA.length})` },
    { id: 'oud', label: 'Oud & Amber' },
    { id: 'fresh', label: 'Fresh & Marine' },
    { id: 'floral', label: 'Floral & Rose' },
    { id: 'concentre', label: 'Concentré Roll-Ons' }
  ];

  const filteredProducts = PERFUMES_DATA.filter(product => {
    if (activeCategory === 'all') return true;
    if (activeCategory === 'oud') {
      return product.category.toLowerCase().includes('oud') || product.category.toLowerCase().includes('amber');
    }
    if (activeCategory === 'fresh') {
      return product.category.toLowerCase().includes('fresh') || product.category.toLowerCase().includes('marine') || product.category.toLowerCase().includes('citrus');
    }
    if (activeCategory === 'floral') {
      return product.category.toLowerCase().includes('floral') || product.category.toLowerCase().includes('rose');
    }
    if (activeCategory === 'concentre') {
      return product.type.toLowerCase().includes('roll-on') || product.type.toLowerCase().includes('concentré');
    }
    return true;
  });

  const handleQuickAdd = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    addToCart(product, 1);
    setAddedId(product.id);
    if (onAddToCartToast) {
      onAddToCartToast({
        name: product.name,
        price: formatPrice(product.price, product.pricePKR),
        image: product.image
      });
    }
    setTimeout(() => setAddedId(null), 1800);
  };

  const getPedestalTone = (index: number) => {
    const tones = ['#e6d8c3', '#ded1be', '#e2d5c1', '#dbcfbb', '#ebdcc8', '#dfd3bf'];
    return tones[index % tones.length];
  };

  return (
    <section
      className={`editorial-collection-section ${isInView ? 'in-view' : ''}`}
      id="collection"
      ref={sectionRef}
    >
      <div className="collection-bg-glow" />

      <div className="collection-wrapper">
        {/* Editorial Header Row */}
        <div className="editorial-header-row">
          <div className="editorial-header-left">
            <div className="kicker-badge">
              <span className="editorial-kicker font-sans">CURATED FOR NOBILITY</span>
            </div>
            <h2 className="editorial-title font-cinzel">
              <span className="title-line">Our recommendation for</span>
              <span className="title-line title-highlight">your personality</span>
            </h2>
          </div>

          <div className="editorial-header-right">
            <div className="tabs-scroll-container">
              <div className="editorial-tabs-track">
                {categories.map(cat => (
                  <button
                    key={cat.id}
                    className={`editorial-tab-pill ${activeCategory === cat.id ? 'active-pill' : ''}`}
                    onClick={() => setActiveCategory(cat.id)}
                  >
                    <span>{cat.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Editorial Products Grid */}
        <div className="editorial-products-grid">
          {filteredProducts.map((product, idx) => (
            <div
              key={product.id}
              className="editorial-product-card"
              style={{ animationDelay: `${idx * 0.12}s` }}
              onClick={() => setQuickViewProduct(product)}
            >
              {/* Product Frame with Lighting & Pedestal */}
              <div className="editorial-image-frame">
                <div className="editorial-sunlight-ray" />
                <div className="editorial-backdrop-drape" />

                {/* Badge if present */}
                {product.badge && (
                  <span className="absolute top-3 left-3 z-20 px-2.5 py-1 text-[10px] font-sans font-bold tracking-widest uppercase bg-[#1a1610]/80 text-[#dfb758] backdrop-blur-md rounded border border-[#dfb758]/30">
                    {product.badge}
                  </span>
                )}

                {/* Bottle Display */}
                <div className="editorial-bottle-stage">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="editorial-bottle-img"
                  />
                </div>

                {/* Travertine Pedestal Slab */}
                <div
                  className="travertine-pedestal-slab"
                  style={{ backgroundColor: getPedestalTone(idx) }}
                >
                  <div className="slab-top-bevel" />
                  <div className="bottle-travertine-shadow" />
                </div>

                {/* Quick Add Button */}
                <button
                  className={`editorial-quick-add ${addedId === product.id ? 'is-added' : ''}`}
                  onClick={e => handleQuickAdd(e, product)}
                  aria-label={`Add ${product.name} to bag`}
                >
                  <ShoppingBag size={13} />
                  <span>{addedId === product.id ? 'ADDED' : 'ADD TO BAG'}</span>
                </button>
              </div>

              {/* Product Card Metadata */}
              <div className="editorial-meta-row">
                <div className="meta-left-details">
                  <div className="product-name-urdu">
                    <span className="name-en font-cinzel">{product.name}</span>
                  </div>
                  <p className="product-olfactory-notes font-sans">
                    {product.category}
                  </p>
                </div>

                <div className="meta-right-price">
                  <span className="product-exact-price font-sans">
                    {formatPrice(product.price, product.pricePKR)}
                  </span>
                  <span className="product-volume-label font-sans">
                    {product.volume}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
