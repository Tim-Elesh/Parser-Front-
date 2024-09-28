import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
  }

const TableModal: React.FC<ModalProps> = ({isOpen , onClose}) => {
  if (!isOpen) return null;

    return(
        <>
         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded relative">
                <button 
                onClick={onClose}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                >
                  <FaTimes />
                </button>
              </div>
          </div>
        </>
    )
}

export default TableModal;