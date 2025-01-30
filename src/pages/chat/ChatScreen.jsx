import React from "react";
import { FaEllipsisV, FaPaperPlane } from "react-icons/fa";
import { BsArrowLeft } from "react-icons/bs";

const ChatScreen = () => {
  const messages = [
    { id: 1, sender: "me", text: "Hi, how are you?", time: "2:50 PM" },
    { id: 2, sender: "them", text: "I'm good, what about you?", time: "2:52 PM" },
    { id: 3, sender: "me", text: "I'm doing great, thanks!", time: "2:53 PM" },
  ];

  return (
    <div className="w-full h-full mx-auto flex flex-col bg-white overflow-hidden">
      {/* Header Section */}
      <div className="bg-[#1D7C42] text-white px-6 py-2 flex items-center space-x-4 shadow-md">
        <BsArrowLeft className="cursor-pointer text-xl transition duration-200" />
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-full bg-gray-300"></div>
          <p className="font-semibold text-lg">Mike Smith</p>
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
              className={`px-4 py-3 rounded-xl max-w-xs ${msg.sender === "me" ? "bg-[#1D7C42] text-white" : "bg-gray-200 text-gray-800"}`}
            >
              <p className="text-base">{msg.text}</p>
              <p className="text-xs text-gray-400 mt-1 text-right">{msg.time}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Message Input Section */}
      <div className="flex items-center px-6 py-4 ">
        <input
          type="text"
          placeholder="Type a message"
          className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-green-600 placeholder-gray-400 text-gray-800"
        />
        <button className="ml-3 bg-[#1D7C42] p-4 rounded-full text-white hover:bg-green-600 transition duration-200">
          <FaPaperPlane className="text-xl " />
        </button>
      </div>
    </div>
  );
};

export default ChatScreen;
