import React, { useState } from "react";
import { FaEllipsisV, FaPaperPlane } from "react-icons/fa";
import { BsArrowLeft } from "react-icons/bs";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import ChatList from "./ChatList";
import ChatScreen from "./ChatScreen";

const Chat = () => {
  const [update, setUpdate] = useState(false);

  const navigate = useNavigate(); // Initialize the navigation function

  const chats = [
    { id: 1, name: "Mike Smith", message: "Hi, how are you?", date: "1 Jan" },
    { id: 2, name: "Rose Mary", message: "Hi, how are you?", date: "1 Jan" },
    {
      id: 3,
      name: "George Adrian",
      message: "Hi, how are you?",
      date: "1 Jan",
    },
    { id: 4, name: "Mike Clark", message: "Hi, how are you?", date: "1 Jan" },
    { id: 5, name: "Julia James", message: "Hi, how are you?", date: "1 Jan" },
  ];

  const [selectedChat, setSelectedChat] = useState(null);

  const handleChatClick = (chat) => {
    setSelectedChat(chat);
  };

  const handleBackClick = () => {
    setSelectedChat(null); // Go back to chat list
  };

  const user = localStorage.getItem("userData")
    ? JSON.parse(localStorage.getItem("userData"))
    : null;

  return (
    <div className="w-full h-full p-6 mx-auto bg-white rounded-2xl shadow-lg flex space-x-6">
      {/* Left Side - Chat List */}
      <div className="w-1/3 bg-white p-6 rounded-lg border">
        <h1 className="text-3xl font-bold text-gray-800 tracking-tight mb-6">
          Chats
        </h1>

        <ChatList
          userId={user?.uid || null}
          setSelectedChat={setSelectedChat}
          selectedChat={selectedChat}
          setUpdate={setUpdate}
          update={update}
        />
      </div>

      {/* Right Side - Chat Screen */}
      {selectedChat ? (
        <div className="w-2/3 bg-white p-4 rounded-lg border flex flex-col">
          <ChatScreen
            selectedChat={selectedChat}
            chatId={selectedChat?.id}
            userId={user?.uid || null}
            setUpdate={setUpdate}
            update={update}
          />
        </div>
      ) : (
        <div className="w-2/3 flex items-center justify-center bg-gray-100 p-4 rounded-lg shadow-md">
          <p className="text-lg text-gray-500">
            Select a chat to view the conversation
          </p>
        </div>
      )}
    </div>
  );
};

export default Chat;
