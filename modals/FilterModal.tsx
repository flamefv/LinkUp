import React, { useState } from 'react';
import Modal from '../components/Modal';
import type { Category } from '../types';

interface FilterModalProps {
    categories: Category[];
    onClose: () => void;
    onApply: (filters: { category: string | null; location: string | null }) => void;
}

const FilterModal: React.FC<FilterModalProps> = ({ categories, onClose, onApply }) => {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [location, setLocation] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onApply({ category: selectedCategory, location: location.trim() || null });
    };
    
    return (
        <Modal title="Filter Posts" onClose={onClose}>
            <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                    <div>
                        <label className="font-semibold text-gray-300 mb-2 block">Category</label>
                        <div className="flex flex-wrap gap-2">
                            {categories.map(cat => (
                                <button
                                    type="button"
                                    key={cat.name}
                                    onClick={() => setSelectedCategory(cat.name === selectedCategory ? null : cat.name)}
                                    className={`px-3 py-1 rounded-full text-sm font-medium border-2 transition-colors ${selectedCategory === cat.name ? 'bg-blue-500 text-white border-blue-500' : 'bg-gray-700 text-gray-200 border-gray-600'}`}
                                >
                                    {cat.name}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div>
                        <label htmlFor="location" className="font-semibold text-gray-300 mb-2 block">Location</label>
                        <input
                            id="location"
                            type="text"
                            placeholder="City or Zip Code"
                            value={location}
                            onChange={e => setLocation(e.target.value)}
                            className="w-full p-3 border rounded-lg bg-gray-700 border-gray-600 text-white"
                        />
                    </div>
                </div>
                <div className="flex justify-end gap-4 mt-6">
                    <button type="button" onClick={onClose} className="py-2 px-6 border-2 border-blue-500 text-blue-500 font-semibold rounded-lg">Cancel</button>
                    <button type="submit" className="py-2 px-6 bg-blue-500 text-white font-semibold rounded-lg">Apply Filters</button>
                </div>
            </form>
        </Modal>
    );
};

export default FilterModal;