import React, { useState } from 'react';
import Modal from '../components/Modal';

interface CreateGroupModalProps {
    onClose: () => void;
    onSubmit: (name: string, members: string[]) => void;
    recentUsers: string[]; // provided by App
}

const CreateGroupModal: React.FC<CreateGroupModalProps> = ({ onClose, onSubmit, recentUsers }) => {
    const [name, setName] = useState('');
    const [selected, setSelected] = useState<Record<string, boolean>>({});
    const [search, setSearch] = useState('');

    const toggleUser = (u: string) => {
        setSelected(prev => ({ ...prev, [u]: !prev[u] }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const memberUsernames = Object.keys(selected).filter(k => selected[k]);
        onSubmit(name, memberUsernames);
    };

    // filter recents by search (case-insensitive)
    const filteredRecents = React.useMemo(() => {
        const q = search.trim().toLowerCase();
        if (!q) return recentUsers;
        return recentUsers.filter(u => u.toLowerCase().includes(q));
    }, [recentUsers, search]);

    return (
        <Modal title="Create a Group" onClose={onClose}>
            <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                    <input type="text" placeholder="Group Name" value={name} onChange={e => setName(e.target.value)} className="w-full p-3 border rounded-lg bg-gray-700 border-gray-600 text-white" required />
                    <div>
                        <label className="block font-semibold text-gray-300 mb-2">Add Members (Recent)</label>
                        <input
                            type="text"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            placeholder="Search username..."
                            className="w-full p-2 mb-2 border rounded-lg bg-gray-800 border-gray-600 text-white"
                        />
                        {recentUsers.length === 0 ? (
                            <p className="text-gray-400">No recent users available.</p>
                        ) : (
                            <div className="grid grid-cols-1 gap-2 max-h-40 overflow-y-auto p-2">
                                {filteredRecents.map(u => (
                                    <label key={u} className="flex items-center gap-3 bg-gray-800 p-2 rounded-md cursor-pointer checkbox-label">
                                        <input type="checkbox" checked={!!selected[u]} onChange={() => toggleUser(u)} />
                                        <span className="text-gray-200">{u}</span>
                                    </label>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
                <div className="flex justify-end gap-4 mt-6">
                    <button type="button" onClick={onClose} className="py-2 px-6 border-2 border-blue-500 text-blue-500 font-semibold rounded-lg">Cancel</button>
                    <button type="submit" className="py-2 px-6 bg-blue-500 text-white font-semibold rounded-lg">Create</button>
                </div>
            </form>
        </Modal>
    );
};

export default CreateGroupModal;