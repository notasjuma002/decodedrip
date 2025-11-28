import React, { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useStore } from '@/app/store/useStore';
import { locales, cafCountries } from '@/app/locales';

const Checkout: React.FC = () => {
  const { cart, getCartTotal, language, clearCart } = useStore();
  const router = useRouter();
  const t = locales[language].checkout;
  const commonT = locales[language].common;

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    country: 'Morocco',
    city: '',
    address: '',
    email: '',
    notes: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const orderData = {
      items: cart,
      total: getCartTotal(),
      customer: formData,
      orderDate: new Date().toISOString(),
    };

    console.log('Order Submitted:', orderData);
    alert(t.success_alert);
    clearCart();
    router.push('/');
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
        <h2 className="text-2xl font-bold text-morocco-dark">{t.empty_cart}</h2>
        <button onClick={() => router.push('/shop')} className="text-morocco-red underline">{locales[language].nav.shop}</button>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-morocco-dark mb-12 uppercase tracking-widest font-serif border-b border-morocco-gold/20 pb-4">
        {t.title}
      </h1>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Form */}
        <div>
          <h2 className="text-xl font-bold mb-6 text-morocco-green">{t.contact_info}</h2>
          <form onSubmit={handleSubmit} className="space-y-6">

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-morocco-dark/80">{t.full_name} *</label>
              <input
                required
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full bg-white border border-morocco-dark/10 p-3 outline-none focus:border-morocco-gold transition-colors"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-morocco-dark/80">{t.phone} *</label>
                <input
                  required
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full bg-white border border-morocco-dark/10 p-3 outline-none focus:border-morocco-gold transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-morocco-dark/80">{t.email}</label>
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-white border border-morocco-dark/10 p-3 outline-none focus:border-morocco-gold transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-morocco-dark/80">{t.country} *</label>
                <select
                  required
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="w-full bg-white border border-morocco-dark/10 p-3 outline-none focus:border-morocco-gold transition-colors"
                >
                  {cafCountries.map(country => (
                    <option key={country} value={country}>{country}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-morocco-dark/80">{t.city} *</label>
                <input
                  required
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full bg-white border border-morocco-dark/10 p-3 outline-none focus:border-morocco-gold transition-colors"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-morocco-dark/80">{t.address} *</label>
              <textarea
                required
                name="address"
                rows={3}
                value={formData.address}
                onChange={handleChange}
                className="w-full bg-white border border-morocco-dark/10 p-3 outline-none focus:border-morocco-gold transition-colors"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-morocco-dark/80">{t.notes}</label>
              <textarea
                name="notes"
                rows={2}
                value={formData.notes}
                onChange={handleChange}
                className="w-full bg-white border border-morocco-dark/10 p-3 outline-none focus:border-morocco-gold transition-colors"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-morocco-red text-white py-4 font-bold tracking-widest uppercase hover:bg-morocco-dark transition-colors mt-8"
            >
              {t.submit}
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <div className="bg-white p-8 h-fit border border-morocco-neutral">
          <h2 className="text-xl font-bold mb-6 text-morocco-dark">{commonT.total}</h2>
          <div className="space-y-4 mb-6">
            {cart.map(item => (
              <div key={item.cartId} className="flex justify-between items-start text-sm">
                <div className="flex gap-4">
                  <span className="font-bold text-morocco-dark/50">{item.quantity}x</span>
                  <div>
                    <p className="font-medium text-morocco-dark">{item.name[language]}</p>
                    <p className="text-xs text-morocco-dark/50">{item.selectedColor}</p>
                  </div>
                </div>
                <span className="font-bold text-morocco-dark">{item.price * item.quantity} MAD</span>
              </div>
            ))}
          </div>

          <div className="border-t border-morocco-dark/10 pt-6 flex justify-between items-center text-xl font-bold">
            <span>{locales[language].cart.subtotal}</span>
            <span className="text-morocco-green">{getCartTotal()} MAD</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
