/**
 * Типы для игроков и их сетапов
 */

// Интерфейс для оборудования игрока
export interface EquipmentItem {
  id: number;
  name: string;
  brand: string;
  model: string;
  price: number;
  image: string;
  category: 'mouse' | 'keyboard' | 'headset' | 'mousepad' | 'monitor' | 'other';
  inStock: boolean;
}

export interface PlayerEquipment {
  mouse?: EquipmentItem;
  keyboard?: EquipmentItem;
  headset?: EquipmentItem;
  mousepad?: EquipmentItem;
  monitor?: EquipmentItem;
  other?: EquipmentItem[];
}

// Интерфейс для игрока
export interface Player {
  id: number;
  nickname: string;
  fullName: string;
  nationality: string;
  countryCode: string; // Двухбуквенный код страны (RU, UA, CA, FR, US, TR, BA, KR)
  image: string;
  bio: string;
  games: string[]; // Игры, в которые играет (Valorant, CS:GO, Apex Legends, PUBG и т.д.)
  isProPlayer: boolean;
  equipment: PlayerEquipment;
}

// Интерфейс для фильтра игроков
export interface PlayerFilter {
  game?: string;
  nationality?: string;
  searchTerm?: string;
} 