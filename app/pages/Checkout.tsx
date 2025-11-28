import React, { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useStore } from '@/app/store/useStore';
import { locales, cafCountries } from '@/app/locales';

// Country flag mapping (using emoji flags)
const countryFlags: { [key: string]: string } = {
  'Morocco': '🇲🇦',
  'Algeria': '🇩🇿',
  'Tunisia': '🇹🇳',
  'Egypt': '🇪🇬',
  'Libya': '🇱🇾',
  'Mauritania': '🇲🇷',
  'Sudan': '🇸🇩',
  'Mali': '🇲🇱',
  'Niger': '🇳🇪',
  'Chad': '🇹🇩',
  'Somalia': '🇸🇴',
  'Djibouti': '🇩🇯',
  'Comoros': '🇰🇲',
  'Senegal': '🇸🇳',
  'Gambia': '🇬🇲',
  'Guinea': '🇬🇳',
  'Guinea-Bissau': '🇬🇼',
  'Sierra Leone': '🇸🇱',
  'Liberia': '🇱🇷',
  'Ivory Coast': '🇨🇮',
  'Ghana': '🇬🇭',
  'Togo': '🇹🇬',
  'Benin': '🇧🇯',
  'Nigeria': '🇳🇬',
  'Cameroon': '🇨🇲',
  'Central African Republic': '🇨🇫',
  'Equatorial Guinea': '🇬🇶',
  'Gabon': '🇬🇦',
  'Republic of the Congo': '🇨🇬',
  'DR Congo': '🇨🇩',
  'Angola': '🇦🇴',
  'Zambia': '🇿🇲',
  'Zimbabwe': '🇿🇼',
  'Malawi': '🇲🇼',
  'Mozambique': '🇲🇿',
  'Namibia': '🇳🇦',
  'Botswana': '🇧🇼',
  'South Africa': '🇿🇦',
  'Lesotho': '🇱🇸',
  'Eswatini': '🇸🇿',
  'Madagascar': '🇲🇬',
  'Mauritius': '🇲🇺',
  'Seychelles': '🇸🇨',
  'Kenya': '🇰🇪',
  'Uganda': '🇺🇬',
  'Tanzania': '🇹🇿',
  'Rwanda': '🇷🇼',
  'Burundi': '🇧🇮',
  'Ethiopia': '🇪🇹',
  'Eritrea': '🇪🇷',
  'South Sudan': '🇸🇸'
};

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
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4">
        <h2 className="text-3xl font-bold text-morocco-dark mb-4">{t.empty_cart}</h2>
        <p className="text-morocco-dark/60 mb-8">Add some items to your cart to continue</p>
        <button
          onClick={() => router.push('/shop')}
          className="bg-morocco-dark text-white px-8 py-3 font-semibold hover:bg-black transition-colors"
        >
          {locales[language].nav.shop}
        </button>
      </div>
    )
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid lg:grid-cols-2 gap-8">

          {/* Form Section */}
          <div>
            <h1 className="text-2xl font-semibold text-morocco-dark mb-8">
              {t.contact_info}
            </h1>

            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Full Name */}
              <div>
                <label className="block text-sm text-morocco-dark/80 mb-2">
                  {t.full_name}<span className="text-red-500">*</span>
                </label>
                <input
                  required
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="w-full bg-white border border-gray-300 rounded px-4 py-3 text-sm text-morocco-dark outline-none focus:border-gray-400 transition-colors"
                />
              </div>

              {/* Email & Phone */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-morocco-dark/80 mb-2">
                    {t.email}<span className="text-red-500">*</span>
                  </label>
                  <input
                    required
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    className="w-full bg-white border border-gray-300 rounded px-4 py-3 text-sm text-morocco-dark outline-none focus:border-gray-400 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm text-morocco-dark/80 mb-2">
                    {t.phone}<span className="text-red-500">*</span>
                  </label>
                  <input
                    required
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+212 6XX XXX XXX"
                    className="w-full bg-white border border-gray-300 rounded px-4 py-3 text-sm text-morocco-dark outline-none focus:border-gray-400 transition-colors"
                  />
                </div>
              </div>

              {/* Country & City */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-morocco-dark/80 mb-2">
                    {t.country}<span className="text-red-500">*</span>
                  </label>
                  <select
                    required
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="w-full bg-white border border-gray-300 rounded px-4 py-3 text-sm text-morocco-dark outline-none focus:border-gray-400 transition-colors cursor-pointer"
                  >
                    {cafCountries.map(country => (
                      <option key={country} value={country}>
                        {countryFlags[country] || '🌍'} {country}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-morocco-dark/80 mb-2">
                    {t.city}<span className="text-red-500">*</span>
                  </label>
                  <input
                    required
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="City"
                    className="w-full bg-white border border-gray-300 rounded px-4 py-3 text-sm text-morocco-dark outline-none focus:border-gray-400 transition-colors"
                  />
                </div>
              </div>

              {/* Address */}
              <div>
                <label className="block text-sm text-morocco-dark/80 mb-2">
                  {t.address}<span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  name="address"
                  rows={3}
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Enter your address..."
                  className="w-full bg-white border border-gray-300 rounded px-4 py-3 text-sm text-morocco-dark outline-none focus:border-gray-400 transition-colors resize-none"
                />
              </div>

              {/* Notes */}
              <div>
                <label className="block text-sm text-morocco-dark/80 mb-2">
                  {t.notes}
                </label>
                <textarea
                  name="notes"
                  rows={3}
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="Enter a description..."
                  className="w-full bg-white border border-gray-300 rounded px-4 py-3 text-sm text-morocco-dark outline-none focus:border-gray-400 transition-colors resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-morocco-dark text-white py-4 font-semibold uppercase tracking-wide hover:bg-morocco-red transition-colors mt-6 cursor-pointer"
              >
                {t.submit}
              </button>
            </form>
          </div>

          {/* Cart Summary */}
          <div>
            <div className="bg-white rounded p-6">
              <h2 className="text-xl font-semibold text-morocco-dark mb-6">
                Your Cart
              </h2>

              {/* Cart Items */}
              <div className="space-y-4 mb-6">
                {cart.map(item => (
                  <div key={item.cartId} className="flex gap-4">
                    <div className="relative flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name[language]}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="absolute -top-2 -right-2 bg-black text-white w-5 h-5 rounded-full flex items-center justify-center text-xs font-semibold">
                        {item.quantity}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-morocco-dark text-sm truncate">{item.name[language]}</p>
                      <p className="text-xs text-gray-500 capitalize">{item.selectedColor} • {item.selectedSize}</p>
                    </div>
                    <div className="font-semibold text-morocco-dark whitespace-nowrap">
                      {item.price * item.quantity} MAD
                    </div>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="border-t border-gray-200 pt-4 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium text-morocco-dark">{getCartTotal()} MAD</span>
                </div>
                <div className="flex justify-between text-lg font-semibold pt-2 border-t border-gray-200">
                  <span className="text-morocco-dark">Total</span>
                  <span className="text-morocco-dark">{getCartTotal()} MAD</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
