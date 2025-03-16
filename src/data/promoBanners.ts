interface PromoBanner {
  id: string;
  category: string;
  title: string;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
  backgroundImage: string;
  productImage?: string;
  productName?: string;
  productLink?: string;
}

const promoBanners: PromoBanner[] = [
  {
    id: 'mice-banner',
    category: 'mice',
    title: 'Новинка недели: Sword X 8K Magnesium Eva Purple',
    subtitle: 'Ультралегкий вес 60г, сенсор 8K, RGB-подсветка и элементы из магния в конструкции',
    buttonText: 'Подробнее о новинке',
    buttonLink: '/product/wlmouse-sword-x-8k',
    backgroundImage: 'https://preview.redd.it/y7fve7hhf3y51.jpg?width=1920&format=pjpg&auto=webp&s=ee1d41a6a5c1d4cc0e958c7368ed0a1b425d9e1c',
    productImage: 'https://images.maxgaming.com/data/product/RGB2f/finalmouse_starlight-12_phantom_small1.jpg',
    productName: 'WLmouse Sword X 8K Magnesium Eva Purple',
    productLink: '/product/wlmouse-sword-x-8k'
  },
  {
    id: 'keyboards-banner',
    category: 'keyboards',
    title: 'Keychron Q1 Pro: беспроводная механика премиум-класса',
    subtitle: 'Полностью алюминиевый корпус, горячая замена свитчей, QMK/VIA и до 300 часов работы',
    buttonText: 'Выбрать клавиатуру',
    buttonLink: '/product/keychron-q1-pro',
    backgroundImage: 'https://cdn.mos.cms.futurecdn.net/HvjfsZHXDZ2366WEzLQG4H.jpg',
    productImage: 'https://keychron.com/cdn/shop/files/Keychron-Q1-Pro-hot-swappable-knob-keyboard-navy-blue-with-keycaps_600x600.jpg',
    productName: 'Keychron Q1 Pro Wireless Custom Mechanical Keyboard',
    productLink: '/product/keychron-q1-pro'
  },
  {
    id: 'headphones-banner',
    category: 'headsets',
    title: 'HyperX Cloud Alpha Wireless: 300 часов без подзарядки',
    subtitle: 'Погрузитесь в игровой мир с технологией DTS Spatial Audio и уникальной автономностью',
    buttonText: 'Купить сейчас',
    buttonLink: '/product/hyperx-cloud-alpha-wireless',
    backgroundImage: 'https://cdn.shopify.com/s/files/1/0030/6018/5434/products/hyperx-cloud-alpha-wireless-headset-1_1200x1200.jpg',
    productImage: 'https://resource.logitechg.com/d_transparent.gif/content/dam/gaming/en/products/cloud-alpha-wireless/cloud-alpha-wireless-gallery-1.png',
    productName: 'HyperX Cloud Alpha Wireless',
    productLink: '/product/hyperx-cloud-alpha-wireless'
  },
  {
    id: 'sale-banner',
    category: 'sale',
    title: 'Уцененные товары со скидкой до 50%',
    subtitle: 'Витринные образцы, товары из открытой упаковки и восстановленные устройства с гарантией',
    buttonText: 'Выбрать товар',
    buttonLink: '/sale',
    backgroundImage: 'https://i.rtings.com/assets/products/eJkyKZKe/steelseries-prime-wireless/design-large.jpg',
    productImage: 'https://resource.logitechg.com/w_386,ar_1.0,c_limit,f_auto,q_auto,dpr_2.0/d_transparent.gif/content/dam/gaming/en/non-braid/hyjal-g502-hero/g502-hero-gallery-1-nb.png',
    productName: 'Logitech G502 Hero — скидка 45%',
    productLink: '/product/logitech-g502-hero'
  },
  {
    id: 'default-banner',
    category: 'default',
    title: 'Игровая периферия для профессионалов',
    subtitle: 'Получите преимущество с высокоточными устройствами от ведущих производителей',
    buttonText: 'Смотреть товары',
    buttonLink: '/catalog',
    backgroundImage: 'https://assets2.razerzone.com/images/pnx.assets/d451695b8031593843404e42e63c4083/razer-esports-pdp-desktop-v1.jpg'
  }
];

export const getBannerByCategory = (category: string): PromoBanner => {
  const banner = promoBanners.find(banner => banner.category === category);
  return banner || promoBanners.find(banner => banner.category === 'default')!;
};

export default promoBanners; 