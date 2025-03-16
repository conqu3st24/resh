export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  publishDate: string;
  readTime: string;
  category: string;
  slug: string;
  author: {
    name: string;
    avatar?: string;
  };
  isFeatured?: boolean;
}

export type BlogCategory = 
  | 'Все статьи'
  | 'Обзоры'
  | 'Гайды'
  | 'Новости'
  | 'Сравнения'
  | 'Советы'
  | 'Рейтинги';

export interface BlogFilter {
  searchQuery: string;
  category: BlogCategory;
} 