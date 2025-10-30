import React from 'react';
import type { Page } from '../types';

interface HeaderProps {
    page: Page;
    chatPartnerName?: string;
    groupName?: string;
    onNavigate: (page: Page) => void;
}

const Header: React.FC<HeaderProps> = ({ page, chatPartnerName, groupName, onNavigate }) => {
    
    const getTitle = () => {
        if (page === 'chat-detail' && chatPartnerName) return chatPartnerName;
        if (page === 'group-detail' && groupName) return groupName;
        switch (page) {
            case 'home': return 'Feed';
            case 'chat': return 'Community';
            case 'profile': return 'Profile';
            default: return 'LinkUp';
        }
    };

    const showBackButton = page === 'chat-detail' || page === 'group-detail';
    const backDestination = page === 'chat-detail' ? 'chat' : 'chat';

    return (
        <header className="flex items-center justify-between p-3 bg-gray-800 border-b border-gray-700 relative h-16 shadow-sm">
            {showBackButton ? (
                <button onClick={() => onNavigate(backDestination)} className="icon-button text-blue-500">
                    <i className="material-icons">arrow_back_ios</i>
                </button>
            ) : (
                <h1 className="text-2xl font-bold text-blue-500 flex-1">LinkUp</h1>
            )}

            <div className="absolute left-1/2 -translate-x-1/2 text-center">
                <h2 className="text-lg font-medium text-gray-200">{getTitle()}</h2>
            </div>
            
            <div className="flex-1 flex justify-end">
              {!showBackButton && (
                <button onClick={() => onNavigate('profile')} className="icon-button">
                    <i className="material-icons text-3xl text-gray-400">account_circle</i>
                </button>
              )}
            </div>
        </header>
    );
};

export default Header;