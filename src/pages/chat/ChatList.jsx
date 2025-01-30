import React from "react";
import { FaEllipsisV } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // Import useNavigate

// ChatList Component
const ChatList = () => {
  const navigate = useNavigate(); // Initialize the navigation function

  const chats = [
    { id: 1, name: "Mike Smith", message: "Hi, how are you?", date: "1 Jan" },
    { id: 2, name: "Rose Mary", message: "Hi, how are you?", date: "1 Jan" },
    { id: 3, name: "George Adrian", message: "Hi, how are you?", date: "1 Jan" },
    { id: 4, name: "Mike Clark", message: "Hi, how are you?", date: "1 Jan" },
    { id: 5, name: "Julia James", message: "Hi, how are you?", date: "1 Jan" },
  ];

  // Handle chat click
  const handleChatClick = () => {
    navigate("/chat-screen"); // Navigate to the chat screen
  };

  return (
    <div className="w-full h-full p-6 mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800 tracking-tight">Chats</h1>
        {/* <FaEllipsisV className="text-2xl text-gray-600 hover:text-gray-900 transition duration-200" /> */}
      </div>

      {/* Chat List */}
      <ul className="space-y-4">
        {chats.map((chat) => (
          <li
            key={chat.id}
            className="flex items-center justify-between p-4 rounded-lg transition duration-200 cursor-pointer border border-[#1D7C42] bg-[#1D7C4215]"
            onClick={handleChatClick} // Add onClick to navigate
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-gray-300"></div>
              <div>
                <p className="text-lg font-semibold text-[#074F57]">{chat.name}</p>
                <p className="text-sm font-medium text-gray-600">{chat.message}</p>
              </div>
            </div>
            <span className="text-sm text-gray-400">{chat.date}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatList;
