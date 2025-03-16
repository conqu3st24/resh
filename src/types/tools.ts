// Типы хвата мыши
export type GripType = 'palm' | 'claw' | 'fingertip';

// Вес мыши
export type MouseWeight = 'light' | 'medium' | 'heavy';

// Игровые жанры
export type GameGenre = 'fps' | 'moba' | 'mmorpg' | 'strategy' | 'other';

// Уровень игрока
export type PlayerLevel = 'professional' | 'amateur' | 'beginner';

// Параметры для подбора мыши
export interface MouseFinderParams {
  handLength: number; // в см
  handWidth: number; // в см
  gripType: GripType;
  preferredWeight: MouseWeight;
  gameGenre: GameGenre;
}

// Параметры для подбора сетапа
export interface SetupFinderParams {
  game: string;
  playerLevel: PlayerLevel;
  budget: number;
  preferredBrands?: string[];
  setupType?: string;
  selectedGames?: string[];
}

// Рекомендация мыши
export interface MouseRecommendation {
  id: number;
  name: string;
  image: string;
  price: number;
  weight: number;
  dimensions: {
    length: number;
    width: number;
    height: number;
  };
  recommendationScore: number;
  matchingFeatures: string[];
}

// Рекомендация сетапа
export interface SetupRecommendation {
  mouse: {
    id: number;
    name: string;
    image: string;
    price: number;
  };
  keyboard: {
    id: number;
    name: string;
    image: string;
    price: number;
  };
  mousepad: {
    id: number;
    name: string;
    image: string;
    price: number;
  };
  headset: {
    id: number;
    name: string;
    image: string;
    price: number;
  };
  microphone?: {
    id: number;
    name: string;
    image: string;
    price: number;
  };
  totalPrice: number;
} 