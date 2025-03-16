export type ReviewRating = 1 | 2 | 3 | 4 | 5;

export interface ReviewPhoto {
  id: string;
  url: string;
  thumbnailUrl: string;
}

export interface ReviewResponse {
  id: string;
  author: string;
  date: string;
  content: string;
}

export interface Review {
  id: string;
  productId: number;
  author: {
    id: string;
    name: string;
    avatar?: string;
  };
  rating: ReviewRating;
  date: string;
  content: string;
  photos: ReviewPhoto[];
  response?: ReviewResponse;
  isVerifiedPurchase: boolean;
  helpfulCount: number;
  unhelpfulCount: number;
}

export interface ReviewsStats {
  averageRating: number;
  totalCount: number;
  ratingCounts: {
    [key in ReviewRating]: number;
  };
  withPhotosCount: number;
  positiveCount: number;
  negativeCount: number;
}

export type ReviewFilter = 'all' | 'with-photos' | 'positive' | 'negative'; 