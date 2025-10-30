import React, { useState, useRef, useEffect } from 'react';
import type { Group, User } from '../types';

interface GroupDetailScreenProps {
    group: Group;
    currentUser: User;
    onSendMessage: (text: string) => void;
}

const GroupDetailScreen: React.FC<GroupDetailScreenProps> = ({ group, currentUser, onSendMessage }) => {
    const [message, setMessage] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }

    useEffect(() => {
        scrollToBottom()
    }, [group.messages]);

    const handleSend = (e: React.FormEvent) => {
        e.preventDefault();
        if (message.trim()) {
            onSendMessage(message.trim());
            setMessage('');
        }
    };

    return (
        <div className="flex flex-col h-full">
            <div className="flex-1 p-4 overflow-y-auto">
                <div className="flex flex-col gap-3">
                    {group.messages.map((msg, index) => {
                        const isSent = msg.sender.username === currentUser.username;
                        return (
                            <div key={index} className={`flex flex-col max-w-[75%] ${isSent ? 'self-end' : 'self-start'}`}>
                                {!isSent && (
                                    <span className="text-xs text-gray-400 ml-3 mb-1">{msg.sender.name}</span>
                                )}
                                <div className={`p-3 rounded-2xl ${isSent ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-200'}`}>
                                    {msg.text}
                                </div>
                            </div>
                        )
                    })}
                    <div ref={messagesEndRef} />
                </div>
            </div>
            <form onSubmit={handleSend} className="flex items-center p-3 border-t border-gray-700 bg-gray-800">
                <input 
                    type="text" 
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 border border-gray-600 rounded-full py-2 px-4 outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
                />
                <button type="submit" className="ml-3 text-white bg-blue-500 rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0 hover:bg-blue-600 transition-colors" aria-label="Send message">
                    <i className="material-icons">send</i>
                </button>
            </form>
        </div>
    );
};

export default GroupDetailScreen;