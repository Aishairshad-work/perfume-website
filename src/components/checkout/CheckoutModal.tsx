import React, { useState } from 'react';
import { X, Check, Sparkles, ShieldCheck, Truck, CreditCard, Banknote, ShoppingBag } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useCart } from '../../context/CartContext';
import { useCurrency } from '../../context/CurrencyContext';

export const CheckoutModal: React.FC = () => {
  const { isCheckoutOpen, setIsCheckoutOpen, cart, clearCart, subtotalUSD, subtotalPKR } = useCart();
  const { formatPrice, currency } = useCurrency();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: 'Lahore',
    notes: '',
    paymentMethod: 'cod' // 'cod' | 'card'
  });

  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoError, setPromoError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  if (!isCheckoutOpen) return null;

  const handlePromoApply = () => {
    if (promoCode.trim().toUpperCase() === 'ELHSAN10') {
      setDiscountPercent(10);
      setPromoError('');
    } else {
      setPromoError('Invalid promotional code. Try "ELHSAN10"');
    }
  };

  const currentSubtotal = currency === 'PKR' ? subtotalPKR : subtotalUSD;
  const discountAmount = Math.round((currentSubtotal * discountPercent) / 100);
  const finalTotal = currentSubtotal - discountAmount;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone || !formData.address) {
      alert('Please complete all required shipping fields.');
      return;
    }

    const genOrderNum = `ELH-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderNumber(genOrderNum);
    setIsSuccess(true);

    // Fire luxury golden confetti celebration
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#C5A059', '#DFC07B', '#EFE8DB', '#FFFFFF']
      });
    } catch {
      // ignore
    }

    clearCart();
  };

  const handleClose = () => {
    setIsCheckoutOpen(false);
    setIsSuccess(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6 lg:p-8">
      {/* Backdrop */}
      <div
        onClick={handleClose}
        className="fixed inset-0 bg-espresso-950/60 backdrop-blur-md transition-opacity"
      />

      <div className="relative w-full max-w-4xl bg-white border border-ivory-300 text-espresso-900 shadow-[0_25px_60px_rgba(28,25,23,0.2)] z-10 overflow-hidden my-auto">
        {/* Modal Top Bar */}
        <div className="px-6 py-4 border-b border-ivory-200 flex items-center justify-between bg-ivory-50">
          <div className="flex items-center gap-2.5">
            <img src="/assets/logo.png" alt="ELHSAN" className="w-6 h-6 object-contain filter drop-shadow" />
            <span className="font-serif tracking-widest text-base uppercase text-espresso-950 font-medium">
              ELHSAN &bull; Luxury Checkout
            </span>
          </div>
          <button
            onClick={handleClose}
            className="p-1.5 text-espresso-600 hover:text-gold-dark rounded-full hover:bg-ivory-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSuccess ? (
          /* Order Confirmed Screen */
          <div className="p-8 sm:p-12 text-center space-y-6 bg-white">
            <div className="w-16 h-16 rounded-full bg-champagne-100 border border-gold/40 mx-auto flex items-center justify-center text-gold-dark">
              <Check className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <span className="text-[11px] uppercase tracking-ultra-wide text-gold-dark font-semibold">
                Order Confirmed
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-espresso-950">
                Thank You For Your Distinction
              </h2>
              <p className="text-sm text-espresso-700 max-w-md mx-auto font-light leading-relaxed">
                Your order <span className="text-gold-dark font-mono font-semibold">#{orderNumber}</span> has been received into the ELHSAN Atelier.
                Our master artisans are now preparing your hand-tied velvet presentation and sealed flacons.
              </p>
            </div>

            <div className="bg-ivory-50 border border-ivory-300 max-w-md mx-auto p-5 text-left text-xs space-y-2.5 shadow-xs">
              <div className="flex justify-between">
                <span className="text-taupe">Recipient:</span>
                <span className="text-espresso-950 font-medium">{formData.fullName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-taupe">Delivery Address:</span>
                <span className="text-espresso-950 font-medium">{formData.address}, {formData.city}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-taupe">Payment:</span>
                <span className="text-gold-dark uppercase tracking-wider font-semibold">
                  {formData.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Credit / Debit Card'}
                </span>
              </div>
              <div className="flex justify-between border-t border-ivory-200 pt-2.5 font-serif text-sm">
                <span className="text-espresso-800 font-medium">Total Charged:</span>
                <span className="text-gold-dark font-bold">
                  {currency === 'PKR' ? `Rs ${finalTotal.toLocaleString()}` : `$${finalTotal.toFixed(0)}`}
                </span>
              </div>
            </div>

            <button
              onClick={handleClose}
              className="px-8 py-3.5 bg-espresso-950 hover:bg-black text-white font-semibold text-xs tracking-widest uppercase transition-all shadow-md hover:shadow-lg"
            >
              Return to Maison
            </button>
          </div>
        ) : (
          /* Checkout Form & Breakdown */
          <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-ivory-200">
            {/* Left 7 cols: Shipping Details */}
            <div className="lg:col-span-7 p-6 sm:p-8 space-y-6 bg-white">
              <div>
                <h3 className="text-xs uppercase tracking-widest text-gold-dark font-semibold flex items-center gap-2">
                  <Truck className="w-4 h-4" />
                  Delivery &amp; Client Details
                </h3>
                <p className="text-xs text-taupe font-light mt-1">
                  Complimentary express shipping on all orders with insured courier dispatch.
                </p>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <label className="block uppercase tracking-wider text-[10px] text-espresso-700 font-semibold mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Tariq Mansoor"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-white border border-ivory-300 text-espresso-950 placeholder:text-taupe-light focus:outline-none focus:border-gold"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block uppercase tracking-wider text-[10px] text-espresso-700 font-semibold mb-1">
                      Phone Number (For Delivery Updates) *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+92 300 1234567"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-white border border-ivory-300 text-espresso-950 placeholder:text-taupe-light focus:outline-none focus:border-gold"
                    />
                  </div>
                  <div>
                    <label className="block uppercase tracking-wider text-[10px] text-espresso-700 font-semibold mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="client@luxury.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-white border border-ivory-300 text-espresso-950 placeholder:text-taupe-light focus:outline-none focus:border-gold"
                    />
                  </div>
                </div>

                <div>
                  <label className="block uppercase tracking-wider text-[10px] text-espresso-700 font-semibold mb-1">
                    Street Address / Apartment *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="House / Plaza, Street, Sector / Area"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-white border border-ivory-300 text-espresso-950 placeholder:text-taupe-light focus:outline-none focus:border-gold"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block uppercase tracking-wider text-[10px] text-espresso-700 font-semibold mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-white border border-ivory-300 text-espresso-950 focus:outline-none focus:border-gold"
                    />
                  </div>
                  <div>
                    <label className="block uppercase tracking-wider text-[10px] text-espresso-700 font-semibold mb-1">
                      Special Courier Notes
                    </label>
                    <input
                      type="text"
                      placeholder="Gift wrap request, gate code..."
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-white border border-ivory-300 text-espresso-950 placeholder:text-taupe-light focus:outline-none focus:border-gold"
                    />
                  </div>
                </div>

                {/* Payment Selection */}
                <div className="pt-3">
                  <label className="block uppercase tracking-wider text-[10px] text-espresso-700 font-semibold mb-2">
                    Payment Method
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, paymentMethod: 'cod' })}
                      className={`p-3.5 border flex items-center gap-2.5 text-left transition-all ${
                        formData.paymentMethod === 'cod'
                          ? 'border-espresso-950 bg-ivory-100 text-espresso-950 shadow-xs'
                          : 'border-ivory-300 bg-white text-espresso-700 hover:border-gold'
                      }`}
                    >
                      <Banknote className="w-4 h-4 shrink-0 text-gold-dark" />
                      <div>
                        <p className="text-xs font-semibold uppercase">Cash on Delivery</p>
                        <p className="text-[9px] text-taupe">Pay when flacon arrives</p>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, paymentMethod: 'card' })}
                      className={`p-3.5 border flex items-center gap-2.5 text-left transition-all ${
                        formData.paymentMethod === 'card'
                          ? 'border-espresso-950 bg-ivory-100 text-espresso-950 shadow-xs'
                          : 'border-ivory-300 bg-white text-espresso-700 hover:border-gold'
                      }`}
                    >
                      <CreditCard className="w-4 h-4 shrink-0 text-gold-dark" />
                      <div>
                        <p className="text-xs font-semibold uppercase">Card Payment</p>
                        <p className="text-[9px] text-taupe">Visa / Mastercard / Union</p>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right 5 cols: Order Breakdown */}
            <div className="lg:col-span-5 p-6 sm:p-8 bg-ivory-50/80 flex flex-col justify-between space-y-6">
              <div>
                <h3 className="text-xs uppercase tracking-widest text-gold-dark font-semibold flex items-center gap-2 mb-4">
                  <ShoppingBag className="w-4 h-4" />
                  Order Summary ({cart.length} {cart.length === 1 ? 'Item' : 'Items'})
                </h3>

                {/* Items preview */}
                <div className="max-h-48 overflow-y-auto space-y-3 pr-1 text-xs divide-y divide-ivory-200">
                  {cart.map((item) => (
                    <div key={`${item.product.id}-${item.selectedVolume}`} className="flex items-center gap-3 pt-2 first:pt-0">
                      <div className="w-10 h-12 bg-white border border-ivory-300 flex-shrink-0 p-1 flex items-center justify-center shadow-2xs">
                        <img src={item.product.image} alt={item.product.name} className="w-full h-full object-contain filter drop-shadow" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-serif text-espresso-950 font-medium truncate">{item.product.name}</p>
                        <p className="text-[10px] text-taupe">{item.selectedVolume} &bull; Qty: {item.quantity}</p>
                      </div>
                      <span className="font-serif text-xs font-semibold text-espresso-900">
                        {formatPrice(item.product.price * item.quantity, item.product.pricePKR * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Promo code */}
                <div className="mt-5 pt-4 border-t border-ivory-300">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Promo code (Try ELHSAN10)"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="flex-1 px-3 py-2 bg-white border border-ivory-300 text-espresso-950 text-xs focus:outline-none focus:border-gold uppercase placeholder:text-taupe-light"
                    />
                    <button
                      type="button"
                      onClick={handlePromoApply}
                      className="px-3.5 py-2 bg-ivory-200/80 border border-ivory-300 text-espresso-900 text-xs font-semibold hover:bg-espresso-950 hover:text-white transition-colors uppercase tracking-wider cursor-pointer"
                    >
                      Apply
                    </button>
                  </div>
                  {discountPercent > 0 && (
                    <p className="text-[11px] text-gold-dark mt-1.5 flex items-center gap-1 font-medium">
                      <Sparkles className="w-3 h-3" />
                      10% Maison VIP Privilege applied!
                    </p>
                  )}
                  {promoError && (
                    <p className="text-[11px] text-red-600 mt-1.5">{promoError}</p>
                  )}
                </div>

                {/* Costs breakdown */}
                <div className="space-y-2 mt-5 text-xs text-espresso-700">
                  <div className="flex justify-between font-light">
                    <span>Subtotal</span>
                    <span className="font-medium text-espresso-950">
                      {currency === 'PKR' ? `Rs ${currentSubtotal.toLocaleString()}` : `$${currentSubtotal.toFixed(0)}`}
                    </span>
                  </div>
                  {discountPercent > 0 && (
                    <div className="flex justify-between text-gold-dark font-medium">
                      <span>Privilege Discount ({discountPercent}%)</span>
                      <span>-{currency === 'PKR' ? `Rs ${discountAmount.toLocaleString()}` : `$${discountAmount.toFixed(0)}`}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-light">
                    <span>Express Insured Shipping</span>
                    <span className="text-gold-dark uppercase tracking-wider text-[10px] font-semibold">Complimentary</span>
                  </div>
                  <div className="flex justify-between font-light">
                    <span>Velvet Gift Pouch &amp; Seal</span>
                    <span className="text-gold-dark uppercase tracking-wider text-[10px] font-semibold">Included</span>
                  </div>
                  <div className="h-px bg-ivory-300 my-2" />
                  <div className="flex justify-between text-base font-serif font-bold text-espresso-950">
                    <span>Grand Total</span>
                    <span className="text-gold-dark">
                      {currency === 'PKR' ? `Rs ${finalTotal.toLocaleString()}` : `$${finalTotal.toFixed(0)}`}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-3 pt-4">
                <button
                  type="submit"
                  className="w-full py-4 bg-espresso-950 hover:bg-black text-white text-xs font-semibold uppercase tracking-widest transition-all shadow-md hover:shadow-lg cursor-pointer"
                >
                  Confirm &amp; Place Order
                </button>

                <div className="flex items-center justify-center gap-1.5 text-[10px] text-taupe uppercase tracking-widest">
                  <ShieldCheck className="w-3.5 h-3.5 text-gold-dark" />
                  <span>256-Bit Encrypted Secure Checkout</span>
                </div>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
