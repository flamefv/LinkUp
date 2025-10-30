import React from 'react';
import type { Page } from '../types';

interface BottomNavProps {
    currentPage: Page;
    onNavigate: (page: Page) => void;
    onFabClick: () => void;
}

interface NavItem {
    id: Page;
    icon: string;
    label: string;
}

const navItems: NavItem[] = [
    { id: 'home', icon: 'home', label: 'Home' },
    { id: 'chat', icon: 'chat_bubble_outline', label: 'Chats' },
];

const BottomNav: React.FC<BottomNavProps> = ({ currentPage, onNavigate, onFabClick }) => {
    return (
        <nav className="absolute bottom-0 left-0 right-0 h-20 bg-gray-800 flex justify-around items-center border-t border-gray-700 shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
            <button
                onClick={() => onNavigate('home')}
                className={`flex flex-col items-center gap-1 transition-colors duration-300 w-20 ${currentPage === 'home' ? 'text-blue-500' : 'text-gray-500'}`}
            >
                <i className="material-icons">{navItems[0].icon}</i>
                <span className="text-xs">{navItems[0].label}</span>
            </button>

            <button
                onClick={onFabClick}
                className="w-16 h-16 -mt-8 rounded-full bg-blue-500 text-white flex justify-center items-center shadow-lg hover:bg-blue-600 transition-all duration-300 z-10"
                aria-label="Create new post"
            >
                <i className="material-icons text-3xl">add</i>
            </button>

            <button
                onClick={() => onNavigate('chat')}
                className={`flex flex-col items-center gap-1 transition-colors duration-300 w-20 ${['chat', 'chat-detail', 'group-detail'].includes(currentPage) ? 'text-blue-500' : 'text-gray-500'}`}
            >
                <i className="material-icons">{navItems[1].icon}</i>
                <span className="text-xs">{navItems[1].label}</span>
            </button>
        </nav>
    );
};

export default BottomNav;