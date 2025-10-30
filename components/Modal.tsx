import React from 'react';

interface ModalProps {
    title: string;
    onClose: () => void;
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ title, onClose, children }) => {
    return (
        <>
            <div 
                className="fixed inset-0 bg-black bg-opacity-60 z-40"
                onClick={onClose}
            ></div>
            <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-800 p-6 rounded-lg shadow-xl w-[90%] max-w-lg z-50">
                <h2 className="text-xl font-bold text-center mb-6 text-gray-200">{title}</h2>
                {children}
            </div>
        </>
    );
};

export default Modal;