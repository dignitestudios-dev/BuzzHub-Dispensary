import React from 'react';

const DeleteProductModal = ({ onClose, onDelete, productName }) => {
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        <h2 className="text-2xl font-semibold text-center mb-4">Are you sure?</h2>
        <p className="text-center text-lg mb-6">You are about to delete the product "{productName}". This action cannot be undone.</p>
        <div className="flex justify-between">
          <button
            className="px-6 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            onClick={onDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteProductModal;
