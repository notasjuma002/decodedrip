export type Language = 'en' | 'fr' | 'ar';

export type LocalizedString = {
  [key in Language]: string;
};

export interface Product {
  id: string;
  name: LocalizedString;
  price: number;
  category: 'Hoodie' | 'T-Shirt' | 'Sweater' | 'Accessories';
  image: string;
  images: string[];
  description: LocalizedString;
  isFeatured?: boolean;
  country?: string;
}

export interface CartItem extends Product {
  cartId: string;
  selectedColor: 'Black' | 'White';
  selectedSize: string;
  quantity: number;
}

export interface OrderData {
  items: CartItem[];
  total: number;
  customer: {
    fullName: string;
    phone: string;
    country: string;
    city: string;
    address: string;
    email?: string;
    notes?: string;
  };
}

export interface TranslationStructure {
  nav: {
    home: string;
    shop: string;
    faq: string;
    contact: string;
    launch: string;
  };
  hero: {
    headline: string;
    subtext: string;
    cta_primary: string;
    cta_secondary: string;
  };
  common: {
    view_item: string;
    add_to_cart: string;
    checkout: string;
    total: string;
    quantity: string;
    color: string;
    size: string;
    select_size: string;
    remove: string;
    loading: string;
    price: string;
    featured: string;
    rights: string;
    authentic: string;
    authentic_desc: string;
    licensed: string;
    newsletter_title: string;
    newsletter_desc: string;
    subscribe: string;
    secure_payment: string;
    returns_policy: string;
    returns_desc: string;
    social_share: string;
    delivery_terms: string;
    size_guide: string;
    // Product Page
    limited_edition: string;
    free_delivery: string;
    exchange_policy: string;
    cash_on_delivery: string;
    high_quality_fabric: string;
    product_description_title: string;
    product_description: string;
    product_details_title: string;
    product_detail_1: string;
    product_detail_2: string;
    product_detail_3: string;
    product_detail_4: string;
    product_detail_5: string;
  };
  shop: {
    title: string;
    subtitle: string;
    filter_all: string;
    hoodie: string;
    tshirt: string;
    sweater: string;
    accessories: string;
    empty: string;
    sort_by: string;
    price_low_high: string;
    price_high_low: string;
    newest: string;
  };
  cart: {
    title: string;
    empty: string;
    subtotal: string;
    proceed: string;
  };
  checkout: {
    title: string;
    contact_info: string;
    full_name: string;
    phone: string;
    country: string;
    city: string;
    address: string;
    email: string;
    notes: string;
    submit: string;
    success_alert: string;
    empty_cart: string;
  };
  faq: {
    title: string;
    q1: string; a1: string;
    q2: string; a2: string;
    q3: string; a3: string;
    q4: string; a4: string;
  };
  footer: {
    rights: string;
  };
}