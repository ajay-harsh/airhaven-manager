
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  BarChart3,
  Layers,
  LayoutDashboard,
  MessageSquare,
  Settings,
  Users,
  LogOut,
  UserCircle
} from 'lucide-react';
import { Avatar } from '@/components/ui/avatar';
import { useTheme } from '@/contexts/ThemeContext';

interface SidebarProps {
  isOpen: boolean;
}

interface NavItem {
  title: string;
  href: string;
  icon: React.ReactNode;
}

const mainNavItems: NavItem[] = [
  {
    title: 'Dashboard',
    href: '/',
    icon: <LayoutDashboard className="h-5 w-5" />,
  },
  {
    title: 'Analytics',
    href: '/analytics',
    icon: <BarChart3 className="h-5 w-5" />,
  },
  {
    title: 'Operations',
    href: '/operations',
    icon: <Layers className="h-5 w-5" />,
  },
  {
    title: 'Chatbot',
    href: '/chatbot',
    icon: <MessageSquare className="h-5 w-5" />,
  },
  {
    title: 'Users',
    href: '/users',
    icon: <Users className="h-5 w-5" />,
  },
];

const secondaryNavItems: NavItem[] = [
  {
    title: 'Settings',
    href: '/settings',
    icon: <Settings className="h-5 w-5" />,
  },
  {
    title: 'Profile',
    href: '/profile',
    icon: <UserCircle className="h-5 w-5" />,
  },
];

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  
  const handleProfileClick = () => {
    navigate('/profile');
  };
  
  const handleLogout = () => {
    // Handle logout functionality here
    console.log('Logging out...');
  };

  return (
    <aside
      className={`${
        isOpen ? 'w-64' : 'w-20'
      } transition-all duration-300 ease-in-out fixed inset-y-0 left-0 z-10 flex flex-col bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 shadow-sm`}
    >
      <div className="flex items-center justify-center h-16 border-b border-gray-200 dark:border-gray-700">
        <span className={`font-bold text-xl text-primary ${!isOpen && 'sr-only'}`}>
          Air-Buddy
        </span>
        {!isOpen && <span className="font-bold text-primary text-xl">AB</span>}
      </div>

      <div className="flex-1 overflow-y-auto py-4 px-3">
        <nav className="space-y-1 mb-6">
          {mainNavItems.map((item) => (
            <NavLink
              key={item.title}
              to={item.href}
              className={({ isActive }) =>
                `flex items-center p-2 rounded-md transition-colors ${
                  isActive
                    ? 'bg-gray-100 dark:bg-gray-700 text-primary'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                } ${!isOpen && 'justify-center'}`
              }
            >
              {item.icon}
              <span className={`ml-3 ${!isOpen && 'sr-only'}`}>{item.title}</span>
            </NavLink>
          ))}
        </nav>

        <div className="pt-4 mt-4 border-t border-gray-200 dark:border-gray-700">
          <nav className="space-y-1">
            {secondaryNavItems.map((item) => (
              <NavLink
                key={item.title}
                to={item.href}
                className={({ isActive }) =>
                  `flex items-center p-2 rounded-md transition-colors ${
                    isActive
                      ? 'bg-gray-100 dark:bg-gray-700 text-primary'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  } ${!isOpen && 'justify-center'}`
                }
              >
                {item.icon}
                <span className={`ml-3 ${!isOpen && 'sr-only'}`}>{item.title}</span>
              </NavLink>
            ))}

            <button
              onClick={handleLogout}
              className={`flex items-center p-2 rounded-md transition-colors text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 w-full ${
                !isOpen && 'justify-center'
              }`}
            >
              <LogOut className="h-5 w-5" />
              <span className={`ml-3 ${!isOpen && 'sr-only'}`}>Logout</span>
            </button>
          </nav>
        </div>
      </div>

      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <button 
          onClick={handleProfileClick}
          className={`flex items-center w-full text-left ${!isOpen && 'justify-center'}`}
        >
          <div className="flex items-center">
            <UserCircle className="h-8 w-8 text-gray-600 dark:text-gray-300" />
            <div className={`ml-3 ${!isOpen && 'sr-only'}`}>
              <p className="text-sm font-medium text-gray-700 dark:text-gray-200">John Doe</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Admin</p>
            </div>
          </div>
        </button>
      </div>
    </aside>
  );
};

export default React.memo(Sidebar);
