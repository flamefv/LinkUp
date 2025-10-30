
import React from 'react';
import type { Category } from '../types';

interface ExploreScreenProps {
    categories: Category[];
    onCategorySelect: (categoryName: string) => void;
}

const ExploreScreen: React.FC<ExploreScreenProps> = ({ categories, onCategorySelect }) => {
    return (
        <div className="p-4">
            <div className="grid grid-cols-2 gap-4">
                {categories.map(cat => (
                    <button 
                        key={cat.name} 
                        onClick={() => onCategorySelect(cat.name)}
                        className="bg-blue-100 p-6 rounded-xl text-center text-blue-800 font-semibold cursor-pointer transition-transform hover:scale-105"
                    >
                        <i className="material-icons text-4xl mb-2">{cat.icon}</i>
                        <span>{cat.name}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ExploreScreen;
