import React, { useMemo } from 'react';
import type { Chat, Group } from '../types';

interface CommunityScreenProps {
    chats: Record<string, Chat>;
    groups: Group[];
    onChatSelect: (username: string) => void;
    onGroupSelect: (groupId: number) => void;
    onCreateGroup: () => void;
}

const CommunityScreen: React.FC<CommunityScreenProps> = ({ chats, groups, onChatSelect, onGroupSelect, onCreateGroup }) => {
    const conversations = useMemo(() => {
        const allConversations: (
            { type: 'chat', id: string, data: Chat, lastMessageTime: number } |
            { type: 'group', id: number, data: Group, lastMessageTime: number }
        )[] = [];

        Object.entries(chats).forEach(([username, chat]) => {
            const lastMessage = chat.messages[chat.messages.length - 1];
            allConversations.push({
                type: 'chat',
                id: username,
                data: chat,
                lastMessageTime: lastMessage ? lastMessage.timestamp : 0,
            });
        });

        groups.forEach(group => {
            const lastMessage = group.messages[group.messages.length - 1];
            allConversations.push({
                type: 'group',
                id: group.id,
                data: group,
                lastMessageTime: lastMessage ? lastMessage.timestamp : 0,
            });
        });

        return allConversations.sort((a, b) => b.lastMessageTime - a.lastMessageTime);
    }, [chats, groups]);

    return (
        <div className="h-full flex flex-col">
            <div className="p-4 border-b border-gray-700">
                <button 
                    onClick={onCreateGroup} 
                    className="w-full flex items-center justify-center gap-2 bg-blue-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-600 transition-colors"
                >
                    <i className="material-icons">group_add</i>
                    <span>Create New Group</span>
                </button>
            </div>
            
            <div className="flex-1 overflow-y-auto">
                {conversations.length > 0 ? conversations.map(convo => {
                    const lastMsg = convo.data.messages[convo.data.messages.length - 1]?.text || 'No messages yet...';
                    const title = convo.data.name;
                    
                    return (
                        <div
                            key={`${convo.type}-${convo.id}`}
                            onClick={() => convo.type === 'chat' ? onChatSelect(convo.id as string) : onGroupSelect(convo.id as number)}
                            className="flex items-center p-4 border-b border-gray-700 cursor-pointer hover:bg-gray-800"
                        >
                            {convo.type === 'chat' ? (
                                <img src={`https://picsum.photos/seed/${convo.id}/50/50`} alt={title} className="w-12 h-12 rounded-full mr-4" />
                            ) : (
                                <div className="w-12 h-12 rounded-full mr-4 bg-gray-600 flex items-center justify-center">
                                    <i className="material-icons text-gray-300">groups</i>
                                </div>
                            )}
                            <div className="flex-1 overflow-hidden">
                                <div className="font-bold text-gray-200 truncate">{title}</div>
                                <p className="text-gray-400 truncate">{lastMsg}</p>
                            </div>
                        </div>
                    );
                }) : <p className="text-center text-gray-400 mt-8">No conversations yet.</p>}
            </div>
        </div>
    );
};

export default CommunityScreen;