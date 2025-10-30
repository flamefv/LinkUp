
import React from 'react';
import type { Group } from '../types';

interface GroupsScreenProps {
    groups: Group[];
    onCreateGroup: () => void;
}

const GroupsScreen: React.FC<GroupsScreenProps> = ({ groups, onCreateGroup }) => {
    return (
        <div className="p-4 flex flex-col h-full">
            <div className="flex-1">
                {groups.map(group => (
                    <div key={group.id} className="bg-white border border-gray-200 rounded-xl p-4 mb-4 shadow-sm">
                        <h3 className="font-bold text-lg text-gray-800">{group.name}</h3>
                        <p className="text-gray-500 text-sm mt-1">Members: {group.members.join(', ')}</p>
                    </div>
                ))}
            </div>
            <button onClick={onCreateGroup} className="w-full bg-blue-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-600 transition-colors">
                Create New Group
            </button>
        </div>
    );
};

export default GroupsScreen;