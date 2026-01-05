import React from 'react';
import Modal from './ui/Modal';
import Button from './ui/Button';

const ConfirmationModal = ({ isOpen, onClose, onConfirm, title, message }) => {
    const ExclamationIcon = () => (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    );
    
    return (
        <Modal title={title} isOpen={isOpen} onClose={onClose}>
            <div className="text-center">
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100">
                   <ExclamationIcon />
                </div>
                <p className="mt-4 text-lg text-gray-600">{message}</p>
                <div className="mt-8 flex justify-center space-x-4">
                    <Button variant="secondary" onClick={onClose}>Cancel</Button>
                    <Button variant="danger" onClick={onConfirm}>Delete</Button>
                </div>
            </div>
        </Modal>
    );
};

export default ConfirmationModal;
