import React, { useState } from "react";
import { FaEllipsisV, FaPaperPlane } from "react-icons/fa";
import { BsArrowLeft } from "react-icons/bs";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Chat = () => {
  const navigate = useNavigate(); // Initialize the navigation function

  const chats = [
    { id: 1, name: "Mike Smith", message: "Hi, how are you?", date: "1 Jan" },
    { id: 2, name: "Rose Mary", message: "Hi, how are you?", date: "1 Jan" },
    { id: 3, name: "George Adrian", message: "Hi, how are you?", date: "1 Jan" },
    { id: 4, name: "Mike Clark", message: "Hi, how are you?", date: "1 Jan" },
    { id: 5, name: "Julia James", message: "Hi, how are you?", date: "1 Jan" },
  ];

  const [selectedChat, setSelectedChat] = useState(null);

  const messages = [
    { id: 1, sender: "me", text: "Hi, how are you?", time: "2:50 PM" },
    { id: 2, sender: "them", text: "I'm good, what about you?", time: "2:52 PM" },
    { id: 3, sender: "me", text: "I'm doing great, thanks!", time: "2:53 PM" },
  ];

  const handleChatClick = (chat) => {
    setSelectedChat(chat);
  };

  const handleBackClick = () => {
    setSelectedChat(null); // Go back to chat list
  };

  return (
    <div className="w-full h-full p-6 mx-auto bg-white rounded-2xl shadow-lg flex space-x-6">
      {/* Left Side - Chat List */}
      <div className="w-1/3 bg-white p-6 rounded-lg border">
        <h1 className="text-3xl font-bold text-gray-800 tracking-tight mb-6">Chats</h1>

        {/* Chat List */}
        <ul className="space-y-4">
          {chats.map((chat) => (
            <li
              key={chat.id}
              className="flex items-center justify-between p-4 rounded-lg transition duration-200 cursor-pointer border hover:bg-gray-200"
              onClick={() => handleChatClick(chat)}
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-gray-300"></div>
                <div>
                  <p className="text-lg font-semibold text-gray-700">{chat.name}</p>
                  <p className="text-sm font-medium text-gray-600">{chat.message}</p>
                </div>
              </div>
              <span className="text-sm text-gray-400">{chat.date}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Right Side - Chat Screen */}
      {selectedChat ? (
        <div className="w-2/3 bg-white p-4 rounded-lg border flex flex-col">
          {/* Header Section */}
          <div className="bg-[#1D7C42] rounded-lg text-white px-6 py-3 flex items-center space-x-4">
            <BsArrowLeft
              className="cursor-pointer text-xl transition duration-200"
              onClick={handleBackClick}
            />
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-full bg-gray-300"></div>
              <p className="font-semibold text-lg">{selectedChat.name}</p>
            </div>
          </div>

          {/* Messages Section */}
          <div className="flex-1 px-6 py-4 space-y-6 overflow-y-auto">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`px-4 py-3 rounded-xl max-w-xs ${
                    msg.sender === "me" ? "bg-[#1D7C42] text-white" : "bg-gray-200 text-gray-800"
                  }`}
                >
                  <p className="text-base">{msg.text}</p>
                  <p className="text-xs text-gray-400 mt-1 text-right">{msg.time}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Message Input Section */}
          <div className="flex items-center px-2 py-2">
            <input
              type="text"
              placeholder="Type a message"
              className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-green-600 placeholder-gray-400 text-gray-800"
            />
            <button className="ml-3 bg-[#1D7C42] p-4 rounded-full text-white hover:bg-green-600 transition duration-200">
              <FaPaperPlane className="text-xl" />
            </button>
          </div>
        </div>
      ) : (
        <div className="w-2/3 flex items-center justify-center bg-gray-100 p-4 rounded-lg shadow-md">
          <p className="text-lg text-gray-500">Select a chat to view the conversation</p>
        </div>
      )}
    </div>
  );
};

export default Chat;
