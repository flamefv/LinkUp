
import React from 'react';

interface FABProps {
    onClick: () => void;
}

const FAB: React.FC<FABProps> = ({ onClick }) => {
    return (
        <button 
            onClick={onClick}
            className="absolute bottom-24 right-5 w-14 h-14 rounded-full bg-orange-500 text-white flex justify-center items-center shadow-lg hover:bg-orange-600 transition-all duration-300 z-10"
        >
            <i className="material-icons text-3xl">add</i>
        </button>
    );
};

export default FAB;
