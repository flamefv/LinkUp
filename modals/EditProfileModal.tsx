import React, { useState } from 'react';
import Modal from '../components/Modal';
import type { User } from '../types';

interface EditProfileModalProps {
    user: User;
    onClose: () => void;
    onSubmit: (newProfile: Omit<User, 'avatar'>) => void;
}

const EditProfileModal: React.FC<EditProfileModalProps> = ({ user, onClose, onSubmit }) => {
    const [name, setName] = useState(user.name);
    const [username, setUsername] = useState(user.username);
    const [location, setLocation] = useState(user.location);
    const [bio, setBio] = useState(user.bio);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({ name, username, location, bio });
    };

    return (
        <Modal title="Edit Profile" onClose={onClose}>
            <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                    <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} className="w-full p-3 border rounded-lg bg-gray-700 border-gray-600 text-white" required />
                    <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} className="w-full p-3 border rounded-lg bg-gray-700 border-gray-600 text-white" required />
                    <input type="text" placeholder="Location" value={location} onChange={e => setLocation(e.target.value)} className="w-full p-3 border rounded-lg bg-gray-700 border-gray-600 text-white" required />
                    <textarea placeholder="Bio" value={bio} onChange={e => setBio(e.target.value)} rows={3} className="w-full p-3 border rounded-lg bg-gray-700 border-gray-600 text-white" required></textarea>
                </div>
                <div className="flex justify-end gap-4 mt-6">
                    <button type="button" onClick={onClose} className="py-2 px-6 border-2 border-blue-500 text-blue-500 font-semibold rounded-lg">Cancel</button>
                    <button type="submit" className="py-2 px-6 bg-blue-500 text-white font-semibold rounded-lg">Save Changes</button>
                </div>
            </form>
        </Modal>
    );
};

export default EditProfileModal;