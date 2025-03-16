import React from 'react';
import { Link } from 'react-router-dom';
import { Player } from '../types/player';

interface PlayerCardProps {
  player: Player;
}

const PlayerCard: React.FC<PlayerCardProps> = ({ player }) => {
  // Функция для получения заглушки изображения, если нет реального
  const getImagePlaceholder = () => {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-full">
        <span className="text-gray-400 text-4xl">{player.nickname.charAt(0)}</span>
      </div>
    );
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <Link to={`/player/${player.id}`} className="h-full rounded-lg overflow-hidden flex flex-col bg-white group relative">
        {/* Изображение игрока */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <img 
            src={player.image || 'https://liquipedia.net/commons/images/thumb/9/9f/Silhouette_of_a_person.svg/800px-Silhouette_of_a_person.svg.png'} 
            alt={player.nickname}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        
        {/* Имя игрока и страна */}
        <div className="text-center">
          <h3 className="text-xl font-bold text-secondary mb-1">{player.nickname} <span className="text-sm text-gray-500 ml-1">{player.countryCode}</span></h3>
        </div>
        
        {/* Иконки игр */}
        <div className="grid grid-flow-col gap-2 mt-4">
          {player.games.map(game => (
            <div key={game} className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center">
              <span className="text-xs text-gray-600">{game.substring(0, 2)}</span>
            </div>
          ))}
        </div>
      </Link>
    </div>
  );
};

export default PlayerCard; 