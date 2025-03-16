import { Product, ProductFeature, ProductOption, ProductReview, Order, UserProfile } from '../types/index';

// Mock products for ProductGrid and similar components
export const products: Product[] = [
  {
    id: 1,
    title: 'Sora v2 Superlight Wireless Gaming Mouse',
    brand: 'Ninjutso x Vaxee',
    price: 9299,
    popularity: 80,
    rating: 4.0,
    reviewCount: 60,
    image: 'https://maxgaming.com/img/cms/Logitech/G%20PRO%20X%20SUPERLIGHT/Logitech_G_PRO_X_SUPERLIGHT_Black_1.jpg',
    inStock: true,
    colors: [
      { id: 'black', name: 'Черный', hex: '#000000' },
      { id: 'white', name: 'Белый', hex: '#FFFFFF' }
    ]
  },
  {
    id: 2,
    title: 'Koi — Overshadow the Flowers',
    brand: 'Varmilo',
    price: 8000,
    oldPrice: 15000,
    popularity: 95,
    rating: 4.3,
    reviewCount: 60,
    image: 'https://maxgaming.com/img/cms/Varmilo/Varmilo_Sakura_Deskmat_1.jpg',
    discount: 47,
    inStock: true,
    colors: [
      { id: 'pink', name: 'Розовый', hex: '#F9A8D4' },
      { id: 'white', name: 'Белый', hex: '#FFFFFF' }
    ]
  },
  {
    id: 3,
    title: 'Sora Superlight Wireless',
    brand: 'Ninjutso x Vaxee',
    price: 9299,
    popularity: 75,
    rating: 4.0,
    reviewCount: 123,
    image: 'https://maxgaming.com/img/cms/Logitech/G%20PRO%20X%20SUPERLIGHT/Logitech_G_PRO_X_SUPERLIGHT_Black_1.jpg',
    inStock: true,
    colors: [
      { id: 'black', name: 'Черный', hex: '#000000' },
      { id: 'purple', name: 'Фиолетовый', hex: '#7C3AED' }
    ]
  },
  {
    id: 4,
    title: 'Sword X 8K Magnesium Eva Purple',
    brand: 'WLmouse',
    price: 10299,
    popularity: 65,
    rating: 4.5,
    reviewCount: 129,
    image: 'https://maxgaming.com/img/cms/Logitech/G%20PRO%20X%20SUPERLIGHT/Logitech_G_PRO_X_SUPERLIGHT_White_1.jpg',
    isNew: true,
    inStock: true,
    colors: [
      { id: 'purple', name: 'Фиолетовый', hex: '#7C3AED' },
      { id: 'green', name: 'Зеленый', hex: '#10B981' }
    ]
  },
  {
    id: 5,
    title: 'Varmilo Koi — Overshadow the Flowers',
    brand: 'Varmilo',
    price: 8000,
    oldPrice: 15000,
    popularity: 92,
    rating: 4.3,
    reviewCount: 60,
    image: 'https://maxgaming.com/img/cms/Varmilo/Varmilo_Sakura_Deskmat_1.jpg',
    discount: 47,
    inStock: true
  },
  {
    id: 6,
    title: 'WLmouse Beast X Max 8K',
    brand: 'WLmouse',
    price: 10299,
    popularity: 68,
    rating: 4.5,
    reviewCount: 60,
    image: 'https://maxgaming.com/img/cms/Logitech/G%20PRO%20X%20SUPERLIGHT/Logitech_G_PRO_X_SUPERLIGHT_White_1.jpg',
    isNew: true,
    inStock: true
  },
  {
    id: 7,
    title: 'Sora v2 Superlight Wireless Gaming Mouse',
    brand: 'Sora',
    price: 15000,
    popularity: 78,
    rating: 4.0,
    reviewCount: 60,
    image: 'https://maxgaming.com/img/cms/Logitech/G%20PRO%20X%20SUPERLIGHT/Logitech_G_PRO_X_SUPERLIGHT_Black_1.jpg',
    inStock: true
  },
  {
    id: 8,
    title: 'Varmilo Koi — Overshadow the Flowers',
    brand: 'Varmilo',
    price: 8000,
    oldPrice: 15000,
    popularity: 90,
    rating: 4.3,
    reviewCount: 60,
    image: 'https://maxgaming.com/img/cms/Varmilo/Varmilo_Sakura_Deskmat_1.jpg',
    discount: 47,
    inStock: true
  },
  {
    id: 5,
    title: 'Hyperlight 8K Gaming Mouse',
    brand: 'HITSCAN',
    price: 12299,
    popularity: 75,
    rating: 4.7,
    reviewCount: 10,
    image: 'https://maxgaming.com/img/cms/Logitech/G403/Logitech_G403_Gaming_Mouse_1.jpg',
    inStock: true,
    isPreorder: true,
    colors: [
      { id: 'black', name: 'Черный', hex: '#000000' }
    ]
  },
  {
    id: 6,
    title: 'X3 Wireless',
    brand: 'Pulsar',
    price: 9299,
    popularity: 70,
    rating: 4.6,
    reviewCount: 33,
    image: 'https://maxgaming.com/img/cms/Glorious/Model_O_Wireless/Glorious_Model_O_Wireless_Black_1.jpg',
    inStock: true,
    colors: [
      { id: 'black', name: 'Черный', hex: '#000000' },
      { id: 'blue', name: 'Синий', hex: '#1D4ED8' }
    ]
  }
];

// Product details mock data
export const productDetails = {
  id: 1,
  title: 'Leopold FC750R BT Light Pink',
  brand: 'Leopold',
  price: 15000,
  oldPrice: 17000,
  discount: 12,
  rating: 4.7,
  reviewCount: 18,
  availability: 'В наличии',
  description: 'Механическая клавиатура Leopold FC750R BT Light Pink с переключателями Cherry MX Red. Беспроводное и проводное подключение, компактный формат без цифрового блока, розовый цвет корпуса.',
  features: [
    { name: 'Интерфейс', value: 'USB-C, Bluetooth 5.0' },
    { name: 'Переключатели', value: 'Cherry MX Red' },
    { name: 'Формат', value: 'TKL (без цифрового блока)' },
    { name: 'Цвет', value: 'Розовый' },
    { name: 'Материал корпуса', value: 'ABS-пластик' },
    { name: 'Тип подсветки', value: 'Нет' }
  ],
  images: [
    'https://maxgaming.com/img/cms/Ducky/Ducky%20One%203/Ducky_One_3_TKL_Daybreak_ISO_1.jpg',
    'https://maxgaming.com/img/cms/Ducky/Ducky%20One%203/Ducky_One_3_TKL_Daybreak_ISO_2.jpg',
    'https://maxgaming.com/img/cms/Ducky/Ducky%20One%203/Ducky_One_3_TKL_Daybreak_ISO_3.jpg',
    'https://maxgaming.com/img/cms/Ducky/Ducky%20One%203/Ducky_One_3_TKL_Daybreak_ISO_4.jpg'
  ],
  switchOptions: [
    { id: 'red', name: 'Cherry MX Red', color: 'bg-red-500' },
    { id: 'blue', name: 'Cherry MX Blue', color: 'bg-blue-500' },
    { id: 'brown', name: 'Cherry MX Brown', color: 'bg-amber-800' },
    { id: 'black', name: 'Cherry MX Black', color: 'bg-black' },
    { id: 'silver', name: 'Cherry MX Silver', color: 'bg-gray-300' }
  ],
  colorOptions: [
    { id: 'pink', name: 'Розовый', color: 'bg-pink-300' },
    { id: 'white', name: 'Белый', color: 'bg-white border border-gray-200' },
    { id: 'black', name: 'Черный', color: 'bg-gray-900' }
  ],
  reviews: [
    {
      id: 1,
      author: 'Александр С.',
      date: '15.03.2023',
      rating: 5,
      text: 'Отличная клавиатура! Приятный звук переключателей, хорошее качество сборки. Рекомендую!'
    },
    {
      id: 2,
      author: 'Мария П.',
      date: '02.02.2023',
      rating: 4,
      text: 'Клавиатура понравилась, но к цвету надо привыкнуть. Немного ярче, чем на фото.'
    },
    {
      id: 3,
      author: 'Дмитрий К.',
      date: '20.01.2023',
      rating: 5,
      text: 'Топовая клава, звук приятный, тактильные ощущения на высоте. За эти деньги - лучшее, что можно найти.'
    }
  ]
};

// Similar products for product page
export const similarProducts: Product[] = [
  {
    id: 2,
    title: 'Varmilo VA88M Sakura',
    brand: 'Varmilo',
    price: 12000,
    rating: 4.5,
    reviewCount: 42,
    image: 'https://maxgaming.com/img/cms/Varmilo/VA88M/Varmilo_VA88M_Sakura_White_LED_MX_Brown_US_1.jpg',
    inStock: true
  },
  {
    id: 3,
    title: 'Ducky One 3 Daybreak',
    brand: 'Ducky',
    price: 13500,
    rating: 4.8,
    reviewCount: 36,
    image: 'https://maxgaming.com/img/cms/Ducky/Ducky%20One%203/Ducky_One_3_TKL_Daybreak_ISO_3.jpg',
    inStock: true
  },
  {
    id: 4,
    title: 'Keychron K8 Pro',
    brand: 'Keychron',
    price: 9000,
    rating: 4.6,
    reviewCount: 28,
    image: 'https://maxgaming.com/img/cms/Keychron/K8%20Pro/Keychron_K8_Pro_QMK_VIA_Wireless_Mechanical_Keyboard_Carbon_Black_Gateron_G_Pro_Red_1.jpg',
    inStock: true
  },
  {
    id: 5,
    title: 'GMMK Pro',
    brand: 'Glorious',
    price: 16000,
    rating: 4.7,
    reviewCount: 52,
    image: 'https://maxgaming.com/img/cms/Glorious/GMMK/GMMK_Pro_Black_Slate_ISO_1.jpg',
    inStock: true
  }
];

// Orders for account page
export const orders: Order[] = [
  {
    id: 10043,
    date: '15.06.2023',
    status: 'delivered',
    total: 15990,
    items: [
      {
        id: 1,
        title: 'Ducky One 3 Daybreak',
        price: 15990,
        quantity: 1,
        image: 'https://maxgaming.com/img/cms/Ducky/Ducky%20One%203/Ducky_One_3_TKL_Daybreak_ISO_1.jpg'
      }
    ]
  },
  {
    id: 10042,
    date: '02.05.2023',
    status: 'shipped',
    total: 23980,
    items: [
      {
        id: 2,
        title: 'Logitech G Pro X Superlight',
        price: 13990,
        quantity: 1,
        image: 'https://maxgaming.com/img/cms/Logitech/G%20PRO%20X%20SUPERLIGHT/Logitech_G_PRO_X_SUPERLIGHT_Black_1.jpg'
      },
      {
        id: 3,
        title: 'Artisan Hien FX XSOFT (XL)',
        price: 9990,
        quantity: 1,
        image: 'https://maxgaming.com/img/cms/Artisan/Artisan_Hien_Series_Gaming_Mouse_Pad_Wine_Red_700x.jpg'
      }
    ]
  },
  {
    id: 10041,
    date: '14.04.2023',
    status: 'cancelled',
    total: 7990,
    items: [
      {
        id: 4,
        title: 'HyperX Cloud II',
        price: 7990,
        quantity: 1,
        image: 'https://maxgaming.com/img/cms/HyperX/Cloud%20II/HyperX_Cloud_II_Red_1.jpg'
      }
    ]
  }
];

// User profile for account page
export const userProfile: UserProfile = {
  firstName: 'Александр',
  lastName: 'Иванов',
  email: 'alexander@example.com',
  phone: '+7 (921) 123-45-67',
  avatar: 'https://i.pravatar.cc/150?img=32'
};

// Favorites for account page
export const favorites: Product[] = [
  {
    id: 1,
    title: 'Varmilo VA88M Sakura',
    brand: 'Varmilo',
    price: 12000,
    rating: 4.5,
    image: 'https://maxgaming.com/img/cms/Varmilo/VA88M/Varmilo_VA88M_Sakura_White_LED_MX_Brown_US_1.jpg',
    inStock: true,
    reviewCount: 42
  },
  {
    id: 2,
    title: 'Pulsar X2 Mini Wireless',
    brand: 'Pulsar',
    price: 9900,
    oldPrice: 12900,
    rating: 4.8,
    image: 'https://maxgaming.com/img/cms/Pulsar/X2%20Mini/Pulsar_X2_Mini_Wireless_White_1.jpg',
    inStock: true,
    reviewCount: 36
  },
  {
    id: 3,
    title: 'Razer BlackShark V2 Pro',
    brand: 'Razer',
    price: 14500,
    rating: 4.6,
    image: 'https://maxgaming.com/img/cms/Razer/Blackshark%20V2%20Pro/Razer_BlackShark_V2_Pro_Wireless_Gaming_Headset_1.jpg',
    inStock: false,
    reviewCount: 28
  }
];

// Brands for BrandSlider
export const brands = [
  { id: 1, name: 'Logitech', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2d/Logitech_logo.svg' },
  { id: 2, name: 'Razer', logo: 'https://upload.wikimedia.org/wikipedia/en/7/74/Razer_logo.svg' },
  { id: 3, name: 'Corsair', logo: 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Corsair_logo.svg' },
  { id: 4, name: 'SteelSeries', logo: 'https://upload.wikimedia.org/wikipedia/commons/d/d6/SteelSeries_logo.svg' },
  { id: 5, name: 'HyperX', logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a8/HyperX_logo.svg' },
  { id: 6, name: 'Glorious', logo: 'https://www.gloriousgaming.com/cdn/shop/files/glorious-vector-white.png?v=1678480422' }
]; 