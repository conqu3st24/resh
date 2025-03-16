import type { Review, ReviewsStats } from '../types/reviews';

export const mockReviews: Review[] = [
  {
    id: '1',
    productId: 1,
    author: {
      id: 'user1',
      name: 'Андрей Артемов',
      avatar: 'https://i.pravatar.cc/300?img=1'
    },
    rating: 2,
    date: '12 января 2024',
    content: 'Это уже моя 4 или даже 5 Leo 750R и по сравнению с прошлой, которая покупалась лет 5 назад, есть некоторые изменения. Клавиатура стала чуть меньше и более угловатой, индикация капслока с самой клавиши ушла в правый верхний угол. Лет 30 назад это было безальтернативным стандартом, но сейчас уже не так привычно, хотя это и мелочь. Больше всего радует, что в отличие от масс-маркет продуктов, тут не идут по пути удешевления продукта. Клавиатура не только не стала хуже, скорее стала лаконичнее и эргономичнее, кустомный корпус стал чуть более толстым. Упаковка на 45 грамм, на торце справа появился логотип. Появился блютуз, все так же нет бессмысленной RGB-подсветки, что очень радует.',
    photos: [],
    isVerifiedPurchase: true,
    helpfulCount: 3,
    unhelpfulCount: 0,
    response: {
      id: 'resp1',
      author: 'Reship',
      date: '12 января 2024',
      content: 'Андрей, написали вам на почту, предложили забрать клавиатуру на бесплатную диагностику.'
    }
  },
  {
    id: '2',
    productId: 1,
    author: {
      id: 'user2',
      name: 'Дмитрий Гусаров',
      avatar: 'https://i.pravatar.cc/300?img=2'
    },
    rating: 2,
    date: '12 января 2024',
    content: 'Это уже моя 4 или даже 5 Leo 750R и по сравнению с прошлой, которая покупалась лет 5 назад, есть некоторые изменения. Клавиатура стала чуть меньше и более угловатой, индикация капслока с самой клавиши ушла в правый верхний угол. Лет 30 назад это было безальтернативным стандартом, но сейчас уже не так привычно.',
    photos: [
      {
        id: 'photo1',
        url: 'https://www.techinn.com/f/13836/138365324/keychron-q1-mechanical-keyboard.jpg',
        thumbnailUrl: 'https://www.techinn.com/f/13836/138365324/keychron-q1-mechanical-keyboard.jpg'
      },
      {
        id: 'photo2',
        url: 'https://m.media-amazon.com/images/I/710AhDhS7HL.jpg',
        thumbnailUrl: 'https://m.media-amazon.com/images/I/710AhDhS7HL.jpg'
      },
      {
        id: 'photo3',
        url: 'https://cdn.shopify.com/s/files/1/0299/9497/5365/products/CapMonster-5_800x.jpg',
        thumbnailUrl: 'https://cdn.shopify.com/s/files/1/0299/9497/5365/products/CapMonster-5_800x.jpg'
      }
    ],
    isVerifiedPurchase: true,
    helpfulCount: 7,
    unhelpfulCount: 1
  },
  {
    id: '3',
    productId: 1,
    author: {
      id: 'user3',
      name: 'Екатерина Соколова',
      avatar: 'https://i.pravatar.cc/300?img=5'
    },
    rating: 5,
    date: '10 января 2024',
    content: 'Очень довольна покупкой! Клавиатура отлично собрана, приятно печатать, звук клавиш не раздражает. Подсветка равномерная, хотя я её редко включаю. Для работы самое то, особенно порадовало наличие отдельного блока с цифрами.',
    photos: [
      {
        id: 'photo4',
        url: 'https://m.media-amazon.com/images/I/71Zd6hAzB4L.jpg',
        thumbnailUrl: 'https://m.media-amazon.com/images/I/71Zd6hAzB4L.jpg'
      }
    ],
    isVerifiedPurchase: true,
    helpfulCount: 12,
    unhelpfulCount: 0
  },
  {
    id: '4',
    productId: 1,
    author: {
      id: 'user4',
      name: 'Алексей Новиков'
    },
    rating: 4,
    date: '5 января 2024',
    content: 'Хорошая клавиатура, но есть несколько недочетов. Во-первых, кабель немного коротковат для моего стола. Во-вторых, подставка для рук не входит в комплект, пришлось покупать отдельно. В остальном все отлично, особенно порадовали свитчи - тихие и с приятным тактильным откликом.',
    photos: [],
    isVerifiedPurchase: true,
    helpfulCount: 5,
    unhelpfulCount: 1
  },
  {
    id: '5',
    productId: 1,
    author: {
      id: 'user5',
      name: 'Игорь Петров',
      avatar: 'https://i.pravatar.cc/300?img=8'
    },
    rating: 1,
    date: '1 января 2024',
    content: 'Абсолютно разочарован. Клавиатура пришла с дефектом - некоторые клавиши западают, а другие срабатывают через раз. Подсветка на нескольких клавишах не работает. Упаковка была целая, так что это явно брак с завода. Буду возвращать и требовать замену.',
    photos: [
      {
        id: 'photo5',
        url: 'https://i.rtings.com/assets/products/1HOxeVKC/corsair-k70-rgb-pro/design-medium.jpg',
        thumbnailUrl: 'https://i.rtings.com/assets/products/1HOxeVKC/corsair-k70-rgb-pro/design-medium.jpg'
      },
      {
        id: 'photo6',
        url: 'https://cdn.mos.cms.futurecdn.net/AzJAujXjgJhbosPcvyrHK5.jpg',
        thumbnailUrl: 'https://cdn.mos.cms.futurecdn.net/AzJAujXjgJhbosPcvyrHK5.jpg'
      }
    ],
    isVerifiedPurchase: true,
    helpfulCount: 8,
    unhelpfulCount: 2,
    response: {
      id: 'resp2',
      author: 'Reship',
      date: '2 января 2024',
      content: 'Игорь, приносим извинения за доставленные неудобства. Мы уже связались с вами по электронной почте для организации возврата и замены товара. Проблема не типичная для этой модели, и мы обязательно проведём дополнительную проверку партии.'
    }
  }
];

export const getReviewsByProductId = (productId: number): Review[] => {
  return mockReviews.filter(review => review.productId === productId);
};

export const getReviewsStats = (productId: number): ReviewsStats => {
  const reviews = getReviewsByProductId(productId);
  
  // Подсчет количества отзывов для каждого рейтинга
  const ratingCounts = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0
  };
  
  reviews.forEach(review => {
    ratingCounts[review.rating]++;
  });
  
  // Расчет среднего рейтинга
  const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
  const averageRating = reviews.length > 0 ? totalRating / reviews.length : 0;
  
  // Подсчет других статистик
  const withPhotosCount = reviews.filter(review => review.photos.length > 0).length;
  const positiveCount = reviews.filter(review => review.rating >= 4).length;
  const negativeCount = reviews.filter(review => review.rating <= 2).length;
  
  return {
    averageRating,
    totalCount: reviews.length,
    ratingCounts,
    withPhotosCount,
    positiveCount,
    negativeCount
  };
}; 