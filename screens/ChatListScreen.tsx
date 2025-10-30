
import React from 'react';
import type { Chat } from '../types';

interface ChatListScreenProps {
    chats: Record<string, Chat>;
    onChatSelect: (username: string) => void;
}

const ChatListScreen: React.FC<ChatListScreenProps> = ({ chats, onChatSelect }) => {
    const chatKeys = Object.keys(chats);

    if (chatKeys.length === 0) {
        return <p className="text-center text-gray-500 mt-8">No conversations yet.</p>;
    }

    return (
        <div>
            {chatKeys.map(username => {
                const chat = chats[username];
                const lastMsg = chat.messages[chat.messages.length - 1]?.text || 'No messages yet...';
                return (
                    <div 
                        key={username} 
                        onClick={() => onChatSelect(username)}
                        className="flex items-center p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-100"
                    >
                        <img src={`https://picsum.photos/seed/${username}/50/50`} alt={chat.name} className="w-12 h-12 rounded-full mr-4" />
                        <div className="flex-1">
                            <div className="font-bold text-gray-800">{chat.name}</div>
                            <p className="text-gray-500 truncate">{lastMsg}</p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default ChatListScreen;
