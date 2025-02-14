import React, { useEffect, useState } from "react";
import { FaEllipsisV, FaPaperPlane } from "react-icons/fa";
import { BsArrowLeft } from "react-icons/bs";
import useMessages from "./useMessages";
import { sendMessage } from "../../firebase/firestoreService";
import { FiLoader } from "react-icons/fi";

const ChatScreen = ({ selectedChat, chatId, userId }) => {
  const messages = useMessages(chatId);

  const [messageText, setMessageText] = useState("");

  const user = localStorage.getItem("userData")
    ? JSON.parse(localStorage.getItem("userData"))
    : null;

  const [loading, setLoading] = useState(false);
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

  return (
    <>
      {/* Header Section */}
      <div className="bg-[#1D7C42] text-white px-6 py-2 rounded-xl flex items-center space-x-4 shadow-md">
        {/* <BsArrowLeft className="cursor-pointer text-xl transition duration-200" /> */}
        <div className="flex items-center space-x-3">
          {selectedChat?.image_url ? (
            <img
              src={selectedChat?.image_url}
              className="w-12 h-12 rounded-full object-scale-down border bg-gray-50"
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-gray-300"></div>
          )}
          <div>
            <p className="font-semibold text-lg">
              {selectedChat?.chat_name || "N/A"}
            </p>
            <p className="text-sm font-medium text-gray-200">
              {selectedChat?.last_msg?.content || ""}
            </p>
          </div>
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
              className={`px-4 py-3  max-w-[50%] ${
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
    </>
  );
};

export default ChatScreen;
