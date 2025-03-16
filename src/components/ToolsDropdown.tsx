import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ComputerDesktopIcon, 
  CursorArrowRaysIcon,
  ScaleIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';

interface ToolsDropdownProps {
  onClose?: () => void;
}

const tools = [
  {
    id: 'mouse-finder',
    name: 'Подбор мышки',
    description: 'Подберите идеальную мышь по параметрам вашей руки',
    icon: CursorArrowRaysIcon,
    path: '/tools/mouse-finder'
  },
  {
    id: 'setup-finder',
    name: 'Подбор сетапа',
    description: 'Соберите игровой сетап под ваш бюджет и предпочтения',
    icon: ComputerDesktopIcon,
    path: '/tools/setup-finder'
  },
  {
    id: 'mouse-comparison',
    name: 'Сравнить',
    description: 'Сравните характеристики разных моделей мышек',
    icon: ScaleIcon,
    path: '/tools/mouse-comparison'
  },
  {
    id: 'mouse-stats',
    name: 'Статистика',
    description: 'Узнайте популярность разных моделей среди профессионалов',
    icon: ChartBarIcon,
    path: '/tools/mouse-stats'
  }
];

const ToolsDropdown: React.FC<ToolsDropdownProps> = ({ onClose }) => {
  return (
    <div className="absolute top-full left-0 mt-1 w-80 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-50">
      <div className="p-4">
        <div className="grid gap-4">
          {tools.map(tool => (
            <Link
              key={tool.id}
              to={tool.path}
              onClick={onClose}
              className="flex items-start gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors duration-200"
            >
              <tool.icon className="w-6 h-6 text-primary shrink-0 mt-1" />
              <div>
                <div className="font-medium text-gray-900">{tool.name}</div>
                <div className="text-sm text-gray-500">{tool.description}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ToolsDropdown; 