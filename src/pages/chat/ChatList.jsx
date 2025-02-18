import React from "react";
import { FaEllipsisV } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { useEffect, useState } from "react";
import { getChats, markMessagesAsRead } from "../../firebase/firestoreService"; // Function to fetch chat list
import useUnreadMessages from "./useUnreadMessages"; // Custom hook for unread counts

// ChatList Component
const ChatList = ({
  userId,
  setSelectedChat,
  selectedChat,
  update,
  setUpdate,
}) => {
  const navigate = useNavigate(); // Initialize the navigation function

  const [chats, setChats] = useState([]);
  const unreadCounts = useUnreadMessages(userId);

  useEffect(() => {
    const fetchChats = async () => {
      const chatData = await getChats(userId);
      setChats(chatData);
    };

    fetchChats();
  }, [userId, update]);

  useEffect(() => {
    selectedChat !== null &&
      setSelectedChat(chats?.filter((chat) => selectedChat?.id == chat?.id)[0]);
  }, [chats]);
  return (
    <ul className="space-y-4">
      {chats?.map((chat) => (
        <li
          key={chat?.id}
          className={`flex items-center justify-between p-4 rounded-lg transition duration-200 cursor-pointer border ${
            selectedChat?.id == chat?.id
              ? "border-[#1D7C42] bg-[#1D7C4215]"
              : "bg-gray-100"
          }`}
          onClick={() => {
            setSelectedChat(chat);
            unreadCounts[chat?.id] > 0 && markMessagesAsRead(chat?.id, userId);
          }} // Add onClick to navigate
        >
          <div className="flex items-center space-x-4">
            {chat?.image_url ? (
              <img
                src={chat?.image_url}
                className="w-12 h-12 rounded-full object-scale-down border bg-gray-50"
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-gray-300"></div>
            )}
            <div>
              <p className="text-lg font-semibold text-[#074F57]">
                {chat?.chat_name || "N/A"}
              </p>
              <p className="text-sm font-medium text-gray-600">
                {chat?.last_msg?.content || ""}
              </p>
            </div>
          </div>
          {unreadCounts[chat?.id] > 0 && (
            <span className="unread-badge bg-green-500 text-white text-xs w-7 h-6 rounded-full flex items-center justify-center">
              {unreadCounts[chat?.id]}
            </span>
          )}
          {/* <span className="text-sm text-gray-400">{chat.date}</span> */}
        </li>
      ))}
    </ul>
  );
};

export default ChatList;
