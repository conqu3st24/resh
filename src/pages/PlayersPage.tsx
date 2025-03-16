import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { fetchPlayers, setFilter, resetFilter } from '../store/slices/playerSlice';
import PlayerCard from '../components/PlayerCard';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { Player } from '../types/player';

const PlayersPage: React.FC = () => {
  console.log('PlayersPage компонент загружен');
  
  const dispatch = useDispatch();
  const { players, loading, error, filter } = useSelector((state: RootState) => state.players);
  
  console.log('PlayersPage данные из Redux:', { players, loading, error, filter });
  
  const [selectedGame, setSelectedGame] = useState<string>('');
  const [selectedNationality, setSelectedNationality] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Загружаем игроков при монтировании компонента
  useEffect(() => {
    console.log('PlayersPage useEffect - загрузка игроков');
    dispatch(fetchPlayers() as any);
  }, [dispatch]);

  // Обновляем фильтры при изменении выбранных значений
  useEffect(() => {
    dispatch(setFilter({
      game: selectedGame,
      nationality: selectedNationality,
      searchTerm
    }));
  }, [dispatch, selectedGame, selectedNationality, searchTerm]);

  // Функция для фильтрации игроков
  const getFilteredPlayers = () => {
    return players.filter((player: Player) => {
      // Фильтр по игре
      if (filter.game && !player.games.includes(filter.game)) {
        return false;
      }
      
      // Фильтр по национальности
      if (filter.nationality && player.nationality !== filter.nationality) {
        return false;
      }
      
      // Фильтр по поисковому запросу
      if (filter.searchTerm) {
        const searchLower = filter.searchTerm.toLowerCase();
        return (
          player.nickname.toLowerCase().includes(searchLower) ||
          player.fullName.toLowerCase().includes(searchLower)
        );
      }
      
      return true;
    });
  };

  // Получаем уникальные игры для фильтра
  const getUniqueGames = () => {
    const games = new Set<string>();
    players.forEach((player: Player) => {
      player.games.forEach((game: string) => games.add(game));
    });
    return Array.from(games).sort();
  };

  // Получаем уникальные национальности для фильтра
  const getUniqueNationalities = () => {
    const nationalities = new Set<string>();
    players.forEach((player: Player) => {
      nationalities.add(player.nationality);
    });
    return Array.from(nationalities).sort();
  };

  // Обработчик сброса фильтров
  const handleResetFilters = () => {
    setSelectedGame('');
    setSelectedNationality('');
    setSearchTerm('');
    dispatch(resetFilter());
  };

  // Отфильтрованные игроки
  const filteredPlayers = getFilteredPlayers();

  return (
    <main className="py-8 md:py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-secondary mb-4">Players</h1>
          
          {/* Фильтры */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            {/* Фильтр по игре */}
            <div className="w-full md:w-auto">
              <select
                value={selectedGame}
                onChange={(e) => setSelectedGame(e.target.value)}
                className="w-full md:w-64 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">Game</option>
                {getUniqueGames().map(game => (
                  <option key={game} value={game}>{game}</option>
                ))}
              </select>
            </div>
            
            {/* Фильтр по национальности */}
            <div className="w-full md:w-auto">
              <select
                value={selectedNationality}
                onChange={(e) => setSelectedNationality(e.target.value)}
                className="w-full md:w-64 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">Nationality</option>
                {getUniqueNationalities().map(nationality => (
                  <option key={nationality} value={nationality}>{nationality}</option>
                ))}
              </select>
            </div>
            
            {/* Поиск */}
            <div className="w-full md:flex-1 relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search players"
                className="w-full px-4 py-2 pr-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <MagnifyingGlassIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
            
            {/* Кнопка сброса */}
            {(selectedGame || selectedNationality || searchTerm) && (
              <button
                onClick={handleResetFilters}
                className="text-primary hover:text-lightBlue font-medium"
              >
                Сбросить фильтры
              </button>
            )}
          </div>
        </div>
        
        {/* Индикатор загрузки */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        )}
        
        {/* Сообщение об ошибке */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            <p>{error}</p>
          </div>
        )}
        
        {/* Список игроков */}
        {!loading && filteredPlayers.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredPlayers.map((player: Player) => (
              <PlayerCard key={player.id} player={player} />
            ))}
          </div>
        ) : !loading && !error ? (
          <div className="bg-white p-8 rounded-lg shadow-sm text-center">
            <div className="text-5xl mb-4">🎮</div>
            <h2 className="text-2xl font-bold text-secondary mb-4">Игроки не найдены</h2>
            <p className="text-textGray mb-6">Попробуйте изменить параметры фильтрации</p>
            <button
              onClick={handleResetFilters}
              className="bg-primary hover:bg-lightBlue text-white font-medium px-6 py-3 rounded-lg transition-colors"
            >
              Сбросить фильтры
            </button>
          </div>
        ) : null}
      </div>
    </main>
  );
};

export default PlayersPage; 