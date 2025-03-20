import React, { useEffect, useState } from "react";
import { FaEllipsisV, FaPaperPlane } from "react-icons/fa";
import { FiLoader } from "react-icons/fi";
import useMessages from "./useMessages";
import {
  getMessages,
  listenToBlockedUsers,
  sendMessage,
} from "../../firebase/firestoreService";
import DeleteModal from "../../components/chat/DeleteModal";
import ReportModal from "../../components/chat/ReportModal";
import BlockModal from "../../components/chat/BlockModal";

const ChatScreen = ({ selectedChat, chatId, userId, update, setUpdate }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    console.log("update", update);
    if (!chatId) return;

    const unsubscribe = getMessages(
      chatId,
      setMessages,
      selectedChat?.updated_at[userId]
    );
    return () => unsubscribe(); // Cleanup on unmount
  }, [chatId, update]);

  const [messageText, setMessageText] = useState("");
  const [loading, setLoading] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Modal state
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isBlockModalOpen, setIsBlockModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  const user = localStorage.getItem("userData")
    ? JSON.parse(localStorage.getItem("userData"))
    : null;

  const handleSend = async () => {
    if (messageText.trim()) {
      await sendMessage(chatId, userId, messageText, setLoading);
      setMessageText(""); // Clear input after sending
    }
  };

  const convertFirebaseTimestamp = (timestamp) => {
    if (timestamp) {
      const date = timestamp?.toDate(); // Convert Firebase timestamp to JavaScript Date
      const hours = date?.getHours()?.toString()?.padStart(2, "0"); // Get hours (24-hour format)
      const minutes = date?.getMinutes()?.toString()?.padStart(2, "0"); // Get minutes

      return `${hours}:${minutes}`;
    } else {
      return "";
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
    setIsDropdownOpen(false);
  };

  const openBlockModal = () => {
    setIsBlockModalOpen(true);
    setIsDropdownOpen(false);
  };

  const openReportModal = () => {
    setIsReportModalOpen(true);
    setIsDropdownOpen(false);
  };

  function generateRandomTextAndNumber(length = 20) {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters[randomIndex];
    }

    return result;
  }

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };
  const closeBlockModal = () => setIsBlockModalOpen(false);
  const closeReportModal = () => setIsReportModalOpen(false);

  const [blockedIds, setBlockedIds] = useState(null);

  const [isBlocked, setIsBlocked] = useState(false);

  useEffect(() => {
    const checkBlockUser = async () => {
      await listenToBlockedUsers(selectedChat?.id, setBlockedIds);
    };

    checkBlockUser();
  }, [selectedChat]);

  return (
    <>
      {/* Header Section */}
      <div className="bg-[#1D7C42] text-white px-6 py-2 rounded-xl flex items-center space-x-4 justify-between">
        <div className="flex items-center space-x-3">
          {selectedChat?.image ? (
            <img
              src={selectedChat?.image}
              className="w-12 h-12 rounded-full object-scale-down border bg-gray-50"
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-gray-300"></div>
          )}
          <div>
            <p className="font-semibold text-lg">
              {selectedChat?.name || "N/A"}
            </p>
          </div>
        </div>
        <div className="relative">
          <FaEllipsisV
            className="cursor-pointer text-xl"
            onClick={toggleDropdown}
          />
          {isDropdownOpen && (
            <div className="absolute top-8 right-0 bg-white text-black border rounded-lg shadow-md w-40">
              <ul>
                <li
                  className="px-4 py-2 hover:bg-gray-100 rounded-lg cursor-pointer"
                  onClick={openDeleteModal}
                >
                  Delete
                </li>
                {blockedIds?.includes(userId) ? (
                  <li
                    className="px-4 py-2 hover:bg-gray-100 rounded-lg cursor-pointer"
                    onClick={() => {
                      setIsBlocked(false);
                      openBlockModal();
                    }}
                  >
                    Unblock
                  </li>
                ) : (
                  <li
                    className="px-4 py-2 hover:bg-gray-100 rounded-lg cursor-pointer"
                    onClick={() => {
                      setIsBlocked(true);
                      openBlockModal();
                    }}
                  >
                    Block
                  </li>
                )}
                <li
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={openReportModal}
                >
                  Report
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Messages Section */}
      <div className="flex-1 px-6 py-4 space-y-6 overflow-y-auto">
        {messages?.map((msg) => (
          <div
            key={msg?.id}
            className={`flex ${
              msg?.sender_id === user?.uid ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`px-4 py-3 max-w-[50%] ${
                msg?.sender_id === user?.uid
                  ? "bg-[#1D7C42] rounded-l-xl rounded-br-xl text-white"
                  : "bg-gray-200  rounded-r-xl rounded-bl-xl text-gray-800"
              }`}
            >
              <p className="text-base">{msg?.content}</p>
              <p className="text-xs text-gray-400 mt-1 text-right">
                {convertFirebaseTimestamp(msg?.timestamp)}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Message Input Section */}
      {blockedIds?.length == 0 && (
        <div className="flex items-center px-6 py-4 ">
          <input
            type="text"
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            placeholder="Type a message"
            className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-green-600 placeholder-gray-400 text-gray-800"
          />
          <button
            onClick={() => handleSend()}
            className="ml-3 bg-[#1D7C42] p-4 rounded-full text-white hover:bg-green-600 transition duration-200"
          >
            {loading ? (
              <FiLoader className="text-xl animate-spin" />
            ) : (
              <FaPaperPlane className="text-xl " />
            )}
          </button>
        </div>
      )}

      {blockedIds?.length > 0 && (
        <div className="flex items-center px-6 py-4 ">
          <h1 className="text-gray-500">
            Either you or the other user has blocked this conversation.
          </h1>
        </div>
      )}

      {/* Modals */}
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        chatId={chatId}
        userId={userId}
        setUpdate={setUpdate}
        setMessages={setMessages}
      />
      <BlockModal
        isOpen={isBlockModalOpen}
        onClose={closeBlockModal}
        isBlocked={isBlocked}
        chatId={chatId}
        userId={userId}
      />
      <ReportModal
        isOpen={isReportModalOpen}
        onClose={closeReportModal}
        onConfirm={() => {
          closeReportModal();
        }}
      />
    </>
  );
};

export default ChatScreen;
