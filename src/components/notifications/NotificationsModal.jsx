import React from 'react';
import { FaTimes } from 'react-icons/fa';  // Import the "X" icon

const NotificationsModal = ({ isOpen, onClose, newNotification, onChange, onSubmit }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-40 z-50">
      <div className="border border-gray-200 bg-gray-50 shadow transition-shadow duration-300 p-8 rounded-xl  max-w-lg w-full relative">  {/* Adjusted width to be more compact */}
        
        {/* Close Button (X) */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#074F57] text-2xl hover:text-gray-700 transition duration-200"
        >
          <FaTimes />
        </button>

        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-left">Create Notification</h2> {/* Centered heading for better visual appeal */}

        <div className="flex flex-col gap-6">
          {/* Notification Title Input */}
          <input
            type="text"
            value={newNotification.title}
            onChange={(e) => onChange({ ...newNotification, title: e.target.value })}
            placeholder="Enter notification title"
            className="p-4 rounded-lg border bg-gray-50 border-gray-300 focus:ring-2 focus:ring-[#074F57] focus:outline-none text-lg text-gray-800 placeholder-gray-500 transition-all duration-300"
          />
          
          {/* Notification Message Input */}
          <textarea
            value={newNotification.message}
            onChange={(e) => onChange({ ...newNotification, message: e.target.value })}
            placeholder="Enter notification message"
            rows={4}  
            className="p-4 rounded-lg border bg-gray-50 border-gray-300 focus:ring-2 focus:ring-[#074F57] focus:outline-none text-lg text-gray-800 placeholder-gray-500 transition-all duration-300"
          />

          {/* Buttons */}
          <div className="flex gap-4">
            <button
              onClick={onSubmit}
              className="border border-[#074F57] bg-[#074F57] text-white shadow transition-shadow px-8 py-3 rounded-lg w-full hover:bg-[#134248] duration-300"
            >
              Create Notification
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationsModal;
