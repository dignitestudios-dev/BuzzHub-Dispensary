import React from "react";
import { deleteChatForUser } from "../../firebase/firestoreService";

const DeleteModal = ({ isOpen, onClose, chatId, userId, setUpdate }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center text-black">
      <div className="bg-white p-6 rounded-lg w-80">
        <h3 className="text-xl font-semibold">Delete Chat</h3>
        <p>Are you sure you want to delete this chat?</p>
        <div className="mt-4 flex">
          <button
            className="bg-green-600 text-white px-4 py-2 rounded mr-4"
            onClick={async () => {
              await deleteChatForUser(chatId, userId, onClose);
              setUpdate((prev) => !prev);
            }}
          >
            Confirm
          </button>
          <button
            className="bg-red-600 text-white px-4 py-2 rounded"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
