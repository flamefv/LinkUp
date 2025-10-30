import React, { useState } from 'react';
import type { Post } from '../types';
import { CATEGORIES } from '../constants';
import Modal from '../components/Modal';

interface CreatePostModalProps {
    onClose: () => void;
    onSubmit: (postData: Omit<Post, 'id' | 'name' | 'username'>) => void;
}

// Helper to format the "YYYY-MM-DD" string from the date picker into "MM DD YYYY" for saving
const formatDateForSaving = (dateInput: string): string => {
    if (!dateInput) return '';
    // The input provides the date in local time. To avoid timezone issues, we'll parse it as UTC.
    const parts = dateInput.split('-'); // ["YYYY", "MM", "DD"]
    const yyyy = parts[0];
    const mm = parts[1];
    const dd = parts[2];
    return `${mm} ${dd} ${yyyy}`;
};

const CreatePostModal: React.FC<CreatePostModalProps> = ({ onClose, onSubmit }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [zip, setZip] = useState('');
    const [category, setCategory] = useState<string>('');
    const [tag, setTag] = useState('');
    const [price, setPrice] = useState('');
    // This state will hold the raw "YYYY-MM-DD" value from the native date picker
    const [dateValue, setDateValue] = useState(''); 
    const [duration, setDuration] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        const postData: Omit<Post, 'id' | 'name' | 'username'> = { 
            title, description, location, zip, 
            category: category as 'Collab' | 'Microjob',
            tag: tag 
        };
        
        if (category === 'Microjob' && price) {
            postData.price = parseFloat(price);
        }
        
        if (dateValue) {
            // Convert the raw date value from the picker to the "MM DD YYYY" format for saving
            postData.linkupDate = formatDateForSaving(dateValue);
        }

        if (duration) {
            const d = parseInt(duration, 10);
            if (!isNaN(d) && d > 0) postData.durationMinutes = d;
        }

        onSubmit(postData);
    };

    return (
        <Modal title="Create New Post" onClose={onClose}>
            <form onSubmit={handleSubmit} className="max-h-[80vh] overflow-y-auto pr-2">
                <div className="space-y-4">
                    {/* All other inputs remain the same */}
                    <input type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} className="w-full p-3 border rounded-lg bg-gray-700 border-gray-600 text-white" required />
                    <textarea placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} rows={3} className="w-full p-3 border rounded-lg bg-gray-700 border-gray-600 text-white" required></textarea>
                    <input type="text" placeholder="Location (e.g., Novi)" value={location} onChange={e => setLocation(e.target.value)} className="w-full p-3 border rounded-lg bg-gray-700 border-gray-600 text-white" />
                    <input type="text" placeholder="Zip Code (e.g., 48374)" value={zip} onChange={e => setZip(e.target.value)} className="w-full p-3 border rounded-lg bg-gray-700 border-gray-600 text-white" />
                    <select value={category} onChange={e => setCategory(e.target.value)} className="custom-arrow w-full p-3 border rounded-lg bg-gray-700 border-gray-600 text-white" required >
                        <option value="">Select type...</option>
                        <option value="Collab">Collab (Hobby)</option>
                        <option value="Microjob">Microjob (Paid)</option>
                    </select>
                    <select value={tag} onChange={e => setTag(e.target.value)} className="custom-arrow w-full p-3 border rounded-lg bg-gray-700 border-gray-600 text-white" required >
                        <option value="">Select a category</option>
                        {CATEGORIES.map(cat => <option key={cat.name} value={cat.name}>{cat.name}</option>)}
                    </select>
                     {category === 'Microjob' && (
                          <input type="number" placeholder="Price (e.g., 25)" value={price} onChange={e => setPrice(e.target.value)} className="w-full p-3 border rounded-lg bg-gray-700 border-gray-600 text-white" min="0" step="0.01" />
                     )}
                     
                     {/* --- THE NEW, SIMPLE, AND RELIABLE DATE INPUT --- */}
                     <label className="text-sm text-gray-300">When (optional)</label>
                     <input
                         type="date"
                         value={dateValue}
                         onChange={(e) => setDateValue(e.target.value)}
                         // This styling ensures it looks like the other inputs and the calendar icon is visible and clickable
                         className="w-full p-3 border rounded-lg bg-gray-700 border-gray-600 text-white"
                         // This helps make the calendar popup dark to match your app
                         style={{ colorScheme: 'dark' }}
                     />
                     
                     <label className="text-sm text-gray-300">Duration (minutes, optional)</label>
                     <input
                         type="number"
                         placeholder="e.g., 90"
                         value={duration}
                         onChange={e => setDuration(e.target.value)}
                         className="w-full p-3 border rounded-lg bg-gray-700 border-gray-600 text-white"
                         min="0"
                         step="1"
                     />
                </div>
                <div className="flex justify-end gap-4 mt-6">
                    <button type="button" onClick={onClose} className="py-2 px-6 border-2 border-blue-500 text-blue-500 font-semibold rounded-lg">Cancel</button>
                    <button type="submit" className="py-2 px-6 bg-blue-500 text-white font-semibold rounded-lg">Post</button>
                </div>
            </form>
        </Modal>
    );
};
 
export default CreatePostModal;