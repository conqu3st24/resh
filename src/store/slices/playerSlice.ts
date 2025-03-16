/**
 * Redux slice для управления данными игроков
 */
import { createSlice, createAsyncThunk, PayloadAction, ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { Player, PlayerFilter } from '../../types/player';

// Интерфейс состояния
interface PlayerState {
  players: Player[];
  currentPlayer: Player | null;
  loading: boolean;
  error: string | null;
  filter: PlayerFilter;
}

// Начальное состояние с моковыми данными
const initialState: PlayerState = {
  players: [
    {
      id: 1,
      nickname: 'TenZ',
      fullName: 'Тайсон Нго',
      nationality: 'Канада',
      countryCode: 'CA',
      image: 'https://liquipedia.net/commons/images/thumb/1/1f/TenZ_2021_VALO.png/600px-TenZ_2021_VALO.png',
      bio: 'Тайсон Нго, известный как TenZ - профессиональный игрок Valorant в команде Sentinels. Бывший игрок CS:GO.',
      games: ['Valorant', 'CS:GO'],
      isProPlayer: true,
      equipment: {
        mouse: {
          id: 101,
          name: 'G Pro X Superlight',
          brand: 'Logitech',
          model: 'G Pro X Superlight',
          price: 11999,
          image: 'https://resource.logitechg.com/w_386,c_limit,q_auto,f_auto,dpr_2.0/d_transparent.gif/content/dam/gaming/en/products/pro-x-superlight/pro-x-superlight-pink-gallery-1.png',
          category: 'mouse',
          inStock: true
        },
        keyboard: {
          id: 201,
          name: 'G Pro X Mechanical Gaming Keyboard',
          brand: 'Logitech',
          model: 'G Pro X',
          price: 13999,
          image: 'https://resource.logitechg.com/w_386,c_limit,q_auto,f_auto,dpr_2.0/d_transparent.gif/content/dam/gaming/en/products/pro-keyboard/pro-keyboard-gallery-1.png',
          category: 'keyboard',
          inStock: true
        },
        headset: {
          id: 301,
          name: 'Cloud II',
          brand: 'HyperX',
          model: 'Cloud II',
          price: 7999,
          image: 'https://www.hyperxgaming.com/unitedkingdom/microsite/cloud2/global/img/hp_01.webp',
          category: 'headset',
          inStock: true
        },
        mousepad: {
          id: 401,
          name: 'Fury S Pro',
          brand: 'HyperX',
          model: 'Fury S Pro',
          price: 2999,
          image: 'https://media.steelseriescdn.com/thumbs/catalogue/products/01227-qck-heavy-xxl/77f2aa8adeb84f5d9a5231eebba219c8.png.500x400_q100_crop-fit_optimize.png',
          category: 'mousepad',
          inStock: true
        },
        monitor: {
          id: 501,
          name: 'ROG Swift PG259QN',
          brand: 'ASUS',
          model: 'ROG Swift PG259QN',
          price: 69999,
          image: 'https://dlcdnwebimgs.asus.com/gain/15BF3C90-8353-4872-9931-6FB8F9D7C5F2/w1000/h732',
          category: 'monitor',
          inStock: true
        }
      }
    },
    {
      id: 2,
      nickname: 's1mple',
      fullName: 'Александр Костылев',
      nationality: 'Украина',
      countryCode: 'UA',
      image: 'https://liquipedia.net/commons/images/thumb/2/2c/S1mple_Berlin_Minor_2019.jpg/600px-S1mple_Berlin_Minor_2019.jpg',
      bio: 'Александр Костылев, известный как s1mple - профессиональный игрок CS:GO в команде Natus Vincere (NAVI).',
      games: ['CS:GO'],
      isProPlayer: true,
      equipment: {
        mouse: {
          id: 102,
          name: 'Sensei Ten',
          brand: 'SteelSeries',
          model: 'Sensei Ten',
          price: 8999,
          image: 'https://media.steelseriescdn.com/thumbs/catalogue/products/01345-sensei-ten/f0cf7dd20d6744fe96a8cd7f5c359d56.png.500x400_q100_crop-fit_optimize.png',
          category: 'mouse',
          inStock: true
        },
        keyboard: {
          id: 202,
          name: 'Apex Pro',
          brand: 'SteelSeries',
          model: 'Apex Pro',
          price: 12999,
          image: 'https://media.steelseriescdn.com/thumbs/catalogue/products/01702-apex-pro-tkl-2023/06c17aa216584036bd272c7b8f74e49b.png.500x400_q100_crop-fit_optimize.png',
          category: 'keyboard',
          inStock: true
        }
      }
    },
    {
      id: 3,
      nickname: 'm0NESY',
      fullName: 'Илья Осипов',
      nationality: 'Россия',
      countryCode: 'RU',
      image: 'https://liquipedia.net/commons/images/thumb/3/31/M0NESY_at_IEM_Cologne_2022.jpg/600px-M0NESY_at_IEM_Cologne_2022.jpg',
      bio: 'Илья Осипов, известный как m0NESY - профессиональный игрок CS:GO в команде G2 Esports.',
      games: ['CS:GO'],
      isProPlayer: true,
      equipment: {}
    },
    {
      id: 4,
      nickname: 'ZywOo',
      fullName: 'Матье Эрбо',
      nationality: 'Франция',
      countryCode: 'FR',
      image: 'https://liquipedia.net/commons/images/thumb/a/a0/ZywOo_DreamHack_Masters_Spring_2021.jpg/600px-ZywOo_DreamHack_Masters_Spring_2021.jpg',
      bio: 'Матье Эрбо, известный как ZywOo - профессиональный игрок CS:GO в команде Team Vitality.',
      games: ['CS:GO'],
      isProPlayer: true,
      equipment: {}
    },
    {
      id: 5,
      nickname: 'NiKo',
      fullName: 'Никола Ковач',
      nationality: 'Босния и Герцеговина',
      countryCode: 'BA',
      image: 'https://liquipedia.net/commons/images/thumb/6/61/NiKo_at_BLAST_Premier_Spring_Final_2022.jpg/600px-NiKo_at_BLAST_Premier_Spring_Final_2022.jpg',
      bio: 'Никола Ковач, известный как NiKo - профессиональный игрок CS:GO в команде G2 Esports.',
      games: ['CS:GO'],
      isProPlayer: true,
      equipment: {}
    },
    {
      id: 6,
      nickname: 'cNed',
      fullName: 'Мехмет Ипек',
      nationality: 'Турция',
      countryCode: 'TR',
      image: 'https://liquipedia.net/commons/images/thumb/9/97/CNed_at_VCT_2021_Stage_2_Masters.jpg/600px-CNed_at_VCT_2021_Stage_2_Masters.jpg',
      bio: 'Мехмет Ипек, известный как cNed - профессиональный игрок Valorant в команде Natus Vincere (NAVI).',
      games: ['Valorant'],
      isProPlayer: true,
      equipment: {}
    },
    {
      id: 7,
      nickname: 'yay',
      fullName: 'Джейкоб Уайтакер',
      nationality: 'США',
      countryCode: 'US',
      image: 'https://liquipedia.net/commons/images/thumb/7/76/Yay_at_VCT_2022_Stage_1_Masters.jpg/600px-Yay_at_VCT_2022_Stage_1_Masters.jpg',
      bio: 'Джейкоб Уайтакер, известный как yay - профессиональный игрок Valorant.',
      games: ['Valorant', 'CS:GO'],
      isProPlayer: true,
      equipment: {}
    },
    {
      id: 8,
      nickname: 'Faker',
      fullName: 'Ли Сан Хёк',
      nationality: 'Южная Корея',
      countryCode: 'KR',
      image: 'https://liquipedia.net/commons/images/thumb/9/98/Faker_at_LoL_WCS_2019.jpg/600px-Faker_at_LoL_WCS_2019.jpg',
      bio: 'Ли Сан Хёк, известный как Faker - профессиональный игрок League of Legends в команде T1.',
      games: ['League of Legends'],
      isProPlayer: true,
      equipment: {}
    },
    {
      id: 9,
      nickname: 'Shroud',
      fullName: 'Майкл Гржесик',
      nationality: 'Канада',
      countryCode: 'CA',
      image: 'https://liquipedia.net/commons/images/thumb/6/69/Shroud_DH_Austin_2016.jpg/600px-Shroud_DH_Austin_2016.jpg',
      bio: 'Майкл Гржесик, известный как Shroud - канадский стример и бывший профессиональный игрок в Counter-Strike: Global Offensive. Он известен своей невероятной точностью и механическими навыками в шутерах от первого лица. После завершения карьеры в киберспорте, он стал одним из самых популярных стримеров на Twitch, а затем перешел на Mixer, прежде чем вернуться на Twitch после закрытия Mixer.',
      games: ['Valorant', 'CS:GO', 'Apex Legends', 'PUBG'],
      isProPlayer: false,
      equipment: {
        mouse: {
          id: 103,
          name: 'G Pro X Superlight',
          brand: 'Logitech',
          model: 'G Pro X Superlight',
          price: 11999,
          image: 'https://resource.logitechg.com/w_386,c_limit,q_auto,f_auto,dpr_2.0/d_transparent.gif/content/dam/gaming/en/products/pro-x-superlight/pro-x-superlight-pink-gallery-1.png',
          category: 'mouse',
          inStock: true
        },
        keyboard: {
          id: 203,
          name: 'G Pro X Mechanical Gaming Keyboard',
          brand: 'Logitech',
          model: 'G Pro X',
          price: 13999,
          image: 'https://resource.logitechg.com/w_386,c_limit,q_auto,f_auto,dpr_2.0/d_transparent.gif/content/dam/gaming/en/products/pro-keyboard/pro-keyboard-gallery-1.png',
          category: 'keyboard',
          inStock: true
        },
        headset: {
          id: 303,
          name: 'Cloud II',
          brand: 'HyperX',
          model: 'Cloud II',
          price: 7999,
          image: 'https://www.hyperxgaming.com/unitedkingdom/microsite/cloud2/global/img/hp_01.webp',
          category: 'headset',
          inStock: true
        },
        mousepad: {
          id: 403,
          name: 'Fury S Pro',
          brand: 'HyperX',
          model: 'Fury S Pro',
          price: 2999,
          image: 'https://media.steelseriescdn.com/thumbs/catalogue/products/01227-qck-heavy-xxl/77f2aa8adeb84f5d9a5231eebba219c8.png.500x400_q100_crop-fit_optimize.png',
          category: 'mousepad',
          inStock: true
        },
        monitor: {
          id: 503,
          name: 'ROG Swift PG259QN',
          brand: 'ASUS',
          model: 'ROG Swift PG259QN',
          price: 69999,
          image: 'https://dlcdnwebimgs.asus.com/gain/15BF3C90-8353-4872-9931-6FB8F9D7C5F2/w1000/h732',
          category: 'monitor',
          inStock: true
        }
      }
    }
  ],
  currentPlayer: null,
  loading: false,
  error: null,
  filter: {
    game: '',
    nationality: '',
    searchTerm: ''
  }
};

// Асинхронное действие для загрузки игроков
export const fetchPlayers = createAsyncThunk<Player[], void, { rejectValue: string }>(
  'players/fetchPlayers',
  async (_: void, { rejectWithValue }: { rejectWithValue: (value: string) => any }) => {
    try {
      // В реальном приложении здесь был бы API запрос
      // Для демо используем моковые данные из initialState
      return initialState.players;
    } catch (error) {
      return rejectWithValue('Не удалось загрузить список игроков');
    }
  }
);

// Асинхронное действие для загрузки конкретного игрока
export const fetchPlayerById = createAsyncThunk<Player, number, { rejectValue: string }>(
  'players/fetchPlayerById',
  async (id: number, { rejectWithValue }: { rejectWithValue: (value: string) => any }) => {
    try {
      // В реальном приложении здесь был бы API запрос
      const player = initialState.players.find(p => p.id === id);
      if (player) {
        return player;
      }
      return rejectWithValue('Игрок не найден');
    } catch (error) {
      return rejectWithValue('Не удалось загрузить данные игрока');
    }
  }
);

const playerSlice = createSlice({
  name: 'players',
  initialState,
  reducers: {
    // Установка фильтров
    setFilter: (state: PlayerState, action: PayloadAction<Partial<PlayerFilter>>) => {
      state.filter = { ...state.filter, ...action.payload };
    },
    
    // Сброс фильтров
    resetFilter: (state: PlayerState) => {
      state.filter = {
        game: '',
        nationality: '',
        searchTerm: ''
      };
    },
    
    // Очистка текущего игрока
    clearCurrentPlayer: (state: PlayerState) => {
      state.currentPlayer = null;
    }
  },
  extraReducers: (builder: ActionReducerMapBuilder<PlayerState>) => {
    // Обработка fetchPlayers
    builder
      .addCase(fetchPlayers.pending, (state: PlayerState) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPlayers.fulfilled, (state: PlayerState, action: PayloadAction<Player[]>) => {
        state.loading = false;
        state.players = action.payload;
      })
      .addCase(fetchPlayers.rejected, (state: PlayerState, action: PayloadAction<string | undefined>) => {
        state.loading = false;
        state.error = action.payload || 'Произошла ошибка при загрузке игроков';
      })
      
      // Обработка fetchPlayerById
      .addCase(fetchPlayerById.pending, (state: PlayerState) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPlayerById.fulfilled, (state: PlayerState, action: PayloadAction<Player>) => {
        state.loading = false;
        state.currentPlayer = action.payload;
      })
      .addCase(fetchPlayerById.rejected, (state: PlayerState, action: PayloadAction<string | undefined>) => {
        state.loading = false;
        state.error = action.payload || 'Произошла ошибка при загрузке данных игрока';
      });
  }
});

export const { setFilter, resetFilter, clearCurrentPlayer } = playerSlice.actions;
export default playerSlice.reducer; 