import React from "react";
import {
  blockChatRoom,
  unblockChatRoom,
} from "../../firebase/firestoreService";

const BlockModal = ({ isOpen, onClose, isBlocked, chatId, userId }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center text-black">
      <div className="bg-white p-6 rounded-lg w-80">
        <h3 className="text-xl font-semibold">{isBlocked ? "Block" : "Unblock"} User</h3>
        <p>Are you sure you want to {isBlocked ? "block" : "unblock"} this user?</p>
        <div className="mt-4 flex ">
          <button
            className="bg-green-600 text-white px-4 py-2 rounded mr-4"
            onClick={async () => {
              isBlocked
                ? await blockChatRoom(chatId, userId, onClose)
                : await unblockChatRoom(chatId, userId, onClose);
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

export default BlockModal;
